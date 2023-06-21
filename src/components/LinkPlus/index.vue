<template>
  <router-link :to="to" :class="{ disabled: disabled }">
    <slot></slot>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type RouterLinkProps } from 'vue-router'

const props = defineProps<{
  disabled?: boolean
  to?: RouterLinkProps['to']
}>()

const to = computed(() => {
  if (props.disabled) return ''
  return props.to ?? ''
})
</script>

<style scoped lang="less">
.disabled {
  cursor: not-allowed;
  color: rgb(0 0 0 / 25%);
}
</style>
