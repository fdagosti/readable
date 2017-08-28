import React, {Component} from "react"
import {deleteComment, getComments, getPost} from "../utils/api";
import Comments from "./Comments";

export default class PostDetail extends Component{

    state = {
        post: null,
        comments: null,
    }

    componentDidMount(){
        const postId = this.props.match.params.id;
        getPost(postId)
            .then(post => this.setState({post}))
            .then(() => getComments(postId))
            .then(comments => this.setState(state => ({...state, comments})))

    }

    commentDeleteHandler = (commentId) => deleteComment(commentId)
        .then((res)=> this.setState(state => ({...state, comments: state.comments.filter(c=>c.id !== commentId)})))

    render(){

        const {post, comments} = this.state;

        return post && (
            <div>
                <h1>{post.title}</h1>
                <h3>By {post.author}</h3>
                <h4>Post created on {new Date(post.timestamp).toLocaleDateString()}</h4>
                <h5>Votes: {post.voteScore}</h5>
                <p>{post.body}</p>
                {comments && <Comments comments={comments} deleteHandler={this.commentDeleteHandler}></Comments>}
            </div>)
    }
}