<template>
  <div class="type">
      <div class="type-title-btn" @click="goBack">
        全部车款
      </div>
      <div class="con-div" >
        <span @click="tab(index, item)" :class="{ active: actives === index }" v-for="(item, index) in yearList" :key="index">{{item}}</span>
      </div>
      <div class="con-con" >
        <div v-for="(item, index) in dataObj[item]" :key="index" class="item">
          <p class="con-key-p">{{/^\//.test(item.key) ? '' : item.key}}</p>
          <div @click="setCar" :data-name="item2.key1" :data-id="item2.id" class="con-con-div" v-for="(item2, i2) in item.list" :key="i2">
            <p :data-name="item2.key1" :data-id="item2.id" class="p1">{{item2.key1}}</p>
            <p :data-name="item2.key1" :data-id="item2.id" class="p2">{{item2.key2}}</p>
            <p :data-name="item2.key1" :data-id="item2.id">
              <span  :data-name="item2.key1" v-for="(item3, i3) in item2.key3" :key="i3">
                {{item3}}
              </span>
            </p>
            <button  :data-name="item2.key1" :data-id="item2.id" class="con-con-btn">{{carObj.BottomEntranceTitle}}</button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
// 引入 vuex 的辅助方法
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  data() {
    return {
      actives: 0,
      item: ''
    }
  },
  computed: {
    ...mapState({
      // 年份
      yearList: state => state.detail.year,
      // 多个汽车详情数据
      dataObj: state => state.detail.dataObj,
      // 单个汽车详情
      carObj: state => state.detail.car,
      
    })
  },
  methods: {
    // car Id 
    setCar(e) {
      const { id, name } = e.target.dataset
      this.setCarId(id)
      this.setName(name)
      window.history.back()
    },
    ...mapMutations({
      setCarId: 'img/setCarId',
      setName: 'img/setName'
    }),
    // 回退页面
    goBack() {
      this.$emit('update:showType', false)
      // window.history.back()
    },
    // tab切换
    tab(i, item) {
      this.actives = i
      this.item = item
    // console.log(this.dataObj[item])
    },
    // 辅助方法
    ...mapActions({
      getDetailData: 'detail/getDetailData'
    }),

    // 获取ID
    getId() {
      const { id } = this.$route.query
      // 根据传过来的ID 获取数据
      this.getDetailData(id)
    }
  },
  created() {
    this.getId()
  },
  watch: {
    yearList(newQuestion, oldQuestion) {
      const index = newQuestion.findIndex(item => item === '全部')
      if (index !== -1) {
        newQuestion.splice(index, 1)
        this.item = newQuestion[0]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
 

.con-con-btn {
    border: none;
    border-top: 1px solid#eee;
    width: 110%;
    height: 40px;
    font-size: 16px;
    color: #00afff;
    background: #fff;
    font-weight: 500;
    margin-left: -5%;
}

.con-con-div {
    padding: 0 10px;
    border-bottom: 8px solid #f4f4f4;
    overflow: hidden;
    font-size: 14px;
    p:nth-child(1) {
      padding: 12px 0;
      color: #3d3d3d;
    }
    p:nth-child(2) {
      color: #bdbdbd;
    }
    p:nth-child(3) {
      text-align: right;
      padding-bottom: 8px;
      font-size: 12px;
      color: #818181;
      span:nth-child(2) {
        font-size: 14px;
        color: #ff2336;
        margin-left: 5px;
      }
    }
}

.con-key-p {
    padding: 0 10px;
    // height: 20px;
    line-height: 25px;
    font-size: 14px;
    color: #999;
    background: #f4f4f4;
    position: relative;
    top: -5px;
}

.con-div {
    border-top: 8px solid #f4f4f4;
    padding: 0 18px;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    background: #fff;
    span {
      padding-right: 18px;
    }
    span.active {
      color: #3aacff;
    }
}

 
.type-title-btn {
  margin-bottom: 8px;
  font-size: 16px;
  color: #00afff;
  background: #fff;
  text-align: center;
  height: 30px;
  line-height: 30px;
  border-top: 6px solid #f4f4f4;
}
</style>