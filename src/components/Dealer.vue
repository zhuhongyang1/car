<template>
  <div class="dealer" ref="dealer" v-show="!cityFlag" >
      <p class="tip" >选择报价经销商</p>
      <ul class="dealer-ul">
          <li  @click="changeDefaultList(index)" :class="{ active: defaultList.includes(index) }" v-for="(item, index) in list.list" :key="index">
              <p>
                  <span>
                      {{item.dealerShortName}}
                  </span>
                  <span>
                      万
                  </span>
              </p>
              <p>
                  <span>
                      {{item.address}}
                  </span>
                  <span>
                      售本市
                  </span>
              </p>
          </li>
      </ul>
      <p v-show="list.list && !list.list.length"  class="tip tip2">你所在地暂无经销商，已为您选择附近优质经销商，货比三家，才有好价</p>
 
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
    data() {
        return {
            defaultList: [0, 1, 2]
        }
    },
    computed: {
        ...mapState({
            cityID: state => state.dealer.cityID,
            carID: state => state.dealer.carID,
            list: state => state.dealer.list,
            cityFlag: state => state.city.cityFlag,
        })
    },
    watch: {
        cityID(now) {
            this.getDealerList(now)
        }
    },
    methods: {
        changeDefaultList(i) {
            let index = this.defaultList.indexOf(i)
            if (index === -1) {
                this.defaultList.push(i)
            } else {
                this.defaultList.splice(index, 1)
            }
        },
        ...mapActions({
            getDealerList: 'dealer/getDealerList'
        }),
        dealerList() {
            this.getDealerList()
        }
    },  
    created() {
        this.dealerList()
    }
}
</script>

<style lang="scss" scoped>


.tip2 {
    font-size: 10px !important;
    background: #fff !important;
    padding: 0;
    border-bottom: 1px solid #eee;
}

.tip {
    padding: 0 10px;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    color: #666;
    background: #eee;
}


.dealer-ul {
    background: #fff;
    padding: 0 9px;

    li {
        position: relative;
        padding: 13px 0 13px 27px;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        height: 82.5px;


        &::before {
            content: "";
            display: inline-block;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 2px solid #ccc;
            box-sizing: border-box;
            position: absolute;
            left: 2.5px;
            top: 50%;
            -webkit-transform: translate3d(0,-50%,0);
            transform: translate3d(0,-50%,0);
        }
        &::after {
            content: "";
            display: inline-block;
            padding-top: 8.5px;
            padding-right: 5px;
            border: 2px solid #fff;
            -webkit-transform: rotate(40deg) translate3d(0,-50%,0);
            transform: rotate(40deg) translate3d(0,-50%,0);
            position: absolute;
            left: 3.5px;
            border-left: none;
            border-top: none;
            top: 47%;
        }

        p:nth-child(1) {
            font-size: 16px;
            margin-top: 5px;
            span:nth-child(2) {
                font-size: 12px;
                float: right;
                color: red;
            }
        }

        p:nth-child(2) {
            margin-top: 10px;
            font-size: 12px;
            color: #a2a2a2;
            span:nth-child(1) {
                display: inline-block;
                max-width: 232px;
            }
            span:nth-child(2) {
                float: right;
            }
        }
    }

    li.active {
        &::before {
            background: #3aacff;
            border: none;
        }
    }
}
</style>