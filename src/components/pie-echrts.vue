<template>
  <div class="pie-echrts" ref="pieEcharts" :style="{width:width,height:height}">
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

const pieEcharts = ref(null)
let myEcharts = null
// 监听echartsData数据发生变化
watch(()=>props.echartsData,(newValue,oldValue)=>{
  setupEcharts(newValue)
})

// 当组件挂在完成时调用echarts核心代码
onMounted(()=>{
  setupEcharts(props.echartsData)
})

// 封装核心Echarts代码
function setupEcharts(echartsData) {
  if(!myEcharts) {
    myEcharts = useEcharts(pieEcharts.value)
  }

  const option  = getOption(echartsData)
  
  myEcharts.setOption(option)
}

// 饼图配置
function getOption(pieDatas = []) {

  let colors = pieDatas.map((item) => {
    return item.color;
  });

  let data = pieDatas.map((item) => {
    return {
      value: item.value,
      name: item.name,
    };
  });

  let total = pieDatas.reduce((a, b) => {
    return a + b.value * 1;
  }, 0);

  let option = {
    color: colors,
    title: {
      text: `{nameSty| 充电桩总数}\n{number|${total}}`,
      top: "50%",
      left: "30%",
      textStyle: {
        rich: {
          nameSty: {
            fontSize: 19,
            color: "white",
            padding: [10, 0],
          },
          number: {
            fontSize: 24,
            color: "white",
            padding: [4, 0, 0, 20],
          },
        },
      },
    },
    legend: {
      orient: "vertical",
      right: "8%",
      top: "18%",
      itemGap: 20,
      itemWidth: 16,
      itemHeigth: 16,
      icon: "rect",
      formatter: function (name) {
        var currentItem = pieDatas.find((item) => item.name === name);
        return (
          "{nameSty|" +
          currentItem.name +
          "}\n" +
          "{numberSty|" +
          currentItem.value +
          "个 }" +
          "{preSty|" +
          currentItem.percentage +
          "}"
        );
      },
      textStyle: {
        rich: {
          nameSty: {
            fontSize: 12,
            color: "#FFFFFF",
            padding: [10, 14],
          },
          numberSty: {
            fontSize: 12,
            color: "#40E6ff",
            padding: [0, 0, 0, 14],
          },
          preSty: {
            fontSize: 12,
            color: "#40E6ff",
          },
        },
      },
    },
    series: [
      {
        type: "pie",
        center: ["40%", "57%"],
        radius: ["30%", "75%"],
        label: {
          show: false,
        },
        data: data,
        roseType: "area",
      },
    ],
  };

  return option
  }
</script>

<style lang="less" scoped></style>