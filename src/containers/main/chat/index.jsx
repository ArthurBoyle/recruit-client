import React, {Component} from 'react';
import {connect} from "react-redux";
import {NavBar, List, InputItem, Grid, Icon} from "antd-mobile";
import {sendMsg, readMsg} from "../../../redux/actions/sendMsg";
import RcQueueAnim from "rc-queue-anim";
import "./index.css";

const Item = List.Item;

class Chat extends Component {
    state = {
        content: "",
        isShow: false
    }
    // componentWillMount
    constructor(props) {
        super(props);
        const emojis = [
            "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂",
            "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂",
            "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂"
        ];
        this.emojis = emojis.map(emoji => ({text: emoji}));
    }
    componentDidMount() {
        window.scrollTo(0, document.body.scrollHeight);
    }
    componentDidUpdate() {
        window.scrollTo(0, document.body.scrollHeight);
    }
    componentWillUnmount() {
        const from = this.props.match.params.userid;
        const to = this.props.user._id;
        this.props.readMsg(from , to);
    }

    handleSend = () => {
        const from = this.props.user._id;
        const to = this.props.match.params.userid;
        const content = this.state.content.trim();
        if (content) {
            this.props.sendMsg({from, to, content});
            // console.log(from, to, content)
        }
        this.setState({content: ""})
    }
    toggleShow = () => {
        const isShow = !this.state.isShow;
        this.setState({isShow});
        if (isShow) {
            setTimeout(() => {
                window.dispatchEvent(new Event("resize"));
            }, 0);
        }
    }
    render() {
        const {user} = this.props;
        const {users, chatMsgs} = this.props.chat;
        const meId = user._id;
        if (!users[meId]) {
            return null
        }
        const targetId = this.props.match.params.userid;
        const chatId = [meId, targetId].sort().join("_");
        const msgs = chatMsgs.filter(msg => msg.chat_id === chatId);
        const header = users[targetId].header;
        const targetIcon = require(`../../../assets/headers/${header}.png`).default;
        return (
            <div id="chat-page">
                <NavBar
                    icon={<Icon type="left"/>}
                    className="sticky-header"
                    onLeftClick={() => this.props.history.goBack()}
                >
                    {users[targetId].username}
                </NavBar>
                <List style={{marginTop: 45, marginBottom: 43}}>
                    <RcQueueAnim type="left" delay={100}>
                        {
                            msgs.map(msg => {
                                if (msg.to === meId) {
                                    return <Item key={msg._id} thumb={targetIcon}>{msg.content}</Item>
                                } else {
                                    return <Item key={msg._id} className="chat-me" extra="我">{msg.content}</Item>
                                }
                            })
                        }
                    </RcQueueAnim>
                </List>
                <div className="am-tab-bar">
                    <InputItem
                        placeholder="请输入信息"
                        onChange={value => this.setState({content: value})}
                        onFocus={() => this.setState({isShow: false})}
                        value={this.state.content}
                        extra={
                            <div>
                                <span onClick={this.toggleShow} style={{marginRight:5}}>😀</span>
                                <span onClick={this.handleSend}>发送</span>
                            </div>
                       }
                    />
                    {this.state.isShow ? (
                        <Grid data={this.emojis}
                              columnNum={8}
                              carouselMaxRow={4}
                              isCarousel={true}
                              onClick={item => {
                                  this.setState({content: this.state.content + item.text})
                              }}
                        />) : null}
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({user: state.user, chat: state.chat}),
    {sendMsg, readMsg}
)(Chat);