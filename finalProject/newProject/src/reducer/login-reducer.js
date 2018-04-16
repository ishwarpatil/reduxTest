export const LOGIN='login';
export const LOGOUT='logout';
export const ADDUSER='adduser';
export const STATE='state';
export const CITY='city';
const initialState={
    user:localStorage.getItem('userEmail') || null,
    userData:[],
    state:[],
    city:[]
};

export default (state=initialState,action)=>{
    switch (action.type){
        case "LOGIN":
            debugger;
            return {...state,user:action.payload};
        case "LOGOUT":
            return {...state,user:action.payload};
        case ADDUSER:
            return {...state,userData:action.payload};
        case STATE:
            return {...state,state:action.payload};
        case CITY:
            return {...state,city:action.payload};
        default:
            return state;
    }
}