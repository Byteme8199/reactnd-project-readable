import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCategories} from '../actions/categories'
import {getPostsById, createPost, editPost} from '../actions/posts'
import serialize from 'form-serialize'
import uuidv1 from 'uuid/v1'
import queryString from 'query-string'
import Select from 'react-select'

class CreatePost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCategory: '',
      // queryString takes url (eg. create?edit=ID) parameters and makes them prettier json
      edit: queryString.parse(props.location.search).edit,
      errors: null
    }
  }

  componentDidMount() {
    const {edit} = this.state
    this.props.getCategories();
    if (edit)
      this.props.getPost(edit)
        .then(res => {
          this.setState({selectedCategory: {value: res.category, label: res.category}})
        })
        .catch(e => this.props.history.push('/'))
  }

  componentWillUnmount() {
    this.props.clearPost()
  }

  logChange(val) {
    this.setState({selectedCategory: val})
  }

  validate(title, author, category, body) {
    if((title === undefined) + (author === undefined) + (category === undefined) + (body === undefined) > 0){
      return false
    } else {
      return true
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    let form = document.querySelector('#create-post')
    
    // serialize takes the form and serializes the form fields into prettier json
    let formData = serialize(form, {hash: true})
    
    let data = {
      ...formData,
      // uuid creates a nice uuid at random, should never run into dupes this way
      id: uuidv1(),
      timestamp: Date.now()
    }
    
    let edit = this.state.edit

    const errors = this.validate(data.title, data.author, data.category, data.body);

    if(!errors){
      this.setState({errors: "Please fill out every form field"})
      return
    } else {
      this.setState({errors: null})
    }

    if(Boolean(edit)) {
      this.props.editPost(edit,{title: data.title,author: data.author, category: data.category, body:data.body}).then(res => {
        form.reset()
        this.props.history.push(`/`)
      })
        .catch(e => {
          console.log(e)
        })
    } else {
      this.props.createPost(data).then(res => {
        form.reset()
        this.props.history.push(`/`)
      })
        .catch(e => {
          console.log(e);
        })
    }
  }

  render() {
    let categories = this.props.category.list,
      options = categories ? categories.map(c => {
        return {value: c.name, label: c.name}
      }) : []

    let {edit} = this.state
    let {post} = this.props.post

    return (edit && post) || !edit ?
    <div>
      { (this.state.errors) ? <div className="alert alert-danger" role="alert">{ this.state.errors }</div> : null }
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Create Post</h3>
        </div>
        <div className="panel-body">
          <form id="create-post">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input defaultValue={post && edit ? post.title : ''} required type="text" className="form-control" name="title"/>
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input type="text" defaultValue={post && edit ? post.author : ''} required className="form-control" name="author"/>
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              {categories
                ?
                // Select is an easy to use drop-down dynamic component maker
                <Select
                  name="category"
                  options={options}
                  value={this.state.selectedCategory}
                  onChange={this.logChange.bind(this)}
                  required
                /> : null
              }
            </div>
            <div className="form-group">
              <label htmlFor="body">Body</label>
              <textarea defaultValue={post && edit ? post.body : ''} required className="form-control" name="body" id="" />
            </div>
            <button className="btn btn-default" onClick={() => this.props.history.push('/')}>Cancel</button>
            <button type="submit" className="btn pull-right btn-primary" onClick={this.handleSubmit.bind(this)}>Submit</button>
          </form>
        </div>
      </div>
    </div>: null
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    category: store.category,
    post: store.post
  }

}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCategories: () => dispatch(getCategories()),
    createPost: (data) => dispatch(createPost(data)),
    editPost: (postId,data) => dispatch(editPost(postId,data)),
    clearPost: () => dispatch({type:'CLEAR_POST'}),
    getPost: (id) => dispatch(getPostsById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)