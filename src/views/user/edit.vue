<template>
  <div class="app-container white customcard">
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户管理" name="first">
          <div style="overflow-y: auto;height:calc(100vh - 195px)">
            <el-form ref="editForm" :model="editForm" :rules="rules" size="mini" label-position="right" label-width="108px" class="pdt-18">
              <el-row class="row-bg">
                <el-col :span="8">
                  <el-form-item label="人员代码" prop="userCode">
                    <el-input
                      v-model="editForm.userCode"
                      placeholder="请输入"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="姓名" prop="userName">
                    <el-input
                      v-model="editForm.userName"
                      placeholder="请输入"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="editForm.sex">
                      <el-radio :label="3">男</el-radio>
                      <el-radio :label="6">女</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="公司" prop="userCompany">
                    <el-select
                      v-model="editForm.userCompany"
                      class="quick-select"
                      placeholder="请选择"
                      filterable
                      style="width: 100%"
                      value-key="productCode"
                    >
                      <el-option v-for="item in userCompany" :key="item.value" :label="item.lable" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="部门" prop="department">
                    <el-select
                      v-model="editForm.department"
                      class="quick-select"
                      placeholder="请选择"
                      filterable
                      style="width: 100%"
                      value-key="productCode"
                    >
                      <el-option v-for="item in department" :key="item.value" :label="item.lable" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="邮箱" prop="email">
                    <el-input
                      v-model="editForm.email"
                      placeholder="请输入"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="手机号码" prop="mobile">
                    <el-input
                      v-model="editForm.mobile"
                      placeholder="请输入"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="座机号码" prop="phone">
                    <el-input
                      v-model="editForm.phone"
                      placeholder="请输入"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="英文名" prop="userEname">
                    <el-input
                      v-model="editForm.userEname"
                      placeholder="请输入"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="有效期至" prop="endTime">
                    <el-date-picker
                      v-model="editForm.endTime"
                      type="date"
                      placeholder="选择日期"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="row-bg" justify="space-around">
                <div class="blockTitle" style="width:100%">
                  <span />
                  <div>数据权限</div>
                </div>
                <el-row class="row-bg" justify="space-around">
                  <el-col :span="8">
                    <el-form-item label="查询次数" prop="selectTimes">
                      <el-input-number v-model="editForm.selectTimes" controls-position="right" :min="1" :max="10" @change="handleChange" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="查询次数类型" prop="selectTimesType">
                      <el-select
                        v-model="editForm.selectTimesType"
                        class="quick-select"
                        placeholder="请选择"
                        filterable
                        style="width: 100%"
                        value-key="productCode"
                      >
                        <el-option v-for="item in selectTimesType" :key="item.value" :label="item.label" :value="item.value" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="row-bg" justify="space-around">
                  <el-col :span="8">
                    <el-form-item label="查询区域" prop="selectArea">
                      <el-select
                        v-model="type"
                        class="quick-select"
                        placeholder="请选择"
                        filterable
                        style="width: 100%"
                        value-key="productCode"
                      >
                        <el-option v-for="item in selectArea" :key="item.value" :label="item.label" :value="item.value" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="保险公司" prop="insuCompany">
                      <el-select
                        v-model="type"
                        class="quick-select"
                        placeholder="请选择"
                        filterable
                        style="width: 100%"
                        value-key="productCode"
                      >
                        <el-option v-for="item in insuCompany" :key="item.value" :label="item.label" :value="item.value" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div style="flex:1;" />
    <div class="edit-footer">
      <el-button type="primary" plain size="small" @click="back">返回上级</el-button>
      <el-button type="primary" size="small" @click="save">保存</el-button>
    </div>
  </div>
</template>
<script>
import { getUserInfo, saveOrUpdate } from '../../api/user'
import { mapGetters } from 'vuex'
export default {
  name: 'UserEdie',
  components: {},
  data() {
    return {
      activeName: 'first',
      editForm: {
        userCode: '',
        userName: '',
        sex: '',
        userCompany: '',
        department: '',
        email: '',
        mobile: '',
        phone: '',
        userEname: '',
        endTime: '',
        selectTimes: '',
        selectTimesType: ''
      },
      rules: {
        userCode: [{ required: true, message: '人员代码不能为空', trigger: 'blur' }],
        userName: [{ required: true, message: '人员名称不能为空', trigger: 'blur' }],
        userCompany: [{ required: true, message: '所属公司不能为空', trigger: 'blur' }],
        department: [{ required: true, message: '所属部门不能为空', trigger: 'blur' }],
        userEname: [{ required: true, message: '人员英文名不能为空', trigger: 'blur' }],
        endTime: [{ required: true, message: '权限截止时间不能为空', trigger: 'blur' }]
      },
      userCompany: [
        { lable: '中保研', value: '1' },
        { lable: '阳光保险', value: '2' },
        { lable: '国寿', value: '3' }
      ],
      selectTimesType: [
        { lable: '年', value: '1' },
        { lable: '月', value: '2' },
        { lable: '日', value: '3' }
      ],
      selectArea: [
        { lable: '北京', value: '1' },
        { lable: '河南', value: '2' },
        { lable: '山东', value: '3' }
      ],
      insuCompany: [
        { lable: '太平洋保险公司', value: '1' },
        { lable: '阳光保险公司', value: '2' },
        { lable: '国寿保险', value: '3' }
      ],
      department: [
        { lable: '客服部', value: '1' },
        { lable: '人事部', value: '2' },
        { lable: '技术部', value: '3' }
      ],
      riskCodeList: [],
      spreadClassDtoList: [],
      menuTypeList: [],
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
    // const param = {
    //   riskCode: this.$route.query.riskCode,
    //   userCode: this.$route.query.userCode,
    //   editType: this.editType
    // }
    // riskUserEditPage(param).then(res => {
    //   if (res.code === 200) {
    //     this.riskCodeList = res.data.riskMap.riskList
    //     this.spreadClassDtoList = res.data.spreadClassDtoList
    //     this.menuTypeList = res.data.menuTypeList
    //     this.activeType = res.data.activeType
    //     this.formList[0].activeType = res.data.activeType
    //     this.formList[0].createdBy = this.userInfo.userCode
    //     this.total = res.data.totalCount

    //     this.formList[0].userCode = res.data.portRiskUserVo.userCode
    //     this.formList[0].userName = res.data.portRiskUserVo.userName
    //     this.formList[0].riskCodeList.push(res.data.portRiskUserVo.riskCode)
    //     if (res.data.portRiskUserVo.spread) {
    //       for (var item of res.data.portRiskUserVo.spread.split(';')) {
    //         this.formList[0].spreadList.push(item)
    //       }
    //     }
    //     if (res.data.portRiskUserVo.delMenuType) {
    //       for (var _item of res.data.portRiskUserVo.delMenuType.split(';')) {
    //         this.formList[0].openMenuTypeList.push(_item)
    //       }
    //     }
    //   }
    // })
  },
  methods: {
    // 返回
    back() {
      this.$router.push('/user/index')
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
      saveOrUpdate({ userCode }).then(res => {
      })
    },
    // comChange(val) {
    //   console.log(val)
    //   if (val.userName && val.riskCodeList.length > 0 && (val.openMenuTypeList.length > 0 || val.spreadList.length > 0)) {
    //     queryRiskUser({ userCode: val.userCode, riskCodeCLassList: val.riskCodeList, openMenuTypeList: val.openMenuTypeList, spreadList: val.spreadList }).then(res => {
    //       if (res.data.length > 0) this.$message.warning(val.userCode + '已存在' + res.data.join(',') + '险种，不允许重复添加！')
    //       for (var item of res.data) {
    //         val.riskCodeList.splice(val.riskCodeList.indexOf(item), 1)
    //       }
    //     })
    //   }
    // },
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
          saveOrUpdate({ userCode: this.formList[index].userCode, riskCodeCLassList: this.formList[index].riskCodeList, openMenuTypeList: this.formList[index].openMenuTypeList, spreadList: this.formList[index].spreadList }).then(res => {
            if (res.data.length > 0) {
              this.$message.warning(this.formList[index].userCode + '已存在' + res.data.join(',') + '数据，不允许重复添加！')
              for (var item of res.data) {
                this.formList[index].riskCodeList.splice(this.formList[index].riskCodeList.indexOf(item), 1)
              }
            } else {
              const requestRiskUserDtoList = []
              requestRiskUserDtoList.push(this.formList[index])
              saveOrUpdate({ editType: this.editType, requestRiskUserDtoList: requestRiskUserDtoList }).then(res => {
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
