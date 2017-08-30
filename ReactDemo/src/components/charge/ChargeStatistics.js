import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {statistics} from "../../actions/ChargeAction"

import dateUtils from '../../utils/dateUtils';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class ChargeStatistics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    /*生命周期函数--->该方法在完成首次渲染之前被调用-》调用action中ajax方法，获取数据*/
    componentWillMount() {

    }

    componentDidMount() {
        this.props.statisticsAction();
        setTimeout((()=> {
            this.plot();
        }).bind(this), 300)
    }

    componentWillReceiveProps(nextProps) {

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
        let year = dateUtils.getCurrentYear()
        let currentYM = dateUtils.getCurrentYearMonthForQuery();
        if (this.props.chargeState.statistics && this.props.chargeState.statistics['2017']) {
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

    render() {
        return (
            <div>
                <div className="top">
                    账目报表
                </div>
                <div id="disbursements" style={{width: '50%', height: 400}}></div>
                <div id="receipts" style={{width: '50%', height: 400}}></div>
            </div>
        );
    }
}


const mapStateToProps = state => ({chargeState: state.chargeTableState});

const mapDispatchToProps = dispatch => ({
    statisticsAction: bindActionCreators(statistics, dispatch)
});

let ChargeStatisticsSmart = connect(mapStateToProps, mapDispatchToProps)(ChargeStatistics);

export default ChargeStatisticsSmart;