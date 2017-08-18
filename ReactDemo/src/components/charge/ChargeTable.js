import React from 'react'
import { fetchCharges, addCharges, fetchChargesLabel } from '../../actions/ChargeAction'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AddChargeDialog from './AddChargeDialog';
import dateUtils from '../../utils/dateUtils';

import { Message, Button, Table, Pagination } from 'element-react';
import 'element-theme-default';

const columns = [{
    label: '收支类型',
    prop: 'type',
    width: 180
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
    width: 200
}, {
    label: "操作",
    prop: "id",
    render: function () {
        return (<span><Button type="text" size="small">移除</Button></span>)
    }
}];

class ChargeTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isAddNewRecord: false,
            page: 1,
            size: 15,
        };
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
            console.log(false)
            return;
        }
        this.setState({
            loading: true,
        })
        await this.props.addChargesAction(charge);
        this.fetchCharges(this.state.page, this.state.size);
        this.setState({
            loading: false,
            isAddNewRecord: false,
        })
    }

    handleAddcancel() {
        this.setState({
            isAddNewRecord: false
        })
    }

    onTableChange(page) {
        this.fetchCharges(page, this.state.size);
    }

    fetchCharges(current, pageSize) {
        this.setState({ loading: true });

        let body = {
            page: current,
            size: pageSize,
        };
        this.props.fetchChargesAction(body);
        this.setState({
            loading: false,
            page: current,
            size: pageSize,
        });
    }

    render() {

        let { data, labels } = this.props.chargeTableState;
        let { items, total } = data;
        total = total || 0;
        items = items || [];
        items.forEach(item => {
            let createTime = dateUtils.returnDiffDate(item['createTime']);
            item['createTime'] = createTime;

            if (item['type'] === 'receipts') {
                item['type'] = '收入'
            } else {
                item['type'] = '支出'
            }
        });

        return (
            <div>
                <div className="top">
                    账目表
                </div>

                <div className="operation-div">
                    <Button type="primary" onClick={this.clickAddButton.bind(this)}>新增账目</Button>
                </div>

                <Table
                    columns={columns}
                    data={items}
                />

                <Pagination style={{ float: 'right', marginTop: '10px' }}
                    layout="total, prev, pager, next, jumper"
                    total={total}
					currentPage={this.state.page}
                    pageSize={this.state.size}
                    onCurrentChange={this.onTableChange.bind(this)}
                />

                <AddChargeDialog
                    visible={this.state.isAddNewRecord}
                    labels={labels}
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
});

let ChargeTableSmart = connect(mapStateToProps, mapDispatchToProps)(ChargeTable);

export default ChargeTableSmart;