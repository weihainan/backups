import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchApples, pickApple, eatApple} from '../../actions/AppleAction.js';
import AppleItem from './AppleItem.jsx';
import '../../styles/AppleBasket.scss';

import {Message} from 'element-react';

class AppleBusket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isPicking: false
        };
    }

    componentDidMount() {
        this.props.fetchApples();
    }

    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.appleBasket.msg) {
            Message({
                message: nextProps.appleBasket.msg,
                type: 'warning',
                duration: 2000,
            });
        }
    }

    /**  计算当前已吃和未吃苹果的状态*/
    calculateStatus() {

        let status = {
            appleNow: {
                quantity: 0,
                weight: 0
            },
            appleEaten: {
                quantity: 0,
                weight: 0
            }
        };
        if (this.props.appleBasket.apples) {
            this.props.appleBasket.apples.forEach(apple => {
                let selector = apple.is_eaten ? 'appleEaten' : 'appleNow';
                status[selector].quantity++;
                status[selector].weight += apple.weight;
            });
        }
        return status;
    }

    /** 获取未吃苹果的组件数组*/
    getAppleItem(apples) {
        let data = [];
        apples.forEach(apple => {
            if (!apple.is_eaten) {
                data.push(<AppleItem apple={apple} eatApple={this.eatApple.bind(this)} key={apple.id}/>)
            }
        });

        if (!data.length) data.push(<div className="empty-tip" key="empty">苹果篮子空空如也.</div>);

        return data;
    }

    pickApple() {
        this.setState({
            isPicking: true
        });
        this.props.pickApple();
        this.setState({
            isPicking: false
        });
    }

    eatApple(id) {
        this.props.eatApple(id);
    }

    render() {
        let apples = this.props.appleBasket.apples;
        let status = this.calculateStatus();
        let {
            appleNow: {quantity: notEatenQuantity, weight: notEatenWeight},
            appleEaten: {quantity: EatenQuantity, weight: EatenWeight}
        } = status;

        return (
            <div>

                <div className="top">
                    摘苹果
                </div>

                <div className="appleBusket">

                    <div className="title">苹果篮子</div>

                    <div className="stats">
                        <div className="section">
                            <div className="head">当前</div>
                            <div className="content">
                                {notEatenQuantity}个苹果，{notEatenWeight}克
                            </div>
                        </div>
                        <div className="section">
                            <div className="head">已吃掉</div>
                            <div className="content">
                                {EatenQuantity}个苹果，{EatenWeight}克
                            </div>
                        </div>
                    </div>

                    <div className="appleList">
                        {this.getAppleItem(apples)}
                    </div>

                    <div className="btn-div">
                        <button className={this.state.isPicking ? 'disabled' : ''} onClick={this.pickApple.bind(this)}>
                            {!this.state.isPicking ? '摘苹果' : '正在摘取中...'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

AppleBusket.propTypes = {
    apples: React.PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    appleBasket: state.appleBasketState
});

const mapDispatchToProps = dispatch => ({
    fetchApples: bindActionCreators(fetchApples, dispatch),
    pickApple: bindActionCreators(pickApple, dispatch),
    eatApple: bindActionCreators(eatApple, dispatch),
});

let AppleBusketSmart = connect(mapStateToProps, mapDispatchToProps)(AppleBusket);

export default AppleBusketSmart;
