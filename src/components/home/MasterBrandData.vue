<template>
  <div class="matser-brand-data-wrap">
    <div class="matser-brand-data-drawer" 
      ref="drawer"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      
      <!-- 引入item组件 -->
      <CarseriesItem />

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import CarseriesItem from './MasterBrandData/CarseriesItem'

export default {
    components: {
      CarseriesItem
    },
    computed: {
      // 获取 show 
      ...mapState({
        show: state => state.carSeries.show,
      })
    },
    watch: {
      // watch监听show，如果show改变了，那么就是点击了页面，需要调车系的弹窗
      show(newQuestion, oldQuestion) {
        // 如果drawer存在，并且也点击了页面，那么就操作DOM添加class名
        const drawer = this.$refs.drawer
        if (drawer && newQuestion) {
          drawer.classList.add('active')
          drawer.classList.remove('activeEnd')
          drawer.style.left = '25%'
        } else {
          drawer.classList.remove('active')
        }
      }
    },
    methods: {
      ...mapMutations({
        isShow: 'carSeries/isShow'
      }),
      touchStart(e) {
          // 需要操作drawer，使用refs 获取DOM
          const drawer = this.$refs.drawer
          // 获取 点击时的 x坐标
          this.touchStart = e.touches[0].clientX
          // 获取 点击时的 drawer 距离左边多少
          this.offsetLeft = drawer.offsetLeft
      },
      touchMove(e) {
          // 需要操作drawer，使用refs 获取DOM
          const drawer = this.$refs.drawer
          // 获取移动的  x
          const x = e.touches[0].clientX
          // 获取 不断移动-点击 时的距离 = 移动了多长
          const disX = x - this.touchStart
          // 此时 drawer的 left 就是 this.offsetLeft + disX
          let left = this.offsetLeft + disX
          // 计算边界情况
          left >= 640 ? left = 640 : left <= this.offsetLeft ? left = this.offsetLeft : null
          // 如果超出边界，那么把标识改为false
          left >= 640 ? this.isShow(false) : null
          // 赋值
          drawer.style.left = left + 'px'
        
          // console.log('touchMove---', e)
      },  
      touchEnd(e) {
          const drawer = this.$refs.drawer
          drawer && drawer.classList.add('activeEnd')
          this.isShow(false) 
          // console.log('touchEnd---', e)
      }
    }

    
}
</script>

<style lang="scss" scoped>

.matser-brand-data-drawer {
    width: 75%;
    height: 100%;
    overflow-y: scroll;
    position: fixed;
    left: 100%;
    top: 0;
    z-index: 9999;
    background: #fff;
}
.active {
  left: 25%;
  transition: left .3s;
}

.activeEnd {
  left: 100% !important;
  transition: left .3s;
}
</style>