<template>
	<div>
    <NavHeader />
    <NavBread>
      <span slot="商品">商品</span>
    </NavBread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showPriceFilter">价格过滤</a>
        </div>
        <div class="accessory-result">
          <!-- 价格过滤 -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show': filterby}">
            <dl class="filter-price">
              <dt>价格:</dt>
              <dd><a href="javascript:void(0)" :class="{cur: priceChecked==='all'}" @click="priceChecked = 'all'">全部</a></dd>
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
                    <a href="#"><img  v-lazy="'../../../static/'+item.prodcutImg" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.prodcutPrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
    <NavFooter />
	</div>
</template>

<script type="text/ecmascript-6">
	import NavHeader from '@/components/Header'
  import NavFooter from '@/components/Footer'
  import NavBread from '@/components/Bread'

	export default {
    data() {
      return {
        goodsList: [],
        priceFilter: [
          {
            startPrice: '0.00',
            endPrice: '500.00'
          },
          {
            startPrice: '500.00',
            endPrice: '1000.00'
          },
          {
            startPrice: '1000.00',
            endPrice: '2000.00'
          },
        ],
        priceChecked: 'all',
        filterby: false,
        overLayFlag: false
      }
    },
    mounted() {
      this.getGoodsList()
    },
    methods: {
      getGoodsList() {
        this.$axios.get('/api/goods')
        .then((response) => {
          let data = response.data
          this.goodsList = data.data
        })
        .catch(error => {
          console.log(error)
        })
      },
      showPriceFilter() {
        this.filterby = !this.filterby
        this.overLayFlag = !this.overLayFlag
      },
      closePop() {
        this.filterby = !this.filterby
        this.overLayFlag = !this.overLayFlag
      },
      setPriceFilter(index) {
        this.priceChecked = index
        this.filterby = false
        this.overLayFlag = false
      }
    },
    components: {
      NavHeader,
      NavFooter,
      NavBread
    }
  }
</script>

<style rel="stylesheet">
	@import '../../assets/css/base.css';
	@import '../../assets/css/checkout.css';
	@import '../../assets/css/product.css';
  @import '../../assets/css/login.css';
</style>