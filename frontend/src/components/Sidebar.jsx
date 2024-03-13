import { NavLink } from "react-router-dom"
import pdf from "../assets/images/web_display/PDFSideBar.svg";
import youtube from "../assets/images/web_display/YoutubeSideBar.svg";
export default function Sidebar() {
    const routes = [
        {
            label: "PDF Sumarizer",
            href: "/pdfsummarizer",
            icon : pdf
        },
        {
            label: "Youtube Sumarizer",
            href: "/youtubesummarizer",
            icon : youtube
        },
    ];
    const activeLink = 'bg-purple white rounded-full';
    const nonActiveLink = '';

    return (
        <div className="flex flex-col h-full py-4 space-y-4 text-white">
            <div className="flex-1 px-3">
                <NavLink to="/">
                    <h1 className="hidden pl-10 text-xl font-bold text-blue sm:block text-purple">BinaryTalkHub</h1>
                </NavLink>
                <div className="pt-10">
                    {routes.map((route) => (
                        <NavLink to={route.href} key={route.href} className={({ isActive }) => isActive ? activeLink : nonActiveLink}>
                            <div className="flex items-center gap-2 px-4 py-3 pl-10 hover:bg-purple hover:white hover:rounded-full">
                                <img src={route.icon} className="text-white h-7 w-7" />
                                <div>{route.label}</div>
                                </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    )

}
