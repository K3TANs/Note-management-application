import { Link } from "react-router-dom"
import GenderCheckbox from "./GenderCheckbox"
import { useState } from "react"
import useSignup from "../hooks/useSignup"

const Signup = () => {

    const [inputs, setInputs] = useState({
        fullname: '',
        username: '',
        password: '',
        confirmpassword: '',
        gender: '',
    })

    const { loading, signup } = useSignup();

    const handleCheckboxChange = (gender) => {
        setInputs({ ...inputs, gender });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
    }

    return (
        <div className="flex h-full items-center justify-center" >
            <div className="flex flex-col items-center justify-center min-w-96 mx-auto " >
                <div className="w-full p-6 rounded-lg shadow-md bg-purple-900 " >
                    <h1 className="text-3xl font-semibold text-center text-gray-300 " >
                        SignUp
                        <span className="text-blue-500" > NoteApp</span>
                    </h1>
                    <form onSubmit={handleSubmit} >
                        <div>
                            <label className="label p-2">
                                <span className="text-base label-text" >Full Name</span>
                            </label>
                            <input type="text" placeholder="Enter fullname" className="w-full input input-bordered h-10"
                                value={inputs.fullname}
                                onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })} />
                        </div>
                        <div>
                            <label className="label p-2">
                                <span className="text-base label-text" >Username</span>
                            </label>
                            <input type="text" placeholder="Enter username" className="w-full input input-bordered h-10"
                                value={inputs.username}
                                onChange={(e) => setInputs({ ...inputs, username: e.target.value })} />
                        </div>
                        <div>
                            <label className="label p-2">
                                <span className="text-base label-text" >Password</span>
                            </label>
                            <input type="password" placeholder="Enter password" className="w-full input input-bordered h-10"
                                value={inputs.password}
                                onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
                        </div>
                        <div>
                            <label className="label p-2">
                                <span className="text-base label-text" >Confirm Password</span>
                            </label>
                            <input type="password" placeholder="Enter password" className="w-full input input-bordered h-10"
                                value={inputs.confirmpassword}
                                onChange={(e) => setInputs({ ...inputs, confirmpassword: e.target.value })} />
                        </div>
                        <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />
                        <Link to='/login' className="'text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
                            Already have an account?
                        </Link>
                        <div>
                            <button className="btn btn-block btn-sm mt-2" disabled={loading} >
                                {loading ? <span className="loading loading-spinner" ></span> : "Sign Up"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup