import request from '@/utils/request'

export function queryMenuByPage(data) {
  return request({
    url: '/menu/queryMenuByPage',
    method: 'post',
    data
  })
}
export function getMenuInfo(data) {
  return request({
    url: '/menu/getMenuInfo',
    method: 'get',
    data
  })
}
export function saveOrUpdate(data) {
  return request({
    url: '/menu/saveOrUpdate',
    method: 'post',
    data
  })
}
