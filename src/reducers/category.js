const category = (state = {}, action) => {
  switch (action.type) {
    case 'GET_CATEGORY_SUCCESS':
      return {
        ...state,
        list: action.payload
      };
    default:
      return state;
  }
};
  
export default category;