<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class='{on:messageLogin}' @click="messageLogin=true">短信登录</a>
          <a href="javascript:;" :class='{on:!messageLogin}' @click="messageLogin=!messageLogin">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class='{on:messageLogin}'>
            <section class="login_message" >
              <input type="tel" maxlength="11" placeholder="手机号" v-model='phone'>
              <button :disabled="!(phoneRight&&!computeTime)" class="get_verification"
               :class="{toBlack:(phoneRight&&!computeTime)}" 
               @click.prevent="getCode">
                {{computeTime?`已发送(${computeTime}s)`:'获取验证码'}}
               </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class='{on:!messageLogin}'>
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input :type="!showPwd?'password':'text'" maxlength="8" placeholder="密码" v-model="pwd">
                <div class="switch_button " :class='showPwd?"on":"off"' @click="showPwd=!showPwd">
                  <div class="switch_circle" :class="{ball:showPwd}"></div>
                  <span class="switch_text" >{{!showPwd?'':'abc'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" 
                :src="activeCaptcha" 
                alt="captcha" 
                ref="captcha"
                @click="switchCaptcha"
                >
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <Notice :alertText='alertText' v-show='showNotice'  @closeTip='closeTip'/>
  </section>
</template>
<script>
import Notice from '../../components/Notice/Notice'
import {loginByPwd,sendMessage,loginByCode} from '../../api/index'
export default {
  data(){
    return {
      messageLogin:true,// 是否是短信登陆
      phone:'',// 手机号码
      computeTime:0,// 验证码倒计时
      showPwd:false,// 是否显示密码
      code:'',// 短信返回的验证码
      name:'',// 用户名
      pwd:'',// 密码
      captcha:'',// 验证码
      alertText:'',// 提示内容
      showNotice:false,// 是否显示提示
      activeCaptcha:`http://localhost:4000/captcha?time=${Date.now()}`
    }
  },
  components:{
    Notice
  },
  computed:{
    phoneRight(){
      return /^1\d{10}$/.test(this.phone)
    }
  },
  methods:{
    // 发送短信获取手机验证码
    async getCode(){
      // 如果倒计时为0才启动定时器
      // if(!this.computeTime){
        // 倒计时
        this.computeTime=30
        this.intervalId = setInterval(()=>{
          this.computeTime--
          if(!this.computeTime){
            clearInterval(this.intervalId)
          }
        },1000)
        // 调用发验证码接口
        const result = await sendMessage(this.phone)
        // 失败给出提示
        if(result.code===1){
          this.getNotice(result.msg)
        }
      // }
    },
    // 弹出提示
    getNotice(alertText){
      this.alertText = alertText
      this.showNotice = true
    },
    // 关闭提示，清理内容
    closeTip(){
      this.alertText = ''
      this.showNotice = false
    },
    // 切换验证码
    switchCaptcha(){
      // this.$refs.captcha.src = `http://localhost:4000/captcha?time=${Date.now()}`
      this.activeCaptcha = `http://localhost:4000/captcha?time=${Date.now()}`
    },
    // 登录
    async login(){
      const {phone,getNotice,code,phoneRight,messageLogin,name,pwd,captcha} = this
      let result
      if(messageLogin){ 
        // 手机号码验证
        if(!phoneRight){
          // 提示错误
          getNotice('手机号码错误')
          return
        }
        // if()// 验证码的验证
        if(!code){
          // 提示错误
          getNotice('验证码错误')
          return
        }
        // 数据没问题，收集数据调用登录接口并接受结果
        result = await loginByCode(phone,code)
      }else if(!messageLogin){

        // 名字验证
        if(!name){
          // 
          getNotice('用户名错误')
          return
        }
        // 密码验证
        if(!pwd){
          getNotice('密码错误')
          return
        }
        // 验证码验证
        if(!captcha){
          // 为啥不更新captcha的状态呢
          // 先更新验证码
          this.switchCaptcha()
          this.captcha=''
          getNotice('验证码错误')
          return
        }
        // 数据没问题，收集数据调用登录接口并接受结果
        result = await loginByPwd({name,pwd,captcha})
      }else{
        getNotice('未知错误')
        return
      }
      // 成功，清除定时器，跳转到用户界面
      if(result.code===0){
        // 清除定时器
        clearInterval(this.intervalId)
        // 状态管理，存入用户信息
        this.$store.dispatch('setUserInfo',result.data)
        // 跳转到个人页面
        this.$router.replace('/profile')
      }else if(result.code===1){
        // 失败，刷新验证码并给出提示
        getNotice(result.msg)
      }else{
        getNotice('未知错误')
      }
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/css'>
  @import '../../common/stylus/mixins.styl'
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.toBlack
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.ball
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>