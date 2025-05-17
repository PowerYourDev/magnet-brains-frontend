import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utilis/constant";

export const userSignin = createAsyncThunk(
    'auth/signin', 
    async (userCredentials, { rejectWithValue }) => {
      try {
  
        const response = await axios.post(
          `${BASE_URL}/api/auth/singin`,
          {email:userCredentials.email,password:userCredentials.password},
          { withCredentials: true }
        );
  
   
        return response;
      } catch (error) {
         console.log(error)
        return rejectWithValue(error);
      }
    }
  );


  export const userSingUp=createAsyncThunk('user/singup',async(formData,{rejectWithValue})=>{
    try{
       const response = await axios.post(`${BASE_URL}/api/auth/singup`,formData,{withCredentials:true})
       return response
    }catch(error){
      console.log(error)
      return rejectWithValue(error);

    }
  })

  export const getAllusers=createAsyncThunk('user/get-all-users',async(formData,{rejectWithValue})=>{
    try{
       const response = await axios.get(`${BASE_URL}/api/auth/get-all-users`,{withCredentials:true})
       return response
    }catch(error){
      console.log(error)
      return rejectWithValue(error);

    }
  })



  export const userLogOut=createAsyncThunk('auth/logout',async(_,{rejectWithValue})=>{
    try{
        const response=await axios.post(`${BASE_URL}/api/auth/logout`,{}, { withCredentials: true })
        return response.data
    }catch( error){
        return rejectWithValue(error);
    }

  })

