import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEdit3 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import useUserData from "../../customHooks/useUserData";
import { url } from "../../config/url";

const Navbar = () => {
    const [userInfo,setUserInfo] = useState('')
    const navigate = useNavigate()

    const {userData} = useUserData(url)

    const getuserInfo = async() => {
        try {
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
    }, [userData]);


    const handleLogout = async() => {
        try {
            const res = await axios.post(`${url}/api/auth/logout`,{
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
        <div className="w-full flex justify-between items-center pt-1">
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
                className="linear flex flex-row gap-1 justify-end items-center rounded-md 
                bg-gradient-to-br from-yellow-200 to-yellow-500 px-5 py-1.5 text-lg 
                font-bold text-slate-950 transition duration-200 hover:shadow-[0_1px_10px_rgba(255,255,255,0.3)]">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;
