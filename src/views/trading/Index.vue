<template>
  <div class="trading">
    <div class="w1400">

      <!-- top start -->
      <div class="top">

        <!-- top_left start -->
        <div class="fl left">
          <LeftBar></LeftBar>
        </div>
        <!-- top_left end -->

        <!-- top_middle start -->
        <div class="fl middle">
          <div class="m_top" v-loading="tradingInfoLoading">
            <div class="m_p_list fl">{{tradingInfo.tradingName}}</div>
            <div class="m_p_list fl">
              <div>最新价</div>
              <div>{{Number(tradingInfo.newPrices).toFixed(5)}}</div>
            </div>
            <div class="m_p_list fl">
              <div>24h涨跌</div>
              <div>{{Number(tradingInfo.upsDowns).toFixed(3)}}%</div>
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
            <ChartBar :tradingHash="tradingInfo.hash"></ChartBar>
          </div>

          <div class="m_footer">
            <div class="title sub_info fwhite">
              限价单
            </div>
            <div class="buy_sell">
              <div class="fl buy">
                <div class="name">
                  <span class="font14">买入 {{tradingInfo.symbol}}</span>
                  <font class="fr font12" v-show="accountInfo.address">可用: {{quoteAssetInfo.balances}} NULS</font>
                </div>
                <el-form :model="buyForm" :rules="buyRules" ref="buyForm" class="buy_form" label-width="44px">
                  <el-form-item label="价格">
                    <el-input oninput="value=value.replace(/[^0-9.]/g,'')" v-model="buyForm.price">
                      <i slot="suffix">NULS</i>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="数量">
                    <el-input v-model="buyForm.num">
                      <i slot="suffix">{{tradingInfo.symbol}}</i>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="" class="percentage">
                    <span @click="choiceBuy(0.25)" :class="buySpan===0.25 ? 'is_span' : ''">25%</span>
                    <span @click="choiceBuy(0.5)" :class="buySpan===0.5 ? 'is_span' : ''">50%</span>
                    <span @click="choiceBuy(0.75)" :class="buySpan===0.75 ? 'is_span' : ''">75%</span>
                    <span @click="choiceBuy(1)" :class="buySpan===1 ? 'is_span' : ''">100%</span>
                  </el-form-item>
                  <el-form-item label="金额">
                    <el-input v-model="buyForm.amount">
                      <i slot="suffix">NULS</i>
                    </el-input>
                  </el-form-item>
                  <div v-if="accountInfo.address">
                    <div class="fred font10" v-show="Number(buyForm.amount) < Number(tradingInfo.quoteMinSize)">
                      最小挂单额: {{tradingInfo.quoteMinSize}}
                      <span class="fCN">NULS</span>
                    </div>
                    <el-form-item>
                      <el-button type="success" @click="submitBuyForm('buyForm')"
                                 :disabled="Number(buyForm.amount) <= Number(tradingInfo.quoteMinSize)">
                        买入 {{tradingInfo.symbol}}
                      </el-button>
                    </el-form-item>
                  </div>
                  <div v-else class="no_user">
                    <el-button>登录进行交易</el-button>
                  </div>
                </el-form>
              </div>
              <div class="fr sell">
                <div class="name">
                  <span class="font14">卖出 {{tradingInfo.symbol}}</span>
                  <font class="fr font12" v-show="accountInfo.address">可用: {{baseAssetInfo.balances}}
                    {{tradingInfo.symbol}}</font>
                </div>
                <el-form :model="sellForm" :rules="sellRules" ref="sellForm" class="buy_form" label-width="44px">
                  <el-form-item label="价格">
                    <el-input v-model="sellForm.price">
                      <i slot="suffix">NULS</i>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="数量">
                    <el-input v-model="sellForm.num">
                      <i slot="suffix">{{tradingInfo.symbol}}</i>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="" class="percentage">
                    <span @click="choiceSell(0.25)" :class="sellSpan===0.25 ? 'is_span' : ''">25%</span>
                    <span @click="choiceSell(0.5)" :class="sellSpan===0.5 ? 'is_span' : ''">50%</span>
                    <span @click="choiceSell(0.75)" :class="sellSpan===0.75 ? 'is_span' : ''">75%</span>
                    <span @click="choiceSell(1)" :class="sellSpan===1 ? 'is_span' : ''">100%</span>
                  </el-form-item>
                  <el-form-item label="金额">
                    <el-input v-model="sellForm.amount">
                      <i slot="suffix">NULS</i>
                    </el-input>
                  </el-form-item>
                  <div v-if="accountInfo.address">
                    <div class="fred font10" v-show="Number(sellForm.amount) < Number(tradingInfo.quoteMinSize)">
                      最小挂单额: {{tradingInfo.quoteMinSize}}
                      <span class="fCN">NULS</span>
                    </div>
                    <el-form-item>
                      <el-button type="danger" @click="submitSellForm('buyForm')"
                                 :disabled="Number(sellForm.amount) <= Number(tradingInfo.quoteMinSize)">
                        卖出 {{tradingInfo.symbol}}
                      </el-button>
                    </el-form-item>
                  </div>
                  <div v-else class="no_user">
                    <el-button>登录进行交易</el-button>
                  </div>
                </el-form>
              </div>
            </div>
          </div>
        </div>
        <!-- top_middle end -->

        <!-- top_right start -->
        <div class="fr right">
          <RightBar :tradingInfo="tradingInfo"></RightBar>
        </div>
        <!-- top_right end -->

      </div>
      <!-- top end -->

      <!-- footer start -->
      <div class="footer cd" v-show="accountInfo.address">
        <div class="title font12">
          <span class="fwhite">当前委托</span>
          <font class="fr fwhite">全部订单<i class="el-icon-d-arrow-right"></i></font>
        </div>
        <div class="table cb">
          <el-table :data="entrustData" stripe style="width: 100%" class="entrust">
            <el-table-column prop="hashs" align="center" label="交易hash" min-width="100">
            </el-table-column>
            <el-table-column prop="time" align="center" label="时间" width="160">
            </el-table-column>
            <el-table-column prop="tradingName" align="center" label="交易对" width="110">
            </el-table-column>
            <el-table-column align="center" label="方向" width="110">
              <template slot-scope="scope">
                <span>{{scope.row.type ===1 ? '买单':'卖单'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="price" align="center" label="单价" width="110">
            </el-table-column>
            <el-table-column prop="number" align="center" label="数量" width="110">
            </el-table-column>
            <el-table-column prop="totalAmount" align="center" label="总额" width="110">
            </el-table-column>
            <el-table-column align="center" label="成交率" width="110">
              <template slot-scope="scope">
                <span>{{scope.row.ratio*100}}%</span>
              </template>
            </el-table-column>
            <el-table-column prop="dealNumber" align="center" label="已成交总数" width="110">
            </el-table-column>
            <el-table-column prop="dealTotalAmount" align="center" label="已成交总额" width="110">
            </el-table-column>
            <el-table-column align="center" label="操作" width="110">
              <template slot-scope="scope">
                <el-link type="primary" class="font12">撤销</el-link>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- footer end -->

    </div>
    <Password ref="password" @passwordSubmit="coinPassSubmit">
    </Password>
  </div>

</template>

<script>
  import moment from 'moment'
  import nuls from 'nuls-sdk-js'
  import sdk from 'nuls-sdk-js/lib/api/sdk'
  import LeftBar from '@/views/trading/Left'
  import ChartBar from '@/views/trading/Chart'
  import RightBar from '@/views/trading/Right'
  import Password from '@/components/PasswordBar'
  import {
    divisionDecimals,
    getLocalTime,
    Times,
    timesDecimals,
    passwordVerification,
    superLong,
    Division
  } from '@/api/util.js'
  import {getBaseAssetInfo, validateAndBroadcast} from '@/api/requestData.js'

  export default {
    data() {
      return {
        accountInfo: {},//账户信息
        tradingInfo: {},//交易对信息
        quoteAssetInfo: {},//买 资产信息
        baseAssetInfo: {},//卖 资产信息
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

        orderType: 1,  //委托挂单类型 1:买单，2:卖单
        buyForm: {
          price: '',
          num: '0',
          amount: '',
        },
        buyRules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
        },
        buySpan: 0,
        sellForm: {
          price: '',
          num: '0',
          amount: '',
        },
        sellRules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
        },
        sellSpan: 0,

        entrustData: [],//当前委托列表
        pageIndex: 1, //页码
        pageSize: 10, //每页条数
        pageTotal: 0,//总页数
      };
    },
    created() {
      this.accountInfo = localStorage.hasOwnProperty('accountInfo') ? JSON.parse(localStorage.getItem('accountInfo')) : {};
      this.tradingInfo = this.$store.getters.getDealData;
      this.getTradingInfo(this.tradingInfo.hash);
    },
    mounted() {
      if (this.accountInfo.address) {
        this.accountInfo.balances = Number(divisionDecimals(this.accountInfo.balance, 8)).toFixed(3);
        this.getEntrustList(this.accountInfo.address, this.pageIndex, this.pageSize);
        setInterval(() => {
          //this.getTradingGet(this.tradingInfo.hash);
          this.getEntrustList(this.accountInfo.address, this.pageIndex, this.pageSize);
        }, 10000);
      }
    },
    components: {LeftBar, ChartBar, RightBar, Password},
    computed: {
      tradingName() {
        return this.$store.getters.getDealData.tradingName
      }
    },
    watch: {
      tradingName: function () {
        this.tradingInfo = this.$store.getters.getDealData;
        this.getTradingInfo(this.tradingInfo.hash);
        //this.getTradingGet(this.tradingInfo.hash);
        this.tradingInfoLoading = true;

        this.buySpan = 0;
        this.buyForm.num = '0';
        this.buyForm.amount = '';

        this.sellSpan = 0;
        this.sellForm.num = '0';
        this.sellForm.amount = ''
      },
      'buyForm.price': function () {
        this.buyForm.amount = Times(this.buyForm.num, this.buyForm.price);
        // 解决数字键盘可以输入输入多个小数点问题
      },
      'buyForm.num': function () {
        // console.log(newVal, oldVal);
        this.buyForm.amount = Times(this.buyForm.num, this.buyForm.price);
        // 解决数字键盘可以输入输入多个小数点问题
      },
      'sellForm.price': function () {
        this.sellForm.amount = Times(this.sellForm.num, this.sellForm.price);
        // 解决数字键盘可以输入输入多个小数点问题
      },
      'sellForm.num': function () {
        //console.log(newVal, oldVal);
        this.sellForm.amount = Times(this.sellForm.num, this.sellForm.price);
        // 解决数字键盘可以输入输入多个小数点问题
        /*if (newVal === '' && oldVal.toString().indexOf('.') > 0) {
          this.buyForm.num = oldVal;
          return;
        }*/
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
        let tradingInfoRes = await this.$dexGet(url);
        //console.log(tradingInfoRes);
        if (!tradingInfoRes.success) {
          this.$message({message: '获取交易对错误:' + JSON.stringify(tradingInfoRes.data), type: 'error', duration: 3000});
          return;
        }
        tradingInfoRes.result.newPrices = divisionDecimals(tradingInfoRes.result.newPrice, tradingInfoRes.result.baseDecimal);
        tradingInfoRes.result.upsDowns = tradingInfoRes.result.highPrice24 - tradingInfoRes.result.lowPrice24 === 0 ? 0 : (tradingInfoRes.result.highPrice24 - tradingInfoRes.result.lowPrice24) / tradingInfoRes.result.lowPrice24;
        tradingInfoRes.result.highPrice24s = divisionDecimals(tradingInfoRes.result.highPrice24, tradingInfoRes.result.baseDecimal);
        tradingInfoRes.result.lowPrice24s = divisionDecimals(tradingInfoRes.result.lowPrice24, tradingInfoRes.result.baseDecimal);
        tradingInfoRes.result.quoteMinSize = divisionDecimals(tradingInfoRes.result.quoteMinSize, tradingInfoRes.result.baseDecimal);
        tradingInfoRes.result.dealAmount24s = divisionDecimals(tradingInfoRes.result.dealAmount24, tradingInfoRes.result.baseDecimal);
        tradingInfoRes.result.symbol = tradingInfoRes.result.tradingName.substring(0, tradingInfoRes.result.tradingName.length - 5);
        this.tradingInfo = tradingInfoRes.result;
        this.buyForm.price = tradingInfoRes.result.newPrices;
        this.sellForm.price = tradingInfoRes.result.newPrices;

        if (this.accountInfo.address) {
          let quoteAssetByAddress = await getBaseAssetInfo(this.tradingInfo.quoteAssetChainId, this.tradingInfo.quoteAssetId, this.accountInfo.address);
          //console.log(quoteAssetByAddress);
          if (!quoteAssetByAddress.success) {
            this.$message({
              message: '获取资产信息错误:' + JSON.stringify(quoteAssetByAddress.data), type: 'error', duration: 3000
            });
            return;
          }
          quoteAssetByAddress.data.balances = Number(divisionDecimals(quoteAssetByAddress.data.balance, 8));
          this.quoteAssetInfo = quoteAssetByAddress.data;
          //console.log(this.quoteAssetInfo);

          let baseAssetByAddress = await getBaseAssetInfo(this.tradingInfo.baseAssetChainId, this.tradingInfo.baseAssetId, this.accountInfo.address);
          if (!baseAssetByAddress.success) {
            this.$message({
              message: '获取资产信息错误:' + JSON.stringify(baseAssetByAddress.data), type: 'error', duration: 3000
            });
            return;
          }
          baseAssetByAddress.data.balances = Number(divisionDecimals(baseAssetByAddress.data.balance, 8));
          this.baseAssetInfo = baseAssetByAddress.data;
          //console.log(this.baseAssetInfo);
        }
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
        let tradingGetRes = await this.$dexPost(url, data);
        console.log(tradingGetRes);
        if (!tradingGetRes.success) {
          this.$message({message: '获取交易对K线图:' + JSON.stringify(tradingGetRes.data), type: 'error', duration: 3000});
          return;
        }
        for (let item of tradingGetRes.result) {
          item.time = moment(getLocalTime(item.beginTime)).format('YYYY-MM-DD HH:mm:ss');
          item.open = Number(divisionDecimals(item.beginPrice, item.baseDecimal)).toFixed(3);
          item.close = Number(divisionDecimals(item.endPrice, item.baseDecimal)).toFixed(3);
          item.lowest = Number(divisionDecimals(item.beginPrice, item.baseDecimal)).toFixed(3);
          item.highest = Number(divisionDecimals(item.endPrice, item.baseDecimal)).toFixed(3);
          item.vol = Number(item.amount).toFixed(3)
        }
        this.chartData.rows = tradingGetRes.result
      },

      /**
       * @disc: 选择买百分比
       * @params: num
       * @date: 2019-12-20 10:52
       * @author: Wave
       */
      choiceBuy(num) {
        this.buySpan = num;
        this.buyForm.amount = Number(Times(Number(this.quoteAssetInfo.balances), num)).toString();
        this.buyForm.num = Number(Times(Number(this.buyForm.amount), Number(this.buyForm.price))).toString();
      },

      /**
       * @disc: 买 交易对提交
       * @params: formName
       * @date: 2019-12-20 11:25
       * @author: Wave
       */
      submitBuyForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.orderType = 1;
            this.$refs.password.showPassword(true);
          } else {
            return false;
          }
        });
      },

      /**
       * @disc: 买 卖交易对密码输入
       * @params: password
       * @date: 2019-09-02 10:49
       * @author: Wave
       */
      async coinPassSubmit(password) {
        let passwordInfo = await passwordVerification(this.accountInfo, password);
        if (!passwordInfo.success) {
          this.$message({message: '对不起，请输入正确的密码', type: 'error', duration: 3000});
          return;
        }
        let addressInfo = {pri: passwordInfo.pri, pub: passwordInfo.pub, type: 29};
        let defaultAsset = {assetsChainId: 2, assetsId: 1};
        let amount = this.orderType === 1 ? this.buyForm.amount : this.sellForm.num;
        let price = this.orderType === 1 ? this.buyForm.price : this.sellForm.price;
        let tradingOrderInfo = {
          tradingHash: this.tradingInfo.hash,    //委托挂单hash
          address: this.accountInfo.address,        //撤销挂单委托人
          orderType: this.orderType,  //委托挂单类型 1:买单，2:卖单
          assetsChainId: this.orderType === 1 ? this.tradingInfo.quoteAssetChainId : this.tradingInfo.baseAssetChainId,
          assetsId: this.orderType === 1 ? this.tradingInfo.quoteAssetId : this.tradingInfo.baseAssetId,
          amount: Number(timesDecimals(amount, this.orderType === 1 ? this.tradingInfo.quoteDecimal : this.tradingInfo.baseDecimal)),   //挂单金额
          price: Number(timesDecimals(price, this.orderType === 1 ? this.tradingInfo.quoteDecimal : this.tradingInfo.baseDecimal))  //单价
        };
        //console.log(tradingOrderInfo);
        let txHex = await this.tradingOrder(tradingOrderInfo, defaultAsset, addressInfo);
        if (!txHex.success) {
          this.$message({message: '交易签名错误:' + JSON.stringify(txHex.data), type: 'error', duration: 3000});
          return;
        }
        //console.log(txHex.data);
        let broadcastResult = await validateAndBroadcast(txHex.data);
        //console.log(broadcastResult);

        if (!broadcastResult.success) {
          this.$message({message: '交易广播失败:' + JSON.stringify(broadcastResult.data), type: 'error', duration: 3000});
          return;
        } else {
          this.$message({message: '交易已经发出，等待区块确认', type: 'success', duration: 1000});
        }
      },

      /**
       * @disc: 选择卖百分比
       * @params: number
       * @date: 2019-12-20 10:52
       * @author: Wave
       */
      choiceSell(number) {
        this.sellSpan = number;
        this.sellForm.amount = Times(Number(this.accountInfo.balances), number);
        this.sellForm.num = Times(Number(this.sellForm.amount), Number(this.sellForm.price));
      },

      /**
       * @disc: 卖 交易对提交
       * @params: formName
       * @date: 2019-12-20 11:25
       * @author: Wave
       */
      submitSellForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.orderType = 2;
            this.$refs.password.showPassword(true);
          } else {
            return false;
          }
        });
      },

      /**
       * @disc: 委托挂单
       * @params: tradingOrderInfo
       * @date: 2019-12-20 14:33
       * @author: Wave
       */
      async tradingOrder(tradingOrderInfo, defaultAsset, addressInfo) {
        let remark = '';
        let inOrOutputs = await this.createCoinData(tradingOrderInfo, defaultAsset);
        //console.log(inOrOutputs);
        if (!inOrOutputs.success) {
          this.$message({message: '买卖交易组装错误:' + JSON.stringify(inOrOutputs.data), type: 'error', duration: 3000});
          return;
        }
        //console.log(inOrOutputs);
        //交易组装
        let tAssemble = await nuls.transactionAssemble(inOrOutputs.data.inputs, inOrOutputs.data.outputs, remark, addressInfo.type, tradingOrderInfo);
        //console.log(tAssemble);
        //获取hash
        let hash = await tAssemble.getHash();
        //console.log(hash);
        //交易签名
        let txSignature = await sdk.getSignData(hash.toString('hex'), addressInfo.pri);
        //console.log(txSignature);
        //通过拼接签名、公钥获取HEX
        let signData = await sdk.appSplicingPub(txSignature.signValue, addressInfo.pub);
        tAssemble.signatures = signData;
        let txhex = tAssemble.txSerialize().toString("hex");
        //console.log(txhex.toString('hex'));
        return {success: true, data: txhex};
      },

      /**
       * @disc: 买卖交易对组装
       * @params: tradingOrderInfo
       * @date: 2019-12-20 14:32
       * @author: Wave
       */
      async createCoinData(tradingOrderInfo, defaultAsset) {
        let fee = 100000;
        const balanceInfo = await getBaseAssetInfo(tradingOrderInfo.assetsChainId, tradingOrderInfo.assetsId, tradingOrderInfo.address);
        if (!balanceInfo.success) {
          this.$message({message: '获取账户信息错误:' + JSON.stringify(balanceInfo.data), type: 'error', duration: 3000});
          return;
        }
        let inputs = [], outputs = [];
        let input = {
          address: tradingOrderInfo.address,
          assetsChainId: tradingOrderInfo.assetsChainId,
          assetsId: tradingOrderInfo.assetsId,
          amount: tradingOrderInfo.amount,
          locked: 0,
          nonce: balanceInfo.data.nonce
        };
        //判断用户的挂单委托资产是否是本链的默认资产
        if (tradingOrderInfo.assetsChainId === defaultAsset.assetsChainId && tradingOrderInfo.assetsId === defaultAsset.assetsId) {
          //如果是，生成input的时候，将委托金额和手续费一起收
          input.amount += fee;
          inputs.push(input);
        } else { //如果不是要额外收取手续费

          inputs.push(input);
          const balanceInfo = await getBaseAssetInfo(defaultAsset.assetsChainId, defaultAsset.assetsId, tradingOrderInfo.address);
          if (!balanceInfo.success) {
            this.$message({message: '获取账户信息错误:' + JSON.stringify(balanceInfo.data), type: 'error', duration: 3000});
            return;
          }
          inputs.push({
            address: tradingOrderInfo.address,
            assetsChainId: defaultAsset.assetsChainId,
            assetsId: defaultAsset.assetsId,
            amount: fee,
            locked: 0,
            nonce: balanceInfo.data.nonce
          });
        }
        outputs.push({
          address: tradingOrderInfo.address,
          assetsChainId: tradingOrderInfo.assetsChainId,
          assetsId: tradingOrderInfo.assetsId,
          amount: tradingOrderInfo.amount,
          lockTime: -2
        });
        return {success: true, data: {inputs: inputs, outputs: outputs}};
      },

      /**
       * @disc: 获取地址当前委托列表
       * @params: address
       * @params: pageIndex
       * @params: pageSize
       * @date: 2019-12-16 10:41
       * @author: Wave
       */
      async getEntrustList(address, pageIndex, pageSize) {
        let url = '/order/list/address';
        let data = {"address": address, "pageNumber": pageIndex, "pageSize": pageSize};
        let entrustListRes = await this.$dexPost(url, data);
        //console.log(entrustListRes);
        if (!entrustListRes.success) {
          this.$message({
            message: '获取地址当前委托列表错误:' + JSON.stringify(entrustListRes.data),
            type: 'error',
            duration: 3000
          });
          return;
        }
        for (let item of entrustListRes.result.list) {
          item.hashs = superLong(item.hash, 8);
          item.time = moment(getLocalTime(item.createTime)).format('YYYY-MM-DD HH:mm:ss');
          item.price = parseFloat(Number(divisionDecimals(item.price, item.baseDecimal)));
          item.number = parseFloat(Number(divisionDecimals(item.baseAmount, item.baseDecimal)));
          item.totalAmount = Number(Times(item.price, item.number));
          item.dealNumber = Number(divisionDecimals(item.baseDealAmount, item.baseDecimal));
          item.dealTotalAmount = Number(Times(item.price, item.dealNumber));
          item.ratio = parseFloat(Number(Division(Number(item.dealNumber), Number(item.number))).toFixed(4));
        }
        this.entrustData = entrustListRes.result.list
      },

    }
  }
</script>

<style lang="less">
  @import "../../assets/css/style";

  .trading {
    background-color: #0b0c14;
    min-height: 820px;
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
          height: 390px;
          width: 100%;
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
                    .is_span {
                      color: #06ba63;
                      border: 1px solid #06ba63;
                    }
                  }

                }
              }
              .font10 {
                position: absolute;
                text-align: right;
                width: 280px;
              }
              .no_user {
                .el-button {
                  width: 280px;
                  height: 35px;
                  border-radius: 0;
                  color: #C0C4CC;
                  font-size: 12px;
                  margin: 19px 0 0 0;
                  line-height: 12px;
                  background-color: transparent;
                  border-color: #888db5;
                  &:hover {
                    color: #DCDFE6;
                    border-color: #DCDFE6;
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
                    .is_span {
                      color: #db4355;
                      border: 1px solid #db4355;
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
      .entrust .el-table__body tr:hover > td {
        background-color: #1c1e23;
      }
    }
  }
</style>
