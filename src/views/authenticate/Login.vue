<template>
  <Layout>
    <a-form :model="formState" @finish="onFinish">
      <a-form-item name="userName" :rules="[{ required: true, message: $t('pleaseEnterAccount') }]">
        <a-input size="large" :placeholder="$t('account')" v-model:value="formState.userName">
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
          :placeholder="$t('password')"
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
import { notification, message } from 'ant-design-vue'
import 'ant-design-vue/es/notification/style'
import 'ant-design-vue/es/message/style'
import Layout from './Layout.vue'
import { useI18n } from 'vue-i18n'
import userMenuData from '@/mock/userMenuData.json'
import { tokenLocalforage } from '@/utils/localforage'
import { useUserInfo } from '@/pinia/stores/userInfo'
import { useMenuData } from '@/pinia/stores/menuData'
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
  // mock 登录流程
  setTimeout(async () => {
    // 该用户有menuData 登录成功 否则失败 提示用户名错误
    const menuData = userMenuData[formState.userName as keyof typeof userMenuData]
    if (menuData) {
      // token存储用户名称
      await tokenLocalforage.set(formState.userName)
      // 跳转首页
      await router.replace({
        name: 'Home'
      })
      // 更新pinia内的菜单数据
      menuDataStore.setMenuData(menuData)
      // 将pinia内菜单数据获取状态设置为完成
      menuDataStore.setMenuDataDone(true)
      // 更新pinia内的用户信息
      userInfoStore.setUserInfo({ userName: formState.userName })
      setTimeout(() => {
        // 欢迎提示
        notification.success({
          message: t('welcome'),
          description: formState.userName
        })
      }, 200)
    } else {
      message.error(t('userNameError'))
    }
    loading.value = false
  }, 500)
}
</script>

<style scoped lang="less">
.icon {
  color: rgb(0 0 0 / 25%);
}
</style>
