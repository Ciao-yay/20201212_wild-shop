<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item" v-for="(sc,index) in starClass" :key="index" :class="sc"></span>
  </div>
</template>
<script>
const STAR_ON = 'on'
const STAR_HALF = 'half'
const STAR_OFF = 'off'
export default {
  props:{
    score:Number,
    size:Number
  },
  computed:{
    // 能根据数据算出来的最好都用计算属性来完成
    // 根据分数算出星星分布
    starClass(){
      const score = this.score
      const scs = []
      // 分数整数部分
      const completeNum = Math.floor(score)
      // 添加整数个星星
      for(let i=0;i<completeNum;i++){
        scs.push(STAR_ON)
      }
      // 小数部分大于0.5才算半星
      if(score*10-completeNum*10>=5){// 小数算得不精确，乘以十来算
        scs.push(STAR_HALF)
      }
      // 未填满的星星用off
      while(scs.length<5){
        scs.push(STAR_OFF)
      }
      return scs
    }
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus'>
  @import '../../common/stylus/mixins.styl'
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/stars/star48_on')
        &.half
          bg-image('./images/stars/star48_half')
        &.off
          bg-image('./images/stars/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star36_on')
        &.half
          bg-image('./images/stars/star36_half')
        &.off
          bg-image('./images/stars/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star24_on')
        &.half
          bg-image('./images/stars/star24_half')
        &.off
          bg-image('./images/stars/star24_off')
</style>