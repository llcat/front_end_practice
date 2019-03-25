import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './plugins/mint.js'
import echarts from 'echarts'
import api from './util/api'
import chartoptions from './util/chartoptions'

Vue.config.productionTip = false;

Vue.prototype.$api = api;
Vue.prototype.$chartoptions = chartoptions;
Vue.prototype.$echarts = echarts;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
