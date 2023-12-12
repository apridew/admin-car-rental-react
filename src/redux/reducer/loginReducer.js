import { TYPES } from "../type";

const loginState = {
  login: false,
  chooseSidebar: true,
};

export const loginReducer = (state = loginState, action) => {
  switch (action.type) {
    case TYPES.SET_LOGIN:
      return {
        ...state,
        login: action.payload.data,
      };
    case TYPES.CHOOSE_SIDEBAR:
      return {
        ...state,
        chooseSidebar: action.payload.sidebar,
      };

    default:
      return state;
  }
};
