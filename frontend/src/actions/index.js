import {
    createComment, createPost, deleteComment, deletePost, editComment, editPost, getCategories, getComments, getPost,
    getPosts, voteOnComment, voteOnPost
} from "../utils/api";
import * as UUID from "uuid";

export const CATEGORIES_FETCH_SUCCESS = "CATEGORIES_FETCH_SUCCESS"

export const COMMENT_VOTE_SUCCESS = "COMMENT_VOTE_SUCCESS"
export const COMMENTS_FETCH_SUCCESS = "COMMENTS_FETCH_SUCCESS"
export const COMMENTS_ADD_SUCCESS = "COMMENTS_ADD_SUCCESS"
export const COMMENT_DELETE_SUCCESS = "COMMENT_DELETE_SUCCESS"
export const COMMENT_EDIT_SUCCESS = "COMMENT_EDIT_SUCCESS"

export const POST_VOTE_SUCCESS = "POST_VOTE_SUCCESS"
export const POST_ADD_SUCCESS = "POST_ADD_SUCCESS"
export const POST_DETAIL_SUCCESS = "POST_DETAIL_SUCCESS"
export const POST_DELETE_SUCCESS = "POST_DELETE_SUCCESS"
export const POST_EDIT_SUCCESS = "POST_EDIT_SUCCESS"
export const POSTS_FETCH_SUCCESS = "POSTS_FETCH_SUCCESS"
export const CATEGORY_POSTS_FETCH_SUCCESS = "CATEGORY_POSTS_FETCH_SUCCESS"

export const COMMENT_FORM_BODY_UPDATE = "COMMENT_FORM_BODY_UPDATE"
export const POST_FORM_TITLE_UPDATE = "POST_FORM_TITLE_UPDATE"
export const POST_FORM_CATEGORY_UPDATE = "POST_FORM_CATEGORY_UPDATE"
export const COMMENT_FORM_AUTHOR_UPDATE = "COMMENT_FORM_AUTHOR_UPDATE"
export const COMMENT_FORM_POPUP_DISPLAY_UPDATE = "COMMENT_FORM_POPUP_DISPLAY_UPDATE"

export const UPDATE_MESSAGE_SORTING = "UPDATE_MESSAGE_SORTING"
export const DATE_BASED_SORTING = "DATE_BASED_SORTING"
export const VOTE_BASED_SORTING = "VOTE_BASED_SORTING"

export function updateMessageSorting(value){
    return {
        type: UPDATE_MESSAGE_SORTING,
        value
    }
}

export function fetchCategories(){
    return (dispatch) => {
        getCategories()
            .then((categories) => dispatch(categoriesFetchSuccess(categories)))
    }
}

export function categoriesFetchSuccess(categories){
    return {
        type: CATEGORIES_FETCH_SUCCESS,
        categories
    }
}

export function commentsFetchSuccess(comments, postId){
    return {
        type: COMMENTS_FETCH_SUCCESS,
        comments,
        postId
    }
}

export function commentDeleteSuccess(commentId){
    return {
        type: COMMENT_DELETE_SUCCESS,
        commentId
    }
}

export function commentAddSuccess(comment){
    return {
        type: COMMENTS_ADD_SUCCESS,
        comment
    }
}

export function postAddSuccess(post){
    return {
        type: POST_ADD_SUCCESS,
        post
    }
}




export function commentEditSuccess(comment){
    return {
        type: COMMENT_EDIT_SUCCESS,
        comment
    }
}

export function commentFormBodyUpdate(body){
    return {
        type: COMMENT_FORM_BODY_UPDATE,
        body
    }
}


export function commentFormAuthorUpdate(author){
    return {
        type: COMMENT_FORM_AUTHOR_UPDATE,
        author
    }
}

export function postFormTitleUpdate(title){
    return {
        type: POST_FORM_TITLE_UPDATE,
        title
    }
}

export function postFormCategoryUpdate(category){
    return {
        type: POST_FORM_CATEGORY_UPDATE,
        category
    }
}


export function showCommentForm(displayed, parentId, comment){
    return {
        type: COMMENT_FORM_POPUP_DISPLAY_UPDATE,
        createCommentsModalOpen:displayed,
        existingComment: comment,
        parentId
    }
}

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

export function postsFetchByCategory(category){
    return (dispatch) => {
        getPosts(category)
            .then((posts) => dispatch(categoryPostsFetchSuccess(posts, category)))
    }
}

export function categoryPostsFetchSuccess(posts, category){
    return {
        type: CATEGORY_POSTS_FETCH_SUCCESS,
        posts,
        category
    }
}


export function postAdd(title, body, author, category){
    return (dispatch) => {
        const id = UUID.v4();
        createPost(id, Date.now(), title, body, author, category)
            .then((comment) => dispatch(postAddSuccess(comment)))

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



export function commentsFetch(postId){
    return (dispatch) => {
        getComments(postId)
            .then((comments) => dispatch(commentsFetchSuccess(comments, postId)))
    }
}

export function commentDelete(commentId){
    return (dispatch) => {
        deleteComment(commentId)
            .then(() => dispatch(commentDeleteSuccess(commentId)))
    }
}

export function commentAdd(body, author, postId){
    return (dispatch) => {
        const id = UUID.v4();
        createComment(id, Date.now(), body, author, postId)
            .then((comment) => dispatch(commentAddSuccess(comment)))

    }
}


export function commentEdit(commentId, body){
    return (dispatch) => {
        editComment(commentId, Date.now(), body)
            .then((comment) => dispatch(commentEditSuccess(comment)))

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
