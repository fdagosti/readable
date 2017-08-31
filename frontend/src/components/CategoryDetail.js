import React, {Component} from "react"
import Posts from "./posts";
import {connect} from "react-redux";
import {postsFetchByCategory} from "../actions/index";
import {withRouter} from 'react-router-dom'
import {RaisedButton} from "material-ui";


const Button = withRouter(({history})=>(
    <RaisedButton onClick={() => history.goBack()} label="Back to All posts" secondary={true} style={{margin:12}} />
))

class CategoryPosts extends Component {

    componentDidMount(){
        this.props.dispatch(postsFetchByCategory(this.props.match.params.categoryId))
    }

    render() {
        const category = this.props.match.params.categoryId
        const posts = this.props.posts

        return (<div>
            <h2 style={{textAlign: "center",textTransform: "uppercase"}}>All posts of category <u>{category}</u></h2>
            <Button></Button>
            <Posts posts={posts}></Posts>
        </div>)
    }
}

const mapStateToProps = ({categories, posts}) => {
    return {
        posts: categories.catBasedPosts && categories.catBasedPosts.posts.map(postId=>posts.find(post=>post.id===postId))
    };
};


export default connect(mapStateToProps)(CategoryPosts)