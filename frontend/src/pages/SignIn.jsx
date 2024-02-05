import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
    const [request, setRequest] = useState({});
    const[errors, setErrors] = useState("");
    const[loading, setLoading] = useState(false);
    const navigate = useNavigate(); // navigate disini untuk menavigasi setelah login akan kemana

    const handleChange = () => {
        setRequest({
            username : document.getElementById("username").value,
            password : document.getElementById("password").value,
        });
        console.log(request);
    }

    const handleClick = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const response = await fetch("/api/users/login", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(request)
            });
            
            const data = await response.json();
            if(data.errors) {
                setErrors(data.errors);
            }
            setLoading(false);

            if(!data.errors){
                navigate("/profile");
            }
        } catch (e) {
            console.log(e);
        }

        
    }

    return (
        <div className="max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-bold my-6">Sign In</h1>
            <form className="flex flex-col gap-4">
                <input className="bg-slate-100 p-3 rounded-lg" onChange={handleChange} type="text" id="username" name="username" placeholder="Username" />
                <input className="bg-slate-100 p-3 rounded-lg" onChange={handleChange} type="password" id="password" name="password" placeholder="Password" />
                <button disabled={loading} onClick={handleClick} className="bg-slate-800 p-3 rounded-lg text-white hover:opacity-95">{loading ? "Loading..." : "Sign in" }</button>
            </form>
            <p className="text-center text-red-500">{errors ? errors : ""}</p>
            <div className="flex gap-2 mt-5 justify-center">
                <p>Don&apos;t have account?</p>
                <Link to="/sign-up">
                    <span className="text-blue-500">Sign up</span>
                </Link>
            </div>
        </div>
    )
}
