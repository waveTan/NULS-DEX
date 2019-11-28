<template>
  <div class="right_bar">
    <div class="title fwhite">
      <div class="fl">
        <i class="el-icon-s-fold click"></i>
        <i class="el-icon-s-unfold click"></i>
        <i class="el-icon-s-operation click"></i>
      </div>
      <div class="fr">
        <span class="font12">深度合并</span>
        <el-select v-model="depthValue" class="depth" :popper-append-to-body="false">
          <el-option v-for="item in 3" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </div>
    </div>

    <div class="table cb">
      <el-table :data="buyData" stripe>
        <el-table-column prop="price" align="center" label="价格(NULS)" width="95">
        </el-table-column>
        <el-table-column prop="count" align="center" label="数量(USDI)" width="75">
        </el-table-column>
        <el-table-column align="center" label="成交额(NULS)" min-width="75">
          <template slot-scope="scope">
            <span>{{scope.row.transaction}}%</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="title r_middle">
      <span>36566.36<i class="el-icon-top"></i> $5336.66</span>
    </div>

    <div class="table cb">
      <el-table :data="sellData" stripe>
        <el-table-column prop="price" align="center" label="价格(NULS)" width="95">
        </el-table-column>
        <el-table-column prop="count" align="center" label="数量(USDI)" width="75">
        </el-table-column>
        <el-table-column align="center" label="成交额(NULS)" min-width="75">
          <template slot-scope="scope">
            <span>{{scope.row.transaction}}%</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
  export default {
    name: "right",
    data() {
      return {
        //买列表
        buyData: [
          {price: 'BTC/NULS', count: '1.2222', transaction: "55.26"},
          {price: 'BTC/NULS', count: '1.2222', transaction: "55.26"},
          {price: 'BTC/NULS', count: '1.2222', transaction: "55.26"},
          {price: 'BTC/NULS', count: '1.2222', transaction: "55.26"},
          {price: 'BTC/NULS', count: '1.2222', transaction: "55.26"},
          {price: 'BTC/NULS', count: '1.2222', transaction: "55.26"},
          {price: 'BTC/NULS', count: '1.2222', transaction: "55.26"},
          {price: 'BTC/NULS', count: '1.2222', transaction: "55.26"},
          {price: 'BTC/NULS', count: '1.2222', transaction: "55.26"},
          {price: 'BTC/NULS', count: '1.2222', transaction: "55.26"},
          {price: 'BTC/NULS', count: '1.2222', transaction: "55.26"},
          {price: 'BTC/NULS', count: '1.2222', transaction: "55.26"},
          {price: 'BTC/NULS', count: '1.2222', transaction: "55.26"},
        ],
        //卖列表
        sellData: [
          {price: 'BTC/NULS', count: '1.2222', transaction: "55.26"},
          {price: 'BTC/NULS', count: '1.2222', transaction: "55.26"},
          {price: 'BTC/NULS', count: '1.2222', transaction: "55.26"},
          {price: 'BTC/NULS', count: '1.2222', transaction: "55.26"},
          {price: 'BTC/NULS', count: '1.2222', transaction: "55.26"},
          {price: 'BTC/NULS', count: '1.2222', transaction: "55.26"},
          {price: 'BTC/NULS', count: '1.2222', transaction: "55.26"},
          {price: 'BTC/NULS', count: '1.2222', transaction: "55.26"},
          {price: 'BTC/NULS', count: '1.2222', transaction: "55.26"},
          {price: 'BTC/NULS', count: '1.2222', transaction: "55.26"},
          {price: 'BTC/NULS', count: '1.2222', transaction: "55.26"},
          {price: 'BTC/NULS', count: '1.2222', transaction: "55.26"},
          {price: 'BTC/NULS', count: '1.2222', transaction: "55.26"},
          {price: 'BTC/NULS', count: '1.2222', transaction: "55.26"},
          {price: 'BTC/NULS', count: '1.2222', transaction: "55.26"},
        ],
        depthValue: '1',//深度系数
      };
    },
    created() {
    },
    components: {},
    methods: {}
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
          font-size: 20px;
          margin: 0 2.5px;
          &:first-child {
            margin: 0 0 0 5px;
          }
        }
      }
      .fr {
        margin: 0 5px 0 0;
        .depth {
          margin: 0 0 0 5px;
          .el-input--suffix {
            width: 28px;
            .el-input__inner {
              height: 18px;
              width: 28px;
              padding: 0 0 0 5px;
              border-radius: 1px;
              background-color: @Bcolour2;
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
            min-width: 28px !important;
            .el-select-dropdown__list {
              .el-select-dropdown__item {
                padding: 0 5px;
                line-height: 20px;
                height: 20px;
              }
            }
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
    }

  }
</style>
