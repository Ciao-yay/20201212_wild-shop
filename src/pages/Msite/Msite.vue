<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <span class="header_search" slot="left">
        <i class="iconfont icon-tubiao-"></i>
      </span>
      <router-link class="header_login" slot="right" :to="userInfo._id?'/userInfo':'/login'">
        <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-tubiao-"></i>
        </span>
      </router-link>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="category.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(arrItem,index) in categoryArr" :key="index">
            <a href="javascript:;" class="link_to_food" v-for="(item,index) in arrItem" :key="index">
              <div class="food_container">
                <img :src="`${imgBaseUrl}`+item.image_url" />
              </div>
              <span>{{item.title}}</span>
            </a>
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
      <div v-else><img src="./images/msite_back.svg" alt="骨架图"></div>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <shop-list />
    </div>
  </section>
</template>
<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop";
import ShopList from "../../components/ShopList/ShopList";
import Swiper from "swiper";

import { mapState, mapActions } from "vuex";

export default {
  mounted() {
    this.$store.dispatch("getCategory");
    this.$store.dispatch('getShops')  
  },
  data(){
    return {
      imgBaseUrl:'https://fuss10.elemecdn.com'
    }
  },
    components: {
    HeaderTop,
    ShopList,
  },
  computed: {
    ...mapState(["userInfo","address", "category"]),
    
    categoryArr() {
      const arr = [];
      let tempArr = [];
      const max = 8
      this.category.forEach((item,index) => {
        /* 这种方式也可以，
        但是不理解为什么tempArr已经为空了
        还能push进数组 (不是说的下面这种，说的是用tempArr.length循环的）*/
        tempArr.push(item);
        if((index+1)%max==0){
          arr.push(tempArr)
          tempArr = []
        }
      });
      return arr;
    }
  },
  watch:{
    category(value){//监视category的加载，要在加载完成之后才能创建swiper
      this.$nextTick(()=>{
        new Swiper(".swiper-container", {
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination",
          },
        });
      })
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "swiper/swiper-bundle.min.css";
@import '../../common/stylus/mixins.styl';
.msite  // 首页
  width 100%;
  .msite_nav 
    bottom-border-1px(#e4e4e4);
    margin-top 45px;
    height 200px;
    background #fff;
    .swiper-container
      width 100%;
      height 100%;
      .swiper-wrapper
        width 100%;
        height 100%;
        .swiper-slide 
          display flex;
          justify-content center;
          align-items flex-start;
          flex-wrap wrap;
          .link_to_food 
            width  25%;
            .food_container 
              display  block;
              width  100%;
              text-align  center;
              padding-bottom  10px;
              font-size  0;
              img 
                display  inline-block;
                width  50px;
                height  50px;
            span 
              display  block;
              width  100%;
              text-align  center;
              font-size  13px;
              color  #666;
      .swiper-pagination  
        >span.swiper-pagination-bullet-active  
          background  #02a774;
  .msite_shop_list  
    top-border-1px(#e4e4e4);
    margin-top  10px;
    background  #fff;
    .shop_header  
      padding  10px 10px 0;
      .shop_icon  
        margin-left  5px;
        color  #999;
      .shop_header_title  
        color  #999;
        font-size  14px;
        line-height  20px;
</style>