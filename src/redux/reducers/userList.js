import {RECEIVE_USERLIST} from "../constant";

const initUserList = [];

export const userList = (preState = initUserList, action) => {
    const {type, data} = action;
    switch (type) {
        case RECEIVE_USERLIST:
            return data
        default:
            return preState;
    }
};