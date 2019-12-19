import axios from 'axios'
import {API_TIME, DEX_URL} from './../config.js'

axios.defaults.timeout = API_TIME;
axios.defaults.headers.Accept = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

/**
 * 封装get请求
 * Encapsulation get method
 * @param url
 * @returns {Promise}
 */
export async function dexGet(url) {
  axios.defaults.baseURL = DEX_URL;
  try {
    let res = await axios.get(url);
    return (res.data.data)
  } catch (err) {
    return {success: false, data: err}
  }
}

/**
 * 封装post请求
 * Encapsulation post method
 * @param url
 * @param data
 * @returns {Promise}
 */
export async function dexPost(url, data) {
  axios.defaults.baseURL = DEX_URL;
  try {
    let res = await axios.post(url, data);
    return (res.data.data)
  } catch (err) {
    return {success: false, data: err}
  }
}
