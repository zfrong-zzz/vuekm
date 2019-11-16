// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Router from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/index.css'

 import axios from 'axios'
 Vue.prototype.$http=axios
axios.defaults.baseURL='http://localhost:8888/api/private/v1';
axios.defaults.headers.common['Authorization'] =localStorage.getItem("token");

axios.interceptors.request.use(function (config) {

  if (config.url.indexOf('login') <= -1) {

    config.headers.Authorization = localStorage.getItem('token')
  }

  return config
})

 // 响应拦截器
axios.interceptors.response.use(function (response) {

if(response.data.meta.status==401){
    router.push("/login")
   localStorage.removeItem("token")
}
  return response
}) 

const originalPush=Router.prototype.push
Router.prototype.push=function push(location){
  return originalPush.call(this,location).catch(err=>err)
}

Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
