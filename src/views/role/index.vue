<template>
  <div class="app-container">
    <div class="Notice">
      <el-tabs v-model="activeName" class="customcard">
        <el-tab-pane label="角色管理" name="first">
          <el-form size="mini" label-position="right" label-width="108px" class="pdt-18">
            <el-row class="row-bg" justify="space-around">
              <el-col :span="8">
                <el-form-item label="角色名称">
                  <el-input
                    v-model="listQuery.name"
                    placeholder="请输入"
                    clearable
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否启用">
                  <el-select
                    v-model="listQuery.isValidate"
                    class="quick-select"
                    placeholder="请选择"
                    filterable
                    clearable
                    style="width: 100%"
                  >
                    <el-option label="已启用" value="1" />
                    <el-option label="禁用" value="0" />
                    <!--                    <el-option v-for="item in spreadClassDtoList" :key="item.spreadCode" :label="item.spreadName" :value="item.spreadCode" />-->
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
        <el-table :data="systemListResult" style="width: 100%">
          <el-table-column type="index" label="序号" width="100" />
          <el-table-column prop="name" label="名称" min-width="200" show-overflow-tooltip />
          <el-table-column prop="isValidate" label="状态" width="120" />
          <el-table-column prop="des" label="描述" width="320" show-overflow-tooltip />
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
import { queryRoleByPage } from '../../api/role'
import { mapGetters } from 'vuex'
export default {
  name: 'RoleIndex',
  components: {},
  data() {
    return {
      listQuery: {
        name: '',
        isValidate: ''
      },
      activeName: 'first',
      selectedRiskCode: '',
      comcodes: '',
      riskcode: '',
      userName: '',
      loading: false,
      type: '',
      menuType: '',
      systemListResult: [],
      spreadClassDtoList: [],
      menuTypeList: [],
      prpdCompanyList: [],
      riskCodeList: [],
      riskId: [],
      acurl: '',
      pageSize: 15,
      currentPage: 1,
      total: 0,
      roleId: ''
    }
  },
  computed: {
    ...mapGetters(['systemClassList', 'integrationModeList', 'userInfo', 'token'])
  },
  created() {
    this.acurl = process.env.VUE_APP_BASE_API + '/portservice/riskUser/readUserExcel'
    // this._getlist()
    this.queryData()
  },
  methods: {
    // 查询列表
    queryData() {
      this.listQuery.pageNo = this.currentPage
      this.listQuery.pageSize = this.pageSize
      queryRoleByPage(this.listQuery).then(res => {
        if (res.state === '0000') {
          this.systemListResult = res.roleList
          this.total = res.totalCount
        }
      })
    },
    // 列表数据
    // _getlist() {
    //   queryRoleInfo(1).then(res => {
    //     console.log(res.roleDto)
    //     this.systemListResult = [res.roleDto]
    //     console.log(this.systemListResult)
    //     this.total = this.systemListResult.length
    //     this.roleId = res.roleDto.roleId
    //   })
    // },
    // 重置
    reset() {
      this.listQuery.name = ''
      this.listQuery.isValidate = ''
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.queryData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.queryData()
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
        name: 'RoleEdie',
        query: {
          editType: 'ADD'
        }
      })
    },
    edit(item) {
      this.$router.push({
        name: 'RoleEdie',
        query: {
          editType: 'EDIT',
          roleId: item.roleId
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
