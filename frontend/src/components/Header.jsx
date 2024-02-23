import { NavLink } from "react-router-dom"; // import link agar ketika tombol di tekan maka akan menuju ke page tertentu
import { useSelector } from "react-redux";

export default function Header() {
    // Mengambil data state token dari slicer user
    const { curUser } = useSelector((state) => state.user);
    const activeLink = 'bg-purple white rounded-full';
    const nonActiveLink = '';
    return (
        <div className="fixed top-0 left-0 right-0 z-50 text-white bg-slate-900 font-poppins">
            <div className="flex items-center justify-center max-w-6xl p-4 mx-auto sm:justify-between">
                <NavLink to="/">
                    <h1 className="hidden text-xl font-bold text-blue sm:block text-purple">BinaryTalkHub</h1>
                </NavLink>
                <ul className="flex gap-2">
                    <NavLink to="/" className={({isActive}) => isActive ? activeLink : nonActiveLink}>
                        <li className="px-4 py-1 hover:bg-purple hover:white hover:rounded-full">Beranda</li>
                    </NavLink>
                    <NavLink to="/about" className={({isActive}) => isActive ? activeLink : nonActiveLink}>
                        <li className="px-4 py-1 hover:bg-purple hover:white hover:rounded-full">Tentang</li>
                    </NavLink>
                    <NavLink to="/about" className={({isActive}) => isActive ? activeLink : nonActiveLink}>
                    </NavLink>
                    {curUser ? (
                        <NavLink to="/dashboard">
                            <li className="px-4 py-1 hover:bg-purple hover:white hover:rounded-full">Dashboard</li>
                        </NavLink>
                    ) : ("")}
                    {curUser ? (
                        <NavLink to="/profile">
                            <img src={curUser?.data?.profile_pic} className="object-cover object-center w-8 h-8 ml-3 rounded-full" />
                            {/* <img src="https://lh3.googleusercontent.com/a/ACg8ocLJbvT2mR74yHN8mfxyms5rPLUU2K7vXBSZPOJ7IB4nhT0=s96-c" className="object-cover object-center w-8 h-8 ml-3 rounded-full" /> */}
                            
                        </NavLink>
                    ) : (
                        <NavLink to="/sign-in">
                            <li className="px-4 py-1 rounded-full bg-gradient-to-b from-pink to-purple hover:opacity-95">Masuk</li>
                        </NavLink>
                    )}
                </ul>
            </div>
        </div>
    )
}
