import React, {Component} from "react"
import Posts from "./posts";
import {connect} from "react-redux";
import {postsFetchByCategory} from "../actions/index";
import {BrowserRouter, withRouter} from 'react-router-dom'
import {RaisedButton} from "material-ui";



const Button = withRouter(({history})=>(
    <RaisedButton onClick={() => history.goBack()} label="Back to All posts" secondary={true} style={{margin:12}} />
))

class CategoryPosts extends Component {

    componentDidMount(){
        this.props.dispatch(postsFetchByCategory(this.props.match.params.id))
    }

    render() {
        const category = this.props.match.params.id
        const posts = this.props.posts

        return (<div>
            <h2 style={{textAlign: "center",textTransform: "uppercase"}}>All posts of category <u>{category}</u></h2>
            <Button></Button>
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