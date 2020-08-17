// import register from "@/pages/Register";
// import login from "@/pages/Login";
// import Home from "@/pages/Home/Home";
// import seacher from "@/pages/seacher/seacher";
// import Detail from "@/pages/Detail";
// import AddCartSuccess from "@/pages/AddCartSuccess";
// import ShopCart from "@/pages/ShopCart";
// import Pay from "@/pages/Pay";
// import Trade from "@/pages/Trade";
// import PaySuccess from "@/pages/PaySuccess";
// import Center from "@/pages/Center";
// import GroupBuy from "@/pages/Center/GroupBuy/GroupBuy";
// import MyOrder from "@/pages/Center/MyOrder/MyOrder";
import store from '@/store'

//模块懒加载-》只有当访问当前路由时才会加载当前js文件
const register=()=>import("@/pages/Register")
const login=()=>import("@/pages/Login")
const seacher=()=>import("@/pages/seacher/seacher")
const Home=()=>import("@/pages/Home/Home")
const Detail=()=>import("@/pages/Detail")
const AddCartSuccess=()=>import("@/pages/AddCartSuccess")
const ShopCart=()=>import("@/pages/ShopCart")
const Pay=()=>import("@/pages/Pay")
const Trade=()=>import("@/pages/Trade")
const PaySuccess=()=>import("@/pages/PaySuccess")
const Center=()=>import("@/pages/Center")
const GroupBuy=()=>import("@/pages/Center/GroupBuy/GroupBuy")
const MyOrder=()=>import("@/pages/Center/MyOrder/MyOrder")



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
    },



    {
        path: '/communication',
        component: () => import('@/pages/Communication/Communication'),
        children: [
            {
                path: 'event',
                component: () => import('@/pages/Communication/EventTest/EventTest'),
                meta: {
                    isShowFooter: true
                },
            },
            {
                path: 'model',
                component: () => import('@/pages/Communication/ModelTest/ModelTest'),
                meta: {
                    isShowFooter: true
                },
            },
            {
                path: 'sync',
                component: () => import('@/pages/Communication/SyncTest/SyncTest'),
                meta: {
                    isShowFooter: true
                },
            },
            {
                path: 'attrs-listeners',
                component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
                meta: {
                    isShowFooter: true
                },
            },
            {
                path: 'children-parent',
                component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
                meta: {
                    isShowFooter: true
                },
            },
            {
                path: 'scope-slot',
                component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
                meta: {
                    isShowFooter: true
                },
            },
            {
                path: 'provide-inject',
                component: () => import('@/pages/Communication/ProvideInjectTest/ProvideInjectTest'),
                meta: {
                    isShowFooter: true
                },
            },
        ],
    }
]