import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import {carsReducer} from "./carsReducer"
import {tableReducer} from "./tableReducer"

export const rootReducer = combineReducers({loginReducer, carsReducer, tableReducer})