import axios from "axios"
import { useEffect, useState } from "react"
import { url } from "../config/url"

export default () => {
    const [isLoggedIn,setIsLoggedIn] = useState()

    const verifyUserLogin = async() => {
        try {
            const res = await axios.get(`${url}/api/auth/isLoggedin`,{
                withCredentials: true // Include credentials (cookies) in the request
            })
            // console.log(res);

            const data = await res.data.success
            // console.log("data",data);

            setIsLoggedIn(data)
            // console.log(isLoggedIn);
            
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
      verifyUserLogin()
    }, []);

    // console.log("isLoggedIn",isLoggedIn);

    return {isLoggedIn}
}