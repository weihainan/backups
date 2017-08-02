import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux'
import {Route, IndexRoute, hashHistory, Router} from 'react-router';
import thunk from 'redux-thunk';
import reducer from './reducers';
import App from './containers/App.jsx';
import AppleBasket from './components/AppleBasket.jsx';
import MyIntroduce from './components/Introduce.js';
import LoginSmart from './components/LoginSmart.jsx';


import './styles/app.scss';

let Page404 = () => (<div><h1>FIXME FIXME 404 404</h1></div>)
const store = createStore(reducer, applyMiddleware(thunk));

const requireLogin = ()=> {
    console.log("need login ...")
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path='login' component={LoginSmart}/>
            <Route onEnter={requireLogin}>
                <Route path="/" component={App}>
                    <IndexRoute component={MyIntroduce}/>
                    <Route path="myIntroduce" component={MyIntroduce}/>
                    <Route path="appleBasket" component={AppleBasket}/>
                </Route>
            </Route>
            <Route path='*' component={Page404} status={404}/>
        </Router>
    </Provider>,
    document.getElementById('app')
);