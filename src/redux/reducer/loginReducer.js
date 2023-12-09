const loginState = {
    login: false
}

export const loginReducer = ((state = loginState, action) => {
    switch (action.type) {
        case "SET_LOGIN":
            return {
                ...state,
                login: action.payload.data
            }

        default:
            return state
    }
})