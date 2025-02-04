import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
// import axios from 'axios'

const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({ fullname, username, password, confirmpassword, gender }) => {
        const success = handleInputErrors({ fullname, username, password, confirmpassword, gender })
        if (!success) return;

        setLoading(true)

        try {
            const res = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials:"include",
                body: JSON.stringify({ fullname, username, password, confirmpassword, gender })
            })

            // const res = await axios.post("http://localhost:8000/api/auth/signup", 
            //     { fullname, username, password, confirmpassword, gender },
            //     {
            //         headers:{
            //             "Content-Type" : "application/json"
            //         },
            //         withCredentials:true,
            //     }
            // );

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            else {
                toast.success('Signed Up successfully');
            }
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
            console.log(data);
        }
        catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false);
        }
    }

    return { signup, loading };

}

export default useSignUp

function handleInputErrors({ fullname, username, password, confirmpassword, gender }) {
    if (!fullname || !username || !password || !confirmpassword || !gender) {
        toast.error('Please fill in all fields')
        return false;
    }

    if (password != confirmpassword) {
        toast.error('Passwords do not match');
        return false
    }

    if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return false;
    }
    return true;
}