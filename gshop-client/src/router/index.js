import router from "vue-router"
import vue from "vue"
import routes from "./routes";
vue.use(router)
export default new router({
    mode:"history",
    routes
})