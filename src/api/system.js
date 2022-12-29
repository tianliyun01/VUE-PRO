import request from '@/utils/request'

export function systemPermission() {
  return request({
    url: '/xb_sso/login/systemPermission',
    method: 'post'
  })
}

export function functionPermission(data) {
  return request({
    url: '/xb_sso/login/functionPermission ',
    method: 'post',
    data
  })
}

export function getUserCodeTreeMenu(data) {
  return request({
    url: 'api/bs/menu/getUserCodeTreeMenu',
    method: 'get',
    params: data
  })
}
