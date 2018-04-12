import {LOGIN, LOGOUT,ADDUSER} from './../reducer/login-reducer';
import axios from 'axios';

export const loginUser = (info) => {
    debugger;
    return (dispatch) => {
        axios.post('http://localhost:8010/api/login', info).then((result) => {
            if(result.data.msg==="success"){
                localStorage.setItem('userEmail',info.email);
            }
            dispatch({
                type: LOGIN,
                payload: result.data
            })
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const logoutUser = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch({
            type: LOGOUT,
            });
    }
};

export const addUser = (info) => {
    debugger;
    return (dispatch) => {
        axios.post('http://localhost:8010/api/addUser', info).then((result) => {
            dispatch({
                type: ADDUSER,
                payload: info
            })
        }).catch((err) => {
            console.log(err);
        });
    }
};