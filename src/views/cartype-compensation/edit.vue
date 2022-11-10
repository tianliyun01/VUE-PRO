<template>
  <div class="app-container white customcard">
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="车型当前赔付情况分析" name="first">
          <div style="overflow-y: auto;height:calc(100vh - 195px)">
            <el-form size="mini" label-position="right" label-width="108px" class="pdt-18">
              <el-row class="row-bg">
                <el-col :span="8">
                  <el-form-item label="地域">
                    <el-select
                      v-model="type"
                      class="quick-select"
                      placeholder="请选择"
                      filterable
                      clearable
                      style="width: 100%"
                      value-key="productCode"
                    >
                      <el-option v-for="item in spreadClassDtoList" :key="item.spreadCode" :label="item.spreadName" :value="item.spreadCode" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="公司">
                    <el-select
                      v-model="type"
                      class="quick-select"
                      placeholder="请选择"
                      filterable
                      clearable
                      style="width: 100%"
                      value-key="productCode"
                    >
                      <el-option v-for="item in spreadClassDtoList" :key="item.spreadCode" :label="item.spreadName" :value="item.spreadCode" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="车辆类型">
                    <el-select
                      v-model="type"
                      class="quick-select"
                      placeholder="请选择"
                      filterable
                      clearable
                      style="width: 100%"
                      value-key="productCode"
                    >
                      <el-option v-for="item in spreadClassDtoList" :key="item.spreadCode" :label="item.spreadName" :value="item.spreadCode" />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="维度">
                    <el-select
                      v-model="type"
                      class="quick-select"
                      placeholder="请选择"
                      filterable
                      clearable
                      style="width: 100%"
                      value-key="productCode"
                    >
                      <el-option v-for="item in spreadClassDtoList" :key="item.spreadCode" :label="item.spreadName" :value="item.spreadCode" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="车系">
                    <el-select
                      v-model="type"
                      class="quick-select"
                      placeholder="请选择"
                      filterable
                      clearable
                      style="width: 100%"
                      value-key="productCode"
                    >
                      <el-option v-for="item in spreadClassDtoList" :key="item.spreadCode" :label="item.spreadName" :value="item.spreadCode" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="车组">
                    <el-select
                      v-model="type"
                      class="quick-select"
                      placeholder="请选择"
                      filterable
                      clearable
                      style="width: 100%"
                      value-key="productCode"
                    >
                      <el-option v-for="item in spreadClassDtoList" :key="item.spreadCode" :label="item.spreadName" :value="item.spreadCode" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="车型">
                    <el-select
                      v-model="type"
                      class="quick-select"
                      placeholder="请选择"
                      filterable
                      clearable
                      style="width: 100%"
                      value-key="productCode"
                    >
                      <el-option v-for="item in spreadClassDtoList" :key="item.spreadCode" :label="item.spreadName" :value="item.spreadCode" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="车系代码">
                    <el-input
                      v-model="comcodes"
                      placeholder="请输入"
                      clearable
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="车型代码">
                    <el-input
                      v-model="comcodes"
                      placeholder="请输入"
                      clearable
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="品牌">
                    <el-select
                      v-model="type"
                      class="quick-select"
                      placeholder="请选择"
                      filterable
                      clearable
                      style="width: 100%"
                      value-key="productCode"
                    >
                      <el-option v-for="item in spreadClassDtoList" :key="item.spreadCode" :label="item.spreadName" :value="item.spreadCode" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="厂商">
                    <el-select
                      v-model="type"
                      class="quick-select"
                      placeholder="请选择"
                      filterable
                      clearable
                      style="width: 100%"
                      value-key="productCode"
                    >
                      <el-option v-for="item in spreadClassDtoList" :key="item.spreadCode" :label="item.spreadName" :value="item.spreadCode" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="row-bg" justify="space-around">
                <div class="blockTitle" style="width:100%">
                  <span />
                  <div>角色设置</div>
                </div>
                <el-transfer v-model="value" :data="data" />
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="edit-footer">
      <el-button type="primary" plain size="small" @click="back">返回上级</el-button>
      <el-button type="primary" size="small" @click="back">保存</el-button>
    </div>
  </div>
</template>
<script>
import { riskUserEditPage, riskUserSaveOrUpdate, getUserInfo, queryRiskUser } from '../../api/user'
import { mapGetters } from 'vuex'
export default {
  name: 'CartypeCompensationEdie',
  components: {},
  data() {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        })
      }
      return data
    }
    return {
      activeName: 'first',
      editForm: {
        systemItem: '',
        systemClass: '',
        integrationMode: '',
        systemurl: ''
      },
      riskCodeList: [],
      spreadClassDtoList: [],
      menuTypeList: [],
      data: generateData(),
      value: [1, 4],
      activeType: '',
      formList: [
        {
          activeType: '',
          userCode: '',
          userName: '',
          createdBy: '',
          riskCodeList: [],
          openMenuTypeList: [],
          spreadList: []
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    editType() {
      return this.$route.query.editType
    }
  },
  created() {
    const param = {
      riskCode: this.$route.query.riskCode,
      userCode: this.$route.query.userCode,
      editType: this.editType
    }
    riskUserEditPage(param).then(res => {
      if (res.code === 200) {
        this.riskCodeList = res.data.riskMap.riskList
        this.spreadClassDtoList = res.data.spreadClassDtoList
        this.menuTypeList = res.data.menuTypeList
        this.activeType = res.data.activeType
        this.formList[0].activeType = res.data.activeType
        this.formList[0].createdBy = this.userInfo.userCode
        this.total = res.data.totalCount

        this.formList[0].userCode = res.data.portRiskUserVo.userCode
        this.formList[0].userName = res.data.portRiskUserVo.userName
        this.formList[0].riskCodeList.push(res.data.portRiskUserVo.riskCode)
        if (res.data.portRiskUserVo.spread) {
          for (var item of res.data.portRiskUserVo.spread.split(';')) {
            this.formList[0].spreadList.push(item)
          }
        }
        if (res.data.portRiskUserVo.delMenuType) {
          for (var _item of res.data.portRiskUserVo.delMenuType.split(';')) {
            this.formList[0].openMenuTypeList.push(_item)
          }
        }
      }
    })
  },
  methods: {
    // 返回
    back() {
      this.$router.push('/product-user/index')
    },
    addForm() {
      this.formList.push({
        activeType: this.activeType,
        createdBy: this.userInfo.userCode,
        userCode: '',
        userName: '',
        riskCodeList: [],
        openMenuTypeList: [],
        spreadList: []
      })
    },
    deleteForm(index) {
      this.formList.splice(index, 1)
    },
    onInput() {
      console.log('onInput')
      this.$forceUpdate()
    },
    checkChange(index) {
      this.comChange(this.formList[index])
      if (this.formList[index].spreadList.length === 0) return
      const spreadList = this.formList[index].spreadList
      const checkSpread = this.spreadClassDtoList.filter(item => item.spreadCode === spreadList[spreadList.length - 1]) // 过滤选中类型item
      const checkSpreadMutexFlags = this.spreadClassDtoList.filter(item => item.mutexFlag === checkSpread[0].mutexFlag) // 过滤选中类型互斥list
      if (checkSpreadMutexFlags && checkSpreadMutexFlags.length > 1) { // 判断有互斥类型
        const checkSpreadNot = checkSpreadMutexFlags.filter(item => item.spreadCode !== checkSpread[checkSpread.length - 1].spreadCode) // 过滤选中类型互斥item
        const ind = spreadList.indexOf(checkSpreadNot[0].spreadCode)
        if (ind > -1) {
          spreadList.splice(ind, 1)
        }
      }
    },
    blurUserCode(userCode, index) {
      getUserInfo({ userCode }).then(res => {
        if (res.code === 200) {
          this.formList[index].userName = res.data.userName
          this.comChange(this.formList[index])
        }
      }).catch(res => {
        this.formList[index].userName = ''
        this.formList[index].userCode = ''
      })
    },
    comChange(val) {
      console.log(val)
      if (val.userName && val.riskCodeList.length > 0 && (val.openMenuTypeList.length > 0 || val.spreadList.length > 0)) {
        queryRiskUser({ userCode: val.userCode, riskCodeCLassList: val.riskCodeList, openMenuTypeList: val.openMenuTypeList, spreadList: val.spreadList }).then(res => {
          if (res.data.length > 0) this.$message.warning(val.userCode + '已存在' + res.data.join(',') + '险种，不允许重复添加！')
          for (var item of res.data) {
            val.riskCodeList.splice(val.riskCodeList.indexOf(item), 1)
          }
        })
      }
    },
    copyItem(item, index) {
      const form = JSON.parse(JSON.stringify(item))
      form.userCode = ''
      form.userName = ''
      this.formList.splice(index + 1, 0, form)
    },
    // 确定
    save(item, index) {
      this.$refs['editForm'][index].validate((valid) => {
        if (valid) {
          if (this.formList[index].spreadList.length === 0 && this.formList[index].openMenuTypeList.length === 0) {
            this.$message.warning('请至少配置一种类型')
            return
          }
          queryRiskUser({ userCode: this.formList[index].userCode, riskCodeCLassList: this.formList[index].riskCodeList, openMenuTypeList: this.formList[index].openMenuTypeList, spreadList: this.formList[index].spreadList }).then(res => {
            if (res.data.length > 0) {
              this.$message.warning(this.formList[index].userCode + '已存在' + res.data.join(',') + '险种，不允许重复添加！')
              for (var item of res.data) {
                this.formList[index].riskCodeList.splice(this.formList[index].riskCodeList.indexOf(item), 1)
              }
            } else {
              const requestRiskUserDtoList = []
              requestRiskUserDtoList.push(this.formList[index])
              riskUserSaveOrUpdate({ editType: this.editType, requestRiskUserDtoList: requestRiskUserDtoList }).then(res => {
                if (res.code === 200) {
                  this.$message.success('保存成功')
                  this.formList.splice(index, 1)
                }
              })
            }
          })
        }
      })
    }
  }
}
</script>
