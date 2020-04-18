import {createStore, combineReducers, applyMiddleware} from "redux";
import authReducer from "./authReducer";
import bidReducer from "./bidReducer";
import promiseMiddleware from "redux-promise-middleware"

const rootReducer = combineReducers({
   auth: authReducer,
   bid: bidReducer
})
export default createStore(rootReducer, applyMiddleware(promiseMiddleware));