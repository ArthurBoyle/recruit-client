import {reqUser} from "../../api";
import {ERROR_MSG, UPDATE_INFO} from "../constant";

const updateUser = (user) => ({type: UPDATE_INFO, data: user});
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg});

export const getUser = () => {
    return async dispatch => {
        const response = await reqUser();
        const result = response.data;
        if (result.code === 0) {
            dispatch(updateUser(result.data));
        } else {
            dispatch(errorMsg(result.msg));
        }
    }
}