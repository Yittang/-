<template>
	<div>
    <NavHeader />
    <NavBread>
      <span>商品</span>
    </NavBread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a @click="sortGoods" href="javascript:void(0)" class="price">金额 
            <svg v-if='!sortFlag' class="icon icon-jiangxu"><use xlink:href="#icon-jiangxu"></use></svg>
            <svg v-else class="icon icon-shengxu"><use xlink:href="#icon-shengxu"></use></svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showPriceFilter">价格过滤</a>
        </div>
        <div class="accessory-result">
          <!-- 价格过滤 -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show': filterby}">
            <dl class="filter-price">
              <dt>价格:</dt>
              <dd><a href="javascript:void(0)" :class="{cur: priceChecked==='all'}" @click="setPriceFilter('all')">全部</a></dd>
              <dd v-for="(price,index) in priceFilter">
                <a href="javascript:void(0)" @click="setPriceFilter(index)" :class="{cur: priceChecked==index}">{{price.startPrice}} - {{price.endPrice}}</a>
              </dd>
            </dl>
          </div>
          <!-- 商品列表 -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodsList">
                  <div class="pic">
                    <a href="#"><img v-lazy="'../../../static/'+item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                <img v-if="loading" src="../../../static/loading-svg/loading-bubbles.svg">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
    <!-- 未登录modal -->
    <modal :mdShow="mdShow" @close="closeModal">
      <p slot="message">
        请先登录，否则无法加入到购物车中
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" @click="mdShow = false">关闭</a>
      </div>
    </modal>
    <!-- 加入购物成功modal -->
    <modal :mdShow="mdShowCart" @close="closeModal">
      <p slot="message">
        <svg class="navbar-status-ok" width="30" height="30">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
        </svg>
        <span>加入购物车成功！</span>
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" @click="mdShowCart = false">继续购物</a>
        <router-link class="btn btn--m" to="/cart">查看购物车</router-link>
      </div>
    </modal>
    <NavFooter />
	</div>
</template>

<script type="text/ecmascript-6">
	import NavHeader from '@/components/Header'
  import NavFooter from '@/components/Footer'
  import NavBread from '@/components/Bread'
  import Modal from '@/components/modal'

	export default {
    data() {
      return {
        goodsList: [],
        sortFlag: true,
        page: 1,
        pageSize: 8,
        loading: false,
        priceFilter: [
          {
            startPrice: '0.00',
            endPrice: '100.00'
          },
          {
            startPrice: '100.00',
            endPrice: '500.00'
          },
          {
            startPrice: '500.00',
            endPrice: '1000.00'
          },
          {
            startPrice: '1000.00',
            endPrice: '5000.00'
          },
        ],
        priceChecked: 'all',
        filterby: false,
        overLayFlag: false,
        busy: true,
        mdShow: false,
        mdShowCart: false
      }
    },
    mounted() {
      this.getGoodsList()
    },
    methods: {
      getGoodsList(flag) {
        let param = {
          page: this.page,
          pageSize: this.pageSize,
          sort: this.sortFlag?1:-1,
          priceLevel: this.priceChecked
        }
        this.loading = true
        this.$axios.get('/goods/list', {
          params: param
        })
        .then((res) => {
          let response = res.data
          this.loading = false
          if(response.status == '0') {
            if(flag) {
              this.goodsList = this.goodsList.concat(response.result.list)
              if(response.result.count == 0) {
                this.busy = true
              }else {
                this.busy = false
              }
            }else {
              this.goodsList = response.result.list
              this.busy = false
            }
          }else {
            this.goodsList = []
          }
        })
        .catch(error => {
          console.log(error)
        })
      },
      sortGoods() {
        this.sortFlag = !this.sortFlag
        this.page = 1
        this.getGoodsList()
      },
      showPriceFilter() {
        this.filterby = !this.filterby
        this.overLayFlag = !this.overLayFlag
      },//显示价格过滤
      closePop() {
        this.filterby = !this.filterby
        this.overLayFlag = !this.overLayFlag
      },//关闭遮罩层
      setPriceFilter(index) {
        this.priceChecked = index
        this.page = 1
        this.filterby = false //侧边栏关闭
        this.overLayFlag = false //黑幕关闭
        this.getGoodsList()
      },//点击价格
      loadMore() {
        this.busy = true
        setTimeout(() => {
          this.page++
          this.getGoodsList(true)
        }, 500);
      }, //分页加载
      addCart(productId) {
        this.$axios.post('/goods/addCart', {
          productId: productId
        })
        .then((res) => {
          console.log(res,'res')
          let response = res.data
          if(response.status == '0') {
            this.mdShowCart = true
            this.$store.commit('updateCartCount', 1)
          }else {
            this.mdShow = true
          }
        })
        .catch(error => {
          console.log(error)
        })
      },//加入购物车
      closeModal () {
        this.mdShow = false
        this.mdShowCart = false
      }
    },
    components: {
      NavHeader,
      NavFooter,
      NavBread,
      Modal
    }
  }
</script>

<style rel="stylesheet">
	@import '../../assets/css/base.css';
	@import '../../assets/css/checkout.css';
	@import '../../assets/css/product.css';
  @import '../../assets/css/login.css';
  .icon {
    width: 18px;
    height: 10px;
  }
</style>