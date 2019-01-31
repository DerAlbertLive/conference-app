import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import register from './registerServiceWorker';

Vue.config.productionTip = false;

register((registration) => {
  store.commit('swRegistered', registration);
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
