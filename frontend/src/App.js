import React, {Component} from 'react';
import './App.css';
import {Route} from "react-router-dom";
import Home from "./components/Home";
import CategoryPosts from "./components/CategoryDetail";
import PostDetail from "./components/PostDetail";
import Link from "react-router-dom/es/Link";
import CommentForm from "./components/CommentForm";
import {AppBar, FlatButton, IconButton, IconMenu, MenuItem} from "material-ui";
import {connect} from "react-redux";
import {showPostCommentForm} from "./actions/index";
import Menu from 'material-ui/svg-icons/navigation/menu';
class App extends Component {

  render() {
    return (

      <div className="App">
          <Nav></Nav>
          <div className="App-header">
              <div className="App-intro">Posts and comments</div>
              <div>A great way to learn react and Redux</div>
          </div>
          <div className="container">
              <Route exact path={"/"}
                     component={Home}
              />
              <Route exact path={"/:categoryId"}
                     component={CategoryPosts}
              />
              <Route path = {'/:categoryId/:id'}
                     component={PostDetail}
              />
              <CommentForm ></CommentForm>
          </div>


      </div>
    );
  }
}

let Nav = ({dispatch, categories})=>(<AppBar
    title={<Link to="/" style={{textDecoration:"none",color: "inherit"}}>Post And Comments in React</Link>}
    iconElementLeft={
        <IconMenu
        iconButtonElement={<IconButton><Menu /></IconButton>}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        >
            <MenuItem containerElement={<Link to='/'/>} primaryText="All Posts" />
            {categories && categories.map(category=>(
                <MenuItem
                    key={category.path}
                    containerElement={<Link to={`/${category.path}`}/>}
                    primaryText={`Category: ${category.name}`} />
            ))}
    </IconMenu>}
    iconElementRight={<FlatButton onClick={()=>dispatch(showPostCommentForm(true))} label="Add Post"/>}
/>)

const mapStateToProps = ({categories}) => {
    return {
        categories: categories.categories
    };
};

Nav = connect(mapStateToProps)(Nav)

export default App;
