import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
import home from './views/home/home.vue'
import catalog from './views/catalog/catalog.vue'
import search from './views/search/search.vue'
import catalogdataelement from './views/catalog/catalogdataelement.vue'
import searchdataelement from './views/search/searchdataelement.vue'
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
      {path: '/imports', component: imports},
      {path: '/catalogdataelement', component: catalogdataelement},
      {path: '/searchdataelement', component: searchdataelement}
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
    ],

    // scrollBehavior (to, from, savedPosition) {
    //     if (savedPosition) {
    //         return savedPosition
    //     } else {
    //         return { x: 0, y: 0 }
    //     }
    // }

})