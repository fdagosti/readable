import React, {Component} from "react"
import {Avatar, IconButton, IconMenu, List, ListItem, MenuItem, Paper, RaisedButton, Subheader} from "material-ui";
import {ActionViewHeadline} from "material-ui/svg-icons/index";
import {Link} from "react-router-dom";
import PostSorter from "./PostsSorter";
import Vote from "./Vote";
import {connect} from "react-redux";
import {showPostCommentForm} from "../actions/index";
import {grey400} from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {postDelete} from "../actions/posts";

const iconButtonElement = (
    <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
    >
        <MoreVertIcon color={grey400} />
    </IconButton>
);

const rightIconMenu = (dispatch, post) =>(
    <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onClick={()=>dispatch(showPostCommentForm(true, null, post))}>Edit</MenuItem>
        <MenuItem onClick={()=>dispatch(postDelete(post.id))}>Delete</MenuItem>
    </IconMenu>
);

class Posts extends Component{

    render(){
        const {posts, dispatch, orderFunc, commentsNumber} = this.props
        return <div>
            {posts && posts.length>1 && <PostSorter ></PostSorter>}
            <RaisedButton onClick={() => dispatch(showPostCommentForm(true, null, null))} label="Add Post" primary={true} style={{margin:12}} />

            <div>
                {posts && posts.length?
                    <Paper>
                        <List>
                            <Subheader>Posts</Subheader>
                            {posts.sort(orderFunc).map(post => (
                                <div key={post.id}>
                                    <ListItem
                                        containerElement={<Link to={`/${post.category}/${post.id}`}/>}
                                        leftAvatar={<Avatar icon={<ActionViewHeadline />} />}
                                        primaryText={post.title}
                                        rightIconButton={rightIconMenu(dispatch, post)}
                                        secondaryTextLines={2}
                                        secondaryText={
                                            <div>
                                                <div>Created on {new Date(post.timestamp).toLocaleDateString()} by <b>{post.author}</b></div>
                                                <div>comments: {commentsNumber[post.id]|| 0} &nbsp;&nbsp;&nbsp;Votes: <Vote data={post}></Vote></div>
                                            </div>
                                        }
                                    />
                                </div>))}
                        </List>
                    </Paper> :
                    <div>No Posts To Show</div>}
            </div>
        </div>
    }
}

const mapStateToProps = ({messageSorting, comments}) => {

    return {
        orderFunc: messageSorting.orderFunction,
        commentsNumber: Object.keys(comments).reduce((commentsByPosts, commentId)=>{
            if (commentsByPosts[comments[commentId].parentId] ) commentsByPosts[comments[commentId].parentId]++
            else commentsByPosts[comments[commentId].parentId]=1
            return commentsByPosts
        },{})
    };
};


export default connect(mapStateToProps)(Posts)