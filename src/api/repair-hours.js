import request from '@/utils/request'

// 列表查询
export function queryRepairByPage(data) {
  return request({
    url: 'api/bs/managementHour/queryHourByPage',
    method: 'post',
    data
  })
}
// 初始化
export function initData(data) {
  return request({
    url: 'api/bs/managementHour/getHourInfo',
    method: 'get',
    params: data
  })
}
// 查询厂商下的品牌
export function getBrandByFactory(data) {
  return request({
    url: 'api/bs/factory/queryFactoryBrandInfo',
    method: 'get',
    params: data
  })
}
// 品牌级联查询
export function brandRecurInfo(data) {
  return request({
    url: 'api/bs/brand/brandRecurInfo',
    method: 'get',
    params: data
  })
}
// 维修明细查看
export function queryRepairInfo(data) {
  return request({
    url: 'api/bs/standardPay/queryRepairInfo',
    method: 'get',
    params: data
  })
}
// 计算
export function calculateLosses(data) {
  return request({
    url: 'api/bs/managementHour/calculateLosses',
    method: 'post',
    data
  })
}
export function getParts(data) {
  return request({
    url: 'api/bs/managementHour/getPartsQuery',
    method: 'get',
    params: data
  })
}

