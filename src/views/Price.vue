<template>
  <div class="wrap" >
    <div class="price-wrap" v-show="!cityFlag">
      <header class="header">
        可向多个商家咨询最低价，商家及时回复
      </header>
      <div class="content">
        <div @click="goType" class="con-info">
          <img :src="carInfoObj.pic" alt="">
          <div class="con-info-div">
            <p>{{carInfoObj.name}}</p>
            <p>{{defaultName}}</p>
          </div>
        </div>
        <div class="self-info">
          <p>个人信息</p>
        </div>
        <ul class="con-info-ul">
          <li>
            <span>姓名</span>
            <input type="text" placeholder="输入您的真实中文姓名" maxlength="4" v-model="username">
          </li>
          <li>
            <span>手机</span>
            <input type="text" placeholder="输入您的真实手机号码" maxlength="11" v-model="phone" >
          </li>
          <li class="city">
            <span>城市</span>
            <span @click="choiceCity">{{getCityName || defaultCity.CityName}}</span>
          </li>
        </ul>
        <div class="quotation">
          <button @click="badPrice">
            询最低价
          </button>
        </div>
      </div>
    </div>
    <transition name="scroll-top">
      <City  v-show="cityFlag"  />
    </transition>    
    <Dealer ref="dealer" />

    <div v-show="footerFlag" class="footer">
      寻最低价
    </div>
    
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { Dialog } from 'vant';

import City from '@/components/home/City/CityOne.vue'


import Dealer from '@/components/Dealer'

export default {
  data() {
    return {
      username: '',
      phone: '',
      footerFlag: false
    }
  },
  components: {
    City,
    Dealer
  },
  computed: {
    ...mapState({
      cityFlag: state => state.city.cityFlag,
      carInfoObj: state => state.detail.carInfo,
      defaultName: state => state.detail.defaultName,
      defaultCity: state => state.city.defaultCity,
      getCityName: state => state.city.cityName,
      getCarId: state => state.img.saveCarId
    })
  },

  methods: {
    scrollFunc() {
      const dealer = this.$refs.dealer.$refs.dealer
      const dealerTop = dealer.offsetTop - 62
      window.addEventListener('scroll', () => {
        let top = window.pageYOffset
        if (top >= dealerTop) {
          this.footerFlag = true
        } else {
          this.footerFlag = false
        }
      })
    },
    badPrice() {
      const userReg = /^[\u4E00-\u9FA5]{2,4}$/g
      const phoneReg = /^1[3456789]\d{9}$/
      let userNameFlag = false
      let phoneFlag = false
      if (this.username.trim() && this.phone.trim()) {
        if (userReg.test(this.username)) {
          userNameFlag = true
        } else {
          Dialog({ message: '请输入真实姓名' });
        }

        if (phoneReg.test(this.phone)) {
          phoneFlag = true
        } else {
          Dialog({ message: '请输入真实手机号码' });
        }
      } else {
        Dialog({ message: '账号或密码不能为空' });
      }
      if (userNameFlag && phoneFlag) {
      } 
    },
    goType() {
      this.$router.push(`type?id=${this.getCarId}`)
    },
    choiceCity() {
      this.setCityFlag(true)
    },
    ...mapActions({
      getDefaultCity: 'city/getDefaultCity',
      getCityListOne: 'city/getCityListOne',
    }),
    ...mapMutations({
      setCityFlag: 'city/setCityFlag'
    })
  },
  created() {
    this.getDefaultCity()
    this.getCityListOne()
  },
  mounted() {
    this.scrollFunc()
  }
}
</script>

<style lang="scss" scoped> 
body {-webkit-overflow-scrolling: touch; }
.footer {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #3aacff;
  text-align: center;
  font-size: 17px;
  color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
}

.wrap {
  padding-bottom: 50px;
  box-sizing: border-box;
  overflow-y: scroll;
}

.price-wrap {
  padding-top: 30px;
  box-sizing: border-box;
}

.scroll-top-enter, .scroll-top-leave-to {
  transform: translate3d(0, 100%, 0);
}

.scroll-top-enter-active, .scroll-top-leave-active {
  transition: all .1s linear;
}
.city span:nth-child(2):after {
  content: "";
  display: inline-block;
  padding-top: 8px;
  padding-right: 8px;
  border-top: 1px solid silver;
  border-right: 1px solid silver;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

.city span:nth-child(2) {
  display: inline-block;
  width: 88%;
  color: #555;
  text-align: right;
  box-sizing: border-box;
}

.quotation {
  background: #fff;
  text-align: center;
  padding-top: 15px;
  padding-bottom: 14px;

  button {
    font-size: 16px;
    color: #fff;
    width: 80%;
    background: #3aacff;
    height: 35px;
    border-radius: 5px;
  }

}

.con-info-ul {
    background: #fff;
    padding: 0 10px;
    font-size: 16px;

    li {
      font-size: 16px;
      height: 44px;
      line-height: 44px;
      border-bottom: 1px solid #eee;
      box-sizing: border-box;
      color: #000;

      input {
        border: none;
        padding-right: 10px;
        width: 88%;
        text-align: right;
        box-sizing: border-box;
        color: #555;
        -webkit-appearance: none;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        
      }

    }

}

.self-info {

  p {
    padding: 0 10px;
    height: 25px;
    line-height: 25px;
    color: #666;
    background: #eee;
  }
}

.con-info-div {
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  padding-left: 10px;
  box-sizing: border-box;
  p:nth-child(1) {
    font-size: 18px;
    margin-bottom: 6px;
  }
}

.con-info {
  display: flex;
  background: #fff;
  padding: 16px 9px 14px;
  position: relative;
  height: 100px;
  box-sizing: border-box;
}

.con-info img {
  width: 115px;
  height: 71px;
  border: 1px solid #eee;
  box-sizing: border-box;
  border-radius: 5px;
}

.con-info::before {
  content: "";
  display: inline-block;
  padding-top: 10px;
  padding-right: 10px;
  border-top: 2px solid #ccc;
  border-right: 2px solid #ccc;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  position: absolute;
  right: 14px;
  top: 50%;
  margin-top: -5px;
}


.header {
  height: 30px;
  line-height: 30px;
  width: 100%;
  background: #79cd92;
  text-align: center;
  z-index: 99;
  color: #fff;
  font-size: 16px;
  position: fixed;
  left: 0;
  top: 0;
}
</style>