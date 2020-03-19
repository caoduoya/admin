import instance from "@/utils/request";
/** 获取验证码 */
export function Getsms(data) {
    return instance.request({
        method: "post",
        url: "/getSms/",
        data
    })
}


/**获取用户角色 */


/**登录 */
export function Login(data) {
    return instance.request({
        method: "post",
        url: "/login/",
        data
    })
}


/**注册 */

export function Register(data) {
    return instance.request({
        method: "post",
        url: "/register/",
        data
    })
}