<template>
  <div class="bar-echart" ref="barEchartEl" :style="{width:width,height:height}">
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import useEcharts from '@/hooks/useEcharts';

const props = defineProps({
  width:{
    type:String,
    default:'100%'
  },
  height:{
    type:String,
    default:'100%'
  },
  echartsData:{
    type:Array,
    default:[]
  }
})

let myEcharts = null
let barEchartEl = ref(null)

watch(()=> props.echartsData,(newValue,oldValue)=>{
  setupEcharts(newValue)
})

// 当组件挂在完成时调用echarts核心代码
onMounted(()=>{
  setupEcharts(props.echartsData)
})

// 封装核心Echarts代码
function setupEcharts(echartsData) {
  if(!myEcharts) {
    myEcharts = useEcharts(barEchartEl.value)
  }
  const option  = getOption(echartsData)
  myEcharts.setOption(option)
}

function getOption(echartsData) {
  const categoryName = echartsData.map(item => {
    return item.name
  })
  const categoryData = echartsData.map(item => {
    return item.value
  })
  let option = {
    // backgroundColor: 'rbg(40,46,72)',
    grid: {
      left: "2%",
      right: "5%",
      top: "30%",
      bottom: "5%",
      containLabel: true, // grid 区域是否包含坐标轴的刻度标签
    },
    tooltip: {},
    xAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: "#42A4FF",
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "white",
      },

      data: categoryName,
    },
    yAxis: {
      name: "个",
      nameTextStyle: {
        color: "white",
        fontSize: 13,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#42A4FF",
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#42A4FF",
        },
      },
      axisLabel: {
        color: "white",
      },
    },
    series: [
      {
        name: "销量",
        type: "bar",
        barWidth: 17,
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#01B1FF", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#033BFF", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        data: categoryData,
      },
    ],
  };

  return option
}


</script>

<style lang="less" scoped></style>