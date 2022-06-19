import { createSlice } from "@reduxjs/toolkit";

const initialMailState = {
    receivedMails: [],
    sentMails: [],
    // starredMails: [],
    noOfUnreadMail : 0,
    // isStarred: false,
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
        setNoOfUnreadMail(state,action){
            state.noOfUnreadMail = action.payload;
        },
        setSentMail(state,action){
            state.sentMails = [...action.payload];
        },
        // setStarred(state){
        //     state.isStarred = !state.isStarred
        // },
        // setStarredMails(state,action){
        //     state.starredMails = [...state.starredMails];
        // }
    }
});

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;