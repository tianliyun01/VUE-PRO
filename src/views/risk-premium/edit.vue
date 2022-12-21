<template>
  <div class="app-container">
    <div class="Notice">
      <el-tabs v-model="activeName" class="customcard">
        <el-tab-pane label="对比列表" name="first">
          <el-table :data="compareList" style="width: 100%">
            <el-table-column type="index" align="center" label="序号" width="100" />
            <el-table-column prop="sourceTypeName" align="center" label="结果类型" min-width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.sourceTypeName" placement="top-start">
                  <el-input v-model="scope.row.sourceTypeName" :disabled="true" />
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="dataSourceName" align="center" label="结果类型" min-width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.dataSourceName" placement="top-start">
                  <el-input v-model="scope.row.dataSourceName" :disabled="true" />
                </el-tooltip>
              </template>
            </el-table-column>
            <!--<el-table-column prop="regionName" align="center" label="地域" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.regionName" placement="top-start">
                  <el-input v-model="scope.row.regionName" :disabled="true" />
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="carTypeName" align="center" label="车辆类型" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.carTypeName" placement="top-start">
                  <el-input v-model="scope.row.carTypeName" :disabled="true" />
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="insurerCodeName" align="center" label="公司" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.insurerCodeName" placement="top-start">
                  <el-input v-model="scope.row.insurerCodeName" :disabled="true" />
                </el-tooltip>
              </template>
            </el-table-column>-->
            <el-table-column prop="brandName" align="center" label="品牌" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.brandName" placement="top-start">
                  <el-input v-model="scope.row.brandName" :disabled="true" />
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="carSystemName" align="center" label="车系" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.carSystemName" placement="top-start">
                  <el-input v-model="scope.row.carSystemName" :disabled="true" />
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="carsName" align="center" label="车组" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.carsName" placement="top-start">
                  <el-input v-model="scope.row.carsName" :disabled="true" />
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="modelName" align="center" label="车型" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.modelName" placement="top-start">
                  <el-input v-model="scope.row.modelName" :disabled="true" />
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="undrewRiskLevel" align="center" label="承保风险等级" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.undrewRiskLevel" :disabled="true" />
              </template>
            </el-table-column>
            <el-table-column prop="estimateRiskPremium" align="center" label="预估风险保费" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.estimateRiskPremium" :disabled="true" />
              </template>
            </el-table-column>
            <el-table-column prop="payRiskLevel" align="center" label="赔付风险等级" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.payRiskLevel" :disabled="true" />
              </template>
            </el-table-column>
            <el-table-column prop="estimateAvgIndemnity" align="center" label="预估案均赔款" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.estimateAvgIndemnity" :disabled="true" />
              </template>
            </el-table-column>
            <el-table-column prop="accidentLevel" align="center" label="出险风险等级" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.accidentLevel" :disabled="true" />
              </template>
            </el-table-column>
            <el-table-column prop="accidentRate" align="center" label="出险率" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.accidentRate" :disabled="true" />
              </template>
            </el-table-column>
            <el-table-column prop="partFee" align="center" label="常用配件价格" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.partFee" :disabled="true" />
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="delRow(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="query mgt-14">
      <div class="query-header clearfix">
        <div class="header-title fl">比较车型</div>
      </div>
      <el-form size="mini" label-position="right" label-width="108px" class="pdt-18">
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
                :disabled="brandForbidden"
                @change="changeBrand(queryForm.brandId)"
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
                :disabled="carSystemForbidden"
                @change="changeCarSystem(queryForm.carSystemId)"
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
                :disabled="carsForbidden"
                @change="changeCars(queryForm.carsId)"
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
                :disabled="modelForbidden"
              >
                <el-option v-for="item in modelList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
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
        <!--<el-row size="mini" label-position="right" label-width="108px" style="padding-left: 82px;padding-bottom: 18px">
          <el-col :span="5">
            <template>
              <el-checkbox v-model="queryForm.checked1">同承保风险等级</el-checkbox>
            </template>
          </el-col>
          <el-col :span="5">
            <template>
              <el-checkbox v-model="queryForm.checked2">同赔付风险等级</el-checkbox>
            </template>
          </el-col>
          <el-col :span="5">
            <template>
              <el-checkbox v-model="queryForm.checked3">同出险风险等级</el-checkbox>
            </template>
          </el-col>
        </el-row>-->
      </el-form>
      <div class="search-footer">
        <el-button size="small" type="primary" plain @click="reset">重置</el-button>
        <el-button size="small" type="primary" @click="currentPage=1,queryData()">查询</el-button>
      </div>
    </div>
    <div class="query mgt-14" style="position: relative;">
      <div class="query-header clearfix">
        <div class="header-title fl">比较车型列表</div>
      </div>
      <el-button class="query-header-btn" style="position: absolute;right: 20px;z-index: 200;top: 0" size="mini" type="primary" plain @click="add">添加</el-button>
      <div>
        <el-table :data="pageInfo" style="width: 100%" @selection-change="handleSelectionChange">>
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column type="index" label="序号" width="120" />
          <el-table-column prop="dataSourceName" label="结果类型" width="120" show-overflow-tooltip />
          <el-table-column prop="regionName" label="地域" width="120" />
          <el-table-column prop="carTypeName" label="车辆类型" width="120" />
          <el-table-column prop="insurerCodeName" label="保险公司" width="120" show-overflow-tooltip />
          <el-table-column prop="brandName" label="品牌" width="120" />
          <el-table-column prop="carSystemName" label="车系" width="120" show-overflow-tooltip />
          <el-table-column prop="carsName" label="车组" width="120" show-overflow-tooltip />
          <el-table-column prop="modelName" label="车型" width="120" show-overflow-tooltip />
          <el-table-column prop="undrewRiskLevel" label="承保风险等级" width="120" show-overflow-tooltip />
          <el-table-column prop="estimateRiskPremium" label="预估风险保费" width="120" show-overflow-tooltip />
          <el-table-column prop="payRiskLevel" label="赔付风险等级" width="120" show-overflow-tooltip />
          <el-table-column prop="estimateAvgIndemnity" label="预估案均赔款" width="120" show-overflow-tooltip />
          <el-table-column prop="accidentLevel" label="出险风险等级" width="120" show-overflow-tooltip />
          <el-table-column prop="accidentRate" label="出险率" width="120" show-overflow-tooltip />
          <el-table-column prop="partFee" label="常用配件价格" width="120" show-overflow-tooltip />
          <!--<el-table-column type="index" label="序号" width="100" />
          <el-table-column prop="riskName" label="品牌" min-width="200" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="riskcode">{{ scope.row.riskCode }}</span>
              {{ scope.row.riskName }}
            </template>
          </el-table-column>
          <el-table-column prop="activeType" label="车系" width="120" />
          <el-table-column prop="activeType" label="车系代码" width="320" show-overflow-tooltip />
          <el-table-column prop="activeType" label="车组" width="320" show-overflow-tooltip />
          <el-table-column prop="activeType" label="车型" width="320" show-overflow-tooltip />
          <el-table-column prop="activeType" label="车型代码" width="320" show-overflow-tooltip />
          <el-table-column prop="activeType" label="CIRI案均" width="320" show-overflow-tooltip />-->
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
import { initData, queryRiskPremiumByPage, getBrandByFactory, brandRecurInfo } from '../../api/risk-premium'
import { mapGetters } from 'vuex'

export default {
  name: 'RiskPremiumEdit',
  components: {},
  data() {
    return {
      activeName: 'first',
      queryForm: {},
      compareList: [],
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
      multipleSelection: [],
      loading: false,
      pageSize: 15,
      currentPage: 1,
      total: 0
    }
  },
  computed: {
    ...mapGetters(['userName', 'userCode']),
    target() {
      return this.$route.query.info
    }
  },
  created() {
    this.initData()
    this.compareList.push(this.target)
  },
  methods: {
    delRow(index) {
      this.$confirm('确定删除该条记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.compareList.splice(index, 1)
      })
    },
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
    queryData() {
      var param = {
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
        modelId: this.queryForm.modelId,
        carSystemEncode: this.queryForm.carSystemEncode,
        modelEncode: this.queryForm.modelEncode,
        customAvgIndemnity: this.queryForm.customAvgIndemnity,
        customAccidentRate: this.queryForm.customAccidentRate,
        menuId: this.menuId,
        sourceType: 'B'
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
              res.riskPremiumDtoList[i].sourceType = 'B'
              res.riskPremiumDtoList[i].sourceTypeName = '比较车型'
            }
            this.pageInfo = res.riskPremiumDtoList
            this.total = res.riskPremiumDtoList.length
          }
        } else {
          this.$message.error(res.msg)
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
      this.queryForm = {}
      this.brandForbidden = true
      this.carSystemForbidden = true
      this.carsForbidden = true
      this.modelForbidden = true
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    add() {
      // var select = this.pageInfoList.filter(item => item.checked === true)
      if (this.multipleSelection.length === 0) {
        this.$message.error('请先选择比较车型!')
        return false
      }
      this.multipleSelection.forEach(item => {
        this.compareList.push(item)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
