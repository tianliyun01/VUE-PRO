import request from '@/utils/request'

export function auth(data) {
  return request({
    url: '/api/auth',
    method: 'post',
    data
  })
}
export function verifyEmailCode(params) {
  return request({
    url: '/api/sso/api/verifyEmailCode',
    method: 'get',
    params
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}
export function verifyCode() {
  return request({
    url: '/api/sso/api/verifyPictureCode',
    method: 'get'
  })
}
