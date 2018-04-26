import {combineReducers} from 'redux';
import login from './login-reducer';
import {routerReducer} from 'react-router-redux';
import employee from './employee-reducer'
import product from './addtocard-reducer'
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    login,employee,product,routerReducer,
    form: formReducer,
});
