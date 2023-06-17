import userData from './userData.json'
import userMenuData from './userMenuData.json'
import type { MockHandler } from 'vite-plugin-mock-server'
import { response } from './tools'

const result: MockHandler[] = [
  {
    pattern: '/api/login',
    method: 'POST',
    handle: (req, res) => {
      const { userName, password } = req.body
      const userInfo = userData[userName]
      if (!userInfo || password !== 'a123456') {
        res.statusCode = 400
        res.end(response(null, '用户名或密码错误'))
        return
      }
      const token = userInfo.userName
      res.end(response(token))
    }
  },
  {
    pattern: '/api/logout',
    method: 'POST',
    handle: (req, res) => {
      res.end(response(null))
    }
  },
  {
    pattern: '/api/menu',
    method: 'GET',
    handle: (req, res) => {
      const token = req.headers.authorization
      if (token) {
        const menu = userMenuData[token]
        res.end(response(menu))
      } else {
        res.statusCode = 401
        res.end(response(false, '未登录'))
      }
    }
  },
  {
    pattern: '/api/userInfo',
    method: 'GET',
    handle: (req, res) => {
      const token = req.headers.authorization
      if (token) {
        const userInfo = userData[token]
        res.end(response(userInfo))
      } else {
        res.statusCode = 401
        res.end(response(false, '未登录'))
      }
    }
  },
  {
    pattern: '/api/isLogin',
    method: 'GET',
    handle: (req, res) => {
      const token = req.headers.authorization
      if (token) {
        res.end(response(true))
      } else {
        res.statusCode = 401
        res.end(response(false, '未登录'))
      }
    }
  }
]
export default result
