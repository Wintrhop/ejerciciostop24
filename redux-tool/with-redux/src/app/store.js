import { configureStore } from '@reduxjs/toolkit'
import countReducer from '../store/reducers/Count.reducer'
import postsReducer from '../store/reducers/Posts.reducer'
import TextReducer from '../store/reducers/Text.reducer'

export const store = configureStore({
  reducer: {
    count: countReducer,
    posts: postsReducer,
    text: TextReducer,
  },
})