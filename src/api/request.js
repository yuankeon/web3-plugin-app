/**
 * axios的二次封装：使用请求拦截器与响应拦截器
 */
import axios from 'axios'
import { API_URL } from '../config'

const request = axios.create({
  baseURL: API_URL,
  timeout: 30000,
})

// request 实例添加请求拦截器
request.interceptors.request.use((config) => {
  //从缓存中获取 token 信息
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

//request 实例添加响应拦截器
request.interceptors.response.use(
  (response) => {
    //成功回调 => 简化数据
    if (response.data.code === 200) return response.data.data
    //【抛出需要客户端处理的错误】
    throw Error(response.data.msg)
  },
  (error) => {
    //失败回调:处理http网络错误【处理服务器端的错误】
    return Promise.reject(error)
  },
)

export { request }
