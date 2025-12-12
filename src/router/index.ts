import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Projects from '../views/Projects.vue';
import Services from '../views/Services.vue';
import Contact from '../views/Contact.vue';

import SustainProject from '../views/Projects/SUSTAIN.vue';
import ScrozamProject from '../views/Projects/Scrozam.vue';
import PurplWavProject from '../views/Projects/PurplWav.vue';
import NanoNestProject from '../views/Projects/NanoNest.vue';
import CodesItSimpleProject from '../views/Projects/CodesItSimple.vue';
import PortfolioProject from '../views/Projects/Portfolio.vue';
import TALIProject from '../views/Projects/TALI.vue';
import PureCanuckProject from '../views/Projects/PureCanuck.vue';
import WolvesSheepProject from '../views/Projects/WolvesAndSheep.vue';
import BunniesProject from '../views/Projects/Bunnies.vue';
import SpamDetectorProject from '../views/Projects/SpamDetector.vue';
import ScreecherProject from '../views/Projects/Screecher.vue';
import FileSharingProject from '../views/Projects/FileSharing.vue';
import DailyJournalProject from '../views/Projects/DailyJournal.vue';
import ChessBotProject from '../views/Projects/ChessBot.vue';
import ChillChatProject from '../views/Projects/ChillChat.vue';
import StatsJamProject from '../views/Projects/StatsJam.vue';
import MusicMoodMatcher from '../views/Projects/MusicMoodMatcher.vue';
import DocReader from '../views/Projects/DocReader.vue';
import MP3Renamer from '../views/Projects/MP3Renamer.vue';
import Modelcules from '../views/Projects/Modelcules.vue';
import MaiBuddy from '../views/Projects/MaiBuddy.vue';
import FastTrack from '../views/Projects/FastTrack.vue';
import MapleClear from '../views/Projects/MapleClear.vue';
import DevDuck from '../views/Projects/DevDuck.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  { 
    path: '/services',
    name: 'Services',
    component: Services
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  
  {
    path: '/projects/sustain',
    name: 'SustainProject',
    component: SustainProject,
    meta: { projectId: 1 }
  },
  { 
    path: '/projects/scrozam',
    name: 'ScrozamProject',
    component: ScrozamProject,
    meta: { projectId: 2 }
  },
  {
    path: '/projects/purplwav',
    name: 'PurplWavProject',
    component: PurplWavProject,
    meta: { projectId: 3 }
  },
  {
    path: '/projects/nanonest',
    name: 'NanoNestProject',
    component: NanoNestProject,
    meta: { projectId: 4 }
  },
  {
    path: '/projects/codes-it-simple',
    name: 'CodesItSimpleProject',
    component: CodesItSimpleProject,
    meta: { projectId: 5 }
  },
  { 
    path: '/projects/portfolio',
    name: 'PortfolioProject',
    component: PortfolioProject,
    meta: { projectId: 6 }
  },
  {
    path: '/projects/tali',
    name: 'TALIProject',
    component: TALIProject,
    meta: { projectId: 7 }
  },
  {
    path: '/projects/pure-canuck',
    name: 'PureCanuckProject',
    component: PureCanuckProject,
    meta: { projectId: 8 }
  },
  {
    path: '/projects/wolves-and-sheep',
    name: 'WolvesSheepProject',
    component: WolvesSheepProject,
    meta: { projectId: 9 }
  },
  {
    path: '/projects/bunnies',
    name: 'BunniesProject',
    component: BunniesProject,
    meta: { projectId: 10 }
  },
  {
    path: '/projects/spam-detector',
    name: 'SpamDetectorProject',
    component: SpamDetectorProject,
    meta: { projectId: 11 }
  },
  {
    path: '/projects/screecher',
    name: 'ScreecherProject',
    component: ScreecherProject,
    meta: { projectId: 12 }
  },
  {
    path: '/projects/file-sharing',
    name: 'FileSharingProject',
    component: FileSharingProject,
    meta: { projectId: 13 }
  },
  {
    path: '/projects/daily-journal',
    name: 'DailyJournalProject',
    component: DailyJournalProject,
    meta: { projectId: 14 }
  },
  {
    path: '/projects/chess-bot',
    name: 'ChessBotProject',
    component: ChessBotProject,
    meta: { projectId: 15 }
  },
  {
    path: '/projects/chill-chat',
    name: 'ChillChatProject',
    component: ChillChatProject,
    meta: { projectId: 16 }
  },
  {
    path: '/projects/statsjam',
    name: 'StatsJamProject',
    component: StatsJamProject,
    meta: { projectId: 17 }
  },
  {
    path: '/projects/doc-reader',
    name: 'DocReader',
    component: DocReader,
    meta: { projectId: 18 }
  },
  {
    path: '/projects/music-mood-matcher',
    name: 'MusicMoodMatcher',
    component: MusicMoodMatcher,
    meta: { projectId: 19 }
  },
  {
    path: '/projects/mp3-renamer',
    name: 'MP3Renamer',
    component: MP3Renamer,
    meta: { projectId: 20 }
  },
  {
    path: '/projects/modelcules',
    name: 'Modelcules',
    component: Modelcules,
    meta: { projectId: 21 }
  },
  {
    path: '/projects/mai-buddy',
    name: 'MaiBuddy',
    component: MaiBuddy,
    meta: { projectId: 22 }
  },
  {
    path: '/projects/fast-track',
    name: 'FastTrack',
    component: FastTrack,
    meta: { projectId: 23 }
  },
  {
    path: '/projects/mapleclear',
    name: 'MapleClear',
    component: MapleClear,
    meta: { projectId: 24 }
  },
  {
    path: '/projects/devduck',
    name: 'DevDuck',
    component: DevDuck,
    meta: { projectId: 25 }
  },

  // Legacy route support
  {
    path: String.raw`/views/Projects/:id(\d+)`,
    redirect: to => {
      const idToPathMap: Record<string, string> = {
        '1': '/projects/sustain',
        '2': '/projects/scrozam',
        '3': '/projects/purplwav',
        '4': '/projects/nanonest',
        '5': '/projects/codes-it-simple',
        '6': '/projects/portfolio',
        '7': '/projects/tali',
        '8': '/projects/pure-canuck',
        '9': '/projects/wolves-and-sheep',
        '10': '/projects/bunnies',
        '11': '/projects/spam-detector',
        '12': '/projects/screecher',
        '13': '/projects/file-sharing',
        '14': '/projects/daily-journal',
        '15': '/projects/chess-bot',
        '16': '/projects/chill-chat',
        '17': '/projects/statsjam',
        '18': '/projects/doc-reader',
        '19': '/projects/music-mood-matcher',
        '20': '/projects/mp3-renamer',
        '21': '/projects/modelcules',
        '22': '/projects/mai-buddy',
        '23': '/projects/fast-track',
        '24': '/projects/mapleclear',
        '25': '/projects/devduck',
      };
      return idToPathMap[to.params.id as string] || '/projects';
    }
  },
  
  // Add a catch-all redirect for project paths
  {
    path: '/project/:id',
    redirect: to => {
      const id = to.params.id as string;
      const idToPathMap: Record<string, string> = {
        '1': '/projects/sustain',
        '2': '/projects/scrozam',
        '3': '/projects/purplwav',
        '4': '/projects/nanonest',
        '5': '/projects/codes-it-simple',
        '6': '/projects/portfolio',
        '7': '/projects/tali',
        '8': '/projects/pure-canuck',
        '9': '/projects/wolves-and-sheep',
        '10': '/projects/bunnies',
        '11': '/projects/spam-detector',
        '12': '/projects/screecher',
        '13': '/projects/file-sharing',
        '14': '/projects/daily-journal',
        '15': '/projects/chess-bot',
        '16': '/projects/chill-chat',
        '17': '/projects/statsjam',
        '18': '/projects/doc-reader',
        '19': '/projects/music-mood-matcher',
        '20': '/projects/mp3-renamer',
        '21': '/projects/modelcules',
        '22': '/projects/mai-buddy',
        '23': '/projects/fast-track',
        '24': '/projects/mapleclear',
        '25': '/projects/devduck',
      };

      return idToPathMap[id] || '/projects';
    }
  },
  
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

export default router;