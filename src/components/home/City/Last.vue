<template>
  <div class="dealer-info">
      <p class="tip" >选择报价经销商</p>
      <ul>
          <li>
              <!-- <p class="tip tip2">你所在地暂无经销商，已为您选择附近优质经销商，货比三家，才有好价</p> -->
          </li>
      </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

ul {
    background: #fff;
    padding: 0 9px;
}

.tip {
    padding: 0 10px;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    color: #666;
    background: #eee;
}

.tip2 {
    font-size: 10px;
    background: #fff;
    padding: 0;
    border-bottom: 1px solid #eee;
}
</style>