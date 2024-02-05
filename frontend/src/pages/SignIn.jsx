import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
    const [request, setRequest] = useState({});
    // TODO loading states
    // TODO errors states

    const handleChange = () => {
        setRequest({
            username : document.getElementById("username").value,
            password : document.getElementById("password").value,
        });
        console.log(request);
    }

    const handleClick = async () => {
        // TODO login
    }

    return (
        <div className="max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-bold my-6">Sign In</h1>
            <form className="flex flex-col gap-4">
                <input className="bg-slate-100 p-3 rounded-lg" onChange={handleChange} type="text" id="username" name="username" placeholder="Username" />
                <input className="bg-slate-100 p-3 rounded-lg" onChange={handleChange} type="password" id="password" name="password" placeholder="Password" />
                <button onClick={handleClick} className="bg-slate-800 p-3 rounded-lg text-white">Sign in</button>
            </form>
            <div className="flex gap-2 mt-5 justify-center">
                <p>Don&apos;t have account?</p>
                <Link to="/sign-up">
                    <span className="text-blue-500">Sign up</span>
                </Link>
            </div>
        </div>
    )
}
