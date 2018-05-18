import fetch from './util'

export function getList (params = {}) {
  const data = {
    url: 'http://gank.io/api/data/Android/10/1',
    method: 'GET',
    data: params
  }
  return fetch(data)
}
