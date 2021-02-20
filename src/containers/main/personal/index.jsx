import React, {Component} from 'react';
import {connect} from "react-redux";
import {Result, List, Button, WhiteSpace, Modal} from "antd-mobile";
import Cookies from "js-cookie";
import {resetUser} from "../../../redux/actions/updateInfo";

const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;

class Personal extends Component {
    logout = () => {
        alert("退出登录", '确定退出？', [
            { text: 'Cancel' },
            { text: 'Ok', onPress: () => {
                Cookies.remove("userid");
                this.props.resetUser()
            } },
        ],"ios");
    }
    render() {
        const {header, username, company, post, info, salary} = this.props.user;
        return (
            <div style={{marginTop: 50}}>
                <Result img={<img src={require(`../../../assets/headers/${header}.png`).default} alt="头像加载失败"/>}
                        title={username}
                        message={company}
                />
                <List renderHeader="相关信息">
                    <Item multipleLine>
                        <Brief>职位：{post}</Brief>
                        <Brief>简介：{info}</Brief>
                        {salary ? <Brief>薪资：{salary}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace/>
                <Button type="warning" onClick={this.logout}>退出登录</Button>
            </div>
        );
    }
}

export default connect(
    state => ({user: state.user}),
    {resetUser}
)(Personal);