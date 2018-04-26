import _ from 'lodash';

export const ADDTOCARD='addtocard';
export const DELETETOCARD='deletecard';

const initialState={
    allProduct:[],
};

export default (state=initialState,action)=>{
    switch (action.type){
        case ADDTOCARD:
            const data = state.allProduct;
            data.push(action.payload);
            return {...state,allProduct:_.cloneDeep(data)};
        case DELETETOCARD:
            debugger;
            const delItem = state.allProduct;
            const index = _.findIndex(delItem, { 'id': action.payload});
            delItem.splice(index,1);
            return { ...state,allProduct:_.cloneDeep(delItem)};
        default:
            return state;
    }
}