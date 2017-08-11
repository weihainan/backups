import React from 'react'
import {chargeTableActions} from '../../actions/ChargeAction'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Table} from 'antd';
import AddChargeDialog from './AddChargeDialog';

import './ChargeTable.css'


const columns = [{
    title: '收支类型',
    dataIndex: 'type',
}, {
    title: '金额(￥)',
    dataIndex: 'amount',
}, {
    title: '消费类别',
    dataIndex: 'label',
}, {
    title: '备  注',
    dataIndex: 'mark',
}, {
    title: '记录时间',
    dataIndex: 'createTime',
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
        actions.getCharges();
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
        items = items || [];
        total = total || 0;
        return (
            <div>
                <div>
                    <Button type="primary" onClick={this.clickAddButton}>记一笔</Button>
                </div>

                <Table columns={columns} dataSource={items}/>

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
    actions: bindActionCreators(chargeTableActions, dispatch)
});

let ChargeTableSmart = connect(mapStateToProps, mapDispatchToProps)(ChargeTable);

export default ChargeTableSmart;