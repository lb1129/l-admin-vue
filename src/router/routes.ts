import { type RouteRecordRaw } from 'vue-router'
import AuthenticateIndexView from '../views/authenticate/IndexView.vue'
import LoginView from '../views/authenticate/LoginView.vue'
import RegisterView from '../views/authenticate/RegisterView.vue'
import FindPasswordView from '../views/authenticate/FindPasswordView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import PrivacyView from '../views/PrivacyView.vue'

const routers: RouteRecordRaw[] = [
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
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
