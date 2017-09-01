import React, {Component} from "react"
import Posts from "./posts";
import CategoriesSelector from "./CategoriesSelector";
import {connect} from "react-redux";
import {postsFetch} from "../actions/posts";

class Home extends Component {


    componentDidMount(){
        this.props.fetchPosts()
    }

    render(){

        const {posts} = this.props

        return (<div>
            <h1 style={{textAlign: "center",textTransform: "uppercase"}}>All Posts</h1>
            <CategoriesSelector></CategoriesSelector>
            <Posts posts={posts}></Posts>
        </div>)
    }

}


const mapStateToProps = ({posts}) => {
    return {
        posts
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(postsFetch())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)