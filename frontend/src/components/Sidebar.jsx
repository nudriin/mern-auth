import { NavLink } from "react-router-dom"
import dashboard from "../assets/images/web_display/DashboardSideBar.svg";
import pdf from "../assets/images/web_display/PDFSideBar.svg";
import youtube from "../assets/images/web_display/YoutubeSideBar.svg";
export default function Sidebar() {
    const routes = [
        {
            label: "Dashboard",
            href: "/dashboard",
            icon : dashboard
        },
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
        <div className="space-y-4 py-4 flex flex-col h-full text-white">
            <div className="px-3 flex-1">
                <NavLink to="/">
                    <h1 className="hidden text-xl font-bold pl-10 text-blue sm:block text-purple">BinaryTalkHub</h1>
                </NavLink>
                <div className="pt-10">
                    {routes.map((route) => (
                        <NavLink to={route.href} key={route.href} className={({ isActive }) => isActive ? activeLink : nonActiveLink}>
                            <div className="flex gap-2 items-center px-4 py-3 pl-10 hover:bg-purple hover:white hover:rounded-full">
                                <img src={route.icon} className="h-7 w-7 text-white" />
                                <div>{route.label}</div>
                                </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    )

}
