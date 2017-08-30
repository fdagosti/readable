
import {combineReducers} from "redux";
import {messageForm, comments, posts, detailPost} from "./comments";
import {categories} from "./categories";






export default combineReducers({
    comments: comments,
    posts: posts,
    detailPost: detailPost,
    categories: categories,
    commentForm: messageForm
})