<template>
  <div class="head disflex js-between">
    <!--
    <div class="title">{{data.title}}</div>
    <div class="opera disflex">
      <div class="usetext" v-if="data.name == ''" @click="loginUser">登录</div>
      <div class="usetext" v-else>{{data.name}}</div>
      <div class="usetext" @click="loginOut">退出</div>
    </div>
    -->
  </div>
</template>
<script>
  export default {
    name: 'high-head',
    props: ['data'],
    components: {},
    data() {
      return {
        
      }
    },
    mounted() {

    },
    methods: {
      loginUser() {
        this.$parent.dialogVisible = true;
      },
      loginOut() {
        this.$parent.loginOut();
      }
    }
  }
</script>
<style scoped>
  .head {
    height: 10px;
    background: #3385ff;
    line-height: 60px;
    vertical-align: middle;
    color: #ffffff;
  }
  .title {
    width: 60%;
    text-align: center;
    font-size: 22px;
    margin-left: 20%;
  }
  .opera {
    width: 10%;
  }
  .usetext {
    width: 60px;
    text-align: center;
    cursor: pointer;
  }
</style>
