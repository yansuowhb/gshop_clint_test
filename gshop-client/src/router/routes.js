import register from "../pages/register/register";
import login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import seacher from "../pages/seacher/seacher";


export default [
    {
        path:"/home",
        component:Home
    },{
        path:"/login",
        component:login,
        meta:{
            isShowFooter:true
        }
    },{
        path:"/register",
        component:register,
        meta:{
            isShowFooter:true
        }
    },{
        path:"/seacher",
        component:seacher
    }
]