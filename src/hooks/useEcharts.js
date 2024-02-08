import * as echarts from 'echarts'
import { onMounted, onUnmounted, ref } from 'vue';

export default function useEcharts(echartsEl) {
  const myEcharts = echarts.init(echartsEl,null,{renderer:'svg'})

  onUnmounted(()=>{
    myEcharts.dispose()
  })

  function setOption(option) {
    myEcharts.setOption(option)
  }
  function resizeEcharts() {
    myEcharts.resize()
  }
  return { 
    myEcharts,
    setOption,
    resizeEcharts
  }
}