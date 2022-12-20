<template>
  <div class="app-container">
    <div class="Notice">
      <el-tabs v-model="activeName" class="customcard">
        <el-tab-pane label="车型风险级别查询" name="first">
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
                <el-form-item label="维度" prop="dataType">
                  <el-select
                    v-model="queryForm.dataType"
                    class="quick-select"
                    placeholder="请选择"
                    filterable
                    clearable
                    style="width: 100%"
                    value-key="productCode"
                  >
                    <el-option v-for="item in dataTypeList" :key="item.codeCode" :label="item.codeCname" :value="item.codeCode" />
                  </el-select>
                </el-form-item>
              </el-col>
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
                <el-form-item label="车系代码">
                  <el-input
                    v-model="queryForm.carSystemEncode"
                    placeholder="请输入"
                    clearable
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车型代码">
                  <el-input
                    v-model="queryForm.modelEncode"
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
          <el-table-column type="index" label="序号" width="120" />
          <el-table-column prop="regionName" label="地域" width="120" />
          <el-table-column prop="carTypeName" label="车辆类型" width="120" />
          <el-table-column prop="insurerCodeName" label="保险公司" width="120" show-overflow-tooltip />
          <el-table-column prop="brandName" label="品牌" width="120" />
          <el-table-column prop="carSystemName" label="车系" width="120" show-overflow-tooltip />
          <el-table-column prop="carsName" label="车组" width="120" show-overflow-tooltip />
          <el-table-column prop="modelName" label="车型" width="120" show-overflow-tooltip />
          <el-table-column prop="undrewRiskLevel" label="承保风险等级" width="120" show-overflow-tooltip />
          <el-table-column prop="payRiskLevel" label="赔付风险等级" width="120" show-overflow-tooltip />
          <el-table-column prop="accidentLevel" label="出险风险等级" width="120" show-overflow-tooltip />
          <!--  <el-table-column prop="activeType" label="出险率" width="120" show-overflow-tooltip />
          <el-table-column prop="activeType" label="出险率" width="120" show-overflow-tooltip />
          <el-table-column prop="activeType" label="出险率" width="120" show-overflow-tooltip />
          <el-table-column prop="activeType" label="出险率" width="120" show-overflow-tooltip />
          <el-table-column prop="activeType" label="出险率" width="120" show-overflow-tooltip />-->
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <!--              <el-button type="text" size="mini" @click="edit(scope.row)">禁用</el-button>-->
              <el-button type="text" size="mini" @click="edit(scope.row)">添加对比</el-button>
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
import { getRiskInfo, queryRiskLevelByPage, getBrandByFactory, brandRecurInfo } from '../../api/risk-level'
import { mapGetters } from 'vuex'

export default {
  name: 'RiskLevelIndex',
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
      brandForbidden: true,
      carSystemForbidden: true,
      carsForbidden: true,
      modelForbidden: true,
      insurerCodeList: [],
      menuId: '13',
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
      getRiskInfo(param).then(res => {
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
    /* brandRecur(superId) {
      var list = []
      // 联级查询的接口
      brandRecurInfo(superId).then(res => {
        list = res
      })
      return list
    },*/
    queryData() {
      var param = {
        // globalUserCode: this.userCode,
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
        menuId: this.menuId
        // modelId: this.queryForm.modelId,
        // modelId: this.queryForm.modelId,
      }
      queryRiskLevelByPage(param).then(res => {
        if (res.state === '0000') {
          if (res.content && res.content.length > 0) {
            for (let i = 0; i < res.content.length; i++) {
              res.content[i].sourceType = 'A'
              res.content[i].sourceTypeName = '目标车型'
            }
          }
          this.pageInfo = res.content
          this.total = res.totalCount
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    edit(item) {
      this.$router.push({
        name: 'RiskLevelEdit',
        query: {
          // editType: 'EDIT',
          info: item
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
      this.queryForm = {}
      this.brandForbidden = true
      this.carSystemForbidden = true
      this.carsForbidden = true
      this.modelForbidden = true
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
