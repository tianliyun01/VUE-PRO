import request from '@/utils/request'

export function auth(data) {
  return request({
    url: '/api/sso/api/auth',
    method: 'post',
    data
  })
}
// export function verifyEmailCode(params) {
//   return request({
//     url: '/api/sso/api/verifyEmailCode',
//     method: 'get',
//     params
//   })
// }

export function getInfo(token) {
  return request({
    url: '/api/sso/api/userInfo',
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
export function redirectURL(url) {
  return request({
    url: url,
    method: 'get'
  })
}
export function queryByPage(data) {
  return request({
    url: '/api/bs/user/queryByPage',
    method: 'post',
    data
  })
}
export function getUserInfo(data) {
  return request({
    url: '/api/bs/user/queryUserInfo',
    method: 'get',
    data
  })
}
export function saveOrUpdate(data) {
  return request({
    url: '/api/bs/user/saveOrUpdate',
    method: 'post',
    data
  })
}
export function queryUserInfo(data) {
  return request({
    url: '/api/bs/user/queryUserInfo',
    method: 'get',
    params: data
  })
}

export function isExisted(data) {
  return request({
    url: '/api/bs/user/isExisted',
    method: 'get',
    params: data
  })
}

export function isExistedEmail(data) {
  return request({
    url: '/api/bs/user/isExistedEmail',
    method: 'get',
    params: data
  })
}

export function updatePassWord(data) {
  return request({
    url: '/api/bs/user/updatePassWord',
    method: 'get',
    params: data
  })
}
