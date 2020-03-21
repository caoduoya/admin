import cookie from "cookie_js";

export function getToken() {
    return cookie.get('admin_token');
}

export function setToken(token) {
    cookie.set('admin_token', token);
}

export function removeToken(token) {
    cookie.remove('admin_token', token);
}

export function setUserName(username) {
    return cookie.set('username', username);
}

export function getUserName() {
    return cookie.get("username");
}
