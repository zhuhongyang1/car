<template>
  <div class="slideShow-wrap">
    <van-image-preview
        v-model="show"
        :images="imageList"
        @change="onChange"
        :lazyLoad=true
    >
        <template v-slot:index>第{{ index }}页</template>
    </van-image-preview>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    data() {
        return {
            show: true,
            index: 0,
            images: []
        }
    },
    computed: {
        ...mapState({
            list: state => state.img.allImg,
            page: state => state.img.page,
            done: state => state.img.done
        }),
        imageList() {
            return this.list.map(item => {
                return item.Url.replace('{0}', item.HighSize)
            })
        }
    },
    methods: {
        onChange(index) {
            console.log(index)
            // this.index = index;
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