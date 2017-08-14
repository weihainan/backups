import React from 'react'
import {fetchCharges} from '../../actions/ChargeAction'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Table} from 'antd';
import AddChargeDialog from './AddChargeDialog';
import dateUtils from '../../utils/dateUtils'

import './ChargeTable.css'


const columns = [{
    title: '收支类型',
    dataIndex: 'type',
    width: 180
}, {
    title: '金额(￥)',
    dataIndex: 'amount',
}, {
    title: '消费标签',
    dataIndex: 'label',
}, {
    title: '备  注',
    dataIndex: 'mark',
    width: 420
}, {
    title: '记录时间',
    dataIndex: 'createTime',
    width: 200
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

    clickAddButton() {
        this.setState({
            isAddNewRecord: true
        })

    }

    handleAddConfirm(charge) {
        if (!charge) {
            console.log(false)
            return;
        }
        this.setState({
            loading: true,
        })
        let {actions} = this.props;
        actions.addCharge(charge);
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
        this.fetchCharges(page.current, page.pageSize);
    }

    fetchCharges(current, pageSize) {
        this.setState({loading: true});

        let body = {
            page: current,
            size: pageSize,
        };
        this.props.fetchChargesAction(body);
        this.setState({
            loading: true,
            page: current,
            size: pageSize,
        });

    }

    render() {

        let {chargeTableState, actions} = this.props;
        let {data} = chargeTableState;
        let {items, total} = data;

        total = total || 0;

        let pagination = {
            total: total,
            pageSize: this.state.size,
            current: this.state.page,
        }

        items = items || [];
        items.forEach(item=> {
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
                    dataSource={items}
                    bordered={true}
                    onChange={this.onTableChange.bind(this)}
                    pagination={pagination}
                    rowKey={record => record.id}
                />

                <AddChargeDialog
                    visible={this.state.isAddNewRecord}
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
    fetchChargesAction: bindActionCreators(fetchCharges, dispatch)
});

let ChargeTableSmart = connect(mapStateToProps, mapDispatchToProps)(ChargeTable);

export default ChargeTableSmart;