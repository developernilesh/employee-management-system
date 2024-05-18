import axios from "axios";
import { useEffect, useState } from "react";

const useEmpData = (url) => {
    const [empData, setEmpData] = useState([]);

    const fetchData = async () => {
      try {
        const res = await axios.get(`${url}/api/employee/currentUserEmployees`,{
            withCredentials:true
        })
        setEmpData(res.data)
        
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }

    useEffect(()=> {
        fetchData()
    },[])

    // console.log(empData);

    return {empData};
};

export default useEmpData;