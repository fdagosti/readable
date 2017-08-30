import React, {Component} from "react"
import {Dialog, FlatButton, TextField} from "material-ui";
import {connect} from "react-redux";
import {
    commentAdd,
    commentEdit,
    commentFormAuthorUpdate,
    commentFormBodyUpdate,
    showCommentForm,
} from "../actions/index";

class CommentForm extends Component{


    handleAddComment = () => {
        const {parentId, addComment,editComment, body, author, closePopup, commentToRender} = this.props
        if (commentToRender){
            editComment(body, commentToRender.id)
        }else{
            addComment(body, author, parentId)
        }
        closePopup()
    }

    render() {

        let {updateBody, updateAuthor, closePopup, createCommentsModalOpen, commentToRender, body, author} = this.props

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={closePopup}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleAddComment}
            />,
        ];

        if (!body && commentToRender){
            body = commentToRender.body
        }
        if (!author && commentToRender){
            author = commentToRender.author
        }

        return (
            <div>

                <Dialog
                    title="Add a comment"
                    actions={actions}
                    modal={false}
                    open={createCommentsModalOpen}
                    onRequestClose={closePopup}
                >

                        <TextField
                            value={author||""}
                            floatingLabelText="Author"
                            hintText="Who are you?"
                            onChange={e => updateAuthor(e.target.value)}
                            disabled={commentToRender!=null}
                        /><br />
                        <TextField
                            value={body||""}
                            floatingLabelText="Comment Body"
                            hintText="enter your text here"
                            onChange={e => updateBody(e.target.value)}
                            multiLine={true}
                            rows={3}
                            rowsMax={6}
                            fullWidth={true}
                        />
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        body: state.commentForm.body,
        author: state.commentForm.author,
        createCommentsModalOpen: state.commentForm.createCommentsModalOpen,
        commentToRender: state.commentForm.existingComment,
        parentId: state.commentForm.parentId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        closePopup: () => dispatch(showCommentForm(false)),
        updateBody: (bodyText) => dispatch(commentFormBodyUpdate(bodyText)),
        updateAuthor: (authorText) => dispatch(commentFormAuthorUpdate(authorText)),
        editComment: (body, commentId) => dispatch(commentEdit(commentId, body)),
        addComment: (body, author, postId) => dispatch(commentAdd(body, author, postId))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(CommentForm)