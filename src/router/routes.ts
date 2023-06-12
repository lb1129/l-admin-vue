import { type RouteRecordRaw } from 'vue-router'
import { lazyLoad, loading } from './lazyLoad'

const routers: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Index',
    component: lazyLoad('index', 'Index'),
    meta: { needAuth: true },
    children: [
      {
        path: '',
        name: 'Home',
        component: lazyLoad('index', 'Home'),
        meta: { needAuth: true }
      },
      {
        path: 'personalCenter',
        name: 'PersonalCenter',
        component: lazyLoad('personal-center', 'Index'),
        meta: { needAuth: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: lazyLoad('authenticate', 'Login'),
    meta: { needAuth: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: lazyLoad('authenticate', 'Register'),
    meta: { needAuth: false }
  },
  {
    path: '/findPassword',
    name: 'FindPassword',
    component: lazyLoad('authenticate', 'FindPassword'),
    meta: { needAuth: false }
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: lazyLoad('mixed', 'Privacy')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    // 初始为loading
    component: loading
  }
]

export default routers
