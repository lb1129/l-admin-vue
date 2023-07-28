<template>
  <Layout>
    <a-form ref="formRef" :model="formState" @finish="onFinish">
      <a-form-item name="username" :rules="[{ required: true, message: $t('pleaseEnterAccount') }]">
        <a-input
          size="large"
          :placeholder="$t('account')"
          v-model:value="formState.username"
        ></a-input>
      </a-form-item>

      <a-form-item
        name="password"
        :rules="[
          { required: true, message: $t('pleaseEnterPassword') },
          {
            validator: (rule: RuleObject, value: string) => {
              if (value && !isPassword(value)) return promise.reject($t('passwordRule'))
              return promise.resolve()
            }
          }
        ]"
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
          { required: true, message: $t('pleaseEnterPassword') },
          {
            validator: (rule: RuleObject, value: string) => {
              if (formState.password && value !== formState.password)
                return promise.reject($t('twoPasswordsDoNotMatch'))
              return promise.resolve()
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
        :rules="[
          { required: true, message: $t('pleaseEnterMobileNumber') },
          {
            validator: (rule: RuleObject, value: string) => {
              if (value && !isPhone(value)) return promise.reject($t('phoneRule'))
              return promise.resolve()
            }
          }
        ]"
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
          <a-button
            block
            size="large"
            :loading="codeLoading"
            :disabled="codeTime > 0"
            @click="getCodeHandler"
            >{{ codeText }}</a-button
          >
        </a-col>
      </a-row>

      <div v-if="phoneCode">{{ phoneCode }}</div>

      <a-form-item>
        <router-link :to="{ name: 'Login' }">{{ $t('haveAnAccount') }}</router-link>
      </a-form-item>

      <a-form-item>
        <a-button size="large" :loading="submitLoading" block type="primary" html-type="submit">{{
          $t('register')
        }}</a-button>
      </a-form-item>
    </a-form>
  </Layout>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import Layout from './Layout.vue'
import type { RuleObject, FormInstance } from 'ant-design-vue/es/form'
import { isPassword, isPhone } from '@/utils/validate'
import { registerServe } from '@/serves/auth'
import { sendCodeServe } from '@/serves/other'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { notification } from 'ant-design-vue'
import { useCountDown } from '@/utils/useCountDown'

const { t } = useI18n()
const router = useRouter()
const submitLoading = ref(false)
const codeLoading = ref(false)
const phoneCode = ref('')
const formRef = ref<FormInstance>()
const [codeTime, codeTimeRun] = useCountDown(60)
const formState = reactive<{
  username: string
  password: string
  confirmPassword: string
  phone: string
  code: string
}>({
  username: '',
  password: '',
  confirmPassword: '',
  phone: '',
  code: ''
})

const codeText = computed(() =>
  codeTime.value > 0 ? `${t('retrieve')}${codeTime.value}s` : t('getVerificationCode')
)

const getCodeHandler = async () => {
  codeLoading.value = true
  try {
    const values = await formRef.value?.validateFields('phone')
    const res = await sendCodeServe(Number(values?.phone))
    // NOTE 短信服务暂未接入运营商 先直接显示在前端
    phoneCode.value = res.data
    codeTimeRun()
    codeLoading.value = false
  } catch (e) {
    codeLoading.value = false
  }
}

const onFinish = async () => {
  submitLoading.value = true
  try {
    await registerServe({
      username: formState.username,
      password: formState.password,
      phone: Number(formState.phone),
      code: formState.code
    })
    notification.success({
      message: t('tip'),
      description: t('registerSuccess'),
      duration: 2
    })
    setTimeout(() => {
      router.push({
        name: 'Login'
      })
    }, 2000)
    submitLoading.value = false
  } catch (error) {
    submitLoading.value = false
  }
}
const promise = Promise
</script>

<style scoped lang="less"></style>
