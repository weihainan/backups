import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {statistics} from "../../actions/ChargeAction"

import dateUtils from '../../utils/dateUtils';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/line';
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
        this.props.statisticsAction();
    }

    componentDidMount() {
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
        let currentYM = dateUtils.getCurrentYearMonth();
        let data = this.props.chargeState.statistics['2017']['details']['201708']['disbursements'];
        let xAxis = Object.keys(data);
        let series = Object.values(data);
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'));
        // 绘制图表
        myChart.setOption({
            title: {text: `${currentYM} 花销`},
            tooltip: {},
            xAxis: {
                data: xAxis
            },
            yAxis: {},
            series: [{
                name: '支出',
                type: 'line',
                barWidth: '60%',
                data: series
            }]
        });
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <div className="top">
                    账目报表
                </div>
                <div id="myChart" style={{width: '50%', height: 400}}></div>
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