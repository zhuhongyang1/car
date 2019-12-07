<template>
  <div class="img-wrap" ref="wrap">
    <div class="title" ref="title">
        <p @click="setColor">颜色</p>
        <p @click="setType" >{{name || '车款'}}</p>
    </div>
    <ul class="img-con">
        <li v-for="(item1, index1) in list" :key="index1" class="img-li">
            <div class="mark">
                <p>{{item1.Name}}</p>
                <p>{{item1.Count}}张></p>
            </div>
            <div  v-for="(item2, index2) in item1.List" :key="index2">
                <span 
                :style="{ 
                backgroundImage: 'url(' + item2.Url + ')',
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
    <div v-if="!list.length" class="empty">内容不存在！</div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState({
            list: state => state.img.list,
            name: state => state.img.name
        })
    },
    created() {
        this.getId()
    },
    mounted() {
        this.animation()
    },
    methods: {
        // 动画
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
        setColor() {
            this.$router.push(`color?id=${this.id}`)
        },
        setType() {
            this.$router.push(`type?id=${this.id}`)
        },
        ...mapActions({
            getImgList: 'img/getImgList'
        }),
        getId() {
            this.id = this.$route.query.id
            this.getImgList({SerialID: this.id})
        }
    },
}
</script>

<style scoped lang="scss">

.empty {
    width: 100%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 1111;
    left: 0;
    top: 50px;
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
    // box-sizing: border-box;
    z-index: 99;
    position: fixed;
    top: 0;
    left: 0;
    p {
        height: 25px;
        flex:1;
        box-sizing: border-box;
        color: #454545;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        &:after {
            content: "";
            margin-top: -4px;
            display: inline-block;
            padding-top: 6px;
            padding-right: 6px;
            border-top: 2px solid #ccc;
            border-right: 2px solid #ccc;
            -webkit-transform: rotate(135deg);
            transform: rotate(135deg);
            margin-left: .2rem;
            vertical-align: 5%;
        }
    }
    
    p:nth-child(2) {
        border-left: 1px solid#ececec;
    }
}

.img-li {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 6px;
    div{
        width: 33.333333333333333333%;
        // padding:33% 0 0;
    }
}

.img-wrap {
    margin-left: 100%;
    // position: absolute;
    // top: 0;
}

.img-wrap, .img-con {
    width: 100%;
    height: 100%;
    overflow: scroll;
}
</style>