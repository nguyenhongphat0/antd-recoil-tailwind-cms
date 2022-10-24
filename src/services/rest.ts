import config from "../config"

const base = config.BASE_URL
export const tokenKey = 'jwt'

export const request = async (method: 'GET' | 'POST' | 'PUT' | 'DELETE', path: string, data?: any) => {
  const headers = new Headers()
  let token = localStorage.getItem(tokenKey)
  while (!token) {
    await new Promise(res => setTimeout(res, 100))
    token = localStorage.getItem(tokenKey)
  }
  headers.set('Authorization', `Bearer ${token}`)
  headers.set('GroupID', localStorage.getItem('groupId') ?? '')
  const url = new URL(`${base}/${path}`)
  if (method === 'GET') {
    url.search = new URLSearchParams(data).toString()
  }

  const options: RequestInit = {
    method: method,
    headers
  }
  if (method !== 'GET') {
    if (typeof data === 'function') {
      options.body = data()
    } else {
      headers.set('Content-Type', 'application/json')
      options.body = JSON.stringify(data)
    }
  }

  return fetch(url.toString(), options).then(response => {
    if (response.status !== 200) {
      if (response.status === 403) {
        // eslint-disable-next-line no-throw-literal
        throw 'You are not authorized to perform this action.'
      }
      // eslint-disable-next-line no-throw-literal
      throw `${response.status} ${response.statusText}`
    }
    return response
  })
}