import { configureStore } from '@reduxjs/toolkit';
import { postsSlice, usersSlice } from '../feature';

/* LESSON 1
import  { counterSlice } from '../feature';
const storeConfig = {
    reducer: {
        counter: counterSlice.reducer
    }
};

export const store = configureStore(storeConfig);
//  LESSON 1 */


export const storeConfig = {
    reducer: {
        posts: postsSlice.reducer,
        users: usersSlice.reducer
    }
};

export const store = configureStore(storeConfig);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;