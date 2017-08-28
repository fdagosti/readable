import React, {Component} from "react"
import {getPosts} from "../utils/api";
import Posts from "./posts";


export default class CategoryPosts extends Component {

    state = {
        posts : null
    }

    componentDidMount(){
        getPosts(this.props.match.params.id)
            .then(posts => this.setState({posts, category: this.props.match.params.id}))
    }

    render() {
        const {posts, category} = this.state
        return (<div>
            <p>Category {category}</p>
            <Posts posts={posts}></Posts>
        </div>)
    }
}
