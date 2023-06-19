<template>
    <div class="home">
      <div class="data-box disflex js-around">
        <div v-for="(item, index) in dataList" :class="['data-item', 'data-item-' + index]" :key="index">
          <span class="title">{{item.title}}</span>
          <span class="num">{{item.value}}{{item.unit}}</span>
        </div>
      </div>
<!--      <div class="visit-box disflex js-around">-->
<!--        <div class="visit-item" v-for="(item, index) in visitList" :key="index">-->
<!--          <div class="top">-->
<!--            <div class="title">{{item.title}}</div>-->
<!--            <span>（数据集:{{item.num}}个 数据目录:{{item.total}}个）</span>-->
<!--          </div>-->
<!--          <ul>-->
<!--            <li v-for="(v, i) in item.data" :key="i"><a href="#">{{v}}</a></li>-->
<!--          </ul>-->
<!--        </div>-->
<!--      </div>-->
    </div>
</template>
<script>
  
  export default {
    name: 'home',
    data() {
      return {
        dataList: [
          {title: '数据存储量 ', value: '512', unit: 'MB'},
          {title: '数据记录 ', value: '3637', unit: '条'},
          {title: '数据集 ', value: '43', unit: '个'},
          {title: '分类目录 ', value: '94', unit: '个'},
        ],
        visitList: [{
          title: '体检必选项目',num: 27, total: 10,
          data: ['基本信息与健康相关信息', '体格检查', '实验室检查', '辅助检查']
        },{
          title: '体检备选项目',num: 18, total: 10,
          data: ['心血管病', '糖尿病', '慢阻肺（COPD）', '慢性肾脏疾病', '恶性肿瘤']
        }]
      }
    },
    mounted() {

    },
    methods: {
      
    }
  }
</script>
<style scoped lang="scss">
  .home {
    /*渐变的背景色*/
    /*height: 100vh;
    background-image: linear-gradient(to bottom right, #FC466B, #3F5EF8);
    overflow: hidden;*/
    /*背景图*/
    background: url("../../assets/bj.jpg");
    width: 100%;
    height: 100%;
    position: fixed;
    background-size: 100% 100%;
  }
  .data-box {
    padding-top: 350px;
    padding-left: 45%;
    width: 350px;
    .data-item {
      width: 30%;
      min-width: 350px;
      height: 80px;
      line-height: 80px;
      font-weight: bold;
      text-indent: 88px;
      background: #fff;
      float: left;
      background-position: 16px 9px!important;
      //border: 1px solid rgba(100, 100, 100, .1);
      border: none;
      .title {
        color: #050505;
        font-size: 26px;
      }
      .num {
        color: #3385ff;
        font-size: 28px;
      }
    }
    .data-item-0 {background: url('../../assets/images/1.png') no-repeat;}
    .data-item-1 {background: url('../../assets/images/2.png') no-repeat;}
    .data-item-2 {background: url('../../assets/images/3.png') no-repeat;}
    .data-item-3 {background: url('../../assets/images/4.png') no-repeat;}
  }
  .visit-box {
    .visit-item {
      width: 30%;
      margin-top: 50px;
      padding: 20px 0px;
      .top {
        border-bottom: 2px solid #e3ebf7;
        padding: 14px 0px 14px 30px;
        margin-bottom: 10px;
        overflow: hidden;
        .title {
          border-left: 3px solid #6894d1;
          //color: #2b6893;
          color: #3385ff;
          //color: #0e419c;
          cursor: pointer;
          font-weight: bold;
          font-size: 18px;
          line-height: 16px;
          text-indent: 12px;
          float: left;
          span {
            color: #666;
            font-size: 14px;
            display: block;
            float: left;
            margin-top: -2px;
          }
        }
      }
      li {
        text-indent: 2em;
        margin-top: 10px;
        list-style: none;
      }
    }
  }
</style>
