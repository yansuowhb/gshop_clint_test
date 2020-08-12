import {v4 as uuid} from "uuid"

export function getUserTempId() {
    let userTemplId=localStorage.getItem("USER_TEMP_ID")
    if (userTemplId) return userTemplId
    userTemplId=uuid()
    localStorage.setItem("USER_TEMP_ID",userTemplId)
    return userTemplId
}