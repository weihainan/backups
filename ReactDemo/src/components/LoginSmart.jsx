import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Form, Icon, Input, Button} from 'antd';
import {loginAction} from '../actions/AdminAction'
import {getItem} from '../utils/localstorageUtils';
import {hashHistory} from 'react-router';
import {message} from 'antd';

import '../styles/app.css';
import '../styles/login.css';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (getItem('admin')) {
            hashHistory.push({pathname: '/'})
        }
    }

    componentWillReceiveProps(nextProps) {
        let {adminState} = nextProps;
        if (adminState.isLoggedIn && getItem('admin')) {
            setTimeout(() => {
                window.location.href = '/#'
                //window.location.href = '/demo/#'
            }, 100)
        }
        if (nextProps.adminState.errorMsg) {
            message.info(nextProps.adminState.errorMsg);
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.loginActions(values);
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <div id="components-form-demo-normal-login">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('id', {
                                rules: [{required: true, message: '请输入用户编号!'}],
                            })(
                                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="ID"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '请输入登录密码!'}],
                            })(
                                <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                       placeholder="Password"/>
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                {!this.props.adminState.logining ? ' 登 录' : 'login ...'}
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    adminState: state.adminState
});

const mapDispatchToProps = dispatch => ({
    loginActions: bindActionCreators(loginAction, dispatch)
});

let LoginSmart = connect(mapStateToProps, mapDispatchToProps)(Form.create()(NormalLoginForm));

export default LoginSmart;
