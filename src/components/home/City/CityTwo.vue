<template>
    <div class="city-two-wrap">
        <ul class="city-list" @click="getCityName">
            <li :data-name="item.CityName" :data-city="item.CityID" v-for="(item, index) in cityList" :key="index">
                {{item.CityName}}
            </li>
        </ul>
    </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex'

export default {
    computed: {
        ...mapState({
            cityList: state => state.city.cityList2
        })
    },
    methods: {
        ...mapMutations({
            // 设置城市名称
            setCityName: 'city/setCityName',
            // 设置主组件的标识
            setCityFlag: 'city/setCityFlag',
            // 保存城市id
            saveCityID: 'dealer/updateCityID'
        }),
        // 获取城市名称
        getCityName(e) {
            const { name, city } = e.target.dataset
            // 保存城市ID
            // console.log(city)
            this.saveCityID(city)
            // 设置城市名称
            this.setCityName(name)
            // 关闭主组件
            this.setCityFlag(false)
            // 关闭父组件
            this.$emit('update:cityFlag', false)
        }
    },
}
</script>

<style lang="scss" scoped>

.city-list {
    height: 100%;
    overflow-y: auto;
}

.city-list li {
    padding-left: 15px;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    margin-left: 5px;
}

.city-two-wrap {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 30%;
    top: 0;
    background: #fff;
    z-index: 1111;
}

</style>