import React from 'react'
import {fetchCharges, addCharges, fetchChargesLabel, deleteCharges, fetchYearAndMonth} from '../../actions/ChargeAction'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import AddChargeDialog from './AddChargeDialog';
import NotDataTip from '../common/noDataTip'
import dateUtils from '../../utils/dateUtils';

import {Message, MessageBox, Button, Table, Pagination, Select} from 'element-react';
import 'element-theme-default';

class ChargeTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAddNewRecord: false,
            page: 1,
            size: 15,
            yearAndMonth: dateUtils.getCurrentYearMonthForQuery(),
            selectedCharge: null,
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
            prop: 'create_time',
            width: 200,
            render: (data, column) => {
                return dateUtils.returnDiffDate(data['create_time'])
            }
        }, {
            label: "操作",
            prop: "id",
            render: (data, column) => {
                return (
                    <div>
                        <span><Button type="text" size="small" onClick={this.delete.bind(this, data['id'])}>移除</Button></span>
                        <span style={{width: '10px', display: 'inline-block'}}></span>
                        <span><Button type="text" size="small" onClick={this.update.bind(this, data)}>更新</Button></span>
                    </div>
                )
            }
        }];
    }

    componentDidMount() {
        this.props.fetchYearAndMonthesAction();
        this.fetchCharges(this.state.page, this.state.size);
    }

    componentWillReceiveProps(nextProps) {
        let {msg} = nextProps.chargeTableState;
        if (msg) {
            Message({
                message: msg,
                type: 'warning',
                duration: 2000,
            });
        }
    }

    clickAddButton() {
        this.props.fetchAllLabelsAction({all: true});
        this.setState({
            isAddNewRecord: true
        })
    }

    handleAddConfirm(charge) {
        if (!charge) {
            return;
        }
        this.props.addChargesAction(charge);
        this.setState({
            selectedCharge: null,
            isAddNewRecord: false,
        })
        let me = this;
        setTimeout(() => {
            me.fetchCharges(me.state.page, me.state.size);
        }, 300);
    }

    handleAddcancel() {
        this.setState({
            selectedCharge: null,
            isAddNewRecord: false
        })
    }

    delete(id) {
        let me = this;
        MessageBox.confirm('此操作将永久删除该记录, 是否继续?', '提示', {
            type: 'warning'
        }).then(async() => {
            await me.props.deleteChargesAction(id);
            setTimeout(() => {
                if (me.props.chargeTableState.data.items.length == 1) { // 此次删除后 本页就没数据了 所以此处是1 省去一次查询
                    me.setState({
                        page: me.state.page - 1 === 0 ? 1 : me.state.page - 1
                    });
                }
                me.fetchCharges(me.state.page, me.state.size);
            }, 300);

            Message({
                type: 'success',
                message: '删除成功!',
                duration: 2000,
            });
        }).catch(() => {
        });
    }

    update(charge) {
        this.props.fetchAllLabelsAction({all: true});
        this.setState({
            selectedCharge: charge,
            isAddNewRecord: true
        });
    }

    clickSearchButton() {
        this.setState({
            page: 1
        });
        this.fetchCharges(1, this.state.size);
    }

    onChange(value) {
        this.setState({
            yearAndMonth: value
        });
    }

    onTableChange(page) {
        this.fetchCharges(page, this.state.size);
    }

    fetchCharges(current = 1, pageSize = 15) {
        let body = {
            page: current,
            size: pageSize,
            year_and_month: this.state.yearAndMonth
        };
        this.props.fetchChargesAction(body);
        this.setState({
            page: current,
            size: pageSize,
        });
    }

    fetchDataBody() {
        if (this.props.chargeTableState.data.items && this.props.chargeTableState.data.items.length > 0) {
            return (
                <div>
                    <Table
                        columns={this.columns}
                        data={this.props.chargeTableState.data.items}
                        loading={this.state.loading}
                    />
                    <Pagination style={{float: 'right', marginTop: '10px'}}
                                layout="total, prev, pager, next, jumper"
                                total={this.props.chargeTableState.data.total}
                                currentPage={this.state.page}
                                pageSize={this.state.size}
                                onCurrentChange={this.onTableChange.bind(this)}
                    />
                </div>
            )
        } else {
            return <NotDataTip msg='找不到数据'/>
        }
    }

    render() {
        return (
            <div>
                <div className="top">
                    账目表
                </div>

                <div className="operation-div">
                    <Button type="primary" onClick={this.clickAddButton.bind(this)}>新增账目</Button>
                    <hr className="vertical-line"/>
                    <Select value={this.state.yearAndMonth} clearable={true}
                            onChange={this.onChange.bind(this)}>
                        {
                            this.props.chargeTableState.yearAndMonthes.map(el => {
                                return <Select.Option key={el.time} label={el.time} value={el.time}/>
                            })
                        }
                    </Select>
                    <span style={{width: '10px', display: 'inline-block'}}></span>
                    <Button type="primary" icon="search" onClick={this.clickSearchButton.bind(this)}>搜索</Button>
                </div>

                {this.fetchDataBody()}

                <AddChargeDialog
                    visible={this.state.isAddNewRecord}
                    charge={this.state.selectedCharge}
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
    fetchAllLabelsAction: bindActionCreators(fetchChargesLabel, dispatch),
    deleteChargesAction: bindActionCreators(deleteCharges, dispatch),
    fetchYearAndMonthesAction: bindActionCreators(fetchYearAndMonth, dispatch),
});

let ChargeTableSmart = connect(mapStateToProps, mapDispatchToProps)(ChargeTable);

export default ChargeTableSmart;