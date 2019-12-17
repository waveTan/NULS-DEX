import axios from 'axios'
import {API_TIME, API_URL} from './../config.js'

axios.defaults.timeout = API_TIME;
axios.defaults.baseURL = API_URL;
axios.defaults.headers.Accept = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';


/**
 * 封装get请求
 * Encapsulation get method
 * @param url
 * @param data
 * @returns {Promise}
 */
export async function get(url, data) {
  let newUrl = API_URL + url;
  console.log(newUrl, data);
  try {
    let res = await axios.get(newUrl, data);
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
export async function post(url, data) {
  let newUrl = API_URL + url;
  console.log(newUrl, data);
  try {
    let res = await axios.post(url, data);
    return (res.data.data)
  } catch (err) {
    return {success: false, data: err}
  }
}
