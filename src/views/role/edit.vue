<template>
  <div class="app-container white customcard">
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <div style="overflow-y: auto;height:calc(100vh - 195px)">
            <el-form ref="listQuery" :model="listQuery" :rules="rules" size="mini" label-position="right" label-width="108px" class="pdt-18">
              <el-row class="row-bg">
                <el-col :span="8">
                  <el-form-item label="角色名称" prop="name">
                    <el-input
                      v-model="listQuery.name"
                      placeholder="请输入"
                      clearable
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="角色状态" prop="isValidate">
                    <el-radio-group v-model="listQuery.isValidate">
                      <el-radio label="1" value="1">启用</el-radio>
                      <el-radio label="0" value="0">禁用</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="描述" prop="des">
                    <el-input
                      v-model="listQuery.des"
                      placeholder="请输入"
                      type="textarea"
                      :rows="2"
                      style="width: 100%"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="row-bg" justify="space-around">
                <div class="blockTitle" style="width:100%">
                  <span />
                  <div>关联功能菜单</div>
                </div>
                <el-tree
                  ref="tree"
                  :data="treeDto"
                  style="margin:0 20px;"
                  show-checkbox
                  default-expand-all
                  node-key="id"
                  highlight-current
                  :props="defaultProps"
                  :default-checked-keys="checkedKeys"
                  @check="handleNodeClick"
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
import { saveOrUpdate, queryRoleInfo } from '../../api/role'
import { mapGetters } from 'vuex'
export default {
  name: 'RoleEdie',
  components: {},
  data() {
    return {
      listQuery: {
        name: '',
        isValidate: '',
        // roleId: "4",
        // roleId: this.$route.params.roleId,
        des: '',
        data: ''
      },
      rules: {
        name: [{ required: true, message: '人员代码不能为空', trigger: 'blur' }],
        isValidate: [{ required: true, message: '人员名称不能为空', trigger: 'blur' }]
      },
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
      treeDto: [],
      checkedKeys: [],
      defaultProps: {
        children: 'menuTreeDtoList',
        label: 'menuName'
      },
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
      roleId: this.$route.query.roleId,
      editType: this.editType
    }
    queryRoleInfo(param).then(res => {
      if (res.state === '0000') {
        // this.treeDto.push(res.menuTreeDto)
        this.treeDto = res.menuTreeDto
        if (this.editType === 'EDIT') {
          this.checkedKeys = res.roleDto.roleMenuIds
          this.listQuery = res.roleDto
        }
      }
    })
    // riskUserEditPage(param).then(res => {
    //   if (res.code === 200) {
    //     this.riskCodeList = res.data.riskMap.riskList
    //     this.spreadClassDtoList = res.data.spreadClassDtoList
    //     this.menuTypeList = res.data.menuTypeList
    //     this.activeType = res.data.activeType
    //     this.formList[0].activeType = res.data.activeType
    //     this.formList[0].createdBy = this.userInfo.userCode
    //     this.total = res.data.totalCount
    //
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
      this.$router.push('/role/index')
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
    handleNodeClick(data, nodes) {
      console.log(data, nodes.checkedNodes)
      // this.listQuery.roleMenuDtoList = nodes.checkedNodes.filter(i => i.isAsMenu === '1')
      this.listQuery.roleMenuDtoList = nodes.checkedNodes
    },
    // 确定
    save(item, index) {
      this.$refs['listQuery'].validate((valid) => {
        if (valid) {
          this.listQuery.editType = this.editType
          saveOrUpdate(this.listQuery).then(res => {
            if (res.state === '0000') {
              this.$message.success('保存成功')
              this.$router.push('/role/index')
            }
          })
        }
      })
    }
  }
}
</script>
