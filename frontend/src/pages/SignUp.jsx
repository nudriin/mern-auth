import { useState } from "react";
import { Link } from "react-router-dom";
export default function SignUp() {
    const [formData, setFormData] = useState({}); // state untuk form data
    const [errors, setErrors] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = () => {
        setFormData({
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            name: document.getElementById("name").value,
            password: document.getElementById("password").value
        });
    }


    // ! Mengirim data ke backend
    const handleSubmit = async (event) => {
        event.preventDefault(); // disable refresh
        setLoading(true); // membuat loadingnya jadi true
        const res = await fetch("/api/users", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        const data = await res.json();

        if (data.errors) {
            setErrors(data.errors); // set errorsnya dengan data errors
        }
        setLoading(false); // ketika selesai loadingnyafalse


    }

    console.log(formData);
    return (
        <div className="max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-bold my-6">Sign Up</h1>
            {/* Ketika di submit akan menjalan function  */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 justify-center">
                <input type="text" name="username" id="username" placeholder="Username" className="bg-slate-100 py-2 px-3 rounded-lg" onChange={handleChange} />
                <input type="text" name="email" id="email" placeholder="Email" className="bg-slate-100 py-2 px-3 rounded-lg" onChange={handleChange} />
                <input type="text" name="name" id="name" placeholder="Name" className="bg-slate-100 py-2 px-3 rounded-lg" onChange={handleChange} />
                <input type="password" name="password" id="password" placeholder="Password" className="bg-slate-100 py-2 px-3 rounded-lg" onChange={handleChange} />
                {/* jika loading true maka akan di disabled */}
                <button disabled={loading} className="bg-slate-800 text-white p-2 rounded-lg hover:opacity-95">
                    {/* jika tidak di klik maka loading akan false dan jika di klik loading akan true */}
                    {loading ? "Loading..." : "Sign up"}
                </button>
            </form>
            <p className="text-red-500 text-center mt-4">
                {errors ? errors : ""}
            </p>
            <div className="flex gap-2 mt-5 justify-center" id="foot">
                <p>Have an account?</p>
                <Link to="/sign-in">
                    <span className="text-blue-500">Sign in</span>
                </Link>
            </div>
        </div>
    )
}
