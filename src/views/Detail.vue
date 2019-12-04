<template>
  <div>
      <img :src="del.CoverPhoto" alt="">
       {{123}}
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  created() {
    this.getDetailList(this.$route.query.SerialID)
  },
  computed: {
    ...mapState({
      del: state => state.detail.del
    })
  },
  methods: {
    ...mapActions({
      getDetailList: "detail/getDetailList"
    })
  }
};
</script>

<style scoped>
</style>