import {reqUpdate} from "../../api";
import {ERROR_MSG, RESET_USER, UPDATE_INFO} from "../constant";

const updateUser = (user) => ({type: UPDATE_INFO, data: user});
export const resetUser = (msg) => ({type: RESET_USER, data: msg});
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg});

export const updateBoss = (user) => {
    const {header, info, post, salary, company} = user;
    if(!header || !info || !post || !salary || !company) {
        return errorMsg("请完善用户信息");
    }
    return async dispatch => {
        const response = await reqUpdate(user);
        const result = response.data;
        if (result.code === 0) {
            dispatch(updateUser(result.data))
        } else {
            dispatch(resetUser(result.msg));
        }
    }
}

export const updateExpert = (user) => {
    const {header, info, post} = user;
    if(!header || !info || !post) {
        return errorMsg("请完善用户信息");
    }
    return async dispatch => {
        const response = await reqUpdate(user);
        const result = response.data;
        if (result.code === 0) {
            dispatch(updateUser(result.data))
        } else {
            dispatch(resetUser(result.msg));
        }
    }
}