
import {combineReducers} from "redux";
import {commentForm, comments} from "./comments";






export default combineReducers({
    comments,
    commentForm
})