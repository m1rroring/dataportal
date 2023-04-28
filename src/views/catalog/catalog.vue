<template>
  <div class="catalog disflex">
    <div class="catalog-left">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="(item, index) in navData" :label="item.name" :name="item.activeName" :key="index"></el-tab-pane>
      </el-tabs>
      <div class="tree">
        <div v-for="(tree, intree) in treeData" :key="intree">
          <div class="tree-title set-point" @click="tree.isActive = !tree.isActive">
            <span :class="['set-right', tree.isActive == false? 'el-icon-arrow-right' : 'el-icon-arrow-down']"></span>
            {{tree.name}}[{{tree.childrens.length}}]
          </div>
          <div v-show="tree.isActive == true" class="tree-child set-point" v-for="(item, index) in tree.childrens" :key="index">
            <div class="tree-prent" v-show="item.leaf == false" @click="item.isActive = !item.isActive">
              <div>
                <span :class="['set-right', item.isActive == false? 'el-icon-arrow-right' : 'el-icon-arrow-down']"></span>
                {{item.name}}[{{getItmInfo(item)}}]
              </div>
            </div>
            <div v-show="item.isActive == true" class="tree-child-child set-point" v-for="(itm, idx) in item.childrens" :key="idx">
              <div v-show="itm.leaf == false" class="item-child" @click="handleChildChange(item, itm)">
                <span :class="['set-right']"></span>
                <span style="color: #606266">{{itm.name}} [{{getItmInfo(itm)}}]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="catalog-right">
        <div class="headers disflex js-between">
          <el-breadcrumb>
            <el-breadcrumb-item v-for="(item, index) in breadcrumbArr" :key="index">
              {{item}}
            </el-breadcrumb-item>
          </el-breadcrumb>
          <div class="totals">
            总条数: {{total}}条
          </div>
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
    name: 'catalog',
    components: {setdetail},
    data() {
      return {
        total: 0,
        pageSize: 0,
        isIndeterminate: false,
        activeName: '1',
        dialogVisible: false,
        dialog1Data: {
          dialogVisible1: false,
          dialogVisible1Data: {}
        },
        imageUrl: '',
        breadcrumbArr: [],
        navData: [
          {name: '政务信息资源分类', activeName: '1'},
          {name: '⾏业信息资源分类', activeName: '2'},
          {name: '出版信息资源分类', activeName: '3'},
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        treeData: [
          {
            name: '',
            leaf: false,
            isActive: false,
            childrens: []
          }
        ],
        rightData: [],
        leftChooseIdArr: [],
      }
    },
    mounted() {
      this.getTreeInfo(1);
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
      handleChildChange(data, data2) {
        this.breadcrumbArr[1] = data.name;
        this.breadcrumbArr[2] = data2.name;
        this.leftChooseIdArr = [];
        if (data2.childrens) {
          data2.childrens.forEach(v => {
            this.leftChooseIdArr.push(v.code.split('.')[1])
          })
        }
        this.getRightInfo();
      },
      async treeInfo() {
        this.breadcrumbArr = [];
        const data1 = await this.$axios({
          url: '/ctree/v1/node/get/code/1'
        });
        const data2 = await this.$axios({
          url: '/ctree/v1/node/get/code/4'
        });
        const data3 = await this.$axios({
          url: '/ctree/v1/node/get/code/5'
        });
        if (data1.childrens && data1.childrens.length > 0) {
          data1['isActive'] = true;
          this.breadcrumbArr.push(data1.name);
          data1.childrens.forEach((v, i)=> {
            if (i == 0) {
              v['isActive'] = true;
              this.breadcrumbArr.push(v.name);
              if (v.childrens) {
                this.breadcrumbArr.push(v.childrens[0].name);
              }
            }
            else v['isActive'] = false;
          })
        }
        if (data2.childrens && data2.childrens.length > 0) {
          data2['isActive'] = false;
          data2.childrens.forEach(v => {
            v['isActive'] = false;
          })
        }
        if (data3.childrens && data3.childrens.length > 0) {
          data3['isActive'] = false;
          data3.childrens.forEach(v => {
            v['isActive'] = false;
          })
        }
        this.treeData = [];
        this.treeData.push(data1);
        this.treeData.push(data2);
        this.treeData.push(data3);
        this.handleChildChange(data1.childrens[0], data1.childrens[0].childrens[0]);
      },
      getTreeInfo(num) {
        this.breadcrumbArr = [];
        if (num == 1) {
          this.treeInfo();
        } else {
          this.$axios({
            url: `/ctree/v1/node/get/code/${num}`
          }).then(json => {
            if (json.childrens && json.childrens.length > 0) {
              json['isActive'] = true; // false
              this.breadcrumbArr.push(json.name);
              json.childrens.forEach((v, i) => {
                if (i == 0) {
                  v['isActive'] = true;
                  this.breadcrumbArr.push(v.name);
                  if (v.childrens) this.breadcrumbArr.push(v.childrens[0].name);
                } else {
                  v['isActive'] = false;
                }
              })
            }
            this.treeData = [];
            this.treeData.push(json);
            this.handleChildChange(this.treeData[0].childrens[0], this.treeData[0].childrens[0].childrens[0]);
          })
        }
      },
      getRightInfo() {
        var arr = [];
        this.leftChooseIdArr.forEach(v => {
          arr.push({
            "accessPoint": "10.1.1","comparisonOperator":"Equal","value": v
          })
        })
        this.$axios({
          url: 'http://127.0.0.1:18082/catalog/rest/catalog/query',
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
                 if (v.itemName == '10.1.8') obj['gs'] = v.itemValues.join(' ');
                if (v.itemName == '10.1.10') obj['url'] = v.itemValues.join(' ');
                if (v.itemName == '10.1.9') obj['gx'] = v.itemValues.join(' ');
              })
              this.rightData.push(obj);
            })
          }
        })
      },
      handleClick() {
        this.getTreeInfo(this.activeName);
      },
      pageChange(size) {
        this.pageSize = size - 1;
        this.getRightInfo();
      },
      getItmInfo(itm) {
        let num = 0;
        if (itm.childrens) {
          num = itm.childrens.length;
        }
        return num;
      }
    }
  }
</script>
<style scoped lang="scss">
  .catalog {
    width: 100%;
    height: 100%;
    /deep/ .el-tabs__header {
      margin: 0;
    }
    .catalog-left {
      width: 25%;
      border-right: 1px solid #cccccc;
      height: 100%;
    }
    .catalog-right {
      width: 75%;
      height: 100%;
      .content {
        width: 100%;
        overflow-y: scroll;
        height: 500px;
      }
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
    .set-iframe {
      width: 96%;
      height: 500px;
    }
  }
  .tree {
    padding-left: 10px;
    padding-top: 10px;
    height: calc(100% - 54px);
    overflow-y: auto;
    .tree-child {
      padding-left: 10px;
      .tree-child-child {
        padding-left: 30px;
      }
    }
    .set-right {
      margin-right: 6px;
    }
    .set-point {
      cursor: pointer;
    }
    .item-child {
      font-size: 14px;
      color: #606266;
    }
  }
  .headers {
    margin: 20px 0px 10px 2%;
    .totals {
      margin-right: 2%;
    }
  }

</style>
