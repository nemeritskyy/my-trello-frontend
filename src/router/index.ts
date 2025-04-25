import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/board/:board_id',
    name: 'board',
    component: () => import('../views/BoardView.vue'),
  },
  {
    path: '/board/:board_id/card/:card_id',
    name: 'card',
    component: () => import('../views/BoardView.vue'),
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
