<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import HelloWorld from '../components/HelloWorld.vue'
const { t, locale, availableLocales } = useI18n()
</script>

<template>
  <main>
    <HelloWorld :msg="t('helloWorld')" />
    <select v-model="locale">
      <option v-for="localeStr in availableLocales" :key="localeStr" :value="localeStr">
        {{ localeStr }}
      </option>
    </select>
  </main>
</template>
