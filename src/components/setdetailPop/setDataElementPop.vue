<template>
  <div class="ditail">
    <el-dialog title="数据集内容" :visible.sync="data.eleDialogVisible" width="62%" color="#0f58af" center>
      <el-table
        :data="data.eleDialogData"
        style="max-width: 100%">
        <template v-for="(item,index) in data.eleDialogColData" >
            <el-table-column :key="index" :prop="item.code" :label="item.name" align="center">
                <template v-slot="scope">
                    <span>
                        {{scope.row[item.name]}}
                    </span>
                </template>
            </el-table-column>
        </template>
      </el-table>
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
        
      }
    },
    mounted() {
      console.log("数据元弹窗");
      console.log(this.data);
    },
    methods: {

    }
  }
</script>
<style lang="scss" scoped>
</style>
