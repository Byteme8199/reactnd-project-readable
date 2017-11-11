import React from 'react';
import {Link, withRouter} from 'react-router-dom'
import {convertDate} from '../core/utils'

const Post = (props) => {
  const {data, comments} = props,
  hasComment = Boolean(comments && comments[data.id])
  return (
    <div className="post row">
      <div className="col-xs-12">
        <div className="pull-left comments-block">
          <span className="fa fa-arrow-up text-green fw clickable" onClick={() => props.votePost(data.id, 'upVote')}></span>
          <span className="post-votescore fw">{data.voteScore}</span> 
          <span className="fa fa-arrow-down text-red fw clickable" onClick={() => props.votePost(data.id, 'downVote')}></span>
        </div>
        <div className="post-title">
          <b><Link to={'/post/' + data.id}>{data.title}</Link></b> 
        </div>
        <span className="post-sub">
            <span className="post-author">by {data.author} | </span>
            <span className="post-date">{convertDate(data.timestamp)} | </span>
            <span className="post-comments">{hasComment ? comments[data.id].length : 0} {hasComment && comments[data.id].length === 1 ? `comment` : `comments`} | </span>
            <span className="post-edit clickable" onClick={() => props.history.push('/create?edit=' + data.id)}> edit</span>
        </span>
      </div>
    </div>
  );
}

export default withRouter(Post);