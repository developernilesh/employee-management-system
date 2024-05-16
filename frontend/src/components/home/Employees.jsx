import React, { useEffect, useState } from "react";
import { url } from "../../config/url";
import axios from "axios"
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";

const Employees = () => {
  const [emps, setEmps] = useState([])

  const getEmps = async() => {
    try {
      const res = await axios.get(`${url}/api/employee/currentUserEmployees`,{
        withCredentials:true
      })
      const empsData = res.data;
      setEmps(empsData)

    } catch (error) {
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
    getEmps()
  },[])

  return (
    <div className="w-full h-full flex flex-col justify-center items-center mt-5 px-5">
      <div className="w-full flex justify-end">
        <Link to='/addEmployee'>
          <button
            className="linear flex flex-row gap-1 justify-end items-center rounded-md bg-gradient-to-br from-indigo-600 to-indigo-800 px-3 py-2 text-base font-medium text-white transition duration-200 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
            data-ripple-light
          >
            <div>Add Employee</div>
            <IoMdAddCircleOutline className="mt-1"/>
          </button>
        </Link>
      </div>

      <div>
        {
          (emps.length) === 0 ? 
          (<p>No Employees to show</p>) : 
          (<p>All Emps</p>)
        }
      </div>
    </div>);
};

export default Employees;
