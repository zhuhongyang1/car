<template>

  <div class="detail" ref="detail">
    <div class="detail-header" @click="goImg">
      <img :src="carObj.CoverPhoto" alt="">
      <p class="detail-header-p">{{carObj.pic_group_count}}张照片</p>
    </div>
    <div class="info"  v-if="Object.keys(carObj).length">
      <div>
        <p class="info-red">{{carObj.market_attribute.dealer_price}}</p>
        <p class="info-gray">指导价 {{carObj.market_attribute.official_refer_price}}</p>
      </div>
      <button class="info-btn" @click="goPrice">{{carObj.BottomEntranceTitle}}</button>
    </div>
    <div class="container"  v-if="Object.keys(carObj).length">
      <div class="con-div" >
        <span @click="tab(index, item)" :class="{ active: actives === index }" v-for="(item, index) in yearList" :key="index">{{item}}</span>
      </div>
      <div class="con-con">
        <div v-for="(item, index) in dataObj[item]" :key="index" class="item">

          <p class="con-key-p">{{/^\//.test(item.key) ? '' : item.key}}</p>
          <div class="con-con-div" v-for="(item2, i2) in item.list" :key="i2">
            <p class="p1">{{item2.key1}}</p>
            <p class="p2">{{item2.key2}}</p>
            <p>
              <span v-for="(item3, i3) in item2.key3" :key="i3">
                {{item3}}
              </span>
            </p>
            <button class="con-con-btn" @click="goPrice({key: item2.key1, id: item2.id})">{{carObj.BottomEntranceTitle}}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <p>{{carObj.BottomEntranceTitle}}</p>
      <p>本地经销商为你报价</p>
    </div>
  </div>    
</template>

<script>

import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    data() {
      return {
        actives: 0,
        item: '全部',
        selfCarID: ''
      }
    },
    computed: {
      ...mapState({
        yearList: state => state.detail.year,
        dataObj: state => state.detail.dataObj,
        carObj: state => state.detail.car,
        carID: state => state.detail.carID,
        defaultCity: state => state.city.defaultCity,
      })
    },
    created() {
      this.getId()
    },
    watch: {
      dataObj(now) {
        if (now['全部']) {
          this.selfCarID = now['全部'][0].list[0].id
        }
      },
      defaultCity(now) {
        this.saveCityID(now.CityID)
      }
    },  
    methods: {
      ...mapMutations({
        saveCarId: 'img/saveCarId',
        defaultData: 'detail/defaultData',
        updateCarID: 'dealer/updateCarID',
        saveCityID: 'dealer/updateCityID'
        
      }),
      goPrice(obj) {
        const { key, id } = obj
        key && this.defaultData(key)
        let idCar = id || this.selfCarID 
        this.updateCarID(idCar)
        this.$router.push('price')
      },
      goImg() {
        const { id } = this.$route.query
        this.$router.push(`img?id=${id}`)
      },
      tab(i, item) {
        this.actives = i
        this.item = item
      },
      ...mapActions({
        getDetailData: 'detail/getDetailData',
        getDefaultCity: 'city/getDefaultCity'
      }),
      getId() {
        const { id } = this.$route.query
        this.saveCarId(id)
        this.getDetailData(id)
        this.getDefaultCity()
      }
    },
    mounted() {
      const detail = this.$refs.detail 
      let time = 100 
      const timer = setInterval(() => {
        time -= 10 
        if (time <= 0) {
          time = 0
          clearInterval(timer)
        }
        detail.style.left = time + '%'
      }, 10)
    },
}
</script>

<style lang="scss" scoped>

.detail {
  padding-bottom: 50px;
  box-sizing: border-box;
  position: absolute;
  left: 100%;
  width: 100%;
}

.bottom {
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 99;
    background: #3aacff;
    height: 50px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p:nth-child(1) {
      font-size: 16px;
    }
    p:nth-child(2) {
      margin-top: 6px;
      font-size: 12px;
    }
}

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

.info {
  display: flex;
  padding: 22px 10px;
  position: relative;
  .info-red {
    font-size: 18px;
    color: red;
    font-weight: 500;
  }
  .info-gray {
    font-size: 14px;
    color: silver;
    position: relative;
    top: 6px;
  }
  .info-btn {
    background: #00afff;
    color: #fff;
    border: none;
    -webkit-box-pack: justify;
    justify-content: space-between;
    border-radius: 5px;
    font-size: 16px;
    width: 50%;
    height: 35px;
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%)
  }
}

.detail-header {
  width: 100%;
  height: 164px;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%)
  }
  .detail-header-p {
    position: absolute;
    bottom: 15px;
    right: 16px;
    color: #fff;
    padding: 3px 4px;
    border-radius: 10px;
    background: rgba(0,0,0,.6);
    font-size: 12px;
  }
  
}
 
</style>