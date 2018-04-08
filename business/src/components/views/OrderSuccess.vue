<template lang="html">
  <div>
    <NavHeader />
    <div class="container">
      <div class="page-title-normal">
        <h2 class="page-title-h2"><span>订单确认</span></h2>
      </div>
      <!-- 进度条 -->
      <div class="check-step">
        <ul>
          <li class="cur"><span>确认</span> 地址</li>
          <li class="cur"><span>查看你的</span> 订单</li>
          <li class="cur"><span>订单</span> 支付</li>
          <li class="cur"><span>订单</span> 确认</li>
        </ul>
      </div>

      <div class="order-create">
        <div class="order-create-pic"><img src="/static/ok-2.png" alt=""></div>
        <div class="order-create-main">
          <h3>恭喜! <br>你的订单已经提交!</h3>
          <p>
            <span>订单号：{{orderId}}</span>
            <span>订单总额：{{orderTotal | currency('￥')}}</span>
          </p>
          <div class="order-create-btn-wrap">
            <div class="btn-l-wrap">
              <router-link class="btn btn--m" to="/cart">购物车</router-link>
            </div>
            <div class="btn-r-wrap">
              <router-link class="btn btn--m" to="/">商品</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NavFooter />
  </div>
</template>

<script>
import NavHeader from '@/components/Header'
import NavFooter from '@/components/Footer'

  export default {
    data () {
      return {
        orderId: '',
        orderTotal: 0
      }
    },
    components: {
      NavHeader,
      NavFooter
    },
    mounted () {
      var orderId = this.$route.query.orderId
      if (!orderId) {
        return
      }
      this.$axios.get('/users/orderDetail', {
        params: {
          orderId: orderId
        }
      }).then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.orderId = orderId
          this.orderTotal = res.result.orderTotal
        }
      })
    }
  }
</script>

<style lang="css">
@import '../../assets/css/base.css';
@import '../../assets/css/checkout.css';
@import '../../assets/css/product.css';
@import '../../assets/css/login.css';
</style>
