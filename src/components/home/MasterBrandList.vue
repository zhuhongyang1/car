<template>
  <div class="master-brand-list-wrap">
      <ul class="master-brand-list-ul" @click="carSeries">
        <li v-for="(value, key) in masterBrandObj" :key="key">
          <p :class="key">{{key}}</p>
          <div :data-id="item.MasterID" v-for="(item, index) in value" :key="index" >
            <img :data-id="item.MasterID" v-lazy="item.CoverPhoto" alt="">
            <span :data-id="item.MasterID" >{{item.Name}}</span>
          </div>
        </li>
      </ul>
  </div>
 
</template>

<script>

import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      masterBrandObj: state => state.home.masterBrandObj,
      listElement: state => state.home.listElement
    })
  },
  watch: {
    listElement(newQuestion, oldQuestion) {
      this.$nextTick(() => {
        const y = document.querySelector('.' + newQuestion).offsetTop
        window.scrollTo(0, y)  
      })    
    }
  },
  methods: {
    ...mapMutations({
      isShow: 'carSeries/isShow'
    }),
    ...mapActions({
      getCarSeries: 'carSeries/getCarSeries'
    }),
    carSeries(e) {
      _hmt.push(['_trackEvent', '首页', '首页', '组件弹框']);
      const id = e.target.dataset.id
      this.isShow(true)
      this.getCarSeries(id)
    }
  }
}

</script>

<style lang="scss" scoped>

.master-brand-list-wrap {
  position: relative;  
}

.master-brand-list-ul  {

  li p {
    height: 20px;
    line-height: 20px;
    background: #f4f4f4;
    padding-left: 15px;
    color: #aaa;
    font-size: 14px;
  }
  div {
    display: flex;
    align-items: center;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    box-sizing: border-box;
    border-bottom: 1px solid #ddd;
    -webkit-box-align: center;
    align-items: center;
    margin: 0 15px;
    img {
      width: 40px;
      height: 40px;
      margin-right: 20px;
    }
  }
  div:nth-last-child(1) {
    border-bottom: none;
  }
}
</style>