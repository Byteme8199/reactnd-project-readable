import React, {Component} from 'react'
import Select from 'react-select'
import Post from './post'
import Category from './category'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedSort: '',
    }
  }

  renderCategories() {
    const {list} = this.props.category
    return list ? list.map((ct, i) => {
        return <Category key={i} data={ct}/>
      }) : <div>No Categories</div>
  }

  renderPosts() {
    const {sorted} = this.props.post
    return <div id="posts">
        {
          sorted ? sorted.map((pc, i) => {
            return <Post
              key={i}
              data={pc}
              comments={this.props.post.comments}
              votePost={this.props.votePost}
              deletePost={this.props.deletePost}
            />
          }) : null
        }
      </div>
  }

  selectSort(val) {
    console.log("Selected: " + JSON.stringify(val));
    this.setState({selectedSort: val})
    if(val != null){
      this.props.changeSort(val.value)
    }
  }

  render() {
    let options = [
      {value: 'asc', label: 'Votes Ascending'},
      {value: 'desc', label: 'Votes Descending'},
      {value: 'newest', label: 'Newest'},
      {value: 'oldest', label: 'Oldest'}
    ];
    return (
      <div>
        <div className="row">
          <div className="col-xs-12 col-sm-2">
            <ul className="list-group">
              <li className={`list-group-item clickable ${this.props.match.params.id ? '': 'active'}`} onClick={() => this.props.history.push('/')}> All Categories</li>
              {this.renderCategories()}
            </ul>
          </div>
          <div className="col-xs-12 col-sm-10">
            <div className="row">
              <div className="col-xs-12">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <span className="panel-title with-sorting">Posts</span>
                    <div className="pull-right sort-right">
                      {/** Select is an easy to use drop-down dynamic component maker */}
                      <Select
                        name="sort-selection"
                        options={options}
                        value={this.state.selectedSort}
                        onChange={this.selectSort.bind(this)}
                        className="select-sort"
                      />
                    </div>
                  </div>
                  <div className="panel-body">
                    {this.renderPosts()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home