import React, {Component} from "react"
import {Dialog, FlatButton, FloatingActionButton, TextField} from "material-ui";
import {ContentAdd} from "material-ui/svg-icons/index";
import {createComment} from "../utils/api";
import UUID from "uuid";

export default class CommentForm extends Component{

    state = {
        createCommentsModalOpen: false,
        body: null,
        author: null
    }

    addComment = () => this.setState({createCommentsModalOpen: true});

    handleClose = () => {
        this.setState({createCommentsModalOpen: false});
    }

    handleAddComment = () => {
        const {body, author} = this.state
        const {postId} = this.props
        console.log("we should create a comment with ", body, author, Date.now())
        const id = UUID.v4();
        createComment(id, Date.now(), body, author, postId).then(newComment => {
            this.props.onCreated(newComment)
            this.setState({createCommentsModalOpen: false});
        })
    }



    render() {

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleAddComment}
            />,
        ];


        return (
            <div>
                <FloatingActionButton onClick={this.addComment} style={{position: "fixed",bottom: "55px",right:"55px"}}>
                    <ContentAdd />
                </FloatingActionButton>
                <Dialog
                    title="Add a comment"
                    actions={actions}
                    modal={false}
                    open={this.state.createCommentsModalOpen}
                    onRequestClose={this.handleClose}
                >
                        <TextField
                            floatingLabelText="Author"
                            hintText="Who are you?"
                            onChange={e => this.setState({author: e.target.value})}
                        /><br />
                        <TextField
                            floatingLabelText="Comment Body"
                            hintText="enter your text here"
                            onChange={e => this.setState({body: e.target.value})}
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