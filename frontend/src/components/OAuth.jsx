import { useDispatch, useSelector } from "react-redux"; // mengimport useDispatch
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { signInStart, signInSuccess, signInFailed, getUserSuccess } from "../redux/user/userSlice.js"; 
import { useNavigate } from"react-router-dom";
import { app } from "../firebase.js";
import swal from "sweetalert2";

export default function OAuth() {


    const { loading } = useSelector((state) => {
        return state.user
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            dispatch(signInStart())
            const auth = getAuth(app);
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            const username = result.user.email.split("@")[0]; // ! Mengambil username dari email semebelum karakter '@'
            const response = await fetch("/api/users/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        username: username,
                        email: result.user.email,
                        name: result.user.displayName,
                        profile_pic: result.user.photoURL
                    }
                )
            });
        
            const data = await response.json();
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
            dispatch(signInFailed(e.errors));
            console.log(e);
        }
    }

    return (
        <button type="button" disabled={loading} onClick={handleClick} className="p-3 text-white bg-gradient-to-b from-pink to-purple rounded-xl hover:opacity-95">
            {loading ? "Loading..." : "Lanjutkan dengan Google"}
        </button>
    )
}
