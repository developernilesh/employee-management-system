import React, { useEffect, useState } from "react";
import { url } from "../../config/url";
import axios from "axios"
import toast from "react-hot-toast";
import EmployeeTable from "../manageEmps/EmployeeTable";
import useEmpData from "../../customHooks/useEmpData";
import { Link } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";

const Employees = () => {
  const [emps, setEmps] = useState([])
  const [loading, setLoading] = useState('')

  const {empData} = useEmpData(url)

  // console.log(empData);

  useEffect(() => {
    const getEmps = async () => {
      setLoading(true);
      try {
        setEmps(empData);
      } catch (error) {
        handleFetchError(error);
      }
      setLoading(false);
    };

    getEmps();
  }, [empData]);

  const handleFetchError = (error) => {
    if (error.response) {
      console.error(error.response.data);
      toast.error(error.response.data.message);
    } else if (error.request) {
      console.error(error.request);
      toast.error("Network error. Please try again.");
    } else {
      console.error("Error", error.message);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const deleteEmp = async(id) => {
    try {
      await axios.delete(`${url}/api/employee/deleteEmployee/${id}`,{withCredentials:true})
      toast.success("Employee Deleted Successfully")
      // setEmps(emps.filter(emp => emp._id !== id))
      setEmps((prevEmps) => prevEmps.filter((emp) => emp._id !== id));

    } catch (error) {
      handleFetchError(error);
    }
  }

  console.log(emps);

  return (
    <div className="w-full h-full flex justify-center items-center px-5 mt-5">
        { 
          !loading ? 
          ( 
            <div className="w-full h-full justify-center items-center px-5">
              <div className="w-full lg:w-11/12 mx-auto text-gray-200">
                <div className="w-full flex items-end justify-between pb-4">
                  <div className="pl-1 text-lg md:text-xl font-semibold md:font-bold text-gray-200 italic">
                    Your Employees:
                  </div>

                  <div>
                    <Link to='/addEmployee'>
                      <button
                        className="flex flex-row gap-1 justify-end items-center rounded-md bg-gradient-to-br from-indigo-600 to-indigo-800 
                        px-3 py-2 text-base font-medium text-white transition duration-200 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                      >
                        <div>Add Employee</div>
                        <IoMdAddCircleOutline className="mt-1"/>
                      </button>
                    </Link>
                  </div>
                </div>
                {
                  emps.length === 0 ? (
                    <table className="w-full">
                      <thead>
                       <tr className="text-center bg-slate-900">
                         <th className="py-3 border border-gray-300">Sl.No.</th>
                         <th className="py-3 border border-gray-300">Full Name</th>
                         <th className="py-3 border border-gray-300">Email</th>
                         <th className="py-3 border border-gray-300">Phone</th>
                         <th className="py-3 border border-gray-300">Gender</th>
                         <th className="py-3 border border-gray-300">Country</th>
                         <th className="py-3 border border-gray-300">Status</th>
                         <th className="py-3 border border-gray-300">Added On</th>
                         <th className="py-3 border border-gray-300">Actions</th>
                       </tr>
                     </thead>
                    </table>
                  ) : (
                    (<EmployeeTable emps={emps} deleteEmp={deleteEmp}/>)
                  )
                }
              </div>
            </div>
            
          ) : 
          (
            <button disabled type="button" className="mt-[20vh] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
              <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
              </svg>
              Loading...
            </button>
          )
        }
    </div>);
};

export default Employees;
