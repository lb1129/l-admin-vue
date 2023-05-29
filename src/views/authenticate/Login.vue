<template>
  <a-form :model="formState" @finish="onFinish">
    <a-form-item name="username" :rules="[{ required: true, message: $t('pleaseEnterAccount') }]">
      <a-input size="large" :placeholder="$t('account')" v-model:value="formState.username">
        <template #prefix>
          <UserOutlined class="icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item name="password" :rules="[{ required: true, message: $t('pleaseEnterPassword') }]">
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
      <router-link :to="{ name: 'Register', replace: true }">{{ $t('signUp') }}</router-link>
      <router-link style="float: right" :to="{ name: 'FindPassword', replace: true }">{{
        $t('forgotPassword')
      }}</router-link>
    </a-form-item>

    <a-form-item>
      <a-button size="large" block type="primary" html-type="submit">{{ $t('login') }}</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { notification } from 'ant-design-vue'
import 'ant-design-vue/es/notification/style/css'
import { useI18n } from 'vue-i18n'
const formState = reactive({
  username: '',
  password: ''
})
const router = useRouter()
const { t } = useI18n()
const onFinish = async () => {
  const navigationResult = await router.replace({
    name: 'Home'
  })
  if (!navigationResult) {
    notification.success({
      message: t('welcome'),
      description: formState.username
    })
  }
}
</script>

<style scoped lang="less">
.icon {
  color: rgb(0 0 0 / 25%);
}
</style>
