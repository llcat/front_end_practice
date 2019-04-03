import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.prototype.$iconSet = {
    react: require('@/assets/react.png'),
    vue: require('@/assets/vue.png'),
    element_ui: require('@/assets/element-ui.png'),
    antd: require('@/assets/antdesign.png'),
    echarts: require('@/assets/echarts.png'),
    webpack: require('@/assets/webpack.png'),
    sass: require('@/assets/sass.png')
}

Vue.prototype.$imgSet = {
    product: require('@/assets/product.png'),
    echartsDemo: require('@/assets/vue-echarts.png')
}

new Vue({
  render: h => h(App),
}).$mount('#app')
