import {combineReducers} from "redux";
import {user} from "./user";
import {userList} from "./userList";
import {chat} from "./chat";

export default combineReducers({user, userList, chat});