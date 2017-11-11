import React from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import HomeCont from '../containers/homeCont';
import CategoryCont from '../containers/categoryCont';
import PostCont from '../containers/postCont';
import CreatePost from '../components/create';
import Nav from '../components/nav';

const Layout = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props => (
      (
        <div className="container">
          <Nav />
          <Component {...props} />
        </div>
      )
      )}
  />
);

const routes = () => (
  <Router>
    <Switch>
      <Layout exact path="/" component={HomeCont}/>
      <Layout path="/category/:id" component={CategoryCont}/>
      <Layout path="/post/:id" component={PostCont}/>
      <Layout exact path="/create" component={CreatePost}/>
    </Switch>
  </Router>
);

export default routes;