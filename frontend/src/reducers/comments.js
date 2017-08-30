import {COMMENTS_FETCH_SUCCESS} from "../actions";
import {COMMENT_DELETE_SUCCESS} from "../actions";
import {COMMENTS_ADD_SUCCESS} from "../actions";
import {
    COMMENT_EDIT_SUCCESS, COMMENT_FORM_AUTHOR_UPDATE, COMMENT_FORM_BODY_UPDATE,
    COMMENT_FORM_POPUP_DISPLAY_UPDATE, POST_ADD_SUCCESS, POST_DELETE_SUCCESS, POST_DETAIL_SUCCESS, POST_EDIT_SUCCESS,
    POST_FORM_CATEGORY_UPDATE,
    POST_FORM_TITLE_UPDATE,
    POSTS_FETCH_SUCCESS
} from "../actions/index";



export function comments (state = [], action) {
    switch (action.type) {
        case COMMENTS_FETCH_SUCCESS:
            return action.comments
        case COMMENT_DELETE_SUCCESS:
            const {commentId} = action
            return state.filter(comment=>comment.id !== commentId)
        case COMMENTS_ADD_SUCCESS:
            const {comment} = action
            return state.concat(comment)
        case COMMENT_EDIT_SUCCESS:
            const com = action.comment
            return state.map(c=>c.id === com.id?com:c)
        default :
            return state
    }
}

export function posts (state = [], action) {
    switch (action.type) {
        case POSTS_FETCH_SUCCESS:
            return action.posts.filter(post=>!post.deleted)
        case POST_ADD_SUCCESS:
            const {post} = action
            return state.concat(post)
        case POST_DELETE_SUCCESS:
            const {postId} = action
            return state.filter(post=>post.id !== postId)
        case POST_EDIT_SUCCESS:
            return state.map(p=>p.id === action.post.id?action.post:p)
        default :
            return state
    }
}

export function detailPost(state={}, action){
    switch (action.type){
        case POST_DETAIL_SUCCESS:
            return action.post
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