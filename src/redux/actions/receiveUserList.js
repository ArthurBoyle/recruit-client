import {RECEIVE_USERLIST} from "../constant";
import {reqUserList} from "../../api";
import {errorMsg} from "./sign";

const receiveUserList = (userList) => ({type: RECEIVE_USERLIST, data: userList});

export const getUserList = (type) => {
    return async dispatch => {
        const response = await reqUserList(type);
        const result = response.data;
        if (result.code === 0) {
            dispatch(receiveUserList(result.data));
        } else {
            dispatch(errorMsg(result.msg));
        }
    }
}