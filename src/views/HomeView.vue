<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import HelloWorld from '../components/HelloWorld.vue'
import { useHttp } from '@/composables/http'
import { useUserInfo } from '@/pinia/stores/user-info'
const { t, locale, availableLocales } = useI18n()
const { data, error } = useHttp({
  method: 'post',
  url: '/api/test',
  data: {
    id: 0
  }
})
const { userInfo, updateUserInfo } = useUserInfo()
setTimeout(() => {
  updateUserInfo({
    name: '小明',
    nickname: 'ming',
    age: 18
  })
}, 5000)
</script>

<template>
  <main>
    <HelloWorld :msg="t('helloWorld')" />
    <select v-model="locale">
      <option v-for="localeStr in availableLocales" :key="localeStr" :value="localeStr">
        {{ localeStr }}
      </option>
    </select>
    <div v-if="error">Error encountered</div>
    <div v-else-if="data">Data loaded</div>
    <div v-else>Loading...</div>
    <div>{{ userInfo.name }}</div>
  </main>
</template>
