import React from 'react'
import {chargeTableActions} from '../../actions/ChargeAction'
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
            isAddNewRecord: false,
        };
        this.clickAddButton = this.clickAddButton.bind(this);
    }

    componentDidMount() {
        let {actions} = this.props;
        let body={
            page:1,
            size:20
        };
        actions.getCharges(body);
    }

    clickAddButton() {
        this.setState({
            isAddNewRecord: true
        })
    }

    handleAddConfirm() {
        this.setState({
            isAddNewRecord: false
        })
    }

    handleAddcancel() {
        this.setState({
            isAddNewRecord: false
        })
    }

    render() {

        let {chargeTableState, actions} = this.props;
        let {data} = chargeTableState;
        let {items, total} = data;

        total = total || 0;

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
                    <Button type="primary" onClick={this.clickAddButton}>新增账目</Button>
                </div>

                <Table columns={columns} dataSource={items}/>

                <AddChargeDialog
                    visible={this.state.isAddNewRecord}
                    handleOk={this.handleAddConfirm.bind(this)}
                    handleCancel={this.handleAddcancel.bind(this)}
                    bordered="true"
                />
            </div>
        );
    }
}


const mapStateToProps = state => ({
    chargeTableState: state.chargeTableState
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(chargeTableActions, dispatch)
});

let ChargeTableSmart = connect(mapStateToProps, mapDispatchToProps)(ChargeTable);

export default ChargeTableSmart;