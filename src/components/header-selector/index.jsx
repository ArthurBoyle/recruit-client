import React, {Component} from 'react';
import {Grid, List} from "antd-mobile";
import PropTypes from "prop-types";


const data = Array.from(new Array(20)).map((_val, i) => ({
    text: `头像${i + 1}`,
    icon: require(`../../assets/headers/头像${i + 1}.png`).default
}));

export default class HeaderSelector extends Component {
    state = {
        icon: ""
    }
    static PropType = {
        setHeader: PropTypes.func.isRequired
    }
    handleClick = ({icon, text}) => {
        this.setState({icon});
        this.props.setHeader(text);
    }
    render() {
        const {icon} = this.state;
        const header = icon ? (
            <div>
                已选择头像：<img src={icon} alt="头像加载失败"/>
            </div>
        ) : "请选择头像";
        return (
            <List renderHeader={() => header}>
                <Grid
                    data={data}
                    columnNum={5}
                    onClick={this.handleClick}
                />
            </List>
        );
    }
}
