import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

const History = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/get_orders').then(result => {
            if (result.data.Status) {
                setOrders(result.data.Result);
                console.log(result.data)
            }
            else console.log(result.data);
        }).catch(error => console.log(error))
    }, [])
    return (
        <div className='bg-primary h-full'>
            <Navbar navName = "History"/>
            <table className='table'>
                <thead>
                    <tr>
                        <th className='text-gray-400 font-poppins'>ID</th>
                        <th className='text-gray-400 font-poppins'>Orders</th>
                        <th className='text-gray-400 font-poppins'>Total-Price</th>
                        <th className='text-gray-400 font-poppins'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((e) => (
                        <React.Fragment key={e.order_id}>
                            <tr>
                                <td className='ml-3 font-poppins'>{e.order_id})</td>
                                <td className='pr-3 font-poppins font-bold'>{e.actual_order}</td>
                                <td className='font-poppins '>{e.total_price}</td>
                                <td className='pl-5'>
                                    <button className='bg-gray-600 m-2 p-1 rounded-lg font-poppins'>Edit</button>
                                    <button className='bg-red-600 rounded-lg p-2 font-poppins '>Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan='4'>
                                    <hr className='border-gray-400'/>
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default History