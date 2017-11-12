import React from 'react';
import serialize from 'form-serialize'
import uuidv1 from 'uuid/v1'

const CommentForm = (props) => {
  const submit = e => {
    e.preventDefault()
    let form = document.querySelector('#comment-form');
    // serialize takes the form and serializes the form fields into prettier json
    let data = serialize(form,{ hash: true })
    // uuid creates a nice uuid at random, should never run into dupes this way
    props.publishComment({...data, id: uuidv1(),parentId:props.post.id,timestamp: Date.now()})
    form.reset()
  }
  return (
    <form className="divider" id="comment-form">
      <div className="row">
        <div className="col-xs-12 col-sm-3">
          <div className="form-group">
            <input type="text" className="form-control" id="author" name="author" placeholder="Name" />
          </div>
        </div>
        <div className="col-xs-12 col-sm-7">
          <div className="form-group">
            <input type="text" className="form-control" id="body" name="body" placeholder="Comment" />
          </div>
        </div>
        <div className="col-xs-12 col-sm-2">
          <button className="btn btn-primary pull-right" type="submit" onClick={e => submit(e)}>Submit</button>
        </div>
      </div>
    </form>
  )
}


export default CommentForm;