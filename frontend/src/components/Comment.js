import React, {Component} from "react"
import {Card, CardActions, CardHeader, CardText, FlatButton} from "material-ui";
import Vote from "./Vote";
import {connect} from "react-redux";
import {commentDelete, showPostCommentForm,} from "../actions/index";

class Comment extends Component{

    render (){
        const {comment, editComment, deleteComment} = this.props

        return (
            <div style={{padding: "20px"}}>
                <Card>
                    <CardHeader
                        title={comment.author}
                        subtitle={new Date(comment.timestamp).toLocaleDateString()}
                    />
                    <CardText>
                        {comment.body}
                    </CardText>
                    <CardActions>
                        <FlatButton
                            primary={true} label="Edit"
                            onClick={()=>editComment(comment.parentId, comment)}
                        />
                        <FlatButton onClick={()=>deleteComment(comment.id)} secondary={true} label="Delete"/>
                        <Vote data={comment} ></Vote>
                    </CardActions>
                </Card>

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editComment: (parentId, comment) => dispatch(showPostCommentForm(true, parentId, comment)),
        deleteComment: (commentId) => dispatch(commentDelete(commentId))
    };
};

export default connect(null, mapDispatchToProps)(Comment)