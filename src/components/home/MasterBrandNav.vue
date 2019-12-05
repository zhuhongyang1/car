<template>
    <div class="master-brand-rightNav"
        ref="container"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
    >
        <p v-for="(item, index) in masterKeys" :key="index">
            {{item}}
        </p>
    </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex'

export default {
    computed: {
        ...mapState({
            masterKeys: state => state.home.masterKeys
        })
    },
    watch: {
        masterKeys () {
        this.$nextTick(() => {
            this.offsetTop = (window.innerHeight - this.$refs.container.offsetHeight) / 2
        })
        }
    },
    methods: {
        touchInit(e) {
            let y = e.touches[0].clientY - this.offsetTop
            let index = Math.floor(y / 30)
            index <= 1 ? index = 1 : index >= this.masterKeys.length - 1 ? index = this.masterKeys.length - 1 : null
            this.scrollToList(this.masterKeys[index])
        },
        ...mapMutations({
            scrollToList: 'home/scrollToList'
        }),
        touchStart(e) {
            this.touchInit(e)
        },
        touchMove(e) {
            this.touchInit(e)

            // 阻止默认事件 - 》页面滚动
            e.preventDefault()
            // console.log('touchMove---', e)
        },
        touchEnd(e) {
            // console.log('touchEnd---', e)
        }
    }
}
</script>

<style lang="scss">
.master-brand-rightNav {
  position: fixed;
  right: 3px;
  top: 50%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  z-index: 99;
  text-align: center;
  
  p {
    font-size: 12px;
    color: #666;
    font-weight: 500;
    padding: 3px;
  }
} 
</style>