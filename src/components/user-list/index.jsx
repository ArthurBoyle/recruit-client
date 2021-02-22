import React, {Component} from 'react';
import {WingBlank, WhiteSpace, Card} from "antd-mobile";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import RcQueueAnim from "rc-queue-anim";

const Header = Card.Header;
const Body = Card.Body;

class UserList extends Component {
    static propTypes = {
        userList: PropTypes.array.isRequired
    }
    render() {
        const {userList} = this.props;
        return (
            <WingBlank style={{marginBottom: 60, marginTop: 50}}>
                <RcQueueAnim type="scale">
                    {
                        userList.map(user => (
                            <div key={user._id}>
                                <WhiteSpace/>
                                <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                                    <Header thumb={require(`../../assets/headers/${user.header}.png`).default}
                                            extra={user.username}
                                    />
                                    <Body>
                                        <div>职位：{user.post}</div>
                                        {user.company ? <div>公司：{user.company}</div> : null}
                                        {user.salary ? <div>月薪：{user.salary}</div> : null}
                                        <div>描述：{user.info}</div>
                                    </Body>
                                </Card>
                            </div>
                        ))
                    }
                </RcQueueAnim>
            </WingBlank>
        );
    }
}

export default withRouter(UserList);
