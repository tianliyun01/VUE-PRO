<template>
  <div class="app-container">
    <div class="Notice">
      <el-tabs v-model="activeName" class="customcard">
        <el-tab-pane label="权限管理" name="first">
          <el-form size="mini" label-position="right" label-width="108px" class="pdt-18">
            <el-row class="row-bg" justify="space-around">
              <el-col :span="8">
                <el-form-item label="人员代码">
                  <el-input
                    v-model="formDate.userCode"
                    placeholder="请输入"
                    clearable
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
                    clearable
                    style="width: 100%"
                    value-key="productCode"
                  ><el-option v-for="item in userCompany" :key="item" :label="item" :value="item" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="角色">
                  <el-select
                    v-model="formDate.roleId"
                    class="quick-select"
                    placeholder="请选择"
                    filterable
                    clearable
                    style="width: 100%"
                    value-key="productCode"
                  >
                    <el-option v-for="item in roleList" :key="item.roleId" :label="item.name" :value="item.roleId" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="姓名">
                  <el-input
                    v-model="formDate.userName"
                    placeholder="请输入"
                    clearable
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否启用">
                  <el-select
                    v-model="formDate.validStatus"
                    class="quick-select"
                    placeholder="请选择"
                    filterable
                    clearable
                    style="width: 100%"
                    value-key="productCode"
                  >
                    <el-option label="有效" value="1" />
                    <el-option label="无效" value="0" />
                    <!-- <el-option v-for="item in spreadClassDtoList" :key="item.spreadCode" :label="item.spreadName" :value="item.spreadCode" /> -->
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
        <!--        <el-button class="query-header-btn fr" size="mini" type="primary" plain @click="add">添加</el-button>-->
      </div>
      <div>
        <el-table :data="systemListResult" style="width: 100%">
          <el-table-column type="index" label="序号" width="100" />
          <el-table-column prop="userCode" label="人员代码" width="100" />
          <el-table-column prop="userCompany" label="公司" width="120" />
          <el-table-column prop="userName" label="姓名" width="320" show-overflow-tooltip />
          <el-table-column prop="validStatus" label="是否启用" width="220" :formatter="formatter" />
          <el-table-column prop="phone" label="手机号码" width="300" show-overflow-tooltip />
          <el-table-column prop="email" label="邮箱" width="220" show-overflow-tooltip />
          <el-table-column prop="roleName" label="角色" width="220" show-overflow-tooltip />
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="edit(scope.row)">权限设置</el-button>
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
import { queryPermissionData } from '../../api/permission'

export default {
  name: 'PermissionIndex',
  components: {},
  data() {
    return {
      activeName: 'first',
      selectedRiskCode: '',
      formDate: {
        userCode: '',
        userCompany: '',
        roleId: '',
        userName: '',
        validStatus: ''
      },
      systemListResultL: [],
      authorityPageDtoList: [],
      companyList: [],
      userCompany: [],
      pageSize: 15,
      currentPage: 1,
      total: 0
    }
  },
  // computed: {
  //   ...mapGetters(['systemClassList', 'integrationModeList', 'userInfo', 'token'])
  // },
  created() {
    // this.queryForm()
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
    //       this.companyList = res.companyList
    //     }
    //   })
    // },
    // 查询列表
    queryData() {
      this.formDate.pageNo = this.currentPage
      this.formDate.pageSize = this.pageSize
      queryPermissionData(this.formDate).then(res => {
        if (res.state === '0000') {
          this.userCompany = res.userCompanyList
          this.systemListResult = res.content
          this.total = res.totalCount
          this.insurerCodeList = res.insurerCodeList
          this.roleList = res.roleList
          this.authorityPageDtoList = res.authorityPageDtoList
          this.total = res.totalCount
        }
      })
    },
    formatter(row, column) {
      if (row.validStatus === '0') {
        return '无效'
      } else {
        return '有效'
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
      this.formDate.roleId = ''
      this.formDate.userName = ''
      this.formDate.validStatus = ''
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
        name: 'PermissionEdie',
        query: {
          editType: 'ADD'
        }
      })
    },
    edit(item) {
      this.$router.push({
        name: 'PermissionEdie',
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
      this.$confirm('确定禁用该条记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // const { userCode, riskCode } = item
        // riskUserDeleteById({ userCode, riskCode, createdBy: this.userInfo.userCode }).then(res => {
        //   if (res.code === 200) {
        //     this.$message.success('删除信息成功')
        //     this.queryData()
        //   }
        // })
      })
    },
    uploadSuccess(res) {
      if (res.code === 200) {
        if (res.data === '1' || res.data === 1) {
          this.$message({
            message: '上传成功',
            type: 'success'
          })
          this.currentPage = 1
          this.queryData()
        }
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
    },
    // downLoadTemplate() {
    //   fileDownload({ fileCode: 'USERTEMPLATE' }).then((res) => {
    //     console.log(res)
    //     const blob = new Blob([res.data]) // 将服务端返回的文件流（二进制）excel文件转化为blob
    //     // const fileName = 'webagent' + '.zip';
    //     const fileName = '用户模板.xlsx'
    //     if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE
    //       window.navigator.msSaveOrOpenBlob(blob, fileName)
    //     } else {
    //       const objectUrl = (window.URL || window.webkitURL).createObjectURL(blob)
    //       const downFile = document.createElement('a')
    //       downFile.style.display = 'none'
    //       downFile.href = objectUrl
    //       downFile.download = fileName // 下载后文件名
    //       document.body.appendChild(downFile)
    //       downFile.click()
    //       document.body.removeChild(downFile) // 下载完成移除元素
    //       window.URL.revokeObjectURL(objectUrl) // 只要映射存在，Blob就不能进行垃圾回收，因此一旦不再需要引用，就必须小心撤销URL，释放掉blob对象。
    //     }
    //   })
    // },
    changepage() {}
  }
}
</script>
<style lang="scss" scoped>
</style>
