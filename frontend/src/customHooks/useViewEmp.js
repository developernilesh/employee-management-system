import { useEffect, useState } from "react";
import useEmpData from "./useEmpData";
import toast from "react-hot-toast";

const useViewEmp = (url,id) => {
    const [viewEmpData, setViewEmpData] = useState([]);
    const [emps, setEmps] = useState([])

    const {empData} = useEmpData(url)

    const getEmps = async() => {
        try {
            setEmps(empData)

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

    const viewEmp = async() => {
        try {
            if(emps.length !== 0) setViewEmpData(emps.find(emp => emp._id === id))

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
        viewEmp()
    },[empData,emps])

    return {viewEmpData};
};

export default useViewEmp;