import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { sub } from 'date-fns';
import axios from 'axios';
const POST_URL = "https://jsonplaceholder.typicode.com/posts";


const initialState:any = {
    posts:[],
    status: 'idle', // idle, loading, succeeded, faled
    error: null
}

/*const initialState = [
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
]*/

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async() =>{
    try {
        const response = await axios.get(POST_URL);
        return [...response.data];
    } catch ( error:any) {
        return error.message;
    }
})

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
        postAdded: {
            reducer(state, action){
                state.posts.push(action.payload)
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
            const existingPost:any = state.posts.find((post: { id: any; }) => post.id === postId)
            if (existingPost) existingPost.reactions[reaction]++
        }
    },
    extraReducers( builder:any) {
        builder
            .addCase(fetchPosts.pending, (state: any, _action:any) => {
                state.status = 'loading'
            })
            .addCase( fetchPosts.fulfilled, (state:any, action: any) => {
                state.status = 'succeeded'
                let min = 1;
                const loadedPosts:any = action.payload.map( (post: { date: string, reactions:any }):any => {
                    post.date = sub(new Date(), {minutes: min++}).toISOString(),
                    post.reactions = {
                        like:0,
                        wow:0,
                        heart:0
                    }
                    return post;
                });
                // add any fetched posts to the array
                state.post = state.posts.concat(loadedPosts);
            })
            .addCase(fetchPosts.rejected, (state: any, action: any) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectAllPosts = (state:any) => state.posts.posts
export const {postAdded, reactionAdded} = postsSlice.actions
