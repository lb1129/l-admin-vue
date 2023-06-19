<template>
  <div class="vc-editable-input">
    <input
      :aria-labelledby="labelId"
      class="vc-input-input"
      v-model="val"
      @keydown="handleKeyDown"
      @input="update"
      ref="input"
    />
    <span :for="label" class="vc-input-label" :id="labelId">{{ labelSpanText }}</span>
    <span class="vc-input__desc">{{ desc }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const input = ref<HTMLInputElement>()
const props = defineProps({
  label: String,
  labelText: String,
  desc: String,
  value: [String, Number],
  max: Number,
  min: Number,
  arrowOffset: {
    type: Number,
    default: 1
  }
})
const emit = defineEmits(['change'])

const val = computed({
  get() {
    return props.value
  },
  set(v) {
    // TODO: min
    if (!(props.max === undefined) && +(v ?? 0) > props.max) {
      if (input.value) input.value.value = String(props.max)
    } else {
      return v
    }
  }
})

const labelId = computed(
  () => `input__label__${props.label}__${Math.random().toString().slice(2, 5)}`
)

const labelSpanText = computed(() => props.labelText || props.label)

const handleChange = (newVal: string) => {
  let data: Record<string, unknown> = {}
  if (props.label) data[props.label] = newVal
  if (data.hex === undefined && data['#'] === undefined) {
    emit('change', data)
  } else if (newVal.length > 5) {
    emit('change', data)
  }
}

const update = () => {
  handleChange(`${val.value}`)
}

const handleKeyDown = (e: KeyboardEvent) => {
  let number = Number(val.value)

  if (number) {
    let amount = props.arrowOffset || 1

    // Up
    if (e.keyCode === 38) {
      handleChange(`${number + amount}`)
      e.preventDefault()
    }

    // Down
    if (e.keyCode === 40) {
      handleChange(`${number - amount}`)
      e.preventDefault()
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

.vc-input-label {
  text-transform: capitalize;
}
</style>
