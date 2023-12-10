import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import {carsReducer} from "./carsReducer"

export const rootReducer = combineReducers({loginReducer, carsReducer})