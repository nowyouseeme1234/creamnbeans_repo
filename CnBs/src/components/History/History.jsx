import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

const History = () => {
    let editableOrderId = 0;
    let deletableOrderId = 0;
    const [orders, setOrders] = useState([]);
    const [modal, setModal] = useState({
        isOpen: false,
        header: '',
        content: ''
    })
    useEffect(() => {
        axios.get('http://localhost:3000/get_orders').then(result => {
            if (result.data.Status) {
                setOrders(result.data.Result);
                console.log(result.data.Result)
            }
            else {console.log(result);    
            }
        }).catch(error => console.log(error))
    }, []);
    const handleEdit = (orderId) => {
        editableOrderId = orderId;
        let orderToEdit = '';
        let priceToEdit = 0;
        orders.forEach((obj) =>{
            if(orderId === obj.order_id){
                orderToEdit = obj.actual_order
                priceToEdit = obj.total_price
            }
        });
        setModal({
            isOpen: true,
            header: 'Edit',
            content: (
              <div>
                <div className='flex gap-2'>
                <label htmlFor="actual_order" className='font-poppins font-bold'>Order:</label>
                <textarea id='order_to_edit' defaultValue={orderToEdit} className='border border-black focus:border-black focus:outline-none w-fit h-20 rounded-lg m-1' />
                </div>
                

                <div className='flex gap-2'><label htmlFor="price" className='font-poppins font-bold'>Price:</label>
                <input id='price_to_edit' type="number" defaultValue={priceToEdit} className='border border-black focus:border-black focus:outline-none w-full rounded-lg' /></div>
                <button type="button" className='bg-red-500 p-2 m-3 rounded-md' onClick={closeModal}>Cancel</button>
                <button type="button" className='bg-green-500 p-2 m-3 rounded-md float-right' onClick={handleGo}>Edit</button>
                
              </div>
            )
          });
        console.log(`Edit order with ID: ${orderId}`);
        console.log(`Edit actual order: ${orderToEdit}`);
        
      };
    
      const handleGo = () =>{
        const editable = [document.getElementById('order_to_edit').value, document.getElementById("price_to_edit").value];
        axios.post("http://localhost:3000/edit_order", {editableOrderId, editable}).then(result =>{
            if(result.data.Status){
                closeModal();
                alert("Edit was a success")
            }
            else{
                console.log(result.data)
            }
        }).catch(error => {
            console.log(`${error}`)
        })
    }
      const handleDelete = (orderId) => {
        let orderToDelete = '';
        deletableOrderId = orderId;
        orders.forEach((obj) =>{
            if(orderId === obj.order_id){
                orderToDelete = obj.actual_order
            }
        });
        setModal({
            isOpen: true,
            header: 'Delete',
            content: (
              <div>
              <p className=' text-center mt-5 p-3'>Delete order <span className='font-bold font-poppins'>{orderToDelete}</span> with order id <span className='font-bold font-poppins'>{orderId}</span> ?</p>
              <div className='flex gap-10 justify-center mt-7'>
                <button className='bg-red-600 py-2 px-3 rounded-md' onClick={closeModal}>No</button>
                <button className='bg-green-600 py-2 px-3 rounded-md' onClick={handleDeleteYes}>Yes</button>
              </div>
              </div>
            )
          });
        console.log(`Delete order with ID: ${orderId}`);
      };
      const handleDeleteYes = () =>{
        axios.post("http://localhost:3000/delete_order", {deletableOrderId}).then(result =>{
            if(result.data.Status){
                console.log(result.data)
            }
            else{
                console.log(result.data)
            }
        }).catch(error => {
            console.log(`${error}`)
        })
      }
      const closeModal = () =>{
        setModal(prevModal => ({
            ...prevModal,
            isOpen: false
          }));
      }
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
                                <td colSpan='4'>
                                    <hr className='border-gray-400'/>
                                </td>
                            </tr>
                            <tr>
                                <td className='ml-3 font-poppins'>{e.order_id})</td>
                                <td className='pr-3 font-poppins font-bold'>{e.actual_order}</td>
                                <td className='font-poppins '>{e.total_price}</td>
                                <td className='pl-5'>
                                    <button className='bg-gray-600 m-2 p-1 rounded-lg font-poppins' onClick={()=> handleEdit(e.order_id)}>Edit</button>
                                    <button className='bg-red-600 rounded-lg p-2 font-poppins ' onClick={()=> handleDelete(e.order_id)}>Delete</button>
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            {/* the modal window  */}
            {modal.isOpen && (
        <div className='h-screen w-screen bg-primary fixed top-0 opacity-70 flex justify-center items-center overflow-scroll'>
          <div className='size-56 bg-white '>
            <h2 className='text-center font-poppins font-bold text-gray-700 mt-2'>{modal.header}</h2>
            <div>
                {modal.content}
            </div>
            
          </div>
        </div>
      )}
        </div>
    )
}

export default History