<template>
  <div id="App">
    <div class="header">
      <div class="head"></div>
    </div>
    <Head :data="headData"></Head>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="0">首页</el-menu-item>
      <el-menu-item v-for="(item, index) in navData" :key="index" :index="item.value" v-show="item.show == true">
        {{item.name}}
      </el-menu-item>
    </el-menu>
    <div class="content">
      <router-view />
    </div>
    <div class="footer">
      
    </div>
    
    <el-dialog title="登录" :visible.sync="dialogVisible" width="35%">
      <div class="dia-label">用户名称</div>
      <el-input v-model="name" placeholder="请输入名称"></el-input>
      <div class="dia-label">用户密码</div>
      <el-input placeholder="请输入密码" v-model="pasd" show-password></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="loginUser">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Head from '@/components/commonHead/head.vue';
import CryptoJS from "crypto-js";
export default {
  name: 'App',
  components: {Head},
  data() {
    return {
      activeIndex: '0',
      dialogVisible: false,
      name: '',
      pasd: '',
      headData: {
        title: '健康体检数据集检索系统',
        name: ''
      },
      navData: [
        {name: '信息资源目录', value: '1',title: 'CATALOG_VIEW', show: false},
        {name: '信息资源查询', value: '2',title: 'RESOURCE_SEARCH', show: false},
        {name: '目录分类维护', value: '3',title: 'CATALOG_MANAGEMENT', show: false},
        {name: '目录注册及发布管理', value: '4',title: 'RESOURCE_MANAGEMENT', show: false}
      ]
    }
  },
  mounted() {
    this.getPageRoute();
    this.setPageNav();
  },
  methods: {
    loginUser() {
      console.log(this.name, this.pasd);
      this.dialogVisible = false;
      window.CryptoJS = CryptoJS;
      const data = {
        grant_type: "password",
        client_id: "planmgr",
        client_secret: "planmgr",
        username: this.name,
        password: CryptoJS.MD5(
          decodeURIComponent(this.pasd)
        ).toString()
      };
      this.$axios({
        url: "http://203.207.223.40:13202/ums/oauth/token",
        data
      }).then(json => {
        if (json) {
          this.$router.push('/').catch(err => {err});
          this.getHasRole(json.access_token);
        }
      });
    },
    getHasRole(access_token) {
      var data = {
        access_token: access_token,
        account: this.name
      }
      this.$axios({
        url: 'http://203.207.223.40:13202/ums/rest/api/v1/query/user/res',
        data
      }).then(json => {
        if (json) {
          window.sessionStorage.setItem('bdsj-role', JSON.stringify({
            username: this.name,
            data: json
          }));
          this.setPageNav();
        }
      });
    },
    setPageNav() {
      if (window.sessionStorage.getItem('bdsj-role')) {
        var json = JSON.parse(window.sessionStorage.getItem('bdsj-role'));
        this.headData.name = json.username;
        json.data.forEach(v => {
          this.navData.forEach(item => {
            if (v.resSign == item.title) {
              item.show = true;
            }
          })
        })
      }
    },
    loginOut() {
      this.navData.forEach(v => {
        v.show = false;
      })
      this.headData.name = '';
      window.sessionStorage.removeItem('bd-route');
      window.sessionStorage.removeItem('bdsj-role');
      this.activeIndex = 0;
      this.handleSelect(0);
    },
    handleSelect(key) {
      var routerArr = [
        '/',
        '/catalog',
        '/search',
        '/maintain',
        '/register',
        '/imports'
      ]
      var path = routerArr[key];
      this.$router.push(path).catch(err => {err});
      window.sessionStorage.setItem('bd-route', key);
    },
    getPageRoute() {
      var key = window.sessionStorage.getItem('bd-route') || '0';
      this.activeIndex = key;
      this.handleSelect(key);
    }
  }
}
</script>

<style lang="scss" scoped>
  #App>.content {
    height: calc(100% - 171px);
  }
  .footer {
    height: 30px;
  }
  .header {
    background-image: linear-gradient(to right, #f3fdfc , #fbfbfb);
    .head {
      width: 50%;
      height: 205px;
      margin: 0 auto;
      background: url('./assets/banner.png') no-repeat;
      background-size: 100% 100%;
    }
  }
  .dia-label {
    margin: 10px 0px;
  }
  /deep/ div.el-dialog__footer {
    text-align: center!important;
  }
</style>
