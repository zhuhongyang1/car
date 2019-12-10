<template>
  <div class="city-one-wrap">
    <div class="city-wrap">
        <div class="location">
            <p>自动定位</p>
            <div class="defaultCity" @click="getCityName(defaultCity.CityName)">{{defaultCity.CityName}}</div>
        </div>
        <div class="list">
            <p>省市</p>
            <ul @click="showCityTwo">
                <li :data-id="item.CityID" v-for="(item, index) in cityList" :key="index">
                    {{item.CityName}}
                </li>
            </ul>
        </div>
    </div>
    
    <!-- 引入二级城市 -->
    <transition name="scroll-left">
        <CityTwo  v-show="cityFlag" :cityFlag.sync="cityFlag" > </CityTwo>
    </transition>
    <!-- 二级城市mark -->
    <div @click="closeCityTwo" v-show="cityFlag" class="city-two-mark"></div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

// 引入 二级城市 组件
import CityTwo from './CityTwo'

export default {
    data() {
        return {
            cityFlag: false
        }
    },
    components: {
        CityTwo
    },
    computed: {
        ...mapState({
            cityList: state => state.city.cityList,
            defaultCity: state => state.city.defaultCity,
        })
    },
    methods: {
        ...mapMutations({
            // 设置城市名称
            setCityName: 'city/setCityName',
            // 设置主组件的标识
            setCityFlag: 'city/setCityFlag'
        }),
        // 获取城市名称
        getCityName(name) {
            // 设置城市名称
            this.setCityName(name)
            // 关闭主组件
            this.setCityFlag(false)
            // 关闭父组件
            // this.$emit('update:cityFlag', false)
        },
        // 点击自动选择的城市时
        closeFather() {
            alert(1)
        },
        // 关闭二级城市
        closeCityTwo() {
            this.cityFlag = false
        },
        ...mapActions({
            getList: 'city/getCityListOne'
        }),
        showCityTwo(e) {
            const { id } = e.target.dataset
            this.getList({ provinceid: id })
            this.cityFlag = true
        }
    }

}
</script>

<style lang="scss" scoped>
 
.city-two-mark {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 101;
    background: rgba(0,0,0,.6);
}

.city-one-wrap {
    width: 100%;
    height: 100%;
    background: #fff;
    position: absolute;
    left: 0;
    top: 0;
}

.scroll-left-enter, .scroll-left-leave-to {
    transform: translate3d(100%, 0, 0);
}

.scroll-left-enter-active, .scroll-left-leave-active {
    transition: transform .1s linear; 
}

.city-wrap {
    width: 100%;
    height: 100%;
    overflow-y: auto;
}

.list p, .location p {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    padding-left: 10px;
    background: #f4f4f4;
} 

.list ul li, .defaultCity {
    padding-left: 15px;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    margin-left: 5px;
    position: relative;
}

.list ul li:after {
    content: "";
    display: inline-block;
    padding-top: 8px;
    padding-right: 8px;
    border-top: 1px solid #999;
    border-right: 1px solid #999;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    position: absolute;
    right: 17.5px;
    top: 15px;
}

.city-wrap {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
</style>