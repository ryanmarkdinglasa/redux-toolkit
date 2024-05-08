import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialState = [
    { 
        id:'1', 
        title: 'Shiibal na siikya', 
        content: 'yeahh', 
        date: sub(new Date(), {minutes:10}).toISOString(),
        reactions:{
            tumbsUp: 0,
            wow: 0,
            heart: 0
        } 
    }
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
                        userId,
                        date: new Date().toISOString(),
                        reactions:{
                            tumbsUp: 0,
                            wow: 0,
                            heart: 0
                        }
                    }
                }
            }
        },
        reactionAdded(state, action){
            const {postId, reaction} = action.payload
            const existingPost:any = state.find(post => post.id === postId)
            if (existingPost) existingPost.reactions[reaction]++
        }

    }
})

export const selectAllPosts = (state:any) => state.posts
export const {postAdded, reactionAdded} = postsSlice.actions
