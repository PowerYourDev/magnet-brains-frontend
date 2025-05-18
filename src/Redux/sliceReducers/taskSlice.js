
import { createSlice } from '@reduxjs/toolkit';
import {getAllTasks,getAllUserTasks} from "../reduxThunk/taskThunk"



// Create the slice
const taskSlice = createSlice({
  name: 'Task',
  initialState: {
    data: null,
    loading: false,
    userTask:null,

    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getAllTasks.pending, (state) => {
        state.loading = true;
      })

      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
      })
     
      .addCase(getAllTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getAllUserTasks.pending, (state) => {
        state.loading = true;
      })

      .addCase(getAllUserTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.userTask = action.payload.data;
        state.error = null;
      })
     
      .addCase(getAllUserTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

     



     


  },
});

export default taskSlice.reducer;