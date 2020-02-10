<template>
  <div class="right_bar">
    <div class="title fwhite">
      <div class="fl">
        <i class="el-icon-s-operation" :class="coinOrderValue === 0 ? 'is_checked' : ''" @click="orderValue(0)"></i>
        <i class="el-icon-s-fold" :class="coinOrderValue === 1 ? 'is_checked' : ''" @click="orderValue(1)"></i>
        <i class="el-icon-s-unfold" :class="coinOrderValue === 2 ? 'is_checked' : ''" @click="orderValue(2)"></i>
      </div>
      <div class="fr">
        <span class="font12">深度合并</span>
        <el-select v-model="depthValue" class="depth" :popper-append-to-body="false" @change="changeDepth">
          <el-option v-for="item in deepMerger" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </div>
    </div>

    <div class="buy table cb" v-show="coinOrderValue ===0 || coinOrderValue ===1">
      <div class="t_th">
        <div class="t_td" style="width: 120px; padding-left: 10px">价格(NULS)</div>
        <div class="t_td" style="width: 70px;">数量({{tradingInfo.symbol}})</div>
        <div class="t_td" style="width: 110px;">成交额(NULS)</div>
      </div>
      <div class="t_tr cb" v-for="(item,index) in sellData" :key="index" v-loading="orderListLoading">
        <div class="t_td" style="width: 120px; color:#7a2e3c;padding-left: 10px">{{item.prices}}</div>
        <div class="t_td" style="width: 70px;">{{item.number}}</div>
        <div class="t_td" style="width: 60px;">{{item.amount}}</div>
      </div>
    </div>

    <div class="title r_middle" v-show="coinOrderValue === 0 " v-loading="orderListLoading">
      <span>
        {{tradingInfo.newPrices}}
        <i :class="tradingInfo.newPrice < tradingInfo.beforePrice ? 'el-icon-top':'el-icon-bottom fred'"></i>
        <font>$5336.66</font>
      </span>
    </div>

    <div class="sell table cb" v-show="coinOrderValue ===0 || coinOrderValue ===2">
      <!--<div class="t_th" v-show="coinOrderValue ===0 || coinOrderValue ===2">
        <div class="t_td" style="width: 120px;padding-left: 10px">价格(NULS)</div>
        <div class="t_td" style="width: 70px;">数量({{tradingInfo.symbol}})</div>
        <div class="t_td" style="width: 110px;">成交额(NULS)</div>
      </div>-->
      <div class="t_tr cb" v-for="(item,index) in buyData" :key="index" v-loading="orderListLoading">
        <div class="t_td" style="width: 120px; color:#06ba63;padding-left: 10px">{{item.prices}}</div>
        <div class="t_td" style="width: 70px;">{{item.number}}</div>
        <div class="t_td" style="width: 60px;">{{item.amount}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {divisionDecimals, Times, Division} from '@/api/util.js'
  import {WEBSOCKET_URL} from "@/config.js";
  import {listener, unListener} from "@/api/websocket.js";

  export default {
    props: {
      //交易对信息
      tradingInfo: {
        type: Object,
      },
    },
    data() {
      return {
        coinOrderValue: 0,//交易对订单0：买卖各一半，1：买，2：卖
        deepMerger: 0,//深度合并
        buyData: [],//买列表
        sellData: [],//卖列表
        orderListLoading: false,
        depthValue: 1,//深度系数
        rightInterval: null,
      };
    },
    created() {
      setTimeout(() => {
        this.tradingInfo = this.$store.getters.getDealData;
        this.getOrderList(this.tradingInfo.hash, this.depthValue);
        this.deepMerger = this.tradingInfo.quoteDecimal;
        if (this.tradingInfo.newPrice) {
          this.tradingInfo.newPrices = Number(divisionDecimals(this.tradingInfo.newPrice, this.tradingInfo.baseDecimal));
        }
      }, 600)
    },
    mounted() {
      this.rightInterval = setInterval(() => {
        //this.getOrderList(this.$store.getters.getDealData.hash, this.depthValue);
      }, 10000);
    },
    destroyed() {
      clearInterval(this.rightInterval);
    },
    components: {},
    computed: {
      tradingName() {
        return this.$store.getters.getDealData.tradingName
      }
    },
    watch: {
      tradingName: function () {
        this.tradingInfo = this.$store.getters.getDealData;
        this.tradingInfo.symbol = this.tradingInfo.tradingName.substring(0, this.tradingInfo.tradingName.length - 5);
        //this.getOrderList(this.tradingInfo.hash);
        unListener(WEBSOCKET_URL, "order");
        /*console.log({
          "tradingHash": this.tradingInfo.hash,
          "decimal": this.depthValue,
          "size": 20,
          "type": 0
        });*/
        listener(WEBSOCKET_URL, "order", JSON.stringify({
            "tradingHash": this.tradingInfo.hash,
            "decimal": this.depthValue,
            "size": 20,
            "type": 0
          }),
          data => {

            console.log(data);
            this.getOrderList(this.tradingInfo.hash, this.depthValue, 1, {result: JSON.parse(data)});
          });
        //this.orderListLoading = true;
      },
    },
    methods: {

      /**
       * @disc: 交易对类型选择
       * @params: type 0:自选1:nuls 2:usdi
       * @date: 2019-12-13 14:31
       * @author: Wave
       */
      orderValue(type) {
        this.coinOrderValue = type;
      },

      /**
       * @disc: 获取交易对挂单盘口
       * @params: tradingHash
       * @params: depthValue 精度系数
       * @params: type 0：接口查询 1：websocket推送
       * @params: dataInfo
       * @date: 2019-12-13 15:44
       * @author: Wave
       */
      async getOrderList(tradingHash, depthValue, type = 0, dataInfo = {}) {
        let coinRes = dataInfo;
        if (type === 0) {
          let url = '/order/list/';
          let data = {"tradingHash": tradingHash, "decimal": depthValue, "type": 0, "size": 20};
          coinRes = await this.$dexPost(url, data);
          if (!coinRes.success) {
            this.$message({message: '获取交易对挂单错误:' + JSON.stringify(coinRes.data), type: 'error', duration: 3000});
          }
        }
        //console.log(coinRes);
        for (let item of coinRes.result.buyOrderList) {
          //console.log(item);
          item.prices = parseFloat(Number(divisionDecimals(item.price, item.quoteDecimal)).toFixed(5));
          item.number = parseFloat(Number(Division(item.quoteAmount, item.price)).toFixed(5));
          item.amount = parseFloat(Number(Times(item.prices, item.number)).toFixed(5));
        }
        for (let item of coinRes.result.sellOrderList) {
          item.prices = parseFloat(Number(divisionDecimals(item.price, item.quoteDecimal)).toFixed(5));
          item.number = parseFloat(Number(divisionDecimals(item.baseAmount, item.baseDecimal)).toFixed(5));
          item.amount = parseFloat(Number(Times(item.prices, item.number)).toFixed(5));
        }
        this.buyData = coinRes.result.buyOrderList;
        this.sellData = coinRes.result.sellOrderList;
        this.orderListLoading = false;
      },

      /**
       * @disc: 选择深度
       * @params: value
       * @date: 2020-01-03 17:01
       * @author: Wave
       */
      changeDepth(value) {
        this.depthValue = value;
        this.getOrderList(this.$store.getters.getDealData.hash, this.depthValue);
      },

    }
  }
</script>

<style lang="less">
  @import "../../assets/css/style";

  .right_bar {
    .title {
      border-bottom: @BD1;
      background-color: @Bcolour2;
      height: 39px;
      line-height: 30px;
      .fl {
        i {
          cursor: pointer;
          color: #608FFF;
          font-size: 18px;
          margin: 0 10px;
          border: 1px solid #888db5;
          border-radius: 2px;
          &:hover {
            border: 1px solid #149af2;
          }
          &:first-child {
            margin: 0 0 0 10px;
          }
          &:last-child {
            margin: 0;
          }
        }
        .is_checked {
          border: 1px solid #149af2;
        }
      }
      .fr {
        margin: 0 5px 0 0;
        .font12 {
          color: #7d7f93;
        }
        .depth {
          margin: 0 0 0 5px;
          .el-input--suffix {
            width: 28px;
            .el-input__inner {
              height: 18px;
              width: 28px;
              padding: 0 0 0 5px;
              border-radius: 2px;
              background-color: @Bcolour2;
              border: 1px solid #888db5;
            }
            .el-input__suffix {
              right: -5px;
              .el-input__suffix-inner {
                .el-select__caret {
                  line-height: 16px;
                  height: 16px;
                }
              }
            }
          }
          .el-select-dropdown {
            min-width: 28px;
            background-color: transparent;
            border: 1px solid #4c506f;
            margin: -7px 0 0 0;
            .el-select-dropdown__list {
              .el-select-dropdown__item {
                padding: 0 5px;
                line-height: 20px;
                height: 20px;
                font-size: 12px;
              }
              .hover {

              }
            }
            .popper__arrow {
              display: none;
            }
          }
        }
      }
    }
    .buy, .sell {
      min-height: 50px;
      .t_tr {
        &:hover {
          background-color: transparent;
        }
        &:nth-child(2n+1) {
          background-color: #0b0c14;
        }
        .t_bg {
          .t_bt {
            background-color: #291b2c;
          }
        }
      }
    }
    .r_middle {
      background-color: #1c1e31;
      height: 40px;
      width: 100%;
      padding: 5px 0 0 10px;
      color: @Ncolour;
      font-size: 22px;
      font-weight: bold;
      border: 0;
      font {
        color: #ffffff;
        font-size: 16px;
        margin: 0 0 0 10px;
      }
    ;
    }
    .sell {
      .t_tr {
        .t_bg {
          .t_bt {
            background-color: #14272c;
          }
        }
      }
    }
  }
</style>
