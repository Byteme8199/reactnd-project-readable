import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPostsById, deletePost, votePost} from '../actions/posts'
import {getPostComments, createComment, editComment,voteComment, deleteComment} from '../actions/comments'
import PostDetail from '../components/postDetail'

class PostCont extends Component {
  componentDidMount() {
    const {id} = this.props.match.params
    this.props.getPost(id)
      .then(res => {
        this.props.getPostComments(id)
      })
      .catch(e => {
        console.log(e)
      })
  }

  render() {
    return <PostDetail
      {...this.props}
    />
  }
}

const mapStateToProps = (store,ownProps) => {
  return {
    post: store.post
  }

}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    getPost: (id) => dispatch(getPostsById(id)),
    deletePost: (id) => dispatch(deletePost(id)),
    clearPost: () => dispatch({type:'CLEAR_POST'}),
    getPostComments: id => dispatch(getPostComments(id)),
    publishComment: data => dispatch(createComment(data)),
    editComment: (commentId, data) => dispatch(editComment(commentId,data)),
    deleteComment: (id) => dispatch(deleteComment(id)),
    votePost: (postId,vote) => dispatch(votePost(postId, vote)),
    voteComment: (commentId, vote) => dispatch(voteComment(commentId,vote))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostCont);