import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth.jsx";
import swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { signInFailed, signInStart, signUpSuccess } from "../redux/user/userSlice.js";
export default function SignUp() {
    const [formData, setFormData] = useState({}); // state untuk form data
    const { loading } = useSelector((state) => state.user);
    const navigate = useNavigate(); // navigate disini untuk menavigasi setelah login akan kemana
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }


    // ! Mengirim data ke backend
    const handleSubmit = async (event) => {
        event.preventDefault(); // disable refresh
        try {
            dispatch(signInStart());
            const response = await fetch("/v1/api/users", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            if (data.errors) {
                swal.fire({
                    title: "Errors",
                    text: data.errors,
                    icon: "error",
                    customClass: 'bg-slate-900 text-purple rounded-xl'
                });
                dispatch(signInFailed());
            }
            if (!data.errors) {
                swal.fire({
                    title: "Success",
                    text: "Sign up success",
                    icon: "success",
                    customClass: 'bg-slate-900 text-purple rounded-xl'
                });
                dispatch(signUpSuccess());
                navigate("/sign-in");
            }
        } catch (e) {
            console.log(e);
            dispatch(signInFailed());
        }


    }

    console.log(formData);
    return (
        <div className="max-w-lg px-4 mx-auto mb-10 mt-28">
            <h1 className="my-16 text-3xl font-bold text-center font-rubik">Daftar</h1>
            {/* Ketika di submit akan menjalan function  */}
            <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-4">
                <input type="text" name="username" id="username" placeholder="Username" className="p-3 bg-slate-100 rounded-xl" onChange={handleChange} />
                <input type="text" name="email" id="email" placeholder="Email" className="p-3 bg-slate-100 rounded-xl" onChange={handleChange} />
                <input type="text" name="name" id="name" placeholder="Name" className="p-3 bg-slate-100 rounded-xl" onChange={handleChange} />
                <input type="password" name="password" id="password" placeholder="Password" className="p-3 bg-slate-100 rounded-xl" onChange={handleChange} />
                {/* jika loading true maka akan di disabled */}
                <button disabled={loading} className="p-3 text-white bg-slate-800 rounded-xl hover:opacity-95">
                    {/* jika tidak di klik maka loading akan false dan jika di klik loading akan true */}
                    {loading ? "Loading..." : "Daftar"}
                </button>
                <OAuth />
            </form>
            <p className="mt-4 text-center text-red-500">
                {/* {errors ? errors : ""} */}
            </p>
            <div className="flex justify-center gap-2 mt-5" id="foot">
                <p>Sudah punya akun?</p>
                <Link to="/sign-in">
                    <span className="text-blue-500">Masuk</span>
                </Link>
            </div>
        </div>
    )
}
