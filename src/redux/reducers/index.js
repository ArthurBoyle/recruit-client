import {combineReducers} from "redux";

function xxx(state=0, action) {
    return state + 1
}
function yyy(state=0, action) {
    return state
}
export default combineReducers({xxx, yyy})