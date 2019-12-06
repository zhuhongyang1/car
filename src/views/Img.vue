<template>
  <div class="img-wrap">
      <ul class="img-con">
          <li v-for="(item1, index1) in list" :key="index1" class="img-li">
              <div  v-for="(item2, index2) in item1.List" :key="index2">
                  <span 
                  :style="{ 
                    backgroundImage: 'url(' + item2.Url + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%',
                    height: '200px',
                    display: 'block',
                    border: '2px solid #fff',
                  }" />
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState({
            list: state => state.img.list
        })
    },
    created() {
        this.getId()
    },
    methods: {
        // setColor() {
        //     this.$router.push(`color?id=${this.id}`)
        // },
        // setType() {
        //     this.$router.push(`type?id=${this.id}`)
        // },
        ...mapActions({
            getImgList: 'img/getImgList'
        }),
        getId() {
            this.id = this.$route.query.id
            this.getImgList(`SerialID=${this.id}`)
        }
    },
}
</script>

<style scoped lang="scss">
.img-li {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 6px;
    div{
        width: 33.333333333333333333%;
    }
}

.img-wrap, .img-con {
    width: 100%;
    height: 100%;
    overflow: scroll;
}
</style>