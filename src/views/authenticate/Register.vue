<template>
  <Layout>
    <a-form :model="formState" @finish="onFinish">
      <a-form-item name="userName" :rules="[{ required: true, message: $t('pleaseEnterAccount') }]">
        <a-input
          size="large"
          :placeholder="$t('account')"
          v-model:value="formState.userName"
        ></a-input>
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
        </a-input-password>
      </a-form-item>

      <a-form-item
        name="confirmPassword"
        :rules="[
          {
            required: true,
            validator: (rule: RuleObject, value: string) => {
              if (!value) return promise.reject($t('pleaseEnterPassword'))
              if (formState.password && value !== formState.password)
                return promise.reject($t('twoPasswordsDoNotMatch'))
            }
          }
        ]"
      >
        <a-input-password
          size="large"
          :placeholder="$t('confirmPassword')"
          v-model:value="formState.confirmPassword"
        >
        </a-input-password>
      </a-form-item>

      <a-form-item
        name="phone"
        :rules="[{ required: true, message: $t('pleaseEnterMobileNumber') }]"
      >
        <a-input
          size="large"
          :placeholder="$t('mobileNumber')"
          v-model:value="formState.phone"
        ></a-input>
      </a-form-item>

      <a-row :gutter="16">
        <a-col :span="16">
          <a-form-item
            name="code"
            :rules="[{ required: true, message: $t('pleaseEnterVerificationCode') }]"
          >
            <a-input
              size="large"
              :placeholder="$t('verificationCode')"
              v-model:value="formState.code"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-button block size="large">{{ $t('getVerificationCode') }}</a-button>
        </a-col>
      </a-row>

      <a-form-item>
        <router-link :to="{ name: 'Login' }">{{ $t('haveAnAccount') }}</router-link>
      </a-form-item>

      <a-form-item>
        <a-button size="large" block type="primary" html-type="submit">{{
          $t('register')
        }}</a-button>
      </a-form-item>
    </a-form>
  </Layout>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import Layout from './Layout.vue'
import type { RuleObject } from 'ant-design-vue/es/form'
const formState = reactive<{
  userName: string
  password: string
  confirmPassword: string
  phone: number | undefined
  code: number | undefined
}>({
  userName: '',
  password: '',
  confirmPassword: '',
  phone: undefined,
  code: undefined
})
const onFinish = () => {}
const promise = Promise
</script>

<style scoped lang="less"></style>
