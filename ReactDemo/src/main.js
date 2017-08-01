import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux'
import {Route, IndexRoute, hashHistory, Router} from 'react-router';
import thunk from 'redux-thunk';
import reducer from './reducers';
import AppleBasket from './components/AppleBasket.jsx';
import NotFound from './components/notFound.js';

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={AppleBasket}>
                <IndexRoute component={AppleBasket}/>
                <Route path="*" component={NotFound}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);