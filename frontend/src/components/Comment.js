import React, {Component} from "react"
import {Card, CardActions, CardHeader, CardText, FlatButton} from "material-ui";
import Vote from "./Vote";
import {connect} from "react-redux";
import {commentDelete, showPostCommentForm,} from "../actions/index";

class Comment extends Component{

    render (){
        const {comment, dispatch} = this.props

        return (
            <div>
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
                            onClick={()=>dispatch(showPostCommentForm(true, comment.parentId, comment))}
                        />
                        <FlatButton onClick={()=>dispatch(commentDelete(comment.id))} secondary={true} label="Delete"/>
                        <Vote data={comment} ></Vote>
                    </CardActions>
                </Card>

            </div>
        )
    }
}


export default connect()(Comment)