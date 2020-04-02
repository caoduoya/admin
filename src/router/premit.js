import router from "./index";
import store from "../store/index"
import { getToken, removeToken, removeUserName } from "@/utils/app";

const whiteRouter = ["/login"];
// 路由守卫
router.beforeEach((to, from, next) => {
    if (getToken()) {
        if (to.path === "/login") {
            removeToKen();
            removeUserName();
            store.commit("SET_TOKEN", '');
            store.commit("SET_USERNAME", '');
            next();
        } else {
            //获取角色
            //动态路由分配权限
            next();
        }
    } else {
        if (whiteRouter.indexOf(to.path) !== -1) {  // 存在
            next();  // to
        } else {
            next("/login")  // 路由指向
        }
    }
})