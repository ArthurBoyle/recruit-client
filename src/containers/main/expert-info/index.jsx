import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Button, InputItem, NavBar, TextareaItem} from "antd-mobile";
import HeaderSelector from "../../../components/header-selector";
import {updateExpert} from "../../../redux/actions/updateInfo";
import {Redirect} from "react-router-dom";

class ExpertInfo extends Component {
    state = {
        header: "",
        post: "",
        info: ""
    }
    handleChange = (key, value) => {
        this.setState({
            [key]: value
        });
    }
    saveInfo = () => {
        // console.log(this.state);
        this.props.updateExpert(this.state);
    }
    setHeader = (header) => {
        this.setState({header})
    }
    render() {
        const {header, type} = this.props.user;
        if (header) {
            const path = (type === "boss" ? "/boss" : "/expert");
            return <Redirect to={path}/>
        }
        return (
            <Fragment>
                <NavBar>老板信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem placeholder="请输入求职岗位" onChange={value => this.handleChange("post", value)}>求职岗位：</InputItem>
                <TextareaItem title="个人介绍：" rows={5} onChange={value => this.handleChange("info", value)}/>
                <Button type="primary" onClick={this.saveInfo}>保存</Button>
            </Fragment>
        );
    }
}

export default connect(
    state => ({user: state.user}),
    {updateExpert}
)(ExpertInfo);