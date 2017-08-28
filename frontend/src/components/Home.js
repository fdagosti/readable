import React, {Component} from "react"
import Posts from "./posts";
import {getPosts} from "../utils/api";
import CategoriesSelector from "./CategoriesSelector";

export default class Home extends Component {

    state = {
        posts : null
    }
    componentDidMount(){
        getPosts()
            .then(posts => this.setState({posts}))
    }

    render(){

        const {posts} = this.state

        return (<div>
            <h1 style={{textAlign: "center",textTransform: "uppercase"}}>All Posts</h1>
            <CategoriesSelector></CategoriesSelector>
            <Posts posts={posts}></Posts>
        </div>)
    }

}
