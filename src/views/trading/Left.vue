<template>
  <div class="left_bar">
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
        <el-table :data="counterpartyData" stripe style="width: 100%" height="180px" class="scroll">
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
</template>

<script>
  export default {
    name: "left",
    data() {
      return {
        search: '',//搜索框内容
        radio: '1',//单选选择
        //交易对列表
        counterpartyData: [
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
    created() {},
    components: {},
    methods: {}
  }
</script>

<style lang="less">
  @import "../../assets/css/style";
  .left_bar{
    .l_top {
      background-color: @Bcolour2;
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
</style>
