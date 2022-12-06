import request from '@/utils/request'

// 列表查询
export function queryPremiumByPage(data) {
  return request({
    url: 'api/bs/standardPay/queryByPage',
    method: 'post',
    data
  })
}
// 初始化
export function initData(data) {
  return request({
    url: 'api/bs/standardPay/initData',
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
export function queryYearParagraph(data) {
  return request({
    url: 'api/bs/standardPay/queryYearParagraph',
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

