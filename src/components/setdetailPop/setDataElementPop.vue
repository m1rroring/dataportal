<template>
  <div class="ditail">
    <el-dialog :title="data.eleDialogTitle" :visible.sync="data.eleDialogVisible" width="62%" color="#0f58af" center>
      <el-table
        :data="data.eleDialogData"
        stripe
        border
        style="max-width: 100%"
        max-height="550">
        <el-table-column
          v-for="item in data.eleDialogColData"
          :key="item.code"
          :prop="item.code"
          :label="item.name"
          :width="setTableWidth(item.code)"
        />
      </el-table>
      <div class="page disflex js-center">
        <el-pagination
          ref="elePopPage"
          background
          @size-change="eleheandleSizeChange"
          @current-change="elepageChange"
          :page-sizes="[10, 20]"
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
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
