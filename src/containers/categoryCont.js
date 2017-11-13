import React, {Component} from 'react'
import {connect} from 'react-redux'
import Home from '../components/home';
import {getCategories} from '../actions/categories'
import {getPostComments} from '../actions/comments'
import {getPostsByCategory, deletePost, votePost} from '../actions/posts'

class CategoryCont extends Component {

  componentDidMount() {
    const category = this.props.match.params.category
    this.props.getCategories()
    this.props.getPostsByCategory(category)
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.match.params.category !== nextProps.match.params.category) {
      this.props.getPostsByCategory(nextProps.match.params.category)
    }
  }
  render() {
    return (
      <Home {...this.props}/>
    ) 
  }
}

const mapStateToProps = (store,ownProps) => {
  return {
    category: store.category,
    post: store.post
  }
}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    getCategories : () => dispatch(getCategories()),
    getPostsByCategory: (id) => dispatch(getPostsByCategory(id)),
    deletePost: (id) => dispatch(deletePost(id)),
    votePost: (postId,vote) => dispatch(votePost(postId, vote)),
    getComments: (postId) => dispatch(getPostComments(postId)),
    changeSort: (sortBy) => dispatch({type:'SORT_BY', payload: sortBy})
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryCont)