import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import HomeView from '../views/HomeView.vue';
import RegisterView from '../views/RegisterView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
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
