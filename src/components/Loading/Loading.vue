<template>
  <div class="loading-wrap" >
          <span :style="{ backgroundImage: 'url(' + img + ')' }"  />
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
    left: 50%;
    top: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translate3d(-50%, -50%, 0);

    span {
        display: block;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
    }
}
</style>