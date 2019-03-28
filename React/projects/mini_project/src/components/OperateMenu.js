import React from 'react'
import { Menu, Layout, Icon } from 'antd'
const { Sider } = Layout

class OperateMenu extends React.Component {

    state = {
        collapsed: false
    }

    onCollapse = (collapsed) => {
        this.setState({
            collapsed: collapsed
        })
    }

    onSelect = ({ item, key, selectedKeys }) => {
        switch(key){
            case "1":
                this.props.history.replace("/home/gallery")
                break;
            case "2":
                this.props.history.replace("/home/upload")
                break;
            default:
                break;
        }
    }

    render() {
        return (
                <Sider
                    theme="light"
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <Menu 
                        theme="light" 
                        mode="inline"
                        onSelect={this.onSelect}
                    >
                        <Menu.Item key="1">
                            <Icon type="video-camera" />
                            <span>Gallery</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="cloud-upload" />
                            <span>UpLoad</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
        )
    }

}

export default OperateMenu;