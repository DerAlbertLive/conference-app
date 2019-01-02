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
      redirect: '/favorites',
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () =>
      import(/* webpackChunkName: "favorites" */ './views/Favorites.vue'),
    },
    {
      path: '/sessions',
      name: 'sessions',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "sessions" */ './views/sessions/Sessions.vue'),
    },
    {
      path: '/sessions/:id',
      name: 'session',
      component: () =>
        import(/* webpackChunkName: "sessions" */ './views/sessions/Session.vue'),
    },
    {
      path: '/speakers',
      name: 'speakers',
      component: () =>
        import(/* webpackChunkName: "speakers" */ './views/speakers/Speakers.vue'),
    },
    {
      path: '/speakers/:id',
      name: 'speaker',
      component: () =>
        import(/* webpackChunkName: "speakers" */ './views/speakers/Speaker.vue'),
    },
    {
      path: '/information',
      name: 'info',
      component: () =>
        import(/* webpackChunkName: "information" */ './views/Information.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
