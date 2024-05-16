import React from "react";
import { useForm } from "react-hook-form";

const AddEmpForm = () => {
    const { register, handleSubmit } = useForm()

    const AddEmp = () => {

    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center py-10">
                <div className="w-full max-w-md rounded-lg py-10 px-6 lg:px-8 bg-slate-900">
                    <div>
                        Add New Employee
                    </div>

                    <form onSubmit={handleSubmit(AddEmp)} 
                    className="mt-4 flex flex-col gap-2 text-gray-100">
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
                                type="email"
                                placeholder="Enter your phone no"
                                {...register("phn")}
                            />
                        </div>

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
                    </form>
                </div>
        </div>
    );
};

export default AddEmpForm;
