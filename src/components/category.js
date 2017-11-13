import React from 'react';
import {withRouter} from 'react-router-dom'

const Category = (props) => {
  const {data} = props
  const currentRoute = props.match.params.category
  return (
    <li className={`list-group-item clickable ${data.name === currentRoute ? 'active': ''}`} onClick={() => props.history.push('/' + data.path)}> {data.name}</li>
  )
}

export default withRouter(Category)