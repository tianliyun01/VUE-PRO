<template>
  <div style="margin-top: -30px;height: 500px;overflow-y: scroll;">
    <div class="Notice">
      <el-tabs v-model="activeName" class="customcard">
        <el-tab-pane label="车型" name="first">
          <el-form size="mini" label-position="right" label-width="108px" class="pdt-18">
            <el-row class="row-bg" justify="space-around">
              <el-col :span="8">
                <el-form-item label="品牌">
                  <!-- <el-select
                    v-model="rowInfo.brandName"
                    class="quick-select"
                    placeholder="请选择"
                    filterable
                    clearable
                    style="width: 100%"
                    value-key="productCode"
                  >
                    <el-option v-for="item in regionList" :key="item.id" :label="item.regionName" :value="item.id" />
                  </el-select>-->
                  <el-tooltip class="item" effect="dark" :content="rowInfo.brandName" placement="top-start">
                    <el-input v-model="rowInfo.brandName" :disabled="true" />
                  </el-tooltip>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车系">
                  <el-tooltip class="item" effect="dark" :content="rowInfo.carSystemName" placement="top-start">
                    <el-input v-model="rowInfo.carSystemName" :disabled="true" />
                  </el-tooltip>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车系代码">
                  <el-tooltip class="item" effect="dark" :content="rowInfo.carSystemEncode" placement="top-start">
                    <el-input v-model="rowInfo.carSystemEncode" :disabled="true" />
                  </el-tooltip>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车组">
                  <el-tooltip class="item" effect="dark" :content="rowInfo.carsName" placement="top-start">
                    <el-input v-model="rowInfo.carsName" :disabled="true" />
                  </el-tooltip>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车型">
                  <el-tooltip class="item" effect="dark" :content="rowInfo.modelName" placement="top-start">
                    <el-input v-model="rowInfo.modelName" :disabled="true" />
                  </el-tooltip>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="车型代码">
                  <el-tooltip class="item" effect="dark" :content="rowInfo.modelEncode" placement="top-start">
                    <el-input v-model="rowInfo.modelEncode" :disabled="true" />
                  </el-tooltip>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="CIRI案均">
                  <el-input v-model="rowInfo.estimateAvgIndemnity" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="当前案均赔款">
                  <el-input v-model="rowInfo.curAvgAmount" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="历史案均赔款">
                  <el-input v-model="rowInfo.hisAvgAmount" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="预计当前案均可降金额">
                  <el-input v-model="rowInfo.reduceCurAmount" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="预计历史案均可降金额">
                  <el-input v-model="rowInfo.reduceHisAmount" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="预计当前案均增长金额">
                  <el-input v-model="rowInfo.increaseCurAmount" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="预计历史案均增长金额">
                  <el-input v-model="rowInfo.increaseHisAmount" :disabled="true" />
                </el-form-item>
              </el-col>
            </el-row>
            <!--<el-row class="row-bg" justify="space-around">
              <el-col :span="8">
                <el-form-item label="车组">
                  <el-input v-model="rowInfo.carsName" :disabled="true"></el-input>
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
            </el-row>-->
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="Notice">
      <el-tabs v-model="activeName" class="customcard">
        <el-tab-pane label="维修明细" name="first">
          <el-form size="mini" label-position="right" label-width="108px" class="pdt-18">
            <el-row class="row-bg" justify="space-around">
              <el-divider content-position="left">保险杠全宽碰撞</el-divider>
              <el-col :span="8">
                <el-form-item label="前端维修费用">
                  <el-input v-model="repairInfo.repairInfoDtoList[0].fRepairFee" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="前端配件费用">
                  <el-input v-model="repairInfo.repairInfoDtoList[0].fOtherFee" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="前端拆装工时">
                  <el-input v-model="repairInfo.repairInfoDtoList[0].fDismountHour" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="前端钣金工时">
                  <el-input v-model="repairInfo.repairInfoDtoList[0].fMetalpHour" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="前端喷漆工时">
                  <el-input v-model="repairInfo.repairInfoDtoList[0].fSpraypHour" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="后端维修费用">
                  <el-input v-model="repairInfo.repairInfoDtoList[0].bRepairFee" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="后端配件费用">
                  <el-input v-model="repairInfo.repairInfoDtoList[0].bPartsFee" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="后端拆装工时">
                  <el-input v-model="repairInfo.repairInfoDtoList[0].bDismountHour" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="后端钣金工时">
                  <el-input v-model="repairInfo.repairInfoDtoList[0].bMetalpHour" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="后端喷漆工时">
                  <el-input v-model="repairInfo.repairInfoDtoList[0].bSpraypHour" :disabled="true" />
                </el-form-item>
              </el-col>
              <!-- <el-col :span="8">
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
              </el-col>-->
              <el-divider content-position="left">结构碰撞</el-divider>
              <el-col :span="8">
                <el-form-item label="前端维修费用">
                  <el-input v-model="repairInfo.repairInfoDtoList[1].fRepairFee" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="前端配件费用">
                  <el-input v-model="repairInfo.repairInfoDtoList[1].fOtherFee" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="前端拆装工时">
                  <el-input v-model="repairInfo.repairInfoDtoList[1].fDismountHour" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="前端钣金工时">
                  <el-input v-model="repairInfo.repairInfoDtoList[1].fMetalpHour" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="前端喷漆工时">
                  <el-input v-model="repairInfo.repairInfoDtoList[1].fSpraypHour" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="后端维修费用">
                  <el-input v-model="repairInfo.repairInfoDtoList[1].bRepairFee" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="后端配件费用">
                  <el-input v-model="repairInfo.repairInfoDtoList[1].bPartsFee" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="后端拆装工时">
                  <el-input v-model="repairInfo.repairInfoDtoList[1].bDismountHour" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="后端钣金工时">
                  <el-input v-model="repairInfo.repairInfoDtoList[1].bMetalpHour" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="后端喷漆工时">
                  <el-input v-model="repairInfo.repairInfoDtoList[1].bSpraypHour" :disabled="true" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="Notice">
      <el-tabs v-model="activeName" class="customcard">
        <el-tab-pane label="零配件明细" name="first">
          <el-form size="mini" label-position="right" label-width="108px" class="pdt-18">
            <el-row class="row-bg" justify="space-around">
              <el-col v-for="(item,index) in repairInfo.repairPartDtoList" :key="index" :span="8">
                <el-form-item :label="item.codeCname">
                  <el-input
                    v-model="item.value"
                    placeholder="请输入"
                    clearable
                    style="width: 100%"
                    :disabled="true"
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
  props: {
    repairInfo: {
      type: Object,
      default: function() {
        return {
          repairInfoDtoList: [],
          repairPartDtoList: []
        }
      }
    },
    rowInfo: {
      type: Object,
      default: function() {
        return {

        }
      }
    }
  },
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
    changepage() {}
  }
}
</script>
<style lang="scss" >
.el-divider--horizontal{
  margin-top: 0;
}
</style>
