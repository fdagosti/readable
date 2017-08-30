import React, {Component} from "react"
import Posts from "./posts";
import {connect} from "react-redux";
import {postsFetchByCategory} from "../actions/index";


class CategoryPosts extends Component {



    componentDidMount(){
        this.props.dispatch(postsFetchByCategory(this.props.match.params.id))
    }

    render() {
        const category = this.props.match.params.id
        const posts = this.props.posts

        return (<div>
            <p>Category {category}</p>
            <Posts posts={posts}></Posts>
        </div>)
    }
}

const mapStateToProps = ({categories}) => {
    return {
        posts: categories.catBasedPosts && categories.catBasedPosts.posts
    };
};


export default connect(mapStateToProps)(CategoryPosts)