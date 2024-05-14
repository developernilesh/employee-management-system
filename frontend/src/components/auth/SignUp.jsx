import React from "react";
import Layout from "../Layout";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const SignUp = () => {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()

    const Signup = async(data) => {
        try {
            const res = await axios.post('/api/auth/signup', {...data})
            console.log("form response: ",res);
            navigate('/login')
            toast.success("Account created successfully")
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <Layout>
            <div className="w-full max-w-md rounded-lg py-10 px-6 lg:px-8 bg-slate-800">
                <div className="px-8">
                    <h2 className="text-center text-2xl font-bold leading-tight">Create a new account</h2>

                    <p className="mt-2 text-center text-base">
                        Already have an account?&nbsp;
                        <Link
                        to="/login"
                        className="font-medium text-indigo-500 transition-all duration-200 hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
                
                <form onSubmit={handleSubmit(Signup)} 
                className="mt-4 flex flex-col gap-2">
                    <div>
                        <label
                        htmlFor="name"
                        className="font-medium"
                        >Name:</label>
                        <input
                            className="flex w-full rounded-md border border-gray-600 bg-slate-900 py-2 px-3 
                            text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 
                            focus:ring-offset-1 text-gray-50 focus:ring-offset-gray-900"
                            type="text"
                            placeholder="Enter your name"
                            {...register("name")}
                        />
                    </div>

                    <div>
                        <label
                        htmlFor="email"
                        className="font-medium"
                        >Email:</label>
                        <input
                            className="flex w-full rounded-md border border-gray-600 bg-slate-900 py-2 px-3 
                            text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 
                            focus:ring-offset-1 text-gray-50 focus:ring-offset-gray-900"
                            type="email"
                            placeholder="Enter your email"
                            {...register("email")}
                        />
                    </div>

                    <div>
                        <label
                        htmlFor="password"
                        className="font-medium"
                        >Password:</label>
                        <input
                            className="flex w-full rounded-md border border-gray-600 bg-slate-900 py-2 px-3 
                            text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 
                            focus:ring-offset-1 text-gray-50 focus:ring-offset-gray-900"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password")}
                        />
                    </div>

                    <div>
                        <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center rounded-md bg-teal-600 px-3.5 py-1.5 text-base font-semibold text-white hover:bg-teal-500 mt-2"
                        >
                        Sign-Up
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

export default SignUp;
