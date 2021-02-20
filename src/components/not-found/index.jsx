import React, {Component, Fragment} from 'react';

export default class NotFound extends Component {
    render() {
        return (
            <Fragment>
                <h2>404 Not Found</h2>
                <button type="primary" onClick={() => this.props.history.replace("/")}>回到首页</button>
            </Fragment>
        );
    }
}
