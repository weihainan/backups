'use strict';

import React from 'react';
import {Link, hashHistory} from 'react-router';
import {remove} from '../utils/localstorageUtils';
import {getItem} from '../utils/localstorageUtils';


// 引入Antd的导航组件
import {Menu, Icon, Button} from 'antd';
const SubMenu = Menu.SubMenu;

let routeMap = {
    '/myIntroduce': '0',
    '/appleBasket': '1',
};

// 配置导航
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: '',
            username: ''
        };
    }

    handleClick(e) {
        this.setState({
            current: e.key
        });
    }

    componentWillMount() {
        var route = this.props.location.pathname;
        this.setState({
            current: routeMap[route] || '0'
        });
    }

    componentDidMount() {
        this.setState({
            username: !getItem('admin') ? '': getItem('admin').name
        });
    }

    loginout() {
        console.log(`${this.state.username} login out ...`)
        remove('admin');
        hashHistory.push({pathname: '/login'})
    }

    render() {
        return (
            <div>
                <div id="leftMenu">
                    <img src={require('../images/logo.png')} width="50" id="logo"/>
                    <Menu theme="dark"
                          onClick={this.handleClick.bind(this)}
                          style={{width: 200}}
                          defaultOpenKeys={['sub1', 'sub2']}
                          defaultSelectedKeys={[this.state.current]}
                          mode="inline"
                    >
                        <Menu.Item key="0"><Link to="/myIntroduce"><Icon type="mail"/>我没有子菜单</Link></Menu.Item>
                        <SubMenu key="sub1" title={<span><Icon type="bars"/><span>主导航</span></span>}>
                            <Menu.Item key="1"><Link to="/appleBasket">摘苹果</Link></Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
                <div id="rightWrap">
                    <Menu mode="horizontal">
                        <SubMenu title={<span><Icon type="user"/>{ this.state.username }</span>}>
                            <Menu.Item key="setting:1"><Button type="primary" onClick={this.loginout.bind(this)}>退
                                出</Button></Menu.Item>
                        </SubMenu>
                    </Menu>
                    <div className="right-box">
                        { this.props.children }
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
