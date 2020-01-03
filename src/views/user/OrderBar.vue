<template>
  <div class="order_bar w1400">
    <el-tabs v-model="orderTab" @tab-click="orderTabsClick" class="order_tab">
      <el-tab-pane label="当前委托" name="currentEntrust" class="current_entrust">
        <div class="mt_20">
          <el-table :data="entrustData">
            <el-table-column prop="hashs" label="交易HASH" width="150" align="center">
            </el-table-column>
            <el-table-column prop="time" label="时间" width="160" align="center">
            </el-table-column>
            <el-table-column prop="tradingName" label="交易对" width="100" align="center">
            </el-table-column>
            <el-table-column label="方向" width="80" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.type ===1 ? '买单':'卖单'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="prices" label="单价" width="130" align="center">
            </el-table-column>
            <el-table-column prop="number" label="数量" width="130" align="center">
            </el-table-column>
            <el-table-column prop="total" label="总额" width="130" align="center">
            </el-table-column>
            <el-table-column prop="quantity" label="已成交数量" width="160" align="center">
            </el-table-column>
            <el-table-column prop="totalTurnover" label="已成交总额" width="160" align="center">
            </el-table-column>
            <el-table-column label="成交率" width="100" align="center">
              <template slot-scope="scope">
                <span>{{Number(scope.row.turnover*100).toFixed(2)}}%</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" min-width="60" align="center">
              <template slot-scope="scope">
                <el-link type="primary">撤销</el-link>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="历史成交" name="historyDeal" class="history_deal">
        <div class="mt_20">
          <div class="select">
            <el-date-picker type="daterange" align="right" unlink-panels
                            start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期"
                            v-model="dateValue" :picker-options="pickerOptions">
            </el-date-picker>

            <el-select v-model="currencyValue" filterable placeholder="请选择币种" class="currency">
              <el-option v-for="item in currencyOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>

            <el-select v-model="directionValue" placeholder="请选择" class="direction">
              <el-option v-for="item in directionOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>

            <el-button type="primary" icon="el-icon-search" class="select_input">搜索</el-button>
          </div>
          <el-table :data="historicalData">
            <el-table-column prop="hash" label="交易HASH" width="180" align="center">
            </el-table-column>
            <el-table-column prop="time" label="时间" width="180" align="center">
            </el-table-column>
            <el-table-column prop="deal" label="交易对" width="180" align="center">
            </el-table-column>
            <el-table-column prop="direction" label="方向" width="180" align="center">
            </el-table-column>
            <el-table-column prop="price" label="单价" width="180" align="center">
            </el-table-column>
            <el-table-column prop="number" label="数量" width="180" align="center">
            </el-table-column>
            <el-table-column prop="totalTurnover" label="成交总额" width="180" align="center">
            </el-table-column>
            <el-table-column prop="turnover" label="手续费" min-width="140" align="center">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="历史委托" name="historyEntrust" class="history_entrust">
        <div class="mt_20">
          <div class="select">
            <el-date-picker v-model="dateValue" type="daterange" range-separator="至 " start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>

            <el-select v-model="currencyValue" filterable placeholder="请选择币种" class="currency">
              <el-option v-for="item in currencyOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>

            <el-select v-model="directionValue" placeholder="请选择" class="direction">
              <el-option v-for="item in directionOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>

            <el-button type="primary" icon="el-icon-search" class="select_input">搜索</el-button>
          </div>
          <el-table :data="historyEntrustData">
            <el-table-column prop="hash" label="交易HASH" width="110" align="center">
            </el-table-column>
            <el-table-column prop="time" label="时间" width="120" align="center">
            </el-table-column>
            <el-table-column prop="deal" label="交易对" width="120" align="center">
            </el-table-column>
            <el-table-column prop="direction" label="方向" width="120" align="center">
            </el-table-column>
            <el-table-column prop="price" label="单价" width="160" align="center">
            </el-table-column>
            <el-table-column prop="number" label="数量" width="160" align="center">
            </el-table-column>
            <el-table-column prop="turnover" label="成交率" width="160" align="center">
            </el-table-column>
            <el-table-column prop="averagePrice" label="平均价格" width="160" align="center">
            </el-table-column>
            <el-table-column prop="totalTurnover" label="已成交总额" width="160" align="center">
            </el-table-column>
            <el-table-column prop="type" label="状态" min-width="100" align="center">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import moment from 'moment'
  import {divisionDecimals, getLocalTime, timesDecimals, superLong, Division} from '@/api/util.js'

  export default {
    data() {
      return {
        accountInfo: JSON.parse(localStorage.getItem('accountInfo')),//账户信息
        tradingInfo: JSON.parse(sessionStorage.getItem('dealData')),//交易对信息

        orderTab: 'currentEntrust',//tab选项
        //当前委托列表
        entrustData: [],

        dateValue: '',//时间选择
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },

        currencyOptions: [
          {value: 'USDI', label: 'USDI/NULS'},
          {value: 'BTC', label: 'BTC/NULS'},
          {value: 'ETH', label: 'ETH/NULS'},
          {value: 'EOS', label: 'EOS/NULS'},
          {value: 'BTT', label: 'BTT/NULS'}
        ],
        currencyValue: '',//币种选择内容
        directionOptions: [
          {value: '0', label: '全部方向'},
          {value: '1', label: '买入'},
          {value: '2', label: '卖出'},
        ],
        directionValue: '0',//方向选择内容
        //历史成交列表
        historicalData: [],

        //历史委托列表
        historyEntrustData: [],

        pageIndex: 1, //页码
        pageSize: 10, //每页条数
        pageTotal: 0,//总页数
      }
    },
    created() {
      this.getEntrustList(this.accountInfo.address, this.pageIndex, this.pageSize);
    },
    mounted() {
      /*this.userSetInterval = setInterval(() => {
        this.addressInfoByAddress(this.accountInfo.address);
      }, 10000)*/
    },
    destroyed() {
      //clearInterval(this.userSetInterval);
    },
    components: {},
    methods: {

      /**
       * @disc: tab 切换
       * @params: tab
       * @date: 2020-01-03 10:51
       * @author: Wave
       */
      orderTabsClick(tab) {
        if (tab.name === 'currentEntrust') {
          this.getEntrustList(this.accountInfo.address, this.pageIndex, this.pageSize);
        } else if (tab.name === 'historyDeal') {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          this.getHistoricalList(this.accountInfo.address, this.pageIndex, this.pageSize, start.valueOf(), end.valueOf());
        } else {
          this.getHistoryEntrustList(this.accountInfo.address, this.pageIndex, this.pageSize, 1, 1);
        }
      },

      /**
       * @disc: 获取用户当前委托列表
       * @params: address
       * @params: pageIndex
       * @params: pageSize
       * @date: 2019-12-13 15:44
       * @author: Wave
       */
      async getEntrustList(address, pageIndex, pageSize) {
        let url = '/order/list/address';
        let data = {"address": address, "pageNumber": pageIndex, "pageSize": pageSize};
        let entrustListRes = await this.$dexPost(url, data);
        //console.log(entrustListRes);
        if (!entrustListRes.success) {
          this.$message({message: '获取用户当前委托列表错误:' + JSON.stringify(coinRes.data), type: 'error', duration: 3000});
        }
        for (let item of entrustListRes.result.list) {
          //console.log(item);
          item.hashs = superLong(item.hash, 6);
          item.time = moment(getLocalTime(item.createTime)).format('YYYY-MM-DD HH:mm:ss');
          item.prices = Number(divisionDecimals(item.price, item.quoteDecimal)).toFixed(5);
          item.number = Number(divisionDecimals(item.baseAmount, item.baseDecimal)).toFixed(5);
          item.quantity = Number(divisionDecimals(item.baseDealAmount, item.baseDecimal)).toFixed(5);
          item.total = Number(divisionDecimals(item.quoteAmount, item.quoteDecimal)).toFixed(5);
          item.totalTurnover = Number(divisionDecimals(item.quoteDealAmount, item.quoteDecimal)).toFixed(5);
          item.turnover = Number(Division(Number(item.totalTurnover), Number(item.total)));
        }
        this.entrustData = entrustListRes.result.list;
      },

      /**
       * @disc: 获取用户已成交列表
       * @params: address
       * @params: pageIndex
       * @params: pageSize
       * @params: beginTime
       * @params: endTime
       * @date: 2019-12-13 15:44
       * @author: Wave
       */
      async getHistoricalList(address, pageIndex, pageSize, beginTime, endTime) {
        let url = '/deal/list/address';
        let data = {
          "address": address,
          "pageNumber": pageIndex,
          "pageSize": pageSize,
          "beginTime": beginTime,
          "endTime": endTime
        };
        console.log(data);
        let entrustListRes = await this.$dexPost(url, data);
        console.log(entrustListRes);
        /*if (!entrustListRes.success) {
          this.$message({message: '获取用户已成交列表错误:' + JSON.stringify(entrustListRes.data), type: 'error', duration: 3000});
        }
        for (let item of entrustListRes.result.list) {
          item.hashs = superLong(item.hash, 6);
          item.time = moment(getLocalTime(item.createTime)).format('YYYY-MM-DD HH:mm:ss');
          item.prices = Number(divisionDecimals(item.price, item.quoteDecimal)).toFixed(5);
          item.number = Number(divisionDecimals(item.baseAmount, item.baseDecimal)).toFixed(5);
          item.quantity = Number(divisionDecimals(item.baseDealAmount, item.baseDecimal)).toFixed(5);
          item.total = Number(divisionDecimals(item.quoteAmount, item.quoteDecimal)).toFixed(5);
          item.totalTurnover = Number(divisionDecimals(item.quoteDealAmount, item.quoteDecimal)).toFixed(5);
          item.turnover = Number(Division(Number(item.totalTurnover), Number(item.total)));
        }*/
        this.historicalData = entrustListRes.result.list;
      },

      /**
       * @disc: 获取用户历史委托列表
       * @params: address
       * @params: pageIndex
       * @params: pageSize
       * @params: beginTime
       * @params: endTime
       * @date: 2019-12-13 15:44
       * @author: Wave
       */
      async getHistoryEntrustList(address, pageIndex, pageSize, beginTime, endTime) {
        let url = '/deal/list/address';
        let data = {
          "address": address,
          "pageNumber": pageIndex,
          "pageSize": pageSize,
          "beginTime": beginTime,
          "endTime": endTime
        };
        let entrustListRes = await this.$dexPost(url, data);
        console.log(entrustListRes);
        if (!entrustListRes.success) {
          this.$message({
            message: '获取用户历史委托列表错误:' + JSON.stringify(entrustListRes.data),
            type: 'error',
            duration: 3000
          });
        }
        for (let item of entrustListRes.result.list) {
          item.hashs = superLong(item.hash, 6);
          item.time = moment(getLocalTime(item.createTime)).format('YYYY-MM-DD HH:mm:ss');
          item.prices = Number(divisionDecimals(item.price, item.quoteDecimal)).toFixed(5);
          item.number = Number(divisionDecimals(item.baseAmount, item.baseDecimal)).toFixed(5);
          item.quantity = Number(divisionDecimals(item.baseDealAmount, item.baseDecimal)).toFixed(5);
          item.total = Number(divisionDecimals(item.quoteAmount, item.quoteDecimal)).toFixed(5);
          item.totalTurnover = Number(divisionDecimals(item.quoteDealAmount, item.quoteDecimal)).toFixed(5);
          item.turnover = Number(Division(Number(item.totalTurnover), Number(item.total)));
        }
        this.historyEntrustData = entrustListRes.result.list;
      },

      /**
       * @disc: url 连接
       * @params: name
       * @params: params
       * @params: type
       * @date: 2019-08-20 18:01
       * @author: Wave
       */
      toUrl(name, parameter, type) {
        let newPath = connect(name, parameter, type);
        if (newPath.success) {
          this.$router.push(newPath.data);
        }
      },
    },
  }
</script>

<style lang="less">
  .order_bar {
    .order_tab {
      .el-tabs__header {
        .el-tabs__nav-wrap {
          height: 40px !important;
          line-height: 40px !important;
          margin: 20px 0 0 0;
          &:after {
            background-color: #c0c4cc;
            height: 2px !important;
          }
          .el-tabs__nav-scroll {
            .el-tabs__nav {
              .el-tabs__item {
                font-size: 14px;
              }
            }
          }

        }
      }
      .el-tabs__content {
        .select {
          margin: -3px 0 30px 0;
          height: 30px;
          .el-input__inner {
            line-height: 28px;
            height: 28px;
            border-radius: 2px;
            padding: 3px;
          }
          .el-range__icon {
            line-height: 20px;
          }
          .el-range-separator {
            width: 22px;
            line-height: 20px;
          }
          .currency, .direction {
            margin: 0 20px;
            .el-input__suffix {
              .el-input__icon {
                line-height: 26px;
              }
            }
          }
          .direction {
            margin: 0 20px 0 0;
          }
          .select_input {
            padding: 5px 10px;
            border-radius: 2px;
          }
        }
      }
    }
  }
</style>
