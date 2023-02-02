<template>
  <div class="app-container">
    <div class="Notice">
      <el-tabs v-model="activeName" class="customcard">
        <el-tab-pane label="车型扭亏分析" name="first">
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
                    @change="changeDataType"
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

              <el-col v-if="queryForm.dataType>=1" :span="8">
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
              <el-col v-if="queryForm.dataType>=2" :span="8">
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
              <el-col v-if="queryForm.dataType>=3" :span="8">
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
        <!--<el-button class="query-header-btn fr" size="mini" type="primary" plain @click="add">添加</el-button>-->
      </div>
      <div>
        <el-table :data="pageInfo" style="width: 100%">
          <el-table-column type="index" label="序号" width="120" align="center" />
          <el-table-column prop="brandName" label="品牌" width="120" align="center" />
          <el-table-column prop="carSystemName" label="车系" width="120" show-overflow-tooltip align="center" />
          <el-table-column prop="carSystemEncode" label="车系代码" width="120" show-overflow-tooltip align="center" />
          <el-table-column prop="carsName" label="车组" width="120" show-overflow-tooltip align="center" />
          <el-table-column prop="modelName" label="车型" width="120" show-overflow-tooltip align="center" />
          <el-table-column prop="modelEncode" label="车型代码" width="120" show-overflow-tooltip align="center" />
          <el-table-column prop="estimateAvgIndemnity" label="CIRI案均赔款" width="120" show-overflow-tooltip align="center" />
          <el-table-column prop="accidentRate" label="CIRI出险率" width="120" show-overflow-tooltip align="center" />
          <!--  <el-table-column prop="activeType" label="出险率" width="120" show-overflow-tooltip />
          <el-table-column prop="activeType" label="出险率" width="120" show-overflow-tooltip />
          <el-table-column prop="activeType" label="出险率" width="120" show-overflow-tooltip />
          <el-table-column prop="activeType" label="出险率" width="120" show-overflow-tooltip />
          <el-table-column prop="activeType" label="出险率" width="120" show-overflow-tooltip />-->
          <el-table-column fixed="right" label="操作" width="150" align="center">
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
import { initData, queryLossByPage, getBrandByFactory, brandRecurInfo } from '../../api/cartype-compensation'
import { mapGetters } from 'vuex'

export default {
  name: 'CartypeCompensationIndex',
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
      // menuId: '11',
      pageInfo: [],
      loading: false,
      // acurl: '',
      pageSize: 15,
      currentPage: 1,
      total: 0,
      queryFormRules: {
        regionId: [{ required: true, message: '请选择区域', trigger: 'change' }],
        insurerCode: [{ required: true, message: '请选择保险公司', trigger: 'change' }]
        /* carType: [{ required: true, message: '请选择车辆类别', trigger: 'change' }],
        dataType: [{ required: true, message: '请选择数据维度', trigger: 'change' }],
        factoryId: [{ required: true, message: '请选择厂商', trigger: 'change' }],
        brandId: [{ required: true, message: '请选择品牌', trigger: 'change' }],
        carSystemId: [{ required: true, message: '请选择车系', trigger: 'change' }],
        carsId: [{ required: true, message: '请选择车组', trigger: 'change' }],
        modelId: [{ required: true, message: '请选择车型', trigger: 'change' }]*/
        // userEname: [{ required: true, message: '人员英文名不能为空', trigger: 'blur' }],
      }
    }
  },
  computed: {
    ...mapGetters(['userName', 'userCode', 'menuId'])
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
            // globalUserCode: this.userCode,
            pageNo: this.currentPage,
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
          queryLossByPage(param).then(res => {
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
        }
      })
    },
    edit(item) {
      this.$router.push({
        name: 'CartypeCompensationEdit',
        query: {
          // editType: 'EDIT',
          info: JSON.stringify(item),
          menuId: this.menuId,
          dataType: this.queryForm.dataType
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
    },
    changeSelect() {
      this.$forceUpdate()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
