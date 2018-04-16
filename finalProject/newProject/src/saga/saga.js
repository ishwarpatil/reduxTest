import {put, takeEvery,takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* login (action) {
    debugger;
    try{
        debugger;
        let result=yield axios.post('http://localhost:8010/api/login', action.payload);
        if(result.data.msg==="success"){
            localStorage.setItem('userEmail',action.payload.username);
        }
        yield put({type:"LOGIN",payload:result.data});
    }catch (e){
        yield put({type:"LOGIN_USER_FAILED",payload:e});
        console.log('Error',e);
    }
}

function* logout () {
    try{
        localStorage.clear();
        yield put({type:"LOGOUT"});
    }catch (e){
        yield put({type:"LOGIN_USER_FAILED",payload:e});
        console.log('Error',e);
    }
}

function* AddUser (action) {
    try{
        debugger;
        let result=yield axios.post('http://localhost:8010/api/addUser', action.payload);
        yield put({type:"ADDEMPLOYEE",payload:action.payload});
    }catch (e){
        yield put({type:"LOGIN_USER_FAILED",payload:e});
        console.log('Error',e);
    }
}

function* mySaga() {
    debugger;
    yield takeEvery("LOGINUSER",login);
    yield takeEvery("LOGOUTUSER",logout);
    yield takeEvery("SAGAADDUSER",AddUser);
}

export default mySaga;