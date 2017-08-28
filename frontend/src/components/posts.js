import React, {Component} from "react"
import {Avatar, List, ListItem, Paper, Subheader} from "material-ui";
import {ActionViewHeadline} from "material-ui/svg-icons/index";
import {Link} from "react-router-dom";
import PostSorter from "./PostsSorter";


export default class Posts extends Component{

    state = {
        orderFunc : null
    }

    handleChange = (orderFunc) => this.setState({orderFunc})

    render(){

        const {posts} = this.props
        const {orderFunc} = this.state

        return <div>
            {posts && posts.length>1 && <PostSorter handleChange={this.handleChange}></PostSorter>}

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
                                        secondaryTextLines={2}
                                        secondaryText={
                                            <div>
                                                <div>Created on {new Date(post.timestamp).toLocaleDateString()}</div>
                                                <div>Vote Score: {post.voteScore}</div>
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