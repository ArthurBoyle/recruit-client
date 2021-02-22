import io from "socket.io-client";
import {reqChatMsgList, reqReadMsg} from "../../api";
import {RECEIVE_MSG, RECEIVE_MSG_LIST, MSG_READ} from "../constant";

//单例对象
export const initIO = (userid, dispatch) => {
    //判断对象是否存在，如果不存在则创建对象
    if (!io.socket) {
        //创建对象后保存对象
        io.socket = io("ws://localhost:4000");
        io.socket.on("server", function (chatMsg) {
            console.log("客户端接收服务器发送的消息", chatMsg);
            if (userid === chatMsg.from || userid === chatMsg.to) {
                dispatch(receiveMsg(chatMsg, userid))
            }
        })
    }
}

export const sendMsg = ({from, to, content}) => {
    return () => {
        console.log({from, to, content});
        //发消息
        io.socket.emit("client", {from, to, content})
    }
}

// 异步获取消息列表数据
export async function getMsgList(dispatch, userid) {
    initIO(userid, dispatch);
    const response = await reqChatMsgList()
    const result = response.data
    if(result.code===0) {
        const {users, chatMsgs} = result.data
        // 分发同步action
        dispatch(receiveMsgList({users, chatMsgs, userid}))
    }
}

// 接收消息列表的同步action
const receiveMsgList = ({users, chatMsgs, userid}) => ({type: RECEIVE_MSG_LIST, data: {users, chatMsgs, userid}});
// 接收一个消息的同步action
const receiveMsg = (chatMsg, userid) => ({type: RECEIVE_MSG, data: chatMsg, userid});

//读取消息的异步action
export const readMsg = (from, to) => {
    return async dispatch => {
        const response = await reqReadMsg(from);
        const result = response.data;
        if (result.code === 0) {
            const count = result.data;
            dispatch(msgRead({count, from, to}))
        }
    }
}

// 读取某个聊天消息的同步action
const msgRead = ({count, from ,to}) => ({type: MSG_READ, data: {count, from ,to}})