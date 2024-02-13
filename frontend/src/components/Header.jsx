import { Link } from "react-router-dom"; // import link agar ketika tombol di tekan maka akan menuju ke page tertentu
import { useSelector } from "react-redux";

export default function Header() {
    // Mengambil data state token dari slicer user
    const { curUser } = useSelector((state) => state.user);
    return (
        <div className="bg-slate-900 z-50 text-white fixed top-0 left-0 right-0 font-poppins">
            <div className="flex justify-center sm:justify-between items-center mx-auto max-w-6xl p-4">
                <Link to="/">
                    <h1 className="font-bold text-xl text-blue hidden sm:block text-pink">BinaryTalkHub</h1>
                </Link>
                <ul className="flex gap-4">
                    <Link to="/">
                        <li className="hover:bg-pink hover:white hover:rounded-full py-1 px-4">Beranda</li>
                    </Link>
                    <Link to="/about">
                        <li className="hover:bg-pink hover:white hover:rounded-full py-1 px-4">Tentang</li>
                    </Link>
                    {curUser ? (
                        <Link to="/profile">
                            <img src={curUser?.data?.profile_pic} className="h-7 w-7 rounded-full object-cover object-center" />
                        </Link>
                    ) : (
                        <Link to="/sign-in">
                            <li className="bg-gradient-to-b from-pink to-purple hover:opacity-95  rounded-full py-1 px-4">Masuk</li>
                        </Link>
                    )}
                </ul>
            </div>
        </div>
    )
}
