<template>
<div>
    <div class="img-wrap" ref="wrap" v-if="wrapFlag">
        <div class="title" ref="title">
            <p @click="setColor">
                <span>
                    <em>
                        {{colorName || '颜色'}}
                    </em>
                </span>
            </p>
            <p @click="setType" >
                <span>
                    <em>
                        {{name || '车款'}}
                    </em>
                </span>
            </p>
        </div>
        <ul class="img-con" v-show="!colorFlag">
            <li v-for="(item1, index1) in list" :key="index1" class="img-li">
                <div class="mark" @click="handlerMark(item1.Id)">
                    <p>{{item1.Name}}</p>
                    <p>{{item1.Count}}张></p>
                </div>
                <div  v-for="(item2, index2) in item1.List" :key="index2">
                    <span 
                    :style="{ 
                    backgroundImage: 'url(' + item2.Url.replace('{0}', 2) + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: '46%',
                    display: 'block',
                    border: '2px solid #fff',
                    }" />
                </div>
            </li>
            <li class="bottom"></li>
        </ul>
        <div v-show="!list.length" class="empty">内容不存在！</div>
        <transition name="scroll-top" >
            <Color v-show="colorFlag" :showColor.sync="colorFlag"/>  
        </transition>  

    </div>
    <imgOne v-if="!wrapFlag" :slideFlag.sync="slideFlag" :imgID="this.imgID" :colorID="this.IDcolor" :pageSize="this.pageSize" /> 
    <van-image-preview
        v-model="slideShow"
        :images="imageList"
        @change="onChange"
        :startPosition="index"
        :loop="false"
    >
        <template v-slot:index>{{index + 1}}/{{count}}</template>
    </van-image-preview>

</div>
</template>

<script>
import Color from '@/components/home/Color/Color'

import ImgOne from '@/components/ImgOne' 
import { mapState, mapActions, mapMutations } from 'vuex'


export default {
    beforeDestroy() {
        this.init()
    },
    data() {
        return {
            colorFlag: false,
            wrapFlag: true,
            pageSize: 30,
            IDcolor: '',
            slideFlag: false,
        }
    },
    components: {
        Color,
        ImgOne,  
    },
    computed: {
        slideShow: {
            get: function () {
                return this.show
            },
            set: function (newValue) {
                this.changeShow(newValue)
            }
        },
        imageList() {
            return this.listImg.map(item => {
                return item.Url.replace('{0}', item.HighSize)
            })
        },
        ...mapState({
         
            listImg: state => state.img.allImg,
            page: state => state.img.page,
            done: state => state.img.done,
            show: state => state.sideShow.show,
            list: state => state.img.list,
            name: state => state.img.name,
            ColorID: state => state.img.ColorID,
            CarId: state => state.img.CarId,
            colorName: state => state.img.colorName,
            page: state => state.img.page,
            count: state => state.img.count,
            index: state => state.sideShow.index,
            imgLen: state => state.img.arrLen
        })
    }, 
    created() {
        this.getId()
    },
    mounted() {
        this.animation()
    },
    watch: {
        ColorID(newQuestion, oldQuestion) {
            this.IDcolor = newQuestion
            this.getImgList({SerialID: this.id})
        },
    },
    methods: {
        handlerMark(imgID) {
            const { id } = this.$route.query
            let num = this.page + 1
            this.setPage(num)
            let params = {
                SerialID: id,
                ImageID: imgID,
                Page: num,
                PageSize: this.pageSize,
                ColorID: this.IDcolor || ''
            }
            this.getAllImg(params)
            this.imgID = imgID 
            this.wrapFlag = false
            
        },
        init() {
            this.setColorName('')
            this.setName('')
            this.setColorID('')
            this.setCarId('')
        },
        ...mapMutations({
            setColorName: 'img/setColorName',
            setName: 'img/setName',
            setColorID: 'img/setColorID',
            setCarId: 'img/setCarId',
            setPage: 'img/setPage',
            changeShow: 'sideShow/changeShow',
            setIndex: 'sideShow/setIndex'
        }),
        animation() {
            const wrap = this.$refs.wrap 
            const title = this.$refs.title 
            let time = 100 
            const timer = setInterval(() => {
                time -= 6
                if (time <= 0) {
                time = 0
                clearInterval(timer)
                }
                wrap.style.marginLeft = time + '%'
                title.style.left = time + '%'
            }, 10)
        },
        onChange(index) {
            this.setIndex(index)
            const { id } = this.$route.query
            let page = this.page + 1
            let maxNum = Math.ceil(this.count / 30)

            if (page > maxNum) return

            if (index >= (this.imgLen - 3)) {
                this.setPage(page)
                let params = {
                    SerialID: id,
                    ImageID: this.imgID,
                    Page: page,
                    PageSize: this.pageSize || 30,
                    ColorID: this.ColorID || ''
                }
                this.getAllImg(params)
            }
        },
        setColor() {
            this.colorFlag = true
        },
        setType() {
            this.$router.push(`type?id=${this.id}`)
        },
        ...mapActions({
            getImgList: 'img/getImgList',
            getAllImg: 'img/getAllImg'
        }),
        getId() {
            this.id = this.$route.query.id
            this.getImgList({SerialID: this.id})
        }
    },
}
</script>

<style scoped lang="scss">



/deep/ .van-image-preview__index {
    position: absolute;
    width: 100%;
    height: 50px;
    line-height: 50px;
    left: 50%;
    top: 68%;
    display: flex;
    justify-content: center;
    font-size: 14px;
}

.scroll-top-enter, .scroll-top-leave-to {
    transform: translate3d(0, 100%, 0)
}

.scroll-top-enter-active, .scroll-top-leave-active {
    transition: transform .3s linear;
}




.empty {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 1111;
    left: 0;
    top: 30%;
    font-size: 26px;
}

.mark {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 50%;
    text-align: center;
    background: rgba(56,90,130,.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;
    
    p:nth-child(1) {
        margin-bottom: 5px;
    }
}

.bottom {
    border-top: 20px solid #f4f4f4;
    width: 100%;
    height: 0;
    position: fixed;
    left: 0;
    bottom: 0;
}

.img-con {
    margin: 50px 0 14px 0;
    box-sizing: border-box;
    
}

.title {
    border-bottom: 10px solid #f4f4f4;
    width: 100%;
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
    background: #fff;
    z-index: 99;
    position: fixed;
    top: 0;
    left: 0;
    p {
        height: 30px;
        line-height: 30px;
        flex:1;
        box-sizing: border-box;
        color: #454545;
        text-align: center;
        font-size: 12px;

        span {
            display: inline-block;
            max-width: 135px;
            line-height: 15px;
        }

        &:after {
            content: "";
            padding-top: 6px;
            padding-right: 6px;
            border-top: 2px solid #ccc;
            border-right: 2px solid #ccc;
            -webkit-transform: rotate(135deg);
            transform: rotate(135deg);
            margin-left: .2rem;
            vertical-align: 5%;
            position: absolute;
            top: 10px;
        }
    }
    
    p:nth-child(2) {
        border-left: 1px solid#ececec;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
    }
}

.img-li {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 6px;
    div{
        width: 33.333333333333333333%;
    }
}

.img-wrap {
    margin-left: 100%;
    
}

.img-wrap, .img-con {
    width: 100%;
    height: 100%;
    overflow: scroll;
}
</style>