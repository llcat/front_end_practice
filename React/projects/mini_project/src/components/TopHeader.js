import React from 'react';
import { Button, Avatar } from "antd";
import faker from 'faker'

import './TopHeader.css'

class TopHeader extends React.Component {

    showLoginForm=()=>{
        let { history } = this.props
        history.push("/login")
    }

    handleUserLogOut=()=>{
        this.props.onUserLogOut();
        this.props.history.replace("/login")
    }

    render() {
        const userInfo = this.props.userInfo;
        const nickName = userInfo.nickName || ""
        return (
            <div className="top-header">
                <span className="app-name">Mini Project</span>
                {
                    nickName.length>0?
                    <div className="user-info">
                        <Avatar src={faker.image.avatar()} />
                        <span className="user-name">{nickName}</span>
                        <Button type="dashed" onClick={this.handleUserLogOut}>登出</Button>
                    </div>:
                    <div className="user-info">
                        <Button type="dashed" onClick={this.showLoginForm}>登陆</Button>
                    </div>
                }
            </div>
        )
    }

}

export default TopHeader;