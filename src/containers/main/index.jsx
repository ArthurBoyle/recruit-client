import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Switch, Route, Redirect} from "react-router-dom";
import Cookies from "js-cookie";
import BossInfo from "./boss-info";
import ExpertInfo from "./expert-info";
import {getRedirectTo} from "../../utils";
import {getUser} from "../../redux/actions/getUser";

class Main extends Component {
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
        debugger
        if (!_id) {
            return null;
        } else {
            let path = this.props.location.pathname;
            if(path === "/") {
                path = getRedirectTo(type, header);
                return <Redirect to={path}/>
            }
        }
        return (
            <Fragment>
                <Switch>
                    <Route path="/bossinfo" component={BossInfo}/>
                    <Route path="/expertinfo" component={ExpertInfo}/>
                </Switch>
            </Fragment>
        );
    }
}

export default connect(
    state => ({user: state.user}),
    {getUser}
)(Main);