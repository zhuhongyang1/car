<template>
  <div class="wrap">
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

        <!-- 引入 下面的子组件 -->
        <QuotationLast />
 
      </div>

    </div>
    
    <!-- 城市列表组件 -->
    <transition name="scroll-top">
      <City  v-show="cityFlag"  />
    </transition>
    

    <!-- 经销商组件 -->
    <Dealer />

  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { Dialog } from 'vant';



// 引入 城市列表组件 
import City from '@/components/home/City/CityOne.vue'

// 引入 下面的组件
import QuotationLast from '@/components/home/City/Last'

// 引入 经销商组件
import Dealer from '@/components/Dealer'

export default {
  data() {
    return {
      username: '',
      phone: ''
    }
  },
  components: {
    City,
    QuotationLast,
    Dealer
  },
  computed: {
    ...mapState({
      // 主组件的标识
      cityFlag: state => state.city.cityFlag,
      carInfoObj: state => state.detail.carInfo,
      defaultName: state => state.detail.defaultName,
      // 自动选择的城市名称
      defaultCity: state => state.city.defaultCity,
      // 获取选择的城市名称
      getCityName: state => state.city.cityName,
      // 获取car ID
      getCarId: state => state.img.saveCarId
    })
  },
  watch: {
    defaultCity(now) {
      this.saveCityID(now.CityID)
    }
  },
  methods: {
    // btn询问最低价
    badPrice() {

      // 匹配2-4个中文字符
      const userReg = /^[\u4E00-\u9FA5]{2,4}$/g
      // 匹配手机号
      const phoneReg = /^1[3456789]\d{9}$/
      let userNameFlag = false
      let phoneFlag = false
      if (this.username.trim() && this.phone.trim()) {
        if (userReg.test(this.username)) {
          userNameFlag = true
        } else {
          // 请输入真实姓名
          Dialog({ message: '请输入真实姓名' });
        }

        if (phoneReg.test(this.phone)) {
          phoneFlag = true
        } else {
          // 请输入真实手机号码
          Dialog({ message: '请输入真实手机号码' });
        }
      } else {
        // 账号或密码不能为空
        Dialog({ message: '账号或密码不能为空' });
      }

      // 姓名和手机号都正确
      if (userNameFlag && phoneFlag) {
        // 验证成功，to do something
      } 
    },
    // 跳转Type
    goType() {
      this.$router.push(`type?id=${this.getCarId}`)
    },
    choiceCity() {
      this.setCityFlag(true)
    },
    ...mapActions({
      // 默认城市
      getDefaultCity: 'city/getDefaultCity',
      // 1级城市列表
      getCityListOne: 'city/getCityListOne',
    }),
    ...mapMutations({
      // 设置主组件的标识
      setCityFlag: 'city/setCityFlag',
      // 保存城市ID
      saveCityID: 'dealer/updateCityID'
    })
  },
  created() {
    // 调用默认城市函数
    this.getDefaultCity()
    // 调用获取一级城市列表函数
    this.getCityListOne()
  }
}
</script>

<style lang="scss" scoped> 




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
    margin-bottom: 15px;
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
}
</style>