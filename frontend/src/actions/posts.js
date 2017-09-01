import {COMMENT_VOTE_SUCCESS, commentsFetch} from "./index";
import {createPost, deletePost, editPost, getPost, getPosts, voteOnComment, voteOnPost} from "../utils/api";
import * as UUID from "uuid";

export const POST_VOTE_SUCCESS = "POST_VOTE_SUCCESS"
export const POST_ADD_SUCCESS = "POST_ADD_SUCCESS"
export const POST_DETAIL_SUCCESS = "POST_DETAIL_SUCCESS"
export const POST_DELETE_SUCCESS = "POST_DELETE_SUCCESS"
export const POST_EDIT_SUCCESS = "POST_EDIT_SUCCESS"
export const POSTS_FETCH_SUCCESS = "POSTS_FETCH_SUCCESS"


export function postsFetch(){
    return (dispatch) => {
        getPosts()
            .then((posts) => {dispatch(postsFetchSuccess(posts));return posts})
            .then((posts) => posts.forEach(post => dispatch(commentsFetch(post.id))))
    }
}

export function postsFetchSuccess(posts){
    return {
        type: POSTS_FETCH_SUCCESS,
        posts
    }
}

export function postAdd(title, body, author, category){
    return (dispatch) => {
        const id = UUID.v4();
        createPost(id, Date.now(), title, body, author, category)
            .then((comment) => dispatch(postAddSuccess(comment)))

    }
}

export function postAddSuccess(post){
    return {
        type: POST_ADD_SUCCESS,
        post
    }
}

export function postDelete(postId){
    return (dispatch) => {
        deletePost(postId)
            .then(() => dispatch(postDeleteSuccess(postId)))
    }
}


export function postDeleteSuccess(postId){
    return {
        type: POST_DELETE_SUCCESS,
        postId
    }
}

export function postDetail(postId){
    return (dispatch) => {
        getPost(postId)
            .then((post) => dispatch(postDetailSuccess(post)))
            .then(() => dispatch(commentsFetch(postId)))

    }
}
export function postDetailSuccess(post){
    return {
        type: POST_DETAIL_SUCCESS,
        post
    }

}


export function postEdit(postId, title, body, category){
    return (dispatch) => {
        editPost(postId, title, body, category)
            .then((post) => dispatch(postEditSuccess(post)))

    }
}

export function postEditSuccess(post){
    return {
        type: POST_EDIT_SUCCESS,
        post
    }
}

export function vote(message, upVote) {
    return (dispatch) => {
        const func = message.parentId?voteOnComment:voteOnPost
        func(message.id, upVote)
            .then((message) => dispatch(voteSuccess(message)))

    }
}

export function voteSuccess(message){
    return {
        type: message.parentId?COMMENT_VOTE_SUCCESS:POST_VOTE_SUCCESS,
        message
    }
}