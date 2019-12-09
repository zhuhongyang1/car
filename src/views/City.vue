<template>
  <div>
    <ul class="ul1">
      <p class="city">自动定位</p>
      <li @click="dw">{{pos.CityName}}</li>
      <p class="city">省市</p>
      <li
        v-for="(item,index) in dataList"
        :key="index"
        @click="cityOne(item.CityID)"
      >{{item.CityName}}</li>
    </ul>
    <div v-if="flag" class="alt" @click="bb">
      <ul>
        <li v-for="(item,index) in alertItem" :key="index" @click="two(item.CityName)">{{item.CityName}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      flag: false,
      id: 0
    };
  },
  computed: {
    ...mapState({
      dataList: state => state.city.cityList,
      alertItem: state => state.city.cityItem,
      pos: state => state.ip.ipData
    })
  },
  components:{

  },
  created() {
    this.getData();
  },
  methods: {
    ...mapActions({
      cityList: "city/cityList",
      cityItem: "city/cityItem",
      ip: "ip/ip"
    }),
    getData() {
      this.cityList();
      this.ip()
    },
    cityOne(id) {
      this.flag = true;
      this.cityList();
      this.cityItem({ provinceid: id });
    },
    dw(){
      this.flag = false;
      this.$emit('update:show', false)
    },
    bb(){
        this.flag = false;
    },
    two(CityName){
        this.$emit('update:show', false)
        this.$emit('update:cityName', CityName)
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
.city {
  width: 100%;
  height: 20px;
  background: #f4f4f4;
  font-size: 12px;
  text-indent: 1em;
  line-height: 20px;
}
ul li {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  text-indent: 1em;
  border-bottom: 1px solid #eee;
  position: relative;
}
.alt{
    width: 100%;
    height: 100%;
    position: fixed;
    right: 0;
    top: 0;
    overflow:auto;
    background: rgba(0,0,0,.6);
    z-index: 101;
}
.ul1 li:after {
  content: "";
  display: inline-block;
  padding-top: 0.16rem;
  padding-right: 0.16rem;
  border-top: 2px solid #999;
  border-right: 2px solid #999;
  transform: rotate(45deg);
  position: absolute;
  right: 0.35rem;
  top: 0.3rem;
}
.alt ul{
  width: 80%;
  height: 100%;
  background: #fff;
  margin-left: 20%;
  overflow-y: auto;
  
}

</style>