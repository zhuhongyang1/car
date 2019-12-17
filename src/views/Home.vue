<template>
  <div class="home" ref="home"  >
    <MasterBrandList />
    <MasterBrandNav />
    <MasterBrandData />
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

import MasterBrandList from '@/components/home/MasterBrandList'
import MasterBrandNav from '@/components/home/MasterBrandNav'
import MasterBrandData from '@/components/home/MasterBrandData'

export default {
  name: 'home',
  components: {
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

 