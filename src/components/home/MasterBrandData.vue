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
      ...mapState({
        show: state => state.carSeries.show,
      })
    },
    watch: {
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
          const drawer = this.$refs.drawer
          this.startX = e.touches[0].clientX - drawer.offsetLeft 
          this.offsetLeft = drawer.offsetLeft
          this.start = e.touches[0].clientX
      },
      touchMove(e) {
        const drawer = this.$refs.drawer
        let moveX = e.touches[0].clientX - this.startX
        const disX = e.touches[0].clientX - this.start
        if (disX >= 200) {
          moveX <= this.offsetLeft ? moveX = this.offsetLeft : null 
          drawer.style.left = moveX + 'px'
        }
        if (disX >= 50) {
          this.hide = true 
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