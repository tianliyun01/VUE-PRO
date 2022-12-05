<template>
  <div style="margin-top: -30px;height: 500px;overflow-y: scroll;">
    <div class="Notice">
      <el-tabs v-model="activeName" class="customcard">
        <el-tab-pane label="车型" name="first">
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
    </div>

    <div class="Notice">
      <el-tabs v-model="activeName" class="customcard">
        <el-tab-pane label="维修明细" name="first">
          <el-form size="mini" label-position="right" label-width="108px" class="pdt-18">
            <el-row class="row-bg" justify="space-around">
              <el-divider content-position="left">结构碰撞</el-divider>
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
              <el-divider content-position="left">保险杠圈宽碰撞</el-divider>
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
    </div>

    <div class="Notice">
      <el-tabs v-model="activeName" class="customcard">
        <el-tab-pane label="车型" name="first">
          <el-form size="mini" label-position="right" label-width="108px" class="pdt-18">
            <el-row class="row-bg" justify="space-around">
              <el-col v-for="item in 9" :key="item" :span="8">
                <el-form-item :label="'字段'+item">
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
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CompensationDia',
  components: {},
  data() {
    return {
      activeName: 'first',
      queryForm: {},
      pageSize: 15,
      currentPage: 1,
      total: 0
    }
  },
  computed: {
    ...mapGetters(['userName', 'userCode'])
  },
  created() {
  },
  methods: {
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
