<template>
  <div class="chart">
    <div class="title sub_info fwhite" v-if="false">
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
    <div id="tv_chart_container" class="f-fill" style="height:370px; width: 780px"></div>
  </div>
</template>

<script>
  import TVjsApi from "./api/index";

  let jsApi = null; //图表配置项
  export default {
    data() {
      return {
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

        transpair: "APPLE-CNY" //这里写死了
      };
    },
    mounted() {
      jsApi = new TVjsApi(this.transpair);
      jsApi.init(); //图表初始化
    },
    destroyed() {
      jsApi.destoryinstance().then(bool => {
        if (bool) {
          jsApi = null;
        }
      });
    }
  };
</script>

<style lang="less">
  @import "../../assets/css/style";

  .chart {
    height: 370px;
    width: 780px;
    background-color: @Bcolour2;
    margin: 10px 0;
    flex: 1;
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
</style>
