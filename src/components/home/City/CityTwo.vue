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
            setCityName: 'city/setCityName',
            setCityFlag: 'city/setCityFlag',
            saveCityID: 'dealer/updateCityID'
        }),
        getCityName(e) {
            const { name, city } = e.target.dataset
           
            this.saveCityID(city)
            this.setCityName(name)
            this.setCityFlag(false)
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