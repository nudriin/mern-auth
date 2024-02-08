import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailed } from "../redux/user/userSlice.js"; // mengimport slice (redux reducer dari slicer)
import { useDispatch, useSelector } from "react-redux"; // mengimport useDispatch
import OAuth from "../components/OAuth.jsx";

export default function SignIn() {
    const [request, setRequest] = useState({});
    // mengambil data statenya dari reducer, "user" disini diambil dari reducer yang ada di store
    const { loading, errors} = useSelector((state) => state.user);
    const navigate = useNavigate(); // navigate disini untuk menavigasi setelah login akan kemana
    const dispatch = useDispatch(); // 

    const handleChange = () => {
        setRequest({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
        });
        console.log(request);
    }

    const handleClick = async (event) => {
        event.preventDefault();
        try {
            // // setLoading(true);
            // ! Menggunakan reducer signInStart dimana loading akan di set true
            dispatch(signInStart());
            const response = await fetch("/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(request)
            });

            const data = await response.json();
            if (data.errors) {
                // kalau gagal data errornya akan di kirim ke reducer
                dispatch(signInFailed(data.errors));
                return; // akan di return agar tidak lanjut kebawahnya lagi
                // // setErrors(data.errors);
            }
            // kalau succes datanya akan di kirim ke reducer
            dispatch(signInSuccess(data));
            // // setLoading(false);
            navigate("/profile"); // jika tidak error akan langsung di alihkan ke halaman /profile
        } catch (e) {
            console.log(e);
            dispatch(signInFailed(e));
        }


    }

    return (
        <div className="max-w-lg mx-auto mt-28">
            <h1 className="text-3xl text-center font-bold my-16 font-rubik">Sign In</h1>
            <form className="flex flex-col gap-4">
                <input className="bg-slate-100 p-3 rounded-xl" onChange={handleChange} type="text" id="username" name="username" placeholder="Username" />
                <input className="bg-slate-100 p-3 rounded-xl" onChange={handleChange} type="password" id="password" name="password" placeholder="Password" />
                <button disabled={loading} onClick={handleClick} className="bg-slate-900 p-3 rounded-xl text-white hover:opacity-95">{loading ? "Loading..." : "Sign in"}</button>
                <OAuth />
            </form>
            <p className="text-center text-red-500">{errors}</p>
            <div className="flex gap-2 mt-5 justify-center">
                <p>Don&apos;t have account?</p>
                <Link to="/sign-up">
                    <span className="text-blue-500">Sign up</span>
                </Link>
            </div>
        </div>
    )
}
