import {AUTH_SUCCESS, ERROR_MSG} from "../constant";
import {Toast} from "antd-mobile";

const initUser = {
    username: "",
    type: "",
    msg: "",
    redirectTo: ""
}

export const user = (preState=initUser, action) => {
    const {type, data} = action;
    switch (type) {
        case AUTH_SUCCESS:
            return {data, redirectTo: "/"}
        case ERROR_MSG:
            Toast.fail(data, 2, () => {}, false)
            return {...preState, msg: data}
        default:
            return preState;
    }
}