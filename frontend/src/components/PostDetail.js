import React, {Component} from "react"
import Comments from "./Comments";
import Vote from "./Vote";
import {connect} from "react-redux";
import {showPostCommentForm} from "../actions/index";
import {FloatingActionButton, Paper, RaisedButton} from "material-ui";
import {ContentAdd} from "material-ui/svg-icons/index";
import {withRouter} from "react-router-dom";
import {postDetail} from "../actions/posts";


const Button = withRouter(({history})=>(
    <RaisedButton onClick={() => history.goBack()} label="Back to All posts" secondary={true} style={{margin:12}} />
))

class PostDetail extends Component{

    componentDidMount(){
        const postId = this.props.match.params.id;

        this.props.fetchPost(postId)
    }

    render(){

        const {post, comments, showPopup} = this.props

        return  (
            <div>
                {post && <div>
                    <Button/>
                    {post.id?
                        <div>
                            <Paper style={{padding:22}} zDepth={3} >
                                <h1>{post.title}</h1>
                                <h3>By {post.author}</h3>
                                <h4>Post created on {new Date(post.timestamp).toLocaleDateString()}</h4>
                                <h5>Votes: <Vote data={post}></Vote></h5>
                                <p>{post.body}</p>
                            </Paper>

                            {comments && <Comments comments={comments} ></Comments>}

                            <FloatingActionButton onClick={()=>showPopup(post.id)} style={{position: "fixed",bottom: "55px",right:"55px"}}>
                                <ContentAdd />
                            </FloatingActionButton>
                        </div>
                        :<h1 style={{textAlign: "center"}}>Not Found - 404 <br/> Sorry, there is no such post at the requested URL</h1>}
                </div>}
            </div>)
    }
}

const mapStateToProps = ({detailPost, comments}) => {
    return {
        comments: detailPost && Object.keys(comments)
            .filter(commentId=> comments[commentId].parentId === detailPost.id)
            .map(commentId => comments[commentId]),
        post: detailPost
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPost: (postId) => dispatch(postDetail(postId)),
        showPopup: (postId) => dispatch(showPostCommentForm(true, postId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)