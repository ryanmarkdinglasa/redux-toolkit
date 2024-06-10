import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState: any = [];
/*const initialState = [
    { id : 0, name: 'Select Author'},
    { id : 1, name: 'Dhaniela Grace Alba Serundo'},
    { id : 2, name: 'Mark Gregory Alba Serundo'},
    { id : 3, name: 'Jeric Yap Alba Serundo' }
]*/

export const fetchUsers = createAsyncThunk('users/fetchUsers', async() =>{
    try {
        const response = await axios.get(USERS_URL);
        return [...response.data];
    } catch (error:any) {
        return error.message;
    }
});


export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    },
    extraReducers(builder: any){
        builder.addCase(fetchUsers.fulfilled, (_state: any, action: any) => {
            return action.payload;
        })
    }
})

export const selectAllUsers = (state:any) => state.users