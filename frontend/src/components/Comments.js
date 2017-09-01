import React, {Component} from "react"
import PostSorter from "./PostsSorter";
import Comment from "./Comment";
import connect from "react-redux/es/connect/connect";

class Comments extends Component{

    render(){

        const {comments, commentOrderFunc} = this.props

        return (
            (<div>
                <h2>{comments.length} Comments:</h2>
                {comments.length >1 && <PostSorter handleChange={this.handleChange}></PostSorter>}
                {comments.sort(commentOrderFunc).map(comment => <Comment key={comment.id} comment={comment} ></Comment>)}
            </div>)
        )
    }
}

const mapStateToProps = ({messageSorting}) => {
    return {
        commentOrderFunc: messageSorting.orderFunction,
    };
};


export default connect(mapStateToProps)(Comments)