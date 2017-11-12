import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCategories} from '../actions/categories'
import {getPostsById, createPost, editPost} from '../actions/posts'
import serialize from 'form-serialize'
import uuidv1 from 'uuid/v1'
import queryString from 'query-string'
import Select from 'react-select'
import intersection from 'lodash/intersection'


class CreatePost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCategory: '',
      edit: queryString.parse(props.location.search).edit
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

  handleSubmit(event) {
    event.preventDefault()
    let form = document.querySelector('#create-post'),
      formData = serialize(form, {hash: true}),
      data = {
        ...formData,
        id: uuidv1(),
        timestamp: Date.now()
      },
      edit = this.state.edit

    let validate = this.validator(data)
    if (!validate) {
      console.log("Error in validation");
      return
    }


    if(Boolean(edit)) {
      this.props.editPost(edit,{title: data.title,body:data.body}).then(res => {
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

  validator(data) {
    let requiredKeys = ['title', 'author', 'body', 'category'],
      dataKeys = Object.keys(data)

    return intersection(requiredKeys, dataKeys).length === requiredKeys.length || this.state.edit
  }

  render() {
    let categories = this.props.category.list,
      options = categories ? categories.map(c => {
        return {value: c.name, label: c.name}
      }) : []

    let {edit} = this.state,
      {post} = this.props.post
    //edit && this.props
    return (edit && post) || !edit ?
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Create Post</h3>
        </div>
        <div className="panel-body">
          <form id="create-post">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input defaultValue={post && edit ? post.title : ''} type="text" className="form-control" name="title"/>
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input type="text" defaultValue={post && edit ? post.author : ''} className="form-control" disabled={Boolean(edit)} name="author"/>
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              {categories
                ?
                <Select
                  disabled={Boolean(edit)}
                  name="category"
                  options={options}
                  value={this.state.selectedCategory}
                  onChange={this.logChange.bind(this)}
                /> : null
              }
            </div>
            <div className="form-group">
              <label htmlFor="body">Body</label>
              <textarea defaultValue={post && edit ? post.body : ''} className="form-control" name="body" id="" />
            </div>
            <button className="btn btn-default" onClick={() => this.props.history.push('/')}>Cancel</button>
            <button type="submit" className="btn pull-right btn-primary" onClick={this.handleSubmit.bind(this)}>Submit</button>
          </form>
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