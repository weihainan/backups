import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import actions from '../../actions/appleAction.js';
import AppleItem from './AppleItem.jsx';
import '../../styles/AppleBasket.scss';

class AppleBusket extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let {actions} = this.props;
        actions.init();
    }

    componentWillUnmount() {

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
                let selector = apple.isEaten ? 'appleEaten' : 'appleNow';
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
            if (!apple.isEaten) {
                data.push(<AppleItem apple={apple} eatApple={this.props.actions.eatApple} key={apple.id}/>)
            }
        });

        if (!data.length) data.push(<div className="empty-tip" key="empty">苹果篮子空空如也.</div>);

        return data;
    }

    render() {

        let {appleBasket, actions} = this.props;
        let {apples, isPicking} = appleBasket;
        let status = this.calculateStatus();
        let {
            appleNow: {quantity:notEatenQuantity, weight:notEatenWeight},
            appleEaten: {quantity:EatenQuantity, weight:EatenWeight}
        } = status;

        return (
            <div>
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
                        { this.getAppleItem(apples) }
                    </div>

                    <div className="btn-div">
                        <button className={isPicking ? 'disabled' : ''} onClick={actions.pickApple}>
                            {!isPicking ? '摘苹果' : '正在摘取中...'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

AppleBusket.propTypes = {
    isPicking: React.PropTypes.bool.isRequired,
    apples: React.PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    appleBasket: state.appleBasket
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

let AppleBusketSmart = connect(mapStateToProps, mapDispatchToProps)(AppleBusket);

export default AppleBusketSmart;