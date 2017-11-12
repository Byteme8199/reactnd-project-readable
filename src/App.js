/** Packages */
import React, { Component } from 'react';
import {Provider} from 'react-redux'
import {Route} from 'react-router-dom';

/** Store */
import store from './core/store'

/** Containers and Components */
import Nav from './components/nav';
import HomeCont from './containers/homeCont';
import CategoryCont from './containers/categoryCont';
import PostCont from './containers/postCont';
import CreatePost from './components/create';

/** styles */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'react-select/dist/react-select.css';
import './styles.css';

class App extends Component {
  render(){
    return (
    <Provider store={store}>
      <div className="container">
        <Nav />
        <Route exact path="/" component={HomeCont}/>
        <Route path="/category/:id" component={CategoryCont}/>
        <Route path="/post/:id" component={PostCont}/>
        <Route exact path="/create" component={CreatePost}/>
      </div>
    </Provider>
    )
  }
}

export default App;
