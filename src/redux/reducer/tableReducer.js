import {TYPES} from "../type"

const tableState = {
    orders: [],
};

export const tableReducer = (state = tableState, action) => {
    switch (action.type) {
        case TYPES.ALL_ORDER:
            return {
                ...state,
                orders: action.payload.orders
            }
    
        default:
            return state
    }
}

