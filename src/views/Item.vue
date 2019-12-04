<template>
  <div class="item">
    <div v-for="(item,index) in one" :key="index">
      <p class="pp0">{{item.GroupName}}</p>
      <dl v-for="(it,ind) in item.GroupList" :key="ind" @click="detail(it.SerialID)">
        <dt>
          <img :src="it.Picture" alt />
        </dt>
        <dd>
          <p>{{it.AliasName}}</p>
          <p>{{it.DealerPrice}}</p>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      one: state => state.item.one
    })
  },
  methods: {
    ...mapActions({
      getAlertList: "item/getAlertList"
    }),
    detail(SerialID){
      this.$router.push({path:'/detail',query:{SerialID}})
    }
  }
};
</script>

<style scoped>
.item {
  width: 277px;
  height: 100%;
  background: #fff;
  position: fixed;
  left: 25%;
  top: 0;
  overflow-y: auto;
}
img {
  width: 90px;
  height: 60px;
  margin-left: 5px;
  margin-right: 10px;
}
.pp0 {
  height: 20px;
  font-size: 14px;
  line-height: 20px;
  background: #f4f4f4;
  color: #717171;
}

dl {
  height: 70px;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  font-size: 16px;
}
dd p:nth-child(1) {
  color: #5f687a;
  font-size: 17px;
}
dd p:nth-child(2) {
  color: #f00;
  font-size: 14px;
  margin-top: 5px;
}
</style>