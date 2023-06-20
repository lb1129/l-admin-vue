<template>
  <div class="vc-editable-input">
    <input
      class="vc-input-input"
      :value="innerValue"
      @keydown="handleKeyDown"
      @input="inputHandle"
      @blur="blurHandle"
      ref="input"
    />
    <span class="vc-input-label">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watchPostEffect } from 'vue'

const props = withDefaults(
  defineProps<{
    label: string
    value: string | number
    type?: 'text' | 'number'
    max?: number
    min?: number
    step?: number
    precision?: number
  }>(),
  {
    type: 'number',
    max: 255,
    min: 0,
    step: 1,
    precision: 0
  }
)
const emit = defineEmits<{
  change: [value: string | number]
}>()

const input = ref<HTMLInputElement>()
const innerValue = ref<string | number>(props.value)

watchPostEffect(() => {
  innerValue.value = props.value
})

const inputHandle = (e: Event) => {
  // @ts-ignore-next-line
  const inputVal = e.target.value as string
  if (props.type === 'number') {
    // 错误值：不是数字 不在最大最小范围内 小数位数不符合 可一直输入  但是不触发事件
    const numberInputVal = Number(inputVal)
    if (isNaN(numberInputVal)) return
    if (props.max >= 0 && numberInputVal > props.max) return
    if (props.min >= 0 && numberInputVal < props.min) return
    if (props.precision === 0 && inputVal.indexOf('.') > -1) return
    if (props.precision > 0) {
      const reg1 = new RegExp(`^0(\\.[0-9]{0,${props.precision}})?$`)
      const reg2 = new RegExp(`^[1-9]+(\\.[0-9]{0,${props.precision}})?$`)
      if (!reg1.test(inputVal) && !reg2.test(inputVal)) return
    }
    innerValue.value = numberInputVal
    emit('change', numberInputVal)
  } else {
    emit('change', inputVal)
  }
}

// 失去焦点时 把值格式化还原
const blurHandle = (e: Event) => {
  // @ts-ignore-next-line
  const inputVal = e.target.value as string
  if (props.type === 'number') {
    const numberInputVal = Number(inputVal)
    // 不是数字 还原为当前合法值
    if (isNaN(numberInputVal)) {
      if (input.value) input.value.value = String(innerValue.value)
    } else if (props.max >= 0 && numberInputVal > props.max) {
      // 是数字 但是大于最大值 还原为最大值
      if (input.value) input.value.value = String(props.max)
      // 当前合法值不是最大值时 更新当前合法值并派发事件
      if (innerValue.value !== props.max) {
        innerValue.value = props.max
        emit('change', props.max)
      }
    } else if (props.min >= 0 && numberInputVal < props.min) {
      // 是数字 但是小于最小值 还原为最小值
      if (input.value) input.value.value = String(props.min)
      // 当前合法值不是最小值时 更新当前合法值并派发事件
      if (innerValue.value !== props.min) {
        innerValue.value = props.min
        emit('change', props.min)
      }
    } else if (props.precision === 0 && inputVal.indexOf('.') > -1) {
      // 是数字 但是小数位不符合 还原为当前合法值
      if (input.value) input.value.value = String(innerValue.value)
    } else if (props.precision > 0) {
      // 是数字 但是小数位不符合 还原为当前合法值
      const reg1 = new RegExp(`^0(\\.[0-9]{0,${props.precision}})?$`)
      const reg2 = new RegExp(`^[1-9]+(\\.[0-9]{0,${props.precision}})?$`)
      if (!reg1.test(inputVal) && !reg2.test(inputVal)) {
        if (input.value) input.value.value = String(innerValue.value)
      }
    }
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (props.type === 'number') {
    const number = Number(innerValue.value)
    // Up
    if (e.keyCode === 38) {
      e.preventDefault()
      const upValue = number + props.step
      // 计算值小于等于最大值 且 当前合法值不等于最大值 时 更新当前合法值 派发事件
      if (props.max >= 0 && upValue <= props.max && innerValue.value !== props.max) {
        innerValue.value = upValue
        emit('change', upValue)
      }
    }
    // Down
    if (e.keyCode === 40) {
      e.preventDefault()
      const downValue = number - props.step
      // 计算值大于等于最小值 且 当前合法值不等于最小值 时 更新当前合法值 派发事件
      if (props.min >= 0 && downValue >= props.min && innerValue.value !== props.min) {
        innerValue.value = downValue
        emit('change', downValue)
      }
    }
  }
}
</script>

<style>
.vc-editable-input {
  position: relative;
}

.vc-input-input {
  padding: 0;
  border: 0;
  outline: none;
}
</style>
