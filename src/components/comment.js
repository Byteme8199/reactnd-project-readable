import React, {Component} from 'react'
import {convertDate} from '../core/utils'
export default class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false
    }
  }

  handleEditComment(id) {
    let data = {
      timestamp: Date.now(),
      body: this.refs.comment.value
    }
    this.props.editComment(id,data)
      .then(r =>{
        this.setState({isEditing: false})
      })

  }
  render() {
    const {data} = this.props;
    let {isEditing} = this.state
    return (
      <div className="divider">
        <div className="row">
            <div className="col-xs-2 col-sm-1">
              <div className="comments-block">
                <span className="fa fa-arrow-up text-green fw clickable" onClick={() => this.props.voteComment(data.id,'upVote')}></span>
                <span className="post-votescore fw">{data.voteScore}</span> 
                <span className="fa fa-arrow-down text-red fw clickable" onClick={() => this.props.voteComment(data.id,'downVote')}></span>
              </div>
            </div>
            <div className="col-xs-10 col-sm-9">
              <span className="post-author">{data.author}</span>
              <p>
                {
                  isEditing ? <input type="text" ref="comment" defaultValue={data.body} className="form-control" />
                  : data.body
                }
              </p>
            </div>
            <div className="col-xs-12 col-sm-2">

              {convertDate(data.timestamp)}<br />

              <span className="text-red fa fa-trash clickable spacer" onClick={() => this.props.deleteComment(data.id)}></span>
              {
                isEditing ?
                  <span>
                    <span onClick={() => this.setState({isEditing:false})} className="text-grey clickable fa fa-ban spacer"></span> 
                    <span onClick={this.handleEditComment.bind(this,data.id)} className="text-green clickable fa fa-check spacer"></span>
                  </span>
                : <span onClick={() => this.setState({isEditing:true})} className="text-grey clickable fa fa-edit"></span>
              }

            </div>
        </div>
      </div>
    )
  }
}
