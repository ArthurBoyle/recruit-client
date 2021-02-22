import {reqUser} from "../../api";
import {ERROR_MSG, UPDATE_INFO} from "../constant";
import {getMsgList} from "./sendMsg";

const updateUser = (user) => ({type: UPDATE_INFO, data: user});
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg});

export const getUser = () => {
    return async dispatch => {
        const response = await reqUser();
        const result = response.data;
        if (result.code === 0) {
            getMsgList(dispatch, result.data._id);
            dispatch(updateUser(result.data));
        } else {
            dispatch(errorMsg(result.msg));
        }
    }
}