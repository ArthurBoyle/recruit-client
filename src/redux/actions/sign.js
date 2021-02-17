import {reqRegister, reqLogin} from "../../api";
import {AUTH_SUCCESS, ERROR_MSG} from "../constant";

// 注册/登录成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user});
// 错误提示信息的同步action
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg});

//注册的异步action
export const register = (user) => {
    const {username, password, password2, type} = user;
    if(!username) {
        return errorMsg("用户名不能为空");
    } else if(!password) {
        return errorMsg("密码不能为空");
    } else if(password !== password2) {
        return errorMsg("密码与确认密码不一致");
    } else if(!type) {
        return errorMsg("用户类型不能为空");
    }
    return async dispatch => {
        const response = await reqRegister({username, password, type});   //username, password, type
        const result = response.data;   //{code: 0/1, data: user, msg: ""}
        if(result.code === 0) {
            dispatch(authSuccess(result.data));
        } else {
            dispatch(errorMsg(result.msg));
        }
    }
}
//登录的异步action
export const login = (user) => {
    const {username, password} = user;
    if(!username) {
        return errorMsg("用户名不能为空");
    } else if(!password) {
        return errorMsg("密码不能为空");
    }
    return async dispatch => {
        const response = await reqLogin(user);   //username, password
        const result = response.data;   //{code: 0/1, data: user, msg: ""}
        if(result.code === 0) {
            dispatch(authSuccess(result.data));
        } else {
            dispatch(errorMsg(result.msg));
        }
    }
}