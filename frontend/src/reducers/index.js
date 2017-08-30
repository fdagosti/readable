
import {combineReducers} from "redux";
import {messageForm, comments, posts, detailPost} from "./comments";
import {categories} from "./categories";
import {messageSorting} from "./sorting";






export default combineReducers({
    comments: comments,
    posts: posts,
    detailPost: detailPost,
    categories: categories,
    messageSorting:messageSorting,
    messageForm: messageForm
})