import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async ({ username, password }) => {

        if (!username || !password) {
            toast.error("Please fill in all field");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                    credentials:"include",
                }
            )

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            else {
                toast.success("Login Successfully");
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

    return { login, loading }
}

export default useLogin