import {v4 as uuid} from "uuid"

export function getUserTempId() {
    let userTemplId=localStorage.getItem("USER_TEMP_ID")
    if (userTemplId) return userTemplId
    userTemplId=uuid()
    localStorage.setItem("USER_TEMP_ID",userTemplId)
    return userTemplId
}
//将用户信息保存在localstorage
export function saveusertolocal(userInfo) {
    localStorage.setItem("USER_INFO",JSON.stringify(userInfo))
}
//从localstorage取用户信息
export function getusertolocal() {
    return JSON.parse(localStorage.getItem("USER_INFO")) || {}
}

//删除local的用户信息
export function removeUserInfo() {
    localStorage.removeItem("USER_INFO")
}