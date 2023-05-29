<template>
  <div class="position-map" ref="wrapRef">
    <div class="position-map-content" ref="nodeRef"></div>
    <input
      type="text"
      placeholder="搜索位置"
      class="position-map-search-input ant-input"
      ref="suggestRef"
    />
    <div
      class="position-map-search-result"
      :style="{ maxHeight: `${height - distanceBottom}px` }"
      ref="resultRef"
    ></div>
  </div>
</template>

<script lang="ts">
export interface PositionInfo {
  province: string
  city: string
  address: string
  point: {
    lng: number
    lat: number
  }
}
</script>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { useResizeHeight } from '@/composables/resize-height'
const emit = defineEmits<{
  (e: 'change', positionInfo: PositionInfo): void
}>()
const wrapRef = ref<HTMLElement>()
const nodeRef = ref<HTMLElement>()
const suggestRef = ref<HTMLElement>()
const resultRef = ref<HTMLElement>()
const suggestionRef = ref<HTMLElement | null>()
const { height } = useResizeHeight(wrapRef)
const distanceBottom = 200
watchEffect(() => {
  if (suggestionRef.value) {
    suggestionRef.value.style.height = `${height.value - distanceBottom}px`
  }
})
// 绘制地图
onMounted(() => {
  const nodeRaw = nodeRef.value
  if (nodeRaw) {
    const localcity = new BMapGL.LocalCity()
    localcity.get((e) => {
      const map = new BMapGL.Map(nodeRaw)
      const point = new BMapGL.Point(e.center.lng, e.center.lat)
      map.centerAndZoom(point, 13)
      map.enableScrollWheelZoom()

      // 添加比例尺控件
      const scaleControl = new BMapGL.ScaleControl()
      map.addControl(scaleControl)
      // 添加缩放控件
      const zoomControl = new BMapGL.ZoomControl()
      map.addControl(zoomControl)
      // 添加定位控件
      const locationControl = new BMapGL.LocationControl()
      map.addControl(locationControl)
      // 添加3D控件
      const navigationControl3D = new BMapGL.NavigationControl3D()
      map.addControl(navigationControl3D)
      // 添加全景地图控件（AK暂无权限）
      //   const panoramaControl = new BMapGL.PanoramaControl()
      //   map.addControl(panoramaControl)

      // 关键字提示输入
      const autocomplete = new BMapGL.Autocomplete({
        input: suggestRef.value,
        location: map
      })

      // 位置检索
      const localSearch = new BMapGL.LocalSearch(map, {
        renderOptions: {
          map: map,
          panel: resultRef.value
        }
      })
      localSearch.enableAutoViewport()
      localSearch.disableFirstResultSelection()
      localSearch.setInfoHtmlSetCallback((e) => {
        emit('change', {
          province: e.province,
          city: e.city,
          address: e.address,
          point: e.point
        })
        // 当前查看的位置Mark居中
        map.panTo(new BMapGL.Point(e.point.lng, e.point.lat))
      })

      // 关键字提示输入点击后进行位置检索
      autocomplete.onconfirm = (e) => {
        suggestRef.value?.blur()
        const { province, city, district, street, streetNumber, business } = e.item.value
        localSearch.setLocation(`${province}${city}${district}${street}${streetNumber}`)
        localSearch.search(business)
      }

      // autocomplete 无配置获取由BMAP渲染的输入提示列表DOM
      // 暂时先这样处理获取输入提示列表DOM，然后设置其最大高度，防止内容超出容器
      setTimeout(() => {
        // @ts-ignore-next-line
        const suggestionDomId = autocomplete?._suggestion?.mainId
        suggestionRef.value = document.getElementById(suggestionDomId)
      }, 200)
    })
  }
})
</script>

<style scoped lang="scss">
:global(.tangram-suggestion-main) {
  z-index: 5;
  overflow: hidden auto;
}

.position-map {
  position: relative;
  width: 100%;
  height: 100%;

  &-content {
    width: 100%;
    height: 100%;
  }

  &-search-input {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 5;
    width: 30%;
  }

  &-search-result {
    position: absolute;
    top: 52px;
    left: 20px;
    z-index: 5;
    width: 30%;
    overflow: hidden auto;
  }
}
</style>
