<template>
    <div class="ditail">
        <el-dialog title="数据元详情" :visible.sync="data.dialogVisible1" width="62%" color="#0f58af" center>
            <div class="dia-item disflex js-between">
                <div class="dia-i-left">
                    <div class="dia-i-label" style="color:#0f58af">数据元名称:</div>
                    <div class="dia-i-text">{{data.dialogVisible1Data.elementName}}</div>
                </div>
                <div class="dia-i-right">
                    <div class="dia-i-label" style="color:#0f58af">同义名称:</div>
                    <div class="dia-i-text">{{data.dialogVisible1Data.alias}}</div>
                </div>
            </div>
            <div class="dia-item disflex js-between">
                <div class="dia-i-left">
                    <div class="dia-i-label" style="color:#0f58af">定义:</div>
                    <div class="dia-i-text">{{data.dialogVisible1Data.definition}}</div>
                </div>
                <div class="dia-i-right">
                    <div class="dia-i-label" style="color:#0f58af">关键字:</div>
                    <div class="dia-i-text">{{data.dialogVisible1Data.keyword}}</div>
                </div>

            </div>
            <div class="dia-item disflex js-between">
                <div class="dia-i-left">
                    <div class="dia-i-label" style="color:#0f58af">主管机构:</div>
                    <div class="dia-i-text">{{data.dialogVisible1Data.authorityOrganization}}</div>
                </div>
                <div class="dia-i-right">
                    <div class="dia-i-label" style="color:#0f58af">提交机构:</div>
                    <div class="dia-i-text">{{data.dialogVisible1Data.registrantOrganization}}</div>
                </div>
            </div>
            <div class="dia-item disflex js-between">
                <div class="dia-i-left">
                    <div class="dia-i-label" style="color:#0f58af">备注:</div>
                    <div class="dia-i-text">{{data.dialogVisible1Data.note}}</div>
                </div>
                <!--        <div class="dia-i-right">-->
                <!--          <div class="dia-i-label" style="color:#0f58af"></div>-->
                <!--          <div class="dia-i-text">{{}}</div>-->
                <!--        </div>-->
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
     margin-left: 20px;
  }
}
.ditail {
    /deep/ .el-table__scrollable-x .el-table__body-wrapper {
        overflow: auto;
    }
    /deep/ .el-dialog__title {
        color: #0f58af;
        font-size: 20px;
    }
}
</style>