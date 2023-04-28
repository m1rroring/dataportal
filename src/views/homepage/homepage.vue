<template>
  <div id="page">
    <!-- <div class="header">
      <div class="head"></div>
    </div>
    <Head :data="headData"></Head> -->
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">信息资源目录</el-menu-item>
      <el-menu-item index="3">信息资源查询</el-menu-item>
    </el-menu>
    <div class="content">
      <router-view />
    </div>
    <div class="footer">
      
    </div>
  </div>
</template>

<script>
// import Head from '@/components/commonHead/head.vue';
export default {
  name: 'page',
  // components: {Head},
  data() {
    return {
      activeIndex: '1',
      headData: {
        title: '健康体检数据集检索系统'
      },
    }
  },
  mounted() {
    this.getPageRoute();
    this.$parent.headData.title = '健康体检数据集检索系统';
  },
  methods: {
    handleSelect(key) {
      var path = (key == 1? '/' : (key == 2? '/catalog' : '/search'));
      this.$router.push(path);
      window.sessionStorage.setItem('bd-route', key);
    },
    getPageRoute() {
      var key = window.sessionStorage.getItem('bd-route') || 1;
      this.activeIndex = key;
      this.handleSelect(key);
    }
  }
}
</script>

<style lang="scss">
  #page>.content {
    height: calc(100% - 171px);
  }
  .footer {
    height: 30px;
  }
  .header {
    background-image: linear-gradient(to right, #0f58af , #01093a);
    .head {
      width: 60%;
      height: 205px;
      margin: 0 auto;
      background: url('../../assets/timg.jpg') no-repeat;
      background-size: 100% 100%;
    }
  }
</style>
