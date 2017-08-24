import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {statistics} from "../../actions/ChargeAction"


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

    componentDidMount() {

        this.props.statisticsAction();

        let xAxis = [];
        let series = [];

        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'));
        // 绘制图表
        myChart.setOption({
            title: {text: 'ECharts 入门示例'},
            tooltip: {},
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {

    }


    render() {
        return (
            <div>
                <div className="top">
                    账目报表
                </div>
                <div id="myChart" style={{width: '100%', height: 400}}></div>
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