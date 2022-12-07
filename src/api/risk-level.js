import request from '@/utils/request'

// 列表查询
export function queryRiskLevelByPage(data) {
  return request({
    url: 'api/bs/riskQuery/queryRiskByPage',
    method: 'post',
    data
  })
}
// 初始化
export function getRiskInfo(data) {
  return request({
    url: 'api/bs/riskQuery/getRiskInfo',
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
    url: 'api/bs/standardPay/calculateLosses',
    method: 'post',
    data
  })
}

