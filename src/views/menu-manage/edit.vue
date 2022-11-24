<template>
  <div class="app-container white customcard">
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="菜单管理" name="first">
          <div style="overflow-y: auto;height:calc(100vh - 195px)">
            <el-form ref="editForm" :model="editForm" :rules="rules" size="mini" label-position="right" label-width="108px" class="pdt-18">
              <el-row class="row-bg">
                <!-- <el-col :span="8">
                  <el-form-item label="所属系统" prop="menu_url">
                    <el-select
                      v-model="editForm.menu_url"
                      class="quick-select"
                      placeholder="请选择"
                      filterable
                      style="width: 100%"
                      value-key="productCode"
                    >
                      <el-option v-for="item in spreadClassDtoList" :key="item.spreadCode" :label="item.spreadName" :value="item.spreadCode" />
                    </el-select>
                  </el-form-item>
                </el-col> -->
                <el-col :span="8">
                  <el-form-item label="菜单级别" prop="level">
                    <el-select
                      v-model="editForm.level"
                      class="quick-select"
                      placeholder="请选择"
                      filterable
                      style="width: 100%"
                      value-key="productCode"
                    >
                      <el-option v-for="item in levels" :key="item.value" :label="item.lable" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="菜单状态" prop="isValidate">
                    <el-radio-group v-model="editForm.isValidate">
                      <el-radio label="1">启用</el-radio>
                      <el-radio label="0">禁用</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="父菜单" prop="parentId">
                    <el-select
                      v-model="editForm.parentId"
                      class="quick-select"
                      placeholder="请选择"
                      filterable
                      style="width: 100%"
                      value-key="productCode"
                    >
                      <el-option v-for="item in menuList" :key="item.id" :label="item.menuName" :value="item.id" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="菜单名称" prop="menuName">
                    <el-input
                      v-model="editForm.menuName"
                      placeholder="请输入"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="菜单URL" prop="menuUrl">
                    <el-input
                      v-model="editForm.menuUrl"
                      placeholder="请输入"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="row-bg" justify="space-around">
                <el-col :span="12">
                  <el-form-item label="描述" prop="description">
                    <el-input
                      v-model="editForm.description"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="请输入"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
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
import { getMenuInfo, saveOrUpdate } from '../../api/menu'
import { mapGetters } from 'vuex'
export default {
  name: 'MenuManageEdie',
  components: {},
  data() {
    return {
      activeName: 'first',
      editForm: {
        systemItem: '',
        systemClass: '',
        integrationMode: '',
        systemurl: ''
      },
      rules: {
        menuName: [{ required: true, message: '菜单名称不能为空', trigger: 'blur' }],
        menuUrl: [{ required: true, message: '菜单URL不能为空', trigger: 'blur' }],
        description: [{ required: true, message: '描述不能为空', trigger: 'blur' }],
        isValidate: [{ required: true, message: '菜单状态不能为空', trigger: 'blur' }],
        parentId: [{ required: true, message: '父菜单不能为空', trigger: 'blur' }],
        level: [{ required: true, message: '菜单级别不能为空', trigger: 'blur' }]
      },
      riskCodeList: [],
      menuList: [],
      menuTypeList: [],
      levels: [
        { lable: '一级菜单', value: '1' },
        { lable: '二级菜单', value: '2' },
        { lable: '三级菜单', value: '3' }
      ],
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
      getMenuInfo(param).then(res => {
        if (res.state === '0000') {
          this.editForm = res.menuDto
          this.menuList = res.menuList
        }
      })
    }
  },
  methods: {
    // 返回
    back() {
      this.$router.push('/menu-manage/index')
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
    copyItem(item, index) {
      const form = JSON.parse(JSON.stringify(item))
      form.userCode = ''
      form.userName = ''
      this.formList.splice(index + 1, 0, form)
    },
    // 确定
    save(item, index) {
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          saveOrUpdate(this.editForm).then(res => {
            if (res.data.length > 0) {
              this.$message.warning(this.formList[index].userCode + '已存在' + res.data.join(',') + '险种，不允许重复添加！')
              for (var item of res.data) {
                this.formList[index].riskCodeList.splice(this.formList[index].riskCodeList.indexOf(item), 1)
              }
            }
          })
        }
      })
    }
  }
}
</script>
