import React from 'react'
import { fetchCharges, addCharges, fetchChargesLabel, deleteCharges } from '../../actions/ChargeAction'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AddChargeDialog from './AddChargeDialog';
import dateUtils from '../../utils/dateUtils';

import { Message, MessageBox, Button, Table, Pagination } from 'element-react';
import 'element-theme-default';

class ChargeTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAddNewRecord: false,
            page: 1,
            size: 15,
        };

        this.columns = [{
            label: '收支类型',
            prop: 'type',
            width: 180,
            render: (data, column) => {
                if (data['type'] === 'receipts') {
                    return '收入'
                } else {
                    return '支出'
                }
            }
        }, {
            label: '金额(￥)',
            prop: 'amount',
        }, {
            label: '消费标签',
            prop: 'label',
        }, {
            label: '备  注',
            prop: 'mark',
            width: 420
        }, {
            label: '记录时间',
            prop: 'createTime',
            width: 200,
            render: (data, column) => {
                return dateUtils.returnDiffDate(data['createTime'])
            }
        }, {
            label: "操作",
            prop: "id",
            render: (data, column) => {
                return (<span><Button type="text" size="small" onClick={this.delete.bind(this, data['id'])}>移除</Button></span>)
            }
        }];
    }

    componentDidMount() {
        this.fetchCharges(this.state.page, this.state.size);
    }

    componentWillReceiveProps(nextProps) {
        let { msg } = nextProps.chargeTableState;
        if (msg) {
            Message({
                message: msg,
                type: 'warning',
                duration: 2000,
            });
        }
    }

    async clickAddButton() {
        await this.props.fetchALlLabelsAction({ all: true });
        this.setState({
            isAddNewRecord: true
        })
    }

    async handleAddConfirm(charge) {
        if (!charge) {
            return;
        }
        await this.props.addChargesAction(charge);
        this.fetchCharges(this.state.page, this.state.size);
        this.setState({
            isAddNewRecord: false,
        })
    }

    handleAddcancel() {
        this.setState({
            isAddNewRecord: false
        })
    }

    delete(id) {
        let me = this;
        MessageBox.confirm('此操作将永久删除该记录, 是否继续?', '提示', {
            type: 'warning'
        }).then(async () => {
            await me.props.deleteChargesAction(id);
            setTimeout(() => {
                if (me.props.chargeTableState.data.items.length == 1) { // 奇怪 为什么是1而不是0
                    me.setState({
                        page: me.state.page - 1 === 0 ? 1 : me.state.page - 1
                    });
                }
                me.fetchCharges(me.state.page, me.state.size);
            }, 300);

            Message({
                type: 'success',
                message: '删除成功!'
            });
        }).catch(() => {
        });
    }

    onTableChange(page) {
        this.fetchCharges(page, this.state.size);
    }

    fetchCharges(current, pageSize) {
        let body = {
            page: current,
            size: pageSize,
        };
        this.props.fetchChargesAction(body);
        this.setState({
            page: current,
            size: pageSize,
        });
    }

    render() {
        return (
            <div>
                <div className="top">
                    账目表
                </div>

                <div className="operation-div">
                    <Button type="primary" onClick={this.clickAddButton.bind(this)}>新增账目</Button>
                </div>

                <Table
                    columns={this.columns}
                    data={this.props.chargeTableState.data.items}
                    loading={this.state.loading}
                />

                <Pagination style={{ float: 'right', marginTop: '10px' }}
                    layout="total, prev, pager, next, jumper"
                    total={this.props.chargeTableState.data.total}
                    currentPage={this.state.page}
                    pageSize={this.state.size}
                    onCurrentChange={this.onTableChange.bind(this)}
                />

                <AddChargeDialog
                    visible={this.state.isAddNewRecord}
                    labels={this.props.chargeTableState.labels}
                    handleOk={this.handleAddConfirm.bind(this)}
                    handleCancel={this.handleAddcancel.bind(this)}
                />
            </div>
        );
    }
}


const mapStateToProps = state => ({
    chargeTableState: state.chargeTableState
});

const mapDispatchToProps = dispatch => ({
    fetchChargesAction: bindActionCreators(fetchCharges, dispatch),
    addChargesAction: bindActionCreators(addCharges, dispatch),
    fetchALlLabelsAction: bindActionCreators(fetchChargesLabel, dispatch),
    deleteChargesAction: bindActionCreators(deleteCharges, dispatch),
});

let ChargeTableSmart = connect(mapStateToProps, mapDispatchToProps)(ChargeTable);

export default ChargeTableSmart;