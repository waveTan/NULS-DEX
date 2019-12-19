<template>
  <div class="trading">
    <div class="w1400">

      <!-- top start -->
      <div class="top">

        <!-- top_left start -->
        <div class="fl left">
          <Left></Left>
        </div>
        <!-- top_left end -->

        <!-- top_middle start -->
        <div class="fl middle">
          <div class="m_top" v-loading="tradingInfoLoading">
            <div class="m_p_list fl">{{tradingInfo.tradingName}}</div>
            <div class="m_p_list fl">
              <div>最新价</div>
              <div>{{tradingInfo.newPrices}}</div>
            </div>
            <div class="m_p_list fl">
              <div>24h涨跌</div>
              <div>{{tradingInfo.upsDowns}}</div>
            </div>
            <div class="m_p_list fl">
              <div>24h最高价</div>
              <div>{{tradingInfo.highPrice24s}}</div>
            </div>
            <div class="m_p_list fl">
              <div>24h最低价</div>
              <div>{{tradingInfo.lowPrice24s}}</div>
            </div>
            <div class="m_p_list fl">
              <div>24h成交量</div>
              <div>{{tradingInfo.dealAmount24s}}</div>
            </div>
          </div>

          <div class="m_middle">
            <div class="title sub_info fwhite">
              <div class="conditon fl">
                <el-select v-model="minuteValue" placeholder="分钟" class="c_select fl" :popper-append-to-body="false">
                  <el-option v-for="item in minuteOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="hourValue" placeholder="小时" class="c_select fl" :popper-append-to-body="false">
                  <el-option v-for="item in hourOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <span class="c_span">日线</span>
                <span class="c_span">周线</span>
                <span class="c_span">月线</span>
                <span class="c_span">全部</span>
              </div>
              <div class="look fr">
                <span class="is_active">TradingView</span>
                <span>深度图</span>
                <i class="el-icon-s-help"></i>
              </div>
            </div>
            <div>
              <ve-candle :data="chartData"></ve-candle>
            </div>
          </div>

          <div class="m_footer">
            <div class="title sub_info fwhite">
              限价单
            </div>
            <div class="buy_sell">
              <div class="fl buy">
                <div class="name">
                  <span class="font14">买入 USDI</span><font class="fr font12">可用: 2365.2365 NULS</font>
                </div>
                <el-form :model="buyForm" :rules="buyRules" ref="buyForm" class="buy_form" label-width="44px">
                  <el-form-item label="价格">
                    <el-input v-model="buyForm.name">
                      <i slot="suffix">NULS</i>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="数量">
                    <el-input v-model="buyForm.name">
                      <i slot="suffix">USDI</i>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="" class="percentage">
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </el-form-item>
                  <el-form-item label="金额">
                    <el-input v-model="buyForm.name">
                      <i slot="suffix">NULS</i>
                    </el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="success" @click="submitForm('buyForm')">买入 USDI</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <div class="fr sell">
                <div class="name">
                  <span class="font14">卖出 USDI</span><font class="fr font12">可用: 2365.2365 NULS</font>
                </div>
                <el-form :model="buyForm" :rules="buyRules" ref="buyForm" class="buy_form" label-width="44px">
                  <el-form-item label="价格">
                    <el-input v-model="buyForm.name">
                      <i slot="suffix">NULS</i>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="数量">
                    <el-input v-model="buyForm.name">
                      <i slot="suffix">USDI</i>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="" class="percentage">
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </el-form-item>
                  <el-form-item label="金额">
                    <el-input v-model="buyForm.name">
                      <i slot="suffix">NULS</i>
                    </el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="danger" @click="submitForm('buyForm')">卖出 USDI</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>
        <!-- top_middle end -->

        <!-- top_right start -->
        <div class="fr right">
          <Right></Right>
        </div>
        <!-- top_right end -->

      </div>
      <!-- top end -->

      <!-- footer start -->
      <div class="footer cd">
        <div class="title font12">
          <span class="fwhite">当前委托</span>
          <font class="fr fwhite">全部订单<i class="el-icon-d-arrow-right"></i></font>
        </div>
        <div class="table cb">
          <el-table :data="entrustData" stripe style="width: 100%">
            <el-table-column prop="hash" align="center" label="交易hash" min-width="100">
            </el-table-column>
            <el-table-column prop="time" align="center" label="时间" width="110">
            </el-table-column>
            <el-table-column prop="counterparty" align="center" label="交易对" width="110">
            </el-table-column>
            <el-table-column prop="price" align="center" label="方向" width="110">
            </el-table-column>
            <el-table-column prop="price" align="center" label="单价" width="110">
            </el-table-column>
            <el-table-column prop="price" align="center" label="数量" width="110">
            </el-table-column>
            <el-table-column prop="price" align="center" label="总额" width="110">
            </el-table-column>
            <el-table-column prop="price" align="center" label="已成交数量" width="110">
            </el-table-column>
            <el-table-column prop="price" align="center" label="成交率" width="110">
            </el-table-column>
            <el-table-column prop="price" align="center" label="已成交总额" width="110">
            </el-table-column>
            <el-table-column prop="price" align="center" label="已成交总额" width="110">
            </el-table-column>
            <el-table-column prop="price" align="center" label="操作" width="110">
              <template slot-scope="scope">
                <el-link type="primary">撤销</el-link>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- footer end -->

    </div>
  </div>

</template>

<script>
  import moment from 'moment'
  import Left from '@/views/trading/Left'
  import Right from '@/views/trading/Right'
  import {divisionDecimals, getLocalTime} from '@/api/util.js'

  export default {
    data() {
      return {
        tradingInfo: {},//交易对信息
        tradingInfoLoading: false,
        //分钟下拉框
        minuteOptions: [
          {
            value: '5',
            label: '5分钟'
          }, {
            value: '15',
            label: '15分钟'
          }, {
            value: '30',
            label: '30分钟'
          }, {
            value: '45',
            label: '45分钟'
          }],
        minuteValue: '',
        //小时下拉框
        hourOptions: [
          {
            value: '1',
            label: '1小时'
          }, {
            value: '6',
            label: '6小时'
          }, {
            value: '12',
            label: '12小时'
          }, {
            value: '18',
            label: '18小时'
          }],
        hourValue: '',
        //k线图
        chartData: {
          columns: ['time', 'open', 'close', 'lowest', 'highest', 'vol'],
          rows: [
            {'日期': '2004-01-05', open: 10411.85, close: 10544.07, lowest: 10411.85, highest: 10575.92, vol: 221290000},
            {'日期': '2004-01-06', open: 10543.85, close: 10538.66, lowest: 10454.37, highest: 10584.07, vol: 191460000},
            {'日期': '2004-01-07', open: 10535.46, close: 10529.03, lowest: 10432.12, highest: 10587.55, vol: 225490000},
            {'日期': '2004-01-08', open: 10530.07, close: 10592.44, lowest: 10480.59, highest: 10651.99, vol: 237770000},
            {'日期': '2004-01-09', open: 10589.25, close: 10458.89, lowest: 10420.52, highest: 10603.48, vol: 223250000},
            {'日期': '2004-01-12', open: 10461.55, close: 10485.18, lowest: 10389.85, highest: 10543.03, vol: 197960000},
            {'日期': '2004-01-13', open: 10485.18, close: 10427.18, lowest: 10341.19, highest: 10539.25, vol: 197310000},
            {'日期': '2004-01-14', open: 10428.67, close: 10538.37, lowest: 10426.89, highest: 10573.85, vol: 186280000},
            {'日期': '2004-01-15', open: 10534.52, close: 10553.85, lowest: 10454.52, highest: 10639.03, vol: 260090000},
            {'日期': '2004-01-16', open: 10556.37, close: 10600.51, lowest: 10503.71, highest: 10666.88, vol: 254170000},
            {'日期': '2004-01-20', open: 10601.42, close: 10528.66, lowest: 10447.92, highest: 10676.96, vol: 224300000},
            {'日期': '2004-01-21', open: 10522.77, close: 10623.62, lowest: 10453.11, highest: 10665.72, vol: 214920000},
            {'日期': '2004-01-22', open: 10624.22, close: 10623.18, lowest: 10545.03, highest: 10717.41, vol: 219720000},
            {'日期': '2004-01-23', open: 10625.25, close: 10568.29, lowest: 10490.14, highest: 10691.77, vol: 234260000},
            {'日期': '2004-01-26', open: 10568.12, close: 10702.51, lowest: 10510.44, highest: 10725.18, vol: 186170000},
            {'日期': '2004-01-27', open: 10701.11, close: 10609.92, lowest: 10579.33, highest: 10748.81, vol: 206560000},
            {'日期': '2004-01-28', open: 10610.07, close: 10468.37, lowest: 10412.44, highest: 10703.25, vol: 247660000},
            {'日期': '2004-01-29', open: 10467.41, close: 10510.29, lowest: 10369.92, highest: 10611.56, vol: 273970000},
            {'日期': '2004-01-30', open: 10510.22, close: 10488.07, lowest: 10385.56, highest: 10551.03, vol: 208990000},
            {'日期': '2004-02-02', open: 10487.78, close: 10499.18, lowest: 10395.55, highest: 10614.44, vol: 224800000},
            {'日期': '2004-02-03', open: 10499.48, close: 10505.18, lowest: 10414.15, highest: 10571.48, vol: 183810000},
            {'日期': '2004-02-04', open: 10503.11, close: 10470.74, lowest: 10394.81, highest: 10567.85, vol: 227760000},
            {'日期': '2004-02-05', open: 10469.33, close: 10495.55, lowest: 10399.92, highest: 10566.37, vol: 187810000},
            {'日期': '2004-02-06', open: 10494.89, close: 10593.03, lowest: 10433.74, highest: 10634.81, vol: 182880000},
            {'日期': '2004-02-09', open: 10592.41, close: 10579.03, lowest: 10433.72, highest: 10634.81, vol: 160720000},
            {'日期': '2004-02-10', open: 10578.74, close: 10613.85, lowest: 10511.18, highest: 10667.03, vol: 160590000},
            {'日期': '2004-02-11', open: 10605.48, close: 10737.72, lowest: 10561.55, highest: 10779.41, vol: 277850000},
            {'日期': '2004-02-12', open: 10735.18, close: 10694.07, lowest: 10636.44, highest: 10775.03, vol: 197560000},
            {'日期': '2004-02-13', open: 10696.22, close: 10627.85, lowest: 10578.66, highest: 10755.47, vol: 208340000},
            {'日期': '2004-02-17', open: 10628.88, close: 10714.88, lowest: 10628.88, highest: 10762.07, vol: 169730000},
            {'日期': '2004-02-18', open: 10706.68, close: 10671.99, lowest: 10623.62, highest: 10764.36, vol: 164370000},
            {'日期': '2004-02-19', open: 10674.59, close: 10664.73, lowest: 10626.44, highest: 10794.95, vol: 219890000},
            {'日期': '2004-02-20', open: 10666.29, close: 10619.03, lowest: 10559.11, highest: 10722.77, vol: 220560000},
            {'日期': '2004-02-23', open: 10619.55, close: 10609.62, lowest: 10508.89, highest: 10711.84, vol: 229950000},
            {'日期': '2004-02-24', open: 10609.55, close: 10566.37, lowest: 10479.33, highest: 10681.41, vol: 225670000},
            {'日期': '2004-02-25', open: 10566.59, close: 10601.62, lowest: 10509.42, highest: 10660.73, vol: 192420000},
            {'日期': '2004-02-26', open: 10598.14, close: 10580.14, lowest: 10493.71, highest: 10652.96, vol: 223230000},
            {'日期': '2004-02-27', open: 10581.55, close: 10583.92, lowest: 10519.03, highest: 10689.55, vol: 200050000}
          ]
        },
        buyForm: {
          name: ''
        },
        buyRules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
        },

        entrustData: [],//当前委托列表
      };
    },
    created() {
      this.tradingInfo = this.$store.getters.getDealData;
      this.getTradingGet(this.tradingInfo.hash);
    },
    components: {Left, Right},
    computed: {
      tradingName() {
        return this.$store.getters.getDealData.tradingName
      }
    },
    watch: {
      tradingName: function () {
        this.tradingInfo = this.$store.getters.getDealData;
        this.getTradingInfo(this.tradingInfo.hash);
        this.getTradingGet(this.tradingInfo.hash);
        this.tradingInfoLoading = true;
      }
    },
    methods: {

      /**
       * @disc: 获取交易对详情
       * @params: tradingHash
       * @date: 2019-12-16 10:41
       * @author: Wave
       */
      async getTradingInfo(tradingHash) {
        let url = '/coin/trading/get/' + tradingHash;
        let tradingInfoRes = await this.$get(url);
        //console.log(tradingInfoRes);
        if (!tradingInfoRes.success) {
          this.$message({message: '获取交易对错误:' + JSON.stringify(tradingInfoRes.data), type: 'error', duration: 3000});
          return;
        }
        tradingInfoRes.result.newPrices = divisionDecimals(tradingInfoRes.result.newPrice, tradingInfoRes.result.baseDecimal);
        tradingInfoRes.result.upsDowns = tradingInfoRes.result.highPrice24 - tradingInfoRes.result.lowPrice24 === 0 ? 0 : (tradingInfoRes.result.highPrice24 - tradingInfoRes.result.lowPrice24) / tradingInfoRes.result.lowPrice24;
        tradingInfoRes.result.highPrice24s = divisionDecimals(tradingInfoRes.result.highPrice24, tradingInfoRes.result.baseDecimal);
        tradingInfoRes.result.lowPrice24s = divisionDecimals(tradingInfoRes.result.lowPrice24, tradingInfoRes.result.baseDecimal);
        tradingInfoRes.result.dealAmount24s = divisionDecimals(tradingInfoRes.result.dealAmount24, tradingInfoRes.result.baseDecimal);
        this.tradingInfo = tradingInfoRes.result;
        this.tradingInfoLoading = false;
      },

      /**
       * @disc: 获取交易对K线图
       * @params: tradingHash
       * @date: 2019-12-16 10:41
       * @author: Wave
       */
      async getTradingGet(tradingHash) {
        let url = '/view/kLine/list';
        let data = {"tradingHash": tradingHash, "type": 1,};
        let tradingGetRes = await this.$post(url, data);
        //console.log(tradingGetRes);
        if (!tradingGetRes.success) {
          this.$message({message: '获取交易对K线图:' + JSON.stringify(TradingInfoRes.data), type: 'error', duration: 3000});
          return;
        }
        for (let item of tradingGetRes.result) {
          item.time = moment(getLocalTime(item.beginTime)).format('YYYY-MM-DD HH:mm:ss');
          item.open = Number(divisionDecimals(item.endPrice, item.baseDecimal)).toFixed(3);
          item.close = Number(divisionDecimals(item.beginPrice, item.baseDecimal)).toFixed(3);
          item.lowest = Number(divisionDecimals(item.endPrice, item.baseDecimal)).toFixed(3);
          item.highest = Number(divisionDecimals(item.beginPrice, item.baseDecimal)).toFixed(3);
          item.vol = Number(item.amount).toFixed(3)
        }
        this.chartData.rows = tradingGetRes.result
      },
    }
  }
</script>

<style lang="less">
  @import "../../assets/css/style";

  .trading {
    background-color: #0b0c14;
    min-height: 1120px;
    .top {
      height: 805px;
      padding: 20px 0 0 0;

      .left {
        width: 300px;
        min-height: 300px;
      }

      .middle {
        width: 780px;
        margin: 0 10px;
        .m_top {
          height: 65px;
          background-color: @Bcolour2;
          .m_p_list {
            width: 16.66%;
            color: #dedede;
            text-align: center;
            line-height: 18px;
            font-size: 14px;
            margin: 13px 0 0 0;
            border-left: @BD1;
            &:first-child {
              line-height: 60px;
              font-size: 18px;
              margin: 0;
              border: 0;
            }
          }
        }
        .m_middle {
          height: 370px;
          background-color: @Bcolour2;
          margin: 10px 0;
          .title {
            border-bottom: @BD1;
            height: 40px;
            line-height: 40px;
            padding: 0 0 0 16px;
          }
          .conditon {
            width: 75%;
            .c_select {
              line-height: 28px;
              width: 70px;
              margin: 6px 0 0 0;
              .el-input {
                .el-input__inner {
                  line-height: 28px;
                  width: 55px;
                  height: 28px;
                  background-color: @Bcolour2;
                  padding: 0 5px;
                  border: 0;
                }
                .el-input__suffix {
                  right: 0;
                  .el-input__icon {
                    line-height: 28px;
                  }
                }
              }
              .el-select-dropdown {
                border: @BD1;
                background-color: transparent;
                top: 21px !important;
                border-top: 0;
                border-radius: 0;
                .el-scrollbar {
                  .el-select-dropdown__list {
                    .el-select-dropdown__item {
                      padding: 0 5px;
                      font-size: 12px;
                      line-height: 28px;
                      height: 28px;
                      text-align: center;
                    }
                  }
                }
                .popper__arrow {
                  display: none;
                }
              }
            }
            .c_span {
              font-size: 12px;
              color: #ced0de;
              padding: 0 15px;
            }
          }
          .look {
            color: #ced0de;
            span {
              padding: 0 24px;
              font-size: 12px;
              &:first-child {
                padding: 0;
              }
            }
            i {
              padding: 0 12px 0 0;
            }
            .is_active {

              color: #149a2f;
            }
          }
        }
        .m_footer {
          height: 320px;
          background-color: @Bcolour2;
          .title {
            border-bottom: @BD1;
            height: 40px;
            line-height: 40px;
            padding: 0 0 0 16px;
          }
          .buy_sell {
            .buy, .sell {
              border-right: 1px solid #4c506f;
              width: 335px;
              height: 236px;
              margin: 18px 0 0 55px;
              padding: 0 55px 0 0;
              .name {
                color: #edeef6;
                margin: 0 0 16px;
              }
              .buy_form {
                .el-form-item {
                  margin-bottom: 0;
                  .el-form-item__label {
                    text-align: left;
                    line-height: 38px !important;
                    font-size: 12px;
                    color: #7d7f93;
                  }
                  .el-form-item__content {
                    font-size: 12px;
                    line-height: 38px;
                    .el-input {
                      font-size: 12px;
                      line-height: 30px;
                      height: 30px;
                      .el-input__inner {
                        line-height: 30px;
                        height: 30px;
                        border-radius: 0;
                        background-color: transparent;
                        border-color: #888db5;
                      }
                      .el-input__suffix {
                        right: 12px;
                        i {
                        }
                      }
                    }
                    .el-button {
                      width: 280px;
                      height: 35px;
                      border-radius: 0;
                      color: #ffffff;
                      font-size: 14px;
                      margin: 19px 0 0 -44px;
                      line-height: 12px;
                    }
                    .el-button--success {
                      background-color: #06ba63;
                      border-color: #06ba63;
                    }
                    .el-button--mini {
                      width: 48.7px;
                      height: 22px;
                      padding: 0;
                      text-align: center;
                      border-radius: 0;
                      background-color: transparent;
                      border-color: #888db5;
                    }
                  }
                }
                .percentage {
                  .el-form-item__content {
                    margin: 4px 0;
                    span {
                      width: 50px;
                      height: 22px;
                      border: 1px solid #7d7f93;
                      display: block;
                      float: left;
                      color: #edeef6;
                      text-align: center;
                      line-height: 20px;
                      margin: 0 11.5px 0 0;
                      cursor: pointer;
                      &:hover {
                        color: #06ba63;
                        border-color: #06ba63;
                      }
                      &:last-child {
                        margin: 0;
                      }
                    }
                  }

                }
              }
            }
            .sell {
              margin: 18px 0 0 55px;
              padding: 0 55px 0 0;
              border: 0;
              .el-form {
                .el-form-item {
                  .el-form-item__content {
                    .el-button--danger {
                      border-color: #db4355;
                      background-color: #db4355;
                    }
                  }
                }
                .percentage {
                  .el-form-item__content {
                    span {
                      &:hover {
                        color: #db4355;
                        border-color: #db4355;
                      }
                    }
                  }
                }
              }

            }
          }
        }
      }

      .right {
        width: 300px;
        height: 775px;
      }

    }
    .footer {
      height: 300px;
      border: @BD1;
      margin: 0 0 60px 0;
      background-color: @Bcolour2;
      .title {
        font-size: 14px;
        line-height: 40px;
        padding: 0 0 0 10px;
        width: 100%;
        border-bottom: @BD1;
        .fr {
          padding: 0 10px 0 0;
        }
      }
    }
  }
</style>
