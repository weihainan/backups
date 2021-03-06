import React from 'react'
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
                    {
                        validator: (rule, value, callback) => {
                            if (!value) {
                                callback(new Error('请输入数字值'));
                            }
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
                        },
                        trigger: 'change'
                    }
                ],
                label: [
                    {required: true, message: '请选择账目标签', trigger: 'change'}
                ]
            }
        };
        if (props.charge) {
            this.setState({
                form: props.charge
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.charge) {
            this.setState({
                form: nextProps.charge
            });
        }
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

    handleClickCancel(e) {
        e.preventDefault();
        this.props.handleCancel();
        this.setState({
            form: {
                amount: 0,
                type: 'disbursements',
                mark: '',
                label: '',
            }
        });
    }

    onChange(key, value) {
        this.setState({
            form: Object.assign({}, this.state.form, {[key]: value})
        });
    }

    render() {
        let options = [];
        this.props.labels.map(function (item) {
            options.push(<Select.Option key={item.name} value={item.name} label={item.name}>
                <span style={{float: 'left'}}>{item.name}</span>
                <span style={{float: 'right', color: '#8492a6', fontSize: '13px'}}>{item.mark}</span>
            </Select.Option >);
        })

        let titleStr = "添加账目";
        if (this.props.charge) {
            titleStr = "更新账目";
        }

        return (
            <div>
                <Dialog title={titleStr} visible={this.props.visible} onCancel={this.props.handleCancel}>
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
                                    {options}
                                </Select>
                            </Form.Item>
                            <Form.Item label="备注">
                                <Input type="textarea" value={this.state.form.mark}
                                       onChange={this.onChange.bind(this, 'mark')}></Input>
                            </Form.Item>
                        </Form>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Button type="primary" onClick={this.handleClickCancel.bind(this)}>取 消</Button>
                        <Button type="primary" onClick={this.handleClickOk.bind(this)}>确 定</Button>
                    </Dialog.Footer>
                </Dialog>
            </div>
        );
    }
}

AddChargeDialog.propTypes = {
    labels: React.PropTypes.array.isRequired,
    visible: React.PropTypes.bool.isRequired,
    handleOk: React.PropTypes.func.isRequired,
    handleCancel: React.PropTypes.func.isRequired,
    charge: React.PropTypes.object
}

export default AddChargeDialog
