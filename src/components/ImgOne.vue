<template>
  <div class="img-all-wrap wrap" ref="wrap">
    <div class="content">
        <div @click="showSlide(index2)" class="img-all-spanWrap" v-for="(item2, index2) in list" :key="index2">
            <span
                class="img-all-span" 
                :style="{ 
                backgroundImage: 'url(' + item2.Url.replace('{0}', item2.LowSize) + ')',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'inline-block',
                border: '2px solid #fff',
                }" 
            />
        </div>
    </div>
    <div class="bottom">加载数据...</div>
  </div>
</template>

<script>

import { mapState, mapMutations, mapActions } from 'vuex'
import BScroll from 'better-scroll'

export default {
    props: ['imgID', 'colorID', 'pageSize'],
    beforeDestroy() {
        this.setPage(0)
        this.getAllImgB([])
    },
    computed: {
        ...mapState({
            list: state => state.img.allImg,
            page: state => state.img.page,
            done: state => state.img.done
        })
    },
    methods: {
        showSlide(index) {
            this.saveIndex(index)
            this.$emit('update:slideFlag', true)
        },
        ...mapActions({
            // 获取所有图片
            getAllImg: 'img/getAllImg'
        }),
        ...mapMutations({
            setPage: 'img/setPage',
            setDone: 'img/setDone',
            getAllImgB: 'img/getAllImgB',
            saveIndex: 'img/saveIndex'
        })
    },
    mounted() {
        this.$nextTick(() => {
            window.onscroll = () => {
                let bottomHeight = document.querySelector('.bottom') && document.querySelector('.bottom').offsetHeight
                let contentHeight = document.querySelector('.content') && document.querySelector('.content').offsetHeight 
                let nowHeight = document.documentElement.scrollTop + window.innerHeight
                if (nowHeight >= contentHeight) {
                    if (this.done) return 
                    this.setDone(true)
                    const { id } = this.$route.query
                    let num = this.page + 1
                    this.setPage(num)
                    let params = {
                        SerialID: id,
                        ImageID: this.imgID,
                        Page: num,
                        PageSize: this.pageSize || 30,
                        ColorID: this.colorID || ''
                    }
                    this.getAllImg(params)
  
                } 
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.bottom {
    width: 100%;
    height: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #fff;
    padding: 0;
    margin: 0;
    // position: fixed;
    // left: 0;
    // bottom: -40px;
}
.wrap {
    height: 100vh;
}
.content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.img-all-spanWrap {
    float: left;
}
.img-all-span {
    padding: 61px;
}
</style>