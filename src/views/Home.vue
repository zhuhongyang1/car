<template>
  <div class="home" ref="home" >
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <!-- 首页左边列表组件 -->
    <MasterBrandList />
     <!-- 导航组件 -->
    <MasterBrandNav />
    <!-- 车系 -->
    <MasterBrandData />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import { mapActions, mapState } from 'vuex'

// 首页左边列表组件
import MasterBrandList from '@/components/home/MasterBrandList'
// 导航组件
import MasterBrandNav from '@/components/home/MasterBrandNav'
// 车系数据
import MasterBrandData from '@/components/home/MasterBrandData'

export default {
  name: 'home',
  components: {
    // HelloWorld
    MasterBrandList,
    MasterBrandNav,
    MasterBrandData
  },
  methods: {
    ...mapActions({
      getMasterBrandList: 'home/getMasterBrandList'
    }),
    animation() {
      const home = this.$refs.home
      let time = 100
      const timer = setInterval(() => {
        time -= 10
        if (time <= 0) {
          time = 0
          clearInterval(timer)
        }
        home.style.marginLeft = time + '%'
      }, 10)
    }
  },
  created() {
    this.getMasterBrandList()
  },
  mounted() {
    this.animation()
  }

}
</script>

<style lang="scss" scoped>



.home {
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: scroll;
  margin-left: 100%;
}


</style>

 