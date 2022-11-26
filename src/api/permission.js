import request from '@/utils/request'

export function queryPermissionData(data) {
  return request({
    url: '/api/bs/ex/authority/queryByPage',
    method: 'post',
    data
  })
}
export function saveOrUpdate(data) {
  return request({
    url: '/api/bs/ex/authority/saveOrUpdate',
    method: 'post',
    data
  })
}
export function queryPowerInfo(data) {
  return request({
    url: '/api/bs/ex/authority/queryPowerInfo',
    method: 'get',
    params: data
  })
}
