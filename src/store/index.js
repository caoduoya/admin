import Vue from "vue";
import Vuex from "vuex";
import { setToken, setUserName, getUserName } from "@/utils/app";
import { Login } from "@/api/login";
import cookie from "cookie_js";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
    to_ken: '',
    username: getUserName() || ''
  },
  getters: {
    isCollapse: state => state.isCollapse
  },
  mutations: {
    SEL_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse;
      //html5本地存储
      sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
    },
    SET_TOKEN(state, value) {
      state.to_ken = value;
    },
    SET_USERNAME(state, value) {
      state.username = value;
    }
  },
  actions: {//可以回调处理事情
    login(content, responseData) {
      return new Promise((resolve, reject) => {
        //接口
        Login(responseData).then((res) => {
          let data = res.data.data;
          console.log(data);
          //token,username
          content.commit("SET_TOKEN", data.token);
          content.commit("SET_USERNAME", data.username);
          setToken(data.token);
          setUserName(data.username);
          resolve(res);
        }).catch((err) => {
          reject();
        });
      })
    }
  },
  modules: {}
}); 
