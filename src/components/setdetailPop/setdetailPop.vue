<template>
  <div class="ditail">
    <el-dialog title="详情" :visible.sync="data.dialogVisible1" width="62%" center>
      <div class="dia-item disflex js-between">
        <div class="dia-i-left">
          <div class="dia-i-label">数据资源标题:</div>
          <div class="dia-i-text">{{data.dialogVisible1Data.title}}</div>
        </div>
        <div class="dia-i-right">
          <div class="dia-i-label">数据资源摘要:</div>
          <div class="dia-i-text">{{data.dialogVisible1Data.content}}</div>
        </div>
      </div>
      <div class="dia-item disflex js-between">
        <div class="dia-i-left">
          <div class="dia-i-label">发布⽇期:</div>
          <div class="dia-i-text">{{data.dialogVisible1Data.time}}</div>
        </div>
        <div class="dia-i-right">
          <div class="dia-i-label">数据资源提供单位:</div>
          <div class="dia-i-text"></div>
        </div>
      </div>
      <div class="dia-item disflex js-between">
        <div class="dia-i-left">
          <div class="dia-i-label">数据资源提供单位部⻔:</div>
          <div class="dia-i-text"></div>
        </div>
        <div class="dia-i-right">
          <div class="dia-i-label">数据资源提供单位机构代码:</div>
          <div class="dia-i-text"></div>
        </div>
      </div>
      <div class="dia-item disflex js-between">
        <div class="dia-i-left">
          <div class="dia-i-label">数据内容说明:</div>
          <div class="dia-i-text"></div>
        </div>
        <div class="dia-i-right">
          <div class="dia-i-label">数据类型:</div>
          <div class="dia-i-text"></div>
        </div>
      </div>
      <div class="dia-item disflex js-between">
        <div class="dia-i-left">
          <div class="dia-i-label">数据资源格式:</div>
          <div class="dia-i-text">{{data.dialogVisible1Data.gs}}</div>
        </div>
        <div class="dia-i-right">
          <div class="dia-i-label">数据资源共享类型:</div>
          <div class="dia-i-text">{{data.dialogVisible1Data.kf}}</div>
        </div>
      </div>
      <div class="dia-item disflex js-between">
        <div class="dia-i-left">
          <div class="dia-i-label">数据资源共享⽅式:</div>
          <div class="dia-i-text">{{data.dialogVisible1Data.gx}}</div>
        </div>
        <div class="dia-i-right">
          <div class="dia-i-label">在线服务地址:</div>
          <div class="dia-i-text">{{data.dialogVisible1Data.url}}</div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
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
