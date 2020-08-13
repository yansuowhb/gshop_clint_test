import register from "../pages/Register";
import login from "../pages/Login";
import Home from "../pages/Home/Home";
import seacher from "../pages/seacher/seacher";
import Detail from "../pages/Detail";
import AddCartSuccess from "../pages/AddCartSuccess";
import ShopCart from "../pages/ShopCart";


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
        props:(router)=>({keyword:router.params.searchword})
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
    }
]