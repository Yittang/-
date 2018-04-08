<template>
	<header class="header">
        <symbol id="icon-cart" viewBox="0 0 38 32">
          <title>cart</title>
          <path class="path1" d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
          <path class="path2" d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
          <path class="path3" d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
          <path class="path4" d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
        </symbol>
        <div class="navbar">
          <div class="navbar-left-container">
            <a href="/">
              <img width="60" class="navbar-brand-logo" src="../assets/logo.png"></a>
          </div>
          <div class="navbar-right-container" style="display: flex;">
            <div class="navbar-menu-container">
              <!--<a href="/" class="navbar-link">我的账户</a>-->
              <span class="navbar-link" v-text="nickName" v-if="nickName" style="margin-right:20px"></span>
              <a href="javascript:void(0)" class="navbar-link" @click="signModalFlag=true">注册</a>
              <a href="javascript:void(0)" class="navbar-link" v-if="!nickName" @click="loginModalFlag=true">登录</a>
              <a href="javascript:void(0)" @click="logOut" v-if="nickName" class="navbar-link">登出</a>
              <div class="navbar-cart-container">
                <span class="navbar-cart-count" v-if="nickName">{{cartCount}}</span>
                <a class="navbar-link navbar-cart-link" href="/cart">
                  <svg class="navbar-cart-logo">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <!-- 登录模态框 -->
        <div class="md-modal modal-msg md-modal-transition" :class="{'md-show':loginModalFlag}">
          <div class="md-modal-inner">
            <div class="md-top">
              <div class="md-title">登录</div>
              <button class="md-close" @click="loginModalFlag=false">关闭</button>
            </div>
            <div class="md-content">
              <div class="confirm-tips">
                <div class="error-wrap">
                  <span class="error error-show" v-show="errorTip">用户名或者密码错误</span>
                </div>
                <ul>
                  <li class="regi_form_input">
                    <i class="icon IconPeople"></i>
                    <input type="text" tabindex="1" name="loginname" v-model="userName" class="regi_login_input regi_input_left" placeholder="用户名" data-type="loginname">
                  </li>
                  <li class="regi_form_input noMargin">
                    <i class="icon IconPwd"></i>
                    <input type="password" tableindex="2" name="password" v-model="userPwd" class="regi_login_input regi_login_input_left login_input-no input_text" placeholder="密码" @keyup.enter="login">
                  </li>
                </ul>
              </div>
              <div class="login-wrap">
                <a href="#" class="btn-login" @click="login">登  录</a>
              </div>
            </div>
          </div>
        </div>
        <!-- 注册模态框 -->
        <div class="md-modal modal-msg md-modal-transition" :class="{'md-show':signModalFlag}">
          <div class="md-modal-inner">
            <div class="md-top">
              <div class="md-title">注册</div>
              <button class="md-close" @click="signModalFlag=false">关闭</button>
            </div>
            <div class="md-content">
              <div class="confirm-tips">
                <ul>
                  <li class="regi_form_input">
                    <i class="icon IconPeople"></i>
                    <input type="text" tabindex="1" name="loginname" v-model="signUserName" class="regi_login_input regi_input_left" placeholder="用户名" data-type="loginname">
                  </li>
                  <li class="regi_form_input noMargin">
                    <i class="icon IconPwd"></i>
                    <input type="password" tableindex="2" name="password" v-model="signUserPwd" class="regi_login_input regi_login_input_left login_input-no input_text" placeholder="密码" @keyup.enter="sign">
                  </li>
                </ul>
              </div>
              <div class="login-wrap">
                <a href="#" class="btn-login" @click="sign">注  册</a>
              </div>
            </div>
          </div>
        </div>
    <!-- 登录遮罩层 -->
    <div class="md-overlay" v-if="loginModalFlag" @click="loginModalFlag=false"></div>
    <!-- 注册遮罩层 -->
    <div class="md-overlay" v-if="signModalFlag" @click="signModalFlag=false"></div>
    </header>
</template>

<script type="text/ecmascript-6">
	import {mapState} from 'vuex'
	export default {
    data() {
      return {
        loginModalFlag: false,
        signModalFlag: false,
        userName: '',
        signUserName: '',
        signUserPwd: '',
        userPwd: '',
        errorTip: false,
      }
    },
    mounted() {
      this.checkLogin()
    },
    computed: {
      ...mapState(['nickName', 'cartCount'])
      // nickName () {
      //   return this.$store.state.nickName
      // },
      // cartCount () {
      //   return this.$store.state.cartCount
      // }
    },
    methods: {
      checkLogin() {
        this.$axios.get('/users/checkLogin')
        .then((response) => {
          let res = response.data
          if (res.status === '0') {
            //this.nickName = res.result
            this.$store.commit('updateUserInfo', res.result)
            this.getCartCount()
          }
        })
      },
      sign() {
        this.$axios.post('/users/sign', {
          userName: this.signUserName,
          userPwd: this.signUserPwd
        })
        .then((response) => {
          let res = response.data
          if(res.status == '0') {
            this.signModalFlag = false
            this.getCartCount()
          }
        })
      },
      login() {
        if(!this.userName || !this.userPwd) {
          this.errorTip = true
        }
        this.$axios.post("/users/login", {
          userName: this.userName,
          userPwd: this.userPwd
        })
        .then((response) => {
          let res = response.data
          if (res.status === '0') {
            this.loginModalFlag = false
            this.errorTip = false
            //this.nickName = res.result.userName
            this.$store.commit('updateUserInfo', res.result.userName)
            this.getCartCount()
          } else {
            this.errorTip = true
          }
        })
      },
      logOut() {
        this.$axios.post("/users/logout")
        .then((response) => {
          let res = response.data
          if (res.status === '0') {
            this.userName = ''
            this.userPwd = ''
          } else {
            this.errorTip = true
          }
          this.$store.commit('updateUserInfo', '')
          this.$store.commit('initCartCount', '')
        })
      },
      getCartCount () {
        this.$axios.get('/users/getCartCount')
        .then((response) => {
          let res = response.data
          if (res.status === '0') {
            this.$store.commit('initCartCount', res.result)
          }
        })
      }

    }
  }
</script>

<style rel="stylesheet">
	@import '../assets/css/login.css';
</style>