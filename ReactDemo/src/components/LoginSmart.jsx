import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import adminActions from '../actions/AdminAction'
import {getItem} from '../utils/localstorageUtils';
import {hashHistory} from 'react-router';
import {message} from 'antd';

const FormItem = Form.Item;

import '../styles/app.css';
import '../styles/login.css';

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let {actions} = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                actions.doLogin(values);
                if (getItem('admin')) {
                    hashHistory.push({pathname: '/'})
                }
            }
        });
    }

    error = (errorMsg)=>{
          if(errorMsg){
              message.info(errorMsg);
          }
    }

    render() {
        let {adminState} = this.props;
        let {logining, errorMsg} = adminState;

        this.error(errorMsg)

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
                                {!logining ? ' 登 录' : 'login ...'}
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
    actions: bindActionCreators(adminActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(NormalLoginForm));


//export default ;

