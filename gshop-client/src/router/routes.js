import register from "../pages/Register";
import login from "../pages/Login";
import Home from "../pages/Home/Home";
import seacher from "../pages/seacher/seacher";
import Detail from "../pages/Detail";
import AddCartSuccess from "../pages/AddCartSuccess";
import ShopCart from "../pages/ShopCart";
import Pay from "../pages/Pay";
import Trade from "../pages/Trade";
import PaySuccess from "../pages/PaySuccess";
import Center from "../pages/Center";
import GroupBuy from "../pages/Center/GroupBuy/GroupBuy";
import MyOrder from "../pages/Center/MyOrder/MyOrder";
import store from '@/store'


export default [
    {
        path: "/home",
        component: Home
    },
    {
        path: "/login",
        component: login,
        meta: {
            isShowFooter: true
        },
        //	b.只有没有登陆, 才能查看登陆界面
        beforeEnter(to,from,next){
            const token=store.state.user.userInfo.token
            if (token){
                next("/home")
            }else {
                next()
            }
        }

    },
    {
        name: 'register',
        path: "/register",
        component: register,
        meta: {
            isShowFooter: true
        }
    },
    {
        name: "search",
        path: "/search/:searchword?",
        component: seacher,
        props: (router) => ({keyword: router.params.searchword})
    },
    {
        name: "detail",
        path: "/detail/:skuid",
        component: Detail
    },
    {
        path: "/addcartsuccess",
        component: AddCartSuccess
    },
    {
        path: "/shopcart",
        component: ShopCart
    },
    {
        path: "/pay",
        component: Pay,
        beforeEnter (to, from, next) {
            if (from.path==='/trade') {
                next()
            } else {
                next('/trade')
            }
        }
    },
    {
        path: "/center",
        component: Center,
        children: [
            {
                path: "/center/groupbuy",
                component: GroupBuy
            }, {
                path: "myorder",
                component: MyOrder
            }, {
                path: "",
                redirect:"myorder"
            }
        ]
    },
    {
        path: "/trade",
        component: Trade,
        beforeEnter (to, from, next) {
            if (from.path==='/shopcart') {
                next()
            } else {
                next('/shopcart')
            }
        }
    },
    {
        path: "/paysuccess",
        component: PaySuccess,
        beforeEnter (to, from, next) {
            if (from.path==='/pay') {
                next()
            } else {
                next('/pay')
            }
        }
    }
]