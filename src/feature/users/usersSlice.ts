import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    { id : 0, name: 'Select Author'},
    { id : 1, name: 'Dhaniela Grace Alba Serundo'},
    { id : 2, name: 'Mark Gregory Alba Serundo'},
    { id : 3, name: 'Jeric Yap Alba Serundo' }
]

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    }
})

export const selectAllusers = (state:any) => state.users