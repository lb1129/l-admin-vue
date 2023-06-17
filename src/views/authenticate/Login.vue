<template>
  <Layout>
    <a-form :model="formState" @finish="onFinish">
      <a-form-item name="userName" :rules="[{ required: true, message: $t('pleaseEnterAccount') }]">
        <a-input
          size="large"
          :placeholder="$t('account') + 'admin/viho/user'"
          v-model:value="formState.userName"
        >
          <template #prefix>
            <UserOutlined class="icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        name="password"
        :rules="[{ required: true, message: $t('pleaseEnterPassword') }]"
      >
        <a-input-password
          size="large"
          :placeholder="$t('password') + 'a123456'"
          v-model:value="formState.password"
        >
          <template #prefix>
            <LockOutlined class="icon" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <router-link :to="{ name: 'Register' }">{{ $t('signUp') }}</router-link>
        <router-link style="float: right" :to="{ name: 'FindPassword' }">{{
          $t('forgotPassword')
        }}</router-link>
      </a-form-item>

      <a-form-item>
        <a-button size="large" block :loading="loading" type="primary" html-type="submit">{{
          $t('login')
        }}</a-button>
      </a-form-item>
    </a-form>
  </Layout>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { notification } from 'ant-design-vue'
import 'ant-design-vue/es/notification/style'
import Layout from './Layout.vue'
import { useI18n } from 'vue-i18n'
import { tokenLocalforage } from '@/storage/localforage'
import { useUserInfo } from '@/pinia/stores/userInfo'
import { useMenuData } from '@/pinia/stores/menuData'
import { login, getMenu, getUserInfo } from './server'

const formState = reactive({
  userName: '',
  password: ''
})
const loading = ref(false)
const router = useRouter()
const { t } = useI18n()
const userInfoStore = useUserInfo()
const menuDataStore = useMenuData()
const onFinish = async () => {
  loading.value = true
  try {
    const res = await login(formState)
    // 存储token
    await tokenLocalforage.set(res.data)
    const userInfoRes = await getUserInfo()
    const menuRes = await getMenu()
    // 更新pinia内的菜单数据
    menuDataStore.setMenuData(menuRes.data)
    // 将pinia内菜单数据获取状态设置为完成
    menuDataStore.setMenuDataDone(true)
    // 更新pinia内的用户信息
    userInfoStore.setUserInfo(userInfoRes.data)
    // 跳转首页
    await router.replace({
      name: 'Home'
    })
    setTimeout(() => {
      // 欢迎提示
      notification.success({
        message: t('welcome'),
        description: userInfoRes.data.userName
      })
    }, 200)
    loading.value = false
  } catch (error) {
    loading.value = false
  }
}
</script>

<style scoped lang="less">
.icon {
  color: rgb(0 0 0 / 25%);
}
</style>
