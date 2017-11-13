/** Packages */
import React, { Component } from 'react';
import {Provider} from 'react-redux'
import {Route, Switch, BrowserRouter} from 'react-router-dom';

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

const Layout = ({component: Component, ...rest}) => (
  <Route {...rest}
    render={props => (
      (
        <div className="container">
          <Nav/>
          <Component {...props} />
        </div>
      )
    )}
  />
);

const router = () => (
  <BrowserRouter>
    <Switch>
      <Layout exact path="/" component={HomeCont}/>
      <Layout path="/:category/:id" component={PostCont}/>
      <Layout exact path="/create" component={CreatePost}/>
      <Layout path="/:category" component={CategoryCont}/>      
    </Switch>
  </BrowserRouter>
);

class App extends Component {
  render(){
    return (
    <Provider store={store}>
      {router()}
    </Provider>
    )
  }
}

export default App;
