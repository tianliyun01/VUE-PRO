<template>
  <div class="app-container" style="overflow-y: auto;height:calc(100vh - 78px)">
    <div class="Notice">
      <el-tabs v-model="activeName" class="customcard">
        <div class="query-header clearfix">
          <div class="header-title fl">喷漆设置</div>
        </div>
        <el-tab-pane label="维修工时数据查询" name="first">
          <el-form ref="paintForm" :model="paintForm" :rules="paintFormRules" size="mini" label-position="right" label-width="108px" class="pdt-18">
            <el-row class="row-bg" justify="space-around">
              <el-col :span="8">
                <el-form-item label="漆料" prop="paintType">
                  <el-select
                    v-model="paintForm.paintType"
                    class="quick-select"
                    placeholder="请选择"
                    filterable
                    clearable
                    style="width: 100%"
                    value-key="productCode"
                  >
                    <el-option v-for="item in paintTypeList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="层数" prop="layers">
                  <el-select
                    v-model="paintForm.layers"
                    class="quick-select"
                    placeholder="请选择"
                    filterable
                    clearable
                    style="width: 100%"
                    value-key="productCode"
                  >
                    <el-option v-for="item in layerList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="低覆盖力" prop="isLowCoverage">
                  <el-select
                    v-model="paintForm.isLowCoverage"
                    class="quick-select"
                    placeholder="请选择"
                    filterable
                    clearable
                    style="width: 100%"
                    value-key="productCode"
                  >
                    <el-option v-for="item in booleanList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="调色" prop="toning">
                  <el-select
                    v-model="paintForm.toning"
                    class="quick-select"
                    placeholder="请选择"
                    filterable
                    clearable
                    style="width: 100%"
                    value-key="productCode"
                  >
                    <el-option v-for="item in toningList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="色板" prop="isColorPalette">
                  <el-select
                    v-model="paintForm.isColorPalette"
                    class="quick-select"
                    placeholder="请选择"
                    filterable
                    clearable
                    style="width: 100%"
                    value-key="productCode"
                  >
                    <el-option v-for="item in booleanList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="抛光" prop="isPolishing">
                  <el-select
                    v-model="paintForm.isPolishing"
                    class="quick-select"
                    placeholder="请选择"
                    filterable
                    clearable
                    style="width: 100%"
                    value-key="productCode"
                  >
                    <el-option v-for="item in booleanList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="喷漆面数" prop="side">
                  <el-select
                    v-model="paintForm.side"
                    class="quick-select"
                    placeholder="请选择"
                    filterable
                    clearable
                    style="width: 100%"
                    value-key="productCode"
                  >
                    <el-option v-for="item in paintSideList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="拆装工时单价" prop="dismountUnitPrice">
                  <el-input
                    v-model="paintForm.dismountUnitPrice"
                    placeholder="请输入"
                    clearable
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="喷漆工时单价" prop="paintUnitPrice">
                  <el-input
                    v-model="paintForm.paintUnitPrice"
                    placeholder="请输入"
                    clearable
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="钣金工时单价" prop="metalUnitPrice">
                  <el-input
                    v-model="paintForm.metalUnitPrice"
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
        <!--<el-button size="small" type="primary" @click="currentPage=1,queryData()">查询</el-button>-->
      </div>
    </div>
    <div class="query mgt-14">
      <div class="query-header clearfix">
        <div class="header-title fl">配件列表</div>
        <el-button class="query-header-btn fr" size="mini" type="primary" plain @click="addPart">添加</el-button>
      </div>
      <div>
        <el-table :data="partList" style="width: 100%">
          <el-table-column type="index" label="序号" width="100" />
          <el-table-column prop="riskName" label="配件名称" min-width="200" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.partNo"
                class="quick-select"
                placeholder="请选择"
                filterable
                clearable
                style="width: 100%"
                value-key="productCode"
              >
                <el-option v-for="item in parts" :key="item.partNo" :label="item.partName" :value="item.partNo" />
              </el-select>
              <!--<el-input
                v-model="scope.row.partNo"
                placeholder="请选择"
                clearable
                style="width: 100%"
                ondblclick=""
              />-->
            </template>
          </el-table-column>
          <el-table-column prop="riskName" label="是否喷漆" min-width="200" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.isPaint"
                class="quick-select"
                placeholder="请选择"
                filterable
                clearable
                style="width: 100%"
                value-key="productCode"
              >
                <el-option v-for="item in booleanList" :key="item.key" :label="item.value" :value="item.key" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="riskName" label="喷漆损伤" min-width="200" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.paintDamage"
                class="quick-select"
                placeholder="请选择"
                filterable
                clearable
                style="width: 100%"
                value-key="productCode"
                :disabled="scope.row.isPaint==='0' || !scope.row.isPaint"
              >
                <el-option v-for="item in paintDamageList" :key="item.key" :label="item.value" :value="item.key" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="riskName" label="拆装或更换" min-width="200" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.laborProject"
                class="quick-select"
                placeholder="请选择"
                filterable
                clearable
                style="width: 100%"
                value-key="productCode"
              >
                <el-option v-for="item in laborProjectList" :key="item.key" :label="item.value" :value="item.key" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="riskName" label="材质" min-width="200" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.material"
                class="quick-select"
                placeholder="请选择"
                filterable
                clearable
                style="width: 100%"
                value-key="productCode"
              >
                <el-option v-for="item in materialList" :key="item.key" :label="item.value" :value="item.key" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="riskName" label="损伤位置" min-width="200" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.damageCode"
                class="quick-select"
                placeholder="请选择"
                filterable
                clearable
                style="width: 100%"
                value-key="productCode"
              >
                <el-option v-for="item in damagePartList" :key="item.key" :label="item.value" :value="item.key" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="riskName" label="损坏情况" min-width="200" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-select
                v-if="scope.row.material==='01'||scope.row.material==='02'"
                v-model="scope.row.damageCondition"
                class="quick-select"
                placeholder="请选择"
                filterable
                clearable
                style="width: 100%"
                value-key="productCode"
                :disabled="!scope.row.material"
              >
                <el-option v-for="item in metalList" :key="item.key" :label="item.value" :value="item.key" />
              </el-select>
              <el-select
                v-if="scope.row.material==='03'||scope.row.material==='04'"
                v-model="scope.row.damageCondition"
                class="quick-select"
                placeholder="请选择"
                filterable
                clearable
                style="width: 100%"
                value-key="productCode"
                :disabled="!scope.row.material"
              >
                <el-option v-for="item in nonmetalList" :key="item.key" :label="item.value" :value="item.key" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="delPart(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="query mgt-14">
      <div class="query-header clearfix">
        <div class="header-title fl">添加比较</div>
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
            <el-form-item label="车系代码">
              <el-input
                v-model="queryForm.carSystemEncode"
                placeholder="请输入"
                clearable
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="search-footer">
        <el-button size="small" type="primary" plain @click="resetQuery">重置</el-button>
        <el-button size="small" type="primary" @click="currentPage=1,queryData()">查询</el-button>
      </div>
    </div>

    <div class="query mgt-14" style="position: relative;">
      <div class="query-header clearfix">
        <div class="header-title fl">比较车组列表</div>
      </div>
      <el-button class="query-header-btn" style="position: absolute;right: 20px;z-index: 200;top: 0" size="mini" type="primary" plain @click="add">添加</el-button>
      <div>
        <el-table :data="pageInfoList" style="width: 100%" @selection-change="handleSelectionChange">>
          <el-table-column
            type="selection"
            width="120"
            align="center"
          />
          <el-table-column align="center" type="index" label="序号" width="180" />
          <el-table-column align="center" prop="factoryName" label="厂商" width="180" />
          <el-table-column align="center" prop="brandName" label="品牌" width="180" />
          <el-table-column align="center" prop="carSystemName" label="车系" width="180" show-overflow-tooltip />
          <el-table-column align="center" prop="carsName" label="车组" width="180" show-overflow-tooltip />
          <el-table-column align="center" prop="carSystemEncode" label="车系代码" width="180" show-overflow-tooltip />
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
    <div class="query mgt-14" style="position: relative;">
      <div class="query-header clearfix">
        <div class="header-title fl">对比列表</div>
      </div>
      <el-button class="query-header-btn" style="position: absolute;right: 20px;z-index: 200;top: 0" size="mini" type="primary" plain @click="calculate">计算</el-button>
      <div>
        <el-table :data="compareList" style="width: 100%">
          <el-table-column align="center" type="index" label="序号" width="100" />
          <el-table-column align="center" prop="sourceTypeName" label="结果来源" width="120" />
          <el-table-column align="center" prop="factoryName" label="厂商" width="120" show-overflow-tooltip />
          <el-table-column align="center" prop="brandName" label="品牌" width="120" show-overflow-tooltip />
          <el-table-column align="center" prop="carSystemName" label="车系" width="120" show-overflow-tooltip />
          <el-table-column align="center" prop="carsName" label="车组" width="120" show-overflow-tooltip />
          <el-table-column align="center" prop="carSystemEncode" label="车系代码" width="120" show-overflow-tooltip />
          <el-table-column align="center" prop="dismountHour" label="拆装工时" width="120" show-overflow-tooltip />
          <el-table-column align="center" prop="paintHour" label="喷漆工时" width="120" show-overflow-tooltip />
          <el-table-column align="center" prop="metalHour" label="钣金工时" width="120" show-overflow-tooltip />
          <el-table-column align="center" prop="dismountFee" label="拆装工时费用" width="120" show-overflow-tooltip />
          <el-table-column align="center" prop="paintFee" label="喷漆工时费用" width="120" show-overflow-tooltip />
          <el-table-column align="center" prop="metalFee" label="钣金工时费用" width="120" show-overflow-tooltip />
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button :disabled="scope.row.sourceType==='A'" type="text" size="mini" @click="delRow(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { initData, getParts, getBrandByFactory, brandRecurInfo, queryRepairByPage, calculateHour } from '../../api/repair-hours'
import { mapGetters } from 'vuex'

export default {
  name: 'RepairHoursIndex',
  components: {},
  data() {
    return {
      activeName: 'first',
      paintForm: {},
      factoryList: [],
      paintTypeList: [],
      layerList: [],
      booleanList: [],
      damagePartList: [],
      materialList: [],
      damageConditionList: [],
      compareList: [],
      toningList: [],
      paintSideList: [],
      paintDamageList: [],
      metalList: [],
      laborProjectList: [
        {
          key: '1',
          value: '拆装'
        },
        {
          key: '2',
          value: '更换'
        }
      ],
      nonmetalList: [],
      partList: [],
      parts: [],
      queryForm: {},
      brandList: [],
      carSystemList: [],
      carsList: [],
      brandForbidden: true,
      carSystemForbidden: true,
      carsForbidden: true,
      pageInfoList: [],
      multipleSelection: [],
      menuId: '16',
      pageSize: 15,
      currentPage: 1,
      total: 0,
      paintFormRules: {
        paintType: [{ required: true, message: '请选择漆料', trigger: 'change' }],
        layers: [{ required: true, message: '请选择层数', trigger: 'change' }],
        isLowCoverage: [{ required: true, message: '请选择是否低覆盖力', trigger: 'change' }],
        toning: [{ required: true, message: '请选择调色', trigger: 'change' }],
        isColorPalette: [{ required: true, message: '请选择是否需要色板', trigger: 'change' }],
        isPolishing: [{ required: true, message: '请选择是否抛光', trigger: 'change' }],
        side: [{ required: true, message: '请选择喷漆面数', trigger: 'change' }],
        dismountUnitPrice: [{ required: true, message: '请输入拆装工时单价', trigger: 'blur' }],
        paintUnitPrice: [{ required: true, message: '请输入喷漆工时单价', trigger: 'blur' }],
        metalUnitPrice: [{ required: true, message: '请输入钣金工时单价', trigger: 'blur' }]
        // userEname: [{ required: true, message: '人员英文名不能为空', trigger: 'blur' }],
      }
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
    this.getParts()
    this.compareList.push(this.target)
  },
  methods: {
    initData() {
      var param = { userCode: this.userCode }
      initData(param).then(res => {
        if (res.state === '0000') {
          this.factoryList = res.factoryList ? res.factoryList : []
          this.booleanList = res.booleanList ? res.booleanList : []
          this.paintTypeList = res.paintTypeList ? res.paintTypeList : []
          this.layerList = res.layerList ? res.layerList : []
          this.damagePartList = res.damagePartList ? res.damagePartList : []
          this.materialList = res.materialList ? res.materialList : []
          this.toningList = res.toningList ? res.toningList : []
          this.damageConditionList = res.damageConditionList ? res.damageConditionList : []
          this.paintSideList = res.paintSideList ? res.paintSideList : []
          this.paintDamageList = res.paintDamageList ? res.paintDamageList : []
          this.nonmetalList = res.nonmetalList ? res.nonmetalList : []
          this.metalList = res.metalList ? res.metalList : []
          // console.log(res)
        }
      })
    },
    getParts() {
      var param = { carsId: this.target.carsId }
      getParts(param).then(res => {
        if (res.state === '0000') {
          this.parts = res.partList
          // console.log(res)
        }
      })
    },
    addPart() {
      this.partList.push({})
    },
    delPart(index) {
      this.$confirm('确定删除该配件吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.partList.splice(index, 1)
      })
    },
    delRow(index) {
      this.$confirm('确定删除该车组吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.compareList.splice(index, 1)
      })
    },
    // 改变厂商
    changeFactory(factoryId) {
      this.brandList = []
      this.carSystemList = []
      this.carsList = []
      this.queryForm.brandId = null
      this.queryForm.carSystemId = null
      this.queryForm.carsId = null
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
      this.queryForm.carSystemId = null
      this.queryForm.carsId = null
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
      this.carsForbidden = false
      if (superId) {
        var param = { superId: superId }
        brandRecurInfo(param).then(res => {
          this.carsList = res
        })
      }
    },
    queryData() {
      var param = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        factoryId: this.queryForm.factoryId,
        brandId: this.queryForm.brandId,
        carSystemId: this.queryForm.carSystemId,
        carsId: this.queryForm.carsId,
        carSystemEncode: this.queryForm.carSystemEncode,
        modelEncode: this.queryForm.modelEncode,
        menuId: this.menuId
        // modelId: this.queryForm.modelId,
        // modelId: this.queryForm.modelId,
      }
      queryRepairByPage(param).then(res => {
        if (res.state === '0000') {
          if (res.content && res.content.length > 0) {
            for (let i = 0; i < res.content.length; i++) {
              res.content[i].sourceType = 'B'
              res.content[i].sourceTypeName = '比较车组'
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
      this.paintForm = {}
    },
    resetQuery() {
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
    // 计算
    calculate() {
      for (let i = 0; i < this.compareList.length; i++) {
        this.compareList[i].partsDtoList = this.partList
        this.compareList[i].paintType = this.paintForm.paintType
        this.compareList[i].layers = this.paintForm.layers
        this.compareList[i].isLowCoverage = this.paintForm.isLowCoverage
        this.compareList[i].toning = this.paintForm.toning
        this.compareList[i].isColorPalette = this.paintForm.isColorPalette
        this.compareList[i].isPolishing = this.paintForm.isPolishing
        this.compareList[i].side = this.paintForm.side
        this.compareList[i].dismountUnitPrice = this.paintForm.dismountUnitPrice
        this.compareList[i].paintUnitPrice = this.paintForm.paintUnitPrice
        this.compareList[i].metalUnitPrice = this.paintForm.metalUnitPrice
      }
      this.$refs['paintForm'].validate((valid) => {
        if (valid) {
          calculateHour(this.compareList).then(res => {
            if (res.state === '0000') {
              if (res.calculateDtoList && res.calculateDtoList.length > 0) {
                for (let i = 0; i < res.calculateDtoList.length; i++) {
                  if (res.calculateDtoList[i].sourceType === 'A') {
                    res.calculateDtoList[i].sourceTypeName = '目标车组'
                  } else {
                    res.calculateDtoList[i].sourceTypeName = '比较车组'
                  }
                }
              }
              this.compareList = res.calculateDtoList
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    changepage() {}
  }
}
</script>
<style lang="scss" scoped>
</style>
