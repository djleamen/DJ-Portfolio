import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Projects from '../views/Projects.vue';
import Services from '../views/Services.vue';
import Contact from '../views/Contact.vue';
import Project1 from '../views/Projects/1.vue';
import Project2 from '../views/Projects/2.vue';
import Project3 from '../views/Projects/3.vue';
import Project4 from '../views/Projects/4.vue';
import Project5 from '../views/Projects/5.vue';
import Project6 from '../views/Projects/6.vue';
import Project7 from '../views/Projects/7.vue';
import Project8 from '../views/Projects/8.vue';
import Project9 from '../views/Projects/9.vue';
import Project10 from '../views/Projects/10.vue';
import Project11 from '../views/Projects/11.vue';
import Project12 from '../views/Projects/12.vue';
import Project13 from '../views/Projects/13.vue';

const routes = [
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
    path: '/views/Projects/1',
    name: 'Project1',
    component: Project1
  },
  { 
    path: '/views/Projects/2',
    name: 'Project2',
    component: Project2
  },
  {
    path: '/views/Projects/3',
    name: 'Project3',
    component: Project3
  },
  {
    path: '/views/Projects/4',
    name: 'Project4',
    component: Project4
  },
  {
    path: '/views/Projects/5',
    name: 'Project5',
    component: Project5
  },
  { 
    path: '/views/Projects/6',
    name: 'Project6',
    component: Project6
  },
  {
    path: '/views/Projects/7',
    name: 'Project7',
    component: Project7
  },
  {
    path: '/views/Projects/8',
    name: 'Project8',
    component: Project8
  },
  {
    path: '/views/Projects/9',
    name: 'Project9',
    component: Project9
  },
  {
    path: '/views/Projects/10',
    name: 'Project10',
    component: Project10
  },
  {
    path: '/views/Projects/11',
    name: 'Project11',
    component: Project11
  },
  {
    path: '/views/Projects/12',
    name: 'Project12',
    component: Project12
  },
  {
    path: '/views/Projects/13',
    name: 'Project13',
    component: Project13
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