import request from '@/utils/request'

export function queryData() {
  return request({
    url: '/api/bs/ex/authority/queryByPage',
    method: 'post'
  })
}

