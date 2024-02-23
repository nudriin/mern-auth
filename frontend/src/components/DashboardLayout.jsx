/* eslint-disable react/prop-types */

import Sidebar from "./Sidebar";

// DashboardLayout.js
const DashboardLayout = ({ children }) => {
    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:flex-col md:fixed md:inset-y-0 md:z-[80] bg-slate-900 w-[19rem]">
                <Sidebar />
            </div>
            <div className="pt-28 pl-[26rem]">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;
