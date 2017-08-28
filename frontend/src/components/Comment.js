import React, {Component} from "react"
import {Card, CardActions, CardHeader, CardText, FlatButton} from "material-ui";

export default class Comment extends Component{

    render (){
        const {comment, deleteHandler} = this.props
        return (
            <Card>
                <CardHeader
                    title={comment.author}
                    subtitle={new Date(comment.timestamp).toLocaleDateString()}
                />
                <CardText>
                    {comment.body}
                </CardText>
                <CardActions>
                    <FlatButton primary={true} label="Edit"/>
                    <FlatButton onClick={deleteHandler} secondary={true} label="Delete"/>
                </CardActions>
            </Card>
        )
    }
}