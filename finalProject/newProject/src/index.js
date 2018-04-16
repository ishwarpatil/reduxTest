import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import allReducers from './reducer'
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import MuiThemeProvider  from 'material-ui/styles/MuiThemeProvider';

import createSagaMiddleware from 'redux-saga'
import mySaga from './saga/saga'
const sagaMiddleware = createSagaMiddleware();

const history = createHistory();
let store = createStore(allReducers, composeWithDevTools(), applyMiddleware(thunk, routerMiddleware(history),sagaMiddleware) );
sagaMiddleware.run(mySaga);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <MuiThemeProvider>
                <App/>
            </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>, document.getElementById('root'));
