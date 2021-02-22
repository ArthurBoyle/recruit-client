import {RECEIVE_MSG_LIST, RECEIVE_MSG, MSG_READ} from "../constant";

const initChat = {
    users: {},
    chatMsgs: [],
    unReadCount: 0
};

export const chat = (preState=initChat, action) => {
    const {type, data} = action;
    switch (type) {
        case RECEIVE_MSG_LIST:
            const {chatMsgs, userid} = data;
            return {...data, unReadCount: chatMsgs.reduce((preCount, msg) => preCount + (!msg.read && msg.to === userid ? 1 : 0), 0)}
        case RECEIVE_MSG:
            return {
                users: preState.users,
                chatMsgs: [...preState.chatMsgs, data],
                unReadCount: preState.unReadCount + (!data.read && data.to === data.userid ? 1 : 0)
            }
        case MSG_READ:
            const {from, to, count} = data;
            return {
                users: preState.users,
                chatMsgs: preState.chatMsgs.map(msg => {
                    if (msg.from===from && msg.to===to && !msg.read) {
                        return {...msg, read: true}
                    } else {
                        return msg
                    }
                }),
                unReadCount: preState.unReadCount - count
            }
        default:
            return preState;
    }
}