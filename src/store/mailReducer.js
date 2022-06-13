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
            state.mails = action.payload;
        }
    }
});

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;