import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {NavBar, WingBlank, List, InputItem, Radio, Button, WhiteSpace} from "antd-mobile";
import Logo from "../../components/logo";

const ListItem = List.Item;

class Register extends Component {
    state = {
        username: "",
        password: "",
        password2: "",
        type: ""
    };

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }
    register = () => {
        console.log(this.state);
    }
    toLogin = () => {
        this.props.history.replace("/login");
    }
    render() {
        const {type} = this.state;
        return (
            <Fragment>
                <NavBar>BOSS直聘</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem onChange={value => this.handleChange("username", value)}>用户名：</InputItem>
                        <InputItem type="password" onChange={value => this.handleChange("password", value)}>密码：</InputItem>
                        <InputItem type="password" onChange={value => this.handleChange("password2", value)}>确认密码：</InputItem>
                        <ListItem>
                            用户类型：
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio onChange={() => this.handleChange("type", "expert")} checked={type === "expert"}>大神</Radio>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio onChange={() => this.handleChange("type", "boss")} checked={type === "boss"}>老板</Radio>
                        </ListItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.register}>注册</Button>
                    <WhiteSpace/>
                    <Button onClick={this.toLogin}>已有账户</Button>
                </WingBlank>
            </Fragment>
        );
    }
}

export default connect(
    state => ({}),
    {}
)(Register);
