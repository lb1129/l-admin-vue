<template>
  <div :class="['vc-hue', 'vc-hue-horizontal']">
    <div
      class="vc-hue-container"
      role="slider"
      aria-valuemin="0"
      aria-valuemax="360"
      ref="container"
      @mousedown="handleMouseDown"
    >
      <div class="vc-hue-pointer" :style="{ left: pointerLeft }" role="presentation">
        <div class="vc-hue-picker"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const props = defineProps<{
  value: { h: number; s: number; l: number; a: number }
}>()

const emit = defineEmits<{
  change: [
    data: {
      h: number
      s: number
      l: number
      a: number
    }
  ]
}>()

const container = ref()
const needKeep = ref(false)

const pointerLeft = computed(() => {
  // https://github.com/bgrins/TinyColor/issues/168
  if (needKeep.value) return '100%'
  return (props.value.h * 100) / 360 + '%'
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

  var h
  var percent

  if (left < 0) {
    h = 0
  } else if (left > containerWidth) {
    h = 360
  } else {
    percent = (left * 100) / containerWidth
    h = (360 * percent) / 100
  }
  needKeep.value = h >= 360

  if (props.value.h !== h) {
    emit('change', {
      h: h,
      s: props.value.s,
      l: props.value.l,
      a: props.value.a
    })
  }
}
const handleMouseDown = () => {
  window.addEventListener('mousemove', handleChange)
  window.addEventListener('mouseup', handleMouseUp)
}
const handleMouseUp = () => {
  unbindEventListeners()
}
const unbindEventListeners = () => {
  window.removeEventListener('mousemove', handleChange)
  window.removeEventListener('mouseup', handleMouseUp)
}
</script>

<style>
.vc-hue {
  position: absolute;
  inset: 0;
  border-radius: 2px;
}

.vc-hue-horizontal {
  background: linear-gradient(
    to right,
    #f00 0%,
    #ff0 17%,
    #0f0 33%,
    #0ff 50%,
    #00f 67%,
    #f0f 83%,
    #f00 100%
  );
}

.vc-hue-vertical {
  background: linear-gradient(
    to top,
    #f00 0%,
    #ff0 17%,
    #0f0 33%,
    #0ff 50%,
    #00f 67%,
    #f0f 83%,
    #f00 100%
  );
}

.vc-hue-container {
  cursor: pointer;
  margin: 0 2px;
  position: relative;
  height: 100%;
}

.vc-hue-pointer {
  z-index: 2;
  position: absolute;
}

.vc-hue-picker {
  cursor: pointer;
  margin-top: 1px;
  width: 4px;
  border-radius: 1px;
  height: 8px;
  box-shadow: 0 0 2px rgb(0 0 0 / 60%);
  background: #fff;
  transform: translateX(-2px);
}
</style>
