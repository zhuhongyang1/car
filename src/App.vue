<template>
  <div id="app">
    <Loading v-show="loadingFlag" /> 
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loading from './components/Loading/Loading'
export default {
  // data(){
  //   return {
  //     loadingFlag: true
  //   }
  // },
  components: {
    Loading
  },
  computed: {
    ...mapState(['loadingFlag'])
  }
}

</script>

<style   >

body, html, #app {
  width: 100%;
}


</style>