#!/usr/bin/env node
'use strict';

/*
 * Portfolio data console — a local-only admin tool for the portfolio MongoDB.
 *
 *   cd api && npm run admin        then open the URL it prints
 *
 * It reads the connection string from MONGODB_URI or api/local.settings.json,
 * listens on 127.0.0.1 only, and is excluded from the Azure deployment
 * (.funcignore). Every change is previewed first, snapshotted to
 * tools/admin/backups before it is written, and can be undone.
 *
 * Project skills live in two places: the `skills` array in each
 * src/views/Projects/*.vue page and the `tags` of the MongoDB document.
 * This tool writes both, so they cannot drift apart.
 */

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { MongoClient, BSON } = require('mongodb');

const { EJSON } = BSON;
const API_DIR = path.resolve(__dirname, '..', '..');
const REPO_DIR = path.resolve(API_DIR, '..');
const PAGES_DIR = process.env.ADMIN_PAGES_DIR || path.join(REPO_DIR, 'src', 'views', 'Projects');
const BACKUP_DIR = path.join(__dirname, 'backups');
const PORT = Number(process.env.ADMIN_PORT) || 7171;
const TOKEN = crypto.randomBytes(18).toString('hex');
const DB_NAME = 'portfolio';
const COLLECTIONS = ['skills', 'projects', 'work', 'certs', 'courses', 'education'];
const KEEP_BACKUPS = 40;

/* Editable fields per kind of item, and which one is its display name. */
const FIELDS = {
  project: ['title', 'description', 'link', 'date'],
  position: ['position', 'company', 'duration', 'location', 'type', 'workType', 'description', 'logo'],
  cert: ['name', 'link'],
  course: ['name', 'description']
};
const NAME_FIELD = { project: 'title', position: 'position', cert: 'name', course: 'name' };
const CAN_ADD = ['position', 'cert', 'course'];

const uniq = list => [...new Set(list)];
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const clone = value => JSON.parse(JSON.stringify(value));

function fail(message) {
  const error = new Error(message);
  error.expected = true;
  return error;
}

function mongoUri() {
  if (process.env.MONGODB_URI) return process.env.MONGODB_URI;
  try {
    const settings = JSON.parse(fs.readFileSync(path.join(API_DIR, 'local.settings.json'), 'utf8'));
    if (settings.Values && settings.Values.MONGODB_URI) return settings.Values.MONGODB_URI;
  } catch { /* fall through to the error below */ }
  throw new Error('No MongoDB connection string. Set MONGODB_URI or add it to api/local.settings.json.');
}

/* ---------- project pages ---------- */

/* Locate the `skills` array literal in a page's <script> block. */
function findSkillsLiteral(source) {
  const scriptAt = source.indexOf('<script');
  if (scriptAt < 0) return null;
  const match = /skills\s*[:=]\s*\[/.exec(source.slice(scriptAt));
  if (!match) return null;
  const start = scriptAt + match.index + match[0].length - 1;
  const end = source.indexOf(']', start);
  if (end < 0) return null;
  return { start, end: end + 1 };
}

function parseStrings(literal) {
  const out = [];
  const pattern = /(['"])((?:\\.|(?!\1)[^\\])*)\1/g;
  let match;
  while ((match = pattern.exec(literal))) out.push(match[2].replace(/\\(.)/g, '$1'));
  return out;
}

function readPages() {
  const pages = {};
  if (!fs.existsSync(PAGES_DIR)) return pages;
  for (const file of fs.readdirSync(PAGES_DIR).filter(name => name.endsWith('.vue')).sort()) {
    const source = fs.readFileSync(path.join(PAGES_DIR, file), 'utf8');
    const id = (source.match(/<ProjectPage\s+projectId="([^"]+)"/) || [])[1];
    if (!id) continue;
    const literal = findSkillsLiteral(source);
    pages[id] = { file, skills: literal ? parseStrings(source.slice(literal.start, literal.end)) : null };
  }
  return pages;
}

/* Rewrite a page's skills array, keeping its quote style and indentation. */
function writePageSkills(file, skills) {
  const full = path.join(PAGES_DIR, file);
  const source = fs.readFileSync(full, 'utf8');
  const literal = findSkillsLiteral(source);
  if (!literal) throw fail(`${file}: could not find its skills array`);
  const old = source.slice(literal.start, literal.end);
  const quote = (old.match(/['"]/) || ['"'])[0];
  const lineStart = source.lastIndexOf('\n', literal.start) + 1;
  const base = source.slice(lineStart, literal.start).match(/^\s*/)[0];
  const indent = `${base}  `;
  const lines = [];
  let line = '';
  for (const skill of skills) {
    const token = quote + skill.replace(/\\/g, '\\\\').split(quote).join(`\\${quote}`) + quote;
    if (line && indent.length + line.length + token.length + 2 > 96) {
      lines.push(line);
      line = '';
    }
    line += (line ? ', ' : '') + token;
  }
  if (line) lines.push(line);
  const next = `[\n${lines.map(text => indent + text).join(',\n')}\n${base}]`;
  fs.writeFileSync(full, source.slice(0, literal.start) + next + source.slice(literal.end));
}

/* ---------- loading ---------- */

async function loadRaw(db) {
  const raw = {};
  await Promise.all(COLLECTIONS.map(async name => { raw[name] = await db.collection(name).find({}).toArray(); }));
  return raw;
}

function pick(doc, fields) {
  const out = {};
  for (const field of fields) out[field] = doc[field] == null ? '' : String(doc[field]);
  return out;
}

/*
 * Normalise the six collections into one shape:
 *   master: { skills: [...], cats: { languages: [...], ... } }
 *   items:  [{ uid, kind, key, name, sub, skills, fields, ... }]
 */
function buildState(raw, pages) {
  const skillsDoc = raw.skills[0] || { skills: [] };
  const cats = {};
  for (const [key, value] of Object.entries(skillsDoc)) {
    if (key !== '_id' && key !== 'skills' && Array.isArray(value)) cats[key] = [...value];
  }
  const items = [];
  for (const doc of raw.projects) {
    const id = String(doc.id);
    const page = pages[id];
    items.push({
      uid: `project:${id}`, kind: 'project', key: id, name: doc.title || `Project ${id}`, sub: doc.date || '',
      skills: [...(doc.tags || [])], fields: pick(doc, FIELDS.project),
      page: page ? page.file : null, pageSkills: page ? page.skills : null
    });
  }
  for (const doc of raw.work) {
    items.push({
      uid: `position:${doc._id}`, kind: 'position', key: String(doc._id), name: doc.position || '(untitled)',
      sub: doc.company || '', skills: [...(doc.skills || [])], fields: pick(doc, FIELDS.position)
    });
  }
  for (const doc of raw.certs) {
    items.push({
      uid: `cert:${doc._id}`, kind: 'cert', key: String(doc._id), name: doc.name || '(untitled)', sub: '',
      skills: [...(doc.skills || [])], fields: pick(doc, FIELDS.cert)
    });
  }
  const education = raw.education[0];
  for (const course of (education && education.courses) || []) {
    const store = raw.courses.find(doc => doc.name === course.name);
    items.push({
      uid: `course:${course.name}`, kind: 'course', key: course.name, name: course.name, sub: '',
      skills: [...(course.skills || [])],
      fields: { name: course.name, description: (store && store.description) || '' },
      storeSkills: store ? [...(store.skills || [])] : null
    });
  }
  return { master: { skills: [...(skillsDoc.skills || [])], cats }, items };
}

function health(state, raw, pages) {
  const master = new Set(state.master.skills);
  const used = new Set();
  const strays = [];
  const duplicates = [];
  for (const item of state.items) {
    if (new Set(item.skills).size !== item.skills.length) duplicates.push({ uid: item.uid, name: item.name });
    for (const skill of item.skills) {
      used.add(skill);
      if (!master.has(skill)) strays.push({ uid: item.uid, kind: item.kind, name: item.name, skill });
    }
  }
  const categorised = new Set(Object.values(state.master.cats).flat());
  const projectIds = new Set(state.items.filter(item => item.kind === 'project').map(item => item.key));
  return {
    strays,
    duplicates,
    unused: state.master.skills.filter(skill => !used.has(skill)),
    uncategorised: state.master.skills.filter(skill => !categorised.has(skill)),
    categoryOnly: uniq([...categorised].filter(skill => !master.has(skill))),
    masterDuplicates: state.master.skills.filter((skill, index, all) => all.indexOf(skill) !== index),
    pageDrift: state.items
      .filter(item => item.kind === 'project' && item.pageSkills && !same(item.pageSkills, item.skills))
      .map(item => ({
        uid: item.uid, name: item.name, page: item.page,
        onlyPage: item.pageSkills.filter(skill => !item.skills.includes(skill)),
        onlyMongo: item.skills.filter(skill => !item.pageSkills.includes(skill))
      })),
    noPage: state.items.filter(item => item.kind === 'project' && !item.page).map(item => ({ uid: item.uid, name: item.name })),
    pageWithoutDoc: Object.entries(pages).filter(([id]) => !projectIds.has(id)).map(([id, page]) => ({ id, page: page.file })),
    storeDrift: state.items
      .filter(item => item.kind === 'course' && (!item.storeSkills || !same(item.storeSkills, item.skills)))
      .map(item => ({ uid: item.uid, name: item.name })),
    orphanCourseDocs: raw.courses
      .filter(doc => !state.items.some(item => item.kind === 'course' && item.key === doc.name))
      .map(doc => doc.name)
  };
}

/* ---------- operations (pure: they only change the in-memory state) ---------- */

function applyOp(state, op) {
  const master = state.master;
  const has = skill => master.skills.includes(skill);
  const text = value => String(value == null ? '' : value).trim();
  const find = uid => {
    const item = state.items.find(entry => entry.uid === uid);
    if (!item) throw fail(`No such item: ${uid}`);
    return item;
  };
  const checkCats = list => {
    for (const cat of list) if (!master.cats[cat]) throw fail(`Unknown category "${cat}"`);
  };

  switch (op.type) {
    case 'batch':
      for (const child of op.ops || []) applyOp(state, child);
      return;

    case 'skill.add': {
      const name = text(op.name);
      if (!name) throw fail('A skill needs a name');
      if (has(name)) throw fail(`"${name}" is already on the master list`);
      const cats = op.categories || [];
      if (!cats.length) throw fail('Pick at least one category');
      checkCats(cats);
      master.skills.push(name);
      for (const cat of cats) master.cats[cat].push(name);
      return;
    }

    case 'skill.rename': {
      const from = text(op.from);
      const to = text(op.to);
      if (!has(from)) throw fail(`"${from}" is not on the master list`);
      if (!to) throw fail('The new name is empty');
      if (has(to)) throw fail(`"${to}" already exists. Use merge instead.`);
      const swap = list => list.map(skill => (skill === from ? to : skill));
      master.skills = swap(master.skills);
      for (const cat of Object.keys(master.cats)) master.cats[cat] = swap(master.cats[cat]);
      for (const item of state.items) item.skills = uniq(swap(item.skills));
      return;
    }

    case 'skill.merge': {
      const from = text(op.from);
      const into = text(op.into);
      if (!has(from)) throw fail(`"${from}" is not on the master list`);
      if (!has(into)) throw fail(`"${into}" is not on the master list`);
      if (from === into) throw fail('Cannot merge a skill into itself');
      master.skills = master.skills.filter(skill => skill !== from);
      for (const cat of Object.keys(master.cats)) master.cats[cat] = master.cats[cat].filter(skill => skill !== from);
      for (const item of state.items) item.skills = uniq(item.skills.map(skill => (skill === from ? into : skill)));
      return;
    }

    case 'skill.remove': {
      const name = text(op.name);
      master.skills = master.skills.filter(skill => skill !== name);
      for (const cat of Object.keys(master.cats)) master.cats[cat] = master.cats[cat].filter(skill => skill !== name);
      for (const item of state.items) item.skills = item.skills.filter(skill => skill !== name);
      return;
    }

    case 'skill.categories': {
      const name = text(op.name);
      if (!has(name)) throw fail(`"${name}" is not on the master list`);
      const cats = op.categories || [];
      checkCats(cats);
      for (const cat of Object.keys(master.cats)) {
        const without = master.cats[cat].filter(skill => skill !== name);
        master.cats[cat] = cats.includes(cat) ? (master.cats[cat].includes(name) ? master.cats[cat] : [...without, name]) : without;
      }
      return;
    }

    case 'item.skills':
      find(op.uid).skills = uniq((op.skills || []).map(text).filter(Boolean));
      return;

    case 'item.addSkills': {
      const item = find(op.uid);
      item.skills = uniq([...item.skills, ...(op.skills || []).map(text).filter(Boolean)]);
      return;
    }

    case 'item.removeSkills': {
      const item = find(op.uid);
      const drop = new Set((op.skills || []).map(text));
      item.skills = item.skills.filter(skill => !drop.has(skill));
      return;
    }

    case 'item.fields': {
      const item = find(op.uid);
      for (const [field, value] of Object.entries(op.fields || {})) {
        if (!FIELDS[item.kind].includes(field)) throw fail(`"${field}" is not an editable field of a ${item.kind}`);
        item.fields[field] = text(value);
      }
      item.name = item.fields[NAME_FIELD[item.kind]];
      if (!item.name) throw fail(`A ${item.kind} needs a ${NAME_FIELD[item.kind]}`);
      if (item.kind === 'course') {
        if (state.items.some(other => other !== item && other.kind === 'course' && other.name === item.name)) {
          throw fail(`There is already a course called "${item.name}"`);
        }
        item.key = item.name;
      }
      return;
    }

    case 'item.add': {
      if (!CAN_ADD.includes(op.kind)) throw fail('Projects are created by adding a page under src/views/Projects');
      const fields = {};
      for (const field of FIELDS[op.kind]) fields[field] = text((op.fields || {})[field]);
      const name = fields[NAME_FIELD[op.kind]];
      if (!name) throw fail(`A ${op.kind} needs a ${NAME_FIELD[op.kind]}`);
      if (state.items.some(item => item.kind === op.kind && item.name === name)) throw fail(`There is already a ${op.kind} called "${name}"`);
      state.items.push({
        uid: `new:${crypto.randomUUID()}`, isNew: true, kind: op.kind, key: op.kind === 'course' ? name : '',
        name, sub: fields.company || '', skills: uniq((op.skills || []).map(text).filter(Boolean)), fields
      });
      return;
    }

    case 'item.remove': {
      const item = find(op.uid);
      if (item.kind === 'project' && item.page) {
        throw fail(`${item.name} still has a page (${item.page}). Delete the page and its route first.`);
      }
      state.items = state.items.filter(entry => entry !== item);
      return;
    }

    case 'course.resync':
      // nothing changes in the list itself; this just forces both stores to be rewritten
      find(op.uid).resync = true;
      return;

    case 'project.fromPage': {
      const item = find(op.uid);
      if (!item.pageSkills) throw fail(`${item.name} has no page to read skills from`);
      item.skills = [...item.pageSkills];
      return;
    }

    default:
      throw fail(`Unknown operation "${op.type}"`);
  }
}

/* What changed between two states, for the preview and for writing. */
function diffStates(before, after) {
  const masterBefore = new Set(before.master.skills);
  const masterAfter = new Set(after.master.skills);
  const catsOf = (state, skill) => Object.keys(state.master.cats).filter(cat => state.master.cats[cat].includes(skill));
  const master = {
    added: after.master.skills.filter(skill => !masterBefore.has(skill)),
    removed: before.master.skills.filter(skill => !masterAfter.has(skill)),
    categories: after.master.skills
      .filter(skill => masterBefore.has(skill) && !same(catsOf(before, skill), catsOf(after, skill)))
      .map(skill => ({ skill, from: catsOf(before, skill), to: catsOf(after, skill) }))
  };
  const items = [];
  const beforeByUid = new Map(before.items.map(item => [item.uid, item]));
  const afterUids = new Set(after.items.map(item => item.uid));
  for (const item of after.items) {
    const old = beforeByUid.get(item.uid);
    if (!old) {
      items.push({ uid: item.uid, kind: item.kind, name: item.name, change: 'added', skillsAdded: item.skills, skillsRemoved: [], fields: [] });
      continue;
    }
    const skillsAdded = item.skills.filter(skill => !old.skills.includes(skill));
    const skillsRemoved = old.skills.filter(skill => !item.skills.includes(skill));
    const fields = FIELDS[item.kind]
      .filter(field => (old.fields[field] || '') !== (item.fields[field] || ''))
      .map(field => ({ field, from: old.fields[field] || '', to: item.fields[field] || '' }));
    let reordered = !skillsAdded.length && !skillsRemoved.length && !same(old.skills, item.skills);
    if (item.resync) reordered = true;
    if (skillsAdded.length || skillsRemoved.length || fields.length || reordered) {
      items.push({ uid: item.uid, kind: item.kind, name: old.name, change: 'modified', skillsAdded, skillsRemoved, fields, reordered });
    }
  }
  for (const item of before.items) {
    if (!afterUids.has(item.uid)) {
      items.push({ uid: item.uid, kind: item.kind, name: item.name, change: 'removed', skillsAdded: [], skillsRemoved: item.skills, fields: [] });
    }
  }
  const masterChanged = master.added.length || master.removed.length || master.categories.length || !same(before.master, after.master);
  return { master, items, masterChanged: Boolean(masterChanged), empty: !masterChanged && !items.length };
}

/* An operation may not put a skill on an item unless the skill is on the master list. */
function assertValid(before, after) {
  const master = new Set(after.master.skills);
  const beforeByUid = new Map(before.items.map(item => [item.uid, item]));
  for (const item of after.items) {
    const old = beforeByUid.get(item.uid);
    for (const skill of item.skills) {
      if (!master.has(skill) && !(old && old.skills.includes(skill))) {
        throw fail(`"${skill}" is not on the master list. Add it there first, then put it on ${item.name}.`);
      }
    }
  }
}

/*
 * A project's page is the source of truth for its skills. If the page and
 * MongoDB already disagree, refuse to edit that project's skills until the
 * difference is resolved, so a page-only skill is never silently overwritten.
 */
function assertNoDrift(before, after) {
  const afterByUid = new Map(after.items.map(item => [item.uid, item]));
  for (const old of before.items) {
    if (old.kind !== 'project' || !old.pageSkills || same(old.pageSkills, old.skills)) continue;
    const item = afterByUid.get(old.uid);
    if (!item || same(item.skills, old.skills) || same(item.skills, old.pageSkills)) continue;
    throw fail(`${old.name}: its page (${old.page}) and MongoDB list different skills. Resolve that on the Overview tab first.`);
  }
}

/* ---------- writing ---------- */

function fieldUpdate(doc, fields, kind) {
  const set = {};
  const unset = {};
  for (const field of FIELDS[kind]) {
    const next = fields[field] || '';
    const current = doc[field] == null ? '' : String(doc[field]);
    if (next === current) continue;
    if (next === '') unset[field] = '';
    else set[field] = next;
  }
  return { set, unset };
}

function updateSpec(set, unset) {
  const spec = {};
  if (Object.keys(set).length) spec.$set = set;
  if (Object.keys(unset).length) spec.$unset = unset;
  return Object.keys(spec).length ? spec : null;
}

async function writeChanges(db, raw, before, after, diff) {
  if (diff.masterChanged) {
    const doc = raw.skills[0];
    const set = { skills: after.master.skills, ...after.master.cats };
    if (doc) await db.collection('skills').updateOne({ _id: doc._id }, { $set: set });
    else await db.collection('skills').insertOne(set);
  }

  const afterByUid = new Map(after.items.map(item => [item.uid, item]));
  const beforeByUid = new Map(before.items.map(item => [item.uid, item]));
  let coursesTouched = false;

  for (const change of diff.items) {
    const item = afterByUid.get(change.uid);
    const old = beforeByUid.get(change.uid);
    const kind = change.kind;

    if (kind === 'course') {
      coursesTouched = true;
      continue;
    }

    if (kind === 'project') {
      const doc = raw.projects.find(entry => String(entry.id) === (old || item).key);
      if (change.change === 'removed') {
        await db.collection('projects').deleteOne({ _id: doc._id });
        continue;
      }
      const { set, unset } = fieldUpdate(doc, item.fields, 'project');
      if (!same(doc.tags || [], item.skills)) set.tags = item.skills;
      const spec = updateSpec(set, unset);
      if (spec) await db.collection('projects').updateOne({ _id: doc._id }, spec);
      if (item.page && !same(old.skills, item.skills) && !same(item.pageSkills, item.skills)) writePageSkills(item.page, item.skills);
      continue;
    }

    const collection = kind === 'position' ? 'work' : 'certs';
    if (change.change === 'added') {
      const doc = { skills: item.skills };
      for (const field of FIELDS[kind]) if (item.fields[field]) doc[field] = item.fields[field];
      await db.collection(collection).insertOne(doc);
      continue;
    }
    const doc = raw[collection].find(entry => String(entry._id) === old.key);
    if (change.change === 'removed') {
      await db.collection(collection).deleteOne({ _id: doc._id });
      continue;
    }
    const { set, unset } = fieldUpdate(doc, item.fields, kind);
    if (!same(doc.skills || [], item.skills)) set.skills = item.skills;
    const spec = updateSpec(set, unset);
    if (spec) await db.collection(collection).updateOne({ _id: doc._id }, spec);
  }

  if (coursesTouched) {
    const education = raw.education[0];
    if (!education) throw fail('There is no education document to hold courses');
    const rawCourses = new Map((education.courses || []).map(course => [`course:${course.name}`, course]));
    const courses = after.items.filter(item => item.kind === 'course');
    await db.collection('education').updateOne(
      { _id: education._id },
      { $set: { courses: courses.map(item => ({ show: false, ...(rawCourses.get(item.uid) || {}), name: item.name, skills: item.skills })) } }
    );
    for (const change of diff.items.filter(entry => entry.kind === 'course')) {
      const item = afterByUid.get(change.uid);
      const old = beforeByUid.get(change.uid);
      if (change.change === 'removed') {
        await db.collection('courses').deleteMany({ name: old.name });
        continue;
      }
      await db.collection('courses').updateOne(
        { name: old ? old.name : item.name },
        { $set: { name: item.name, description: item.fields.description || '', skills: item.skills } },
        { upsert: true }
      );
    }
  }
}

/* ---------- backups ---------- */

function describe(diff) {
  const parts = [];
  if (diff.master.added.length) parts.push(`+${diff.master.added.length} master`);
  if (diff.master.removed.length) parts.push(`-${diff.master.removed.length} master`);
  if (diff.master.categories.length) parts.push(`${diff.master.categories.length} recategorised`);
  if (diff.items.length) parts.push(`${diff.items.length} item${diff.items.length === 1 ? '' : 's'}`);
  return parts.join(', ') || 'no change';
}

function snapshotPages() {
  const pages = {};
  if (!fs.existsSync(PAGES_DIR)) return pages;
  for (const file of fs.readdirSync(PAGES_DIR).filter(name => name.endsWith('.vue'))) {
    pages[file] = fs.readFileSync(path.join(PAGES_DIR, file), 'utf8');
  }
  return pages;
}

function saveBackup(raw, label, summary, folder = BACKUP_DIR) {
  fs.mkdirSync(folder, { recursive: true });
  const at = new Date().toISOString();
  const file = `${at.replace(/[:.]/g, '-')}.json`;
  const body = { at, label, summary, collections: EJSON.serialize(raw, { relaxed: false }), pages: snapshotPages() };
  fs.writeFileSync(path.join(folder, file), JSON.stringify(body));
  if (folder === BACKUP_DIR) {
    const all = listBackupFiles();
    for (const stale of all.slice(KEEP_BACKUPS)) fs.unlinkSync(path.join(BACKUP_DIR, stale));
  }
  return file;
}

function listBackupFiles() {
  if (!fs.existsSync(BACKUP_DIR)) return [];
  return fs.readdirSync(BACKUP_DIR).filter(name => name.endsWith('.json')).sort().reverse();
}

function listBackups() {
  return listBackupFiles().map(file => {
    try {
      const { at, label, summary } = JSON.parse(fs.readFileSync(path.join(BACKUP_DIR, file), 'utf8'));
      return { file, at, label, summary };
    } catch {
      return { file, at: null, label: '(unreadable)', summary: '' };
    }
  });
}

/* Put the database and the pages back to how a backup recorded them. */
async function restoreBackup(db, file) {
  if (!listBackupFiles().includes(file)) throw fail('No such backup');
  const backup = JSON.parse(fs.readFileSync(path.join(BACKUP_DIR, file), 'utf8'));
  const collections = EJSON.deserialize(backup.collections, { relaxed: false });
  saveBackup(await loadRaw(db), `before undoing "${backup.label}"`, '', path.join(BACKUP_DIR, 'undone'));
  for (const name of COLLECTIONS) {
    const docs = collections[name] || [];
    const collection = db.collection(name);
    for (const doc of docs) await collection.replaceOne({ _id: doc._id }, doc, { upsert: true });
    await collection.deleteMany({ _id: { $nin: docs.map(doc => doc._id) } });
  }
  for (const [name, content] of Object.entries(backup.pages || {})) {
    const full = path.join(PAGES_DIR, path.basename(name));
    if (fs.existsSync(full) && fs.readFileSync(full, 'utf8') !== content) fs.writeFileSync(full, content);
  }
  fs.unlinkSync(path.join(BACKUP_DIR, file));
  return backup;
}

/* ---------- http ---------- */

async function snapshot(db) {
  const raw = await loadRaw(db);
  const pages = readPages();
  const state = buildState(raw, pages);
  return { raw, pages, state };
}

function publicState(state, raw, pages) {
  return {
    master: state.master,
    items: state.items,
    health: health(state, raw, pages),
    db: (process.env.ADMIN_COLLECTION_PREFIX || '') + DB_NAME,
    fields: FIELDS,
    canAdd: CAN_ADD,
    backups: listBackups().length
  };
}

async function plan(db, op) {
  if (!op || !op.type) throw fail('No operation given');
  const { raw, pages, state } = await snapshot(db);
  const after = clone(state);
  applyOp(after, op);
  assertValid(state, after);
  assertNoDrift(state, after);
  return { raw, pages, before: state, after, diff: diffStates(state, after) };
}

let queue = Promise.resolve();
function exclusive(task) {
  const run = queue.then(task, task);
  queue = run.catch(() => {});
  return run;
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    request.on('data', chunk => {
      size += chunk.length;
      if (size > 2e6) reject(fail('Request too large'));
      else chunks.push(chunk);
    });
    request.on('end', () => {
      try { resolve(chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {}); }
      catch { reject(fail('Body is not valid JSON')); }
    });
    request.on('error', reject);
  });
}

async function route(db, request, body) {
  const url = new URL(request.url, 'http://localhost');
  const key = `${request.method} ${url.pathname}`;

  if (key === 'GET /api/state') {
    const { raw, pages, state } = await snapshot(db);
    return publicState(state, raw, pages);
  }
  if (key === 'POST /api/preview') {
    const { diff } = await plan(db, body.op);
    return { diff, summary: describe(diff) };
  }
  if (key === 'POST /api/apply') {
    return exclusive(async () => {
      const { raw, before, after, diff } = await plan(db, body.op);
      if (diff.empty) return { applied: false, summary: 'no change' };
      const summary = describe(diff);
      const backup = saveBackup(raw, body.label || body.op.type, summary);
      await writeChanges(db, raw, before, after, diff);
      const fresh = await snapshot(db);
      return { applied: true, summary, backup, state: publicState(fresh.state, fresh.raw, fresh.pages) };
    });
  }
  if (key === 'GET /api/backups') return { backups: listBackups() };
  if (key === 'POST /api/undo') {
    return exclusive(async () => {
      const file = body.file || listBackupFiles()[0];
      if (!file) throw fail('Nothing to undo');
      const backup = await restoreBackup(db, file);
      const fresh = await snapshot(db);
      return { undone: backup.label, state: publicState(fresh.state, fresh.raw, fresh.pages) };
    });
  }
  return null;
}

async function main() {
  const client = new MongoClient(mongoUri(), { serverSelectionTimeoutMS: 10000 });
  await client.connect();
  // ADMIN_COLLECTION_PREFIX points the tool at copies of the collections (used for testing it).
  const prefix = process.env.ADMIN_COLLECTION_PREFIX || '';
  const database = client.db(DB_NAME);
  const db = prefix ? { collection: name => database.collection(prefix + name) } : database;
  const page = () => fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8').replace('__ADMIN_TOKEN__', TOKEN);

  const server = http.createServer(async (request, response) => {
    const send = (status, payload, type = 'application/json') => {
      response.writeHead(status, { 'Content-Type': `${type}; charset=utf-8`, 'Cache-Control': 'no-store' });
      response.end(type === 'application/json' ? JSON.stringify(payload) : payload);
    };
    try {
      // Only this machine may talk to the console, and only the page it served.
      const host = (request.headers.host || '').split(':')[0];
      if (host !== '127.0.0.1' && host !== 'localhost') return send(403, { error: 'Local access only' });
      if (request.method === 'GET' && (request.url === '/' || request.url === '/index.html')) return send(200, page(), 'text/html');
      if (!request.url.startsWith('/api/')) return send(404, { error: 'Not found' });
      if (request.headers['x-admin-token'] !== TOKEN) return send(403, { error: 'Reload the page: this session has expired.' });
      const body = request.method === 'POST' ? await readBody(request) : {};
      const result = await route(db, request, body);
      if (result === null) return send(404, { error: 'Not found' });
      return send(200, result);
    } catch (error) {
      if (!error.expected) console.error(error);
      return send(error.expected ? 400 : 500, { error: error.message });
    }
  });

  server.listen(PORT, '127.0.0.1', () => {
    console.log(`\n  Portfolio data console: http://127.0.0.1:${PORT}\n  Database: ${DB_NAME}   Backups: ${path.relative(REPO_DIR, BACKUP_DIR)}\n  Ctrl+C to stop.\n`);
  });
  const stop = async () => { server.close(); await client.close(); process.exit(0); };
  process.on('SIGINT', stop);
  process.on('SIGTERM', stop);
}

if (require.main === module) {
  main().catch(error => { console.error(error.message); process.exit(1); });
}

module.exports = { applyOp, diffStates, assertValid, buildState, health, findSkillsLiteral, parseStrings };
