import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Nav extends Component {
  render(){
    return(
      <div>
        <header className="navbar navbar-default navbar-fixed-top" id="top"> 
          <div className="container"> 
            <div className="navbar-header"> 
              <Link to="/" className="navbar-brand" >Readable</Link>
            </div> 
            <nav className="collapse navbar-collapse" id="bs-navbar"> 
              <ul className="nav navbar-nav navbar-right"> 
                <li><Link to="/create"><span className="fa fa-plus-circle text-green" /> Create Post</Link></li>
              </ul> 
            </nav> 
          </div> 
        </header>
        <div className="header-spacing"/>
      </div>
    )
  }
}

export default Nav;