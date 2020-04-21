import Vue from "vue";
import Vuex from "vuex";
import { setToken, setUserName, getUserName, removeUserName, removeToken } from "@/utils/app";
import { Login } from "@/api/login";
import cookie from "cookie_js";
import { getCategory } from "@/api/news";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: false || JSON.parse(sessionStorage.getItem("isCollapse")),
    to_ken: '',
    username: getUserName() || '',
    id: "" || sessionStorage.getItem("infoId"),
    title: "" || sessionStorage.getItem("infoTitle"),
    qiniuUrl: "http://example.caoyajun.cn/"
  },
  getters: {
    isCollapse: state => state.isCollapse,
    infoId: state => state.id,
    infoTitle: state => state.title,
    qiniuUrl: state => state.qiniuUrl
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
    },
    SET_ID(state, value) {
      state.id = value;
      sessionStorage.setItem("infoId", value);
    },
    SET_TITLE(state, value) {
      state.title = value;
      sessionStorage.setItem("infoTitle", value)
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
    },
    exit(content) {
      return new Promise((resolve, reject) => {
        removeToken();
        removeUserName();
        content.commit("SET_TOKEN", "");
        content.commit("SET_USERNAME", "");
        resolve();
      });
    },
    GetInfoCategory(content, responseData) {
      return new Promise((resolve, reject) => {
        //接口
        getCategory({}).then((res) => {
          resolve(res.data.data.data);
        }).catch((err) => {
          reject(err);
        });
      })
    }
  },
  modules: {}
}); 
