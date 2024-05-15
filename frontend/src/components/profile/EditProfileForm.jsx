import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { FaUserAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const EditProfileForm = () => {
    const {register, handleSubmit, setValue} = useForm()
    const navigate = useNavigate()
    const [userInfo,setUserInfo] = useState('')

    const url = `${String(import.meta.env.VITE_BACKEND_URL)}`
      
    const getuserInfo = async() => {
        try {
            const res = await axios.get(`${url}/api/user/prof`,{
                withCredentials: true // Include credentials (cookies) in the request
            })
            const userData = await res.data;
            setUserInfo(userData)
            // Setting form values after fetching user data
            setValue("name", userData.name);
            setValue("email", userData.email);
  
        } catch (error) {
            if (error.response) {
                console.error(error.response.data);
                toast.error((error.response.data.message) ? (error.response.data.message):("Cannot fetch user data"));
            } else if (error.request) {
                console.error(error.request);
                toast.error("Network error. Please try again.");
            } else {
                console.error('Error', error.message);
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    }
      
    useEffect(() => {
      getuserInfo()
    }, []);
      
    const updateProf = async (data) => {
      try {
        const res = await axios.put(`${url}/api/user/prof`,{...data},{
            withCredentials: true // Include credentials (cookies) in the request
        });
        // console.log(res);
        toast.success("Profile updated successfully");
        navigate('/');
  
      } catch (error) {
        console.error('Error updating profile:', error);
        toast.error("Failed to update profile. Please try again.");
      }
    };
      
    return (
      <Layout className="flex justify-center items-center ">
        <div className="w-full max-w-md rounded-lg py-10 px-6 lg:px-8 bg-slate-900">
            <div className="flex flex-col items-center">
                <div className="text-xl font-bold">Edit Your Profile</div>
    
                <div className="mt-1 w-[70px] rounded-full text-center">
                    <img src={`https://api.dicebear.com/5.x/initials/svg?seed=${userInfo.name}`}
                        className="w-full rounded-full"
                    />
                </div>
            </div>
      
            <form onSubmit={handleSubmit(updateProf)} 
            className="mt-4 flex flex-col gap-2">
                <div>
                    <label
                    htmlFor="name"
                    className="font-medium"
                    >Name:</label>
                    <input
                        className="flex w-full rounded-md border border-gray-600 bg-slate-950 py-2 px-3 
                        placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 
                        focus:ring-offset-1 text-gray-50 focus:ring-offset-gray-900"
                        type="name"
                        placeholder="Enter your name"
                        {...register("name")}
                    />
                </div>
      
                <div>
                    <label
                    htmlFor="email"
                    className="font-medium"
                    >Password:</label>
                    <input
                        className="flex w-full rounded-md border border-gray-600 bg-slate-950 py-2 px-3 
                        placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 
                        focus:ring-offset-1 text-gray-50 focus:ring-offset-gray-900"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email")}
                    />
                </div>
      
                <div>
                    <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-teal-600 px-3.5 py-1.5 text-base font-medium text-white hover:bg-teal-500 mt-2"
                    >
                    Save
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="ml-2 h-4 w-4"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                        />
                    </svg>
                    </button>
                </div>
            </form>
        </div>
      </Layout>
    );
};

export default EditProfileForm;
