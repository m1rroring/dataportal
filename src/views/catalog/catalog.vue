<template>
  <div class="catalog disflex">
    <div class="catalog-left">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="(item, index) in navData" :label="item.name" :name="item.activeName" :key="index"></el-tab-pane>
      </el-tabs>
      <div class="tree">
<!--        <div v-for="(tree, intree) in treeData" :key="intree">-->
<!--          <div class="tree-title set-point" @click="tree.isActive = !tree.isActive">-->
<!--            <span :class="['set-right', tree.isActive == false? 'el-icon-arrow-right' : 'el-icon-arrow-down']"></span>-->
<!--            {{tree.name}}[{{tree.childrens.length}}]-->
<!--          </div>-->
<!--          <div v-show="tree.isActive == true" class="tree-child set-point" v-for="(item, index) in tree.childrens" :key="index">-->
<!--            <div class="tree-prent" v-show="item.leaf == false" @click="item.isActive = !item.isActive">-->
<!--              <div>-->
<!--                <span :class="['set-right', item.isActive == false? 'el-icon-arrow-right' : 'el-icon-arrow-down']"></span>-->
<!--                {{item.name}}[{{getItmInfo(item)}}]-->
<!--              </div>-->
<!--            </div>-->
<!--            <div v-show="item.isActive == true" class="tree-child-child set-point" v-for="(itm, idx) in item.childrens" :key="idx">-->
<!--              <div v-show="itm.leaf == false" class="item-child" @click="handleChildChange(item, itm)">-->
<!--                <span :class="['set-right']"></span>-->
<!--                <span style="color: #606266">{{itm.name}} [{{getItmInfo(itm)}}]</span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
        <el-tree
            :data="treeData"
            :props="defaultProps"
            ref="catalogtree"
            node-key="code"
            :default-expanded-keys="['A', 'B']"
            @node-click="handleNodeClick">
        </el-tree>
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
            数据集: {{total}}项
          </div>
        </div>
      <div class="content">
        <div class="cr-title" v-for="(item, index) in rightData" :key="index">
          <div class="u-cata-main">
            <div class="u-cata-header">
              <div class="title-content disflex js-between">
                <div class="title pointer" :title="item.datasetName" @click="popupDio(item)">{{item.datasetName}}</div>
<!--                <div class="icon-box">-->
<!--                  <div class="l-ask">-->
<!--                    <span>访问量：0</span>-->
<!--                    <span>申请量：0</span>-->
<!--                  </div>-->
<!--                  <div class="l-ask">-->
<!--                    <div class="property-container">-->
<!--                      <span>共享属性</span>-->
<!--                      <div :class="['source-property', item.gx == '共享'? 'setgreenbg' : 'setredbg']"></div>-->
<!--                    </div>-->
<!--                    <div class="property-container">-->
<!--                      <span>开放属性</span>-->
<!--                      <div :class="['source-property', item.kf == '开放'? 'setgreenbg' : 'setredbg']"></div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
              </div>
            </div>
            <div class="u-cata-body">
              <div class="u-cata-info">
                <span>来源：{{item.distOrgName}}</span><br/>
                <span>摘要：{{item.abstract}}</span>
              </div>
              <div class="u-cata-btn">
                <div class="opt-container">
<!--                  <div :class="['l-opt', item.url && 'pointer']" @click="showPopup(item.url)">-->
<!--                    <i :class="['fa', item.url? 'fa-list-img1' : 'fa-list-img']"></i>-->
<!--                    <div :class="['type-name', item.url && 'blue']">图像</div>-->
<!--                  </div>-->
                  <div class="l-opt" @click="showTablePopup(item.datasetCode)">
                    <i class="fa fa-list-alt"></i>
                    <div class="type-name">数据集</div>
                  </div>
                  <div class="l-opt">
                    <i class="fa fa-file"></i>
                    <div class="type-name">文件</div>
                  </div>
<!--                  <div class="l-opt">-->
<!--                    <i class="fa fa-folder"></i>-->
<!--                    <div class="type-name">文件夹</div>-->
<!--                  </div>-->
<!--                  <div class="l-opt">-->
<!--                    <i class="fa fa-server"></i>-->
<!--                    <div class="type-name">接口</div>-->
<!--                  </div>-->
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <div class="page disflex js-center">
        <el-pagination
            ref="searchPage"
            background
            @size-change="handleSizeChange"
            @current-change="pageChange"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total=this.total>
        </el-pagination>
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
    <setelement :data="elementDialogData" />
  </div>
</template>
<script>
  import setdetail from '../../components/setdetailPop/setdetailPop.vue';
  import setelement from '../../components/setdetailPop/setDataElementPop.vue';
  import {codeAt} from "core-js/internals/string-multibyte";
  export default {
    name: 'catalog',
    components: {setdetail,setelement},
    data() {
      return {
        total: 0,
        startPoint: 0,
        pageSize: 10,
        tableTotal: 0,
        tablePage: 1,
        tablePageSize: 10,
        tableColSet: [],
        tableDataSet: [],
        isIndeterminate: false,
        activeName: '1',
        dialogVisible: false,
        dialog1Data: {
          dialogVisible1: false,
          dialogVisible1Data: {}
        },
        elementDialogVisible: false,
        elementDialogData: {
            eleDialogVisible: false,
            eleDialogColData: {},
            eleDialogData: {},
        },
        imageUrl: '',
        breadcrumbArr: [],
        navData: [
          {name: '健康体检数据集目录', activeName: '1'},
          // {name: '分类2', activeName: '2'},
          // {name: '分类3', activeName: '3'},
        ],
        defaultProps: {
          children: 'childrens',
          label: 'name'
        },
        treeData: [
          {
            name: '',
            code: '',
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
      // this.getTreeInfo(1);
      // this.getTreeInfo(0);
      this.treeInfo();
    },
    methods: {
      codeAt,
      popupDio(data) {
        this.dialog1Data.dialogVisible1 = true;
        this.dialog1Data.dialogVisible1Data = data;
      },
      popupEle(coldata,eledata){
          this.elementDialogData.eleDialogVisible = true;
          this.elementDialogData.eleDialogColData = coldata;
          this.elementDialogData.eleDialogData = eledata;
      },
      showPopup(url) {
        this.imageUrl = url;
        this.dialogVisible = true;
      },
      // handleChildChange(data, data2) {
      //   this.breadcrumbArr[1] = data.name;
      //   this.breadcrumbArr[2] = data2.name;
      //   this.leftChooseIdArr = [];
      //   if (data2.childrens) {
      //     data2.childrens.forEach(v => {
      //       // this.leftChooseIdArr.push(v.code.split('.')[1])
      //       this.leftChooseIdArr.push(v.name)
      //       // console.log(v.name);
      //     })
      //   }
      //   this.getRightInfo();
      // },
      handleNodeClick(data, node){
        console.log(node);
        // console.log(node.parent.data.name);
        let valnode = node.data;
        this.leftChooseIdArr = [];
        if (valnode.childrens) {
          this.getLeafNodes(valnode);
        }else{
          this.leftChooseIdArr.push(valnode.name);
        }
        this.breadcrumbArr = [];
        this.getParentPath(node);
        console.log(this.breadcrumbArr);
        this.getRightInfo();
      },
      getLeafNodes(node){
          node.childrens.forEach(item => {
            if(item.childrens){
              this.getLeafNodes(item);
            }else{
              this.leftChooseIdArr.push(item.name);
            }
          })
      },
      getParentPath(node){
        // this.breadcrumbArr.push(node.data.name);
        if (node.data.name) {
          this.breadcrumbArr.unshift(node.data.name)
        }

        if (node.parent) {
          this.getParentPath(node.parent);
        }
      },
      async treeInfo() {
        this.breadcrumbArr = [];
        const data1 = await this.$axios({
          // url: '/ctree/v1/node/get/code/1'
          url: '/ctree/v1/node/get/code/0'
        });
        // const data2 = await this.$axios({
        //   // url: '/ctree/v1/node/get/code/4'
        //   url: '/ctree/v1/node/get/code/0'
        // });
        // const data3 = await this.$axios({
        //   // url: '/ctree/v1/node/get/code/5'
        //   url: '/ctree/v1/node/get/code/0'
        // });
        // if (data1.childrens && data1.childrens.length > 0) {
        //   console.log(data1);
        //   data1['isActive'] = true;
        //   this.breadcrumbArr.push(data1.name);
        //   data1.childrens.forEach((v, i)=> {
        //     if (i == 0) {
        //       v['isActive'] = true;
        //       this.breadcrumbArr.push(v.name);
        //       if (v.childrens) {
        //         this.breadcrumbArr.push(v.childrens[0].name);
        //       }
        //     }
        //     else v['isActive'] = false;
        //   })
        // }
        // if (data2.childrens && data2.childrens.length > 0) {
        //   data2['isActive'] = false;
        //   data2.childrens.forEach(v => {
        //     v['isActive'] = false;
        //   })
        // }
        // if (data3.childrens && data3.childrens.length > 0) {
        //   data3['isActive'] = false;
        //   data3.childrens.forEach(v => {
        //     v['isActive'] = false;
        //   })
        // }
        this.treeData = [];
        this.treeData.push(data1);
        console.log(data1);
        this.breadcrumbArr = [];
        this.breadcrumbArr.unshift(data1.name);
        this.leftChooseIdArr = [];
        this.getLeafNodes(data1);
        this.getRightInfo();

        // this.treeData.push(data2);
        // this.treeData.push(data3);
        // this.handleChildChange(data1.childrens[0], data1.childrens[0].childrens[0]);
      },
      // getTreeInfo(num) {
      //   this.breadcrumbArr = [];
      //   if (num == 1) {
      //     this.treeInfo();
      //   } else {
      //     this.$axios({
      //       url: `/ctree/v1/node/get/code/${num}`
      //     }).then(json => {
      //       if (json.childrens && json.childrens.length > 0) {
      //         json['isActive'] = true; // false
      //         this.breadcrumbArr.push(json.name);
      //         json.childrens.forEach((v, i) => {
      //           if (i == 0) {
      //             v['isActive'] = true;
      //             this.breadcrumbArr.push(v.name);
      //             if (v.childrens) this.breadcrumbArr.push(v.childrens[0].name);
      //           } else {
      //             v['isActive'] = false;
      //           }
      //         })
      //       }
      //       this.treeData = [];
      //       this.treeData.push(json);
      //       // this.handleChildChange(this.treeData[0].childrens[0], this.treeData[0].childrens[0].childrens[0]);
      //     })
      //   }
      // },
      getRightInfo() {
        var arr = [];
        this.leftChooseIdArr.forEach(v => {
          // v = "辅助检查";
          arr.push({
            "accessPoint": "10.1.11","comparisonOperator":"Equal","value": v
            // "accessPoint": "10.1.9","comparisonOperator":"Equal","value": v
          })
        })
        this.$axios({
          // url: 'http://127.0.0.1:18082/catalog/rest/catalog/query',
          url: 'http://218.245.3.121:18082/catalog/rest/catalog/query',
          method: 'POST',
          data: {
            "username":"guest",
            "password":"guest",
            "protocolVersion":"4.1",
            "databases":{"databaseId":["healthCheck"]},
            "query":{
              "logicOperator":"Or",
              "simpleCondition": arr
            },
            "elementSet":{
              // "element":["10.1.1","10.1.2","10.1.3","10.1.4","10.1.5","10.1.6","10.1.7","10.1.8","10.1.9","10.1.10"]
              "element":["10.1.1","10.1.2","10.1.3","10.1.4","10.1.7","10.1.9","10.1.10","10.1.11","10.1.12","10.1.13"]
            },
            "recordSetStartPoint":this.startPoint,
            "recordSetEndPoint":(this.startPoint + this.pageSize)
          }
        }).then(json => {
          this.total = json.totalNumberOfRecords;
          this.rightData = [];
          if (json.recordSet && json.recordSet.record) {
            json.recordSet.record.forEach(item => {
              var obj = {};
              item.itemList.items.forEach(v => {
                obj['kf'] = '开放';
                obj['gx'] = '共享';
                if (v.itemName == '10.1.1') obj['datasetName'] = v.itemValues.join(' ');
                if (v.itemName == '10.1.2') obj['datasetID'] = v.itemValues.join(' ');
                if (v.itemName == '10.1.3') obj['datasetCode'] = v.itemValues.join(' ');
                if (v.itemName == '10.1.4') obj['distOrgName'] = v.itemValues.join(' ');
                if (v.itemName == '10.1.7') obj['keyword'] = v.itemValues.join(' ');
                if (v.itemName == '10.1.9') obj['catalogLvl1'] = v.itemValues.join(' ');
                if (v.itemName == '10.1.10') obj['catalogLvl2'] = v.itemValues.join(' ');
                if (v.itemName == '10.1.11') obj['catalogLvl3'] = v.itemValues.join(' ');
                if (v.itemName == '10.1.12') obj['abstract'] = v.itemValues.join(' ');
                if (v.itemName == '10.1.13') obj['dataElement'] = v.itemValues.join(' ');
              })
              this.rightData.push(obj);
            })
          }
        })
      },
      handleClick() {
        // this.getTreeInfo(this.activeName);
      },
      async showTablePopup(datasetCode) {
          await this.$axiosget({
              url: 'http://218.245.3.121:16081/api/dataset/' + datasetCode + '/info',
          }).then(json => {
              this.tableTotal = json.count;
              this.tableColSet = json.fields;
              console.log(this.tableTotal);
              console.log(this.tableColSet);
          });
          await this.$axiosget({
              url: 'http://218.245.3.121:16081/api/dataset/' + datasetCode + '/data',
              data: {page:this.tablePage,pagesize:this.tablePageSize},
          }).then(json => {
              this.tableDataSet = json.data;
              console.log(this.tableDataSet);
          });
          this.popupEle(this.tableColSet,this.tableDataSet);
      },
      pageChange(page) {
        this.startPoint = this.pageSize * (page - 1);
        this.getRightInfo();
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.startPoint = 0;
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
      width: 20%;
      border-right: 1px solid #cccccc;
      height: 100%;
    }
    .catalog-right {
      width: 75%;
      height: 100%;
      .content {
        width: 100%;
        overflow-y: scroll;
        height: 100%;
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
        width: 96%;
        margin: 10px auto 0;
        padding-bottom: 5px;
        .u-cata-main {
          padding: 5px 20px;
          .u-cata-header {
            padding-right: 0;
            overflow: visible;
            height: 25px;
            padding-bottom: 5px;
            margin-bottom: 5px;
            border-bottom: 1px solid #eee;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            .title-content {
              .title {
                display: inline-block;
                max-width: 400px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 16px;
                color: #1067ab;
                transition: .5s;
                margin-top: 5px;
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
                  cursor: pointer;
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
