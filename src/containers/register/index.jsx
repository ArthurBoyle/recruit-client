import React, {Component} from 'react';
import {connect} from "react-redux";

class Register extends Component {
    render() {
        return (
            <div>
                Register
            </div>
        );
    }
}

export default connect(
    state => ({}),
    {}
)(Register);