import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { userSignin } from "../Redux/reduxThunk/userThunk";
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user= useSelector((store)=>store?.userSlice?.data)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await dispatch(userSignin(data));
    console.log(response);

    if (response.payload.status == 200) {
     navigate("/dashboard")
      toast.success("login successfull");
    } else {
      const errorMessage = response.payload?.response?.data?.message;

      if (errorMessage) {
        toast.error(errorMessage); // Show the custom error message from the response
      } else {
        toast.error("Something went wrong. Please try again."); // Default error message
      }
    }
  };

  const handleSingUp=()=>{
    navigate("/singup")
  }

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  });

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign In</h2>

        
      

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email address',
              },
            })}
            className={`w-full px-4 py-2 border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            className={`w-full px-4 py-2 border ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Role */}
      

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
        >
          Sign In
        </button>

        <p className="font-normal text-base mt-3 text-center">
                  Not Yet Registered?{" "}
                  <u
                    onClick={handleSingUp}
                    className="font-medium  cursor-pointer"
                  >
                     Sign Up
                  </u>{" "}
                </p>
      </form>
    </div>
  )
}

export default Login
