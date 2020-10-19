import axios from "axios"
import store from "../store"
import router from "../router"
import { warningAlert } from "./alter"
const baseUrl = "/api";

//请求拦截
axios.interceptors.request.use(req => {
    if (req.url != baseUrl + "/api/login") {
        req.headers.authorization = store.state.userInfo.token
    }
    // console.log(store);
    return req
})

//响应拦截
axios.interceptors.response.use(res => {
    console.group("=========本次请求路径是:" + res.config.url)
    console.log(res);
    console.groupEnd();
    //一小时token失效掉线
    if (res.data.msg == "登录已过期或访问权限受限") {
        warningAlert(res.data.msg)
        router.push("/login")
    }
    return res
})



//注册
export const requestRegister = (data) => {
    return axios({
        url: baseUrl + "/api/register",
        method: "POST",
        data: data,
    })

}

//登录
export const requestLogin = (data) => {
    return axios({
        url: baseUrl + "/api/login",
        method: "POST",
        data: data,
    })

}

//获取分类信息
export const requestClass = () => {
    return axios({
        url: baseUrl + "/api/getcate",
        method: "GET"
    })

}

//获取轮播图信息
export const requestSlide = () => {
    return axios({
        url: baseUrl + "/api/getbanner",
        method: "GET"
    })

}

//获取首页商品信息
export const requestInfo = () => {
    return axios({
        url: baseUrl + "/api/getindexgoods",
        method: "GET"
    })

}

//获取一个商品信息
export const requestgoodInfo = (id) => {
    return axios({
        url: baseUrl + "/api/getgoodsinfo?id=" + id,
        method: "GET",
        // params: id
    })

}

//获取分类信息
export const requestgetcate = () => {
    return axios({
        url: baseUrl + "/api/getcatetree",
        method: "GET",
    })

}

//获取分类商品
export const requestgetgoods = (fid) => {
    return axios({
        url: baseUrl + "/api/getgoods?fid=" + fid,
        method: "GET",
    })

}

//购物车添加
export const requestcartadd = (data) => {
    return axios({
        url: baseUrl + "/api/cartadd",
        method: "POST",
        data: data,
    })

}

//购物车列表
export const requestcartlist = (data) => {
    return axios({
        url: baseUrl + "/api/cartlist?uid=" + data,
        params: data,
    })

}

//购物车修改
export const requestcartedit = (data) => {
    return axios({
        url: baseUrl + "/api/cartedit",
        method: "POST",
        data: data,
    })

}

//购物车删除
export const requestcartdelete = (id) => {
    return axios({
        url: baseUrl + "/api/cartdelete",
        method: "POST",
        data: {
            id: id
        },
    })

}