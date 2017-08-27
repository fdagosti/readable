import React, {Component} from 'react';
import './App.css';
import {Link, Route} from "react-router-dom";
import Categories from "./components/categories"
import {FlatButton, FloatingActionButton, RaisedButton} from "material-ui";

class App extends Component {

  render() {
    return (

      <div className="App">

        <Route exact path={"/"}
           render={() => (<div>
               <p>Root Screen</p>
               <Link to="/category/dummy"><FlatButton primary={true}>Dummy Category</FlatButton></Link>
               <br/>
               <FlatButton secondary={true} containerElement={<Link to="/post/dummy"/>}>Dummy post</FlatButton>
               <br/>
               <RaisedButton primary={true} containerElement={<Link to="/post/dummy/edit"/>}>Edit a post</RaisedButton>
               <br/>
               <RaisedButton secondary={true} containerElement={<Link to="/newPost"/>}>new post</RaisedButton>
           </div>)}
        />
        <Route path={"/category/:id"}
               component={Categories}
        />
        <Route path = {'/post/:id'}
           component={PostDetail}
        />
        <Route path={"/post/:id/edit"}/>
        <Route path={"/newPost"}/>

      </div>
    );
  }
}

export default App;


const PostDetail = ({match}) => (<div>Post Details {match.params.id}</div>)