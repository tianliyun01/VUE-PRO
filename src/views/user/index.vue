<template>
  <div class="app-container">
    <div class="Notice">
      <el-tabs v-model="activeName" class="customcard">
        <el-tab-pane label="用户管理" name="first">
          <el-form size="mini" label-position="right" label-width="108px" class="pdt-18">
            <el-row class="row-bg" justify="space-around">
              <el-col :span="8">
                <el-form-item label="人员代码">
                  <el-input
                    v-model="formDate.userCode"
                    placeholder="请输入"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="公司">
                  <el-select
                    v-model="formDate.userCompany"
                    class="quick-select"
                    placeholder="请选择"
                    filterable
                    style="width: 100%"
                  >
                    <el-option v-for="item in userResult" :key="item.userCode" :label="item.userName" :value="item.userCode" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="姓名">
                  <el-input
                    v-model="formDate.userName"
                    placeholder="请输入"
                    style="width: 100%"
                  />
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
        <el-table :data="userResult" style="width: 100%" height="500">
          <el-table-column type="index" label="序号" width="100" />
          <el-table-column prop="userCode" label="人员代码" min-width="150" />
          <el-table-column prop="userName" label="姓名" width="120" />
          <el-table-column prop="userEname" label="英文名" width="120" />
          <el-table-column prop="sex" label="性别" width="130" :formatter="formatter" />
          <el-table-column prop="userCompany" label="公司" width="180" :formatter="spreadFormatter" show-overflow-tooltip />
          <el-table-column prop="department" label="部门" min-width="180" show-overflow-tooltip />
          <el-table-column prop="mobile" label="手机号码" min-width="150" show-overflow-tooltip />
          <el-table-column prop="email" label="邮箱" min-width="150" show-overflow-tooltip />
          <el-table-column prop="phone" label="座机号码" min-width="180" show-overflow-tooltip />
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="edit(scope.row)">编辑</el-button>
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
import { queryByPage } from '../../api/user'
import { mapGetters } from 'vuex'

export default {
  name: 'UserIndex',
  components: {},
  data() {
    return {
      activeName: 'first',
      selectedRiskCode: '',
      formDate: {
        userCode: '',
        userName: '',
        userCompany: ''
      },
      userResult: [],
      companyList: [],
      pageSize: 15,
      currentPage: 1,
      total: 0
    }
  },
  computed: {
    ...mapGetters(['systemClassList', 'integrationModeList', 'userInfo', 'token'])
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
    //   productEditPage(param).then(res => {
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
      queryByPage(this.formDate).then(res => {
        if (res.state === '0000') {
          this.userResult = res.content
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
      this.formDate.userCode = ''
      this.formDate.userCompany = ''
      this.formDate.userName = ''
    },

    changeRiskCode(val) {
      console.log(val)
      this.riskCode = val.productCode
      console.log(this.riskCode)
    },
    formatter(row, column) {
      if (row.state === '0') {
        return '无效'
      } else if (row.state === '1') {
        return '有效'
      }
    },
    spreadFormatter(row, column) {
      if (!row.spread) return ''
      const spreads = row.spread.split(';')
      const spreadss = []
      for (var item of spreads) {
        for (var item1 of this.spreadClassDtoList) {
          if (item === item1.spreadCode) {
            spreadss.push(item1.spreadName)
          }
        }
      }
      return spreadss.join('/')
    },
    menuTypeFormatter(row, column) {
      if (!row.delMenuType) return ''
      const delMenuTypes = row.delMenuType.split(';')
      const delMenuTypess = []
      for (var item of delMenuTypes) {
        for (var item1 of this.menuTypeList) {
          if (item === item1.menuCode) {
            delMenuTypess.push(item1.menuName)
          }
        }
      }
      return delMenuTypess.join('/')
    },
    handleBeforeUpload(file) {
      const isExcel = file.type === '.xls' || '.xlsx'
      const isLt10M = file.size / 1024 / 1024 < 10

      if (!isExcel) {
        this.$message.error('上传文件只能是xls或xlsx格式!')
      }
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 1MB!')
      }
      return isExcel && isLt10M
    },
    // 新增
    add() {
      this.$router.push({
        name: 'UserEdie',
        query: {
          editType: 'ADD'
        }
      })
    },
    edit(item) {
      this.$router.push({
        name: 'UserEdie',
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
    changepage() {}
  }
}
</script>
<style lang="scss" scoped>
</style>
