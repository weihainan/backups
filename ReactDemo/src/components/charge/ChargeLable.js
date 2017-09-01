import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchChargesLabel, deleteChargesLabel, addChargesLabel} from '../../actions/ChargeAction'
import NotDataTip from '../common/noDataTip'
import {Message, MessageBox, Button, Table, Dialog, Form, Input} from 'element-react';

class ChargeLable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: false,
            form: {
                name: '',
                mark: '',
            }
        };
        this.columns = [{
            label: '名称',
            prop: 'name',
        }, {
            label: '说明',
            prop: 'mark',
        }, {
            label: "操作",
            prop: "id",
            render: (data, column) => {
                return (
                    <div>
                        <span><Button type="text" size="small" onClick={this.delete.bind(this, data['id'])}>移除</Button></span>
                    </div>
                )
            }
        }];
    }

    componentDidMount() {
        this.props.fetchLabelsAction({all: true});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.labelState.msg) {
            Message({
                message: nextProps.labelState.msg,
                type: 'warning',
                duration: 2000,
            });
        }
    }

    delete(id) {
        let me = this;
        MessageBox.confirm('此操作将永久删除该记录, 是否继续?', '提示', {
            type: 'warning'
        }).then(async() => {

            me.props.deleteLabelAction(id);
            setTimeout((() => {
                this.props.fetchLabelsAction({all: true});
            }).bind(me), 300);

            Message({
                type: 'success',
                message: '删除成功!',
                duration: 2000,
            });
        }).catch(() => {
        });
    }

    fetchDataBody() {
        if (this.props.labelState.labels && this.props.labelState.labels.length > 0) {
            return (
                <div>
                    <Table
                        columns={this.columns}
                        data={this.props.labelState.labels}
                    />
                </div>
            )
        } else {
            return <NotDataTip msg='找不到数据'/>
        }
    }

    clickAddButton() {
        this.setState({dialogVisible: true})
    }

    handleAddcancel() {
        this.setState({
            dialogVisible: false,
            form: {
                name: '',
                mark: '',
            }
        })
    }

    handleAddConfirm() {
        this.props.addLabelAction(this.state.form);
        this.handleAddcancel();
        let me = this;
        setTimeout(() => {
            me.props.fetchLabelsAction({all: true});
        }, 300);
    }

    onChange(key, value) {
        this.setState({
            form: Object.assign({}, this.state.form, {[key]: value})
        });
    }

    render() {
        return (
            <div>
                <div className="top">
                    账目标签
                </div>

                <div className="operation-div">
                    <Button type="primary" onClick={this.clickAddButton.bind(this)}>新增标签</Button>
                </div>

                {this.fetchDataBody()}

                <Dialog
                    title="添加标签"
                    visible={ this.state.dialogVisible }
                    onCancel={ this.handleAddcancel.bind(this) }
                >
                    <Dialog.Body>
                        <Form model={this.state.form}>
                            <Form.Item label="名称" labelWidth="60">
                                <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
                            </Form.Item>
                            <Form.Item label="备注" labelWidth="60">
                                <Input value={this.state.form.mark} onChange={this.onChange.bind(this, 'mark')}></Input>
                            </Form.Item>
                        </Form>
                    </Dialog.Body>

                    <Dialog.Footer className="dialog-footer">
                        <Button onClick={ this.handleAddcancel.bind(this) }>取 消</Button>
                        <Button type="primary" onClick={ this.handleAddConfirm.bind(this) }>确 定</Button>
                    </Dialog.Footer>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    labelState: state.chargeTableState
});

const mapDispatchToProps = dispatch => ({
    fetchLabelsAction: bindActionCreators(fetchChargesLabel, dispatch),
    deleteLabelAction: bindActionCreators(deleteChargesLabel, dispatch),
    addLabelAction: bindActionCreators(addChargesLabel, dispatch),
});

let ChargeLableSmart = connect(mapStateToProps, mapDispatchToProps)(ChargeLable);

export default ChargeLableSmart;
