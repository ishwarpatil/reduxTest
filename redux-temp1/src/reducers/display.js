import _ from 'lodash';

export const DISPLAY='display';
export const DELETE='delete';
export const EDIT='edit';
const initialState={
    allData:[],
    getId:[],
    pages:[],
};

export default (state=initialState,action)=>{
    switch (action.type){
        case DISPLAY:
            const {allData} = state;
            debugger;
            return {
                ...state,
                allData:action.payload
            };
        case DELETE:
            debugger;
            const data = state.allData;
            const index = _.findIndex(data, { '_id': action.payload});
            data.splice(index,1);
            return { ...state,allData:_.cloneDeep(data)};
        case EDIT:
            debugger;
            const editdata = state.allData;
            const findid = action.payload;
            const indexfind = _.findIndex(editdata, { '_id': findid.id});
            editdata[indexfind] = findid;
            return { ...state,allData:_.cloneDeep(editdata)};
        case 'SORT':
            debugger;
            return { ...state,allData:_.cloneDeep(action.payload)};
        case 'PAGING':
            return { ...state,pages:_.cloneDeep(action.payload)};
        default:
            return state;
    }
}