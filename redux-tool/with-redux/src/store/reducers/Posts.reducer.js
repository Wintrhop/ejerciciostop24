import { createSlice } from "@reduxjs/toolkit"



export const postSlice = createSlice({
  name: "posts",
  initialState:{
    posts: [],
    loading: false,
    error: null
  },
  reducers:{
    posts_loading: (state, action)=>{
      state.loading =action.payload
    },
    posts_error:(state, action)=>{
      state.error =action.payload
    },
    posts_success:(state, action)=>{
      state.posts= action.payload
    },
  },
})

export const {posts_loading, posts_error, posts_success}= postSlice.actions
export default postSlice.reducer
