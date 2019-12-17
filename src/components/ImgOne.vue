<template>
  <div class="img-all-wrap wrap" ref="wrap">
    <div class="top" >刷新页面...</div>
    <div class="scroll-wrap">
        <div class="content">
            <div @click="showSlide(index2)" class="img-all-spanWrap" v-for="(item2, index2) in list" :key="index2">
                <span
                    class="img-all-span" 
                    :data-original="item2.Url.replace('{0}', item2.LowSize)"
                    lazyload=true
                />
            </div>
        </div>
    </div>
    <div class="bottom" v-show="loding2">加载数据...</div>
    
    <Loading v-show="loding2" class="loading" />
  </div>
</template>

<script>

import { mapState, mapMutations, mapActions } from 'vuex'
import store from '@/store'
import BScroll from 'better-scroll'
import Loading from '@/components/Loading/Loading'
import LazyLoad from '@/utils/lazyLoad'

export default {
    components: {
        Loading
    },
    props: ['imgID', 'colorID', 'pageSize'],
    beforeDestroy() {
        this.setPage(0)
        this.getAllImgB([])
    },
    watch: {
        list(now) {
            this.$nextTick(() => {
                new LazyLoad(this.bScroll, true)
            })
        }
    },
    computed: {
        ...mapState({
            count: state => state.img.count,
            loding2: state => state.loding2,
            list: state => state.img.allImg,
            page: state => state.img.page,
            done: state => state.img.done,
            myScroll: state => state.img.scroll,
        })
    },
    methods: {
        showSlide(index) {
            this.changeShow(true)
            this.setIndex(index)
            this.$emit('update:slideFlag', true)
        },
        ...mapActions({
            getAllImg: 'img/getAllImg'
        }),
        ...mapMutations({
            setPage: 'img/setPage',
            setDone: 'img/setDone',
            getAllImgB: 'img/getAllImgB',
            
            changeShow: 'sideShow/changeShow',
            setIndex: 'sideShow/setIndex',
            saveScroll: 'img/saveScroll' 
        })
    },
    mounted() {
        let bScroll = new BScroll(('.scroll-wrap'), {
            click: true,
            pullDownRefresh: {
                threshold: 30,
            },
            pullUpLoad: {
                threshold: -100, 
            },
        })
        bScroll.on('pullingUp', () => {
            if (this.done) return 
            this.setDone(true)

            let maxNum = Math.ceil(this.count / 30) 

            let num = this.page + 1
            if (num > maxNum) {
                return
            } 
            this.$store.commit('showLoding2', true)
            this.saveScroll(bScroll)
            const { id } = this.$route.query
            this.setPage(num)
            let params = {
                SerialID: id,
                ImageID: this.imgID,
                Page: num, 
                PageSize: this.pageSize || 30,
                ColorID: this.colorID || ''
            }
            this.getAllImg(params)
            
        })
        bScroll.on('pullingDown', () => {
            if (this.done) return 
            this.setDone(true)
            const { id } = this.$route.query
            let params = {
                SerialID: id,
                ImageID: this.imgID,
                Page: 1,
                PageSize: this.pageSize || 30,
                ColorID: this.colorID || ''
            }
            this.getAllImg([params, true])
          
            bScroll.finishPullDown()
           
            
        })
        this.bScroll = bScroll
        
        
    }
}
</script>

<style lang="scss" scoped>

.loading {
    width: 20px;
    height: 20px;
    top: 97%;
    left: 45%;
    z-index: -1;
}
 
.top {
    top: 0;
}

.bottom {
    bottom: 0;
    left: 6% !important;
}

.scroll-wrap {
    height: 100%;
}
.bottom, .top {
    width: 100%;
    height: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #fff;
    padding: 0;
    margin: 0;
    position: fixed;
    left: 0;
    z-index: -1;
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
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: inline-block;
    border: 1px solid #fff;
}
</style>