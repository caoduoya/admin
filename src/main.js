import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueCompositionApi from "@vue/composition-api";
import "./icon/index";
import "./router/premit";
//自定义全局方法
// import global from "@/utils/global.js";

// Vue.use(global);
Vue.use(VueCompositionApi);
Vue.use(ElementUI);
Vue.config.productionTip = false;



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
