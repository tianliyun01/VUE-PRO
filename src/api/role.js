import request from '@/utils/request'

// 列表数据
export function queryRoleInfo(id) {
  return request({
    url: '/role/queryRoleInfo?roleId=' + id,
    method: 'get'
  })
}
// 查询
export function queryRoleByPage(data) {
  return request({
    url: '/role/queryRoleByPage',
    method: 'post',
    data
  })
}

// 添加
export function saveOrUpdate(data) {
  return request({
    url: '/role/saveOrUpdate',
    method: 'post',
    data
  })
}

export function getRoutes() {
  return request({
    url: '/vue-element-admin/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/vue-element-admin/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/vue-element-admin/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'delete'
  })
}
