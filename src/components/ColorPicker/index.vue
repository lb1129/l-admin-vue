<template>
  <div
    role="application"
    aria-label="Sketch color picker"
    :class="['vc-sketch', disableAlpha ? 'vc-sketch-disable-alpha' : '']"
  >
    <div class="vc-sketch-saturation-wrap">
      <saturation :value="innerValue.hsv" @change="changeHandle"></saturation>
    </div>
    <div class="vc-sketch-controls">
      <div class="vc-sketch-sliders">
        <div class="vc-sketch-hue-wrap">
          <hue :value="innerValue.hsl" @change="changeHandle"></hue>
        </div>
        <div class="vc-sketch-alpha-wrap" v-if="!disableAlpha">
          <alpha :value="innerValue.rgba" @change="changeHandle"></alpha>
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
      <!-- Hex, 8-digit (RGBA) Hex -->
      <div class="vc-sketch-field-double">
        <editableInput
          type="text"
          label="HEX"
          :value="innerValue.hex"
          @change="hexChangeHandle"
        ></editableInput>
      </div>
      <!-- RGB, RGBA -->
      <div class="vc-sketch-field-single">
        <editableInput
          label="R"
          :value="innerValue.rgba.r"
          @change="rgbaSingleChangeHandle($event, 'r')"
        ></editableInput>
      </div>
      <div class="vc-sketch-field-single">
        <editableInput
          label="G"
          :value="innerValue.rgba.g"
          @change="rgbaSingleChangeHandle($event, 'g')"
        ></editableInput>
      </div>
      <div class="vc-sketch-field-single">
        <editableInput
          label="B"
          :value="innerValue.rgba.b"
          @change="rgbaSingleChangeHandle($event, 'b')"
        ></editableInput>
      </div>
      <div class="vc-sketch-field-single" v-if="!disableAlpha">
        <editableInput
          label="A"
          :value="innerValue.rgba.a"
          :step="0.01"
          :max="1"
          :precision="2"
          @change="rgbaSingleChangeHandle($event, 'a')"
        ></editableInput>
      </div>
    </div>
    <div
      class="vc-sketch-presets"
      role="group"
      aria-label="A color preset, pick one to set as current color"
    >
      <div
        v-for="rgba in innerRgbaPresets"
        :key="rgba"
        class="vc-sketch-presets-color"
        :style="{ background: rgba }"
        @click="changeHandle(rgba)"
      >
        <checkboard />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchPostEffect } from 'vue'
import tinycolor, {
  type ColorInputWithoutInstance,
  type ColorFormats,
  type Instance
} from 'tinycolor2'
import editableInput from './common/EditableInput.vue'
import saturation from './common/Saturation.vue'
import hue from './common/Hue.vue'
import alpha from './common/Alpha.vue'
import checkboard from './common/Checkboard.vue'

const props = withDefaults(
  defineProps<{
    value: ColorInputWithoutInstance
    presets?: ColorInputWithoutInstance[]
    disableAlpha?: boolean
    disableFields?: boolean
  }>(),
  {
    disableAlpha: false,
    disableFields: false
  }
)
const emit = defineEmits<{
  'update:value': [data: InnerValueType]
}>()

interface InnerValueType {
  hex: string
  hsl: ColorFormats.HSLA
  hsv: ColorFormats.HSVA
  rgba: ColorFormats.RGBA
}

const toInnerValue = (data: ColorInputWithoutInstance): InnerValueType => {
  let tinycolorInstance: Instance

  if (typeof data === 'string') {
    // Hex, 8-digit (RGBA) Hex 例如：#000 000 #369C 369C #f0f0f6 f0f0f6 #f0f0f688 f0f0f688
    // RGB, RGBA 例如: rgb (255, 0, 0) rgb 255 0 0 rgba (255, 0, 0, .5)
    // HSL, HSLA 例如: hsl(0, 100%, 50%) hsla(0, 100%, 50%, .5) hsl(0, 100%, 50%) hsl 0 1.0 0.5
    // HSV, HSVA 例如: hsv(0, 100%, 100%) hsva(0, 100%, 100%, .5) hsv (0 100% 100%) hsv 0 1 1
    // Named 例如: red blanchedalmond darkblue
    tinycolorInstance = tinycolor(data)
  } else {
    // RGB, RGBA 例如: { r: 255, g: 0, b: 0 } { r: 255, g: 0, b: 0, a: 0.5 }
    // HSL, HSLA 例如: { h: 0, s: 1, l: .5 } { h: 0, s: 1, l: .5, a: 0.5 }
    // HSV, HSVA 例如: { h: 0, s: 100, v: 100 } { h: 0, s: 100, v: 100, a: 0.5 }
    tinycolorInstance = tinycolor(data)
  }

  const hex = tinycolorInstance.toHex()
  const hsl = tinycolorInstance.toHsl()
  const hsv = tinycolorInstance.toHsv()
  const rgba = tinycolorInstance.toRgb()

  return {
    hex,
    hsl,
    hsv,
    rgba
  }
}

const innerValue = ref<InnerValueType>(toInnerValue(props.value))

watchPostEffect(() => {
  innerValue.value = toInnerValue(props.value)
})

const activeColor = computed(() => {
  var rgba = innerValue.value.rgba
  return 'rgba(' + [rgba.r, rgba.g, rgba.b, rgba.a].join(',') + ')'
})

const innerRgbaPresets = computed(() =>
  props.presets ? props.presets.map((preset) => tinycolor(preset).toRgbString()) : []
)

const changeHandle = (color: ColorInputWithoutInstance) => {
  innerValue.value = toInnerValue(color)
  emit('update:value', innerValue.value)
}

const hexChangeHandle = (hex: string | number) => {
  if (typeof hex === 'string' && hex.length >= 6) {
    if (tinycolor(hex).isValid()) {
      changeHandle(hex)
    }
  }
}
const rgbaSingleChangeHandle = (val: string | number, flag: 'r' | 'g' | 'b' | 'a') => {
  const { r, g, b, a } = innerValue.value.rgba
  let res: ColorFormats.RGBA = {
    r,
    g,
    b,
    a
  }
  res[flag] = val as number
  changeHandle(res)
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
