<template>
  <div class="app-container white customcard">
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="菜单管理" name="first">
          <div style="overflow-y: auto;height:calc(100vh - 195px)">
            <el-form ref="editForm" :model="editForm" :rules="rules" size="mini" label-position="right" label-width="108px" class="pdt-18">
              <el-row class="row-bg">
                <el-col :span="8">
                  <el-form-item label="菜单级别" prop="level">
                    <el-select
                      v-model="editForm.level"
                      class="quick-select"
                      placeholder="请选择"
                      filterable
                      style="width: 100%"
                      value-key="productCode"
                      @change="levelChange"
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
                  <el-form-item label="是否为菜单" prop="isAsMenu">
                    <el-radio-group v-model="editForm.isAsMenu">
                      <el-radio label="1">是</el-radio>
                      <el-radio label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col v-if="editForm.level==='2' || editForm.level==='3'" :span="8">
                  <el-form-item label="父菜单" prop="parentId">
                    <el-select
                      v-model="editForm.parentId"
                      class="quick-select"
                      placeholder="请选择"
                      filterable
                      style="width: 100%"
                      :disabled="parentIddisabled"
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
                      @blur="blurMenuName(editForm.menuName,$event)"
                    />
                  </el-form-item>
                </el-col>
                <el-col v-if="editForm.isAsMenu==='1'" :span="8">
                  <el-form-item label="菜单URL" prop="menuUrl">
                    <el-input
                      v-model="editForm.menuUrl"
                      placeholder="请输入"
                      :disabled="urlDisabled"
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
import { getMenuInfo, saveOrUpdate, getLevelInfo, isExisted } from '../../api/menu'
import { mapGetters } from 'vuex'
export default {
  name: 'MenuManageEdie',
  components: {},
  data() {
    return {
      activeName: 'first',
      parentIddisabled: true,
      editForm: {
      },
      rules: {
        menuName: [{ required: true, message: '菜单名称不能为空', trigger: 'blur' }],
        parentId: [{ required: true, message: '请选择父菜单', trigger: 'change' }],
        description: [{ required: true, message: '描述不能为空', trigger: 'blur' }],
        isValidate: [{ required: true, message: '请选择菜单状态', trigger: 'change' }],
        isAsMenu: [{ required: true, message: '请选择是否为菜单', trigger: 'change' }],
        menuUrl: [{ required: true, message: '菜单URL不能为空', trigger: 'blur' }],
        level: [{ required: true, message: '菜单级别不能为空', trigger: 'blur' }]
      },
      riskCodeList: [],
      menuList: [],
      urlDisabled: false,
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
  watch: {
    'editForm.isAsMenu'() {
      if (this.editForm.isAsMenu === '0') {
        this.urlDisabled = true
        this.editForm.menuUrl = ''
      } else {
        this.urlDisabled = false
      }
    }
  },
  created() {
    const param = {
      id: this.$route.query.id,
      editType: this.editType
    }
    getMenuInfo(param).then(res => {
      if (res.state === '0000') {
        this.menuList = res.menuList
        console.log(this.menuList)
        if (this.editType === 'EDIT') {
          this.editForm = res.menuDto
          this.editForm.oriMenuName = res.menuDto.menuName
        }
      }
    })
  },
  methods: {
    // 返回
    back() {
      this.$router.push('/menu-manage/index')
    },
    levelChange() {
      this.editForm.parentId = ''
      this.menuList = []
      if (this.editForm.level === '1') {
        this.parentIddisabled = true
      } else {
        this.parentIddisabled = false
        getLevelInfo({ level: this.editForm.level }).then(res => {
          if (res.state === '0000') {
            this.menuList = res.levelInfo
          }
        })
      }
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
    blurMenuName(menuName, event) {
      if (menuName) {
        var params = {
          menuName: menuName
        }
        if (this.editType === 'ADD') {
          isExisted(params).then(res => {
            if (res.isExisted === true) {
              this.$message.error('菜单名称已存在!')
              event.target.focus()
            }
          })
        } else if (this.editType === 'EDIT') {
          if (menuName && this.editForm.oriMenuName !== menuName) {
            isExisted(params).then(res => {
              if (res.isExisted === true) {
                this.$message.error('菜单名称已存在!')
                event.target.focus()
              }
            })
          }
        }
      }
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
          this.editForm.editType = this.editType
          saveOrUpdate(this.editForm).then(res => {
            if (res.state === '0000') {
              this.$message.success('保存成功')
              this.$router.push('/menu-manage/index')
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    }
  }
}
</script>
