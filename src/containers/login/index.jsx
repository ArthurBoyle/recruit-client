import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {NavBar, WingBlank, List, InputItem, Button, WhiteSpace} from "antd-mobile";
import Logo from "../../components/logo";

class Login extends Component {
    state = {
        username: "",
        password: ""
    };
    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }
    login = () => {
        console.log(this.state)
    }
    toRegister = () => {
        this.props.history.replace("/register");
    }
    render() {
        return (
            <Fragment>
                <NavBar>BOSS直聘</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem onChange={value => this.handleChange("username", value)}>用户名：</InputItem>
                        <InputItem type="password" onChange={value => this.handleChange("password", value)}>密码：</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.login}>登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.toRegister}>还没有账户</Button>
                </WingBlank>
            </Fragment>
        );
    }
}

export default connect(
    state => ({}),
    {}
)(Login);