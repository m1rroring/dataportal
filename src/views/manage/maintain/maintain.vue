<template>
  <div class="maintian">
    <div class="nav-tip disflex js-between">
      <div class="disflex">
        <div v-for="(item, index) in treeNavData" :class="['nav-tip-item', 'pointer', item.isActive == true && 'setbg']" @click="getTreeInfo(item, index)" :key="index" @contextmenu.prevent="deleteInfo(item.id, null)" title="右键删除该分类">
          {{item.name}}
        </div>
      </div>
      <div class="nav-tip-item pointer nav-tip-item-right" @click="addNewTipEnquire">
        <i class="el-icon-plus"></i>
        添加
      </div>
    </div>
    <div class="disflex">
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
                <div v-show="itm.leaf == false" class="item-child">
                 <!-- @click="handleChildChange(item, itm)" -->
                  <span :class="['set-right']"></span>
                  <span style="color: #606266">{{itm.name}} [{{getItmInfo(itm)}}]</span>
                </div>
              </div>
              <div class="item-child set-point" v-show="item.isActive == true" @click="addximu('type2', item)">
                <span class="el-icon-plus" style="padding: 6px 10px 0 30px"></span>
                <span>添加</span>
              </div>
            </div>
            <div class="tree-child set-point" @click="addximu('type1', tree)">
              <span class="el-icon-plus" style="padding: 6px 10px 0 10px"></span>
              <span>添加</span>
            </div>
          </div>
        </div>
      </div>
      <div class="catalog-right">
        <div class="c-r-item">
          <div class="head">{{ximuname}}名称</div>
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="textarea1"
            :disabled="isdisabled">
          </el-input>
          <div class="head">{{ximuname}}代码</div>
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="textarea2"
            :disabled="isdisabled">
          </el-input>
          <el-button v-show="isdisabled == false" type="primary" size="small" style="margin-top: 10px;" @click="beforeAddChildTip">确 定</el-button>
        </div>
      </div>
    </div>
    <el-dialog title="添加分类" :visible.sync="dialogVisible" width="35%">
      <div class="label">分类名称:</div>
      <div class="label">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="label">分类代码:  {{localTreeCode}}</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="beforeAddNewTip">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <div class="footer">
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="getSaveInfo">保 存</el-button>
        <el-button @click="getSendInfo(false)">发 布</el-button>
      </span>
    </div>
    <div class="tabel">
      <el-table
        :data="tableData"
        height="216">
        <el-table-column
          type="index"
          label="序号"
          width="120"
          >
        </el-table-column>
        <el-table-column
          prop="code1"
          label="分类代码">
        </el-table-column>
        <el-table-column
          prop="names"
          label="版本标识">
        </el-table-column>
        <el-table-column
          prop="time"
          label="版本日期">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="deleteThisInfo(scope.row, 'fb')">发布</el-button>
            <el-button type="text" size="small" @click="deleteThisInfo(scope.row, 'ck')">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'maintian',
    data() {
      return {
        treeNavDataId: '',   // 0目录的id
        ximuname: '',    // xx代码 / xx名称
        dialogVisible: false, // 添加分类的弹窗
        isUserInpit: '',  //  每次添加新节点都保存下返回的id
        treeNavData: [], // 0目录返回的数据
        textarea1: '',  // 名称
        textarea2: '',  // xx代码
        isdisabled: true,  // 名称 and 代码 是否可以填写
        input: '',   // 名称
        treeData: [
          {
            name: '',
            leaf: false,
            isActive: false,
            childrens: []
          }
        ],   // 左侧的树
        tableData: [],  // 表格数据
        localNum: 0,   // xx代码 位数
        localTreeCode: '',  // xx代码 (与父节点拼接)
        localTreeCode1: '',  // xx代码(与父节点拼接)
        localcode: '',  // 父节点的 code
        localximuId: '',    // 父节点的 id
      }
    },
    mounted() {
      this.getTreeData();
      this.getTabelInfo();
    },
    beforeDestroy() {
      if(this.isUserInpit != '') this.deleteInfo(this.isUserInpit, null);
    },
    methods: {
      getTrees(data, data1) {
        this.deleteInfo(data.id, () => {
          this.localximuId = '';
          this.localcode = '';
          this.localTreeCode = data1.codes1;
          this.isUserInpit = data1.id;
          this.input = data1.name;
          this.getSendInfo(true);
        })
      },
      deleteThisInfo(data, type) {
        if (type == 'fb') {
          var dta = {}, needDelete = false;
          var lenArr = data.code.split('-');
          data['codes1'] = lenArr[lenArr.length - 1];
          this.treeNavData.forEach(v => {
            if (v.code.split('-')[1] == data.code.split('-')[2]) {
              needDelete = true;
              dta = v;
            }
          })
          if (needDelete) {
            this.getTrees(dta, data);
          } else {
            this.localximuId = '';
            this.localcode = '';
            this.localTreeCode = data.codes1;
            this.isUserInpit = data.id;
            this.input = data.name;
            this.getSendInfo(true);
          }
        } else {
          this.getTreeInfo(null, 999);
          this.jsonDataHandler(data);
        }
      },
      async getTabelInfo() {
        const json = await this.$axios({url: '/ctree/v1/node/get/code/version'});
        this.tableData = [];
        json.childrens.forEach(v => {
          var time = new Date(v.code.split('-')[1] * 1000);
          var year = time.getFullYear();
          var month = (time.getMonth() + 1 < 10)? '0' + (time.getMonth() + 1) : (time.getMonth() + 1);
          var day = time.getDate() < 10? '0' + time.getDate() : time.getDate();
          v['names'] = v.code.split('-')[1];
          v['code1'] = v.code.split('-')[2];
          v['time'] = `${year}-${month}-${day}`;
          v['status'] = '正常';
          this.tableData.push(v);
        })
      },
      sendInfo(id, need) {
        const data = {
          "code": (this.localcode != '' ? this.localTreeCode : `0-${this.localTreeCode}`),
          "name": this.input,
          "parent":{"id": id}
        }
        this.$axios({
          url: '/ctree/v1/node/add',
          method: "post",
          data
        }).then(json => {
          if (json) {
            this.getTreeData();
            if (need == false) this.getVersion();
            this.isUserInpit = '';
            this.ximuname = '';
            this.localximuId = '';
            this.textarea1 = '';
            this.textarea2 = '';
            this.localcode = '';
            this.localTreeCode = '';
          }
        })
      },
      getVersion() {
        this.$axios({url: '/ctree/v1/node/get/code/version'}).then(json => {
          var time = Date.parse(new Date());
          this.saveInfo({
            "code": (this.localcode != '' ? this.localTreeCode1 : `version-${time / 1000}-${this.localTreeCode1}`),
            "name": this.input,
            "parent":{"id": json.id}
          }, true);
        })
      },
      getSendInfo(need) {
        if (this.isUserInpit == '') {
          this.$message({type: 'error', message: '操作失败'});
          return;
        }
        this.getSavedInfo((json) => {
          if (json.childrens && json.childrens.length > 0) {
            json.childrens.forEach(v => {
              if (v.code.split('-')[1] == this.localTreeCode) {
                this.deleteInfo(v.id, () => {
                  console.log(223);
                });
              }
            })
          }
          if (this.localximuId != '') {
            this.sendInfo(this.localximuId, need);
          } else {
            this.sendInfo(this.treeNavDataId, need);
          }
        })
      },
      saveInfo(data, need) {
        this.$axios({
          url: '/ctree/v1/node/add',
          method: "post",
          data
        }).then(json => {
          if (json) {
            if(need == true) {
              this.isUserInpit = '';
              this.ximuname = '';
            }
            this.getTabelInfo();
            this.$message({type: 'success', message: '操作成功'});
          } else {
            this.$message({type: 'error', message: '操作失败'});
          }
        })
      },
      getSavedInfo(callback) {
        this.$axios({
          url: '/ctree/v1/node/get/code/saved'
        }).then(json => {
          if (json && callback) {
            callback(json);
          }
        })
      },
      getSaveInfo() {
        if (this.isUserInpit == '') {
          this.$message({type: 'error', message: '操作失败'});
          return;
        }
        this.getSavedInfo((json) => {
          if (json.id) {
            this.saveInfo({
              "code": (this.localcode != '' ? this.localTreeCode : `saved-${this.localTreeCode}`),
              "name": this.input,
              "parent":{"id": json.id}
            }, false);
          } else {
            this.$message({type: 'error', message: '保存失败'});
          }
        })
      },
      addximu(type, parent) {
        console.log(type, parent)
        if (this.isUserInpit != '') {
          this.dialogVisible1 = true;
          this.$message({
            type: 'warning',
            message: '请继续之前的操作,保存或发布.'
          })
          return;
        }
        this.isdisabled = false;
        if (type == 'type1') {
          this.localNum = 2;
          this.ximuname = '子类';
        } else {
          this.localNum = 3;
          this.ximuname = '细目';
        }
        this.localximuId = parent.id;
        this.localcode = parent.code;
      },
      beforeAddChildTip() {
        if (this.textarea2.length != this.localNum) {
          this.$message({type: 'warning', message: '代码长度不符'});
        } else {
          if (this.textarea2 != '' && this.textarea1 != '') {
            this.localTreeCode = this.localcode + this.textarea2;
            this.localTreeCode1 = this.localcode + this.textarea2;
            this.input = this.textarea1;
            if (this.localTreeCode.indexOf('version-') != -1) {
              this.$message({type: 'warning', message: '历史版本暂不支持添加子类'});
              return;
            }
            this.addNewTip(this.localTreeCode, this.input);
          } else {
            this.$message({type: 'warning', message: '无填写内容'});
          }
        }
      },
      beforeAddNewTip() {
        var code = this.localTreeCode;
        var input = this.input;
        if (code != '' && input != '') {
          this.addNewTip(code, input);
        } else {
          this.$message({type: 'warning', message: '无填写内容'});
        }
      },
      addNewTip(code, input) {
        this.dialogVisible = false;
        var data = {
          "code": code,
          "name": input
        };
        if (this.localximuId != '') {
          data['parent'] = {
            id: this.localximuId
          }
        }
        this.$axios({
          url: '/ctree/v1/node/add',
          method: "post",
          data
        }).then(json => {
          if (json) {
            this.isUserInpit = json;
            this.$message({type: 'success', message: '添加成功'});
            if (this.localximuId) {
              this.isUserInpit = '';
              this.ximuname = '';
              this.localximuId = '';
              this.isdisabled = true;
              this.getTreeInfo(this.treeNavData[this.localcode[0] - 1], this.localcode[0] - 1);
            }
          }
        })
      },
      addNewTipEnquire() {
        if (this.isUserInpit != '') {
          this.dialogVisible1 = true;
          this.$message({
            type: 'warning',
            message: '请继续之前的操作,保存或发布.'
          })
          return;
        } else {
          var arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
          this.treeNavData.forEach(v => {
            arr.splice(arr.indexOf(v.code.split('-')[1]), 1);
          })
          if (arr.length <= 0) {
            this.$message({
              type: 'error',
              message: '无法继续添加'
            })
            return;
          }
          this.localTreeCode = arr[0];
          this.localTreeCode1 = arr[0];
          this.dialogVisible = true;
          this.input = '';
        }
      },
      deleteInfo(code, callback) {
        this.$axios({
          url: `/ctree/v1/node/del/id/${code}`
        }).then(json => {
          console.log(json);
          if (callback) {
            callback();
          } else {
            this.getTreeData();
          }
        })
      },
      getTreeInfo(tree, index) {
        if (this.isUserInpit != '' || this.isdisabled == false) {
          this.$message({
            type: 'warning',
            message: '请继续之前的操作'
          })
          return;
        }
        this.treeNavData.forEach((v, i) => {
          if(index == i) v.isActive = true;
          else v.isActive = false;
        })
        if (!tree) return;
        var num = tree.code.indexOf('.') != -1? tree.code.split('.')[1] : tree.code.indexOf('-') != -1? tree.code.split('-')[1] : tree.code;
        this.$axios({
          url: `/ctree/v1/node/get/code/${num}`
        }).then(json => {
          this.jsonDataHandler(json);
        })
      },
      jsonDataHandler(json) {
        this.treeData = [];
        json['isActive'] = true;
        if (json.childrens && json.childrens.length > 0) {
          json.childrens.forEach(v => {
            v['isActive'] = false;
          })
        } else {
          json['childrens'] = [];
        }
        this.treeData.push(json);
      },
      getTreeData() {
        this.treeNavData = [];
        this.$axios({url: '/ctree/v1/node/get/code/0'}).then(json => {
          json.childrens.forEach((item, index) => {
            this.treeNavDataId = json.id;
            if (index == 0) item['isActive'] = true;
            else item['isActive'] = false;
            item['childrens'] = [];
            if (item.code.indexOf('version') == -1) {
              this.treeNavData.push(item);
            }
          })
          this.getTreeInfo(this.treeNavData[0], 0);
        })
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
.maintian {
  height: 100%;
  .nav-tip {
    margin-top: 20px;
    .nav-tip-item {
      border: 1px solid #cccccc;
      padding: 6px 10px;
      margin-left: 10px
    }
    .nav-tip-item-right {
      margin-right: 10px;
    }
  }
  .catalog-left {
    width: 30%;
    // border-right: 1px solid #cccccc;
    height: 320px;
  }
  .catalog-right {
    width: 50%;
    height: 300px;
    padding: 10px 10%;
    .head {
      margin: 10px 0px;
    }
  }
}
  
  
    
  .tree {
    padding-left: 10px;
    padding-top: 10px;
    height: 100%;
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
  .tabel {
    border-top: 1px solid #cccccc;
    margin-top: 50px;
    width: 96%;
    margin: 50px auto;
  }
  .setbg {
    background: #38f;
    color: #fff;
    border: 1px solid #2d78f4;
  }
  .label {
    width: 80%;
    margin: 0 auto;
    margin-bottom: 20px;
  }
  .footer {
    text-align: right;
  }
  /deep/ .el-dialog__footer {
    text-align: center;
  }
</style>
