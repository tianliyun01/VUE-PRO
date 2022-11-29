<template>
  <div class="app-container white customcard">
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="权限管理" name="first">
          <div style="overflow-y: auto;height:calc(100vh - 195px)">
            <el-form ref="editForm" :model="editForm" :rules="rules" size="mini" label-position="right" label-width="108px" class="pdt-18">
              <el-row class="row-bg">
                <el-col :span="8">
                  <el-form-item label="人员代码" prop="userCode">
                    <el-input
                      v-model="editForm.userCode"
                      placeholder="请输入"
                      disabled
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="公司" prop="userCompany">
                    <el-select
                      v-model="editForm.userCompany"
                      class="quick-select"
                      placeholder="请选择"
                      filterable
                      clearable
                      disabled
                      style="width: 100%"
                      value-key="productCode"
                    >
                      <el-option v-for="item in spreadClassDtoList" :key="item.spreadCode" :label="item.spreadName" :value="item.spreadCode" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="姓名" prop="userName">
                    <el-input
                      v-model="editForm.userName"
                      placeholder="请输入"
                      clearable
                      disabled
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="英文名" prop="userEname">
                    <el-input
                      v-model="editForm.userEname"
                      placeholder="请输入"
                      clearable
                      disabled
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否启用" prop="validStatus">
                    <el-select
                      v-model="editForm.validStatus"
                      class="quick-select"
                      placeholder="请选择"
                      filterable
                      clearable
                      disabled
                      style="width: 100%"
                      value-key="productCode"
                    >
                      <el-option label="启用" value="1" />
                      <el-option label="禁用" value="0" />
                      <el-option v-for="item in spreadClassDtoList" :key="item.spreadCode" :label="item.spreadName" :value="item.spreadCode" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="手机号码" prop="phone">
                    <el-input
                      v-model="editForm.phone"
                      placeholder="请输入"
                      clearable
                      disabled
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="座机号码" prop="mobile">
                    <el-input
                      v-model="editForm.mobile"
                      placeholder="请输入"
                      clearable
                      disabled
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="邮箱" prop="email">
                    <el-input
                      v-model="editForm.email"
                      placeholder="请输入"
                      clearable
                      disabled
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="row-bg" justify="space-around">
                <div class="blockTitle" style="width:100%">
                  <span />
                  <div>角色设置</div>
                </div>
                <el-transfer
                  v-model="value"
                  :props="{
                    key: 'roleId',
                    label: 'name'
                  }"
                  :data="roleList"
                  :titles="['角色库', '现有角色']"
                />
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="edit-footer">
      <el-button type="primary" plain size="small" @click="back">返回上级</el-button>
      <el-button type="primary" size="small" @click="save">保存</el-button>
    </div>
  </div>
</template>
<script>
// import { riskUserEditPage, riskUserSaveOrUpdate, getUserInfo, queryRiskUser } from '../../api/user'
import { mapGetters } from 'vuex'
import { saveOrUpdate, queryPowerInfo } from '../../api/permission'
export default {
  name: 'PermissionEdie',
  components: {},
  data() {
    // const generateData = _ => {
    //   const data = [];
    //   // const roleList = this.roleList
    //   for (let i = data; i <= data.length; i++) {
    //     data.push({
    //       key: i,
    //       label: `备选项 ${i}`,
    //       disabled: i % 4 === 0
    //     })
    //   }
    //   return data
    // }
    return {
      activeName: 'first',
      editForm: {
        systemItem: '',
        systemClass: '',
        integrationMode: '',
        systemurl: ''
      },
      rules: {
        menu_name: [{ required: true, message: '菜单名称不能为空', trigger: 'blur' }],
        menu_url: [{ required: true, message: '菜单URL不能为空', trigger: 'blur' }]
      },
      riskCodeList: [],
      spreadClassDtoList: [],
      menuTypeList: [],
      data: [],
      value: [],
      roleList: [],
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
    if (this.editType === 'EDIT') {
      const param = {
        id: this.$route.query.id,
        editType: this.editType
      }
      queryPowerInfo(param).then(res => {
        if (res.state === '0000') {
          this.editForm = res.userDto
          this.roleList = res.roleList
          const roleIds = []
          for (const item of res.UserAuthorityList) {
            roleIds.push(item.roleId)
          }
          this.value = roleIds
        }
      })
    }
  },
  methods: {
    // 返回
    back() {
      this.$router.push('/permission/index')
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
    // blurUserCode(userCode, index) {
    //   getUserInfo({ userCode }).then(res => {
    //     if (res.code === 200) {
    //       this.formList[index].userName = res.data.userName
    //       this.comChange(this.formList[index])
    //     }
    //   }).catch(res => {
    //     this.formList[index].userName = ''
    //     this.formList[index].userCode = ''
    //   })
    // },
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
      this.$refs['editForm'].validate((valid) => {
        var params = {
          userId: this.editForm.id,
          roleIds: this.value
        }
        saveOrUpdate(params).then(res => {
          if (res.state === '0000') {
            this.$message.success(res.msg)
            this.$router.push('/permission/index')
          } else {
            this.$message.console.error(res.msg)
          }
        })
      })
    }
  }
}
</script>
