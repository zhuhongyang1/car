<template>
  <div class="color-wrap">
      <p class="title">全部颜色</p>
      <div class="container">
        <p class="year">
          <span @click="changeIndex(index, item)" :class="{ active: actives === index }" v-for="(item, index) in keyList" :key="index">
            {{item}}
          </span>
        </p>
        <div class="content">
          <ul @click="goBack">
            <li  :data-name="item.Name" :data-id="item.ColorId" v-for="(item, index) in obj[key]" :key="index">
              <span :data-name="item.Name" :data-id="item.ColorId" :style="{ background: item.Value }"></span>
              {{item.Name}}
            </li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    data() {
    return {
        actives: 0,
        key: ''
    }
    },
    computed: {
        ...mapState({
            obj: state => state.color.obj,
            keyList: state => state.color.keyList
        })
    },
    watch: {
        keyList(newQuestion, oldQuestion) {
            this.key = newQuestion[0]
        }
    },
    created() {
        this.getId() 
    },
    methods: {
        ...mapMutations({
            setColorId: 'img/setColorID',
            setColorName: 'img/setColorName'
        }),
        goBack(e) {
            const { id, name } = e.target.dataset
            this.setColorId(id)
            this.setColorName(name)
            this.$emit('update:showColor', false)
        },
        changeIndex(i, key) {
            this.actives = i
            this.key = key
        },
        ...mapActions({
            getColorList: 'color/getColorList'
        }),
        getId() {
            const { id } = this.$route.query
            this.getColorList(id)
        }
    }
}
</script>

<style lang="scss" scoped>

.content ul {
  margin-top: 8px;
  padding: 0 10px;
  overflow: hidden;
  background: #fff;
}

.content ul li {
  width: 48%;
  float: left;
  flex: 1;
  font-size: 16px;
  line-height: 30px;
  border: 1px solid #3aacff;
  box-sizing: border-box;
  margin: 10px 0;
  border-radius: 2px;

  &:nth-child(odd) {
    margin-right: 10px;
  }
}

.content ul li span {
    width: 18px;
    height: 18px;
    margin-left: 10px;
    vertical-align: -12%;
    background: #fe9210;
    box-sizing: border-box;
    border: 1px solid #818181;
    display: inline-block;
}

.active {
  color: #00afff;
}

.year {
  margin-top: 6px;
  padding: 0 10px;
  font-size: 16px;
  line-height: 35px;
  height: 35px;
  background: #fff;
  overflow-x: scroll;
  box-sizing: border-box;
  display: flex;

  span {
    padding-right: 20px;
  }
}

.title {
  margin: 8px 0;
  font-size: 16px;
  color: #00afff;
  background: #fff;
  text-align: center;
  line-height: 40px;
  height: 40px;
}

.color-wrap {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 101;
  background: #f4f4f4;
}
</style>