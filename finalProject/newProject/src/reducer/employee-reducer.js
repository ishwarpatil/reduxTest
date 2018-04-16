import _ from 'lodash';
export const ADDEMPLOYEE='addemployee';
export const GETEMPLOYEE='getemployee';
export const DELETEEMPLOYEE='deleteemployee';
export const EDITEMPLOYEE='editemployee';

const initialState={
    Employee:[]
};

export default (state=initialState,action)=>{
    switch (action.type){
        case "ADDEMPLOYEE":
            const data = state.Employee;
            data.push(action.payload);
            return {...state,Employee:_.cloneDeep(data)};
        case GETEMPLOYEE:
            return {...state,Employee:_.cloneDeep(action.payload)};
        case DELETEEMPLOYEE:
            const delEmp = state.Employee;
            const index = _.findIndex(delEmp, { 'id': action.payload});
            delEmp.splice(index,1);
            return { ...state,Employee:_.cloneDeep(delEmp)};
        case EDITEMPLOYEE:
            debugger;
            const updateEmp = state.Employee;
            const findid = action.payload.id;
            const indexfind = _.findIndex(updateEmp, {'id': findid});
            updateEmp[indexfind] = action.payload.employeeData;
            return { ...state,Employee:_.cloneDeep(updateEmp)};
        default:
            return state;
    }
}