<template>
  <div class="manage">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">目录分类维护</el-menu-item>
      <el-menu-item index="2">目录注册及发布管理</el-menu-item>
      <el-menu-item index="3">目录导入导出</el-menu-item>
    </el-menu>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>
<script>
  
  export default {
    name: 'manage',
    data() {
      return {
        activeIndex: '1',
      }
    },
    mounted() {
      this.getPageRoute();
    },
    methods: {
      handleSelect(key) {
        var path = (key == 1? '/manage' : (key == 2? '/manage/register' : '/manage/imports'));
        this.$parent.headData.title = (key == 1? '目录分类维护' : (key == 2? '目录注册及发布管理' : '目录导入导出'))
        this.$router.push(path);
        window.sessionStorage.setItem('bd-manage-route', key);
      },
      getPageRoute() {
        var key = window.sessionStorage.getItem('bd-manage-route') || 1;
        this.$parent.headData.title = (key == 1? '目录分类维护' : (key == 2? '目录注册及发布管理' : '目录导入导出'))
        this.activeIndex = key;
        this.handleSelect(key);
      }
    }
  }
</script>
<style scoped lang="scss">
.manage {
  height: 100%;
  .content {
    height: calc(100% - 171px);
  }
}
</style>
