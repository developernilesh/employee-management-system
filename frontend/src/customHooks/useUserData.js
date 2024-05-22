import axios from "axios";
import { useEffect, useState } from "react";

const useUserData = (url) => {
    const [userData, setUserData] = useState('');

    const fetchData = async () => {
        try {
          const res = await axios.get(`${url}/api/user/prof`, { withCredentials: true });
          const data = res.data;
          setUserData(data)
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
    }

    useEffect(()=> {
        fetchData()
    },[])

    return {userData};
};

export default useUserData;
