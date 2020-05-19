import axios from "axios";
import { Message } from "element-ui";
import { getToken, getUserName } from "@/utils/app";
//创建拦截器
const BASEURL = process.env.NODE_ENV === "production" ? process.env.VUE_APP_API : process.env.VUE_APP_API;
const instance = axios.create({
    baseURL: BASEURL,
    timeout: 15000
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers['Tokey'] = getToken();
    config.headers['UserName'] = getUserName();
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let data = response.data;
    if (data.resCode !== 0) {
        Message.error(data.message);
        return Promise.reject(data);
    } else {
        return response;
    }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default instance;