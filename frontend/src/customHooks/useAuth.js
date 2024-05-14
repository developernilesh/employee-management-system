import axios from "axios"
import { useEffect, useState } from "react"

export default () => {
    const [isLoggedIn,setIsLoggedIn] = useState()

    const verifyUserLogin = async() => {
        try {
            const res = await axios.get('/api/auth/isLoggedin')
            // console.log(res);
            const data = await res.data
            // console.log(data);
            setIsLoggedIn(data)
            // console.log(isLoggedIn);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
      verifyUserLogin()
    }, [isLoggedIn]);

    // console.log(isLoggedIn);

    return {isLoggedIn}
}