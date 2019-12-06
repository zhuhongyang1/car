<template>
    <div class="wrap">
      <p class="top"><span>颜色</span><span>车款</span></p>
      <div class="wrap-div" v-for="(item,index) in imgs" :key="index">
        <div v-for="(it,id) in item.List" :key="id" class="little">
          <div :style="{ 'background-image':  'url(' + it.Url + ')', 'background-size': 'cover', 'background-position': 'center'}" class="imgs">
            <p v-if="id==0" class="dw"><span>{{item.Name}}</span><span>{{item.Count}}张></span></p>
          </div>
        </div>
      </div>
    </div>
  
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      w100: '100px'
    }
  },
  computed: {
    ...mapState({
      imgs: state => state.getImgsList.img
    })
  },
  mounted() {
    this.getImgsList(this.$route.query.SerialID);
  },
  methods: {
    ...mapActions({
      getImgsList: "getImgsList/getImgsList"
    })
  }
};
</script>

<style lang="scss" scoped>
 .top{
   height: 40px;
   font-size: 14px;
   display: flex;
   flex-flow: row nowrap;
   justify-content: space-around;
   align-items: center;
 }
.imgs{
  width:123px ;
  height: 123px ;
  margin: 2px;
  
}
.little{
  display: flex;
  float: left;

}
.dw{
  width:123px ;
  height: 123px ;
  background: rgba(56,90,130,.5);
  font-size: 14px;
  color: #fff;
  text-align: center;
}
.dw span:nth-child(1){
  display: block;
  padding-top: 30px;
  padding-bottom: 10px;
}
.dw span:nth-child(2){
 font-size: 13px;
}
</style>