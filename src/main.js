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
          responseType: (params.responseType || 'json'),
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

router.beforeEach((to, from, next) => {
    // 让页面回到顶部
    // chrome
    document.body.scrollTop = 0;
    // firefox
    document.documentElement.scrollTop = 0;
    // safari
    // window.pageYOffset = 0;
    window.scrollTo(0,0);
    // 调用 next()，一定要调用 next 方法，否则钩子就不会被销毁
    // 这三句很重要，放进导航首位里面，就成功了，希望对你有帮助
    next()
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
