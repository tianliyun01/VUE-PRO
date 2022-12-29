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
