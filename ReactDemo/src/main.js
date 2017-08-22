import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux'
import {Route, IndexRoute, hashHistory, Router} from 'react-router';
import thunk from 'redux-thunk';
import reducer from './reducers';
import auth from './services/auth'
import App from './containers/App.jsx';
import AppleBasket from './components/apples/AppleBasket.jsx';
import ChargeTableSmart from './components/charge/ChargeTable.js';
import ChargeLableSmart from './components/charge/ChargeLable.js';
import MyIntroduce from './components/common/Introduce.js';
import LoginSmart from './components/LoginSmart.jsx';
import DevTools from './containers/devTools'
import * as browserUtils from './utils/browserUtils'

import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/sagas';

import './styles/app.scss';


import {initialState} from './constants/structure.default'
const initState = initialState

const sagaMiddleware = createSagaMiddleware();

const enhancer = compose(
    //你要使用的中间件，放在前面
    applyMiddleware(sagaMiddleware, thunk),
    //必须的！启用带有monitors（监视显示）的DevTools
    DevTools.instrument()
)

let Page404 = () => (<div><h1>FIXME FIXME 404 404</h1></div>)
const store = createStore(reducer, initState, enhancer);
sagaMiddleware.run(rootSaga);

const requireAuth = (nextState, replace) => {
    if (!auth()) {
        replace({pathname: '/login'})
    }
}

let child = <div>
    <Router history={hashHistory}>
        <Route path='login' component={LoginSmart}/>
        <Route onEnter={requireAuth}>
            <Route path="/" component={App}>
                <IndexRoute component={MyIntroduce}/>
                <Route path="myIntroduce" component={MyIntroduce}/>
                <Route path="appleBasket" component={AppleBasket}/>
                <Route path="chargeTable" component={ChargeTableSmart}/>
                <Route path="chargeLabels" component={ChargeLableSmart}/>
            </Route>
        </Route>
        <Route path='*' component={Page404} status={404}/>
    </Router>
    {!browserUtils.itIE(10) ? <DevTools /> : null}
</div>

ReactDOM.render(
    <Provider store={store}>
        {child}
    </Provider>,
    document.getElementById('app')
);