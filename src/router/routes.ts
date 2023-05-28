import { type RouteRecordRaw } from 'vue-router'
import Authenticate from '@/views/authenticate/Index.vue'
import Login from '@/views/authenticate/Login.vue'
import Register from '@/views/authenticate/Register.vue'
import FindPassword from '@/views/authenticate/FindPassword.vue'
import NotFound from '@/views/NotFound.vue'
import Privacy from '@/views/Privacy.vue'
import Home from '@/views/Home.vue'
import ProductList from '@/views/product-management/ProductList.vue'
import ProductDetail from '@/views/product-management/ProductDetail.vue'
import ProductEdit from '@/views/product-management/ProductEdit.vue'
import PersonalCenter from '@/views/user-management/PersonalCenter.vue'

const routers: RouteRecordRaw[] = [
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  {
    path: '/',
    component: () => import('../views/Index.vue'),
    children: [
      { path: '', name: 'Home', component: Home, meta: { title: '首页' } },
      {
        path: 'ProductManagement',
        name: 'ProductManagement',
        redirect: { name: 'ProductList' },
        meta: { title: '产品管理' },
        children: [
          {
            path: 'ProductList',
            name: 'ProductList',
            component: ProductList,
            meta: { title: '产品列表' }
          },
          {
            path: 'ProductDetail/:id',
            name: 'ProductDetail',
            component: ProductDetail,
            meta: { title: '产品详情', noMenu: true }
          },
          {
            path: 'ProductEdit/:id',
            name: 'ProductEdit',
            component: ProductEdit,
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
            component: PersonalCenter,
            meta: { title: '个人中心' }
          }
        ]
      }
    ]
  },
  {
    path: '/Privacy',
    name: 'Privacy',
    component: Privacy,
    meta: { title: '隐私政策' }
  },
  {
    path: '/Authenticate',
    component: Authenticate,
    redirect: { name: 'Login' },
    children: [
      {
        path: 'Login',
        name: 'Login',
        component: Login,
        meta: { title: '登录' }
      },
      {
        path: 'Register',
        name: 'Register',
        component: Register,
        meta: { title: '注册' }
      },
      {
        path: 'FindPassword',
        name: 'FindPassword',
        component: FindPassword,
        meta: { title: '找回密码' }
      }
    ]
  }
]

export default routers
