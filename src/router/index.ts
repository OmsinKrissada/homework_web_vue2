import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (localStorage['access_token']) return next('/dashboard');
      else return next();
    }
  },
  {
    path: '/callback/discord',
    name: 'Callback',
    component: () => import(/* webpackChunkName: "about" */ '../views/Callback.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashbaord',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
