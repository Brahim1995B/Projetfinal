import { GET_MY_POSTS, GET_ONE_POST, GET_POSTS, GET_SEARCH_CARS } from "../ActionTypes/PostTypes";

const initialState = {posts: [],onePost:{}, myposts:[],searchCars:[]}


const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS: return {...state,posts: action.payload}
    case GET_ONE_POST : return {...state,onePost : action.payload}
    case GET_MY_POSTS : return {...state,myposts : action.payload}
    case GET_SEARCH_CARS : return {...state,searchCars:action.payload}



    default:
      return state;
  }
}

export default PostReducer