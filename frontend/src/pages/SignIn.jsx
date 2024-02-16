/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, getUserSuccess, signInFailed } from "../redux/user/userSlice.js"; // mengimport slice (redux reducer dari slicer)
import { useDispatch, useSelector } from "react-redux"; // mengimport useDispatch
import OAuth from "../components/OAuth.jsx";
import swal from "sweetalert2";

export default function SignIn() {
    const [formData, setFormData] = useState({});
    // mengambil data statenya dari reducer, "user" disini diambil dari reducer yang ada di store
    const { loading, errors} = useSelector((state) => state.user);
    const navigate = useNavigate(); // navigate disini untuk menavigasi setelah login akan kemana
    const dispatch = useDispatch(); // 

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id] : e.target.value});
        console.log(formData);
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
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (data.errors) {
                // kalau gagal data errornya akan di kirim ke reducer
                swal.fire({
                    title : "Errors",
                    text: data.errors,
                    icon: "error"
                });
                dispatch(signInFailed(data.errors));
                return; // akan di return agar tidak lanjut kebawahnya lagi
                // // setErrors(data.errors);
            }

            // kalau succes datanya akan di kirim ke reducer
            if(!data.errors){
                dispatch(signInSuccess(data));
                if(!loading) {
                    const response = await fetch("/api/users/current", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization" : `Bearer ${data?.data?.token}`
                        }
                    });
                    const user = await response.json();
                    console.log(user)
                    dispatch(getUserSuccess(user));
                }
                swal.fire({
                    title : "Success",
                    text: "Login success!",
                    icon: "success"
                });
                // // setLoading(false);
                navigate("/profile"); // jika tidak error akan langsung di alihkan ke halaman /profile
            }
        } catch (e) {
            console.log(e);
            dispatch(signInFailed(e));
        }


    }

    return (
        <div className="h-screen max-w-lg px-4 mx-auto mt-28">
            <h1 className="my-16 text-3xl font-bold text-center font-rubik">Masuk</h1>
            <form className="flex flex-col gap-4">
                <input className="p-3 bg-slate-100 rounded-xl" onChange={handleChange} type="text" id="username" name="username" placeholder="Username" />
                <input className="p-3 bg-slate-100 rounded-xl" onChange={handleChange} type="password" id="password" name="password" placeholder="Password" />
                <button disabled={loading} onClick={handleClick} className="p-3 text-white bg-slate-900 rounded-xl hover:opacity-95">{loading ? "Loading..." : "Masuk"}</button>
                <OAuth />
            </form>
            <div className="flex justify-center gap-2 mt-5">
                <p>Belum punya akun?</p>
                <Link to="/sign-up">
                    <span className="text-blue-500">Daftar</span>
                </Link>
            </div>
        </div>
    )
}
