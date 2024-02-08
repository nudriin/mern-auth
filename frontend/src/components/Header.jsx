import { Link } from "react-router-dom"; // import link agar ketika tombol di tekan maka akan menuju ke page tertentu
import { useSelector } from "react-redux";

export default function Header() {
    // Mengambil data state token dari slicer user
    const { token } = useSelector((state) => state.user);
    return (
        <div className="bg-slate-200">
            <div className="flex justify-between items-center mx-auto max-w-6xl p-3">
                <Link to="/">
                    <h1 className="font-bold">PDFParser</h1>
                </Link>
                <ul className="flex gap-4">
                    <Link to="/">
                        <li>Home</li>
                    </Link>
                    <Link to="/about">
                        <li>About</li>
                    </Link>
                    {token ? (
                        <Link to="/profile">
                            <img src={token?.data.profile_pic} className="h-7 w-7 rounded-full object-cover object-center" />
                        </Link>
                    ) : (
                        <Link to="/sign-in">
                            <li>Sign-in</li>
                        </Link>
                    )}
                </ul>
            </div>
        </div>
    )
}
