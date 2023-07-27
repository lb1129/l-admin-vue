<template>
  <h1 class="basic-info-title">{{ $t('basicInfo') }}</h1>
  <a-row>
    <a-col :span="14">
      <a-form layout="vertical" hideRequiredMark :model="formState" @finish="onFinish">
        <a-form-item
          :label="$t('nickname')"
          name="nickname"
          :rules="[{
            validator: (rule: RuleObject, value: string) => {
              if (!value || !/^[\u4e00-\u9fa5A-Za-z0-9_-]{4,10}$/.test(value)) return promise.reject($t('nicknameRule'))
              return promise.resolve()
            }
          }]"
        >
          <a-input v-model:value="formState.nickname" :placeholder="$t('pleaseEnterNickname')">
          </a-input>
        </a-form-item>
        <a-form-item :label="$t('profile')" name="profile">
          <a-textarea v-model:value="formState.profile" :placeholder="$t('profile')" :rows="4" />
        </a-form-item>
        <a-form-item>
          <a-button :loading="loading" type="primary" html-type="submit">{{
            $t('updateBasicInfo')
          }}</a-button>
        </a-form-item>
      </a-form>
    </a-col>
    <a-col :span="10" style="text-align: center">
      <div class="basic-info-image">
        <a-spin :spinning="fileLoading">
          <div class="basic-info-image-content">
            <a-image :width="200" :height="200" :src="userInfoStore.userInfo.avatar" />
          </div>
        </a-spin>
        <a-upload
          v-show="fileLoading ? false : true"
          class="basic-info-image-edit"
          :max-count="1"
          accept="image/*"
          :show-upload-list="false"
          :customRequest="customRequestHandler"
        >
          <a-button shape="circle" size="large">
            <template #icon>
              <edit-outlined />
            </template>
          </a-button>
        </a-upload>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue'
import { useUserInfo } from '@/pinia/stores/userInfo'
import type { RuleObject } from 'ant-design-vue/es/form'
import { editUserInfoServe } from '@/serves/user'
import { uploadServe } from '@/serves/file'
import type { UploadRequestOption } from 'ant-design-vue/es/vc-upload/interface'
import { message } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const loading = ref(false)
const fileLoading = ref(false)
const formState = reactive({
  nickname: '',
  profile: ''
})
const userInfoStore = useUserInfo()
const promise = Promise

watchEffect(() => {
  formState.nickname = userInfoStore.userInfo.nickname
  formState.profile = userInfoStore.userInfo.profile
})

const onFinish = async () => {
  loading.value = true
  try {
    await editUserInfoServe({
      nickname: formState.nickname,
      profile: formState.profile
    })
    message.success(t('whatSuccess', [t('basicInfo')]))
    // 更新pinia
    userInfoStore.setUserInfo({
      nickname: formState.nickname,
      profile: formState.profile
    })
    loading.value = false
  } catch (error) {
    loading.value = false
  }
}

const customRequestHandler = async (ops: UploadRequestOption) => {
  fileLoading.value = true
  try {
    const url = await uploadServe(ops.file as File)
    await editUserInfoServe({
      avatar: url
    })
    message.success(t('whatSuccess', [t('editAvatar')]))
    // 更新pinia
    userInfoStore.setUserInfo({
      avatar: url
    })
    fileLoading.value = false
  } catch (error) {
    fileLoading.value = false
  }
}
</script>

<style scoped lang="less">
.basic-info-title {
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
  margin-bottom: 24px;
}

.basic-info-image {
  display: inline-block;
  position: relative;

  &-content {
    display: inline-block;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid @border-color-base;
  }

  &-edit {
    position: absolute;
    bottom: 0;
    left: 18px;
  }
}
</style>
