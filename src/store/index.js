import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: false,
    count: 10
  },
  getters: {
    count: state => state.count + 10
  },
  mutations: {
    SEL_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse;
      //html5本地存储
      sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
    }
  },
  actions: {},
  modules: {}
}); 
