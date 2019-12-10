<template>
  <div>
      经销商
      {{cityID}}
      {{carID}}
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState({
            // 获取城市ID
            cityID: state => state.city.cityID,
            // 获取汽车ID
            carID: state => state.img.saveCarId
        })
    },
    methods: {
        ...mapActions({
            getDealerList: 'dealer/getDealerList'
        }),
        dealerList() {
            // 激活 vuex 获取经销商列表
            this.getDealerList()
        }
    },  
    created() {
        this.dealerList()
    }
}
</script>

<style>

</style>