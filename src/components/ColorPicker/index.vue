<template>
  <div
    role="application"
    aria-label="Sketch color picker"
    :class="['vc-sketch', disableAlpha ? 'vc-sketch-disable-alpha' : '']"
  >
    <div class="vc-sketch-saturation-wrap">
      <saturation :value="colors" @change="colorChange"></saturation>
    </div>
    <div class="vc-sketch-controls">
      <div class="vc-sketch-sliders">
        <div class="vc-sketch-hue-wrap">
          <hue :value="colors" @change="colorChange"></hue>
        </div>
        <div class="vc-sketch-alpha-wrap" v-if="!disableAlpha">
          <alpha :value="colors" @change="colorChange"></alpha>
        </div>
      </div>
      <div class="vc-sketch-color-wrap">
        <div
          :aria-label="`Current color is ${activeColor}`"
          class="vc-sketch-active-color"
          :style="{ background: activeColor }"
        ></div>
        <checkboard></checkboard>
      </div>
    </div>
    <div class="vc-sketch-field" v-if="!disableFields">
      <!-- rgba -->
      <div class="vc-sketch-field-double">
        <editableInput label="hex" :value="hex" @change="inputChange"></editableInput>
      </div>
      <div class="vc-sketch-field-single">
        <editableInput label="r" :value="colors.rgba.r" @change="inputChange"></editableInput>
      </div>
      <div class="vc-sketch-field-single">
        <editableInput label="g" :value="colors.rgba.g" @change="inputChange"></editableInput>
      </div>
      <div class="vc-sketch-field-single">
        <editableInput label="b" :value="colors.rgba.b" @change="inputChange"></editableInput>
      </div>
      <div class="vc-sketch-field-single" v-if="!disableAlpha">
        <editableInput
          label="a"
          :value="colors.a"
          :arrow-offset="0.01"
          :max="1"
          @change="inputChange"
        ></editableInput>
      </div>
    </div>
    <div
      class="vc-sketch-presets"
      role="group"
      aria-label="A color preset, pick one to set as current color"
    >
      <template v-for="c in presetColors">
        <div
          v-if="!isTransparent(c)"
          class="vc-sketch-presets-color"
          :aria-label="'Color:' + c"
          :key="c"
          :style="{ background: c }"
          @click="handlePreset(c)"
        ></div>
        <div
          v-else
          :key="c + 1"
          :aria-label="'Color:' + c"
          class="vc-sketch-presets-color"
          @click="handlePreset(c)"
        >
          <checkboard />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import tinycolor from 'tinycolor2'
import editableInput from './common/EditableInput.vue'
import saturation from './common/Saturation.vue'
import hue from './common/Hue.vue'
import alpha from './common/Alpha.vue'
import checkboard from './common/Checkboard.vue'

const props = withDefaults(
  defineProps<{
    value: string | object
    presetColors?: string[]
    disableAlpha?: boolean
    disableFields?: boolean
  }>(),
  {
    disableAlpha: false,
    disableFields: false
  }
)
const emit = defineEmits<{
  'update:value': [data: any]
}>()

const _colorChange = (data: any, oldHue?: number) => {
  let color: any

  if (data && data.hsl) {
    color = tinycolor(data.hsl)
  } else if (data && data.hex && data.hex.length > 0) {
    color = tinycolor(data.hex)
  } else if (data && data.hsv) {
    color = tinycolor(data.hsv)
  } else if (data && data.rgba) {
    color = tinycolor(data.rgba)
  } else if (data && data.rgb) {
    color = tinycolor(data.rgb)
  } else {
    color = tinycolor(data)
  }

  if (color && (color._a === undefined || color._a === null)) {
    color.setAlpha(alpha || 1)
  }

  const hsl = color.toHsl()
  const hsv = color.toHsv()

  if (hsl.s === 0) {
    hsv.h = hsl.h = data.h || (data.hsl && data.hsl.h) || oldHue || 0
  }

  return {
    hsl: hsl,
    hex: color.toHexString().toUpperCase(),
    hex8: color.toHex8String().toUpperCase(),
    rgba: color.toRgb(),
    hsv: hsv,
    oldHue: data.h || oldHue || hsl.h,
    source: data.source,
    a: data.a || color.getAlpha()
  }
}
const oldHue = ref(0)
const val = ref(_colorChange(props.value))

const colors = computed({
  get() {
    return val.value
  },
  set(newVal) {
    emit('update:value', newVal)
  }
})

watchEffect(() => {
  val.value = _colorChange(props.value)
})

const hex = computed(() => {
  let hex
  if (colors.value.a < 1) {
    hex = colors.value.hex8
  } else {
    hex = colors.value.hex
  }
  return hex.replace('#', '')
})

const activeColor = computed(() => {
  var rgba = colors.value.rgba
  return 'rgba(' + [rgba.r, rgba.g, rgba.b, rgba.a].join(',') + ')'
})

const colorChange = (data: any, hue?: number) => {
  oldHue.value = colors.value.hsl.h
  colors.value = _colorChange(data, hue || oldHue.value)
}
const isValidHex = (hex: any) => {
  return tinycolor(hex).isValid()
}
const isTransparent = (color: string) => {
  return tinycolor(color).getAlpha() === 0
}
const handlePreset = (c: string) => {
  colorChange({
    hex: c,
    source: 'hex'
  })
}
const inputChange = (data: any) => {
  if (!data) {
    return
  }
  if (data.hex) {
    isValidHex(data.hex) &&
      colorChange({
        hex: data.hex,
        source: 'hex'
      })
  } else if (data.r || data.g || data.b || data.a) {
    colorChange({
      r: data.r || colors.value.rgba.r,
      g: data.g || colors.value.rgba.g,
      b: data.b || colors.value.rgba.b,
      a: data.a || colors.value.rgba.a,
      source: 'rgba'
    })
  }
}
</script>

<style>
.vc-sketch {
  position: relative;
  width: 200px;
  padding: 10px 10px 0;
  box-sizing: initial;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 8px 16px rgb(0 0 0 / 15%);
}

.vc-sketch-saturation-wrap {
  width: 100%;
  padding-bottom: 75%;
  position: relative;
  overflow: hidden;
}

.vc-sketch-controls {
  display: flex;
}

.vc-sketch-sliders {
  padding: 4px 0;
  flex: 1;
}

.vc-sketch-sliders .vc-hue,
.vc-sketch-sliders .vc-alpha-gradient {
  border-radius: 2px;
}

.vc-sketch-hue-wrap {
  position: relative;
  height: 10px;
}

.vc-sketch-alpha-wrap {
  position: relative;
  height: 10px;
  margin-top: 4px;
  overflow: hidden;
}

.vc-sketch-color-wrap {
  width: 24px;
  height: 24px;
  position: relative;
  margin-top: 4px;
  margin-left: 4px;
  border-radius: 3px;
}

.vc-sketch-active-color {
  position: absolute;
  inset: 0;
  border-radius: 2px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 15%), inset 0 0 4px rgb(0 0 0 / 25%);
  z-index: 2;
}

.vc-sketch-color-wrap .vc-checkerboard {
  background-size: auto;
}

.vc-sketch-field {
  display: flex;
  padding-top: 4px;
}

.vc-sketch-field .vc-input-input {
  width: 90%;
  padding: 4px 0 3px 10%;
  border: none;
  box-shadow: inset 0 0 0 1px #ccc;
  font-size: 10px;
}

.vc-sketch-field .vc-input-label {
  display: block;
  text-align: center;
  font-size: 11px;
  color: #222;
  padding-top: 3px;
  padding-bottom: 4px;
  text-transform: capitalize;
}

.vc-sketch-field-single {
  flex: 1;
  padding-left: 6px;
}

.vc-sketch-field-double {
  flex: 2;
}

.vc-sketch-presets {
  margin-right: -10px;
  margin-left: -10px;
  padding-left: 10px;
  padding-top: 10px;
  border-top: 1px solid #eee;
}

.vc-sketch-presets-color {
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  display: inline-block;
  margin: 0 10px 10px 0;
  vertical-align: top;
  cursor: pointer;
  width: 16px;
  height: 16px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 15%);
}

.vc-sketch-presets-color .vc-checkerboard {
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 15%);
  border-radius: 3px;
}

.vc-sketch-disable-alpha .vc-sketch-color-wrap {
  height: 10px;
}
</style>
