<template>
  <div class="slideShow-wrap">
    SlideShow
    {{list}}
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    computed: {
        ...mapState({
            list: state => state.img.allImg,
            page: state => state.img.page,
            done: state => state.img.done
        })
    },
    mounted() {
        window.onload = (ev) => {
            console.log(ev)
        }
    }
}
</script>

<style lang="scss" scoped>
    .slideShow-wrap {
        width: 100%;
        height: 100%;
        // background: #000;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1111111;
    }
</style>