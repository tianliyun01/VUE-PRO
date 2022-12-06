import request from '@/utils/request'

export function queryMenuByPage(data) {
  return request({
    url: 'api/bs/menu/queryMenuByPage',
    method: 'post',
    data
  })
}
export function getMenuInfo(data) {
  return request({
    url: 'api/bs/menu/getMenuInfo',
    method: 'get',
    params: data
  })
}
export function saveOrUpdate(data) {
  return request({
    url: 'api/bs/menu/saveOrUpdate',
    method: 'post',
    data
  })
}
export function deleteMenuInfo(data) {
  return request({
    url: 'api/bs/menu/deleteMenuInfo',
    method: 'get',
    params: data
  })
}
export function isExisted(data) {
  return request({
    url: 'api/bs/menu/isExisted',
    method: 'get',
    params: data
  })
}
export function getLevelInfo(data) {
  return request({
    url: 'api/bs/menu/getLevelInfo',
    method: 'get',
    params: data
  })
}
