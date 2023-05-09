import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import './assets/common.css';
import router from './router';

Vue.use(ElementUI);
Vue.config.productionTip = false


// const baseUrl = 'http://203.207.223.40:13204';
const baseUrl = 'http://218.245.3.121:16080';
const service = {
    ajax: (params) => {
      var param = {
          url: params.url.indexOf('http') != -1? params.url : baseUrl + params.url,
          method: (params.method || 'GET'),
          data: (params.data || null),
      };
      if (param.method == "GET") {
          return service.ajaxGet(param);
      } else {
          return service.ajaxPost(param);
      }
    },
    ajaxGet(param) {
        return axios.get(param.url, {
            params: param.data
        })
    },
    ajaxPost(param) {
        return axios.post(param.url, param.data)
    }
};
Vue.prototype.$axios = service.ajax;
Vue.prototype.$axios1 = axios;
Vue.prototype.$axiosget = service.ajaxGet;
let loading;
axios.interceptors.request.use(config => {
  // console.log(config.config.url);
  loading = ElementUI.Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  return config;
})

axios.interceptors.response.use(function (response) {
  loading.close();
  return Promise.resolve(response.data);
}, (error) => {
  console.error(error);
  loading.close();
  ElementUI.Message({
    type: 'error',
    message: '接口异常'
  })
  return Promise.reject(error);
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
