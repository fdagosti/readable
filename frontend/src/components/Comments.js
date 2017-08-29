import React, {Component} from "react"
import PostSorter from "./PostsSorter";
import Comment from "./Comment";

export default class Comments extends Component{

    state = {
        commentOrderFunc: null
    }

    handleChange = commentOrderFunc => this.setState({commentOrderFunc})

    render(){

        const {comments, deleteHandler} = this.props
        const {commentOrderFunc} = this.state

        return (
            (<div>
                <h2>{comments.length} Comments:</h2>
                {comments.length >1 && <PostSorter handleChange={this.handleChange}></PostSorter>}
                {comments.sort(commentOrderFunc).map(comment => <Comment key={comment.id} comment={comment} deleteHandler={()=>deleteHandler(comment.id)}></Comment>)}
            </div>)
        )
    }
}