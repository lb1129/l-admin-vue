<template>
  <h1 class="security-setting-title">{{ $t('securitySetting') }}</h1>
  <a-list item-layout="horizontal">
    <a-list-item>
      <template #actions>
        <a @click="visible = true">{{ $t('edit') }}</a>
      </template>
      <a-list-item-meta :title="$t('mobileNumber')" :description="userInfoStore.userInfo.phone">
      </a-list-item-meta>
    </a-list-item>
  </a-list>
  <a-modal
    v-model:visible="visible"
    :mask-closable="false"
    :title="$t('editPhone')"
    @ok="modalOkHandler"
    @cancel="modalCancelHandler"
    :ok-button-props="{
      loading: submitLoading
    }"
  >
    <a-form ref="formRef" :model="formState">
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
        <a-input :placeholder="$t('mobileNumber')" v-model:value="formState.phone"></a-input>
      </a-form-item>

      <a-row :gutter="16">
        <a-col :span="16">
          <a-form-item
            name="code"
            :rules="[{ required: true, message: $t('pleaseEnterVerificationCode') }]"
          >
            <a-input :placeholder="$t('verificationCode')" v-model:value="formState.code"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-button block :loading="codeLoading" :disabled="codeTime > 0" @click="getCodeHandler">{{
            codeText
          }}</a-button>
        </a-col>
      </a-row>

      <div v-if="phoneCode">{{ phoneCode }}</div>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive, computed, nextTick } from 'vue'
import { useUserInfo } from '@/pinia/stores/userInfo'
import type { RuleObject, FormInstance } from 'ant-design-vue/es/form'
import { isPhone } from '@/utils/validate'
import { sendCodeServe } from '@/serves/other'
import { setPhoneServe } from '@/serves/user'
import { useI18n } from 'vue-i18n'
import { message } from 'ant-design-vue'

const { t } = useI18n()
const visible = ref(false)
const submitLoading = ref(false)
const codeLoading = ref(false)
const phoneCode = ref('')
const formRef = ref<FormInstance>()
const codeTime = ref(0)
const formState = reactive({
  phone: '',
  code: ''
})
const userInfoStore = useUserInfo()
const promise = Promise

const codeText = computed(() =>
  codeTime.value > 0 ? `${t('retrieve')}${codeTime.value}s` : t('getVerificationCode')
)

const getCodeHandler = async () => {
  codeLoading.value = true
  try {
    const values = await formRef.value?.validateFields('phone')
    const res = await sendCodeServe(values?.phone)
    // NOTE 短信服务暂未接入运营商 先直接显示在前端
    phoneCode.value = res.data
    codeTime.value = 60
    const timer = setInterval(() => {
      if (codeTime.value <= 0) {
        phoneCode.value = ''
        clearInterval(timer)
      } else codeTime.value--
    }, 1000)
    codeLoading.value = false
  } catch (e) {
    codeLoading.value = false
  }
}

const modalOkHandler = async () => {
  submitLoading.value = true
  try {
    await formRef.value?.validateFields()
    const phone = Number(formState.phone)
    await setPhoneServe({
      phone,
      code: formState.code
    })
    message.success(t('whatSuccess', [t('editPhone')]))
    // 更新pinia
    userInfoStore.setUserInfo({
      phone
    })
    submitLoading.value = false
    visible.value = false
  } catch (error) {
    submitLoading.value = false
  }
}

const modalCancelHandler = () => {
  nextTick(() => {
    formRef.value?.resetFields()
  })
}
</script>

<style scoped lang="less">
.security-setting-title {
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
  margin-bottom: 12px;
}
</style>
