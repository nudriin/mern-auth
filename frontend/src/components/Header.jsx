import { Link } from "react-router-dom"; // import link agar ketika tombol di tekan maka akan menuju ke page tertentu

export default function Header() {
    return (
        <div className="bg-slate-200">
            <div className="flex justify-between items-center mx-auto max-w-6xl p-3">
                <Link to="/">
                    <h1 className="font-bold">MERN Auth</h1>
                </Link>
                <ul className="flex gap-4">
                    <Link to="/">
                        <li>Home</li>
                    </Link>
                    <Link to="/about">
                        <li>About</li>
                    </Link>
                    <Link to="/sign-in">
                        <li>Sign-in</li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}