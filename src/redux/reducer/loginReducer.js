const loginState = {
  login: false,
  chooseSidebar: true,
};

export const loginReducer = (state = loginState, action) => {
  switch (action.type) {
    case 'SET_LOGIN':
      return {
        ...state,
        login: action.payload.data,
      };
    case 'CHOOSE_SIDEBAR':
      return {
        ...state,
        chooseSidebar: action.payload.sidebar,
      };

    default:
      return state;
  }
};
