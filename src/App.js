
import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ArticleList from './ArticleList';
import ArticleEdit from "./ArticleEdit";

class App extends Component {
render() {
  return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/articles' exact={true} component={ArticleList}/>
          <Route path='/articles/:id' component={ArticleEdit}/>
        </Switch>
      </Router>
  )
}
}

export default App;
