import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
import home from './views/home/home.vue'
import catalog from './views/catalog/catalog.vue'
import search from './views/search/search.vue'

import maintain from './views/manage/maintain/maintain.vue'
import register from './views/manage/register/register.vue'
import imports from './views/manage/import/import.vue'

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
      {path: '/', component: home},
      {path: '/catalog', component: catalog},
      {path: '/search', component: search},
      {path: '/maintain', component: maintain},
      {path: '/register', component: register},
      {path: '/imports', component: imports}
        // {path: '/', component: homepage, children: [
        //   {path: '', component: home},
        //   {path: 'catalog', component: catalog},
        //   {path: 'search', component: search},
        // ]},
        // {path: '/manage', component: manage, children: [
        //   {path: '', component: maintain},
        //   {path: 'register', component: register},
        //   {path: 'imports', component: imports},
        // ]},
    ]
})
