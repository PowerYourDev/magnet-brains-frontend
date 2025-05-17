
import { createSlice } from '@reduxjs/toolkit';
import {userSignin,userLogOut,userSingUp,getAllusers} from "../reduxThunk/userThunk"



// Create the slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    loading: false,
    users:null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(userSignin.pending, (state) => {
        state.loading = true;
      })

      .addCase(userSignin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data.data;
        state.error = null;
      })
     
      .addCase(userSignin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(userSingUp.pending, (state) => {
        state.loading = true;
      })

      .addCase(userSingUp.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data.data;
        state.error = null;
      })
     
      .addCase(userSingUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getAllusers.pending, (state) => {
        state.loading = true;
      })

      .addCase(getAllusers.fulfilled, (state, action) => {
        state.loading = false;
        state. users= action.payload.data.data;
        state.error = null;
      })
     
      .addCase(getAllusers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(userLogOut.pending, (state) => {
        state.loading = true;
      })

      .addCase(userLogOut.fulfilled, (state) => {
        state.loading = false;
        state.data = null;
        state.error = null;
      })
     
      .addCase(userLogOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })



     


  },
});


export default userSlice.reducer;
