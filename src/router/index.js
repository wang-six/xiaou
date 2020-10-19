import Vue from 'vue'
import Router from 'vue-router'
import store from "../store"

Vue.use(Router)
//路由独享守卫
// function checkedEnter(path, next) {
//     let menus_url = store.state.userInfo.menus_url;
//     console.log(menus_url);
//     if (menus_url.includes(path)) {
//         next()
//     } else {
//         next("/")
//     }
// }

import login from "../pages/login"
import index from "../pages/index"
import register from "../pages/register"
import detail from "../pages/detail"
import home from "../pages/home"
import mine from "../pages/mine"
import shopcar from "../pages/shopcar"
import classify from "../pages/classify"
import classcard from "../pages/classcard"

let router = new Router({
    routes: [{
        path: "/login",
        component: login
    },
    {
        path: "/index",
        component: index,
        children: [{
            path: "home",
            component: home,
            // beforeEnter(to, from, next) {
            //     checkedEnter('/index/home', next)
            // }
        },
        {
            path: "mine",
            component: mine,
            // beforeEnter(to, from, next) {
            //     checkedEnter('/index/mine', next)
            // }
        },
        {
            path: "shopcar",
            component: shopcar,
            // beforeEnter(to, from, next) {
            //     checkedEnter('/index/shopcar', next)
            // }
        },
        {
            path: "classify",
            component: classify,
            // beforeEnter(to, from, next) {
            //     checkedEnter('/index/classify', next)
            // }
        },
        {
            path: "classcard",
            component: classcard,
            name: classcard,
            // beforeEnter(to, from, next) {
            //     checkedEnter('/index/classcard', next)
            // }
        },
        {

            path: "",
            redirect: "home",
        }
        ]
    },
    {
        path: "/register",
        component: register,
        // beforeEnter(to, from, next) {
        //     checkedEnter('/register', next)
        // }
    },
    {
        path: "/detail",
        component: detail,
        // beforeEnter(to, from, next) {
        //     checkedEnter('/detail', next)
        // }
    }
    ]
})

// 登录拦截
router.beforeEach((to, from, next) => {
    if (to.path == "/login") {
        next()
        return
    }
    if (to.path == "/register") {
        next()
        return
    }
    if (store.state.userInfo.token) {
        next()
        return
    }
    next("/login")
})
export default router