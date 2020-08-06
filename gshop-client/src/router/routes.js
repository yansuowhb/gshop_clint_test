import register from "../pages/register";
import login from "../pages/Login";
import Home from "../pages/Home";
import seacher from "../pages/seacher";


export default [
    {
        path:"/home",
        component:Home
    },{
        path:"/login",
        component:login
    },{
        path:"/register",
        component:register
    },{
        path:"/seacher",
        component:seacher
    }
]