import { useDispatch, useSelector } from "react-redux"; // mengimport useDispatch
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { signInStart, signInSuccess, signInFailed } from "../redux/user/userSlice.js"; 
import { useNavigate } from"react-router-dom";
import { app } from "../firebase.js";
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
            const response = await fetch("/api/users/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        username: result.user.email,
                        email: result.user.email,
                        name: result.user.displayName,
                        profile_pic: result.user.photoURL
                    }
                )
            });
        
            const data = await response.json();
            console.log(data);
            dispatch(signInSuccess(data));
            navigate("/profile");
        } catch (e) {
            dispatch(signInFailed(e.errors));
            console.log(e);
        }
    }

    return (
        <button type="button" disabled={loading} onClick={handleClick} className="bg-blue-600 text-white p-3 rounded-lg hover:opacity-95">
            Continue with Google
        </button>
    )
}
