import React from 'react';
import { useState } from 'react';
import { AiOutlineBars } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { MdSubdirectoryArrowRight } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Navbar = ({navName}) => {
    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false);

    const openSidebar = () => {
        setShowSidebar(true);
    }
    const closeSidebar = () => {
        setShowSidebar(false);
    }
    const gotoOrders = () =>{
        navigate('/orders')
        setShowSidebar(false)
    }
    const gotoHistory = () =>{
        navigate('/history')
        setShowSidebar(false)
    }
    return (
        <div className=' bg-primary w-full divide-y divide-secondary'>
            {/* top navbar  */}
            <div className=' grid grid-cols-2 '>
                <button onClick={openSidebar} className=' p-3'>
                    <AiOutlineBars className=' text-white size-6' />
                    <h1>Version 1.0</h1>
                </button>
                <div className='group relative sm:block p-1 mt-1'>
                    <input type="text" placeholder='Search' className=' text-xs font-poppins right-3 w-[100px] sm:w-[100px] group-hover:duration-200 group-hover:w-[200px] rounded-full  px-2 py-1 mt-1 focus:outline-none focus:border-1 focus:border-primary bg-secondary absolute
                    focus:text-gray-300 duration-400 group-focus:w-[200px]' />
                    <FaSearch className=' text-xs text-gray-400 absolute top-5 -translate-y-1/2 right-5' />
                </div>
            </div>



            {/* bottom navbar  */}
            <div className='bg-primary flex relative text-white container h-9'>
                <MdSubdirectoryArrowRight className='size-6' />
                <h1 className=' font-poppins font-bold text-xl'>
                    {navName}
                </h1>
            </div>

            {/* left navbar  */}
            {showSidebar && <div className='absolute top-0 left-0 w-48 h-full bg-secondary'>
                <button onClick={closeSidebar} className='float-right text-red-800'><IoMdCloseCircle className='size-7' /></button>
                <div className='flex flex-col justify-center items-center mt-10'>
                <button type='button' className='bg-primary w-full text-white py-2 mb-3' onClick={gotoOrders}> Orders </button>
                <button type='button' className='bg-primary text-white w-full py-2 mb-3' onClick={gotoHistory}>History</button>
                </div>
            </div>
            }

        </div>
    )
}

export default Navbar