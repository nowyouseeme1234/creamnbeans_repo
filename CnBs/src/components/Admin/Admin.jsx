import React from 'react'
import { GoHome } from "react-icons/go";
import { FiUser } from "react-icons/fi";
import { IoStatsChartOutline } from "react-icons/io5";
import { Link, Outlet, useLocation } from 'react-router-dom';
import { GoGear } from "react-icons/go";

const Admin = () => {
    const location = useLocation();
    return (
        <div className='bg-primary h-screen w-screen'>
            {/* bottom nav bar */}
            <ul className='gap-2 flex justify-center m-1 fixed bottom-0'>
                <Link to={"/admin"}>
                    <li className={`flex gap-1 justify-start items-center ${location.pathname === '/admin' ? 'bg-secondary text-white rounded-lg p-1 transform duration-500': ''}`}>
                        <GoHome className={` font-poppins ` }/>
                        <h1 className={`font-poppins`}>Home</h1>
                    </li>
                </Link>
                <Link to={"/admin/user"}>
                    <li className={`flex gap-1 justify-start items-center ${location.pathname === '/admin/user' ? 'bg-secondary text-white rounded-lg p-1 transform duration-500': ''}`}>
                        <FiUser className={` font-poppins ` }/>
                        <h1 className={`font-poppins`}>User</h1>
                    </li>
                </Link>
                <Link to={"/admin/stats"}>
                    <li className={`flex gap-1 justify-start items-center ${location.pathname === '/admin/stats' ? 'bg-secondary text-white rounded-lg p-1 transform duration-500': ''}`}>
                        <IoStatsChartOutline className={` font-poppins ` }/>
                        <h1 className={`font-poppins`}>Stats</h1>
                    </li>
                </Link>
                <Link to={"/admin/settings"}>
                    <li className={`flex gap-1 justify-start items-center ${location.pathname === '/admin/settings' ? 'bg-secondary  text-white rounded-lg p-1 transform duration-500': ''}`}>
                        <GoGear className={` font-poppins `} />
                        <h1 className={`font-poppins`}>Setting</h1>
                    </li>
                </Link>

            </ul>
            <Outlet/>
        </div>
    )
}

export default Admin