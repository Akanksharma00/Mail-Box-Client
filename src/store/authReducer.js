import { createSlice } from "@reduxjs/toolkit";

const initalToken = localStorage.getItem('token');

const initialAuthState = {
    token: initalToken,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers:{
        login(state, action){
            state.token = action.payload;
        },
        logout(state){
            state.token = null;
        }
    }
});



export const authActions = authSlice.actions;

export default authSlice.reducer;