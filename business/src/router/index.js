import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/components/views/goodsList'
import Cart from '@/components/views/Cart'
import Address from '@/components/views/Address'
import OrderConfirm from '@/components/views/OrderConfirm'
import OrderSuccess from '@/components/views/OrderSuccess'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/Address',
      name: 'Address',
      component: Address
    },
    {
      path: '/OrderConfirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    },
    {
      path: '/OrderSuccess',
      name: 'OrderSuccess',
      component: OrderSuccess
    }
  ]
})
