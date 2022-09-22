import axios from "axios"


import { posts_error, posts_success, posts_loading } from "../reducers/Posts.reducer"



//action creator
export const getPosts = () => {
  
  return (dispatch) => {
    dispatch({ type: posts_loading, payload: true })
    axios.get("https://jsonplaceholder.typicode.com/todos/")
      .then((res) => {
        dispatch({ type: posts_success, payload: res.data })
      })
      .catch((error) => {
        dispatch({ type: posts_error, payload: error })
      })
      .finally(() => {
        dispatch({ type: posts_loading, payload: false })
      })
  }
}