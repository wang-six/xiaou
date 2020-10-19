// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from "axios"
Vue.prototype.axios = axios

//引入字体图标
import "./assets/css/iconfont.css"
//引入css样式
import "./assets/css/reset.css"
//引入rem.js
import "./assets/js/rem"
//全局组件
import commonComponent from "./common"
//引入库
import store from "./store"

for (var i in commonComponent) {
    Vue.component(i, commonComponent[i])
}
//处理全局过滤器
import Filter from "./filters"
for (var i in Filter) {
    Vue.filter(i, Filter[i]);
}
//element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})