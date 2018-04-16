import {LOGIN, LOGOUT,ADDUSER,STATE,CITY} from './../reducer/login-reducer';
import {ADDEMPLOYEE,GETEMPLOYEE,DELETEEMPLOYEE,EDITEMPLOYEE} from "../reducer/employee-reducer";
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

export const State = () => {
    debugger;
    return (dispatch) => {
        axios.get('http://localhost:8010/api/state').then((result) => {
            dispatch({
                type: STATE,
                payload: result.data
            })
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const City = (id) => {
    debugger;
    return (dispatch) => {
        axios.get(`http://localhost:8010/api/city/${id}`).then((result) => {
            dispatch({
                type: CITY,
                payload: result.data
            })
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const addEmployee = (employeeData) => {
    debugger;
    return (dispatch) => {
        axios.post('http://localhost:8010/api/employee',employeeData).then((result) => {
            dispatch({
                type: ADDEMPLOYEE,
                payload: employeeData
            })
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const getEmployee = () => {
    debugger;
    return (dispatch) => {
        axios.get('http://localhost:8010/api/employee').then((result) => {
            dispatch({
                type: GETEMPLOYEE,
                payload: result.data
            })
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const deleteEmployee = (id) => {
    debugger;
    return (dispatch) => {
        axios.delete(`http://localhost:8010/api/employee/${id}`).then((result) => {
            dispatch({
                type: DELETEEMPLOYEE,
                payload: id
            })
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const editEmployee = (id,employeeData) => {
    debugger;
    return (dispatch) => {
        axios.put(`http://localhost:8010/api/employee/${id}`,employeeData).then((result) => {
            console.log(result);
            dispatch({
                type: EDITEMPLOYEE,
                payload: {id:id,employeeData:employeeData}
            })
        }).catch((err) => {
            console.log(err);
        });
    }
};