<template>
  <div class="matser-brand-data-drawer" 
    ref="drawer"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
  >
    
    <!-- 引入item组件 -->
    <CarseriesItem />

    
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
        const drawer = this.$refs.drawer
        if (newQuestion) {
            drawer.classList.add('active')
            drawer.classList.remove('activeEnd')
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
          // 获取 点击时的的坐标 - 本身的offsetLeft
          this.startX = e.touches[0].clientX - drawer.offsetLeft 
          // 获取本身的offsetLeft
          this.offsetLeft = drawer.offsetLeft
          // 获取 点击时的位置
          this.start = e.touches[0].clientX
      },
      touchMove(e) {
        const drawer = this.$refs.drawer
        // 获取现在的x
        let moveX = e.touches[0].clientX - this.startX
        // 获取 移动减去点击时的距离
        const disX = e.touches[0].clientX - this.start
        // 如果距离大于100 则判断为要隐藏 
        if (disX >= 300) {
          this.hide = true 
        } else {
          moveX <= this.offsetLeft ? moveX = this.offsetLeft : null 
          drawer.style.left = moveX + 'px'
        }

      },  
      touchEnd(e) {
        if (this.hide) {
          this.isShow(false)
          const drawer = this.$refs.drawer
          drawer.style.left = '25%'
          drawer.classList.add('activeEnd')
          this.hide = false
        }
      }
    }

    
}
</script>

<style lang="scss" scoped>

.matser-brand-data-drawer {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    position: fixed;
    left: 100%;
    // left: 25%;
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