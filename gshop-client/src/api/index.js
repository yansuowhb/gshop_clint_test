import ajax from "./ajax"
import mockAjax from "./mockAjax"


//向Banners请求banners数据
export function reqBanners() {
    return mockAjax("/banners")
}

//向Floors请求Floors数据
export function reqFloors() {
    return mockAjax("/floors")
}
/*
登录接口
/api/user/passport/login  POST   mobile,password
* */
export function reqLogin({midle,password}) {
    return ajax.post("/user/passport/login",{
        midle,password
    })
}



/*
首页三级分类
/api/product/getBaseCategoryList   GET
* */
export function reqBaseCategoryList() {
    return ajax.get("/product/getBaseCategoryList")
}




/*
4.搜索商品
/api/list  POST
category1Id
category2Id
category3Id
categoryName
keyword
props
trademark
order
pageNo
pageSize
* */
export function reqGetList({}) {
    return ajax.post("/list",{
        data:{
            category1Id,
            category2Id,
            category3Id,
            categoryName,
            keyword,
            props,
            trademark,
            order,
            pageNo,
            pageSize
        }
    })
}


/*5.获取商品详情
/api/item/{ skuId } GET
skuId
* */
export function reqGetGoods(skuId) {
    return ajax.get("/item"+skuId)
}


/*
6.获取购物车列表
/api/cart/cartList   GET
* */
export function reqGetGoodsCar() {
    return ajax.get("/cart/cartList")
}


