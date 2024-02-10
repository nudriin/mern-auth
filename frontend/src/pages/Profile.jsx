import { useSelector } from "react-redux"
export default function Profile() {
    const { token } = useSelector((state) => state.user);

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="font-rubik font-bold text-3xl text-center mt-28">Profile</h1>
            <form className="flex flex-col gap-4 mb-[1rem]">
                <img src={token?.data?.profile_pic} className="w-64 h-64 self-center rounded-full object-cover object-center" />
                <input value={token?.data?.username} type="text" placeholder="Username" disabled={true} className="bg-slate-300 rounded-xl p-3" />
                <input value={token?.data?.email} type="text" placeholder="Email" disabled={true} className="bg-slate-300 rounded-xl p-3" />
                <input value={token?.data?.name} type="text" placeholder="Name" className="bg-slate-200 rounded-xl p-3" />
                <input type="text" placeholder="Old password"className="bg-slate-200 rounded-xl p-3" />
                <input type="text" placeholder="New password"className="bg-slate-200 rounded-xl p-3" />
                <button className="bg-gradient-to-b from-pink to-purple text-white p-3 rounded-xl hover:opacity-95">Simpan</button>
            </form>
            <div className="flex flex-col">
                <button className="bg-gradient-to-b from-red-500 to-red-700 text-white p-3 rounded-xl hover:opacity-95">Keluar</button>
            </div>
        </div>
    )
}
