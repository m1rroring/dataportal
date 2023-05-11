<template>
  <div class="ditaildialog">
    <el-dialog :title="data.eleDialogTitle" :visible.sync="data.eleDialogVisible" width="62%" color="#0f58af" center>
      <el-table
        :data="data.eleDialogData"
        stripe
        border
        style="width: 100%"
        height="550">
        <el-table-column
          v-for="item in data.eleDialogColData"
          :key="item.code"
          :prop="item.code"
          :label="item.name"
          :width="setTableWidth(item.code)"
          :fixed = "setTableFixed(item.code)"
        />
      </el-table>
      <div class="page disflex js-center">
        <el-pagination
          ref="elePopPage"
          background
          @size-change="eleheandleSizeChange"
          @current-change="elepageChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size = this.eletablePageSize
          :current-page = this.eletablePage
          layout="total, sizes, prev, pager, next, jumper"
          :total=data.eleDialogDataCount>
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'data-element',
    props: ['data'],
    components: {},
    data() {
        return {
            eletablePage: 1,
            eletablePageSize: 10
        }
    },
    mounted() {
      // console.log("数据元弹窗");
      // console.log(this.data);
    },
    methods: {
      eleheandleSizeChange(val) {
        this.eletablePageSize = val;
        this.eletablePage = 1;
        this.geteledata();
      },
      elepageChange(page) {
          this.eletablePage = page;
          this.geteledata();
      },
      geteledata() {
        this.$axiosget({
            url: this.data.eleDialogDataUrl,
            data: {page:this.eletablePage,pagesize:this.eletablePageSize},
        }).then(json => {
            this.data.eleDialogData = json.data;
        });
      },
      setTableWidth(colcode) {
          let width = ''
          switch (colcode) {
              case 'id':
                  width = '50'
                  break
              case 'age':
                  width = '50'
                  break
              case 'sex':
                  width = '50'
                  break
              default:
                  width = ''
          }
          return width
      },
        setTableFixed(colcode) {
          let fiexed = ''
          switch (colcode) {
              case 'id':
                  fiexed = true
                  break
              default:
                  fiexed = false
          }
          return fiexed
      }
    }
  }
</script>
<style lang="scss" scoped>
.ditaildialog {
  /deep/ .el-table__scrollable-x .el-table__body-wrapper {
    overflow: auto;
  }
  /deep/ .el-table__fixed-right-patch {
    background-color: #f5f7fa;
  }
  /deep/ .el-table__body-wrapper::-webkit-scrollbar {
    width: 8px; /*滚动条宽度*/
    height: 8px; /*滚动条高度*/
  }
  ///deep/ .el-table__body-wrapper::-webkit-scrollbar-track {
  //  border-radius: 10px; /*滚动条的背景区域的圆角*/
  //  -webkit-box-shadow: inset 0 0 6px rgba(238, 238, 238, 0.3);
  //  background-color: #eeeeee; /*滚动条的背景颜色*/
  //}
  ///deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
  //  border-radius: 10px; /*滚动条的圆角*/
  //  -webkit-box-shadow: inset 0 0 6px rgba(145, 143, 0143, 0.3);
  //  background-color: rgb(145, 143, 143); /*滚动条的背景颜色*/
  //}
  /deep/ .el-dialog__title {
    color: #0f58af;
  }
}
</style>
