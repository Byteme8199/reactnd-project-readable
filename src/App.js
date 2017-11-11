import React, { Component } from 'react';
import {Provider} from 'react-redux'
import store from './core/store'
import routes from './core/router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'react-select/dist/react-select.css';

import './styles.css';

class App extends Component {
  render(){
    return (
    <Provider store={store}>
      <div>
        {
          routes()
        }
      </div>
    </Provider>
    )
  }
}

export default App;
