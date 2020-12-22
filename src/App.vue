<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import FooterGuide from "./components/FooterGuide/FooterGuide";
import {shopCategory} from './api/index'
import {mapActions} from 'vuex'

export default {
  mounted() {
    // this.$store.dispatch('getLocation')
    this.getLocation()
    this.getUserInfo()
  },
  components: {
    FooterGuide,
  },
  methods:{
    ...mapActions(['getUserInfo','getLocation'])
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app
  width: 100%;
  height: 100%;
  background: #f5f5f5;

</style>
