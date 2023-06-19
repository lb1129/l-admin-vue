<template>
  <div :class="['vc-hue', directionClass]">
    <div
      class="vc-hue-container"
      role="slider"
      :aria-valuenow="colors.hsl.h"
      aria-valuemin="0"
      aria-valuemax="360"
      ref="container"
      @mousedown="handleMouseDown"
    >
      <div
        class="vc-hue-pointer"
        :style="{ top: pointerTop, left: pointerLeft }"
        role="presentation"
      >
        <div class="vc-hue-picker"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
const props = withDefaults(
  defineProps<{
    value: {
      hex: string
      hex8: string
      hsl: { h: number; s: number; l: number; a: number }
      hsv: { h: number; s: number; v: number; a: number }
      rgba: { r: number; g: number; b: number; a: number }
      a: number
    }
    direction?: 'horizontal' | 'vertical'
  }>(),
  {
    direction: 'horizontal'
  }
)
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
const oldHue = ref(0)
const pullDirection = ref('')
const container = ref()

const colors = computed(() => props.value)

watch(colors, (value) => {
  const h = value.hsl.h
  if (h !== 0 && h - oldHue.value > 0) pullDirection.value = 'right'
  if (h !== 0 && h - oldHue.value < 0) pullDirection.value = 'left'
  oldHue.value = h
})

const directionClass = computed(() => ({
  'vc-hue-horizontal': props.direction === 'horizontal',
  'vc-hue-vertical': props.direction === 'vertical'
}))

const pointerTop = computed(() => {
  if (props.direction === 'vertical') {
    if (colors.value.hsl.h === 0 && pullDirection.value === 'right') return 0
    return -((colors.value.hsl.h * 100) / 360) + 100 + '%'
  } else {
    return 0
  }
})

const pointerLeft = computed(() => {
  if (props.direction === 'vertical') {
    return 0
  } else {
    if (colors.value.hsl.h === 0 && pullDirection.value === 'right') return '100%'
    return (colors.value.hsl.h * 100) / 360 + '%'
  }
})

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
  var left = pageX - xOffset
  var top = pageY - yOffset

  var h
  var percent

  if (props.direction === 'vertical') {
    if (top < 0) {
      h = 360
    } else if (top > containerHeight) {
      h = 0
    } else {
      percent = -((top * 100) / containerHeight) + 100
      h = (360 * percent) / 100
    }

    if (colors.value.hsl.h !== h) {
      emit('change', {
        h: h,
        s: colors.value.hsl.s,
        l: colors.value.hsl.l,
        a: colors.value.hsl.a,
        source: 'hsl'
      })
    }
  } else {
    if (left < 0) {
      h = 0
    } else if (left > containerWidth) {
      h = 360
    } else {
      percent = (left * 100) / containerWidth
      h = (360 * percent) / 100
    }

    if (colors.value.hsl.h !== h) {
      emit('change', {
        h: h,
        s: colors.value.hsl.s,
        l: colors.value.hsl.l,
        a: colors.value.hsl.a,
        source: 'hsl'
      })
    }
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
