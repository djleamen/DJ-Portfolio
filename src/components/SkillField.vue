<template>
  <div
    ref="arena"
    class="skill-field"
    :class="{ 'is-live': live }"
    :style="live ? { height: `${arenaHeight}px` } : null"
    @pointermove="onPointerMove"
    @pointerleave="clearPointer"
    @pointercancel="clearPointer"
  >
    <button
      v-for="item in items"
      :key="item.name"
      type="button"
      class="skill-pill chip bevel"
      :class="`tier-${item.tier}`"
      :style="{ '--scale': item.scale }"
      :title="item.title"
      @click="emit('select', item.name)"
      @pointerenter="onPillEnter($event, item.name)"
      @pointerleave="setPinned(item.name, false)"
    >{{ item.name }}</button>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

/*
 * A field of skill pills sized by how often each skill is used.
 *
 * The browser lays the pills out as a normal wrapped row first; those
 * positions become each pill's "home". The pills are then lifted into a
 * small physics simulation: a soft spring holds each one near home, a slow
 * wander keeps them drifting, the cursor pulls nearby pills toward it, and
 * pills bounce off each other and the walls as axis-aligned boxes.
 *
 * With prefers-reduced-motion the pills simply stay in the wrapped layout.
 */
const props = defineProps({
  /** Skill names to show. */
  skills: { type: Array, required: true },
  /** name -> { total, projects, courses, certs, positions } for every skill. */
  usage: { type: Object, default: () => ({}) }
});
const emit = defineEmits(['select']);

const MIN_SCALE = 0.8;
const MAX_SCALE = 1.85;

const HOME = 1.5;        // spring toward the home position (1/s^2)
const WANDER = 16;       // idle drift acceleration (px/s^2)
const PULL = 190;        // cursor attraction at close range (px/s^2)
const REACH = 240;       // distance over which the attraction fades (px)
const DAMPING = 1.7;     // velocity decay (1/s)
const RESTITUTION = 0.62;
const GAP = 5;           // breathing room kept between pills (px)

const maxTotal = computed(() =>
  Math.max(1, ...Object.values(props.usage).map(entry => entry.total || 0))
);

function describe(name, entry) {
  if (!entry || !entry.total) return `${name}: not linked to anything yet`;
  const parts = [
    [entry.projects, 'project'],
    [entry.positions, 'position'],
    [entry.courses, 'course'],
    [entry.certs, 'certification']
  ]
    .filter(([count]) => count > 0)
    .map(([count, label]) => `${count} ${label}${count === 1 ? '' : 's'}`);
  return `${name}: ${parts.join(', ')}`;
}

const items = computed(() =>
  props.skills
    .map(name => {
      const entry = props.usage[name];
      const total = entry?.total || 0;
      const weight = Math.sqrt(total / maxTotal.value);
      let tier = 1;
      if (weight > 0.66) tier = 3;
      else if (weight > 0.4) tier = 2;
      return {
        name,
        total,
        tier,
        scale: (MIN_SCALE + (MAX_SCALE - MIN_SCALE) * weight).toFixed(3),
        title: describe(name, entry)
      };
    })
    .sort((a, b) => b.total - a.total || a.name.localeCompare(b.name))
);

const arena = ref(null);
const live = ref(false);
const arenaHeight = ref(0);

let bodies = [];
let byName = new Map();
let width = 0;
let height = 0;
let frame = 0;
let last = 0;
let clock = 0;
let visible = true;
let resizeTimer = 0;
let layoutRun = 0;
let resizeObserver = null;
let intersectionObserver = null;
let reduceMotion = null;
const pointer = { x: 0, y: 0, active: false };

function place(body) {
  body.el.style.transform =
    `translate3d(${(body.x - body.w / 2).toFixed(1)}px, ${(body.y - body.h / 2).toFixed(1)}px, 0)`;
}

function stop() {
  if (frame) cancelAnimationFrame(frame);
  frame = 0;
}

function start() {
  if (frame || !bodies.length || !visible || document.hidden) return;
  last = 0;
  frame = requestAnimationFrame(step);
}

/* Re-read the wrapped layout and restart the simulation from it. */
async function layout() {
  const run = ++layoutRun;
  stop();
  live.value = false;
  await nextTick();
  if (run !== layoutRun) return;

  const el = arena.value;
  if (!el) return;
  const nodes = [...el.querySelectorAll('.skill-pill')];
  nodes.forEach(node => { node.style.transform = ''; });
  bodies = [];
  byName = new Map();
  if (!nodes.length || reduceMotion?.matches) return;

  const flowHeight = el.clientHeight;
  const slack = Math.min(120, Math.max(40, flowHeight * 0.16));
  width = el.clientWidth;
  height = flowHeight + slack;

  let largest = 1;
  bodies = nodes.map((node, index) => {
    const w = node.offsetWidth;
    const h = node.offsetHeight;
    largest = Math.max(largest, w * h);
    const hx = node.offsetLeft + w / 2;
    const hy = node.offsetTop + h / 2 + slack / 2;
    return {
      el: node,
      name: items.value[index]?.name,
      w,
      h,
      hx,
      hy,
      // start a little off home so the field settles in with a few bounces
      x: hx + (Math.random() - 0.5) * 70,
      y: hy + (Math.random() - 0.5) * 50,
      vx: (Math.random() - 0.5) * 140,
      vy: (Math.random() - 0.5) * 140,
      f1: 0.35 + Math.random() * 0.5,
      f2: 0.35 + Math.random() * 0.5,
      p1: Math.random() * Math.PI * 2,
      p2: Math.random() * Math.PI * 2,
      pinned: false,
      inv: 1,
      agility: 1
    };
  });
  for (const body of bodies) {
    const mass = (body.w * body.h) / largest;   // 0..1, largest pill = 1
    body.inv = 1 / (0.25 + mass);                // small pills are pushed around more
    body.agility = 1.25 - 0.6 * mass;            // and follow the cursor more eagerly
    byName.set(body.name, body);
    place(body);
  }

  arenaHeight.value = height;
  live.value = true;
  start();
}

function collide() {
  const count = bodies.length;
  for (let i = 0; i < count; i++) {
    const a = bodies[i];
    for (let j = i + 1; j < count; j++) {
      const b = bodies[j];
      const dx = b.x - a.x;
      const px = (a.w + b.w) / 2 + GAP - Math.abs(dx);
      if (px <= 0) continue;
      const dy = b.y - a.y;
      const py = (a.h + b.h) / 2 + GAP - Math.abs(dy);
      if (py <= 0) continue;

      const ia = a.pinned ? 0 : a.inv;
      const ib = b.pinned ? 0 : b.inv;
      const sum = ia + ib;
      if (!sum) continue;

      // separate along the axis of least overlap, then bounce on that axis
      if (px < py) {
        const dir = dx < 0 ? -1 : 1;
        a.x -= dir * px * (ia / sum);
        b.x += dir * px * (ib / sum);
        const closing = (b.vx - a.vx) * dir;
        if (closing < 0) {
          const impulse = (-(1 + RESTITUTION) * closing) / sum;
          a.vx -= dir * impulse * ia;
          b.vx += dir * impulse * ib;
        }
      } else {
        const dir = dy < 0 ? -1 : 1;
        a.y -= dir * py * (ia / sum);
        b.y += dir * py * (ib / sum);
        const closing = (b.vy - a.vy) * dir;
        if (closing < 0) {
          const impulse = (-(1 + RESTITUTION) * closing) / sum;
          a.vy -= dir * impulse * ia;
          b.vy += dir * impulse * ib;
        }
      }
    }
  }
}

function step(now) {
  frame = requestAnimationFrame(step);
  const dt = last ? Math.min(0.034, (now - last) / 1000) : 0.016;
  last = now;
  clock += dt;
  const decay = Math.exp(-DAMPING * dt);

  for (const body of bodies) {
    if (body.pinned) {
      body.vx = 0;
      body.vy = 0;
      continue;
    }
    let ax = (body.hx - body.x) * HOME + Math.cos(clock * body.f1 + body.p1) * WANDER;
    let ay = (body.hy - body.y) * HOME + Math.sin(clock * body.f2 + body.p2) * WANDER;

    if (pointer.active) {
      const dx = pointer.x - body.x;
      const dy = pointer.y - body.y;
      const distSq = dx * dx + dy * dy;
      const dist = Math.sqrt(distSq) || 1;
      // fades with distance, and eases off right at the cursor so pills don't jitter
      const pull = (PULL * body.agility * Math.min(1, dist / 48)) / (1 + distSq / (REACH * REACH));
      ax += (dx / dist) * pull;
      ay += (dy / dist) * pull;
    }

    body.vx = (body.vx + ax * dt) * decay;
    body.vy = (body.vy + ay * dt) * decay;
    body.x += body.vx * dt;
    body.y += body.vy * dt;
  }

  collide();
  collide();

  for (const body of bodies) {
    const minX = body.w / 2 + 1;
    const maxX = width - body.w / 2 - 1;
    const minY = body.h / 2 + 1;
    const maxY = height - body.h / 2 - 1;
    if (body.x < minX) { body.x = minX; body.vx = Math.abs(body.vx) * RESTITUTION; }
    else if (body.x > maxX) { body.x = Math.max(minX, maxX); body.vx = -Math.abs(body.vx) * RESTITUTION; }
    if (body.y < minY) { body.y = minY; body.vy = Math.abs(body.vy) * RESTITUTION; }
    else if (body.y > maxY) { body.y = Math.max(minY, maxY); body.vy = -Math.abs(body.vy) * RESTITUTION; }
    place(body);
  }
}

function onPointerMove(event) {
  const el = arena.value;
  if (!el || !live.value) return;
  const rect = el.getBoundingClientRect();
  pointer.x = event.clientX - rect.left;
  pointer.y = event.clientY - rect.top;
  pointer.active = true;
}

function clearPointer() {
  pointer.active = false;
  for (const body of bodies) body.pinned = false;
}

/* The pill under a mouse holds still so it stays easy to click. */
function onPillEnter(event, name) {
  if (event.pointerType === 'mouse') setPinned(name, true);
}

function setPinned(name, pinned) {
  const body = byName.get(name);
  if (body) body.pinned = pinned;
}

function onVisibility() {
  if (document.hidden) stop();
  else start();
}

onMounted(() => {
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  reduceMotion.addEventListener('change', layout);
  document.addEventListener('visibilitychange', onVisibility);

  resizeObserver = new ResizeObserver(entries => {
    const next = Math.round(entries[0].contentRect.width);
    if (!width || Math.abs(next - width) < 2) return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(layout, 160);
  });
  resizeObserver.observe(arena.value);

  intersectionObserver = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (visible) start();
    else stop();
  });
  intersectionObserver.observe(arena.value);

  layout();
  // pill sizes change once the web fonts arrive
  document.fonts?.ready.then(() => { if (arena.value) layout(); });
});

watch(items, layout, { flush: 'post' });

onBeforeUnmount(() => {
  layoutRun++;
  stop();
  clearTimeout(resizeTimer);
  resizeObserver?.disconnect();
  intersectionObserver?.disconnect();
  reduceMotion?.removeEventListener('change', layout);
  document.removeEventListener('visibilitychange', onVisibility);
});
</script>

<style scoped>
.skill-field {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.skill-field.is-live {
  display: block;
  overflow: hidden;
}

.skill-field.is-live .skill-pill {
  position: absolute;
  top: 0;
  left: 0;
  will-change: transform;
}

.skill-pill {
  --cut: calc(6px * var(--scale, 1));
  max-width: 100%;
  min-height: 2.3em;
  padding: 0.38em 1em;
  font-size: calc(0.94rem * var(--scale, 1));
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
}

.skill-pill.tier-2 {
  --plate: var(--tonal);
  --stroke: var(--hairline-strong);
  color: var(--on-tonal);
}

.skill-pill.tier-3 {
  --plate: var(--fill);
  --stroke: var(--hairline-strong);
  color: var(--on-fill);
  font-weight: 600;
}

.skill-pill.tier-3:hover,
.skill-pill.tier-3:focus-visible {
  --plate: var(--fill-hover);
  color: var(--on-fill);
}

.skill-pill:focus-visible {
  --stroke: var(--accent);
  outline: none;
}

@media (max-width: 600px) {
  .skill-field { gap: 8px; }

  /* compress the size range so the largest pills still fit a phone */
  .skill-pill {
    --cut: calc(5px * (1 + (var(--scale, 1) - 1) * 0.5));
    font-size: calc(0.88rem * (1 + (var(--scale, 1) - 1) * 0.5));
  }
}
</style>

