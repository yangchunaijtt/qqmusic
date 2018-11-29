<template>
  <div class="loading">
    <img width="24" height="24" src="../common/images/loading.gif">
  </div>
</template>
<script>
  export default {}
</script>
<style scoped lang="stylus">
  @import "../common/stylus/variable"

  .loading
    width: 100%
    text-align: center
    .desc
      line-height: 20px
      font-size: $font-size-small
      color: $color-text-l
</style>