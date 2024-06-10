import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { sub } from 'date-fns';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Post, PostState } from '../../shared';

const POST_URL = "https://jsonplaceholder.typicode.com/posts";


const initialState:PostState = {
    posts:[],
    status: 'idle', // idle, loading, succeeded, faled
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const response = await axios.get(POST_URL);
        return response.data
        .map((post: any) => ({
            ...post,
            id: post.id || uuidv4(), // Ensure each post has a unique id
        }))
    } catch (error: any) {
        throw Error(error.message);
    }
});
/*
(async() => {
    const response = await axios.get(POST_URL);
    const data = response.data.map((post: any) => ({
        ...post,
        id: post.id || nanoid(), // Ensure each post has a unique id
    }));
    console.log(data);
})();*/export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action: PayloadAction<Post>) {
                state.posts.push(action.payload);
            },
            prepare(title: string, content: string, userId: number) {
                return {
                    payload: {
                        id: uuidv4(),
                        title,
                        content,
                        userId,
                        date: new Date().toISOString(),
                        reactions: {
                            like: 0,
                            wow: 0,
                            heart: 0,
                        },
                    },
                };
            },
        },
        reactionAdded(state, action: PayloadAction<{ postId: string; reaction: string }>) {
            const { postId, reaction } = action.payload;
            const existingPost = state.posts.find(post => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.status = 'succeeded';
                let min = 1;
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    post.reactions = {
                        like: 0,
                        wow: 0,
                        heart: 0,
                    };
                    return post;
                });
                state.posts = state.posts.concat(loadedPosts);
            })
            .addCase(fetchPosts.rejected, (state:any , action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});
export const { postAdded, reactionAdded } = postsSlice.actions
