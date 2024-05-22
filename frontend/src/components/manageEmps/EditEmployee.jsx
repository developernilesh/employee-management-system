import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { url } from "../../config/url";
import useViewEmp from "../../customHooks/useViewEmp";
import axios from "axios";
import toast from "react-hot-toast";

const EditEmployee = () => {
    const { id } = useParams();
    const {register, handleSubmit, setValue} = useForm()
    const [err, setErr] = useState('')
    const navigate = useNavigate();

    const {viewEmpData} = useViewEmp(url,id)

    const getEmpInfo = () => {
        try {
            if(!viewEmpData) return;

            setValue("firstName", viewEmpData.firstName)
            setValue("lastName", viewEmpData.lastName)
            setValue("email", viewEmpData.email)
            setValue("phn", viewEmpData.phn)
            setValue("gender", viewEmpData.gender)
            setValue("country", viewEmpData.country)
            setValue("status", viewEmpData.status)
            
        } catch (error) {
            console.error(error)
            if (error.response) {
                console.error(error.response.data);
                toast.error(error.response.data.message);
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
        getEmpInfo()
    },[viewEmpData])

    const EditEmp = async(data) => {
        try {
            await axios.put(`${url}/api/employee/updateEmployee/${id}`,{...data},{withCredentials:true})
            navigate('/')
            toast.success('Employee updated successfully')
            
        } catch (error) {
            if (error.response) {
                console.error(error.response.data);
                if(error.response.data.message==="Something went wrong while verifying the token"){
                    toast.error("User Session Expired")
                    navigate('/login')
                }else{
                setErr(error.response.data.message);
                }
            } else if (error.request) {
              console.error(error.request);
              setErr("Network error. Please try again.");
            } else {
              console.error('Error', error.message);
              setErr("An unexpected error occurred. Please try again.");
            }
        }
    }

    return (
        <Layout className="flex justify-center items-center">
            <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl rounded-lg py-10 px-6 lg:px-8 bg-slate-900">
                    <div>
                        <div className="text-xl text-center font-bold text-purple-400 md:text-2xl md:text-left italic">
                            Update Employee
                        </div>
                        {err && <div className="text-red-500 text-center md:text-left mt-2">{err}</div>}
                    </div>

                    <form onSubmit={handleSubmit(EditEmp)} 
                    className="mt-4 flex flex-col md:flex-row gap-2 md:gap-6 lg:gap-8 text-gray-100">
                    <div className="w-full flex flex-col gap-2">
                        <div>
                            <label
                            htmlFor="firstName"
                            className="font-medium"
                            >First Name:</label>
                            <input
                                className="flex w-full rounded-md border border-gray-600 bg-slate-950 py-2 px-3 
                                placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 
                                focus:ring-offset-1 text-gray-50 focus:ring-offset-gray-900"
                                type="text"
                                placeholder="Enter your first Name"
                                {...register("firstName")}
                            />
                        </div>

                        <div>
                            <label
                            htmlFor="lastName"
                            className="font-medium"
                            >Last Name:</label>
                            <input
                                className="flex w-full rounded-md border border-gray-600 bg-slate-950 py-2 px-3 
                                placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 
                                focus:ring-offset-1 text-gray-50 focus:ring-offset-gray-900"
                                type="text"
                                placeholder="Enter your last name"
                                {...register("lastName")}
                            />
                        </div>

                        <div>
                            <label
                            htmlFor="email"
                            className="font-medium"
                            >Email:</label>
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
                            <label
                            htmlFor="phn"
                            className="font-medium"
                            >Phone No:</label>
                            <input
                                className="flex w-full rounded-md border border-gray-600 bg-slate-950 py-2 px-3 
                                placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 
                                focus:ring-offset-1 text-gray-50 focus:ring-offset-gray-900"
                                type="text"
                                placeholder="Enter your phone no"
                                {...register("phn")}
                            />
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-2">
                        <div>
                            <label
                            htmlFor="gender"
                            className="font-medium"
                            >Gender:</label>
                            <select 
                            className="flex w-full rounded-md border border-gray-600 bg-slate-950 py-2 px-3 
                            placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 
                            focus:ring-offset-1 text-gray-50 focus:ring-offset-gray-900"
                            {...register("gender")} defaultValue="Male">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label
                            htmlFor="country"
                            className="font-medium"
                            >Country:</label>
                            <input
                                className="flex w-full rounded-md border border-gray-600 bg-slate-950 py-2 px-3 
                                placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 
                                focus:ring-offset-1 text-gray-50 focus:ring-offset-gray-900"
                                type="text"
                                placeholder="Enter your country"
                                {...register("country")}
                            />
                        </div>

                        <div>
                            <label
                            htmlFor="status"
                            className="font-medium"
                            >Status:</label>
                            <select 
                            className="flex w-full rounded-md border border-gray-600 bg-slate-950 py-2 px-3 
                            placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 
                            focus:ring-offset-1 text-gray-50 focus:ring-offset-gray-900"
                            {...register("status")} defaultValue="Working">
                                <option value="Working">Working</option>
                                <option value="Resigned">Resigned</option>
                            </select>
                        </div>

                        <div className="mt-2 md:mt-[17px]">
                            <button
                                type="submit"
                                className="inline-flex w-full items-center justify-center rounded-md bg-teal-600 px-3.5 py-2 text-base font-medium text-white hover:bg-teal-500 mt-2"
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
                    </div>
                    </form>
                </div>
        </Layout>
    );
};

export default EditEmployee;
