import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getAllusers } from "../../Redux/reduxThunk/userThunk";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../utilis/constant";
import axios from "axios";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

import Header from "../../Components/Header";

const TaskForm = () => {
    const dispatch=useDispatch()
    // const navigate=useNavigate()
    const users= useSelector((store)=>store?.userSlice?.users)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/task/admin/create`, data,  { withCredentials: true });
      console.log(response) 
       if (response.status == 201) {
        
            toast.success("task saved succesfully successfull");
            reset()
          } 
     
    
    } catch (error) {

        toast.error("something went wrong ,please try again"+ " "+ error.message );
    
    }
  };



  useEffect(()=>{
    dispatch(getAllusers())
  },[])

  return (
    <div className="h-screen flex flex-col">
        <Header/>
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)}     className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
        {/* Title */}
        <div className="mb-3">
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full border border-gray-300 rounded p-2"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="w-full border border-gray-300 rounded p-2"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Due Date */}
        <div className="mb-3">
          <label className="block font-semibold mb-1">Due Date</label>
          <input
            type="date"
            {...register("dueDate", { required: "Due date is required" })}
            className="w-full border border-gray-300 rounded p-2"
          />
          {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate.message}</p>}
        </div>

        <div className="mb-3">
          <label className="block font-semibold mb-1">priority</label>
          <select
  {...register("priority", { required: "Priority is required" })}
  className="w-full border border-gray-300 rounded p-2"
>
  <option value="" disabled hidden>Select priority</option>
  <option value="High">High</option>
  <option value="Medium">Medium</option>
  <option value="Low">Low</option>
</select>
          {errors.priority && <p className="text-red-500 text-sm">{errors.priority.message}</p>}

        </div>

        {/* Status */}
        <div className="mb-3">
          <label className="block font-semibold mb-1">Status</label>
          <select
            {...register("status", { required: "Status is required" })}
            className="w-full border border-gray-300 rounded p-2"
          >
            <option value="">Select status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
        </div>

        {/* Assigned To */}
        <div className="mb-4">
  <label className="block font-semibold mb-1">Assigned To</label>
  <select
    {...register("assignedTo", { required: "AssignedTo is required" })}
    className="w-full border border-gray-300 rounded p-2"
  >
    <option value="">Select a user</option>
    {users && users?.map((user) => (
      <option key={user._id} value={user._id} className="flex justify-between" >
        {user.userName} {user.role === "Admin" ? "🛡️" : "👤"}
      </option>
    ))}
  </select>
  {errors.assignedTo && (
    <p className="text-red-500 text-sm">{errors.assignedTo.message}</p>
  )}
  </div>

        

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Create Task
        </button>
      </form>
    </div>
    </div>
  );
};

export default TaskForm;
