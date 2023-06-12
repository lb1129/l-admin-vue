<template>
  <div class="home">
    <div class="home-chart" ref="chartNode"></div>
    <div class="home-map">
      <position-map @change="changeHandler" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type PositionInfo } from '@/components/PositionMap.vue'
import * as echarts from 'echarts/core'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
// echarts 按需加载使用
echarts.use([GridComponent, TooltipComponent, BarChart, CanvasRenderer])

const chartNode = ref<HTMLElement>()
onMounted(() => {
  // 绘制图表
  const chartNodeRaw = chartNode.value
  if (chartNodeRaw) {
    var myChart = echarts.init(chartNodeRaw)
    // 绘制图表
    myChart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    })
  }
})
const changeHandler = (data: PositionInfo) => {}
</script>

<style scoped lang="less">
.home {
  height: 100%;
  display: flex;

  &-chart {
    flex: 0 0 50%;
  }

  &-map {
    flex: 0 0 50%;
  }
}
</style>
