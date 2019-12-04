<template>
  <div class="box">
    <div v-for="(value, key) in list" :key="key" class="qwe">
      <p :id="key" class="top">{{key}}</p>
      <dl v-for="(item,index) in value" :key="index" @click="fn(item.MasterID)">
        <dt>
          <img :src="item.CoverPhoto" v-lazy="item.CoverPhoto" alt />
        </dt>
        <dd>{{item.Name}}</dd>
      </dl>
    </div>

    <div class="right" 
      ref="right"
      @touchstart = 'touchStart'
      @touchmove = 'touchMove'
    >
  
      <span v-for="(item,index) in listArr" :key="index" >
        {{item}}
      </span>
    </div>
    <Item v-show="flag" />
  </div>
</template>

<script scoped>
import { mapActions, mapState } from "vuex";
import Item from "./Item";

export default {
  watch: {
    listArr() {
      this.offsetTop = ( window.innerHeight - this.$refs.right.offsetHeight ) / 2   
    }
  },
  data() {
    return {
      flag: false
    };
  },
  components: {
    Item
  },
  computed: {
    ...mapState({
      list: state => state.home.list,
      listArr: state => state.home.listArr
    })
  },
  methods: {
    ...mapActions({
      getMasterBrandList: "home/getMasterBrandList"
    }),
    ...mapActions({
      getAlertList: "item/getAlertList"
    }),
    fn(id) {
      this.flag = true;
      this.id = id;
      this.getAlertList(id);
    },
    init (e) {
      const clientY =  e.touches[0].clientY 
      const height = clientY - this.offsetTop
      let index = Math.floor( height / 38 )
      index <= 1 ? index = 1 : index >= this.listArr.length - 1 ? index = this.listArr.length - 1 : null
      const el = document.querySelector('#' + this.listArr[index])
      const y = el.offsetTop
      window.scrollTo(0, y)
    },
    touchStart(e) {
      this.init(e)
    },
          
      // @touchend = 'touchEnd'
    touchMove(e) {
      this.init(e)

    },
    // touchEnd(e) {}
   
  },
  created() {
    // 获取首页的数据
    this.getMasterBrandList();
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
html,
body {
  width: 100%;
  height: 100%;
}
.box {
  width: 100%;
}
.qwe {
  width: 375px;
  color: #000;
}
.top {
  width: 375px;
  height: 20px;
  font-size: 14px;
  line-height: 20px;
  background: #f4f4f4;
  padding-left: 15px;
  color: #aaa;
}
dl {
  width: 345px;
  height: 50px;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  font-size: 16px;
  padding-left: 15px;
}
dd {
  margin-left: 20px;
}
img {
  width: 40px;
  height: 40px;
}
.right {
  width: 32.22px;
  height: 396px;
  position: fixed;
  right: -12px;
  top: 50%;
  transform: translateY(-50%);
  padding-left: 10px;
}
.right span {
  width: 22.22px;
  height: 18px;
  display: block;
  font-size: 12px;
  color: #666;
  padding: 1px 5px;
}
a {
  color: #666;
}
</style>