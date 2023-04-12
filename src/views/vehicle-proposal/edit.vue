<template>
  <div class="app-container">
    <div class="Notice">
      <!--      <el-button class="query-header-btn" style="position: absolute;right: 90px;z-index: 200;" size="mini" type="primary" plain @click="add">添加</el-button>-->
      <el-button class="query-header-btn" style="position: absolute;right: 20px;z-index: 200;" size="mini" type="primary" plain @click="calculate">计算</el-button>
      <el-tabs v-model="activeName" class="customcard">
        <el-tab-pane label="对比列表" name="first">
          <el-table :data="compareList" style="width: 100%">
            <el-table-column type="index" align="center" label="序号" width="100" />
            <el-table-column prop="sourceTypeName" align="center" label="结果类型" min-width="100" show-overflow-tooltip />
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
            <el-table-column prop="brandName" align="center" label="品牌" min-width="180" show-overflow-tooltip />
            <!--<el-table-column prop="brandName" align="center" label="品牌" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.brandName" placement="top-start">
                  <el-input v-model="scope.row.brandName" :disabled="true" />
                </el-tooltip>
              </template>
            </el-table-column>-->
            <el-table-column prop="carSystemName" align="center" label="车系" min-width="180" show-overflow-tooltip />
            <!--<el-table-column prop="carSystemName" align="center" label="车系" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.carSystemName" placement="top-start">
                  <el-input v-model="scope.row.carSystemName" :disabled="true" />
                </el-tooltip>
              </template>
            </el-table-column>-->
            <el-table-column prop="carsName" align="center" label="车组" min-width="180" show-overflow-tooltip />
            <!--<el-table-column prop="carsName" align="center" label="车组" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.carsName" placement="top-start">
                  <el-input v-model="scope.row.carsName" :disabled="true" />
                </el-tooltip>
              </template>
            </el-table-column>-->
            <el-table-column prop="modelName" align="center" label="车型" min-width="180" show-overflow-tooltip />
            <!--<el-table-column prop="modelName" align="center" label="车型" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.modelName" placement="top-start">
                  <el-input v-model="scope.row.modelName" :disabled="true" />
                </el-tooltip>
              </template>
            </el-table-column>-->
            <!-- <el-table-column prop="estimateAvgIndemnity" align="center" label="CIRI案均" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.estimateAvgIndemnity" :disabled="true" />
              </template>
            </el-table-column>
            <el-table-column prop="estimateAvgIndemnity" align="center" label="CIRI出险率" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.accidentRate" :disabled="true" />
              </template>
            </el-table-column>
            <el-table-column prop="estimateAvgIndemnity" align="center" label="当前案均赔款" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.curAvgAmount" placeholder="请输入" />
              </template>
            </el-table-column>
            <el-table-column prop="estimateAvgIndemnity" align="center" label="当前出险率" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.curAccidentRate" placeholder="请输入" />
              </template>
            </el-table-column>
            <el-table-column prop="estimateAvgIndemnity" align="center" label="当前车均保费" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.curAvgPremium" placeholder="请输入" />
              </template>
            </el-table-column>-->
            <el-table-column prop="estimateAvgIndemnity" align="center" label="目标赔付率" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.curPayRate" placeholder="请输入" />
              </template>
            </el-table-column>
            <el-table-column prop="adjAvgAmount" align="center" label="建议车均保费" min-width="180" show-overflow-tooltip />
            <!--<el-table-column prop="adjAvgAmount" align="center" label="建议车均保费" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.adjAvgAmount" :disabled="true" />
              </template>
            </el-table-column>-->
            <el-table-column prop="estimateAvgIndemnity" align="center" label="目标案均赔款" min-width="180" show-overflow-tooltip />
            <!--<el-table-column prop="estimateAvgIndemnity" align="center" label="目标案均赔款" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.estimateAvgIndemnity" :disabled="true" />
              </template>
            </el-table-column>-->.
            <el-table-column prop="accidentRate" align="center" label="目标出险率" min-width="180" show-overflow-tooltip />
            <!-- <el-table-column prop="accidentRate" align="center" label="目标出险率" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.accidentRate" :disabled="true" />
              </template>
            </el-table-column>-->
            <el-table-column prop="ciriRiskPremium" align="center" label="目标赔付费用" min-width="180" show-overflow-tooltip />
            <!--<el-table-column prop="ciriRiskPremium" align="center" label="目标赔付费用" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-model="scope.row.ciriRiskPremium" :disabled="true" />
              </template>
            </el-table-column>-->
            <el-table-column fixed="right" label="操作" width="150">
              <template slot-scope="scope">
                <!--<el-button type="text" size="mini" @click="showInfo(scope.row)">查看</el-button>-->
                <el-button type="text" size="mini" :disabled="scope.row.sourceType==='A'" @click="delRow(scope.$index)">删除</el-button>
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
      <el-form ref="queryForm" :model="queryForm" :rules="queryFormRules" size="mini" label-position="right" label-width="108px" class="pdt-18">
        <el-row class="row-bg" justify="space-around">
          <!--<el-col :span="8">
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
          </el-col>-->
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
                @change="changeBrand(queryForm.brandId)"
              >
                <el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col v-if="dataType && dataType>=1" :span="8">
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
          <el-col v-if="dataType && dataType>=2" :span="8">
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
          <el-col v-if="dataType && dataType>=3" :span="8">
            <el-form-item label="年款" prop="yearParagraph">
              <el-select
                v-model="queryForm.yearParagraph"
                class="quick-select"
                placeholder="请选择"
                filterable
                clearable
                style="width: 100%"
                :disabled="modelForbidden"
              >
                <el-option v-for="item in yearParagraphList" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </el-col>
          <!--<el-col :span="8">
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
          </el-col>-->
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
          <el-table-column prop="brandName" label="品牌" min-width="200" align="center" />
          <el-table-column prop="carSystemName" label="车系" min-width="200" show-overflow-tooltip align="center" />
          <el-table-column prop="carSystemEncode" label="车系代码" min-width="200" show-overflow-tooltip align="center" />
          <el-table-column prop="carsName" label="车组" min-width="200" show-overflow-tooltip align="center" />
          <el-table-column prop="modelName" label="车型" min-width="200" show-overflow-tooltip align="center" />
          <el-table-column prop="modelEncode" label="车型代码" min-width="120" show-overflow-tooltip align="center" />
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
    <!--<el-dialog :visible.sync="dialogVisible" title="查看">
      <compensation-dialog :repair-info="repairInfo" :row-info="rowInfo" />
    </el-dialog>-->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {
  initData,
  getBrandByFactory,
  brandRecurInfo,
  queryLossByPage
} from '../../api/cartype-compensation'
import { queryYearParagraph } from '../../api/vehicle-proposal'
export default {
  name: 'CartypeCompensationEdit',
  components: { },
  data() {
    return {
      activeName: 'first',
      queryForm: {
        factoryId: null,
        brandId: null,
        carSystemId: null,
        carsId: null,
        yearParagraph: null
      },
      repairInfo: {},
      rowInfo: {},
      // menuId: '11',
      pageInfoList: [],
      compareList: [],
      tableData: [{}],
      factoryList: [],
      brandList: [],
      carSystemList: [],
      carsList: [],
      modelList: [],
      yearParagraphList: [],
      multipleSelection: [],
      brandForbidden: true,
      carSystemForbidden: true,
      carsForbidden: true,
      modelForbidden: true,
      dialogVisible: false,
      queryFormRules: {
        brandId: [{ required: true, message: '请选择品牌', trigger: 'change' }],
        carSystemId: [{ required: true, message: '请选择车系', trigger: 'change' }],
        carsId: [{ required: true, message: '请选择车组', trigger: 'change' }],
        yearParagraph: [{ required: true, message: '请选择年款', trigger: 'change' }]
      },
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
    },
    menuId() {
      return this.$route.query.menuId
    },
    dataType() {
      return this.$route.query.dataType
    }
  },
  created() {
    this.initData()
    this.queryBrand()
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
    // 计算方式：建议车均保费=CIRI风险保费/目标赔付率；
    // 目标案均赔款=CIRI案均；目标出险率=CIRI出险率；目标赔付费用=CIRI风险保费
    // CIRI案均(g),CIRI出险率(查询,e),目标赔付率(a),赔付费用(查询f)
    calculate() {
      // 手动输入：目标赔付率(a)
      // ciri风险保费(f=g*e)
      // 1.建议车均保费(计算):f/a,保留两位
      // 2.目标案均赔款(查询):g
      // 3.目标出险率(查询):e
      // 4.目标赔付费用(查询):f
      if (this.compareList.length > 0) {
        // this.compareList.forEach(item => {
        //   debugger
        //   // 目标赔付费用
        //   item.ciriRiskPremium = (Number(item.estimateAvgIndemnity) * Number(item.accidentRate)).toFixed(2)
        //   // 建议车均保费
        //   if (item.curPayRate && item.curPayRate + '' !== '0') {
        //     item.adjAvgAmount = (Number(item.ciriRiskPremium) / Number(item.curPayRate)).toFixed(2)
        //   } else {
        //     item.adjAvgAmount = null
        //   }
        // })
        for (const index in this.compareList) {
          // 目标赔付费用
          const item = this.compareList[index]
          item.ciriRiskPremium = (Number(item.estimateAvgIndemnity) * Number(item.accidentRate)).toFixed(2)
          // 建议车均保费
          if (item.curPayRate && item.curPayRate + '' !== '0') {
            item.adjAvgAmount = (Number(item.ciriRiskPremium) / Number(item.curPayRate)).toFixed(2)
          } else {
            item.adjAvgAmount = null
          }
          this.$set(this.compareList, index, item)
        }
        this.$message.success('计算成功!')
      }
      /* calculateLosses(this.compareList).then(res => {
        if (res.state === '0000') {
          this.compareList = res.standardPayDtoList ? res.standardPayDtoList : this.compareList
          this.compareList.filter(item => { item.sourceType === 'A' ? item.sourceTypeName = '目标车型' : item.sourceTypeName = '比较车型' })
        }
      })*/
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
    // 查询品牌
    queryBrand() {
      var param = { superId: null }
      brandRecurInfo(param).then(res => {
        this.brandList = res
      })
    },
    // 改变品牌
    changeBrand(superId) {
      this.carSystemList = []
      this.carsList = []
      this.yearParagraphList = []
      this.queryForm.carSystemId = null
      this.queryForm.carsId = null
      this.queryForm.yearParagraph = null
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
      this.yearParagraphList = []
      this.queryForm.carsId = null
      this.queryForm.yearParagraph = null
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
      this.yearParagraphList = []
      this.queryForm.yearParagraph = null
      this.modelForbidden = false
      if (superId) {
        var param = { carsId: superId }
        queryYearParagraph(param).then(res => {
          this.yearParagraphList = res.yearParagraphList
        })
      }
    },
    queryData() {
      this.$refs['queryForm'].validate((valid) => {
        if (valid) {
          var param = {
            // globalUserCode: this.userCode,
            pageNo: this.currentPage,
            pageSize: this.pageSize,
            regionId: this.queryForm.regionId,
            insurerCode: this.queryForm.insurerCode,
            carType: this.queryForm.carType,
            dataType: this.dataType,
            factoryId: this.queryForm.factoryId,
            brandId: this.queryForm.brandId,
            carSystemId: this.queryForm.carSystemId,
            carsId: this.queryForm.carsId,
            modelId: this.queryForm.modelId,
            carSystemEncode: this.queryForm.carSystemEncode,
            modelEncode: this.queryForm.modelEncode,
            yearParagraph: this.queryForm.yearParagraph,
            menuId: this.menuId
            // modelId: this.queryForm.modelId,
            // modelId: this.queryForm.modelId,
          }
          queryLossByPage(param).then(res => {
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
        factoryId: null,
        brandId: null,
        carSystemId: null,
        carsId: null,
        yearParagraph: null
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
        this.compareList.push(JSON.parse(JSON.stringify(item)))
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
