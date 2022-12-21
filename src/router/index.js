import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/menu',
    component: Layout,
    redirect: '/menu/index',
    alwaysShow: true,
    name: 'Menu',
    meta: { title: 'menu', icon: 'menu' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/menu/index'),
        name: 'MenuIndex',
        meta: { title: '菜单', keepAlive: true }
      }
    ]
  },
  {
    path: '/menu-manage',
    component: Layout,
    redirect: '/menu-manage/index',
    alwaysShow: true,
    name: 'MenuManage',
    meta: { title: 'MenuManage', icon: 'menu' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/menu-manage/index'),
        name: 'MenuManageIndex',
        meta: { title: '菜单管理', keepAlive: true }
      },
      {
        path: 'edit',
        component: () => import('@/views/menu-manage/edit'),
        name: 'MenuManageEdie',
        meta: { title: '菜单管理', keepAlive: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    alwaysShow: true,
    name: '',
    meta: { title: 'User', icon: 'menu' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/user/index'),
        name: 'UserIndex',
        meta: { title: '用户管理', keepAlive: true }
      },
      {
        path: 'edit',
        component: () => import('@/views/user/edit'),
        name: 'UserEdie',
        meta: { title: '用户管理', keepAlive: true }
      }
    ]
  },
  {
    path: '/role',
    component: Layout,
    redirect: '/role/index',
    alwaysShow: true,
    name: '',
    meta: { title: 'Role', icon: 'menu' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/role/index'),
        name: 'RoleIndex',
        meta: { title: '角色管理', keepAlive: true }
      },
      {
        path: 'edit',
        component: () => import('@/views/role/edit'),
        name: 'RoleEdie',
        meta: { title: '角色管理', keepAlive: true }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true,
    name: '',
    meta: { title: 'permission', icon: 'menu' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/permission/index'),
        name: 'PermissionIndex',
        meta: { title: '权限管理', keepAlive: true }
      },
      {
        path: 'edit',
        component: () => import('@/views/permission/edit'),
        name: 'PermissionEdie',
        meta: { title: '权限管理', keepAlive: true }
      }
    ]
  },
  {
    path: '/cartype-compensation',
    component: Layout,
    redirect: '/cartype-compensation/index',
    alwaysShow: true,
    name: '',
    meta: { title: 'cartype-compensation', icon: 'menu' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/cartype-compensation/index'),
        name: 'CartypeCompensationIndex',
        meta: { title: '车型扭亏分析', keepAlive: true }
      },
      {
        path: 'edit',
        component: () => import('@/views/cartype-compensation/edit'),
        name: 'CartypeCompensationEdit',
        meta: { title: '车型扭亏分析对比', keepAlive: true }
      }
    ]
  },
  {
    path: '/risk-premium',
    component: Layout,
    redirect: '/risk-premium/index',
    alwaysShow: true,
    name: '',
    meta: { title: 'risk-premium', icon: 'menu' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/risk-premium/index'),
        name: 'RiskPremiumIndex',
        meta: { title: '承保风险查询及自定义计算', keepAlive: true }
      },
      {
        path: 'edit',
        component: () => import('@/views/risk-premium/edit'),
        name: 'RiskPremiumEdit',
        meta: { title: '承保风险查询及自定义计算', keepAlive: true }
      }
    ]
  },
  {
    path: '/vehicle-proposal',
    component: Layout,
    redirect: '/vehicle-proposal/index',
    alwaysShow: true,
    name: '',
    meta: { title: 'vehicle-proposal', icon: 'menu' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/vehicle-proposal/index'),
        name: 'VehicleProposalIndex',
        meta: { title: '车损险各车型保费建议', keepAlive: true }
      },
      {
        path: 'edit',
        component: () => import('@/views/vehicle-proposal/edit'),
        name: 'VehicleProposalEdit',
        meta: { title: '车损险各车型保费建议', keepAlive: true }
      }
    ]
  },
  {
    path: '/compensation',
    component: Layout,
    redirect: '/compensation/index',
    alwaysShow: true,
    name: '',
    meta: { title: 'compensation', icon: 'menu' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/compensation/index'),
        name: 'CompensationIndex',
        meta: { title: '车型当前赔付情况分析', keepAlive: true }
      },
      {
        path: 'edit',
        component: () => import('@/views/compensation/edit'),
        name: 'CompensationEdit',
        meta: { title: '车型当前赔付对比', keepAlive: true }
      }
    ]
  },
  {
    path: '/repair-hours',
    component: Layout,
    redirect: '/repair-hours/index',
    alwaysShow: true,
    name: '',
    meta: { title: 'repair-hours', icon: 'menu' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/repair-hours/index'),
        name: 'RepairHoursIndex',
        meta: { title: '维修工时数据查询', keepAlive: true }
      },
      {
        path: 'edit',
        component: () => import('@/views/repair-hours/edit'),
        name: 'RepairHoursEdit',
        meta: { title: '维修工时数据查询', keepAlive: true }
      }
    ]
  },
  {
    path: '/risk-level',
    component: Layout,
    redirect: '/risk-level/index',
    alwaysShow: true,
    name: '',
    meta: { title: 'risk-level', icon: 'menu' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/risk-level/index'),
        name: 'RiskLevelIndex',
        meta: { title: '车型风险级别查询', keepAlive: true }
      },
      {
        path: 'edit',
        component: () => import('@/views/risk-level/edit'),
        name: 'RiskLevelEdit',
        meta: { title: '车型风险级别对比', keepAlive: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/page',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Permission',
  //   meta: {
  //     title: 'Permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'Page Permission',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'Directive Permission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     },
  //     {
  //       path: 'role',
  //       component: () => import('@/views/permission/role'),
  //       name: 'RolePermission',
  //       meta: {
  //         title: 'Role Permission',
  //         roles: ['admin']
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'Icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'Example',
  //     icon: 'el-icon-s-help'
  //   },
  //   children: [
  //     {
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: { title: 'Create Article', icon: 'edit' }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: { title: 'Article List', icon: 'list' }
  //     }
  //   ]
  // },

  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'Tab',
  //       meta: { title: 'Tab', icon: 'tab' }
  //     }
  //   ]
  // },

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'Error Pages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/error-page/401'),
  //       name: 'Page401',
  //       meta: { title: '401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/error-page/404'),
  //       name: 'Page404',
  //       meta: { title: '404', noCache: true }
  //     }
  //   ]
  // },

  // {
  //   path: '/error-log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/error-log/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'Error Log', icon: 'bug' }
  //     }
  //   ]
  // },

  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'Excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/export-excel'),
  //       name: 'ExportExcel',
  //       meta: { title: 'Export Excel' }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/select-excel'),
  //       name: 'SelectExcel',
  //       meta: { title: 'Export Selected' }
  //     },
  //     {
  //       path: 'export-merge-header',
  //       component: () => import('@/views/excel/merge-header'),
  //       name: 'MergeHeader',
  //       meta: { title: 'Merge Header' }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/upload-excel'),
  //       name: 'UploadExcel',
  //       meta: { title: 'Upload Excel' }
  //     }
  //   ]
  // },

  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   name: 'Zip',
  //   meta: { title: 'Zip', icon: 'zip' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: () => import('@/views/zip/index'),
  //       name: 'ExportZip',
  //       meta: { title: 'Export Zip' }
  //     }
  //   ]
  // },

  // {
  //   path: '/pdf',
  //   component: Layout,
  //   redirect: '/pdf/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/pdf/index'),
  //       name: 'PDF',
  //       meta: { title: 'PDF', icon: 'pdf' }
  //     }
  //   ]
  // },
  // {
  //   path: '/pdf/download',
  //   component: () => import('@/views/pdf/download'),
  //   hidden: true
  // },

  // {
  //   path: '/theme',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'Theme', icon: 'theme' }
  //     }
  //   ]
  // },

  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'Clipboard', icon: 'clipboard' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
