import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Switch, Route, Redirect} from "react-router-dom";
import Cookies from "js-cookie";
import {NavBar} from "antd-mobile";

import BossInfo from "./boss-info";
import ExpertInfo from "./expert-info";
import Boss from "./boss";
import Expert from "./expert";
import Message from "./message";
import Personal from "./personal";
import NotFound from "../../components/not-found";
import {getRedirectTo} from "../../utils";
import {getUser} from "../../redux/actions/getUser";
import NavFooter from "../../components/nav-footer";
import Chat from "./chat";
import "./index.css";

class Main extends Component {
    navList = [
        {
            path: "/boss",
            component: Boss,
            title: "大神列表",
            icon: "expert",
            text: "大神"
        },
        {
            path: "/expert",
            component: Expert,
            title: "老板列表",
            icon: "boss",
            text: "老板"
        },
        {
            path: '/message', // 路由路径
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人'
        }
    ];

    componentDidMount() {
        const userid = Cookies.get("userid");
        const {_id} = this.props.user;
        if (userid && !_id) {
            // console.log("发送ajax请求");
            this.props.getUser();
        }
    }

    render() {
        const userid = Cookies.get("userid");
        if (!userid) {
            return <Redirect to="/login"/>
        }
        const {_id, type, header} = this.props.user;
        const {unReadCount} = this.props;
        if (!_id) {
            return null;
        } else {
            let path = this.props.location.pathname;
            if(path === "/") {
                path = getRedirectTo(type, header);
                return <Redirect to={path}/>
            }
        }

        const {navList} = this;
        const path = this.props.location.pathname;
        const currentNav = navList.find((nav) => nav.path === path);
        if (currentNav) {
            if (type === "boss") {
                navList[1].hide = true;
            } else {
                navList[0].hide = true;
            }
        }

        return (
            <Fragment>
                {currentNav ? <NavBar className="fixed-top">{currentNav.title}</NavBar> : null}
                <Switch>
                    {
                        navList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component}/>)
                    }
                    <Route path="/bossinfo" component={BossInfo}/>
                    <Route path="/expertinfo" component={ExpertInfo}/>
                    <Route path="/chat/:userid" component={Chat}/>
                    <Route component={NotFound}/>
                </Switch>
                {currentNav ? <NavFooter navList={navList} unReadCount={unReadCount}/> : null}
            </Fragment>
        );
    }
}

export default connect(
    state => ({user: state.user, unReadCount: state.chat.unReadCount}),
    {getUser}
)(Main);