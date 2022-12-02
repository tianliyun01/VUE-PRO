import request from '@/utils/request'

// 列表数据
export function queryRoleInfo(data) {
  return request({
    url: 'api/bs/role/queryRoleInfo',
    method: 'get',
    params: data
  })
}
// 查询
export function queryRoleByPage(data) {
  return request({
    url: 'api/bs/role/queryRoleByPage',
    method: 'post',
    data
  })
}

// 添加
export function saveOrUpdate(data) {
  return request({
    url: 'api/bs/role/saveOrUpdate',
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
