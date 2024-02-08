import { onMounted, onUnmounted } from 'vue';
import _ from 'loadsh'
export default function useScalePage(option) {
  const resizeFunc = _.throttle(()=>{
    triggerScale()
  },100)
  //组件挂在完成后开始计算屏幕宽高
  onMounted(()=>{
    triggerScale()
    window.addEventListener('resize',resizeFunc)
  })
  // 组件卸载后取消监听
  onUnmounted(()=>{
    window.removeEventListener('resize',resizeFunc)
  })
  function triggerScale() {
    // 设计稿尺寸
    const layoutX = option.layoutX | 1920
    const layoutY = option.layoutY | 1080
    const layoutRatio = option.layoutRatio | 16 / 9
  
    // 拿到当前设备的宽度
    const currentX = document.documentElement.clientWidth || document.body.clientWidth
    const currentY = document.documentElement.clientHeight || document.body.clientHeight
    // 计算缩放比例
    let scaleRatio = currentX / layoutX //参照宽度进行缩放
    let currentRatio = currentX / currentY //宽高的比例
  
    //超宽屏
    if(currentRatio > layoutRatio) {
      scaleRatio = currentY / layoutY //参照高度进行缩放
      document.body.style = `width:${layoutX}px;height:${layoutY}px;transform:scale(${scaleRatio}) translateX(-50%); left:50%`
    } else {
      document.body.style = `width:${layoutX}px;height:${layoutY}px;transform:scale(${scaleRatio})`
    }
  }
}