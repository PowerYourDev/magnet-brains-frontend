import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Header from "../../Components/Header";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../utilis/constant";
import { useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi"; 
import { toast } from "react-toastify";

const EditTask = () => {
  const { id } = useParams();
  const users = useSelector((store) => store?.userSlice?.users);

  const [taskState, setTaskState] = useState({
    data: null,
    error: null,
    loading: true,
  });

  const [isEditing, setIsEditing] = useState(false); 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/task/admin/get-task/${id}`, {
          withCredentials: true,
        });

        const task = response.data.data;

        setTaskState({
          data: task,
          error: null,
          loading: false,
        });

        reset({
          title: task.title,
          description: task.description,
          dueDate: task.dueDate?.split("T")[0],
          priority: task.priority,
          status: task.status,
          assignedTo: task.assignedTo,
        });
      } catch (error) {
        setTaskState({
          data: null,
          error: error.message || "Something went wrong",
          loading: false,
        });
      }
    };

    fetchTask();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      await axios.patch(`${BASE_URL}/api/task/admin/update-task/${id}`, data, {
        withCredentials: true,
      });
      toast.success("✅ Task updated successfully");
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating task:", err);
      toast.error("Failed to update task");
    }
  };

  if (taskState.loading) return <p>Loading...</p>;
  if (taskState.error) return <p className="text-red-500">{taskState.error}</p>;

  return (
    <div>
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Task Details</h2>
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-800 flex items-center cursor-pointer"
              >
                <FiEdit className="mr-1" /> Edit
              </button>
            )}
          </div>

          {/* Title */}
          <div className="mb-3">
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full border border-gray-300 rounded p-2"
              readOnly={!isEditing}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              {...register("description", { required: "Description is required" })}
              className="w-full border border-gray-300 rounded p-2"
              readOnly={!isEditing}
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
              disabled={!isEditing}
            />
            {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate.message}</p>}
          </div>

          {/* Priority */}
          <div className="mb-3">
            <label className="block font-semibold mb-1">Priority</label>
            <select
              {...register("priority", { required: "Priority is required" })}
              className="w-full border border-gray-300 rounded p-2"
              disabled={!isEditing}
            >
              <option value="">Select priority</option>
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
              disabled={!isEditing}
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
              disabled={!isEditing}
            >
              <option value="">Select a user</option>
              {users?.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.userName} {user.role === "Admin" ? "🛡️" : "👤"}
                </option>
              ))}
            </select>
            {errors.assignedTo && <p className="text-red-500 text-sm">{errors.assignedTo.message}</p>}
          </div>

          {/* Update Button (only visible in edit mode) */}
          {isEditing && (
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              Update Task
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditTask;
