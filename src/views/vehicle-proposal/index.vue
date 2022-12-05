<template>
  <div class="app-container">
    <div class="Notice">
      <el-tabs v-model="activeName" class="customcard">
        <el-tab-pane label="车损险各车型保费建议" name="first">
          <el-form size="mini" label-position="right" label-width="108px" class="pdt-18">
            <el-row class="row-bg" justify="space-around">
              <el-col :span="8">
                <el-form-item label="区域">
                  <el-select
                    v-model="queryForm.regionId"
                    class="quick-select"
                    placeholder="请选择"
                    filterable
                    clearable
                    style="width: 100%"
                    value-key="productCode"
                  >
                    <el-option v-for="item in regionList" :key="item.id" :label="item.regionName" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="保险公司">
                  <el-select
                    v-model="queryForm.insurerCode"
                    class="quick-select"
                    placeholder="请选择"
                    filterable
                    clearable
                    style="width: 100%"
                    value-key="productCode"
                  >
                    <el-option v-for="item in insurerCodeList" :key="item.codeCode" :label="item.codeCname" :value="item.codeCode" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车辆类型">
                  <el-select
                    v-model="queryForm.carType"
                    class="quick-select"
                    placeholder="请选择"
                    filterable
                    clearable
                    style="width: 100%"
                    value-key="productCode"
                  >
                    <el-option v-for="item in carTypeList" :key="item.codeCode" :label="item.codeCname" :value="item.codeCode" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-divider style="    margin-top: 0;" />
            <el-row class="row-bg" justify="space-around">
              <el-col :span="8">
                <el-form-item label="厂商">
                  <el-select
                    v-model="queryForm.factoryId"
                    class="quick-select"
                    placeholder="请选择"
                    filterable
                    clearable
                    style="width: 100%"
                    value-key="productCode"
                    @change="changeFactory(queryForm.factoryId)"
                  >
                    <el-option v-for="item in factoryList" :key="item.factoryId" :label="item.factoryName" :value="item.factoryId" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="品牌">
                  <el-select
                    v-model="queryForm.brandId"
                    class="quick-select"
                    placeholder="请选择"
                    filterable
                    clearable
                    style="width: 100%"
                    value-key="productCode"
                    @change="changeBrand(queryForm.brandId)"
                    @click.native="getBrand()"
                  >
                    <el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="车系">
                  <el-select
                    v-model="queryForm.carSystemId"
                    class="quick-select"
                    placeholder="请选择"
                    filterable
                    clearable
                    style="width: 100%"
                    value-key="productCode"
                  >
                    <el-option v-for="item in carSystemList" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车组">
                  <el-select
                    v-model="queryForm.carsId"
                    class="quick-select"
                    placeholder="请选择"
                    filterable
                    clearable
                    style="width: 100%"
                    value-key="productCode"
                  >
                    <el-option v-for="item in carsList" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车型">
                  <el-select
                    v-model="queryForm.modelId"
                    class="quick-select"
                    placeholder="请选择"
                    filterable
                    clearable
                    style="width: 100%"
                    value-key="productCode"
                  >
                    <el-option v-for="item in modelList" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车系代码">
                  <el-input
                    v-model="queryForm.carSystemCode"
                    placeholder="请输入"
                    clearable
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车型代码">
                  <el-input
                    v-model="queryForm.modelCode"
                    placeholder="请输入"
                    clearable
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
        <!-- <el-button class="query-header-btn fr" size="mini" type="primary" plain @click="add">对比</el-button> -->
      </div>
      <div>
        <el-table :data="pageInfo" style="width: 100%">
          <el-table-column prop="activeType" label="" width="120" />
          <el-table-column prop="activeType" label="赔付风险等级" width="120" />
          <el-table-column prop="activeType" label="风险保费" width="120" show-overflow-tooltip />
          <el-table-column prop="activeType" label="案均赔款" width="120" show-overflow-tooltip />
          <el-table-column prop="activeType" label="18件配件价格" width="120" show-overflow-tooltip />
          <el-table-column prop="activeType" label="出险风险等级" width="120" show-overflow-tooltip />
          <el-table-column prop="activeType" label="出险率" width="120" show-overflow-tooltip />
          <el-table-column prop="activeType" label="出险率" width="120" show-overflow-tooltip />
          <el-table-column prop="activeType" label="出险率" width="120" show-overflow-tooltip />
          <el-table-column prop="activeType" label="出险率" width="120" show-overflow-tooltip />
          <el-table-column prop="activeType" label="出险率" width="120" show-overflow-tooltip />
          <el-table-column prop="activeType" label="出险率" width="120" show-overflow-tooltip />
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="edit(scope.row)">禁用</el-button>
              <el-button type="text" size="mini" @click="edit(scope.row)">权限设置</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { initData, queryPayByPage, getBrandByFactory, brandRecurInfo } from '../../api/compensation'
import { mapGetters } from 'vuex'

export default {
  name: 'VehicleProposalIndex',
  components: {},
  data() {
    return {
      activeName: 'first',
      queryForm: {},
      regionList: [],
      carTypeList: [],
      dataTypeList: [],
      factoryList: [],
      brandList: [],
      carSystemList: [],
      carsList: [],
      modelList: [],
      insurerCodeList: [],
      pageInfo: [],
      loading: false,
      // acurl: '',
      pageSize: 15,
      currentPage: 1,
      total: 0
    }
  },
  computed: {
    ...mapGetters(['userName', 'userCode'])
  },
  created() {
    this.initData()
    console.log(this.userName, 'userName')
    // this.acurl = process.env.VUE_APP_BASE_API + '/portservice/riskUser/readUserExcel'
  },
  methods: {
    initData() {
      var param = { userCode: this.userCode }
      initData(param).then(res => {
        if (res.state === '0000') {
          this.carTypeList = res.carTypeList ? res.carTypeList : []
          this.dataTypeList = res.dataTypeList ? res.dataTypeList : []
          this.factoryList = res.factoryList ? res.factoryList : []
          this.insurerCodeList = res.insurerCodeList ? res.insurerCodeList : []
          this.regionList = res.regionList ? res.regionList : []
          // console.log(res)
        }
      })
    },
    // 改变厂商
    changeFactory(factoryId) {
      this.brandList = []
      this.carSystemList = []
      this.carsList = []
      this.modelList = []
      this.queryForm.brandId = null
      this.queryForm.carSystemId = null
      this.queryForm.carsId = null
      this.queryForm.modelId = null
      var param = { factoryId: factoryId }
      getBrandByFactory(param).then(res => {
        if (res.state === '0000') {
          this.brandList = res.brandDtoList
        }
      })
    },
    // 点击品牌
    getBrand() {
      if (!this.queryForm.factoryId || this.queryForm.factoryId === '') {
        this.$message.error('请先选择厂商!')
        return false
      }
    },
    // 改变品牌
    changeBrand(superId) {
      this.carSystemList = []
      this.carsList = []
      this.modelList = []
      this.queryForm.carSystemId = null
      this.queryForm.carsId = null
      this.queryForm.modelId = null
      if (superId) {
        var param = { superId: superId }
        this.carSystemList = brandRecurInfo(param)
      }
    },
    brandRecurInfo(superId, list) {
      // 联级查询的接口
      brandRecurInfo(superId).then(res => {
        list(res.data)
      })
    },
    queryData() {
      var param = {
        globalUserCode: this.userCode,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        regionId: this.queryForm.regionId,
        insurerCode: this.queryForm.insurerCode,
        carType: this.queryForm.carType,
        dataType: this.queryForm.dataType,
        factoryId: this.queryForm.factoryId,
        brandId: this.queryForm.brandId,
        carSystemId: this.queryForm.carSystemId,
        carsId: this.queryForm.carsId,
        modelId: this.queryForm.modelId
        // modelId: this.queryForm.modelId,
        // modelId: this.queryForm.modelId,
      }
      queryPayByPage(param).then(res => {
        if (res.state === '0000') {
          console.log(res)
        }
      })
    },
    /* queryForm() {
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
    },*/
    // 查询列表
    /* queryData() {
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
    },*/
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
    changepage() {}
  }
}
</script>
<style lang="scss" >
.el-divider--horizontal{
  margin-top: 0;
}
</style>
