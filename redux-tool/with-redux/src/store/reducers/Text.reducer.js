import { createSlice } from "@reduxjs/toolkit"

export const textSlice= createSlice({
  name:"text",
  initialState:{
    userName: ""
  },
  reducers:{
    change_text: (state,action)=>{
      state.userName= action.payload
    },
  },
})


export const{change_text}= textSlice.actions
export default textSlice.reducer