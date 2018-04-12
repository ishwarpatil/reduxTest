export const LOGIN='login';
export const LOGOUT='logout';
export const ADDUSER='adduser';
const initialState={
    user:localStorage.getItem('userEmail') || null,
    userData:[]
};

export default (state=initialState,action)=>{
    switch (action.type){
        case LOGIN:
            debugger;
            return {...state,user:action.payload};
        case LOGOUT:
            return {...state,user:action.payload};
        case ADDUSER:
            return {...state,userData:action.payload};
        default:
            return state;
    }
}