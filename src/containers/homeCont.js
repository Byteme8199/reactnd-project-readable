import React, {Component} from 'react'
import {connect} from 'react-redux'
import Home from '../components/home';
import {getCategories} from '../actions/categories'
import {getPostComments} from '../actions/comments'
import {getPosts, votePost, deletePost} from '../actions/posts'

class HomeCont extends Component {

  componentDidMount() {
    this.props.getCategories()
    this.props.getPosts()
      .then(res => {
        res.forEach(post => {
          this.props.getComments(post.id)
        })
      })
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
    getPosts: () => dispatch(getPosts()),
    deletePost: (id) => dispatch(deletePost(id)),
    votePost: (postId,vote) => dispatch(votePost(postId, vote)),
    getComments: (postId) => dispatch(getPostComments(postId)),
    changeSort: (sortBy) => dispatch({type:'SORT_BY', payload: sortBy})
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeCont)