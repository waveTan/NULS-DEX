import {post} from './https'

/**
 * 计算手续费
 * @param tx
 * @param signatrueCount 签名数量，默认为1
 **/
export function countFee(tx, signatrueCount) {
  let txSize = tx.txSerialize().length;
  txSize += signatrueCount * 110;
  return 100000 * Math.ceil(txSize / 1024);
}

/**
 * 计算跨链交易手续费
 * @param tx
 * @param signatrueCount 签名数量，默认为1
 **/
export function countCtxFee(tx, signatrueCount) {
  let txSize = tx.txSerialize().length;
  txSize += signatrueCount * 110;
  return 1000000 * Math.ceil(txSize / 1024);
}

/**
 * 获取地址信息根据地址
 * @param address
 * @returns {Promise<any>}
 */
export async function getAddressInfoByAddress(address) {
  return await post('/', 'getAccount', [address])
    .then((response) => {
      console.log(response);
      if (response.success) {
        return {success: true, data: response.data}
      } else {
        return {success: false, data: response.data}
      }
    })
    .catch((error) => {
      return {success: false, data: error};
    });
}

/**
 * 获取地址资产信息
 * @param chainId
 * @param assetId
 * @param address
 * @returns {Promise<any>}
 */
export async function getBaseAssetInfo(chainId = 2, assetId = 1, address) {
  return await post('/', 'getAccountBalance', [chainId, assetId, address])
    .then((response) => {
      //console.log(response);
      if (response.success) {
        return {success: true, data: response.data}
      } else {
        return {success: false, data: response}
      }
    })
    .catch((error) => {
      return {success: false, data: error};
    });
}

/**
 * 获取地址的余额及nonce根据地址
 * @param chainId
 * @param assetId
 * @param address
 * @returns {Promise<any>}
 */
export async function getBalanceOrNonceByAddress(address, chainId = 2, assetId = 1) {
  return await post('/', 'getAccountBalance', [chainId, assetId, address])
    .then((response) => {
      //console.log(response);
      if (response.success) {
        return {success: true, data: {balance: response.data.balance, nonce: response.data.nonce}}
      } else {
        return {success: false, data: response}
      }
    })
    .catch((error) => {
      return {success: false, data: error};
    });
}

/**
 * 验证交易
 * @param txHex
 * @returns {Promise<any>}
 **/
export async function validateTx(txHex) {
  return await post('/', 'validateTx', [txHex])
    .then((response) => {
      console.log(response);
      if (response.success) {
        return {success: true, data: response.data.value};
      } else {
        return {success: false, data: response.error};
      }
    })
    .catch((error) => {
      return {success: false, data: error};
    });
}

/**
 * 广播交易
 * @param txHex
 * @returns {Promise<any>}
 **/
export async function broadcastTx(txHex) {
  return await post('/', 'broadcastTx', [txHex])
    .then((response) => {
      if (response.success) {
        return {success: true, data: response};
      } else {
        return {success: false, data: response};
      }
    })
    .catch((error) => {
      return {success: false, data: error};
    });
}

/**
 * 验证交易并广播
 * @param txHex
 * @returns {Promise<any>}
 **/
export async function validateAndBroadcast(txHex) {
  return await post('/', 'validateTx', [txHex])
    .then((response) => {
      //console.log(response);
      if (response.success) {
        let newHash = response.data.value;
        return post('/', 'broadcastTx', [txHex])
          .then((response) => {
            //console.log(response);
            if (response.success) {
              return {success: true, hash: newHash};
            } else {
              return {success: false, data: response};
            }
          })
          .catch((error) => {
            return {success: false, data: error};
          });
      } else {
        return {success: false, data: response};
      }
    })
    .catch((error) => {
      return {success: false, data: error};
    });
}

/**
 * 获取节点的委托列表
 * @param agentHash
 * @returns {Promise<any>}
 **/
export async function agentDeposistList(agentHash) {
  //todo 这个接口是临时处理，后面要换一个接口，否则超过100个委托会出问题
  return await post('/', 'getConsensusDeposit', [1, 100, agentHash])
    .then((response) => {
      return response.result;
    })
    .catch((error) => {
      return {success: false, data: error};
    });
}

/**
 * 获取合约代码构造函数
 * @param contractCodeHex
 * @returns {Promise<any>}
 */
export async function getContractConstructor(contractCodeHex) {
  return await post('/', 'getContractConstructor', [contractCodeHex])
    .then((response) => {
      //console.log(response);
      if (response.hasOwnProperty("result")) {
        return {success: true, data: response.result.constructor};
      } else {
        return {success: false, data: response.error};
      }
    })
    .catch((error) => {
      return {success: false, data: error};
    });
}

/**
 * @disc: 撤销挂单 inputs outputs
 * @params: tradingOrderInfo
 * @params: defaultAsset
 * @params: fee
 * @date: 2020-02-07 11:24
 * @author: Wave
 */
export async function revokeCoinData(tradingOrderInfo, coinTrading, defaultAsset) {
  let fee = 100000;
  let inputs = [], outputs = [];
  //首先通过订单信息组装解锁from
  let orderInput = {
    address: tradingOrderInfo.address,
    assetsChainId: coinTrading.baseAssetChainId,
    assetsId: coinTrading.baseAssetId,
    amount: tradingOrderInfo.leftAmount,
    locked: -1,
    nonce: tradingOrderInfo.nonce
  };
  if (tradingOrderInfo.type === 1) {
    orderInput.assetsChainId = coinTrading.quoteAssetChainId;
    orderInput.assetsId = coinTrading.quoteAssetId;
  }
  inputs.push(orderInput);

  //如果手续费不足，需要添加手续费
  if (orderInput.assetsChainId !== defaultAsset.assetsChainId || orderInput.assetsId !== defaultAsset.assetsId || orderInput.amount < fee) {
    //通过获取用户当前余额组装手续费from
    let balanceInfo = await getBalanceOrNonceByAddress(tradingOrderInfo.address, defaultAsset.assetsChainId, defaultAsset.assetsId);
    //console.log(balanceInfo);
    inputs.push({
      address: tradingOrderInfo.address,
      assetsChainId: defaultAsset.assetsChainId,
      assetsId: defaultAsset.assetsId,
      amount: fee,
      locked: 0,
      nonce: balanceInfo.data.nonce
    });
  }

  //组装to
  if (orderInput.assetsChainId !== defaultAsset.assetsChainId || orderInput.assetsId !== defaultAsset.assetsId || orderInput.amount < fee) {
    outputs.push({
      address: tradingOrderInfo.address,
      assetsChainId: orderInput.assetsChainId,
      assetsId: orderInput.assetsId,
      amount: orderInput.amount,
      lockTime: 0
    });
  } else {
    outputs.push({
      address: tradingOrderInfo.address,
      assetsChainId: orderInput.assetsChainId,
      assetsId: orderInput.assetsId,
      amount: orderInput.amount - fee,
      lockTime: 0
    });
  }

  return {success: true, data: {inputs: inputs, outputs: outputs}};
}
