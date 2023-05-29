import { type RouteRecordRaw } from 'vue-router'

const routers: RouteRecordRaw[] = [
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFound.vue') },
  {
    path: '/',
    component: () => import('../views/Index.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: { title: '首页' }
      },
      {
        path: 'ProductManagement',
        name: 'ProductManagement',
        redirect: { name: 'ProductList' },
        meta: { title: '产品管理' },
        children: [
          {
            path: 'ProductList',
            name: 'ProductList',
            component: () => import('@/views/product-management/ProductList.vue'),
            meta: { title: '产品列表' }
          },
          {
            path: 'ProductDetail/:id',
            name: 'ProductDetail',
            component: () => import('@/views/product-management/ProductDetail.vue'),
            meta: { title: '产品详情', noMenu: true }
          },
          {
            path: 'ProductEdit/:id',
            name: 'ProductEdit',
            component: () => import('@/views/product-management/ProductEdit.vue'),
            meta: { title: '产品编辑', noMenu: true }
          }
        ]
      },
      {
        path: 'UserManagement',
        name: 'UserManagement',
        redirect: { name: 'PersonalCenter' },
        meta: { title: '用户管理' },
        children: [
          {
            path: 'PersonalCenter',
            name: 'PersonalCenter',
            component: () => import('@/views/user-management/PersonalCenter.vue'),
            meta: { title: '个人中心' }
          }
        ]
      }
    ]
  },
  {
    path: '/Privacy',
    name: 'Privacy',
    component: () => import('@/views/Privacy.vue'),
    meta: { title: '隐私政策' }
  },
  {
    path: '/Authenticate',
    component: () => import('@/views/authenticate/Index.vue'),
    redirect: { name: 'Login' },
    children: [
      {
        path: 'Login',
        name: 'Login',
        component: () => import('@/views/authenticate/Login.vue'),
        meta: { title: '登录' }
      },
      {
        path: 'Register',
        name: 'Register',
        component: () => import('@/views/authenticate/Register.vue'),
        meta: { title: '注册' }
      },
      {
        path: 'FindPassword',
        name: 'FindPassword',
        component: () => import('@/views/authenticate/FindPassword.vue'),
        meta: { title: '找回密码' }
      }
    ]
  }
]

export default routers
