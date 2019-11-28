<template>
  <div class="trading">
    <div class="w1200">

      <!-- top start -->
      <div class="top">

        <!-- top_left start -->
        <div class="fl left">
          <!-- top_left_top start -->
          <div class="l_top">

            <div class="title sub_info">
              <span class="fwhite is_checked">自选</span>
              <span class="fwhite">NULS</span>
              <span class="fwhite">USDI</span>
            </div>

            <div class="search cb">
              <div class="fl">
                <el-input placeholder="请输入交易对" prefix-icon="el-icon-search" v-model="search">
                </el-input>
              </div>
              <div class="fr">
                <el-radio v-model="radio" label="1">涨幅</el-radio>
                <el-radio v-model="radio" label="2">成交量</el-radio>
              </div>
            </div>

            <div class="table cb">
              <el-table :data="tableData" stripe style="width: 100%" height="180px" class="scroll">
                <el-table-column label="" width="45" align="center">
                  <template slot-scope="scope">
                  <span class="click">
                    <i class="el-icon-star-off"></i>
                  </span>
                  </template>
                </el-table-column>
                <el-table-column prop="counterparty" align="center" label="交易对" width="95">
                </el-table-column>
                <el-table-column prop="price" align="center" label="价格" width="75">
                </el-table-column>
                <el-table-column align="center" label="涨跌" min-width="75">
                  <template slot-scope="scope">
                    <span>{{scope.row.limit}}%</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>

          </div>
          <!-- top_left_top end -->

          <!-- top_left_footer start -->
          <div class="l_footer">
            <div class="title sub_info fwhite">
              最新成交
            </div>

            <div class="table cb">
              <el-table :data="newestData" stripe>
                <el-table-column align="center" label="价格" width="100">
                  <template slot-scope="scope">
                    <span>{{scope.row.price}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="quantity" align="center" label="数量" width="100">
                </el-table-column>
                <el-table-column prop="time" align="center" label="时间" min-width="75">
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!-- top_left_footer end -->
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

          <div class="m_middle">m_middle</div>

          <div class="m_footer">m_footer</div>
        </div>
        <!-- top_middle end -->

        <!-- top_right start -->
        <div class="fr right">right</div>
        <!-- top_right end -->

      </div>
      <!-- top end -->

      <!-- footer start -->
      <div class="footer cd">
        bottom
      </div>
      <!-- footer end -->

    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        search: '',//搜索框内容
        radio: '1',//单选选择
        //交易对列表
        tableData: [
          {counterparty: 'BTC/NULS', price: '1.2222', limit: "55.26"},
          {counterparty: 'USDI/NULS', price: '1.2222', limit: "-5.26"},
          {counterparty: 'OTN/NULS', price: '1.2222', limit: "-55.26"},
          {counterparty: 'NIT/NULS', price: '1.2222', limit: "5.26"},
          {counterparty: 'STESE/NULS', price: '1.2222', limit: "-0.26"},
          {counterparty: 'ONDS/NULS', price: '1.2222', limit: "5.26"},
          {counterparty: 'USDI/NULS', price: '1.2222', limit: "-55.26"},
          {counterparty: 'OTN/NULS', price: '1.2222', limit: "55.26"},
          {counterparty: 'NIT/NULS', price: '1.2222', limit: "-55.26"},
          {counterparty: 'STESE/NULS', price: '1.2222', limit: "-55.26"},
          {counterparty: 'ONDS/NULS', price: '1.2222', limit: "-55.26"},
        ],
        //最新成交列表
        newestData: [
          {price: '1.225555', quantity: '56,6255.25', time: "11:52:56"},
          {price: '1.225555', quantity: '56,6255.25', time: "11:52:56"},
          {price: '1.225555', quantity: '56,6255.25', time: "11:52:56"},
          {price: '1.225555', quantity: '56,6255.25', time: "11:52:56"},
          {price: '1.225555', quantity: '56,6255.25', time: "11:52:56"},
          {price: '1.225555', quantity: '56,6255.25', time: "11:52:56"},
          {price: '1.225555', quantity: '56,6255.25', time: "11:52:56"},
          {price: '1.225555', quantity: '56,6255.25', time: "11:52:56"},
          {price: '1.225555', quantity: '56,6255.25', time: "11:52:56"},
          {price: '1.225555', quantity: '56,6255.25', time: "11:52:56"},
          {price: '1.225555', quantity: '56,6255.25', time: "11:52:56"},
          {price: '1.225555', quantity: '56,6255.25', time: "11:52:56"},
          {price: '1.225555', quantity: '56,6255.25', time: "11:52:56"},
          {price: '1.225555', quantity: '56,6255.25', time: "11:52:56"},
          {price: '1.225555', quantity: '56,6255.25', time: "11:52:56"},
          {price: '1.225555', quantity: '56,6255.25', time: "11:52:56"},
          {price: '1.225555', quantity: '56,6255.25', time: "11:52:56"},
          {price: '1.225555', quantity: '56,6255.25', time: "11:52:56"},
          {price: '1.225555', quantity: '56,6255.25', time: "11:52:56"},
        ],
      };
    },
    created() {
    },
    methods: {}
  }
</script>

<style lang="less">
  @import "./../assets/css/style";

  .trading {
    background-color: #0b0c14;
    .top {
      height: 805px;
      padding: 20px 0 0 0;

      .left {
        width: 300px;
        .l_top {
          background-color: #141627;
          height: 260px;
          .title {
            height: 40px;
            line-height: 40px;
            padding: 0 0 0 15px;
            border-bottom: @BD1;
            span {
              margin: 0 5px;
              padding: 3px 7px;
              border-radius: 2px;
            }
            .is_checked {
              background-color: #149af2;
            }
          }

          .search {
            height: 40px;
            .fl {
              width: 150px;
              .el-input {
                margin: 10px 0 0 10px;
                .el-input__inner {
                  line-height: 20px;
                  height: 20px;
                  border-radius: 0;
                  background-color: #141627;
                  padding-left: 23px;
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
              .el-radio {
                margin: 12px 10px 0 0;
                .el-radio__label {
                  padding-left: 5px;
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
        border: @BD1;
      }

    }
    .footer {
      height: 300px;
      border: @BD1;
      margin: 0 0 100px 0;
    }
  }
</style>
