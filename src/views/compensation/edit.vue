<template>
  <div class="app-container">
    <div class="Notice">
      <!--      <el-button class="query-header-btn" style="position: absolute;right: 90px;z-index: 200;" size="mini" type="primary" plain @click="add">添加</el-button>-->
      <el-button class="query-header-btn" style="position: absolute;right: 20px;z-index: 200;" size="mini" type="primary" plain @click="calculate">计算</el-button>
      <el-tabs v-model="activeName" class="customcard">
        <el-tab-pane label="对比列表" name="first">
          <el-table :data="compareList" style="width: 100%">
            <el-table-column type="index" align="center" label="序号" width="100" />
            <el-table-column prop="sourceTypeName" label="结果类型" width="100" show-overflow-tooltip />
            <!--<el-table-column prop="sourceTypeName" align="center" label="结果类型" min-width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.sourceTypeName" :disabled="true" />
              </template>
            </el-table-column>-->
            <!--   <el-table-column prop="factoryName" label="厂商" min-width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.factoryName" disabled="true"></el-input>
              </template>
            </el-table-column>-->
            <el-table-column prop="brandName" align="center" label="品牌" width="180" show-overflow-tooltip />
            <!--<el-table-column prop="brandName" align="center" label="品牌" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.brandName" placement="top-start">
                  <el-input v-model="scope.row.brandName" :disabled="true" />
                </el-tooltip>
              </template>
            </el-table-column>-->
            <el-table-column prop="carSystemName" align="center" label="车系" width="180" show-overflow-tooltip />
            <!--<el-table-column prop="carSystemName" align="center" label="车系" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.carSystemName" placement="top-start">
                  <el-input v-model="scope.row.carSystemName" :disabled="true" />
                </el-tooltip>
              </template>
            </el-table-column>-->
            <el-table-column prop="carsName" align="center" label="车组" width="180" show-overflow-tooltip />
            <!--<el-table-column prop="carsName" align="center" label="车组" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.carsName" placement="top-start">
                  <el-input v-model="scope.row.carsName" :disabled="true" />
                </el-tooltip>
              </template>
            </el-table-column>-->
            <el-table-column prop="modelName" align="center" label="车型" width="180" show-overflow-tooltip />
            <!--<el-table-column prop="modelName" align="center" label="车型" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.modelName" placement="top-start">
                  <el-input v-model="scope.row.modelName" :disabled="true" />
                </el-tooltip>
              </template>
            </el-table-column>-->
            <el-table-column prop="estimateAvgIndemnity" align="center" label="CIRI案均" width="180" show-overflow-tooltip />
            <!--<el-table-column prop="estimateAvgIndemnity" align="center" label="CIRI案均" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.estimateAvgIndemnity" :disabled="true" />
              </template>
            </el-table-column>-->
            <el-table-column prop="estimateAvgIndemnity" align="center" label="当前案均赔款" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.curAvgAmount" placeholder="请输入" />
              </template>
            </el-table-column>
            <el-table-column prop="estimateAvgIndemnity" align="center" label="历史案均赔款" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.hisAvgAmount" placeholder="请输入" />
              </template>
            </el-table-column>
            <el-table-column type="reduceCurAmount" align="center" label="预计当前案均可降金额" width="180" show-overflow-tooltip />
            <!--<el-table-column prop="reduceCurAmount" align="center" label="预计当前案均可降金额" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.reduceCurAmount" :disabled="true" />
              </template>
            </el-table-column>-->
            <el-table-column prop="reduceHisAmount" align="center" label="预计历史案均可降金额" width="180" show-overflow-tooltip />
            <!--<el-table-column prop="reduceHisAmount" align="center" label="预计历史案均可降金额" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.reduceHisAmount" :disabled="true" />
              </template>
            </el-table-column>-->
            <el-table-column prop="increaseCurAmount" align="center" label="预计当前案均增长金额" width="180" show-overflow-tooltip />
            <!--<el-table-column prop="increaseCurAmount" align="center" label="预计当前案均增长金额" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.increaseCurAmount" :disabled="true" />
              </template>
            </el-table-column>-->
            <el-table-column prop="increaseHisAmount" align="center" label="预计历史案均增长金额" width="180" show-overflow-tooltip />
            <!--<el-table-column prop="increaseHisAmount" align="center" label="预计历史案均增长金额" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.increaseHisAmount" :disabled="true" />
              </template>
            </el-table-column>-->
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
                <el-button type="text" size="mini" @click="showInfo(scope.row)">查看</el-button>
                <el-button type="text" :disabled="scope.row.sourceType==='A'" size="mini" @click="delRow(scope.$index)">删除</el-button>
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
                @change="changeSelect"
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
          <el-table-column type="index" label="序号" width="120" align="center" />
          <el-table-column prop="brandName" label="品牌" width="200" align="center" />
          <el-table-column prop="carSystemName" label="车系" width="200" show-overflow-tooltip align="center" />
          <el-table-column prop="carSystemEncode" label="车系代码" width="200" show-overflow-tooltip align="center" />
          <el-table-column prop="carsName" label="车组" width="200" show-overflow-tooltip align="center" />
          <el-table-column prop="modelName" label="车型" width="200" show-overflow-tooltip align="center" />
          <el-table-column prop="modelEncode" label="车型代码" width="120" show-overflow-tooltip align="center" />
          <el-table-column prop="estimateAvgIndemnity" label="CIRI案均" width="120" show-overflow-tooltip align="center" />
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
  initData,
  queryRepairInfo,
  calculatePay,
  getBrandByFactory,
  brandRecurInfo,
  queryPayByPage
} from '../../api/compensation'
import CompensationDialog from '../../components/compensation-dialog'

export default {
  name: 'CompensationEdit',
  components: { CompensationDialog },
  data() {
    return {
      activeName: 'first',
      queryForm: {},
      repairInfo: {},
      rowInfo: {},
      menuId: '10',
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
      return JSON.parse(this.$route.query.info)
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
    showInfo(row) {
      this.rowInfo = row
      this.queryRepairInfo(row)
    },
    queryRepairInfo(rowInfo) {
      var params = {
        repairId: rowInfo.repairId,
        sortYear: rowInfo.sortYear
      }
      queryRepairInfo(params).then(res => {
        if (res.state === '0000') {
          this.repairInfo = res
          this.repairInfo.repairPartDtoList.forEach(item => {
            if (item.partUnit === '1') {
              item.value = item.fee
            } else if (item.partUnit === '2') {
              item.value = item.workHour
            }
          })
          this.dialogVisible = true
        }
      })
    },
    calculate() {
      calculatePay(this.compareList).then(res => {
        if (res.state === '0000') {
          this.compareList = res.standardPayDtoList ? res.standardPayDtoList : this.compareList
          this.compareList.filter(item => { item.sourceType === 'A' ? item.sourceTypeName = '目标车型' : item.sourceTypeName = '比较车型' })
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
      queryPayByPage(param).then(res => {
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
    },
    changeSelect() {
      this.$forceUpdate()
    }
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
    changepage() {}*/
  }
}
</script>
<style lang="scss" scoped>
</style>
