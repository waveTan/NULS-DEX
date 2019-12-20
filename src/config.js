/**
 * @disc: 测试网 配置文件
 * @date: 2019-10-10 13:58
 * @author: Wave
 */
"use strict";
//开发模式
export const IS_DEV = process.env.NODE_ENV === 'production';
//运行环境（true:正式环境，false:测试环境）
export const RUN_DEV = false;
//链ID
export const API_CHAIN_ID = 2;
//链前缀
export const API_PREFIX = 'tNULS';
//api正式、测试网络的api
//export let API_URL = IS_DEV ? 'https://beta.wallet.nuls.io/api' : 'https://beta.wallet.nuls.io/api';
export let API_URL = IS_DEV ? 'https://beta.wallet.nuls.io/api' : 'http://192.168.1.160:18003';
//dex 网络api
export let DEX_URL = IS_DEV ? 'http://192.168.1.160:8081' : 'http://192.168.1.160:8081';
//请求最迟时间
export const API_TIME = '8000';
//浏览器连接地址
export const EXPLORER_URL = 'http://beta.nulscan.io/';
