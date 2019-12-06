<template>
  <div class="carSeries-item">
    <div @click="toDetail" class="carSeries-list" v-for="(item, index) in list" :key="index">
        <p class="carSeries-list-p">{{item.GroupName}}</p>
        <dl :data-id="item2.SerialID" class="carSeries-list-dl" v-for="(item2, i) in item.GroupList" :key="i">
            <dt :data-id="item2.SerialID">
                <img :src="item2.Picture" alt="" :data-id="item2.SerialID">
            </dt>
            <dd :data-id="item2.SerialID">
                <p :data-id="item2.SerialID">{{item2.AliasName}}</p>
                <p :data-id="item2.SerialID">{{item2.DealerPrice}}</p>
            </dd>
        </dl>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    computed: {
         ...mapState({
            // 根据id获取车系数据
            list: state => state.carSeries.carSeriesList
        })
    },
    methods: {
        ...mapMutations({
            isShow: 'carSeries/isShow'
        }),
        toDetail(e) {
            const { id } = e.target.dataset
            this.isShow(false)
            this.$router.push(`detail?id=${id}`)
        }
    }
}
</script>

<style lang="scss" scoped>
.carSeries-list-dl {
    display: flex;
    box-sizing: border-box;
    border-bottom: 1px solid #ddd;
    padding: 2px 0;
    dt {
        width: 90px;
        height: 60px;
        margin: 3px 5px 4px 15px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    dd {
        display: flex;
        flex-direction: column;
        justify-content: center;    
        p {
            font-size: 18px;
            color: #5f687a;     
        }
        p:nth-child(2) {
            margin-top: 10px;
            font-size: 14px;
            color: red;
        }
    }
}
.carSeries-list-p {
    margin-left: 1px;
    font-size: 14px;
    line-height: 20px;
    background: #f2f2f2;
    padding: 2px 0 3px 15px;
    color: #717171;
}
</style>