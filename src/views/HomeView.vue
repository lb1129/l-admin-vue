<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import HelloWorld from '../components/HelloWorld.vue'
import { useHttp } from '@/composables/http'
const { t, locale, availableLocales } = useI18n()
const { data, error } = useHttp({
  method: 'post',
  url: '/api/test',
  data: {
    id: 0
  }
})
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
  </main>
</template>
