import {COMMENTS_FETCH_SUCCESS} from "../actions";
import {COMMENT_DELETE_SUCCESS} from "../actions";
import {COMMENTS_ADD_SUCCESS} from "../actions";
import {
    COMMENT_EDIT_SUCCESS, COMMENT_FORM_AUTHOR_UPDATE, COMMENT_FORM_BODY_UPDATE,
    COMMENT_FORM_POPUP_DISPLAY_UPDATE, COMMENT_VOTE_SUCCESS, POST_ADD_SUCCESS, POST_DELETE_SUCCESS, POST_DETAIL_SUCCESS,
    POST_EDIT_SUCCESS,
    POST_FORM_CATEGORY_UPDATE,
    POST_FORM_TITLE_UPDATE, POST_VOTE_SUCCESS,
    POSTS_FETCH_SUCCESS
} from "../actions/index";



export function comments (state = {}, action) {
    switch (action.type) {
        case COMMENTS_FETCH_SUCCESS:
            const {comments} = action
            return comments.reduce(((acc, comment) => {acc[comment.id] = comment;return acc}),{...state})
        case COMMENT_DELETE_SUCCESS:
            const {commentId} = action
            const result = {...state}
            delete result[commentId]
            return result
        case COMMENTS_ADD_SUCCESS:
        case COMMENT_EDIT_SUCCESS:
        case COMMENT_VOTE_SUCCESS:
            const com = action.comment || action.message
            return {...state, [com.id]:com}
        default :
            return state
    }
}

export function posts (state = [], action) {
    switch (action.type) {
        case POSTS_FETCH_SUCCESS:
            return action.posts.filter(post=>!post.deleted)
        case POST_ADD_SUCCESS:
            return state.concat(action.post)
        case POST_DELETE_SUCCESS:
            const {postId} = action
            return state.filter(post=>post.id !== postId)
        case POST_EDIT_SUCCESS:
        case POST_VOTE_SUCCESS:
            const post = action.post || action.message
            return state.map(p=>p.id === post.id?post:p)
        default :
            return state
    }
}

export function detailPost(state={}, action){
    switch (action.type){
        case POST_DETAIL_SUCCESS:
        case POST_VOTE_SUCCESS:
            return action.post || action.message
        default:
            return state
    }
}

const initialMessageForm = {
    createCommentsModalOpen: false,
    body: null,
    author: null,
    title: null,
    category: null,
    existingComment: null,
    parentId:null
}

export function messageForm(state = initialMessageForm, action){
    switch (action.type) {
        case COMMENTS_ADD_SUCCESS:
            return {...state,body:null,title: null, author:null, parentId: null}
        case COMMENT_FORM_BODY_UPDATE:
            const {body} = action
            return {...state,body}
        case COMMENT_FORM_AUTHOR_UPDATE:
            const {author} = action
            return {...state,author}
        case COMMENT_FORM_POPUP_DISPLAY_UPDATE:
            const {createCommentsModalOpen, existingComment, parentId} = action
            return {
                ...state,
                createCommentsModalOpen,
                existingComment,
                parentId,
                body: existingComment && existingComment.body,
                title: existingComment && existingComment.title,
                category: existingComment && existingComment.category
            }
        case POST_FORM_TITLE_UPDATE:
            const {title} = action
            return {...state,title}
            case POST_FORM_CATEGORY_UPDATE:
            const {category} = action
            return {...state,category}
        default:
            return state

    }
}