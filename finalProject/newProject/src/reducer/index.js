import {combineReducers} from 'redux';
import login from './login-reducer';
import {routerReducer} from 'react-router-redux';

export default combineReducers({login,routerReducer});
