import http, { type IResponse } from '@/http'

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
  http.get<IResponse<ProductType>>(`/api/product`, {
    params: {
      id
    }
  })

export const saveProduct = (product: ProductType) =>
  http.post<IResponse<string>>('/api/product', product)

export const deleteProductByIds = (ids: string[]) =>
  http.delete<IResponse<null>>('/api/product', {
    data: ids
  })

export const getProducts = (params: ProductsQueryParamsType) =>
  http.post<
    IResponse<{
      pageNo: number
      pageSize: number
      total: number
      data: ProductType[]
    }>
  >('/api/getProducts', params)
