<template>
  <div
    class="vc-saturation"
    :style="{ background: bgColor }"
    ref="container"
    @mousedown="handleMouseDown"
  >
    <div class="vc-saturation-white"></div>
    <div class="vc-saturation-black"></div>
    <div class="vc-saturation-pointer" :style="{ top: pointerTop, left: pointerLeft }">
      <div class="vc-saturation-circle"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { throttle } from 'lodash-es'

const props = defineProps<{
  value: { h: number; s: number; v: number; a: number }
}>()
const emit = defineEmits<{
  change: [
    data: {
      h: number
      s: number
      v: number
      a: number
    }
  ]
}>()

const container = ref()
const bgColor = computed(() => `hsl(${props.value.h}, 100%, 50%)`)
const pointerTop = computed(() => -(props.value.v * 100) + 1 + 100 + '%')
const pointerLeft = computed(() => props.value.s * 100 + '%')

const clamp = (value: number, min: number, max: number) => {
  return min < max
    ? value < min
      ? min
      : value > max
      ? max
      : value
    : value < max
    ? max
    : value > min
    ? min
    : value
}

const handleChange = (e: MouseEvent) => {
  e.preventDefault()
  if (!container.value) {
    return
  }
  var containerWidth = container.value.clientWidth
  var containerHeight = container.value.clientHeight

  var xOffset = container.value.getBoundingClientRect().left + window.pageXOffset
  var yOffset = container.value.getBoundingClientRect().top + window.pageYOffset
  var pageX = e.pageX
  var pageY = e.pageY
  var left = clamp(pageX - xOffset, 0, containerWidth)
  var top = clamp(pageY - yOffset, 0, containerHeight)
  var saturation = left / containerWidth
  var bright = clamp(-(top / containerHeight) + 1, 0, 1)

  throttle(
    () => {
      emit('change', {
        h: props.value.h,
        s: saturation,
        v: bright,
        a: props.value.a
      })
    },
    20,
    {
      leading: true,
      trailing: false
    }
  )()
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
.vc-saturation,
.vc-saturation-white,
.vc-saturation-black {
  cursor: pointer;
  position: absolute;
  inset: 0;
}

.vc-saturation-white {
  background: linear-gradient(to right, #fff, rgb(255 255 255 / 0%));
}

.vc-saturation-black {
  background: linear-gradient(to top, #000, rgb(0 0 0 / 0%));
}

.vc-saturation-pointer {
  cursor: pointer;
  position: absolute;
}

.vc-saturation-circle {
  cursor: head;
  width: 4px;
  height: 4px;
  box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgb(0 0 0 / 30%), 0 0 1px 2px rgb(0 0 0 / 40%);
  border-radius: 50%;
  transform: translate(-2px, -2px);
}
</style>
