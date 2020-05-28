import React, { Component } from 'react'
import { Menu } from 'antd'
import { HomeOutlined } from '@ant-design/icons';

import { Route, NavLink, Switch } from 'react-router-dom';

export default class TopNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: props.match.path
        };
    }

    handleClick = e => {
        this.setState({
            current: e.key,
        });
    };

    render() {
        return (
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                <Menu.Item key="/" >
                    <NavLink exact to="/">
                        <HomeOutlined />
                        Home
                        </NavLink>
                </Menu.Item>
            </Menu>
        )
    }
}
