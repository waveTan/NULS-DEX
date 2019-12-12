<template>
  <div class="assets_bar w1400">
    <div class="address">
      <span class="font16">{{$t('public.address')}}:</span><font>{{accountInfo.address}}</font>
      <i class="el-icon-money click font18"></i>
      <i class="el-icon-document click font18"></i>
    </div>
    <div class="tab">
      <div class="assets_tool">
        <div class="search fl">
          <el-input placeholder="搜索币种" v-model="searchValue" suffix-icon="el-icon-search">
          </el-input>
        </div>
        <el-checkbox v-model="checked">隐藏小额资产</el-checkbox>
        <span class="fr font12">总估值: 1.265 BTC $19536</span>
      </div>
      <div class="assets_tab">
        <el-table :data="assersData">
          <el-table-column prop="currency" label="币种" width="180" align="center">
          </el-table-column>
          <el-table-column prop="name" label="名称" width="180" align="center">
          </el-table-column>
          <el-table-column prop="total" label="总额" width="180" align="center">
          </el-table-column>
          <el-table-column prop="usable" label="可用" width="180" align="center">
          </el-table-column>
          <el-table-column prop="frozen" label="冻结" width="180" align="center">
          </el-table-column>
          <el-table-column prop="orderFreeze" label="下单冻结" width="180" align="center">
          </el-table-column>
          <el-table-column prop="valuation" label="BTC估值" width="180" align="center">
          </el-table-column>
          <el-table-column label="发送资产" min-width="100" align="center">
            <template slot-scope="scope">
              <el-link type="primary">转账</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "assets-bar",
    data() {
      return {
        accountInfo: JSON.parse(localStorage.getItem('accountInfo')),//账户信息
        searchValue: '',//搜索币种
        //资产数据
        assersData: [
          {
            currency: 'NULS',
            name: 'NULS',
            total: '6.1565',
            usable: '4.2145',
            frozen: '445.55',
            orderFreeze: '6.1546',
            valuation: '13.156'
          },
          {
            currency: 'NULS',
            name: 'NULS',
            total: '6.1565',
            usable: '4.2145',
            frozen: '445.55',
            orderFreeze: '6.1546',
            valuation: '13.156'
          },
          {
            currency: 'NULS',
            name: 'NULS',
            total: '6.1565',
            usable: '4.2145',
            frozen: '445.55',
            orderFreeze: '6.1546',
            valuation: '13.156'
          },
          {
            currency: 'NULS',
            name: 'NULS',
            total: '6.1565',
            usable: '4.2145',
            frozen: '445.55',
            orderFreeze: '6.1546',
            valuation: '13.156'
          },
          {
            currency: 'NULS',
            name: 'NULS',
            total: '6.1565',
            usable: '4.2145',
            frozen: '445.55',
            orderFreeze: '6.1546',
            valuation: '13.156'
          },
          {
            currency: 'NULS',
            name: 'NULS',
            total: '6.1565',
            usable: '4.2145',
            frozen: '445.55',
            orderFreeze: '6.1546',
            valuation: '13.156'
          },
          {
            currency: 'NULS',
            name: 'NULS',
            total: '6.1565',
            usable: '4.2145',
            frozen: '445.55',
            orderFreeze: '6.1546',
            valuation: '13.156'
          },
        ]
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
    components: {
      //Password,
    },
    methods: {}
  }
</script>

<style lang="less">
  @import "./../../assets/css/style";

  .assets_bar {
    .address {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #E5E7F0;
      .el-icon-money{
        margin: 0 10px;
      }
    }
    .tab {
      .assets_tool {
        .search {
          width: 210px;
          margin: 20px 0;
          .el-input__inner {
            height: 35px;
            border-radius: 2px;
          }
          .el-input__suffix {
            .el-input__icon {
              line-height: 35px;
            }
          }
        }
        .el-checkbox {
          margin: 28px 0 0 20px;
          .el-checkbox__label {
            font-size: 12px;
            padding-left: 4px;
          }
        }
        .fr {
          margin: 30px 0 0 0;
        }
      }
      .assets_tab {
      }
    }
  }

</style>
