import React, {Component} from 'react';
import {connect} from "react-redux";
import {Badge, List} from "antd-mobile";

const Item = List.Item;
const Brief = Item.Brief;

class Message extends Component {
    getLastMsgs = (chatMsgs, userid) => {
        const lastObjs = {};
        chatMsgs.forEach(msg => {
            if (msg.to === userid && !msg.read) {
                msg.unReadCount = 1;
            } else {
                msg.unReadCount = 0;
            }

            const chatid = msg.chat_id;
            const lastMsg = lastObjs[chatid];
            if (!lastMsg) {
                lastObjs[chatid] = msg;
            } else {
                const unReadCount = lastMsg.unReadCount + msg.unReadCount;
                if (msg.create_time > lastMsg.create_time) {
                    lastObjs[chatid] = msg;
                }
                lastObjs[chatid].unReadCount = unReadCount;
            }
        })
        const lastMsgs = Object.values(lastObjs);
        lastMsgs.sort(function (m1, m2) {
            return m2.create_time - m1.create_time;
        })
        return lastMsgs;
    }
    render() {
        const {user} = this.props;
        const {users, chatMsgs} = this.props.chat;
        const lastMsgs = this.getLastMsgs(chatMsgs, user._id);
        return (
            <List style={{marginTop: 50}}>
                {
                    lastMsgs.map(msg => {
                        const targetUserId = msg.to === users._id ? msg.from : msg.to;
                        const targetUser = users[targetUserId]
                        return (
                            <Item
                                key={msg._id}
                                extra={<Badge text={msg.unReadCount}/>}
                                thumb={require(`../../../assets/headers/${targetUser.header}.png`).default}
                                arrow="horizontal"
                                onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
                            >
                                {msg.content}
                                <Brief>{targetUser.username}</Brief>
                            </Item>
                        )
                    })
                }
            </List>
        );
    }
}

export default connect(
    state => ({user: state.user, chat: state.chat}),
    {}
)(Message);