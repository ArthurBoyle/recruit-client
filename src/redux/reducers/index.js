import {combineReducers} from "redux";
import {user} from "./user";
import {userList} from "./userList";

export default combineReducers({user, userList});