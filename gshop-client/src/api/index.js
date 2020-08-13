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

// 登陆  /api/user/passport/login
export const reqLogin = (mobile, password) => ajax.post('/user/passport/login', {mobile, password})

// 退出登陆 /user/passport/logout
export const reqLogout = ()=>ajax.get('/user/passport/logout')

/*
16.注册用户
/user/passport/register
* */

export const reqRegister = (userInfo) => ajax.post('/user/passport/register', userInfo)

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
export function reqProductList(searchParams) {
    return ajax.post("/list",searchParams)
}



// 获取商品详情信息
export const reqDetailInfo = (skuId) => ajax.get(`/item/${skuId}`)

/*
6.获取购物车列表
/api/cart/cartList   GET
* */
export function reqGoodsCar() {
    return ajax.get("/cart/cartList")
}


// 7.添加到购物车(对已有物品进行数量改动)
export const reqAddToCart = (skuId, skuNum) => ajax.post(`/cart/addToCart/${skuId}/${skuNum}`)

// 8.切换商品选中状态
/*
0代表取消选中
1代表选中
*/
export const reqCheckCartItem = (skuId, isChecked) => ajax.get(`/cart/checkCart/${skuId}/${isChecked}`)

// 9.删除购物车商品
export const reqDeleteCartItem = (skuId) => ajax.delete(`/cart/deleteCart/${skuId}`)




