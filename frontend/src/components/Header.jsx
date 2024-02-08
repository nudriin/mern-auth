import { Link } from "react-router-dom"; // import link agar ketika tombol di tekan maka akan menuju ke page tertentu
import { useSelector } from "react-redux";

export default function Header() {
    // Mengambil data state token dari slicer user
    const { token } = useSelector((state) => state.user);
    return (
        <div className="bg-slate-900 text-white fixed top-0 left-0 right-0 font-poppins">
            <div className="flex justify-between items-center mx-auto max-w-6xl p-4">
                <Link to="/">
                    <h1 className="font-bold text-xl text-blue">nAI</h1>
                </Link>
                <ul className="flex gap-4">
                    <Link to="/">
                        <li className="hover:bg-purple hover:white hover:rounded-full py-1 px-4">Home</li>
                    </Link>
                    <Link to="/about">
                        <li className="hover:bg-purple hover:white hover:rounded-full py-1 px-4">About</li>
                    </Link>
                    {token ? (
                        <Link to="/profile">
                            <img src={token?.data.profile_pic} className="h-7 w-7 rounded-full object-cover object-center" />
                        </Link>
                    ) : (
                        <Link to="/sign-in">
                            <li className="hover:bg-purple hover:white  hover:rounded-full py-1 px-4">Sign-in</li>
                        </Link>
                    )}
                </ul>
            </div>
        </div>
    )
}
