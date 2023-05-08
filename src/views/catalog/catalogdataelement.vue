<template>
  <div class="catalog disflex">
    <div class="catalog-left">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="(item, index) in navData" :label="item.name" :name="item.activeName" :key="index"></el-tab-pane>
      </el-tabs>
      <div class="tree">
        <el-tree
            :data="treeData"
            :props="defaultProps"
            ref="catalogtree"
            node-key="code"
            :default-expanded-keys="['1']"
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
                <div class="title pointer" :title="item.elementName" @click="popupDio(item)">{{item.elementName}}</div>
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
                  <span>定义：{{item.definition}}</span><br/>
                <span>关键字：{{item.keyword}}</span>
              </div>
              <div class="u-cata-btn">
                <div class="opt-container">
<!--                  <div :class="['l-opt', item.url && 'pointer']" @click="showPopup(item.url)">-->
<!--                    <i :class="['fa', item.url? 'fa-list-img1' : 'fa-list-img']"></i>-->
<!--                    <div :class="['type-name', item.url && 'blue']">图像</div>-->
<!--                  </div>-->
                  <div class="l-opt">
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
  </div>
</template>
<script>
  import setdetail from '../../components/setdetailPop/setdetailPop.vue'
  import {codeAt} from "core-js/internals/string-multibyte";
  export default {
    name: 'catalog',
    components: {setdetail},
    data() {
      return {
        total: 0,
        startPoint: 0,
        pageSize: 10,
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
          {name: '卫生信息数据元目录', activeName: '1'},
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
      this.treeInfo();

    },
    methods: {
      codeAt,
      popupDio(data) {
        this.dialog1Data.dialogVisible1 = true;
        this.dialog1Data.dialogVisible1Data = data;
      },
      showPopup(url) {
        this.imageUrl = url;
        this.dialogVisible = true;
      },
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
          url: '/ctree/v1/node/get/code/1'
        });

        this.treeData = [];
        this.treeData.push(data1);
        console.log(data1);
        this.breadcrumbArr = [];
        this.breadcrumbArr.unshift(data1.name);
        this.leftChooseIdArr = [];
        this.getLeafNodes(data1);
        this.getRightInfo();

      },
      getRightInfo() {
        var arr = [];
        this.leftChooseIdArr.forEach(v => {
          // v = "辅助检查";
          arr.push({
            "accessPoint": "10.1.9","comparisonOperator":"Equal","value": v
          })
        })
        this.$axios({
          url: 'http://218.245.3.121:18082/catalog/rest/catalog/query',
          method: 'POST',
          data: {
            "username":"guest",
            "password":"guest",
            "protocolVersion":"4.1",
            "databases":{"databaseId":["dataElement"]},
            "query":{
              "logicOperator":"Or",
              "simpleCondition": arr
            },
            "elementSet":{
              "element":["10.1.1","10.1.5","10.1.7","10.1.9","10.1.19","10.1.21","10.1.22"]
                // "element":[]
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
              console.log(item.itemList);
              item.itemList.items.forEach(v => {
                obj['kf'] = '开放';
                obj['gx'] = '共享';
                if (v.itemName == '10.1.1') obj['elementName'] = v.itemValues.join(' ');
                if (v.itemName == '10.1.5') obj['alias'] = v.itemValues.join(' ');
                if (v.itemName == '10.1.7') obj['definition'] = v.itemValues.join(' ');
                if (v.itemName == '10.1.9') obj['keyword'] = v.itemValues.join(' ');
                if (v.itemName == '10.1.19') obj['authorityOrganization'] = v.itemValues.join(' ');
                if (v.itemName == '10.1.21') obj['registrantOrganization'] = v.itemValues.join(' ');
                if (v.itemName == '10.1.22') obj['note'] = v.itemValues.join(' ');
              })
              this.rightData.push(obj);
            })
          }
        })
      },
      handleClick() {
        // this.getTreeInfo(this.activeName);
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
