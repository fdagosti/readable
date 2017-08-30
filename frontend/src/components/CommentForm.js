import React, {Component} from "react"
import {Dialog, FlatButton, MenuItem, SelectField, TextField} from "material-ui";
import {connect} from "react-redux";
import {
    commentAdd,
    commentEdit,
    commentFormAuthorUpdate,
    commentFormBodyUpdate,
    fetchCategories,
    postAdd,
    postEdit,
    postFormCategoryUpdate,
    postFormTitleUpdate,
    showCommentForm,
} from "../actions/index";

class CommentForm extends Component{

    componentDidMount(){
        this.props.fetchCategories()
    }


    handleAddComment = () => {

        const {parentId, addComment,addPost,editPost, editComment, body, author, closePopup, commentToRender, title, category} = this.props
        if (parentId){
            if (commentToRender){
                editComment(body, commentToRender.id)
            }else{
                addComment(body, author, parentId)
            }
        }else{
            if (commentToRender){
                editPost(commentToRender.id, title, body, category)
            }else{
                addPost(title, body, author, category)
            }
        }
        closePopup()
    }

    render() {

        let {categories, updateBody, updateAuthor, updateTitle, updateCategory, closePopup, createCommentsModalOpen, commentToRender, body, author, title, category} = this.props

        const isPostForm = !this.props.parentId

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

        if (!title && commentToRender){
            title = commentToRender.title
        }

        if (!category && commentToRender){
            category = commentToRender.category
        }

        return (
            <div>

                <Dialog
                    title={`Add a ${isPostForm?'Post':'Comment'}`}
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
                    {isPostForm && <div>
                        <TextField
                            value={title||""}
                            floatingLabelText="Title"
                            hintText="What is your title?"
                            onChange={e => updateTitle(e.target.value)}
                            disabled={commentToRender!=null}
                        />
                        <br/>
                        <SelectField
                            floatingLabelText="category"
                            value={category}
                            onChange={(e,idx,v) => updateCategory(v)}
                        >
                            {categories && categories.map(cat=><MenuItem key={cat.path} value={cat.path} primaryText={cat.name} />)}
                        </SelectField>
                        <br /></div>}
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
        categories: state.categories.categories,
        body: state.commentForm.body,
        author: state.commentForm.author,
        title: state.commentForm.title,
        category: state.commentForm.category,
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
        updateTitle: (titleText) => dispatch(postFormTitleUpdate(titleText)),
        updateCategory: (category) => dispatch(postFormCategoryUpdate(category)),
        editComment: (body, commentId) => dispatch(commentEdit(commentId, body)),
        editPost: (postId, title, body, category) => dispatch(postEdit(postId, title, body, category)),
        addComment: (body, author, postId) => dispatch(commentAdd(body, author, postId)),
        addPost: (title, body, author, category) => dispatch(postAdd(title, body, author, category)),
        fetchCategories: () => dispatch(fetchCategories())
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(CommentForm)