import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isLoggedIn: false,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers:{
        login(state, action){
            state.token = action.payload;
            state.isLoggedIn = true;
        },
        logout(state){
            state.token = null;
            state.isLoggedIn = false;
        }
    }
});



export const authActions = authSlice.actions;

export default authSlice.reducer;