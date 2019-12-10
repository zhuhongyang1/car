<template>
  <div class="loading-wrap" >
      <div class="con">
          <span :style="{ backgroundImage: 'url(' + img + ')' }"  />
      </div>
  </div>
</template>

<script>
import Loading from '../../assets/loading.gif'
export default {
    data() {
        return {
            img: Loading
        }
    }
}
</script>

<style lang="scss" scoped>
.loading-wrap {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 99999;
    left: 0;
    top: 0;
    // background: rgba(0,0,0,.6);
    display: flex;
    justify-content: center;
    align-items: center;
    
    .con {
        // width: 180px;
        // height: 180px;
        // overflow: hidden;
        // position: relative;
    }
    span {
        display: block;
        width: 50px;
        height: 50px;
        background-size: cover;
        background-position: center;
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate3d(-50%, -50%, 0);
        margin-top: 50px;
    }
}
</style>