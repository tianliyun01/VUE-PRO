<template>
  <div class="app-container">
    <div class="Notice">
      <el-button class="query-header-btn" style="position: absolute;right: 90px;z-index: 200;" size="mini" type="primary" plain @click="add">添加</el-button>
      <el-button class="query-header-btn" style="position: absolute;right: 20px;z-index: 200;" size="mini" type="primary" plain @click="contrast">对比</el-button>
      <el-tabs v-model="activeName" class="customcard">
        <el-tab-pane label="对比列表" name="first">
          <el-table :data="systemListResult" style="width: 100%">
            <el-table-column type="index" label="序号" width="100" />
            <el-table-column prop="riskName" label="品牌" min-width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-select v-model="scope.row.type" placeholder="请选择">
                  <el-option v-for="item in spreadClassDtoList" :key="item.spreadCode" :label="item.spreadName" :value="item.spreadCode" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="riskName" label="厂商" min-width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-select v-model="scope.row.type" placeholder="请选择">
                  <el-option v-for="item in spreadClassDtoList" :key="item.spreadCode" :label="item.spreadName" :value="item.spreadCode" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="riskName" label="维度" min-width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-select v-model="scope.row.type" placeholder="请选择">
                  <el-option v-for="item in spreadClassDtoList" :key="item.spreadCode" :label="item.spreadName" :value="item.spreadCode" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="riskName" label="车系" min-width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-select v-model="scope.row.type" placeholder="请选择">
                  <el-option v-for="item in spreadClassDtoList" :key="item.spreadCode" :label="item.spreadName" :value="item.spreadCode" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="riskName" label="车组" min-width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-select v-model="scope.row.type" placeholder="请选择">
                  <el-option v-for="item in spreadClassDtoList" :key="item.spreadCode" :label="item.spreadName" :value="item.spreadCode" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="riskName" label="车型" min-width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-select v-model="scope.row.type" placeholder="请选择">
                  <el-option v-for="item in spreadClassDtoList" :key="item.spreadCode" :label="item.spreadName" :value="item.spreadCode" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="riskName" label="自定义案均" min-width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.comcodes" />
              </template>
            </el-table-column>
            <el-table-column prop="riskName" label="自定义出险率" min-width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.comcodes" />
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="edit(scope.row)">重置</el-button>
                <el-button type="text" size="mini" @click="edit(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog :visible.sync="dialogVisible" :show-header="false" title="列表">
      <el-table :data="getValues" style="width: 100%">
        <el-table-column
          v-for="(item, index) in getHeaders"
          :key="index"
          :prop="item"
          :label="item"
        />
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import { riskUserQueryListPage, riskUserDeleteById, productEditPage, queryCompanyList, fileDownload, deleteRiskUserBatch } from '../../api/user'
import { mapGetters } from 'vuex'

export default {
  name: 'CompensationEdit',
  components: {},
  data() {
    return {
      activeName: 'first',
      selectedRiskCode: '',
      comcodes: '',
      riskcode: '',
      userName: '',
      loading: false,
      dialogVisible: false,
      type: '',
      menuType: '',
      systemListResult: [{}],
      tableData: [{}],
      headers: [
        {
          prop: 'date',
          label: '品牌'
        },
        {
          prop: 'name',
          label: '厂商'
        },
        {
          prop: 'address',
          label: '维度'
        },
        {
          prop: 'address',
          label: '车系'
        },
        {
          prop: 'address',
          label: '车系代码'
        },
        {
          prop: 'address',
          label: '车组'
        },
        {
          prop: 'address',
          label: '车型'
        },
        {
          prop: 'address',
          label: '车型代码'
        },
        {
          prop: 'address',
          label: '自定义案均'
        },
        {
          prop: 'address',
          label: '自定义出险率'
        },
        {
          prop: 'address',
          label: '承保风险等级'
        },
        {
          prop: 'address',
          label: '风险保费'
        },
        {
          prop: 'address',
          label: '赔付风险等级'
        },
        {
          prop: 'address',
          label: '案均赔款'
        },
        {
          prop: 'address',
          label: '18件配件价格'
        },
        {
          prop: 'address',
          label: '出险风险等级'
        },
        {
          prop: 'address',
          label: '出险率'
        }
      ],
      acurl: '',
      pageSize: 15,
      currentPage: 1,
      total: 0,
      cascaderConfig: {
        lazy: true,
        label: 'comcname',
        expandTrigger: 'click',
        checkStrictly: true,
        value: 'comcode',
        children: 'children',
        lazyLoad(node, resolve) {
          if (node.level !== 1) return
          queryCompanyList({ comcode: node.value }).then((response) => {
            if (!response.data.length) resolve()
            response.data.forEach(l => {
              l.leaf = 1
            })
            resolve(response.data)
          })
        }
      }
    }
  },
  computed: {
    ...mapGetters(['systemClassList', 'integrationModeList', 'userInfo', 'token']),
    getHeaders() {
      return this.tableData.reduce((pre, cur, index) => pre.concat(`value${index}`), ['title'])
    },
    getValues() {
      return this.headers.map(item => {
        return this.tableData.reduce((pre, cur, index) => Object.assign(pre, { ['value' + index]: cur[item.prop] }), { 'title': item.label })
      })
    }
  },
  created() {
    this.queryData()
    this.acurl = process.env.VUE_APP_BASE_API + '/portservice/riskUser/readUserExcel'
  },
  methods: {
    queryForm() {
      const param = {
        comcode: '',
        riskcode: '',
        editType: 'ADD'
      }
      productEditPage(param).then(res => {
        if (res.code === 200) {
          this.prpdCompanyList = res.data.prpdCompanyList
          this.riskCodeList = res.data.findProductDtoMap.riskList
          this.riskCodeList[0].spread = '1'
          this.activeType = res.data.activeType
          this.formList[0].activeType = res.data.activeType
          this.total = res.data.totalCount
        }
      })
    },
    // 查询列表
    queryData() {
      const param = {
        userCode: this.comcodes,
        userName: this.userName,
        riskcode: this.riskCode,
        spread: this.type,
        delMenuType: this.menuType,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      riskUserQueryListPage(param).then(res => {
        if (res.code === 200) {
          if (!res.data) {
            this.systemListResult = []
            this.currentPage = 0
            this.total = 0
            return
          }
          this.riskCodeList = res.data.riskMap.riskList
          this.spreadClassDtoList = res.data.spreadClassDtoList
          this.menuTypeList = res.data.menuTypeList
          this.systemListResult = res.data.portRiskUserDtoIPage.records
          this.currentPage = res.data.portRiskUserDtoIPage.current
          this.total = res.data.portRiskUserDtoIPage.total
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
      this.selectedRiskCode = ''
      this.comcodes = ''
      this.userName = ''
      this.riskCode = ''
      this.menuType = ''
      this.type = ''
    },
    contrast() {
      this.tableData = [{}]
      this.dialogVisible = true
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
        name: 'CartypeCompensationEdie',
        query: {
          editType: 'ADD'
        }
      })
    },
    edit(item) {
      this.$router.push({
        name: 'CartypeCompensationEdie',
        query: {
          editType: 'EDIT',
          userCode: item.userCode,
          riskCode: item.riskCode
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
        deleteRiskUserBatch({ riskDeleteList: this.riskId }).then(res => {
          if (res.code === 200) {
            this.$message.success('删除信息成功')
            this.queryData()
          }
        })
      })
    },
    del(item) {
      this.$confirm('确定删除该条记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const { userCode, riskCode } = item
        riskUserDeleteById({ userCode, riskCode, createdBy: this.userInfo.userCode }).then(res => {
          if (res.code === 200) {
            this.$message.success('删除信息成功')
            this.queryData()
          }
        })
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
    downLoadTemplate() {
      fileDownload({ fileCode: 'USERTEMPLATE' }).then((res) => {
        console.log(res)
        const blob = new Blob([res.data]) // 将服务端返回的文件流（二进制）excel文件转化为blob
        // const fileName = 'webagent' + '.zip';
        const fileName = '用户模板.xlsx'
        if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE
          window.navigator.msSaveOrOpenBlob(blob, fileName)
        } else {
          const objectUrl = (window.URL || window.webkitURL).createObjectURL(blob)
          const downFile = document.createElement('a')
          downFile.style.display = 'none'
          downFile.href = objectUrl
          downFile.download = fileName // 下载后文件名
          document.body.appendChild(downFile)
          downFile.click()
          document.body.removeChild(downFile) // 下载完成移除元素
          window.URL.revokeObjectURL(objectUrl) // 只要映射存在，Blob就不能进行垃圾回收，因此一旦不再需要引用，就必须小心撤销URL，释放掉blob对象。
        }
      })
    },
    changepage() {}
  }
}
</script>
<style lang="scss" scoped>
</style>
