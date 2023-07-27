import { type RouteRecordRaw } from 'vue-router'
import { lazyLoad } from './tools'
import PageLoading from '@/components/PageLoading/index.vue'

const routers: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Index',
    component: lazyLoad('index', 'Index'),
    meta: { needAuth: true, menuName: 'index' },
    children: [
      {
        path: '',
        name: 'Home',
        component: lazyLoad('index', 'Home'),
        meta: { needAuth: true, menuName: 'homePage' }
      },
      {
        path: 'personalCenter',
        name: 'PersonalCenter',
        component: lazyLoad('personal-center', 'Index'),
        meta: { needAuth: true, menuName: 'personalCenter' },
        redirect: { name: 'BasicInfo' },
        children: [
          {
            path: 'basicInfo',
            name: 'BasicInfo',
            component: lazyLoad('personal-center', 'BasicInfo'),
            meta: { needAuth: true, menuName: 'basicInfo' }
          },
          {
            path: 'securitySetting',
            name: 'SecuritySetting',
            component: lazyLoad('personal-center', 'SecuritySetting'),
            meta: { needAuth: true, menuName: 'securitySetting' }
          }
        ]
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
    name: 'PrivacyPolicy',
    component: lazyLoad('sundry', 'PrivacyPolicy')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    // 初始为Loading
    component: PageLoading
  }
]

export default routers
