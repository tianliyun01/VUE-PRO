<template>
  <div class="app-container">
    <div class="Notice">
      <el-tabs v-model="activeName" class="customcard">
        <el-tab-pane label="风险保费查询及自定义计算" name="first">
          <el-form ref="queryForm" :model="queryForm" :rules="queryFormRules" size="mini" label-position="right" label-width="108px" class="pdt-18">
            <el-row class="row-bg" justify="space-around">
              <el-col :span="8">
                <el-form-item label="区域" prop="regionId">
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
                <el-form-item label="保险公司" prop="insurerCode">
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
                <el-form-item label="车辆类型" prop="carType">
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
                <el-form-item label="维度" prop="dataType">
                  <el-select
                    v-model="queryForm.dataType"
                    class="quick-select"
                    placeholder="请选择"
                    filterable
                    clearable
                    style="width: 100%"
                    value-key="productCode"
                    @change="changeDataType"
                  >
                    <el-option v-for="item in dataTypeList" :key="item.codeCode" :label="item.codeCname" :value="item.codeCode" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="厂商" prop="factoryId">
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
                <el-form-item label="品牌" prop="brandId">
                  <el-select
                    v-model="queryForm.brandId"
                    class="quick-select"
                    placeholder="请选择"
                    filterable
                    clearable
                    style="width: 100%"
                    value-key="productCode"
                    :disabled="brandForbidden"
                    @change="changeBrand(queryForm.brandId)"
                  >
                    <el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col v-if="queryForm.dataType>=1" :span="8">
                <el-form-item label="车系" prop="carSystemId">
                  <el-select
                    v-model="queryForm.carSystemId"
                    class="quick-select"
                    placeholder="请选择"
                    filterable
                    clearable
                    style="width: 100%"
                    value-key="productCode"
                    :disabled="carSystemForbidden"
                    @change="changeCarSystem(queryForm.carSystemId)"
                  >
                    <el-option v-for="item in carSystemList" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col v-if="queryForm.dataType>=2" :span="8">
                <el-form-item label="车组" prop="carsId">
                  <el-select
                    v-model="queryForm.carsId"
                    class="quick-select"
                    placeholder="请选择"
                    filterable
                    clearable
                    style="width: 100%"
                    value-key="productCode"
                    :disabled="carsForbidden"
                    @change="changeCars(queryForm.carsId)"
                  >
                    <el-option v-for="item in carsList" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col v-if="queryForm.dataType>=3" :span="8">
                <el-form-item key="modelId" label="车型" prop="modelId">
                  <el-select
                    v-model="queryForm.modelId"
                    class="quick-select"
                    placeholder="请选择"
                    filterable
                    clearable
                    style="width: 100%"
                    value-key="productCode"
                    :disabled="modelForbidden"
                  >
                    <el-option v-for="item in modelList" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col v-if="queryForm.dataType>=1" :span="8">
                <el-form-item label="车系代码">
                  <el-input
                    v-model="queryForm.carSystemEncode"
                    placeholder="请输入"
                    clearable
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col v-if="queryForm.dataType>=3" :span="8">
                <el-form-item label="车型代码">
                  <el-input
                    v-model="queryForm.modelEncode"
                    placeholder="请输入"
                    clearable
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="自定义案均">
                  <el-input
                    v-model="queryForm.customAvgIndemnity"
                    placeholder="请输入"
                    clearable
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="自定义出险率">
                  <el-input
                    v-model="queryForm.customAccidentRate"
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
        <el-button size="small" type="primary" @click="queryData()">计算</el-button>
      </div>
    </div>
    <div class="query mgt-14">
      <div class="query-header clearfix">
        <div class="header-title fl">查询结果</div>
      </div>
      <div>
        <el-table :data="pageInfo" style="width: 100%">
          <el-table-column type="index" label="序号" width="120" align="center" />
          <el-table-column prop="dataSourceName" label="结果来源" width="150" show-overflow-tooltip align="center" />
          <el-table-column prop="undrewRiskLevel" label="承保风险等级" width="100" align="center" />
          <el-table-column prop="estimateRiskPremium" label="预估风险保费" width="100" align="center" />
          <el-table-column prop="payRiskLevel" label="赔付风险等级" width="100" show-overflow-tooltip align="center" />
          <el-table-column prop="estimateAvgIndemnity" label="预估案均赔款" width="100" show-overflow-tooltip align="center" />
          <el-table-column prop="accidentLevel" label="出险风险等级" width="100" show-overflow-tooltip align="center" />
          <el-table-column prop="accidentRate" label="出险率" width="100" show-overflow-tooltip align="center" />
          <el-table-column prop="partFee" label="常用配件价格" width="100" show-overflow-tooltip align="center" />
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="edit(scope.row)">添加对比</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { initData, queryRiskPremiumByPage, getBrandByFactory, brandRecurInfo } from '../../api/risk-premium'
import { mapGetters } from 'vuex'

export default {
  name: 'RiskPremiumIndex',
  components: {},
  data() {
    return {
      activeName: 'first',
      queryForm: {
        regionId: null,
        insurerCode: null,
        carType: null,
        dataType: null,
        factoryId: null,
        brandId: null,
        carSystemId: null,
        carsId: null,
        modelId: null
      },
      regionList: [],
      carTypeList: [],
      dataTypeList: [],
      factoryList: [],
      brandList: [],
      carSystemList: [],
      carsList: [],
      modelList: [],
      brandForbidden: true,
      carSystemForbidden: true,
      carsForbidden: true,
      modelForbidden: true,
      insurerCodeList: [],
      menuId: '14',
      pageInfo: [],
      loading: false,
      queryFormRules: {
        regionId: [{ required: true, message: '请选择区域', trigger: 'change' }],
        insurerCode: [{ required: true, message: '请选择保险公司', trigger: 'change' }],
        carType: [{ required: true, message: '请选择车辆类别', trigger: 'change' }],
        dataType: [{ required: true, message: '请选择数据维度', trigger: 'change' }],
        factoryId: [{ required: true, message: '请选择厂商', trigger: 'change' }],
        brandId: [{ required: true, message: '请选择品牌', trigger: 'change' }],
        carSystemId: [{ required: true, message: '请选择车系', trigger: 'change' }],
        carsId: [{ required: true, message: '请选择车组', trigger: 'change' }],
        modelId: [{ required: true, message: '请选择车型', trigger: 'change' }]
        // userEname: [{ required: true, message: '人员英文名不能为空', trigger: 'blur' }],
      }
    }
  },
  computed: {
    ...mapGetters(['userName', 'userCode'])
  },
  created() {
    this.initData()
    console.log(this.userName, 'userName')
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
      this.brandForbidden = false
      if (factoryId) {
        var param = { factoryId: factoryId }
        getBrandByFactory(param).then(res => {
          if (res.state === '0000') {
            this.brandList = res.brandDtoList
          }
        })
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
      this.carSystemForbidden = false
      if (superId) {
        var param = { superId: superId }
        brandRecurInfo(param).then(res => {
          this.carSystemList = res
        })
      }
    },
    // 改变车系
    changeCarSystem(superId) {
      this.carsList = []
      this.modelList = []
      this.queryForm.carsId = null
      this.queryForm.modelId = null
      this.carsForbidden = false
      if (superId) {
        var param = { superId: superId }
        brandRecurInfo(param).then(res => {
          this.carsList = res
        })
      }
    },
    // 改变车组
    changeCars(superId) {
      this.modelList = []
      this.queryForm.modelId = null
      this.modelForbidden = false
      if (superId) {
        var param = { superId: superId }
        brandRecurInfo(param).then(res => {
          this.modelList = res
        })
      }
    },
    changeDataType() {
      this.carsList = []
      this.modelList = []
      this.queryForm.carSystemId = null
      this.queryForm.carsId = null
      this.queryForm.modelId = null
    },
    queryData() {
      this.$refs['queryForm'].validate((valid) => {
        if (valid) {
          var param = {
            regionId: this.queryForm.regionId,
            insurerCode: this.queryForm.insurerCode,
            carType: this.queryForm.carType,
            dataType: this.queryForm.dataType,
            factoryId: this.queryForm.factoryId,
            brandId: this.queryForm.brandId,
            carSystemId: this.queryForm.carSystemId,
            carsId: this.queryForm.carsId,
            modelId: this.queryForm.modelId,
            carSystemEncode: this.queryForm.carSystemEncode,
            modelEncode: this.queryForm.modelEncode,
            customAvgIndemnity: this.queryForm.customAvgIndemnity,
            customAccidentRate: this.queryForm.customAccidentRate,
            menuId: this.menuId,
            sourceType: 'A'
            // modelId: this.queryForm.modelId,
            // modelId: this.queryForm.modelId,
          }
          queryRiskPremiumByPage(param).then(res => {
            if (res.state === '0000') {
              if (res.riskPremiumDtoList && res.riskPremiumDtoList.length > 0) {
                for (let i = 0; i < res.riskPremiumDtoList.length; i++) {
                  // 结果类型(A中保研测算值,B自定义案均测算值,C自定义出险率测算值D自定义案均&出险率测算值)
                  if (res.riskPremiumDtoList[i].dataSource === 'A') {
                    res.riskPremiumDtoList[i].dataSourceName = '中保研测算值'
                  } else if (res.riskPremiumDtoList[i].dataSource === 'B') {
                    res.riskPremiumDtoList[i].dataSourceName = '自定义案均测算值'
                  } else if (res.riskPremiumDtoList[i].dataSource === 'C') {
                    res.riskPremiumDtoList[i].dataSourceName = '自定义出险率测算值'
                  } else if (res.riskPremiumDtoList[i].dataSource === 'D') {
                    res.riskPremiumDtoList[i].dataSourceName = '自定义案均&出险率测算值'
                  }
                  if (res.riskPremiumDtoList[i].sourceType === 'A') {
                    res.riskPremiumDtoList[i].sourceTypeName = '目标车型'
                  }
                }
                this.pageInfo = res.riskPremiumDtoList
              }
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    edit(item) {
      this.$router.push({
        name: 'RiskPremiumEdit',
        query: {
          // editType: 'EDIT',
          info: JSON.stringify(item)
        }
      })
    },
    /* handleSizeChange(val) {
      this.pageSize = val
      this.queryData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.queryData()
    },*/
    // 重置
    reset() {
      this.queryForm = {
        regionId: null,
        insurerCode: null,
        carType: null,
        dataType: null,
        factoryId: null,
        brandId: null,
        carSystemId: null,
        carsId: null,
        modelId: null
      }
      this.brandForbidden = true
      this.carSystemForbidden = true
      this.carsForbidden = true
      this.modelForbidden = true
    }
  }
}
</script>
<style lang="scss" >
.el-divider--horizontal{
  margin-top: 0;
}
</style>
