<template>
  <div class="left_bar">
    <!-- top_left_top start -->
    <div class="l_top">

      <div class="title sub_info check_tab">
        <span class="fwhite" :class="coinValue === -1 ? 'is_checked' : ''" @click="checkCoin(-1)"
              v-if="!accountInfo.address">
          所有</span>
        <span class="fwhite" :class="coinValue === 0 ? 'is_checked' : ''" @click="checkCoin(0)" v-else>自选</span>
        <span class="fwhite" :class="coinValue === 1 ? 'is_checked' : ''" @click="checkCoin(1)">NULS</span>
        <span class="fwhite" :class="coinValue === 2 ? 'is_checked' : ''" @click="checkCoin(2)">USDI</span>
      </div>

      <div class="search cb">
        <div class="fl">
          <el-input placeholder="请输入交易对" prefix-icon="el-icon-search" v-model="search">
          </el-input>
        </div>
        <div class="fr">
          <el-radio-group v-model="radio">
            <el-radio label="1">涨幅</el-radio>
            <el-radio label="2">成交量</el-radio>
          </el-radio-group>
        </div>
      </div>

      <div class="table cb">
        <div class="t_th">
          <div class="t_td" style="width: 50px;text-align: center">&nbsp;</div>
          <div class="t_td" style="width: 120px;">交易对</div>
          <div class="t_td" style="width: 70px;">价格</div>
          <div class="t_td" style="width: 60px;" v-if="radio ==='1'">涨跌</div>
          <div class="t_td" style="width: 60px;" v-else>成交量</div>
        </div>
        <div class="t_tr cb" v-for="(item,index) in counterpartyData" :key="index" @click="choiceDeal(item)">
          <div class="t_td clicks" style="width: 50px;text-align: center" v-if="accountInfo.address">
            <span class="click" @click="isCollection(item)"><i
                    :class="item.isCollection === 0 ? 'el-icon-star-off' : 'el-icon-star-on'"></i></span>
          </div>
          <div class="t_td" style="width: 50px;" v-else>&nbsp;</div>
          <div class="t_td" style="width: 120px;">{{item.tradingName}}</div>
          <div class="t_td" style="width: 70px;">{{item.newPrices}}</div>
          <div class="t_td" style="width: 60px;" v-if="radio ==='1'">{{item.upsDowns}}%</div>
          <div class="t_td" style="width: 60px;" v-else>{{item.dealAmount24}}</div>
        </div>
      </div>

    </div>
    <!-- top_left_top end -->

    <!-- top_left_footer start -->
    <div class="l_footer">
      <div class="title sub_info fwhite">
        最新成交
      </div>

      <div class="table cb">
        <div class="t_th">
          <div class="t_td" style="width: 100px; padding: 0 0 0 10px">价格</div>
          <div class="t_td" style="width: 100px;">数量</div>
          <div class="t_td" style="width: 100px;">时间</div>
        </div>
        <div class="t_tr cb" v-for="(item,index) in newestData" :key="index">
          <div class="t_td" style="width: 100px;padding: 0 0 0 10px">
            <span class="fCN">{{item.prices}}</span>
          </div>
          <div class="t_td" style="width: 100px;">{{item.number}}</div>
          <div class="t_td" style="width: 100px;">{{item.time}}</div>
        </div>
      </div>
    </div>
    <!-- top_left_footer end -->
  </div>
</template>

<script>
  import moment from 'moment'
  import {divisionDecimals, getLocalTime} from '@/api/util'

  export default {
    name: "left",
    data() {
      return {
        accountInfo: localStorage.hasOwnProperty('accountInfo') ? JSON.parse(localStorage.getItem('accountInfo')) : '',//账户信息
        coinValue: 1, //交易对选择 -1:全部 0:自选1:nuls 2:usdi
        search: '', //搜索框内容
        radio: '1', //单选选择
        oldCounterpartyData: [], //交易对历史列表
        counterpartyData: [], //交易对列表
        myCoinData: [], //自选列表
        newestData: [],  //最新成交列表
        leftInterval: null,
      };
    },
    created() {
      if (this.accountInfo.address) {
        this.getMyCoinList();
      }
      this.getCoinList(this.coinValue);
    },
    mounted() {


      this.leftInterval = setInterval(() => {
        //this.getCoinList(this.coinValue);
      }, 10000);
    },
    destroyed() {
      clearInterval(this.leftInterval);
    },
    computed: {},
    watch: {
      search(newValue) {
        let newArr = [];
        if (newValue) {
          this.counterpartyData = [];
          for (let item of this.oldCounterpartyData) {
            if (item.tradingName.includes(newValue.toUpperCase())) {
              newArr.push(item)
            }
          }
          this.counterpartyData = newArr;
        } else {
          this.counterpartyData = this.oldCounterpartyData;
        }
      }
    },
    components: {},
    methods: {

      /**
       * @disc: 交易对类型选择
       * @params: type 0:自选1:nuls 2:usdi
       * @date: 2019-12-13 14:31
       * @author: Wave
       */
      checkCoin(type) {
        this.coinValue = type;
        this.getCoinList(this.coinValue);
      },

      /**
       * @disc: 是否收藏
       * @params: coinInfo
       * @date: 2020-01-07 11:32
       * @author: Wave
       */
      isCollection(coinInfo) {
        if (coinInfo.isCollection === 1) {
          this.cancelCollection(coinInfo)
        } else {
          this.collection(coinInfo)
        }
      },

      /**
       * @disc: 收藏功能
       * @params: coinInfo
       * @date: 2020-01-06 16:09
       * @author: Wave
       */
      async collection(coinInfo) {
        let url = '/coin/collection';
        let data = {"address": this.accountInfo.address, "tradingHash": coinInfo.hash};
        let res = await this.$dexPost(url, data);
        //console.log(res);
        if (res.success) {
          this.$message({message: '收藏完成', type: 'success', duration: 1000});
          for (let item of this.counterpartyData) {
            if (item.tradingName === coinInfo.tradingName) {
              item.isCollection = 1;
            }
          }
        }
      },

      /**
       * @disc: 取消收藏功能
       * @params: coinInfo
       * @date: 2020-01-06 16:09
       * @author: Wave
       */
      async cancelCollection(coinInfo) {
        let url = '/coin/collection/cancel';
        let data = {"address": this.accountInfo.address, "tradingHash": coinInfo.hash};
        let res = await this.$dexPost(url, data);
        //console.log(res);
        if (res.success) {
          this.$message({message: '取消收藏完成', type: 'success', duration: 1000});
          for (let item of this.counterpartyData) {
            if (item.tradingName === coinInfo.tradingName) {
              item.isCollection = 0;
            }
          }
        }
      },

      /**
       * @disc: 获取交易对
       * @params: type
       * @date: 2019-12-13 15:44
       * @author: Wave
       */
      async getCoinList(type) {
        let url = '/coin/top/list';
        let data = {};
        let coinRes = {};
        if (type === -1) {
          data = {assetChainId: 0, assetId: 0, size: 100, address: ""};
        } else if (type === 0) {
          coinRes = await this.getMyCoinList();
        } else if (type === 1) {
          data = {assetChainId: 0, assetId: 0, size: 100, address: ""};
        } else if (type === 2) {
          data = {assetChainId: 2, assetId: 0, size: 100, address: ""};
        }

        if (type !== 0) {
          coinRes = await this.$dexPost(url, data);
        }

        //console.log(coinRes);
        if (!coinRes.success) {
          this.$message({message: '获取交易对错误:' + JSON.stringify(coinRes.data), type: 'error', duration: 3000});
        }

        for (let item of coinRes.result) {
          item.newPrices = parseFloat(Number(divisionDecimals(item.newPrice, item.quoteDecimal)).toFixed(3));
          //涨跌 = （highPrice24 - lowPrice24）/lowPrice24
          item.upsDowns = parseFloat(Number((item.highPrice24 - item.lowPrice24) === 0 ? 0 : (item.highPrice24 - item.lowPrice24) / item.lowPrice24).toFixed(2));
          item.dealAmount24 = parseFloat(Number(divisionDecimals(item.dealAmount24, item.quoteDecimal)).toFixed(3));
          item.isCollection = 0;//是否收藏 0:没收藏 1:收藏

          if (type === 0) {
            item.isCollection = 1;
          } else {
            for (let k of this.myCoinData) {
              if (k.tradingName === item.tradingName) {
                item.isCollection = 1
              }
            }
          }

          if (item.tradingName === 'BTC/NULS') {
            this.choiceDeal(item);
          }
        }
        this.counterpartyData = coinRes.result;
        this.oldCounterpartyData = this.counterpartyData;

      },

      /**
       * @disc: 获取自选交易对
       * @params: type
       * @date: 2019-12-13 15:44
       * @author: Wave
       */
      async getMyCoinList() {
        let url = '/coin/collections';
        let data = {assetChainId: 0, assetId: 0, size: 100, address: this.accountInfo.address};
        let coinRes = await this.$dexPost(url, data);
        //console.log(coinRes);
        if (!coinRes.success) {
          this.$message({message: '获取自选交易对错误:' + JSON.stringify(coinRes.data), type: 'error', duration: 3000});
          return {success: false, data: coinRes}
        }
        this.myCoinData = coinRes.result;
        return coinRes;
      },

      /**
       * @disc: 选择交易对
       * @params: trading
       * @date: 2019-12-19 10:47
       * @author: Wave
       */
      choiceDeal(trading) {
        this.$store.commit('setDealData', trading);
        this.getDealList(trading.hash)
      },

      /**
       * @disc: 获取最新成交列表
       * @params: tradingHash
       * @date: 2019-12-13 15:44
       * @author: Wave
       */
      async getDealList(tradingHash) {
        let url = 'deal/list/trading';
        let data = {"tradingHash": tradingHash, "size": 20};
        let coinRes = await this.$dexPost(url, data);
        //console.log(coinRes);
        if (!coinRes.success) {
          this.$message({message: '获取最新成交列表:' + JSON.stringify(coinRes.data), type: 'error', duration: 3000});
        }
        for (let item of coinRes.result) {
          item.prices = parseFloat(Number(divisionDecimals(item.price, item.baseDecimal)).toFixed(3));
          item.number = parseFloat(Number(divisionDecimals(item.baseAmount, item.baseDecimal)).toFixed(3));
          item.time = moment(getLocalTime(item.createTime)).format('MM-DD HH:mm:ss');
        }
        this.newestData = coinRes.result;
      },
    }
  }
</script>

<style lang="less">
  @import "../../assets/css/style";

  .left_bar {
    .l_top {
      background-color: @Bcolour2;
      height: 260px;
      .check_tab {
        height: 40px;
        line-height: 40px;
        padding: 0 0 0 15px;
        border-bottom: @BD1;
        span {
          cursor: pointer;
          color: #ced0de;
          margin: 0 5px;
          padding: 3px 7px;
          border-radius: 2px;
          &:hover {
            background-color: #149af2;
          }
        }
        .is_checked {
          background-color: #149af2;
        }
      }

      .search {
        height: 40px;
        .fl {
          width: 110px;
          .el-input {
            margin: 10px 0 0 10px;
            .el-input__inner {
              line-height: 20px;
              height: 20px;
              border-radius: 0;
              background-color: #141627;
              padding: 0 0 0 20px;
              border-color: #888db5;
            }
            .el-input__prefix {
              left: 1px;
              .el-input__icon {
                line-height: 20px;
                font-size: 12px;
              }
            }
          }
        }
        .fr {
          margin: 0 30px 0 0;
          .el-radio {
            margin: 12px 10px 0 0;
            .el-radio__label {
              padding-left: 5px;
              font-size: 12px;
              color: #7d7f93;
            }
          }
        }
      }

      .table {
        height: 180px;
        overflow: hidden;
        //overflow-y: auto;
      }
    }
    .l_footer {
      background-color: #141627;
      height: 505px;
      margin: 10px 0 0 0;
      .title {
        height: 40px;
        line-height: 40px;
        border-bottom: @BD1;
        padding: 0 0 0 16px;
      }
    }
  }
</style>
