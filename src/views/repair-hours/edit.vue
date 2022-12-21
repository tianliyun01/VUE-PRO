<template>
  <div class="app-container" style="overflow-y: auto;height:calc(100vh - 78px)">
    <div class="Notice">
      <el-tabs v-model="activeName" class="customcard">
        <div class="query-header clearfix">
          <div class="header-title fl">喷漆设置</div>
        </div>
        <el-tab-pane label="维修工时数据查询" name="first">
          <el-form size="mini" label-position="right" label-width="108px" class="pdt-18">
            <el-row class="row-bg" justify="space-around">
              <el-col :span="8">
                <el-form-item label="漆料">
                  <el-select
                    v-model="queryForm.paintType"
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
                <el-form-item label="层数">
                  <el-select
                    v-model="queryForm.layers"
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
                <el-form-item label="低覆盖力">
                  <el-select
                    v-model="queryForm.isLowCoverage"
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
                <el-form-item label="调色">
                  <el-select
                    v-model="queryForm.toning"
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
                <el-form-item label="色板">
                  <el-select
                    v-model="queryForm.isColorPalette"
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
                <el-form-item label="抛光">
                  <el-select
                    v-model="queryForm.isPolishing"
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
                <el-form-item label="喷漆面数">
                  <el-select
                    v-model="queryForm.side"
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
                <el-form-item label="拆装工时单价">
                  <el-input
                    v-model="queryForm.dismountUnitPrice"
                    placeholder="请输入"
                    clearable
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="喷漆工时单价">
                  <el-input
                    v-model="queryForm.paintUnitPrice"
                    placeholder="请输入"
                    clearable
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="钣金工时单价">
                  <el-input
                    v-model="queryForm.metalUnitPrice"
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
          <el-table-column prop="riskName" label="更换或维修" min-width="200" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.pj"
                class="quick-select"
                placeholder="请选择"
                filterable
                clearable
                style="width: 100%"
                value-key="productCode"
              >
                <el-option v-for="item in spreadClassDtoList" :key="item.spreadCode" :label="item.spreadName" :value="item.spreadCode" />
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
          <el-table-column prop="riskName" label="损坏情况" min-width="200" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.damageCondition"
                class="quick-select"
                placeholder="请选择"
                filterable
                clearable
                style="width: 100%"
                value-key="productCode"
              >
                <el-option v-for="item in damageConditionList" :key="item.key" :label="item.value" :value="item.key" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="edit(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="query mgt-14">
      <div class="query-header clearfix">
        <div class="header-title fl">拆装配件</div>
        <el-button class="query-header-btn fr" size="mini" type="primary" plain @click="add">计算</el-button>
      </div>
      <el-form size="mini" label-position="right" label-width="0" class="pdt-18">
        <el-row class="row-bg" justify="space-around">
          <el-col :span="24">
            <el-form-item label="">
              <el-select
                v-model="type"
                class="quick-select"
                placeholder="请选择"
                filterable
                clearable
                multiple
                style="width: 100%"
                value-key="productCode"
              >
                <el-option v-for="item in spreadClassDtoList" :key="item.spreadCode" :label="item.spreadName" :value="item.spreadCode" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="选项" label-width="108px">
              <el-checkbox v-model="checked" />
              <el-radio-group v-model="radio" style="margin-left: 20px;">
                <el-radio :label="3">更换</el-radio>
                <el-radio :label="6">不更换</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="query mgt-14">
      <div class="query-header clearfix">
        <div class="header-title fl">工时计算</div>
      </div>
      <el-form size="mini" label-position="right" label-width="108px" class="pdt-18">
        <el-row class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="喷漆工时">
              <el-input
                v-model="comcodes"
                placeholder="请输入"
                clearable
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="钣金工时">
              <el-input
                v-model="comcodes"
                placeholder="请输入"
                clearable
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="拆装工时">
              <el-input
                v-model="comcodes"
                placeholder="请输入"
                clearable
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="query mgt-14">
      <div class="query-header clearfix">
        <div class="header-title fl">对比列表</div>
      </div>
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
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button :disabled="scope.row.sourceType==='A'" type="text" size="mini" @click="delRow(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </div>
  </div>
</template>
<script>
import { initData, getParts } from '../../api/repair-hours'
import { mapGetters } from 'vuex'

export default {
  name: 'RepairHoursIndex',
  components: {},
  data() {
    return {
      activeName: 'first',
      queryForm: {},
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
      partList: [],
      parts: [],
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
    // 查询列表
    queryData() {
      /* const param = {
        userCode: this.comcodes,
        userName: this.userName,
        riskcode: this.riskCode,
        spread: this.type,
        delMenuType: this.menuType,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }*/
      /* riskUserQueryListPage(param).then(res => {
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
      })*/
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
    },

    changepage() {}
  }
}
</script>
<style lang="scss" scoped>
</style>
