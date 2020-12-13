<template>
  <footer class="footer_guide border-1px">
    <div @click="goto('/msite')" class="guide_item" :class="{on:isSelected('/msite')}" >
      <span class="item_icon">
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>外卖</span>
    </div>
    <div @click="goto('/search')" class="guide_item" :class="{on:isSelected('/search')}">
      <span class="item_icon">
        <i class="iconfont icon-tubiao-"></i>
      </span>
      <span>搜索</span>
    </div>
    <div @click="goto('/order')" class="guide_item" :class="{on:isSelected('/order')}">
      <span class="item_icon">
        <i class="iconfont icon-icon"></i>
      </span>
      <span>订单</span>
    </div>
    <div @click="goto('/profile')" class="guide_item" :class="{on:isSelected('/profile')}">
      <span class="item_icon">
        <i class="iconfont icon-wode"></i>
      </span>
      <span>我的</span>
    </div>
  </footer>
</template>

<script>
export default {
  methods:{
    goto(path){
      // if(this.$route.path === path){
      //   return
      // }
      this.$router.replace(path)
    },
    isSelected(path){
      return this.$route.path === path
    }
  }
};
</script>


<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.footer_guide
  top-border-1px(#e4e4e4)
  position fixed
  z-index 100
  left 0
  right 0
  bottom 0
  background-color #fff
  width 100%
  height 50px
  display flex
  .guide_item
    display flex
    flex 1
    text-align center
    flex-direction column
    align-items center
    margin 5px
    color #999999
    &.on
      color #02a774
    span
      font-size 12px
      margin-top 2px
      margin-bottom 2px
      .iconfont
        font-size 22px
</style>
