import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utilis/constant";

export const getAllTasks=createAsyncThunk('task/get-all-tasks',async({ page = 1, limit = 10 },{rejectWithValue})=>{
  try{
     const response = await axios.get(`${BASE_URL}/api/task/admin/get-all-tasks?page=${page}&limit=${limit}`,{withCredentials:true})
     console.log(response,"dd")
     return response
  }catch(error){
    console.log(error)
    return rejectWithValue(error);

  }
})

export const getAllUserTasks=createAsyncThunk('task/get-all-user-tasks',async({ page = 1, limit = 10 },{rejectWithValue})=>{
    try{
       const response = await axios.get(`${BASE_URL}/api/task/admin/get-all-user-tasks?page=${page}&limit=${limit}`,{withCredentials:true})
       console.log(response,"dd")
       return response
    }catch(error){
      console.log(error)
      return rejectWithValue(error);
  
    }
  })