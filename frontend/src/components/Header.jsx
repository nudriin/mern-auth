import { Link } from "react-router-dom"; // import link agar ketika tombol di tekan maka akan menuju ke page tertentu
import { useSelector } from "react-redux";

export default function Header() {
    // Mengambil data state token dari slicer user
    const { curUser } = useSelector((state) => state.user);
    return (
        <div className="fixed top-0 left-0 right-0 z-50 text-white bg-slate-900 font-poppins">
            <div className="flex items-center justify-center max-w-6xl p-4 mx-auto sm:justify-between">
                <Link to="/">
                    <h1 className="hidden text-xl font-bold text-blue sm:block text-purple">BinaryTalkHub</h1>
                </Link>
                <ul className="flex gap-4">
                    <Link to="/">
                        <li className="px-4 py-1 hover:bg-pink hover:white hover:rounded-full">Beranda</li>
                    </Link>
                    <Link to="/about">
                        <li className="px-4 py-1 hover:bg-pink hover:white hover:rounded-full">Tentang</li>
                    </Link>
                    {curUser ? (
                        <Link to="/profile">
                            <img src={curUser?.data?.profile_pic} className="object-cover object-center w-8 h-8 ml-3 rounded-full" />
                        </Link>
                    ) : (
                        <Link to="/sign-in">
                            <li className="px-4 py-1 rounded-full bg-gradient-to-b from-pink to-purple hover:opacity-95">Masuk</li>
                        </Link>
                    )}
                </ul>
            </div>
        </div>
    )
}
