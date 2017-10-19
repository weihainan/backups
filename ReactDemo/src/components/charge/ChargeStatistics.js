import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {statistics, fetchYearAndMonth} from "../../actions/ChargeAction"
import dateUtils from '../../utils/dateUtils';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

import {Button, Loading, Message, Select} from 'element-react';

class ChargeStatistics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            year: dateUtils.getCurrentYear(),
            yearAndMonth: dateUtils.getCurrentYearMonthForQuery(),
            loading: true,
        };
    }

    /*生命周期函数--->该方法在完成首次渲染之前被调用-》调用action中ajax方法，获取数据*/
    componentWillMount() {

    }

    componentDidMount() {
        this.props.fetchYearAndMonthesAction();
        this.refresh()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.chargeState.msg) {
            Message({
                message: nextProps.chargeState.msg,
                type: 'warning',
                duration: 2000,
            });
        }
    }

    /**
     *条件：当组件确定要更新，在 render 之前调用
     *用处：这个时候可以确定一定会更新组件，可以执行更新前的操作
     *注意：方法中不能使用 setState ，setState 的操作应该在 componentWillReceiveProps 方法中调用
     * @param nextProps
     * @param nextState
     */
    componentWillUpdate(nextProps, nextState) {

    }

    plot() {
        let year = this.state.year
        let currentYM = this.state.yearAndMonth
        if (this.props.chargeState.statistics && this.props.chargeState.statistics[year]) {
            let currentData = this.props.chargeState.statistics[year]['details'][currentYM];
            let data = currentData['disbursements'];
            let xAxis = Object.keys(data);
            let series = Object.values(data);
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('disbursements'));
            // 绘制图表
            myChart.setOption({
                title: {text: `${currentYM} 花销:${currentData.disbursements_total}`},
                tooltip: {},
                xAxis: {
                    data: xAxis
                },
                yAxis: {},
                series: [{
                    name: '支出',
                    type: 'bar',
                    barWidth: '10%',
                    data: series
                }]
            });

            data = currentData['receipts'];
            xAxis = Object.keys(data);
            series = Object.values(data);
            // 基于准备好的dom，初始化echarts实例
            myChart = echarts.init(document.getElementById('receipts'));
            // 绘制图表
            myChart.setOption({
                title: {text: `${currentYM} 收入:${currentData.receipts_total}`},
                tooltip: {},
                xAxis: {
                    data: xAxis
                },
                yAxis: {},
                series: [{
                    name: '收入',
                    type: 'bar',
                    barWidth: '10%',
                    data: series
                }]
            });
        }
    }

    componentWillUnmount() {

    }

    refresh() {
        this.setState({loading: true})
        this.props.statisticsAction();
        setTimeout((()=> {
            this.plot();
            this.setState({loading: false})
        }).bind(this), 1000)
    }


    onChange(value) {
        this.setState({
            yearAndMonth: value
        });
    }

    render() {
        return (
            <div>
                <div className="top">
                    账目报表
                </div>

                <div className="operation-div">
                    <Select value={this.state.yearAndMonth} clearable={true}
                            onChange={this.onChange.bind(this)}>
                        {
                            this.props.chargeState.yearAndMonthes.map(el => {
                                return <Select.Option key={el.time} label={el.time} value={el.time}/>
                            })
                        }
                    </Select>
                    <span style={{width: '10px', display: 'inline-block'}}></span>
                    <Button type="primary" onClick={this.refresh.bind(this)}>刷新</Button>
                </div>
                <Loading loading={this.state.loading} text="努力加载中...">
                    <div id="disbursements" style={{width: '100%', height: 400}}></div>
                    <div id="receipts" style={{width: '100%', height: 400}}></div>
                </Loading>
            </div>
        );
    }
}

const mapStateToProps = state => ({chargeState: state.chargeTableState});

const mapDispatchToProps = dispatch => ({
    fetchYearAndMonthesAction: bindActionCreators(fetchYearAndMonth, dispatch),
    statisticsAction: bindActionCreators(statistics, dispatch)
});

let ChargeStatisticsSmart = connect(mapStateToProps, mapDispatchToProps)(ChargeStatistics);

export default ChargeStatisticsSmart;
