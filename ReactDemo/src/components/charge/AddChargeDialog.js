import React from 'react'
import {Modal} from 'antd';

import {Dialog, Form, Button, Input, Radio, Select} from 'element-react';
import 'element-theme-default';


class AddChargeDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                amount: 0,
                type: 'disbursements',
                mark: '',
                label: '',
            },
            rules: {
                amount: [
                    {required: true, message: '请输入账目金额', trigger: 'blur'},
                    {
                        validator: (rule, value, callback) => {
                            var amount = parseFloat(value);
                            setTimeout(() => {
                                if (!amount) {
                                    callback(new Error('请输入数字值'));
                                } else {
                                    if (amount < 0) {
                                        callback(new Error('数字值必须大于0'));
                                    } else {
                                        callback();
                                    }
                                }
                            }, 500);
                        }, trigger: 'blur'
                    }
                ],
                label: [
                    {required: true, message: '请选择账目标签', trigger: 'blur'}
                ]
            }
        };
    }

    handleClickOk(e) {
        e.preventDefault();
        this.refs.form.validate((valid) => {
            if (valid) {
                this.props.handleOk(this.state.form);
                this.setState({
                    form: {
                        amount: 0,
                        type: 'disbursements',
                        mark: '',
                        label: '',
                    }
                });
            } else {
                return false;
            }
        });
    }

    onChange(key, value) {
        this.setState({
            form: Object.assign({}, this.state.form, {[key]: value})
        });
    }

    render() {
        let {visible, handleCancel} = this.props;

        return (
            <div>
                <Dialog title="新账目" visible={visible} onCancel={handleCancel}>
                    <Dialog.Body>
                        <Form labelWidth="80" labelPosition="right" ref="form" model={this.state.form}
                              rules={this.state.rules}>
                            <Form.Item label="金额" prop="amount">
                                <Input value={this.state.form.amount} prepend={'RMB'}
                                       onChange={this.onChange.bind(this, 'amount')}></Input>
                            </Form.Item>
                            <Form.Item label="收支类型" prop="type">
                                <Radio.Group value={this.state.form.type} onChange={this.onChange.bind(this, 'type')}>
                                    <Radio value="disbursements">支 出</Radio>
                                    <Radio value="receipts">收 入</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="标签" prop="label">
                                <Select value={this.state.form.label} placeholder="请选择账目标签"
                                        onChange={this.onChange.bind(this, 'label')}>
                                    <Select.Option label="区域一" value="shanghai"></Select.Option>
                                    <Select.Option label="区域二" value="beijing"></Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="备注">
                                <Input type="textarea" value={this.state.form.mark}
                                       onChange={this.onChange.bind(this, 'mark')}></Input>
                            </Form.Item>
                        </Form>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Button type="primary" onClick={handleCancel}>取 消</Button>
                        <Button type="primary" onClick={this.handleClickOk.bind(this)}>确 定</Button>
                    </Dialog.Footer>
                </Dialog>
            </div>
        );
    }
}


AddChargeDialog.propTypes = {
    visible: React.PropTypes.bool.isRequired,
    handleOk: React.PropTypes.func.isRequired,
    handleCancel: React.PropTypes.func.isRequired,
}

export default AddChargeDialog