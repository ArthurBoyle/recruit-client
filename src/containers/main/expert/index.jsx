import React, {Component} from 'react';
import {connect} from "react-redux";
import UserList from "../../../components/user-list";
import {getUserList} from "../../../redux/actions/receiveUserList";

class Expert extends Component {
    componentDidMount() {
        this.props.getUserList("boss");
    }

    render() {
        return (
            <div>
                <UserList userList={this.props.userList}/>
            </div>
        );
    }
}

export default connect(
    state => ({userList: state.userList}),
    {getUserList}
)(Expert);