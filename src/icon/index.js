import Vue from "vue";
//自定义全局组件
import SvgIcon from "./SvgIcon.vue";
Vue.component('svg-icon', SvgIcon);
//解析svg
const req = require.context('./svg', false, /\.svg$/);
const requireAll = (requireContext) => {
    return requireContext.keys().map(requireContext)
};
requireAll(req);