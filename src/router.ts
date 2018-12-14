import Vue from 'vue';
import Router from 'vue-router';
import Favorites from './views/Favorites.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'favorites',
      component: Favorites,
    },
    {
      path: '/sessions',
      name: 'session',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "sessions" */ './views/Sessions.vue'),
    },
    {
      path: '/speakers',
      name: 'speakers',
      component: () => import(/* webpackChunkName: "speakers" */ './views/Speakers.vue'),
    },
    {
      path: '/information',
      name: 'info',
      component: () => import(/* webpackChunkName: "speakers" */ './views/Information.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
