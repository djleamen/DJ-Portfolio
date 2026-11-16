import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Projects from '../views/Projects.vue';
import Services from '../views/Services.vue';
import Contact from '../views/Contact.vue';

import SustainProject from '../views/Projects/SUSTAIN.vue';
import ScrozamProject from '../views/Projects/Scrozam.vue';
import PurplWavProject from '../views/Projects/PurplWav.vue';
import TALIProject from '../views/Projects/TALI.vue';
import PureCanuckProject from '../views/Projects/PureCanuck.vue';
import DailyJournalProject from '../views/Projects/DailyJournal.vue';
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
import IntelligentApp from '../views/Projects/IntelligentApp.vue';
import SearchAdLearning from '../views/Projects/SearchAdLearning.vue';
import BetterVisualizer from '../views/Projects/BetterVisualizer.vue';
import OpportunityEngine from '../views/Projects/OpportunityEngine.vue';
import KAFTeradataFabric from '../views/Projects/KAFTeradataFabric.vue';
import Twinventory from '../views/Projects/Twinventory.vue';
import Blockgame from '../views/Projects/Blockgame.vue';
import BuildYourOwnX from '../views/Projects/BuildYourOwnX.vue';
import WorkWithMe from '../views/Projects/WorkWithMe.vue';
import TextClustering from '../views/Projects/TextClustering.vue';
import NeuralNetworkPlayground from '../views/Projects/NeuralNetworkPlayground.vue';
import AsciiVideo from '../views/Projects/AsciiVideo.vue';
import UniverseBadgeApps from '../views/Projects/UniverseBadgeApps.vue';

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
    path: '/projects/daily-journal',
    name: 'DailyJournalProject',
    component: DailyJournalProject,
    meta: { projectId: 14 }
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
  {
    path: '/projects/intelligent-app',
    name: 'IntelligentApplicationSystem',
    component: IntelligentApp,
    meta: { projectId: 26 }
  },
  {
    path: '/projects/search-ad-learning',
    name: 'SearchAdLearning',
    component: SearchAdLearning,
    meta: { projectId: 29 }
  },
  {
    path: '/projects/better-visualizer',
    name: 'BetterVisualizer',
    component: BetterVisualizer,
    meta: { projectId: 31 }
  },
  {
    path: '/projects/opportunity-engine',
    name: 'OpportunityEngine',
    component: OpportunityEngine,
    meta: { projectId: 32 }
  },
  {
    path: '/projects/kaf-teradata-fabric',
    name: 'KAFTeradataFabric',
    component: KAFTeradataFabric,
    meta: { projectId: 33 }
  },
  {
    path: '/projects/twinventory',
    name: 'Twinventory',
    component: Twinventory,
    meta: { projectId: 34 }
  },
  {
    path: '/projects/blockgame',
    name: 'Blockgame',
    component: Blockgame,
    meta: { projectId: 36 }
  },
  {
    path: '/projects/build-your-own-x',
    name: 'BuildYourOwnX',
    component: BuildYourOwnX,
    meta: { projectId: 37 }
  },
  {
    path: '/projects/work-with-me',
    name: 'WorkWithMe',
    component: WorkWithMe,
    meta: { projectId: 38 }
  },
  {
    path: '/projects/text-clustering',
    name: 'TextClustering',
    component: TextClustering,
    meta: { projectId: 39 }
  },
  {
    path: '/projects/neural-network-playground',
    name: 'NeuralNetworkPlayground',
    component: NeuralNetworkPlayground,
    meta: { projectId: 40 }
  },
  {
    path: '/projects/ascii-video',
    name: 'AsciiVideo',
    component: AsciiVideo,
    meta: { projectId: 41 }
  },
  {
    path: '/projects/universe-badge-apps',
    name: 'UniverseBadgeApps',
    component: UniverseBadgeApps,
    meta: { projectId: 43 }
  },

  // Retired project pages
  {
    path: '/projects/:retired(wolves-and-sheep|bunnies|chess-bot|screecher|spam-detector|file-sharing|nanonest|portfolio|stroke-prediction|social-media-performance-analysis|msft-ai-research|codes-it-simple)',
    redirect: '/projects'
  },

  // Legacy route support
  {
    path: String.raw`/views/Projects/:id(\d+)`,
    redirect: to => {
      const idToPathMap: Record<string, string> = {
        '1': '/projects/sustain',
        '2': '/projects/scrozam',
        '3': '/projects/purplwav',
        '7': '/projects/tali',
        '8': '/projects/pure-canuck',
        '14': '/projects/daily-journal',
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
        '26': '/projects/intelligent-app',
        '29': '/projects/search-ad-learning',
        '31': '/projects/better-visualizer',
        '32': '/projects/opportunity-engine',
        '33': '/projects/kaf-teradata-fabric',
        '34': '/projects/twinventory',
        '36': '/projects/blockgame',
        '37': '/projects/build-your-own-x',
        '38': '/projects/work-with-me',
        '39': '/projects/text-clustering',
        '40': '/projects/neural-network-playground',
        '41': '/projects/ascii-video',
        '43': '/projects/universe-badge-apps'
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
        '7': '/projects/tali',
        '8': '/projects/pure-canuck',
        '14': '/projects/daily-journal',
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
        '26': '/projects/intelligent-app',
        '29': '/projects/search-ad-learning',
        '31': '/projects/better-visualizer',
        '32': '/projects/opportunity-engine',
        '33': '/projects/kaf-teradata-fabric',
        '34': '/projects/twinventory',
        '36': '/projects/blockgame',
        '37': '/projects/build-your-own-x',
        '38': '/projects/work-with-me',
        '39': '/projects/text-clustering',
        '40': '/projects/neural-network-playground',
        '41': '/projects/ascii-video',
        '43': '/projects/universe-badge-apps'
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
  scrollBehavior() {
    return { top: 0, left: 0, behavior: 'auto' };
  }
});

export default router;