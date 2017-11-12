const REACT_APP_BACKEND = "http://localhost:3001/"

export function getPostComments(postId) {
  return function (dispatch) {
    return fetch(REACT_APP_BACKEND + 'posts/' + postId + '/comments/', { method: "GET", headers: { 'Authorization': 'whatever-you-want' }})
      .then((resp) => resp.json())
      .then(function(data) {
        dispatch({type:'GET_POST_COMMENTS_SUCCESS', payload: {parentId: postId, data: data}});
        return data
      })
      .catch(function(error) {
        return error;
      })
  }
};

export function createComment(data) {
  return function (dispatch) {
    return fetch(REACT_APP_BACKEND + 'comments/', { method: 'post',
          headers: { 'Authorization': 'whatever-you-want', 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      })
      .then((resp) => resp.json())
      .then(function(data){
        dispatch({type:'CREATE_COMMENT_SUCCESS', payload: data})
        return data
      }) 
      .catch(function(error) {
        return error;
      })
  }
};


export function voteComment(commentId,vote) {
  const data = {
    option: vote
  }
  return function (dispatch) {
    return fetch(REACT_APP_BACKEND + 'comments/' + commentId + '/', { method: 'post',
          headers: { 'Authorization': 'whatever-you-want', 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      })
      .then((resp) => resp.json())
      .then(function(data){
        dispatch({type:'VOTE_COMMENT_SUCCESS', payload: data})
        return data
      }) 
      .catch(function(error) {
        return error;
      })
  }
};

export function editComment(commentId,data) {

  return function (dispatch) {
    return fetch(REACT_APP_BACKEND + 'comments/' + commentId + '/', { method: 'put',
          headers: { 'Authorization': 'whatever-you-want', 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      })
      .then((resp) => resp.json())
      .then(function(data){
        dispatch({type:'EDIT_COMMENT_SUCCESS', payload: data})
        return data
      }) 
      .catch(function(error) {
        return error;
      })
  }
};

export function deleteComment(commentId) {

  return function (dispatch) {
    return fetch(REACT_APP_BACKEND + 'comments/' + commentId + '/', { method: "DELETE", headers: { 'Authorization': 'whatever-you-want' }})
      .then((resp) => resp.json())
      .then(function(data){
        dispatch({type:'DELETE_COMMENT_SUCCESS', payload: data})
        return data
      }) 
      .catch(function(error) {
        return error;
      })
  }
};
