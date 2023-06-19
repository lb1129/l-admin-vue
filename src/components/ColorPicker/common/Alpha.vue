<template>
  <div class="vc-alpha">
    <div class="vc-alpha-checkboard-wrap">
      <Checkboard />
    </div>
    <div class="vc-alpha-gradient" :style="{ background: gradientColor }"></div>
    <div class="vc-alpha-container" ref="container" @mousedown="handleMouseDown">
      <div class="vc-alpha-pointer" :style="{ left: value.a * 100 + '%' }">
        <div class="vc-alpha-picker"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Checkboard from './Checkboard.vue'

const container = ref<HTMLElement>()
const props = defineProps<{
  value: {
    hex: string
    hex8: string
    hsl: { h: number; s: number; l: number; a: number }
    hsv: { h: number; s: number; v: number; a: number }
    rgba: { r: number; g: number; b: number; a: number }
    a: number
  }
}>()
const emit = defineEmits<{
  change: [
    data: {
      h: number
      s: number
      l: number
      a: number
      source: string
    }
  ]
}>()
const gradientColor = computed(() => {
  var rgba = props.value.rgba
  var rgbStr = [rgba.r, rgba.g, rgba.b].join(',')
  return 'linear-gradient(to right, rgba(' + rgbStr + ', 0) 0%, rgba(' + rgbStr + ', 1) 100%)'
})

const handleChange = (e: MouseEvent) => {
  e.preventDefault()
  if (!container.value) {
    return
  }
  var containerWidth = container.value.clientWidth

  var xOffset = container.value.getBoundingClientRect().left + window.pageXOffset
  var pageX = e.pageX
  var left = pageX - xOffset

  var a
  if (left < 0) {
    a = 0
  } else if (left > containerWidth) {
    a = 1
  } else {
    a = Math.round((left * 100) / containerWidth) / 100
  }

  if (props.value.a !== a) {
    emit('change', {
      h: props.value.hsl.h,
      s: props.value.hsl.s,
      l: props.value.hsl.l,
      a: a,
      source: 'rgba'
    })
  }
}

const handleMouseDown = () => {
  window.addEventListener('mousemove', handleChange)
  window.addEventListener('mouseup', handleMouseUp)
}

const unbindEventListeners = () => {
  window.removeEventListener('mousemove', handleChange)
  window.removeEventListener('mouseup', handleMouseUp)
}

const handleMouseUp = () => {
  unbindEventListeners()
}
</script>

<style>
.vc-alpha {
  position: absolute;
  inset: 0;
}

.vc-alpha-checkboard-wrap {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.vc-alpha-gradient {
  position: absolute;
  inset: 0;
}

.vc-alpha-container {
  cursor: pointer;
  position: relative;
  z-index: 2;
  height: 100%;
  margin: 0 3px;
}

.vc-alpha-pointer {
  z-index: 2;
  position: absolute;
}

.vc-alpha-picker {
  cursor: pointer;
  width: 4px;
  border-radius: 1px;
  height: 8px;
  box-shadow: 0 0 2px rgb(0 0 0 / 60%);
  background: #fff;
  margin-top: 1px;
  transform: translateX(-2px);
}
</style>
