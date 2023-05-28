import { type RouteRecordRaw } from 'vue-router'
import AuthenticateIndexView from '@/views/authenticate/IndexView.vue'
import LoginView from '@/views/authenticate/LoginView.vue'
import RegisterView from '@/views/authenticate/RegisterView.vue'
import FindPasswordView from '@/views/authenticate/FindPasswordView.vue'
import NotFound from '@/views/NotFound.vue'
import PrivacyView from '@/views/PrivacyView.vue'
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
    path: '/privacy',
    name: 'privacy',
    component: PrivacyView,
    meta: { title: '隐私政策' }
  },
  {
    path: '/authenticate',
    component: AuthenticateIndexView,
    redirect: { name: 'login' },
    children: [
      {
        path: 'login',
        name: 'login',
        component: LoginView,
        meta: { title: '登录' }
      },
      {
        path: 'register',
        name: 'register',
        component: RegisterView,
        meta: { title: '注册' }
      },
      {
        path: 'findPassword',
        name: 'findPassword',
        component: FindPasswordView,
        meta: { title: '找回密码' }
      }
    ]
  }
]

export default routers
