<template>
  <div class="home">
    <div class="data-box disflex js-around">
      <div v-for="(item, index) in dataList" :class="['data-item', 'data-item-' + index]" :key="index">
        <span class="title">{{item.title}}</span>
        <span class="num">{{item.value}}{{item.unit}}</span>
      </div>
    </div>
    <div class="visit-box disflex js-around">
      <div class="visit-item" v-for="(item, index) in visitList" :key="index">
        <div class="top">
          <div class="title">{{item.title}}</div>
          <span>（数据集:{{item.num}}个 数据目录:{{item.total}}个）</span>
        </div>
        <ul>
          <li v-for="(v, i) in item.data" :key="i"><a href="#">{{v}}</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  
  export default {
    name: 'home',
    data() {
      return {
        dataList: [
          {title: '数据存储量 ', value: '0.5', unit: 'G'},
          {title: '数据记录 ', value: '3001', unit: '条'},
          {title: '数据集 ', value: '45', unit: '个'},
          {title: '分类目录 ', value: '22', unit: '个'},
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
  .data-box {
    padding-top: 20px;
    .data-item {
      width: 19%;
      min-width: 275px;
      height: 63px;
      line-height: 63px;
      font-weight: bold;
      text-indent: 70px;
      background: #fff;
      float: left;
      background-position: 16px 9px!important;
      border: 1px solid rgba(100, 100, 100, .1);
      .title {
        color: #050505;
        font-size: 16px;
      }
      .num {
        color: #354f8a;
        font-size: 22px;
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
          color: #2b6893;
          cursor: pointer;
          font-weight: bold;
          font-size: 16px;
          line-height: 16px;
          text-indent: 12px;
          float: left;
          span {
            color: #666;
            font-size: 12px;
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
