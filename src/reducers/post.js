const post = (state = {currentSort: 'desc'}, action) => {
  let root, sub, postID, list, good;

  switch (action.type) {
    case 'GET_POST_SUCCESS':
      good = action.payload.filter(z => !z.deleted)
      return {
        ...state,
        list: good,
        sorted: good.sort((a, b) => b.voteScore - a.voteScore)
      };

    case 'GET_SINGLE_POST_SUCCESS':
      return {
        ...state,
        post: action.payload
      }
    case 'CREATE_COMMENT_SUCCESS':
      let {comments} = state
      comments[state.post.id].push(action.payload)
      comments[state.post.id].sort((a, b) => b.voteScore - a.voteScore)
      return {
        ...state,
        comments: comments
      }
    case 'GET_POST_COMMENTS_SUCCESS':
      comments = {...state.comments} || {}
      comments[action.payload.parentId] = action.payload.data.sort((a, b) => b.voteScore - a.voteScore)
      return {...state, comments}

    case 'VOTE_POST_SUCCESS':

      list = state.list || []
      let posts = list.findIndex(z => z.id === action.payload.id)
      if (posts > -1) {
        list[posts] = action.payload
        return {...state, list, post: action.payload, sorted: sortBy([...list], state.currentSort)}
      }
      return {
        ...state,
        post: action.payload
      }

    case 'VOTE_COMMENT_SUCCESS':
      root = {...state.comments}
      sub = root[action.payload.parentId]
      postID = sub.findIndex(z => z.id === action.payload.id)

      sub[postID] = action.payload
      sub.sort((a, b) => b.voteScore - a.voteScore)
      root[action.payload.parentId] = sub
      return {...state, comments: root}

    case 'EDIT_COMMENT_SUCCESS':
      root = {...state.comments}
      sub = root[action.payload.parentId]
      postID = sub.findIndex(z => z.id === action.payload.id)

      sub[postID] = action.payload
      root[action.payload.parentId] = sub
      return {...state, comments: root}

    case 'DELETE_COMMENT_SUCCESS':
      root = {...state.comments}
      sub = root[action.payload.parentId]
      postID = sub.findIndex(z => z.id === action.payload.id)

      sub.splice(postID, 1)

      root[action.payload.parentId] = sub
      return {...state, comments: root}

    case 'DELETE_POST_SUCCESS':
      let refined = [...state.list]
      let deletedPosts = refined.findIndex(z => z.id === action.payload)
      refined.splice(deletedPosts, 1)
      return {
        ...state,
        post: null,
        list: refined,
        sorted: sortBy([...refined], state.currentSort)
      }

    case 'CLEAR_POST':
      return {...state, post: null}

    case 'SORT_BY':
      return {...state, currentSort: action.payload, sorted: sortBy(state.list, action.payload)}
    default:
      return state;
  }
};

export default post;

const sortBy = (data, method) => {
  if (method === 'desc')
    return data.sort((a, b) => b.voteScore - a.voteScore)
  else if (method === 'asc')
    return data.sort((a, b) => a.voteScore - b.voteScore)
  else if (method === 'oldest')
    return data.sort((a, b) => a.timestamp - b.timestamp)
  else if (method === 'newest')
    return data.sort((a, b) => b.timestamp - a.timestamp)
  else return data
}