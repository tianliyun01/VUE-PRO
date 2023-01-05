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
                    <el-option v-for="item in userCompany" :key="item" :label="item" :value="item" />
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
        <el-table :data="userResult" style="width: 100%">
          <el-table-column type="index" label="序号" width="100" align="center" />
          <el-table-column prop="userCode" label="人员代码" min-width="150" align="center" />
          <el-table-column prop="userName" label="姓名" width="120" align="center" />
          <el-table-column prop="userEname" label="英文名" width="120" align="center" />
          <el-table-column prop="sex" label="性别" width="130" :formatter="formatter" align="center" />
          <el-table-column prop="userCompany" label="公司" width="180" />
          <!-- <el-table-column prop="department" label="部门" min-width="180" show-overflow-tooltip /> -->
          <el-table-column prop="mobile" label="手机号码" min-width="150" show-overflow-tooltip align="center" />
          <el-table-column prop="email" label="邮箱" min-width="150" show-overflow-tooltip align="center" />
          <el-table-column prop="phone" label="座机号码" min-width="180" show-overflow-tooltip align="center" />
          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="edit(scope.row)">编辑</el-button>
              <el-button type="text" size="mini" @click="updatePassword(scope.row)">修改密码</el-button>
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
    <el-dialog :visible.sync="dialogVisible" title="修改密码" width="500px">
      <el-form ref="passwordForm" :model="row" :rules="passwordRules" size="mini" label-position="right" label-width="108px" class="pdt-18">
        <el-row>
          <el-form-item label="人员代码" prop="userCode">
            <el-input
              v-model="row.userCode"
              placeholder="请输入"
              disabled
              style="width: 100%"
            />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="密码" prop="newPassWord">
            <el-input
              v-model="row.newPassWord"
              type="password"
              auto-complete="new-password"
              placeholder="请输入"
              show-password
              style="width: 100%"
            />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              v-model="row.confirmPassword"
              type="password"
              autocomplete="off"
              placeholder="请输入"
              show-password
              style="width: 100%"
            />
          </el-form-item>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="savePassword">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { queryByPage, updatePassWord } from '../../api/user'
import { mapGetters } from 'vuex'

export default {
  name: 'UserIndex',
  components: {},
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (!value || value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.row.newPassWord) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      activeName: 'first',
      selectedRiskCode: '',
      formDate: {
        userCode: '',
        userName: '',
        userCompany: ''
      },
      row: {},
      userResult: [],
      userCompany: [],
      companyList: [],
      passwordRules: {
        newPassWord: [{ required: true, message: '新密码不能为空', trigger: 'blur' }],
        confirmPassword: [{ trigger: 'blur', validator: validatePass2 }]
      },
      dialogVisible: false,
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
    // 查询列表
    queryData() {
      this.formDate.pageNo = this.currentPage
      this.formDate.pageSize = this.pageSize
      queryByPage(this.formDate).then(res => {
        if (res.state === '0000') {
          this.userCompany = res.userCompanyList
          this.userResult = res.content
          this.total = res.totalCount
        }
      })
    },
    savePassword() {
      this.$refs['passwordForm'].validate((valid) => {
        if (valid) {
          updatePassWord(this.row).then(res => {
            if (res.state === '0000') {
              this.$message.success('修改成功')
              this.dialogVisible = false
              // this.$router.push('/user/index')
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    formatter(row, column) {
      if (row.sex === '0') {
        return '男'
      } else {
        return '女'
      }
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
    updatePassword(row) {
      this.row = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true
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
