<template>
  <div class="app-container">
    <div class="Notice">
      <!--      <el-button class="query-header-btn" style="position: absolute;right: 90px;z-index: 200;" size="mini" type="primary" plain @click="add">添加</el-button>-->
      <el-tabs v-model="activeName" class="customcard">
        <el-tab-pane label="对比列表" name="first">
          <el-table :data="compareList" style="width: 100%">
            <el-table-column type="index" align="center" label="序号" width="100" />
            <el-table-column prop="sourceTypeName" align="center" label="结果类型" min-width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.sourceTypeName" :disabled="true" />
              </template>
            </el-table-column>
            <!--   <el-table-column prop="factoryName" label="厂商" min-width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.factoryName" disabled="true"></el-input>
              </template>
            </el-table-column>-->
            <el-table-column prop="regionName" align="center" label="地域" min-width="180" show-overflow-tooltip>
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
            </el-table-column>
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
            <el-table-column prop="payRiskLevel" align="center" label="赔付风险等级" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.payRiskLevel" :disabled="true" />
              </template>
            </el-table-column>
            <el-table-column prop="accidentLevel" align="center" label="出险风险等级" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.accidentLevel" :disabled="true" />
              </template>
            </el-table-column>
            <!--<el-table-column prop="riskName" label="品牌" min-width="100" show-overflow-tooltip>
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
            </el-table-column>-->
            <el-table-column fixed="right" label="操作" width="150">
              <template slot-scope="scope">
                <el-button :disabled="scope.row.sourceType==='A'" type="text" size="mini" @click="delRow(scope.$index)">删除</el-button>
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
        </el-row>
        <el-row size="mini" label-position="right" label-width="108px" style="padding-left: 82px;padding-bottom: 18px">
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
        </el-row>
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
        <el-table :data="pageInfoList" style="width: 100%" @selection-change="handleSelectionChange">>
          <el-table-column
            type="selection"
            width="55"
          />
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
    <!--弹窗-->
    <el-dialog :visible.sync="dialogVisible" title="查看">
      <compensation-dialog :repair-info="repairInfo" :row-info="rowInfo" />
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {
  queryRiskLevelByPage,
  getBrandByFactory,
  brandRecurInfo,
  getRiskInfo
} from '../../api/risk-level'

export default {
  name: 'RiskLevelEdit',
  components: { },
  data() {
    return {
      activeName: 'first',
      desForbidden: true,
      queryForm: {
        checked1: false,
        checked2: false,
        checked3: false
      },
      repairInfo: {},
      rowInfo: {},
      menuId: '13',
      pageInfoList: [],
      compareList: [],
      tableData: [{}],
      factoryList: [],
      brandList: [],
      carSystemList: [],
      carsList: [],
      modelList: [],
      multipleSelection: [],
      brandForbidden: true,
      carSystemForbidden: true,
      carsForbidden: true,
      modelForbidden: true,
      dialogVisible: false,
      pageSize: 15,
      currentPage: 1,
      total: 0
      /* cascaderConfig: {
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
      }*/
    }
  },
  computed: {
    ...mapGetters(['userName', 'userCode']),
    target() {
      return this.$route.query.info
    }
    /* getHeaders() {
      return this.tableData.reduce((pre, cur, index) => pre.concat(`value${index}`), ['title'])
    },
    getValues() {
      return this.headers.map(item => {
        return this.tableData.reduce((pre, cur, index) => Object.assign(pre, { ['value' + index]: cur[item.prop] }), { 'title': item.label })
      })
    }*/
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
      var desInfoArr = this.compareList.filter(item => item.sourceType === 'A')
      if (desInfoArr.length > 0) {
        var desInfo = desInfoArr[0]
        if (this.queryForm.checked1) {
          param.undrewRiskLevel = desInfo.undrewRiskLevel
        }
        if (this.queryForm.checked2) {
          param.payRiskLevel = desInfo.payRiskLevel
        }
        if (this.queryForm.checked3) {
          param.accidentLevel = desInfo.accidentLevel
        }
      }
      queryRiskLevelByPage(param).then(res => {
        if (res.state === '0000') {
          if (res.content && res.content.length > 0) {
            for (let i = 0; i < res.content.length; i++) {
              res.content[i].sourceType = 'B'
              res.content[i].sourceTypeName = '比较车型'
            }
          }
          this.pageInfoList = res.content
          this.total = res.totalCount
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
      this.queryForm = {
        checked1: false,
        checked2: false,
        checked3: false
      }
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
