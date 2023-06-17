import userProductData from './userProductData.json'
import type { MockHandler } from 'vite-plugin-mock-server'
import { v4 as uuidv4 } from 'uuid'
import { response } from './tools'

export interface ProductType {
  id?: string
  name: string
  brand: string
  category: string
  price: number
  color: string
  style: string
  enable: boolean
  inventory: number
  describe: string
}

let productMockData: ProductType[] = userProductData

const result: MockHandler[] = [
  {
    pattern: '/api/product',
    method: 'GET',
    handle: (req, res) => {
      const product = productMockData.find((product) => product.id === req.query!.id)
      if (product) return res.end(response(product))
      else return res.end(response(null, '产品未找到'))
    }
  },
  {
    pattern: '/api/product',
    method: 'POST',
    handle: (req, res) => {
      const product = req.body
      const { id } = product
      if (id) {
        const index = productMockData.findIndex((record) => record.id === id)
        productMockData.splice(index, 1, product)
        res.end(response(id))
      } else {
        const newId = uuidv4()
        productMockData.unshift({ ...product, id: newId })
        res.end(response(newId))
      }
    }
  },
  {
    pattern: '/api/product',
    method: 'DELETE',
    handle: (req, res) => {
      const ids = req.body as string[]
      productMockData = productMockData.filter((product) => ids.indexOf(product.id ?? '') === -1)
      res.end(response(null))
    }
  },
  {
    pattern: '/api/getProducts',
    method: 'POST',
    handle: (req, res) => {
      const { keyword, pagination } = req.body
      let data: ProductType[] = productMockData
      let total = data.length
      if (keyword) {
        data = productMockData.filter((product) => {
          return product.name.indexOf(keyword) !== -1
        })
        total = data.length
      }
      const { pageNo, pageSize } = pagination
      data = data.slice((pageNo - 1) * pageSize, pageNo * pageSize - 1)
      res.end(
        response({
          pageNo,
          pageSize,
          total,
          data
        })
      )
    }
  }
]
export default result
