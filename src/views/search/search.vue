<template>
  <div class="search">
    <div class="searchbox disflex">
      <div class="input-box">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <el-button type="primary" size="small" round @click="getContent">查 询</el-button>
      <el-button type="primary" size="small" round @click="input = ''">重 置</el-button>
    </div>
    <div class="content">
      <div class="cr-title" v-for="(item, index) in rightData" :key="index">
          <div class="u-cata-main">
            <div class="u-cata-header">
              <div class="title-content disflex js-between">
                <div class="title pointer" :title="item.title" @click="popupDio(item)">{{item.title}}</div>
                <div class="icon-box">
                  <div class="l-ask">
                    <span>访问量：0</span>
                    <span>申请量：0</span>
                  </div>
                  <div class="l-ask">
                    <div class="property-container">
                      <span>共享属性</span>
                      <div :class="['source-property', item.gx == '共享'? 'setgreenbg' : 'setredbg']"></div>
                    </div>
                    <div class="property-container">
                      <span>开放属性</span>
                      <div :class="['source-property', item.kf == '开放'? 'setgreenbg' : 'setredbg']"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="u-cata-body">
              <div class="u-cata-info">
                <span>来源：{{item.ly}}</span>
                <span :title="item.content">信息资源摘要：{{item.content}}</span>
                <div>
                  <div class="u-cata-info">
                    <span>发布日期：{{item.time}}</span>
                  </div>
                </div>
              </div>
              <div class="u-cata-btn">
                <div class="opt-container">
                  <div :class="['l-opt', item.url && 'pointer']" @click="showPopup(item.url)">
                    <i :class="['fa', item.url? 'fa-list-img1' : 'fa-list-img']"></i>
                    <div :class="['type-name', item.url && 'blue']">图像</div>
                  </div>
                  <div class="l-opt">
                    <i class="fa fa-list-alt"></i>
                    <div class="type-name">库表</div>
                  </div>
                  <div class="l-opt">
                    <i class="fa fa-file"></i>
                    <div class="type-name">文件</div>
                  </div>
                  <div class="l-opt">
                    <i class="fa fa-folder"></i>
                    <div class="type-name">文件夹</div>
                  </div>
                  <div class="l-opt">
                    <i class="fa fa-server"></i>
                    <div class="type-name">接口</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    <div class="page disflex js-center">
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="pageChange"></el-pagination>
    </div>
    <el-dialog
      title="图像查看" :visible.sync="dialogVisible" width="60%" center>
      <iframe class="set-iframe" :src="imageUrl" frameborder="0"></iframe>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false" size="small">确 定</el-button>
      </span>
    </el-dialog> 
    <setdetail :data="dialog1Data" />
  </div>
</template>
<script>
  import setdetail from '../../components/setdetailPop/setdetailPop.vue'
  export default {
    name: 'home',
    components: {setdetail},
    data() {
      return {
        input: '',
        dialog1Data: {
          dialogVisible1: false,
          dialogVisible1Data: {}
        },
        dialogVisible: false,
        imageUrl: '',
        total: 0,
        pageSize: 0,
        rightData: []
      }
    },
    mounted() {
      this.getContent();
    },
    methods: {
      popupDio(data) {
        this.dialog1Data.dialogVisible1 = true;
        this.dialog1Data.dialogVisible1Data = data;
      },
      showPopup(url) {
        this.imageUrl = url;
        this.dialogVisible = true;
      },
      getContent() {
        var ele = ["10.1.1","10.1.2","10.1.4"];
        var arr = [];
        ele.forEach(v => {
          arr.push({
            "accessPoint": v,"comparisonOperator":"Like","value": (this.input || '1')
          })
        })
        this.$axios({
          url: 'http://203.207.223.40:13202/catalog/rest/catalog/query',
          method: 'POST',
          data: {
            "username":"guest",
            "password":"guest",
            "protocolVersion":"4.1",
            "databases":{"databaseId":["test"]},
            "query":{
              "logicOperator":"Or",
              "simpleCondition": arr
            },
            "elementSet":{
              "element":["10.1.1","10.1.2","10.1.3","10.1.4","10.1.5","10.1.6","10.1.7","10.1.8","10.1.9","10.1.10"]
            },
            "recordSetStartPoint":this.pageSize,
            "recordSetEndPoint":10
          }
        }).then(json => {
          this.total = json.totalNumberOfRecords;
          this.rightData = [];
          if (json.recordSet && json.recordSet.record) {
            json.recordSet.record.forEach(item => {
              var obj = {};
              item.itemList.items.forEach(v => {
                obj['kf'] = '开放';
                if (v.itemName == '10.1.2') obj['title'] = v.itemValues.join(' ');
                if (v.itemName == '10.1.5') obj['time'] = v.itemValues.join(' ');
                if (v.itemName == '10.1.6') obj['ly'] = v.itemValues.join(' ');
                if (v.itemName == '10.1.4') obj['content'] = v.itemValues.join(' ');
                if (v.itemName == '10.1.10') obj['url'] = v.itemValues.join(' ');
                if (v.itemName == '10.1.9') obj['gx'] = v.itemValues.join(' ');
              })
              this.rightData.push(obj);
            })
          }
        })
      },
      pageChange(size) {
        this.pageSize = size - 1;
        this.getContent();
      }
    }
  }
</script>
<style scoped lang="scss">
  .search {
    height: 100%;
    width: 96%;
    margin: 0 auto;
    .searchbox {
      margin: 10px 0 10px;
      .input-box {
        margin-right: 10px;
      }
    }
    .content {
      height: calc(100% - 50px);
      overflow-y: auto;
      .cr-title:hover {
        border-left: 3px solid #1067ab;;
      }
      .cr-title {
        color: #999;
        line-height: 22px;
        font-size: 12px;
        background-color: #fff;
        border: 1px solid #eee;
        border-left: 3px solid #ddd;
        border-radius: 3px;
        overflow: hidden;
        transition: .5s;
        width: 100%;
        width: 96%;
        margin: 10px auto 0;
        padding-bottom: 10px;
        .u-cata-main {
          padding: 15px 20px;
          .u-cata-header {
            padding-right: 0;
            overflow: visible;
            height: 50px;
            padding-bottom: 5px;
            margin-bottom: 5px;
            border-bottom: 1px solid #eee;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            .title-content {
              .title {
                font-size: 18px;
                color: #1067ab;
                transition: .5s;
                display: inline-block;
                max-width: 400px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 18px;
                color: #1067ab;
                transition: .5s;
                margin-top: 10px;
              }
            }
            .l-ask {
              position: relative;
              float: right;
              padding-left: 10px;
              margin-top: 10px;
              display: inline-block;
              margin-left: 10px;
              padding-left: 0px;
              span {
                margin-left: 10px;
              }
              .property-container {
                display: inline-block;
              }
              .setredbg {
                background: url('../../assets/images/pro-red.png') no-repeat;
              }
              .setgreenbg {
                background: url('../../assets/images/pro-green.png') no-repeat;
              }
              .source-property {
                display: inline-block;
                width: 14px;
                height: 14px;
                float: right;
                margin-left: 5px;
                margin-top: 3px;
              }
            }
          }
          .u-cata-body {
            .u-cata-info {
              width: 60%;
              float: left;
              margin: 3px 0;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              span {
                margin-right: 10px;
              }
            }
            .u-cata-btn {
              // width: 29%;
              float: right;
              .opt-container {
                float: left;
                padding-right: 10px;
                position: relative;
                border-right: none;
                .l-opt {
                  width: 42px;
                  height: 42px;
                  border-radius: 3px;
                  border: 1px solid #ccc;
                  color: #ccc;
                  float: left;
                  margin-top: 3px;
                  margin-right: 15px;
                  font-size: 12px;
                  .fa {
                    width: 100%!important;
                    margin: 5px 0 0 0;
                    text-align: center;
                    font-size: 16px;
                    display: inline-block;
                    font: normal normal normal 14px/1 FontAwesome;
                    text-rendering: auto;
                    -webkit-font-smoothing: antialiased;
                    position: relative;
                  }
                  .fa-list-alt:before {
                    content: "";
                    width: 26px;
                    height: 26px;
                    position: absolute;
                    top: -14px;
                    left: 8px;
                    background: url('../../assets/images/kubiao1.png') no-repeat;
                    background-size: 100% 100%;
                  }
                  .fa-file:before {
                    content: "";
                    width: 26px;
                    height: 26px;
                    top: -14px;
                    left: 8px;
                    position: absolute;
                    background: url('../../assets/images/webjian2.png') no-repeat;
                    background-size: 100% 100%;
                  }
                  .fa-folder:before {
                    content: "";
                    width: 26px;
                    height: 26px;
                    position: absolute;
                    top: -14px;
                    left: 8px;
                    background: url('../../assets/images/wenjian1.png') no-repeat;
                    background-size: 100% 100%;
                  }
                  .fa-server:before {
                    content: "";
                    width: 26px;
                    height: 26px;
                    position: absolute;
                    top: -14px;
                    left: 8px;
                    background: url('../../assets/images/jiekou1.png') no-repeat;
                    background-size: 100% 100%;
                  }
                  .type-name {
                    width: 100%!important;
                    text-align: center;
                    font-size: 12px!important;
                  }
                }
              }
            }
          }
        }
      }
    }
    .fa-list-img:before {
      content: "";
      width: 26px;
      height: 26px;
      position: absolute;
      top: -14px;
      left: 8px;
      background: url('../../assets/images/image.png') no-repeat;
      background-size: 100% 100%;
    }
    .fa-list-img1:before {
      content: "";
      width: 26px;
      height: 26px;
      position: absolute;
      top: -14px;
      left: 8px;
      background: url('../../assets/images/image1.png') no-repeat;
      background-size: 100% 100%;
    }
    .blue {
      color: #1067ab;
    }
    .set-iframe {
      width: 96%;
      height: 500px;
    }
  }
</style>
