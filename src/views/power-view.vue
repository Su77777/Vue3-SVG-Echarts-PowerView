<template>
  <div class="screen-bg">
    <div class="header"></div>
    <div class="left-top">
      <PieEcharts :echartsData="pie"></PieEcharts>
    </div>
    <div class="left-bottom">
      <lineEcharts :echartsData="line"></lineEcharts>
    </div>
    <div class="right-top">
      <RightBottomPanel :panelItems="chargingTop" :percentage="percentage"></RightBottomPanel>
    </div>
    <div class="right-center">
      <BarEcharts :echartsData="bar"></BarEcharts>
    </div>
    <div class="right-bottom">
      <right-bottom-svg :anomalyData="anomaly"></right-bottom-svg>
    </div>
    <div class="center">
      <CenterEcharts></CenterEcharts>
    </div>
    <div class="bottom">
      <BottomPanel :panelItems="charging"></BottomPanel>
    </div>
  </div>
</template>

<script setup>
import {  ref } from 'vue';
import PieEcharts from '../components/pie-echrts.vue'
import lineEcharts from '@/components/line-echarts.vue';
import BarEcharts from '@/components/bar-echarts.vue'
import RightBottomSvg from '@/components/right-bottom-svg.vue'
import CenterEcharts from '@/components/center-echarts.vue'
import BottomPanel from '@/components/bottom-panel.vue'
import RightBottomPanel from '@/components/right-top-panel.vue'

import { PieData } from './config/pie-data'
import { lineData } from './config/line-data.js'
import { barData } from './config/bar-data.js'
import { anomalyData } from './config/anomaly-data'
import {chargingData} from './config/charging-data'
import {chargingTopFourData} from './config/chargingTopfour-data'
import { getPowerScreenData } from '../services/index'

let pie = ref(PieData)
let line = ref(lineData)
let bar = ref(barData)
let anomaly = ref(anomalyData)
let charging = ref(chargingData)
let chargingTop = ref(chargingTopFourData)
let percentage = ref(0)
getPowerScreenData().then(res=>{
  console.log(res);
  pie.value = res.data.chargingPile.data
  line.value = res.data.processMonitoring.data
  bar.value = res.data.chargingStatistics.data
  anomaly.value = res.data.exceptionMonitoring.data
  charging.value = res.data.dataAnalysis.data
  chargingTop.value = res.data.chargingTop4.data
  percentage.value = res.data.chargingTop4.totalPercentage
})


</script>

<style scoped>
.screen-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #070a3c;
  background: url(../assets/images/bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.header {
  position: absolute;
  top: 21px;
  height: 56px;
  width: 100%;
  background-image: url(../assets/images/bg_header.svg);
  background-repeat: no-repeat;
}
.left-top {
  /* 定位 */
  position: absolute;
  left: 16px;
  top: 116px;
  width: 536px;
  height: 443px;
    
  /* 背景 */
  background-image: url(../assets/images/bg_left-top.svg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.left-bottom {
  /* 定位 */
  position: absolute;
  left: 16px;
  bottom: 49px;
  width: 536px;
  height: 443px;
    
  /* 背景 */
  background-image: url(../assets/images/bg_left_bottom.svg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.right-top {
  position: absolute;
  right: 17px;
  top: 96px;
  width: 519px;
  height: 327px;
    
  background-image: url(../assets/images/bg_right_top.svg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.right-center {
  position: absolute;
  right: 17px;
  top: 443px;
  width: 519px;
  height: 327px;

  background-image: url(../assets/images/bg_right_center.svg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.right-bottom {
  position: absolute;
  right: 17px;
  bottom: 49px;
  width: 519px;
  height: 242px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url(../assets/images/bg_right_bottom.svg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.center {
  position: absolute;
  right: 540px;
  bottom: 272px;
  width: 823px;
  height: 710px;
}

.bottom {
  position: absolute;
  right: 540px;
  bottom: 49px;
  width: 823px;
  height: 209px;
    
  background-image: url(../assets/images/bg_bottom.svg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>