import React, {Component} from "react"
import {Avatar, IconButton, IconMenu, List, ListItem, MenuItem, Paper, RaisedButton, Subheader} from "material-ui";
import {ActionViewHeadline} from "material-ui/svg-icons/index";
import {Link} from "react-router-dom";
import PostSorter from "./PostsSorter";
import Vote from "./Vote";
import {connect} from "react-redux";
import {postDelete, showCommentForm} from "../actions/index";
import {grey400} from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

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
        <MenuItem onClick={()=>dispatch(showCommentForm(true, null, post))}>Edit</MenuItem>
        <MenuItem onClick={()=>dispatch(postDelete(post.id))}>Delete</MenuItem>
    </IconMenu>
);

class Posts extends Component{

    state = {
        orderFunc : null
    }

    handleChange = (orderFunc) => this.setState({orderFunc})

    render(){

        const {posts, dispatch} = this.props
        const {orderFunc} = this.state

        return <div>
            {posts && posts.length>1 && <PostSorter handleChange={this.handleChange}></PostSorter>}
            <RaisedButton onClick={() => dispatch(showCommentForm(true, null, null))} label="Add Post" primary={true} style={{margin:12}} />

            <div>
                {posts && posts.length?
                    <Paper>
                        <List>
                            <Subheader>Posts</Subheader>
                            {posts.sort(orderFunc).map(post => (
                                <div key={post.id}>
                                    <ListItem
                                        containerElement={<Link to={`/post/${post.id}`}/>}
                                        leftAvatar={<Avatar icon={<ActionViewHeadline />} />}
                                        primaryText={post.title}
                                        rightIconButton={rightIconMenu(dispatch, post)}
                                        secondaryTextLines={2}
                                        secondaryText={
                                            <div>
                                                <div>Created on {new Date(post.timestamp).toLocaleDateString()}</div>
                                                <div><Vote data={post}></Vote></div>
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


export default connect()(Posts)