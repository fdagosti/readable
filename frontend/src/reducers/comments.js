import {COMMENTS_FETCH_SUCCESS} from "../actions";
import {COMMENT_DELETE_SUCCESS} from "../actions";
import {COMMENTS_ADD_SUCCESS} from "../actions";
import {
    COMMENT_EDIT_SUCCESS, COMMENT_FORM_AUTHOR_UPDATE, COMMENT_FORM_BODY_UPDATE,
    COMMENT_FORM_POPUP_DISPLAY_UPDATE
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

const initialCommentForm = {
    createCommentsModalOpen: false,
    body: null,
    author: null,
    existingComment: null,
    parentId:null
}

export function commentForm(state = initialCommentForm, action){
    switch (action.type) {
        case COMMENTS_ADD_SUCCESS:
            return {...state,body:null,author:null, parentId: null}
        case COMMENT_FORM_BODY_UPDATE:
            const {body} = action
            return {...state,body}
        case COMMENT_FORM_AUTHOR_UPDATE:
            const {author} = action
            return {...state,author}
        case COMMENT_FORM_POPUP_DISPLAY_UPDATE:
            const {createCommentsModalOpen, existingComment, parentId} = action
            return {...state,createCommentsModalOpen, existingComment, parentId}

        default:
            return state

    }
}