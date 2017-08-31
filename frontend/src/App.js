import React, {Component} from 'react';
import './App.css';
import {Route} from "react-router-dom";
import Home from "./components/Home";
import CategoryPosts from "./components/CategoryDetail";
import PostDetail from "./components/PostDetail";
import Link from "react-router-dom/es/Link";
import CommentForm from "./components/CommentForm";

class App extends Component {

  render() {
    return (

      <div className="App">
          <Link to="/">
              <div className="App-header">
                  <div className="App-intro">Posts and comments</div>
                  <div>A great way to learn react and Redux</div>
              </div>
          </Link>
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

export default App;
