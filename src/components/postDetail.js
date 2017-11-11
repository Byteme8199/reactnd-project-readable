import React, {Component} from 'react'
import {convertDate} from '../core/utils'
import Comment from './comment'
import CommentForm from './commentForm'
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import isEmpty from 'lodash/isEmpty'

class PostDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  getComments() {
    const {id} = this.props.match.params
    const list = this.props.post.comments[id]
    return list ? list.map(l =>
        <Comment
          key={l.id} data={l}
          voteComment={this.props.voteComment}
          editComment={this.props.editComment}
          deleteComment={this.props.deleteComment}
        />) : null
  }

  deletePost(id) {
    this.props.deletePost(id)
      .then(res => {
        console.log('>> ', this)
        this.props.history.push('/')
      })
  }

  componentWillUnmount() {
    this.props.clearPost()
  }

  showDeleteModal() {
    const {id} = this.props.match.params
    return (
      <Rodal
        height={150}
        visible={this.state.visible} onClose={e => this.setState({visible:false}) }>
        <div className="modal-text">Confirm Post Delete</div>
        <div className="modal-body">Do you really want to delete the post?<br /></div>
        <div className="pull-right">
          <button className="btn btn-default modal-close spacer" onClick={e => this.setState({visible: false})}>Cancel</button>
          <button className="btn btn-danger modal-close" onClick={e => this.deletePost(id)}>Confirm</button>
        </div>
      </Rodal>
    )
  }

  render() {
    const {post} = this.props.post

    return !isEmpty(post) ? <div>
      <div>
        <h1 className="page-header">
          {post.title}
          <div className="pull-left comments-block">
            <span className="fa fa-arrow-up text-green fw clickable" onClick={() => this.props.votePost(post.id, 'upVote')}></span>
            <span className="post-votescore fw">{post.voteScore}</span> 
            <span className="fa fa-arrow-down text-red fw clickable" onClick={() => this.props.votePost(post.id, 'downVote')}></span>
          </div>
        </h1>
        <div className="pull-right">
            <button className="btn btn-default spacer" onClick={e => this.props.history.push(`/create?edit=${post.id}`)}>Edit</button>
            <button onClick={e => this.setState({visible: true})} className="btn btn-danger">Delete</button>
        </div>
        <span className="post-date">
          {convertDate(post.timestamp)}
        </span><br />
        <span className="post-author">
          by {post.author}
        </span>
        <p className="post-body">
          {post.body}
        </p>

        <div className="panel panel-default">
          <div className="panel-heading">Comments</div>
          <div className="panel-body">
            <CommentForm
              publishComment={this.props.publishComment}
              post={this.props.post.post}
            />
            {this.getComments()}
          </div>
        </div>
      </div>
      {this.showDeleteModal()}
    </div> : null
  }

}

export default PostDetails;