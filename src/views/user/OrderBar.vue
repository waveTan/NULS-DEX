<template>
  <div class="order_bar w1400">
    <el-tabs v-model="orderTab" @tab-click="orderTabsClick" class="order_tab">
      <el-tab-pane label="当前委托" name="currentEntrust" class="current_entrust">
        <div class="mt_20">
          <el-table :data="entrustData">
            <el-table-column prop="hash" label="交易HASH" width="110" align="center">
            </el-table-column>
            <el-table-column prop="time" label="时间" width="120" align="center">
            </el-table-column>
            <el-table-column prop="deal" label="交易对" width="100" align="center">
            </el-table-column>
            <el-table-column prop="direction" label="方向" width="80" align="center">
            </el-table-column>
            <el-table-column prop="price" label="单价" width="160" align="center">
            </el-table-column>
            <el-table-column prop="number" label="数量" width="160" align="center">
            </el-table-column>
            <el-table-column prop="total" label="总额" width="160" align="center">
            </el-table-column>
            <el-table-column prop="quantity" label="已成交数量" width="160" align="center">
            </el-table-column>
            <el-table-column prop="turnover" label="成交率" width="100" align="center">
            </el-table-column>
            <el-table-column prop="totalTurnover" label="已成交总额" width="160" align="center">
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
  export default {
    name: "order-bar",
    data() {
      return {
        accountInfo: JSON.parse(localStorage.getItem('accountInfo')),//账户信息
        orderTab: 'currentEntrust',//tab选项
        //当前委托列表
        entrustData: [
          {
            hash: 'sdfsdf...1231',
            time: '11-22 12:45:78',
            deal: 'USID/NULS',
            direction: '买入',
            price: 0.2658754,
            number: 123456.123456,
            total: 123456.32164,
            quantity: 654.123,
            turnover: '56%',
            totalTurnover: '123456.456'
          },
          {
            hash: 'sdfsdf...1231',
            time: '11-22 12:45:78',
            deal: 'USID/NULS',
            direction: '买入',
            price: 0.2658754,
            number: 123456.123456,
            total: 123456.32164,
            quantity: 654.123,
            turnover: '56%',
            totalTurnover: '123456.456'
          },
          {
            hash: 'sdfsdf...1231',
            time: '11-22 12:45:78',
            deal: 'USID/NULS',
            direction: '买入',
            price: 0.2658754,
            number: 123456.123456,
            total: 123456.32164,
            quantity: 654.123,
            turnover: '56%',
            totalTurnover: '123456.456'
          },
          {
            hash: 'sdfsdf...1231',
            time: '11-22 12:45:78',
            deal: 'USID/NULS',
            direction: '买入',
            price: 0.2658754,
            number: 123456.123456,
            total: 123456.32164,
            quantity: 654.123,
            turnover: '56%',
            totalTurnover: '123456.456'
          },
          {
            hash: 'sdfsdf...1231',
            time: '11-22 12:45:78',
            deal: 'USID/NULS',
            direction: '买入',
            price: 0.2658754,
            number: 123456.123456,
            total: 123456.32164,
            quantity: 654.123,
            turnover: '56%',
            totalTurnover: '123456.456'
          },
          {
            hash: 'sdfsdf...1231',
            time: '11-22 12:45:78',
            deal: 'USID/NULS',
            direction: '买入',
            price: 0.2658754,
            number: 123456.123456,
            total: 123456.32164,
            quantity: 654.123,
            turnover: '56%',
            totalTurnover: '123456.456'
          },
          {
            hash: 'sdfsdf...1231',
            time: '11-22 12:45:78',
            deal: 'USID/NULS',
            direction: '买入',
            price: 0.2658754,
            number: 123456.123456,
            total: 123456.32164,
            quantity: 654.123,
            turnover: '56%',
            totalTurnover: '123456.456'
          },
          {
            hash: 'sdfsdf...1231',
            time: '11-22 12:45:78',
            deal: 'USID/NULS',
            direction: '买入',
            price: 0.2658754,
            number: 123456.123456,
            total: 123456.32164,
            quantity: 654.123,
            turnover: '56%',
            totalTurnover: '123456.456'
          },
          {
            hash: 'sdfsdf...1231',
            time: '11-22 12:45:78',
            deal: 'USID/NULS',
            direction: '买入',
            price: 0.2658754,
            number: 123456.123456,
            total: 123456.32164,
            quantity: 654.123,
            turnover: '56%',
            totalTurnover: '123456.456'
          },
        ],

        dateValue: '',//时间选择
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
        historicalData: [
          {
            hash: 'sdfsdf...1231',
            time: '11-22 12:45:78',
            deal: 'USID/NULS',
            direction: '买入',
            price: 0.2658754,
            number: 123456.123456,
            totalTurnover: '123456.456',
            turnover: '0.001'
          },
          {
            hash: 'sdfsdf...1231',
            time: '11-22 12:45:78',
            deal: 'USID/NULS',
            direction: '买入',
            price: 0.2658754,
            number: 123456.123456,
            totalTurnover: '123456.456',
            turnover: '0.001'
          },
          {
            hash: 'sdfsdf...1231',
            time: '11-22 12:45:78',
            deal: 'USID/NULS',
            direction: '买入',
            price: 0.2658754,
            number: 123456.123456,
            totalTurnover: '123456.456',
            turnover: '0.001'
          },
          {
            hash: 'sdfsdf...1231',
            time: '11-22 12:45:78',
            deal: 'USID/NULS',
            direction: '买入',
            price: 0.2658754,
            number: 123456.123456,
            totalTurnover: '123456.456',
            turnover: '0.001'
          },
          {
            hash: 'sdfsdf...1231',
            time: '11-22 12:45:78',
            deal: 'USID/NULS',
            direction: '买入',
            price: 0.2658754,
            number: 123456.123456,
            totalTurnover: '123456.456',
            turnover: '0.001'
          },
          {
            hash: 'sdfsdf...1231',
            time: '11-22 12:45:78',
            deal: 'USID/NULS',
            direction: '买入',
            price: 0.2658754,
            number: 123456.123456,
            totalTurnover: '123456.456',
            turnover: '0.001'
          },
          {
            hash: 'sdfsdf...1231',
            time: '11-22 12:45:78',
            deal: 'USID/NULS',
            direction: '买入',
            price: 0.2658754,
            number: 123456.123456,
            totalTurnover: '123456.456',
            turnover: '0.001'
          },
          {
            hash: 'sdfsdf...1231',
            time: '11-22 12:45:78',
            deal: 'USID/NULS',
            direction: '买入',
            price: 0.2658754,
            number: 123456.123456,
            totalTurnover: '123456.456',
            turnover: '0.001'
          },
          {
            hash: 'sdfsdf...1231',
            time: '11-22 12:45:78',
            deal: 'USID/NULS',
            direction: '买入',
            price: 0.2658754,
            number: 123456.123456,
            totalTurnover: '123456.456',
            turnover: '0.001'
          },
        ],

        //历史委托列表
        historyEntrustData: [
          {
            hash: 'sdfsdf...1231',
            time: '11-22 12:45:78',
            deal: 'USID/NULS',
            direction: '买入',
            price: 0.2658754,
            number: 123456.123456,
            turnover: '56%',
            averagePrice: '0.1245646',
            totalTurnover: '123456.456',
            type: '0'
          },
          {
            hash: 'sdfsdf...1231',
            time: '11-22 12:45:78',
            deal: 'USID/NULS',
            direction: '买入',
            price: 0.2658754,
            number: 123456.123456,
            turnover: '56%',
            averagePrice: '0.1245646',
            totalTurnover: '123456.456',
            type: '0'
          },
          {
            hash: 'sdfsdf...1231',
            time: '11-22 12:45:78',
            deal: 'USID/NULS',
            direction: '买入',
            price: 0.2658754,
            number: 123456.123456,
            turnover: '56%',
            averagePrice: '0.1245646',
            totalTurnover: '123456.456',
            type: '0'
          },
          {
            hash: 'sdfsdf...1231',
            time: '11-22 12:45:78',
            deal: 'USID/NULS',
            direction: '买入',
            price: 0.2658754,
            number: 123456.123456,
            turnover: '56%',
            averagePrice: '0.1245646',
            totalTurnover: '123456.456',
            type: '0'
          },
          {
            hash: 'sdfsdf...1231',
            time: '11-22 12:45:78',
            deal: 'USID/NULS',
            direction: '买入',
            price: 0.2658754,
            number: 123456.123456,
            turnover: '56%',
            averagePrice: '0.1245646',
            totalTurnover: '123456.456',
            type: '0'
          },
          {
            hash: 'sdfsdf...1231',
            time: '11-22 12:45:78',
            deal: 'USID/NULS',
            direction: '买入',
            price: 0.2658754,
            number: 123456.123456,
            turnover: '56%',
            averagePrice: '0.1245646',
            totalTurnover: '123456.456',
            type: '0'
          },
          {
            hash: 'sdfsdf...1231',
            time: '11-22 12:45:78',
            deal: 'USID/NULS',
            direction: '买入',
            price: 0.2658754,
            number: 123456.123456,
            turnover: '56%',
            averagePrice: '0.1245646',
            totalTurnover: '123456.456',
            type: '0'
          },
          {
            hash: 'sdfsdf...1231',
            time: '11-22 12:45:78',
            deal: 'USID/NULS',
            direction: '买入',
            price: 0.2658754,
            number: 123456.123456,
            turnover: '56%',
            averagePrice: '0.1245646',
            totalTurnover: '123456.456',
            type: '0'
          },
          {
            hash: 'sdfsdf...1231',
            time: '11-22 12:45:78',
            deal: 'USID/NULS',
            direction: '买入',
            price: 0.2658754,
            number: 123456.123456,
            turnover: '56%',
            averagePrice: '0.1245646',
            totalTurnover: '123456.456',
            type: '0'
          },
          {
            hash: 'sdfsdf...1231',
            time: '11-22 12:45:78',
            deal: 'USID/NULS',
            direction: '买入',
            price: 0.2658754,
            number: 123456.123456,
            turnover: '56%',
            averagePrice: '0.1245646',
            totalTurnover: '123456.456',
            type: '0'
          },
        ],
      }
    },
    created() {
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
      orderTabsClick(tab, event) {
        console.log(tab, event);
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
