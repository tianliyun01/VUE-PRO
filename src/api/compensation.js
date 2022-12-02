import request from '@/utils/request'

// 列表查询
export function queryPayByPage(data) {
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

