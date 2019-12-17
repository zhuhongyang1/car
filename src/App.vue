<template>
  <div id="app">
    <Loading class="loadingFirst" v-show="loadingFlag"  /> 
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loading from './components/Loading/Loading'
export default {
  components: {
    Loading
  },
  computed: {
    ...mapState(['loadingFlag'])
  }
}
</script>

<style lang="scss" scoped  >
.loadingFirst {
  width: 50px;  
  height: 50px;
}
body, html, #app {
  width: 100%;
}
</style>