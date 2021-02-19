import {AUTH_SUCCESS, ERROR_MSG, RESET_USER, UPDATE_INFO} from "../constant";
import {Toast} from "antd-mobile";
import {getRedirectTo} from "../../utils";

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
            // const {type, header} = data
            return {...data, redirectTo: getRedirectTo(data.type, data.header)}
        case ERROR_MSG:
            Toast.fail(data, 2, () => {}, false)
            return {...preState, msg: data}
        case UPDATE_INFO:
            return data
        case RESET_USER:
            return {...initUser, msg: data}
        default:
            return preState;
    }
}