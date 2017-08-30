import React, {Component} from "react"
import {getPost} from "../utils/api";
import Comments from "./Comments";
import Vote from "./Vote";
import {connect} from "react-redux";
import {commentsFetch, showCommentForm} from "../actions/index";
import {FloatingActionButton} from "material-ui";
import {ContentAdd} from "material-ui/svg-icons/index";

class PostDetail extends Component{

    state = {
        post: null,
    }

    componentDidMount(){
        const postId = this.props.match.params.id;
        getPost(postId)
            .then(post => this.setState({post}))
            .then(() => this.props.fetchComments(postId))
    }

    render(){

        const {post} = this.state;
        const {comments, showPopup} = this.props

        return post && (
            <div>
                <h1>{post.title}</h1>
                <h3>By {post.author}</h3>
                <h4>Post created on {new Date(post.timestamp).toLocaleDateString()}</h4>
                <h5>Votes: <Vote score={post.voteScore}></Vote></h5>
                <p>{post.body}</p>
                {comments && <Comments comments={comments} ></Comments>}

                <FloatingActionButton onClick={()=>showPopup(post.id)} style={{position: "fixed",bottom: "55px",right:"55px"}}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchComments: (postId) => dispatch(commentsFetch(postId)),
        showPopup: (postId) => dispatch(showCommentForm(true, postId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)