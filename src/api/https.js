import axios from 'axios'
import {API_TIME, API_URL, API_CHAIN_ID} from './../config.js'

axios.defaults.timeout = API_TIME;
axios.defaults.headers.post['Content-Type'] = 'application/json';

/**
 * 封装post请求
 * Encapsulation post method
 * @param url
 * @param methodName
 * @param data
 * @returns {Promise}
 */
export async function post(url, methodName, data = []) {
  axios.defaults.baseURL = API_URL;
  data.unshift(API_CHAIN_ID);
  const parameter = {"jsonrpc": "2.0", "method": methodName, "params": data, "id": Math.floor(Math.random() * 1000)};
  try {
    let res = await axios.post(url, parameter);
    return {success: true, data: res.data.result}
  } catch (error) {
    return {success: false, data: error}
  }
}
