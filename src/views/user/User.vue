<template>
  <div class="account">
    <el-tabs v-model="userTab" @tab-click="userTabsClick" class="user_tabs">
      <el-tab-pane label="资产" name="assets">
        <AssetsBar>
        </AssetsBar>
      </el-tab-pane>
      <el-tab-pane label="订单" name="order">
        <OrderBar>
        </OrderBar>
      </el-tab-pane>
    </el-tabs>
    <Password ref="password" @passwordSubmit="passSubmit">
    </Password>
  </div>
</template>

<script>
  import Password from '@/components/PasswordBar'
  import AssetsBar from '@/views/user/AssetsBar'
  import OrderBar from '@/views/user/OrderBar'
  import {divisionDecimals, connect} from '@/api/util'
  import {getAddressInfoByAddress} from '@/api/requestData'

  export default {
    data() {
      return {
        accountInfo: JSON.parse(localStorage.getItem('accountInfo')),//账户信息
        userTab: 'assets',
        activeName: 'second',
      }
    },
    created() {
      this.addressInfoByAddress(this.accountInfo.address);
    },
    mounted() {
      this.userSetInterval = setInterval(() => {
        this.addressInfoByAddress(this.accountInfo.address);
      }, 10000)
    },
    destroyed() {
      clearInterval(this.userSetInterval);
    },
    components: {
      Password,
      AssetsBar,
      OrderBar
    },
    methods: {

      /**
       * @disc:获取地址信息
       * @param address
       * @date: 2019-08-20 16:58
       * @author: Wave
       */
      async addressInfoByAddress(address) {
        let newData = {aesPri: this.accountInfo.aesPri, pub: this.accountInfo.pub};
        let newAddressInfo = await getAddressInfoByAddress(address);
        //console.log(newAddressInfo);
        if (newAddressInfo.success) {
          this.accountInfo = {};
          newAddressInfo.data.balance = divisionDecimals(newAddressInfo.data.balance,8);
          this.accountInfo = {...newData, ...newAddressInfo.data};
        } else {
          this.accountInfo.balance = 0
        }
      },

      userTabsClick(tab, event) {
        console.log(tab, event);
      },

      handleClick(tab, event) {
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
  @import "./../../assets/css/style";

  .account {
    margin: 0 auto;
    .user_tabs {
      .el-tabs__header {
        margin: 0;
        .el-tabs__nav-wrap {
          height: 60px;
          line-height: 50px;
          &:after{
            background: linear-gradient(bottom, #ffffff, #E4E7ED);
            height: 10px;
          }
          .el-tabs__nav-scroll {
            width: 1400px;
            margin: 0 auto;
            .el-tabs__active-bar {
              background-color: transparent;
            }
            .el-tabs__item {
              font-size: 18px;
            }
          }
        }
      }
    }
    .address {
      span {
        color: #17202e;
        @media screen and (max-width: 1024px) {
          font-size: 0.8rem;
          display: block;
          margin: 0.5rem 0 0 0.5rem;
        }
      }
      font {
        @media screen and (max-width: 1024px) {
          font-size: 0.8rem;
          display: block;
          float: none;
          margin: 0.5rem 0 0 0.5rem;
        }
      }
    }
  }


</style>
