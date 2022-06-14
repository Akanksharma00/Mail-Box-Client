import { createSlice } from "@reduxjs/toolkit";

const initialMailState = {
    mails: [],
    isLoading: false
}

const mailSlice = createSlice({
    name: 'mail',
    initialState: initialMailState,
    reducers:{
        setLoading(state,action){
            state.isLoading = action.payload;
        },
        setMail(state,action){
            console.log(action.payload);
            state.mails = [...action.payload];
            console.log(state.mails)
        }
    }
});

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;