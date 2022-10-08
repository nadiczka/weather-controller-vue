import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '*',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/components/TheHome'),
  },
  {
    path: '/outside',
    name: 'Outside',
    component: () => import('@/components/outside/TheOutside'),
  },
  {
    path: '/inside',
    name: 'Inside',
    component: () => import('@/components/inside/TheInside'),
  },
];

export const router = new VueRouter({
  routes,
});
