import {createComment, deleteComment, editComment, getComments} from "../utils/api";
import * as UUID from "uuid";

export const CHANGE_VOTE_COMMENT = "ADD_COMMENT"
export const COMMENTS_FETCH_SUCCESS = "COMMENTS_FETCH_SUCCESS"
export const COMMENTS_ADD_SUCCESS = "COMMENTS_ADD_SUCCESS"
export const COMMENT_DELETE_SUCCESS = "COMMENT_DELETE_SUCCESS"
export const COMMENT_EDIT_SUCCESS = "COMMENT_EDIT_SUCCESS"

export const COMMENT_FORM_BODY_UPDATE = "COMMENT_FORM_BODY_UPDATE"
export const COMMENT_FORM_AUTHOR_UPDATE = "COMMENT_FORM_AUTHOR_UPDATE"
export const COMMENT_FORM_POPUP_DISPLAY_UPDATE = "COMMENT_FORM_POPUP_DISPLAY_UPDATE"


export function commentsFetchSuccess(comments){
    return {
        type: COMMENTS_FETCH_SUCCESS,
        comments
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


export function showCommentForm(displayed, parentId, comment){
    return {
        type: COMMENT_FORM_POPUP_DISPLAY_UPDATE,
        createCommentsModalOpen:displayed,
        existingComment: comment,
        parentId
    }
}


export function commentsFetch(postId){
    return (dispatch) => {
        getComments(postId)
            .then((comments) => dispatch(commentsFetchSuccess(comments)))
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





export function changeCommentVote({comment, newVoteValue}) {
    return {
        type: CHANGE_VOTE_COMMENT,
        comment,
        newVoteValue
    }
}
