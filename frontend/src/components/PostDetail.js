import React, {Component} from "react"
import Comments from "./Comments";
import Vote from "./Vote";
import {connect} from "react-redux";
import {commentsFetch, postDetail, showCommentForm} from "../actions/index";
import {FloatingActionButton} from "material-ui";
import {ContentAdd} from "material-ui/svg-icons/index";

class PostDetail extends Component{

    componentDidMount(){
        const postId = this.props.match.params.id;

        this.props.fetchPost(postId)
        this.props.fetchComments(postId)
    }

    render(){

        const {post, comments, showPopup} = this.props

        return post && (
            <div>
                <h1>{post.title}</h1>
                <h3>By {post.author}</h3>
                <h4>Post created on {new Date(post.timestamp).toLocaleDateString()}</h4>
                <h5>Votes: <Vote data={post}></Vote></h5>
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
        post: state.detailPost
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPost: (postId) => dispatch(postDetail(postId)),
        fetchComments: (postId) => dispatch(commentsFetch(postId)),
        showPopup: (postId) => dispatch(showCommentForm(true, postId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)