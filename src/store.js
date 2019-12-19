import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dealData: {}, //交易对
  },
  mutations: {
    setDealData(state, data) {
      state.dealData = data;
      sessionStorage.setItem('dealData', JSON.stringify(data));
    },
  },
  getters: {
    getDealData(state) {
      let defaultData = {
        baseDecimal: 8,
        dealAmount24: 0,
        hash: "684679130a8d940b64276dd18e9321d9fcd46ff24ca9958acb09175c21e3679e",
        highPrice24: 0,
        lowPrice24: 0,
        newPrice: 120000000,
        quoteDecimal: 8,
        tradingName: "BTC/NULS"
      };
      if (!state.dealData.length) {
        state.dealData = sessionStorage.hasOwnProperty('dealData') ? JSON.parse(sessionStorage.getItem('dealData')) : defaultData;
        sessionStorage.setItem('dealData', JSON.stringify(state.dealData));
      }
      return state.dealData
    }
  },
  actions: {}
})
