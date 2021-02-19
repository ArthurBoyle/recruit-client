import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {NavBar, InputItem, TextareaItem, Button} from "antd-mobile";
import HeaderSelector from "../../../components/header-selector";
import {updateBoss} from "../../../redux/actions/updateInfo";

class BossInfo extends Component {
    state = {
        header: "",
        post: "",
        info: "",
        company: "",
        salary: ""
    }
    handleChange = (key, value) => {
        this.setState({
            [key]: value
        });
    }
    saveInfo = () => {
        // console.log(this.state);
        this.props.updateBoss(this.state);
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
                <InputItem placeholder="请输入招聘职位" onChange={value => this.handleChange("post", value)}>招聘职位：</InputItem>
                <InputItem placeholder="请输入公司名称" onChange={value => this.handleChange("company", value)}>公司名称：</InputItem>
                <InputItem placeholder="请输入职位薪资" onChange={value => this.handleChange("salary", value)}>职位薪资：</InputItem>
                <TextareaItem title="职位要求：" rows={5} onChange={value => this.handleChange("info", value)}/>
                <Button type="primary" onClick={this.saveInfo}>保存</Button>
            </Fragment>
        );
    }
}

export default connect(
    state => ({user: state.user}),
    {updateBoss}
)(BossInfo);