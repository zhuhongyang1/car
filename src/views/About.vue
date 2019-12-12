<template>
  <div class="slideShow-wrap">
      slideshow

      <!-- {{imageList}} -->
    <van-image-preview
        v-model="show"
        :images="images"
        @change="onChange"
    >
        <template v-slot:index>第{{ index }}页</template>
    </van-image-preview>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    data() {
        return {
            show: true,
            index: 0,
            images: ["http://img3.bitautoimg.com/autoalbum/files/20181124/920/201811241542274227344_6387126_8.jpg", "http://img4.bitautoimg.com/autoalbum/files/20181124/888/2018112415422242221113_6387127_8.jpg", "http://img1.bitautoimg.com/autoalbum/files/20181124/044/20181124154223422318520_6387128_8.jpg", "http://img2.bitautoimg.com/autoalbum/files/20181124/700/2018112415422242229932_6387129_8.jpg", "http://img3.bitautoimg.com/autoalbum/files/20181124/778/20181124154221422123845_6387130_8.jpg", "http://img4.bitautoimg.com/autoalbum/files/20181124/199/2018112415420942910630_6387131_8.jpg", "http://img1.bitautoimg.com/autoalbum/files/20181124/418/2018112415420742715513_6387132_8.jpg", "http://img2.bitautoimg.com/autoalbum/files/20181124/043/2018112415420842811530_6387133_8.jpg", "http://img3.bitautoimg.com/autoalbum/files/20181124/154/20181124154223422317632_6387134_8.jpg", "http://img4.bitautoimg.com/autoalbum/files/20181124/714/2018112415420642613713_6387135_8.jpg", "http://img1.bitautoimg.com/autoalbum/files/20181124/152/2018112415420542522635_6387136_8.jpg", "http://img1.bitautoimg.com/autoalbum/files/20181124/123/2018112415423142315832_6387084_8.jpg", "http://img2.bitautoimg.com/autoalbum/files/20181124/967/20181124154230423015044_6387085_8.jpg", "http://img3.bitautoimg.com/autoalbum/files/20181124/389/20181124154230423016645_6387086_8.jpg", "http://img4.bitautoimg.com/autoalbum/files/20181124/951/2018112415422742279030_6387087_8.jpg", "http://img1.bitautoimg.com/autoalbum/files/20181124/498/20181124154229422916932_6387088_8.jpg", "http://img2.bitautoimg.com/autoalbum/files/20181124/264/20181124154229422921135_6387089_8.jpg", "http://img3.bitautoimg.com/autoalbum/files/20181124/264/20181124154231423110734_6387090_8.jpg", "http://img4.bitautoimg.com/autoalbum/files/20181124/686/20181124154230423010632_6387091_8.jpg", "http://img1.bitautoimg.com/autoalbum/files/20181124/654/20181124154228422820645_6387092_8.jpg", "http://img2.bitautoimg.com/autoalbum/files/20181124/060/20181124154225422525532_6387093_8.jpg", "http://img3.bitautoimg.com/autoalbum/files/20181124/357/20181124154227422719144_6387094_8.jpg", "http://img4.bitautoimg.com/autoalbum/files/20181124/201/201811241542274227336_6387095_8.jpg", "http://img1.bitautoimg.com/autoalbum/files/20181124/232/20181124154226422620734_6387096_8.jpg", "http://img2.bitautoimg.com/autoalbum/files/20181124/263/20181124154225422517144_6387097_8.jpg", "http://img3.bitautoimg.com/autoalbum/files/20181124/310/2018112415422242221836_6387098_8.jpg", "http://img4.bitautoimg.com/autoalbum/files/20181124/513/2018112415422342239441_6387099_8.jpg", "http://img1.bitautoimg.com/autoalbum/files/20181124/606/2018112415421942195035_6387100_8.jpg", "http://img2.bitautoimg.com/autoalbum/files/20181124/903/20181124154220422021936_6387101_8.jpg", "http://img3.bitautoimg.com/autoalbum/files/20181124/075/20181124154220422022536_6387102_8.jpg"]
        }
    },
    computed: {
        ...mapState({
            list: state => state.img.allImg,
            page: state => state.img.page,
            done: state => state.img.done
        }),
        imageList() {
            return this.list.map(item => {
                return item.Url.replace('{0}', item.HighSize)
            })
        }
    },
    methods: {
        onChange(index) {
            console.log(index)
            // this.index = index;
        }
    }
}
</script>

<style lang="scss" scoped>
    .slideShow-wrap {
        width: 100%;
        height: 100%;
        // background: #000;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1111111;
    }
</style>