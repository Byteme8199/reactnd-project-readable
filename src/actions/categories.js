export function getCategories() {
  return function (dispatch) {
    return fetch(process.env.REACT_APP_BACKEND + 'categories/', { headers: { 'Authorization': 'whatever-you-want' }})
      .then((resp) => resp.json())
      .then(function(data) {
        dispatch({type:'GET_CATEGORY_SUCCESS', payload: data.categories});
      })
      .catch(function(error) {
        return error;
      })
  }
};