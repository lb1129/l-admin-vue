import userProductData from '@/mock/userProductData.json'

const productMockData: ProductType[] = userProductData

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

export interface ProductPaginationType {
  pageNo: number
  pageSize: number
  total: number
  data: ProductType[]
}

export interface ProductsQueryParamsType {
  pagination: {
    pageNo: number
    pageSize: number
  }
  keyword?: string
}

export const getProductById = (id: string) =>
  new Promise<ProductType>((resolve, reject) => {
    setTimeout(() => {
      const product = productMockData.find((product) => product.id === id)
      if (product) resolve(product)
    }, 500)
  })

export const saveProduct = (product: ProductType) =>
  new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      const { id } = product
      if (id) {
        const index = productMockData.findIndex((record) => record.id === id)
        productMockData.splice(index, 1, product)
        resolve(id)
      } else {
        const newId = `${productMockData.length - 1}`
        productMockData.push({ ...product, id: newId })
        resolve(newId)
      }
    }, 500)
  })

export const getProducts = (params: ProductsQueryParamsType) =>
  new Promise<ProductPaginationType>((resolve, reject) => {
    setTimeout(() => {
      const { keyword, pagination } = params
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
      resolve({
        pageNo,
        pageSize,
        total,
        data
      })
    }, 500)
  })
