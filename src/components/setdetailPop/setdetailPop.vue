<template>
  <div class="ditail">
    <el-dialog title="数据集详情" :visible.sync="data.dialogVisible1" width="62%" style="color:#0f58af" center>
      <div class="dia-item disflex js-between">
        <div class="dia-i-left">
          <div class="dia-i-label" style="color:#0f58af">数据集名称:</div>
          <div class="dia-i-text">{{data.dialogVisible1Data.datasetName}}</div>
        </div>
        <div class="dia-i-right">
          <div class="dia-i-label" style="color:#0f58af">数据集摘要:</div>
          <div class="dia-i-text">{{data.dialogVisible1Data.abstract}}</div>
        </div>
      </div>
      <div class="dia-item disflex js-between">
        <div class="dia-i-left">
          <div class="dia-i-label" style="color:#0f58af">数据集分类-一级类目名称:</div>
          <div class="dia-i-text">{{data.dialogVisible1Data.catalogLvl1}}</div>
        </div>
        <div class="dia-i-right">
          <div class="dia-i-label" style="color:#0f58af">数据集标识符:</div>
          <div class="dia-i-text">{{data.dialogVisible1Data.datasetID}}</div>
        </div>

      </div>
      <div class="dia-item disflex js-between">
        <div class="dia-i-left">
          <div class="dia-i-label" style="color:#0f58af">数据集分类-二级类目名称:</div>
          <div class="dia-i-text">{{data.dialogVisible1Data.catalogLvl2}}</div>
        </div>
        <div class="dia-i-right">
          <div class="dia-i-label" style="color:#0f58af">数据集编码:</div>
          <div class="dia-i-text">{{data.dialogVisible1Data.datasetCode}}</div>
        </div>
      </div>
      <div class="dia-item disflex js-between">
        <div class="dia-i-left">
          <div class="dia-i-label" style="color:#0f58af">数据集分类-三级类目名称:</div>
          <div class="dia-i-text">{{data.dialogVisible1Data.catalogLvl3}}</div>
        </div>
        <div class="dia-i-right">
          <div class="dia-i-label" style="color:#0f58af">关键词:</div>
          <div class="dia-i-text">{{data.dialogVisible1Data.keyword}}</div>
        </div>
      </div>
      <div class="dia-item disflex js-between">
        <div class="dia-i-left">
          <div class="dia-i-label" style="color:#0f58af">数据集发布方:</div>
          <div class="dia-i-text">{{data.dialogVisible1Data.distOrgName}}</div>
        </div>
        <div class="dia-i-right">
          <div class="dia-i-label" style="color:#0f58af">数据集特征数据元:</div>
          <div class="dia-i-text">{{data.dialogVisible1Data.dataElement}}</div>
        </div>
      </div>
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="dialogVisible = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
<!--      </span>-->
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'data-tree',
    props: ['data'],
    components: {},
    data() {
      return {
      }
    },
    mounted() {
      console.log(this.data);
    },
    methods: {
    }
  }
</script>
<style lang="scss" scoped>
  .dia-item {
    margin-bottom: 20px;
    font-size: 16px;
    .dia-i-left, .dia-i-right {
      width: 50%;
    }
    .dia-i-label {
      margin-bottom: 10px;
      font-weight: 700;
    }
    .dia-i-text {
    }
  }
</style>
