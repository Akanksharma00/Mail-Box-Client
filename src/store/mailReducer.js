import { createSlice } from "@reduxjs/toolkit";

const initialMailState = {
    receivedMails: [],
    sentMails: [],
    isLoading: false
}

const mailSlice = createSlice({
    name: 'mail',
    initialState: initialMailState,
    reducers:{
        setLoading(state,action){
            state.isLoading = action.payload;
        },
        setReceivedMail(state,action){
            state.receivedMails = [...action.payload];
        },
        setSentMail(state,action){
            state.sentMails = [...action.payload];
        }
    }
});

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;