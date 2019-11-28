<template>
  <div class="trading">
    <div class="w1200">

      <!-- top start -->
      <div class="top">

        <!-- top_left start -->
        <div class="fl left">
          <Left></Left>
        </div>
        <!-- top_left end -->

        <!-- top_middle start -->
        <div class="fl middle">
          <!-- top_middle_top start -->
          <div class="m_top">
            <div class="m_p_list fl">NULS/BTC</div>
            <div class="m_p_list fl">
              <div>最新价</div>
              <div>1.36658</div>
            </div>
            <div class="m_p_list fl">
              <div>24h涨跌</div>
              <div>+25.36%</div>
            </div>
            <div class="m_p_list fl">
              <div>24h最高价</div>
              <div>1.3662228</div>
            </div>
            <div class="m_p_list fl">
              <div>24h最低价</div>
              <div>1.36658</div>
            </div>
            <div class="m_p_list fl">
              <div>24h成交量</div>
              <div>8136,6585,22</div>
            </div>
          </div>
          <!-- top_middle_top end -->

          <div class="m_middle">
            m_middle
          </div>

          <div class="m_footer">m_footer</div>
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
  import Left from '@/views/trading/Left'
  import Right from '@/views/trading/Right'

  export default {
    data() {
      return {
        //当前委托列表
        entrustData: [
          {
            hash: 'sf545...d4f55',
            time: '10-25 15:25:45',
            counterparty: 'USDT/BNB',
            direction: '买入',
            price: '0.01235',
            count: '1000.56',
            total: '13.325',
            turnover: '500',
            trunoverRatio: '60',
            trunoverTotal: '3.265'
          },
          {
            hash: 'sf545...d4f55',
            time: '10-25 15:25:45',
            counterparty: 'USDT/BNB',
            direction: '买入',
            price: '0.01235',
            count: '1000.56',
            total: '13.325',
            turnover: '500',
            trunoverRatio: '60',
            trunoverTotal: '3.265'
          },
          {
            hash: 'sf545...d4f55',
            time: '10-25 15:25:45',
            counterparty: 'USDT/BNB',
            direction: '买入',
            price: '0.01235',
            count: '1000.56',
            total: '13.325',
            turnover: '500',
            trunoverRatio: '60',
            trunoverTotal: '3.265'
          },
          {
            hash: 'sf545...d4f55',
            time: '10-25 15:25:45',
            counterparty: 'USDT/BNB',
            direction: '买入',
            price: '0.01235',
            count: '1000.56',
            total: '13.325',
            turnover: '500',
            trunoverRatio: '60',
            trunoverTotal: '3.265'
          },
          {
            hash: 'sf545...d4f55',
            time: '10-25 15:25:45',
            counterparty: 'USDT/BNB',
            direction: '买入',
            price: '0.01235',
            count: '1000.56',
            total: '13.325',
            turnover: '500',
            trunoverRatio: '60',
            trunoverTotal: '3.265'
          },
          {
            hash: 'sf545...d4f55',
            time: '10-25 15:25:45',
            counterparty: 'USDT/BNB',
            direction: '买入',
            price: '0.01235',
            count: '1000.56',
            total: '13.325',
            turnover: '500',
            trunoverRatio: '60',
            trunoverTotal: '3.265'
          },
          {
            hash: 'sf545...d4f55',
            time: '10-25 15:25:45',
            counterparty: 'USDT/BNB',
            direction: '买入',
            price: '0.01235',
            count: '1000.56',
            total: '13.325',
            turnover: '500',
            trunoverRatio: '60',
            trunoverTotal: '3.265'
          },
          {
            hash: 'sf545...d4f55',
            time: '10-25 15:25:45',
            counterparty: 'USDT/BNB',
            direction: '买入',
            price: '0.01235',
            count: '1000.56',
            total: '13.325',
            turnover: '500',
            trunoverRatio: '60',
            trunoverTotal: '3.265'
          },
          {
            hash: 'sf545...d4f55',
            time: '10-25 15:25:45',
            counterparty: 'USDT/BNB',
            direction: '买入',
            price: '0.01235',
            count: '1000.56',
            total: '13.325',
            turnover: '500',
            trunoverRatio: '60',
            trunoverTotal: '3.265'
          },
        ]
      };
    },
    created() {
    },
    components: {Left, Right},
    methods: {}
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
          border: @BD1;
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
          border: @BD1;
          margin: 10px 0;
        }
        .m_footer {
          height: 320px;
          border: @BD1;
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
      margin: 0 0 0 0;
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
