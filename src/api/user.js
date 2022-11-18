import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
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

export function getVerifyCode() {
  return request({
    url: '/api/sso/api/verifyEmailCode',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
