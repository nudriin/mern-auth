import { Link } from "react-router-dom";
export default function SignUp() {
    return (
        <div className="max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-bold my-6">Sign Up</h1>
            <form className="flex flex-col gap-4 justify-center">
                <input type="text" name="username" id="username" placeholder="Username" className="bg-slate-100 py-2 px-3 rounded-lg" />
                <input type="text" name="email" id="email" placeholder="Email" className="bg-slate-100 py-2 px-3 rounded-lg" />
                <input type="text" name="name" id="name" placeholder="Name" className="bg-slate-100 py-2 px-3 rounded-lg" />
                <input type="password" name="password" id="password" placeholder="Password" className="bg-slate-100 py-2 px-3 rounded-lg" />
                <button className="bg-slate-500 text-white p-2 rounded-lg hover:opacity-95">Sign up</button>
            </form>
            <div className="flex gap-2 mt-5">
                <p>Have an account?</p>
                <Link to="/sign-in">
                    <span className="text-blue-500">Sign in</span>
                </Link>
            </div>
        </div>
    )
}
