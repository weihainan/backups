'use strict';

import React from 'react';
import {Link, hashHistory} from 'react-router';
import {remove, getItem} from '../utils/localstorageUtils';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {valideToken} from '../actions/AdminAction'
import auth from '../services/auth'

// 引入Antd的导航组件
import {Menu, Icon, Button, message} from 'antd';
const SubMenu = Menu.SubMenu;

let routeMap = {
    '/myIntroduce': '0',
    '/appleBasket': '1',
    '/chargeTable': '2',
    '/chargeTimeLine': '3',
    '/chargeStatistic': '4',
    '/chargeLabels': '5',
    '/todo': '6',
};

const POLL_INTERVAL = 60000

// 配置导航
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            current: '0',
            openKeys: [],
            username: '',
        };
    }

    componentDidMount() {
        var route = this.props.location.pathname;
        this.setState({
            current: routeMap[route] || '0'
        });
        this.setState({
            username: !getItem('admin') ? '' : getItem('admin').name
        });
        this.startValidTokenPoll();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.adminState.expired) {
            this.loginout();
        }

        if (nextProps.adminState.errorMsg) {
            message.info(nextProps.adminState.errorMsg);
        }
    }

    componentWillUnmount() {
        this.stopValidTokenPoll()
    }

    startValidTokenPoll() {
        let valideTokenTask = ()=> {
            this.props.valideTokenAction(auth());
        }
        this.timer = setInterval(valideTokenTask, POLL_INTERVAL)
    }

    stopValidTokenPoll() {
        if (this.timer) {
            clearInterval(this.timer)
        }
    }

    handleClick(e) {
        this.setState({
            current: e.key
        });
    }

    loginout() {
        console.log(`${this.state.username} login out ...`)
        remove('admin');
        hashHistory.push({pathname: '/login'})
    }

    onOpenChange = (openKeys) => {
        const state = this.state;
        const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
        const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

        let nextOpenKeys = [];
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
        }
        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey);
        }
        this.setState({openKeys: nextOpenKeys});
    }

    getAncestorKeys = (key) => {
        const map = {
            sub3: ['sub2'],
        };
        return map[key] || [];
    }

    render() {
        return (
            <div>
                <div id="leftMenu">
                    <img src={require('../images/logo.png')} width="50" id="logo"/>
                    <Menu.Divider />
                    <Menu theme="dark"
                          onClick={this.handleClick.bind(this)}
                          style={{width: 200}}
                          defaultOpenKeys={['sub1', 'sub2']}
                          defaultSelectedKeys={[this.state.current]}
                          mode="inline"
                          openKeys={this.state.openKeys}
                          selectedKeys={[this.state.current]}
                          onOpenChange={this.onOpenChange}
                    >
                        <Menu.Item key="0"><Link to="/myIntroduce"><Icon type="mail"/>我没有子菜单</Link></Menu.Item>
                        <SubMenu key="sub1" title={<span><Icon type="bars"/><span>主导航</span></span>}>
                            <Menu.Item key="1"><Link to="/appleBasket">摘苹果</Link></Menu.Item>
                            <Menu.Item key="6"><Link to="/todo">TODO</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="bars"/><span>记  账</span></span>}>
                            <Menu.Item key="2"><Link to="/chargeTable">账目表</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/myIntroduce">时间轴</Link></Menu.Item>
                            <Menu.Item key="4"><Link to="/chargeStatistic">统 计</Link></Menu.Item>
                            <Menu.Item key="5"><Link to="/chargeLabels">标 签</Link></Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
                <div id="rightWrap">
                    <Menu mode="horizontal" className="head-menu">
                        <SubMenu title={<span><Icon type="user"/> {this.state.username}</span>}>
                            <Menu.Item key="setting:1" style={{textAlign: 'center'}}>
                                <Button type="primary" onClick={this.loginout.bind(this)}>退 出</Button>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                    <div className="right-box">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    adminState: state.adminState
});

const mapDispatchToProps = dispatch => ({
    valideTokenAction: bindActionCreators(valideToken, dispatch)
});

let AppSmart = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppSmart;
