import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './routes'

Vue.config.productionTip = false

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

/*
//Filters
Vue.filter('to-uppercase', value => {
  return value.toUpperCase();
})
Vue.filter('snippet', value => {
  return value.slice(0, 100) + '...';
})

// Custom directives
Vue.directive('rainbow', {
  bind(el, binding, vnode){
    el.style.color = "#" + Math.random().toString(16).slice(2,8);
  }
})
*/

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
