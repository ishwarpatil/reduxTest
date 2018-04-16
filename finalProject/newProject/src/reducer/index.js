import {combineReducers} from 'redux';
import login from './login-reducer';
import {routerReducer} from 'react-router-redux';
import employee from './employee-reducer'

export default combineReducers({login,employee,routerReducer});
