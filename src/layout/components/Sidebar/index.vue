<template>
  <div :class="{'has-logo':showLogo}">
    <!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
    <div class="sidebar-logo-container" :class="{'collapse':isCollapse}">
      <transition name="sidebarLogoFade">
        <h1 class="sidebar-title" :title="systemInfo.systemName" @click="drawer = true">{{ systemInfo.systemName }} </h1>
        <!-- <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
          <img v-if="logo" :src="logo" class="sidebar-logo">
          <h1 v-else class="sidebar-title">{{ title }} </h1>
        </router-link>
        <router-link v-else key="expand" class="sidebar-logo-link" to="/">
          <img v-if="logo" :src="logo" class="sidebar-logo">
          <h1 class="sidebar-title">{{ title }} </h1>
        </router-link> -->
      </transition>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <menu-tree :menu-data="menuList" :menu-index="1" @jump="jump" />
      </el-menu>
    </el-scrollbar>
    <el-drawer
      :visible.sync="drawer"
      :append-to-body="true"
      direction="ltr"
      :with-header="false"
      size="300px"
    >
      <div class="nav-menu">
        <div class="menu-header clearfix">
          <div class="menu-h1 fl">平台系统库</div>
          <div class="menu-other fl">
            当前: {{ systemInfo.systemName }}
          </div>
        </div>
        <div class="menu-content-left fl">
          <div class="menu-left-content">
            <div v-for="(item,index) in syetemList" :key="index" :class="{'colororg':item.systemName == systemInfo.systemName}" class="left-group-item" @click="handleSystem(item)">{{ item.systemName }}</div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { functionPermission, getUserCodeTreeMenu } from '../../../api/system'
// import Logo from './Logo'
import MenuTree from './MenuTree'
import variables from '@/styles/variables.scss'

export default {
  components: { MenuTree },
  data() {
    return {
      drawer: false,
      systemInfo: {},
      syetemList: [],
      menuList: [
        // {
        //   menuName: '菜单管理',
        //   menuIcon: 'documentation',
        //   menmenuUUrl: '/menu-manage/index'
        // },
        // {
        //   menuName: '用户管理',
        //   menuIcon: 'documentation',
        //   menuUrl: '/user/index'
        // },
        // {
        //   menuName: '权限管理',
        //   menuIcon: 'documentation',
        //   menuUrl: '/permission/index'
        // },
        // {
        //   menuName: '角色管理',
        //   menuIcon: 'documentation',
        //   menuUrl: '/role/index'
        // },
        // {
        //   menuName: '车型风险级别查询',
        //   menuIcon: 'documentation',
        //   menuUrl: '/risk-level/index'
        // },
        // {
        //   menuName: '风险保费查询及自定义计算',
        //   menuIcon: 'documentation',
        //   menuUrl: '/risk-premium/index'
        // },
        // {
        //   menuName: '标准赔付查询',
        //   menuIcon: 'documentation',
        //   menuList: [
        //     {
        //       menuName: '车型当前赔付情况分析',
        //       menuIcon: 'documentation',
        //       menuUrl: '/compensation/index'
        //     },
        //     {
        //       menuName: '车险扭亏分析',
        //       menuIcon: 'documentation',
        //       menuUrl: '/cartype-compensation/index'
        //     },
        //     {
        //       menuName: '车损险各车型保费建议',
        //       menuIcon: 'documentation',
        //       menuUrl: '/vehicle-proposal/index'
        //     }
        //
        //   ]
        // },
        // {
        //   menuName: '维修工时数据查询',
        //   menuIcon: 'documentation',
        //   menuUrl: '/repair-hours/index'
        // }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'userCode',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created() {
    this.queryMenu()
  },
  methods: {
    queryMenu() {
      getUserCodeTreeMenu({ userCode: this.userCode }).then(_data => {
        this.menuList = _data.menuTreeDtoList
      })
    },
    handleSystem(item) {
      this.systemInfo = item
      this.drawer = false
      this.menuQuery()
    },
    menuQuery() {
      console.log(this.systemInfo)
      functionPermission({ systemCode: this.systemInfo.systemCode }).then(_data => {
        this.menuList = _data[this.systemInfo.systemCode]
      })
      getUserCodeTreeMenu()
    },
    jump(e) {
      // 统计菜单
      this.$router.push({ path: e.menuUrl, query: { menuId: e.id }})
      this.$store.commit('user/SET_MENUID', e.id)
    }
  }
}
</script>
<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
.sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
   .menu-header {
    border-bottom: 1px solid #4F89DD;
    line-height: 30px;
    padding: 6px 10px;
    .menu-h1 {
      font-size: 16px;
      font-weight: bold;
      color: #303133;
      margin-right: 10px;
    }
    .menu-other {
      font-size: 14px;
      color: #909399;
      height:14px;
      line-height:14px;
      padding-left: 10px;
      margin-top: 8px;
      border-left: 1px solid #DCDFE6;
    }

  }
  .menu-content-left {
    width: 300px;
    height: 100vh;
    padding: 0;
  }
  .menu-left-content {
      line-height: 28px;
      .left-group-item {
        &:hover {
          background-color: #F5F7FA;
          color: #228BF0;
        }
      }
    }
    .left-group-item {
      cursor: pointer;
      padding:0 20px;
      line-height: 40px;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #303133;
      overflow: hidden;
    }
    .colororg {
    color: #228bf0;
  }
</style>
