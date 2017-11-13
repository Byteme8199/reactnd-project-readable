const REACT_APP_BACKEND = "http://localhost:3001/"

export function getPosts() {
    return function(dispatch) {
        return fetch(REACT_APP_BACKEND + 'posts/', { method: 'GET', headers: { 'Authorization': 'whatever-you-want' } })
            .then((resp) => resp.json())
            .then(function(data) {
                dispatch({ type: 'GET_POST_SUCCESS', payload: data });
                return data;
            })
            .catch(function(error) {
                return error;
            })
    }
};

export function getPostsById(id) {
    return function(dispatch) {
        return fetch(REACT_APP_BACKEND + 'posts/' + id, { headers: { 'Authorization': 'whatever-you-want' } })
            .then((resp) => resp.json())
            .then(function(data) {
                dispatch({ type: 'GET_SINGLE_POST_SUCCESS', payload: data });
                return data;
            })
            .catch(function(error) {
                dispatch({ type: 'GET_SINGLE_POST_REJECTED', payload: null });
                return error;
            })
    }
};

export function getPostsByCategory(category) {
    return function(dispatch) {
        return fetch(REACT_APP_BACKEND + category + '/posts/', { headers: { 'Authorization': 'whatever-you-want' } })
            .then((resp) => resp.json())
            .then(function(data) {
                dispatch({ type: 'GET_POST_SUCCESS', payload: data });
                return data;
            })
            .catch(function(error) {
                return error;
            })
    }
};


export function createPost(post) {
    return function(dispatch) {
        return fetch(REACT_APP_BACKEND + 'posts', {
            method: 'post',
            headers: { 'Authorization': 'whatever-you-want', 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(post)
        })
        .then(function(data) {
            dispatch({ type: 'CREATE_POST_SUCCESS', payload: data });
            return data;
        })
        .catch(function(error) {
            return error;
        })
    }
};


export function votePost(postId, vote) {
    const data = {
        option: vote
    }
    return function(dispatch) {
        return fetch(REACT_APP_BACKEND + 'posts/' + postId + '/', {
            method: 'post',
            headers: { 'Authorization': 'whatever-you-want', 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then((resp) => resp.json())
            .then(function(data) {
                dispatch({ type: 'VOTE_POST_SUCCESS', payload: data });
                return data;
            })
            .catch(function(error) {
                return error;
            })
    }
};

export function editPost(postId, data) {
    return function(dispatch) {
        return fetch(REACT_APP_BACKEND + 'posts/' + postId + '/', {
            method: 'put',
            headers: { 'Authorization': 'whatever-you-want', 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then((resp) => resp.json())
            .then(function(data) {
                dispatch({ type: 'EDIT_POST_SUCCESS', payload: data });
                return data;
            })
            .catch(function(error) {
                return error;
            })
    }
};

export function deletePost(postId) {
    return function(dispatch) {
        return fetch(REACT_APP_BACKEND + 'posts/' + postId + '/', { method: 'DELETE', headers: { 'Authorization': 'whatever-you-want' } })
            .then(function(data) {
                dispatch({ type: 'DELETE_POST_SUCCESS', payload: postId });
                return data;
            })
            .catch(function(error) {
                return error;
            })
    }
};