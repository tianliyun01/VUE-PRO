<template>
  <div class="app-container">
    <div class="Notice">
      <el-tabs v-model="activeName" class="customcard">
        <el-tab-pane label="菜单管理" name="first">
          <el-form size="mini" label-position="right" label-width="108px" class="pdt-18">
            <el-row class="row-bg" justify="space-around">
              <el-col :span="8">
                <el-form-item label="菜单名称">
                  <el-input
                    v-model="formDate.menuName"
                    placeholder="请输入"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="菜单级别">
                  <el-select
                    v-model="formDate.level"
                    class="quick-select"
                    placeholder="请选择"
                    filterable
                    style="width: 100%"
                  >
                    <el-option v-for="item in levels" :key="item.value" :label="item.lable" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否有效">
                  <el-select
                    v-model="formDate.isValidate"
                    class="quick-select"
                    placeholder="请选择"
                    clearable
                    style="width: 100%"
                    value-key="productCode"
                  >
                    <el-option label="有效" value="1" />
                    <el-option label="无效" value="0" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div class="search-footer">
        <el-button size="small" type="primary" plain @click="reset">重置</el-button>
        <el-button size="small" type="primary" @click="currentPage=1,queryData()">查询</el-button>
      </div>
    </div>
    <div class="query mgt-14">
      <div class="query-header clearfix">
        <div class="header-title fl">查询结果</div>
        <el-button class="query-header-btn fr" size="mini" type="primary" plain @click="add">添加</el-button>
      </div>
      <div>
        <el-table :data="menuResult" style="width: 100%">
          <el-table-column type="index" label="序号" width="100" />
          <el-table-column prop="menuName" label="菜单名称" min-width="200" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="riskcode">{{ scope.row.menuName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="menuUrl" label="菜单URL" width="120" />
          <el-table-column prop="description" label="描述" width="130" />
          <el-table-column prop="createdBy" label="创建人" width="180" show-overflow-tooltip />
          <el-table-column prop="createdTime" label="创建时间" min-width="180" show-overflow-tooltip />
          <el-table-column prop="updatedBy" label="更新人" min-width="150" show-overflow-tooltip />
          <el-table-column prop="updatedTime" label="更新时间" min-width="180" show-overflow-tooltip />
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="edit(scope.row)">编辑</el-button>
              <el-button type="text" size="mini" @click="del(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block footer-page">
        <el-pagination
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          :page-sizes="[10, 15, 20, 30, 50, 100]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { queryMenuByPage, deleteMenuInfo } from '../../api/menu'

export default {
  name: 'MenuManageIndex',
  components: {},
  data() {
    return {
      activeName: 'first',
      selectedRiskCode: '',
      formDate: {
        menuName: '',
        level: '',
        isValidate: ''
      },
      riskcode: '',
      userName: '',
      loading: false,
      type: '',
      menuType: '',
      pageSize: 15,
      currentPage: 1,
      total: 0,
      menuResult: [],
      levels: [
        { lable: '一级菜单', value: '1' },
        { lable: '二级菜单', value: '2' },
        { lable: '三级菜单', value: '3' }
      ]
    }
  },
  created() {
    this.queryData()
    this.acurl = process.env.VUE_APP_BASE_API + '/portservice/riskUser/readUserExcel'
  },
  methods: {
    // queryForm() {
    //   const param = {
    //     comcode: '',
    //     riskcode: '',
    //     editType: 'ADD'
    //   }
    //   queryMenuByPage(param).then(res => {
    //     if (res.code === 200) {
    //       this.prpdCompanyList = res.data.prpdCompanyList
    //       this.riskCodeList = res.data.findProductDtoMap.riskList
    //       this.riskCodeList[0].spread = '1'
    //       this.activeType = res.data.activeType
    //       this.formList[0].activeType = res.data.activeType
    //       this.total = res.data.totalCount
    //     }
    //   })
    // },
    // 查询列表
    queryData() {
      this.formDate.pageNo = this.currentPage
      this.formDate.pageSize = this.pageSize
      queryMenuByPage(this.formDate).then(res => {
        if (res.state === '0000') {
          this.menuResult = res.menuList
          this.total = res.totalCount
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.queryData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.queryData()
    },
    // 重置
    reset() {
      this.formDate = {}
    },

    add() {
      this.$router.push({
        name: 'MenuManageEdie',
        query: {
          editType: 'ADD'
        }
      })
    },
    edit(item) {
      this.$router.push({
        name: 'MenuManageEdie',
        query: {
          editType: 'EDIT',
          id: item.id
        }
      })
    },
    handleSelectionChange(e) {
      this.riskId = []
      e.forEach(item => {
        this.riskId.push({ riskCode: item.riskCode, userCode: item.userCode })
      })
    },
    deleteAll() {
      this.$confirm('确定批量删除选中记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // deleteRiskUserBatch({ riskDeleteList: this.riskId }).then(res => {
        //   if (res.code === 200) {
        //     this.$message.success('删除信息成功')
        //     this.queryData()
        //   }
        // })
      })
    },
    del(item) {
      this.$confirm('确定删除该条记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMenuInfo({ id: item.id }).then(res => {
          if (res.state === '0000') {
            this.$message.success('删除信息成功')
            this.queryData()
          }
        })
      })
    },
    changepage() {}
  }
}
</script>
<style lang="scss" scoped>
</style>
