<template>
  <div class="register">
    <div class="register-child disflex">
      <div class="catalog-left">
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
                <div v-show="itm.leaf == false" class="item-child" @click="showTabel(itm, intree, index)">
                  <span :class="['set-right']"></span>
                  <span style="color: #606266">{{itm.name}} [{{getItmInfo(itm)}}]</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="catalog-right">
        <div class="catalog-header footer">
          <el-button size="small" v-show="showBtn == true" @click="dialogVisible = true">注册</el-button>
          <el-button size="small" v-show="showBtn == true" @click="deleteThisInfo(null)">批量注册</el-button>
        </div>
        <el-table
          :data="tableData"
          style="width: 96%;margin: 16px auto 0;" height="450">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            label="资源">
          </el-table-column>
          <el-table-column
            width="200"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="deleteThisInfo(scope.row)">删除</el-button>
              <el-button type="text" size="small" @click="deleteThisInfo(scope.row)">变更</el-button>
              <el-button type="text" size="small" @click="deleteThisInfo(scope.row)">审核</el-button>
              <el-button type="text" size="small" @click="deleteThisInfo(scope.row)">撤销</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination background layout="prev, pager, next" :total="localData.length" @current-change="changePage">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="footer">
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="getSaveInfo" style="margin-right: 30px;">保 存</el-button>
      </span>
    </div>
    <el-dialog title="注册" :visible.sync="dialogVisible" width="36%">
      <div class="dialog-content" v-for="(item, index) in userInputHead" :key="index">
        <div class="dialog-babel">{{item.name}}</div>
        <div class="dialog-text">
          <!-- userInputData -->
          <el-input v-model="userInputData[item.value]" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sendInfo">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  
  export default {
    name: 'register',
    data() {
      return {
        dialogVisible: false,
        tableData: [],
        localData: [],
        userInputHead: [
          {name: '数据资源标题', value: 'BI_Name'},
          {name: '数据资源摘要', value: 'BI_Abstract'},
          {name: '发布⽇期', value: 'BI_Publish'},
          {name: '数据资源提供单位', value: 'PV_Unit'},
          {name: '数据资源提供单位部⻔', value: 'PV_Department'},
          {name: '数据资源提供单位机构代码', value: 'PV_UnitCode'},
          {name: '数据内容说明', value: 'Item_Name'},
          {name: '数据类型', value: 'Item_Type'},
          {name: '数据资源格式', value: 'FM_Format'},
          {name: '数据资源共享类型', value: 'SH_Type'},
          {name: '数据资源共享⽅式', value: 'SH_Mode'},
          {name: '在线服务地址', value: 'SH_UrlValue'}
        ],
        userInputData: {
          'BI_Code': '',
          'BI_Name': '',
          'BI_Abstract': '',
          'BI_Publish': '',
          'PV_Unit': '',
          'PV_Department': '',
          'PV_UnitCode': '',
          'Item_Name': '',
          'Item_Type': '',
          'FM_Format': '',
          'SH_Type': '',
          'SH_Mode': '',
          'SH_UrlValue': '',
        },
        showBtn: false,
        mdid: '2c9081947250bc1f0172986f479d002e',
        localRowData: {
          self: null,
          parent: null,
          idx: 0,
          idx2: 999999,
          data: null
        },
        treeData: [
          {
            name: '',
            leaf: false,
            isActive: false,
            childrens: []
          }
        ],
      }
    },
    mounted() {
      this.getTreeInfo();
      this.setNowData();
    },
    methods: {
      deleteThisInfo(data) {
        console.log(data);
      },
      setNowData() {
        var now = new Date();
        var year = now.getFullYear();
        var month = (now.getMonth() + 1) < 10? '0' + (now.getMonth() + 1) : (now.getMonth() + 1);
        var day = now.getDate() < 10? '0' + now.getDate() : now.getDate();
        this.userInputData.BI_Publish = `${year}-${month}-${day}`;
      },
      sendInfo() {
        var now = new Date();
        this.userInputData.BI_Code = Date.parse(now) / 1000;
        var str = `<?xml version="1.0" encoding="UTF-8"?>
          <MetaData>
            <MD_BasicInfo>
              <BI_Code>${this.userInputData.BI_Code}</BI_Code>
              <BI_Name>${this.userInputData.BI_Name}</BI_Name>
              <BI_Category></BI_Category>
              <BI_Abstract>${this.userInputData.BI_Abstract}</BI_Abstract>
              <BI_Publish>${this.userInputData.BI_Publish}</BI_Publish>
              <BI_Relation></BI_Relation>
              <BI_URI></BI_URI>
            </MD_BasicInfo>
            <MD_Provider>
              <PV_Response></PV_Response>
              <PV_Unit>${this.userInputData.PV_Unit}</PV_Unit>
              <PV_Department>${this.userInputData.PV_Department}</PV_Department>
              <PV_UnitCode>${this.userInputData.PV_UnitCode}</PV_UnitCode>
            </MD_Provider>
            <MD_Item>
              <Item_Name>${this.userInputData.Item_Name}</Item_Name>
              <Item_Type>${this.userInputData.Item_Type}</Item_Type>
              <Item_Length></Item_Length>
              <Item_Cycle></Item_Cycle>
            </MD_Item>
            <MD_Format>
              <FM_Format>${this.userInputData.FM_Format}</FM_Format>
              <FM_Type>瓦⽚图服务</FM_Type>
              <FM_Describe></FM_Describe>
            </MD_Format>
            <MD_Sharing>
              <SH_Type>${this.userInputData.SH_Type}</SH_Type>
              <SH_Condition>⽆</SH_Condition>
              <SH_Mode>${this.userInputData.SH_Mode}</SH_Mode>
              <SH_Mode_Type></SH_Mode_Type>
              <SH_Public>true</SH_Public>
              <SH_InnerCon>⽆</SH_InnerCon>
            </MD_Sharing>
            <MD_Sharing_Url>
              <SH_UrlName>在线服务地址</SH_UrlName>
              <SH_UrlValue>${this.userInputData.SH_UrlValue}</SH_UrlValue>
            </MD_Sharing_Url>
          </MetaData>`
        var data = {"password":"guest","protocolVersion":"4.1","username":"guest","databaseId":"test","operationType":"Insert","data": str}
        this.$axios({
          url: 'http://218.245.3.121:18082/catalog/rest/catalog/manage',
          method: 'post',
          data
        }).then(json => {
          if (json) {
            this.$message({
              type: 'success',
              message: '注册成功'
            })
            this.dialogVisible = false;
          }
        })
      },
      getSaveInfo() {
        var data = {
          "code": `${this.localRowData.self}.${this.userInputData.BI_Code}`,
          "name": this.userInputData.BI_Name,
          "parent": {"id": this.localRowData.parent}
        }
        this.$axios({
          url: '/ctree/v1/node/add',
          method: 'post',
          data
        }).then(json => {
          if (json) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.getTreeInfo();
            this.showTabel(this.localRowData.data, this.localRowData.idx, this.localRowData.idx2);
          }
        })
      },
      showTabel(data, idx, idx2) {
        this.showBtn = true;
        console.log(idx, idx2);
        this.localRowData.data = data;
        this.localRowData.self = data.code;
        this.localRowData.parent = data.id;
        this.localRowData.idx = idx;
        this.localRowData.idx2 = idx2;
        this.localData = [];
        if (data.childrens) {
          data.childrens.forEach(item => {
            this.localData.push(item);
          })
          this.setTabelData(1);
        }
      },
      setTabelData(num) {
        this.tableData = [];
        if (this.localData.length > 10) {
          this.localData.forEach((item, index) => {
            if (index < (num * 10) && index >= ((num - 1) * 10)) {
              this.tableData.push(item);
            }
          })
        } else {
          this.tableData = this.localData;
        }
      },
      changePage(size) {
        this.setTabelData(size)
      },
      getTreeInfo() {
        this.treeData = [];
        this.$axios({url: '/ctree/v1/node/get/code/0'}).then(json => {
          json.childrens.forEach((item, index) => {
            if (item.code.indexOf('version-') == -1) {
              item['isActive'] = false;
              if (index == this.localRowData.idx) item['isActive'] = true;
              item['childrens'] = [];
              this.treeData.push(item);
            }
          })
          this.treeData.forEach((item, index) => {
            this.getTreeChildInfo(item.code.split('-')[1], index);
          })
        })
      },
      async getTreeChildInfo(code, index) {
        const json = await this.$axios({url: `/ctree/v1/node/get/code/${code}`});
        if (json.childrens) {
          json.childrens.forEach((v, i) => {
            if (index == this.localRowData.idx && i == this.localRowData.idx2)
              v['isActive'] = true;
            else 
              v['isActive'] = false;
          })
        }
        this.treeData[index].childrens = json.childrens || [];
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
  .register, .register-child {
    height: 100%;
  }
    .catalog-left {
      width: 30%;
      // border-right: 1px solid #cccccc;
      height: 548px;
      overflow-y: auto;
    }
    .catalog-right {
      width: 70%;
      height: 100%;
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
  .footer {
    text-align: right;
    margin-top: 10px;
  }
  .page {
    text-align: center;
    margin-top: 10px;
  }
  /deep/ .el-dialog__footer {
    text-align: center;
  }
  .dialog-babel {
    margin: 10px;
  }
</style>
