import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
    { id:'1', title: 'Shiibal na siikya', content: 'yeahh'}
]

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
        postAdded: {
            reducer(state, action){
                state.push(action.payload)
            },
            prepare(title:any, content:any, userId:number):any{
                return {
                    payload:{
                        id: nanoid(),
                        title,
                        content,
                        userId
                    }
                }
            }
        },

    }
})

export const selectAllPosts = (state:any) => state.posts
export const {postAdded} = postsSlice.actions