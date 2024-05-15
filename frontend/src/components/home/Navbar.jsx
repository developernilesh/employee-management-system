import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEdit3 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [userInfo,setUserInfo] = useState('')
    const navigate = useNavigate()

    const url = `${String(import.meta.env.VITE_BACKEND_URL)}`

    const getuserInfo = async() => {
        try {
            const res = await axios.get(`${url}/api/user/prof`,{
                withCredentials: true // Include credentials (cookies) in the request
            })
            const userData = await res.data;
            setUserInfo(userData);

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


    const handleLogout = async() => {
        try {
            const res = await axios.get(`${url}/api/auth/logout`,{
                withCredentials: true // Include credentials (cookies) in the request
            })
            const data = res.data;
            toast.success(data.message)
            navigate('/login')
            
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    

    return (
        <div className="flex justify-between items-center py-3">
            <div className="flex gap-2 items-start">
                <div className="mt-1 rounded-full w-[45px]">
                    <img src={`https://api.dicebear.com/5.x/initials/svg?seed=${userInfo.name}`}
                        className="w-full rounded-full"
                    />
                </div>
                <div className="flex flex-col items-start font-medium">
                    <div>{userInfo.name}</div>
                    <div>{userInfo.email}</div>
                    <Link to='/edit-profile'>
                        <div className="text-pink-500 flex items-center gap-1 hover:underline">
                            <div>Edit profile</div>
                            <FiEdit3/>
                        </div>
                    </Link>
                    
                </div>
            </div>

            <div>
                <button onClick={handleLogout}
                className="py-1.5 px-3 rounded-md font-medium bg-yellow-400 text-slate-900
                hover:bg-yellow-300 transition-all ease-in-out duration-200">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;
