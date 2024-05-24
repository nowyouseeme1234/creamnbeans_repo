import React, { useEffect, useState } from 'react';
import { FaHashtag } from 'react-icons/fa';
import ToggleButton from '../Buttons/ToggleButton';
import axios from 'axios';



const menuList = [
    {
        id: 1,
        title: 'Nutri Drinks',
        subtitle: [
            {
                id: 1,
                name: 'Tropical',
                price: 160
            },
            {
                id: 2,
                name: 'Java',
                price: 160
            },
            {
                id: 3,
                name: 'Peachy',
                price: 160
            },
            {
                id: 4,
                name: 'Boost-x',
                price: 160
            },
            {
                id: 5,
                name: 'Delight',
                price: 160
            },
        ],

    },
    {
        id: 2,
        title: 'Fresh Blend',
        subtitle: [
            {
                id: 1,
                name: 'Aloha',
                price: 120
            },
            {
                id: 2,
                name: 'Pink Drink',
                price: 120
            },
            {
                id: 3,
                name: 'Sunset',
                price: 140
            },
        ],
    },
    {
        id: 3,
        title: 'Milk Shakes',
        subtitle: [
            {
                id: 1,
                name: 'Oreo Shake',
                price: 240
            },
            {
                id: 2,
                name: 'Chocolate Shake',
                price: 240
            },
            {
                id: 3,
                name: 'Strawberry Shake',
                price: 240
            },
            {
                id: 4,
                name: 'Vanilla Shake',
                price: 240
            },
            {
                id: 5,
                name: 'Caramel Shake',
                price: 240
            },
            {
                id: 6,
                name: 'Classic Shake',
                price: 240

            },
        ],
    },
    {
        id: 4,
        title: 'Juices',
        subtitle: [
            {
                id: 1,
                name: 'Pineapple',
                price: 100
            },
            {
                id: 2,
                name: 'Watermelon',
                price: 100
            },
            {
                id: 3,
                name: 'Strawberry',
                price: 100
            },
        ],
    },
    {
        id: 5,
        title: 'Smoothies',
        subtitle: [
            {
                id: 1,
                name: 'Avocado Smoothie',
                price: 140
            },
            {
                id: 2,
                name: 'Mixed Smoothie',
                price: 160
            },
            {
                id: 3,
                name: 'Papaya Smoothie',
                price: 140
            },
            {
                id: 4,
                name: 'Fusion Berry',
                price: 160
            },
        ],
    },
    {
        id: 6,
        title: 'Frappachino',
        subtitle: [
            {
                id: 1,
                name: 'Oreo Frappe',
                price: 240
            },
            {
                id: 2,
                name: 'Caramel Frappe',
                price: 240
            },
            {
                id: 3,
                name: 'Chocolate Frappe',
                price: 240
            },
            {
                id: 4,
                name: 'Vanilla Frappe',
                price: 240
            },
            {
                id: 5,
                name: 'Vanilla bean Frappe',
                price: 240
            },
        ],
    },
    {
        id: 7,
        title: 'Iced Latte',
        subtitle: [
            {
                id: 1,
                name: 'Iced Coffee',
                price: 100
            },
            {
                id: 2,
                name: 'Mocha',
                price: 200
            },
            {
                id: 3,
                name: 'Vanilla Latte',
                price: 200
            },
            {
                id: 4,
                name: 'Caramel Latte',
                price: 200
            },
        ],
    },
];

const Menu = () => {
    let totalPrice = 0;
    const [values, setValues] = useState({
        orders: {},
        totalQuantity: 0,
    });
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isBottom, setIsBottom] = useState(false)

    useEffect(() => {
        function handleScroll() {
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
            const isAtBottom = scrollTop + clientHeight === scrollHeight;
            setIsBottom(isAtBottom);
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleToggle = (itemName, buttonName, newState) => {
        setValues((prevValues) => ({
            ...prevValues,
            orders: {
                ...prevValues.orders,
                [itemName]: {
                    ...prevValues.orders[itemName],
                    [buttonName]: newState,
                },
            },
        }));
    };
    const handleCheckboxChange = (itemName, quantity, price, checked) => {
        setValues((prevValues) => {
            const updatedOrders = {
                ...prevValues.orders,
                [itemName]: {
                    quantity: checked ? (quantity || 1) : 0,
                    price: checked ? price : 0,
                    toGo: prevValues.orders[itemName]?.toGo || false,
                    rivo: prevValues.orders[itemName]?.rivo || false,
                },
            };
            const updatedTotalQuantity = Object.values(updatedOrders).reduce(
                (total, item) => total + Number(item.quantity),
                0
            );
            const updatedTotalPrice = Object.values(updatedOrders).reduce(
                (total, item) => total + (Number(item.quantity) * Number(item.price)),
                0
            );

            return {
                ...prevValues,
                orders: updatedOrders,
                totalQuantity: updatedTotalQuantity,
                totalPrice: updatedTotalPrice
            };
        });
    };
    const handleConfirm = (event) => {
        event.preventDefault();
        const ordersToSend = Object.entries(values.orders).map(([itemName, itemDetails]) => ({
            name: itemName,
            quantity: itemDetails.quantity,
            price: itemDetails.price,
            toGo: itemDetails.toGo,
            rivo: itemDetails.rivo,
        }));
        axios.post('https://creamnbeans-repo-server.vercel.app/order', ordersToSend).then((result) => {
            console.log(result.data);
            // Reset the values after successful submission
            setValues({
                orders: {},
                totalQuantity: 0,
            });
        }).catch((err) => console.log(err));
    };
    const handleCheckBtn = () => {
        setIsModalOpen(true)
    }
    const handleCancel = () => {
        window.location.reload();
    }

    return (
        <form>
            <ul>
                {menuList.map((menuItems) => (
                    <div>
                        <h1 className="bg-secondary/80 text-white p-2 font-semibold font-poppins" key={menuItems.id}>
                            {menuItems.title}
                        </h1>
                        {menuItems.subtitle.map((subtitleItems) => (
                            <div className="bg-primary" key={subtitleItems.id}>
                                <div className="py-2">
                                    <li className="flex gap-12">
                                        <div className="flex gap-2">
                                            <input
                                                type="checkbox"
                                                name={subtitleItems.name}
                                                id={subtitleItems.id}
                                                className="ml-2 accent-green-500 size-4 mt-[2px]"
                                                value={subtitleItems.name}
                                                onChange={(e) =>
                                                    handleCheckboxChange(
                                                        subtitleItems.name,
                                                        Number(e.target.value),
                                                        subtitleItems.price,
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                            <h2 className="text-white font-bold font-poppins text-sm">
                                                {subtitleItems.name.slice(0, 11).concat('...')}
                                            </h2>
                                        </div>
                                        {values.orders[subtitleItems.name]?.quantity > 0 && <div className="flex gap-3 absolute right-1">
                                            <FaHashtag className="text-white mt-1 text-sm" />
                                            <select key={subtitleItems.id} defaultValue={1}
                                                name="amount"
                                                id=""
                                                className="h-6 rounded-full bg-gray-400 font-poppins w-9 text-sm"
                                                onChange={(e) =>
                                                    handleCheckboxChange(
                                                        subtitleItems.name,
                                                        Number(e.target.value),
                                                        subtitleItems.price,
                                                        true
                                                    )
                                                }
                                            >
                                                <option value={0}>0</option>
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                                <option value={6}>6</option>
                                                <option value={7}>7</option>
                                                <option value={8}>8</option>
                                                <option value={9}>9</option>
                                                <option value={10}>10</option>
                                            </select>
                                            <ToggleButton
                                                buttonName="ToGo"
                                                isActive={values.orders[subtitleItems.name]?.toGo || false}
                                                handleToggle={() => handleToggle(subtitleItems.name, 'toGo', !values.orders[subtitleItems.name]?.toGo)} />
                                            <ToggleButton
                                                buttonName="Rivo"
                                                isActive={values.orders[subtitleItems.name]?.rivo || false}
                                                handleToggle={() => handleToggle(subtitleItems.name, 'rivo', !values.orders[subtitleItems.name]?.rivo)}
                                            />
                                        </div>}
                                    </li>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </ul>

            <div className={`bottom-0 flex justify-around  bg-primary py-2 ${isBottom ? 'static' : 'sticky'}`}>
                <button className='bg-red-600 px-2 py-1 font-bold rounded-lg font-poppins' type='button' onClick={handleCancel}>Clear</button>
                <button className='bg-gray-400 px-2 py-1 font-bold rounded-lg font-poppins' onClick={handleCheckBtn} type='button'>Check</button>
                <button type='submit' className='bg-green-600 px-2 py-1 font-bold rounded-lg font-poppins' onClick={handleConfirm}>Confirm</button>
            </div>

            {/* the modal window  */}
            {isModalOpen && <div className='flex justify-center items-center h-screen w-screen bg-black opacity-70 z-100 fixed top-0' onClick={(e) => {
                const isOutsideModal = !e.target.closest(".bg-gray-100");
                if (isOutsideModal) {
                    setIsModalOpen(false)
                }
            }}>
                <div className='bg-gray-100 w-52 h-40 overflow-scroll'>
                    <h1 className='text-center font-bold font-poppins'>Check</h1>
                    <div>
                        <ol>

                            {

                                Object.keys(values.orders).map(orderId => {
                                    if (values.orders[orderId].quantity > 0) {
                                        if (values.orders[orderId].toGo) {
                                            totalPrice += values.orders[orderId].quantity * (values.orders[orderId].price + 10);
                                            return (
                                                <li key={orderId}><span>*</span>
                                                    {values.orders[orderId].quantity} <span>{orderId}</span>
                                                    <span className='float-right text-green-700'> {values.orders[orderId].quantity * (values.orders[orderId].price + 10)}</span>
                                                </li>
                                            );
                                        } else {
                                            totalPrice += values.orders[orderId].quantity * (values.orders[orderId].price)

                                            return (
                                                <li key={orderId}>
                                                    {values.orders[orderId].quantity} <span>{orderId}</span>
                                                    <span className='float-right text-green-700'>{values.orders[orderId].quantity * (values.orders[orderId].price)}</span>
                                                </li>

                                            );
                                        }

                                    }
                                    else return null;
                                })
                            }
                        </ol>
                    </div>
                    <p className='float-right font-bold'>Total: <span className='text-green-700 font-extrabold'>{totalPrice}</span><span className='font-medium'> birr</span></p>
                </div>

            </div>}
        </form>
    );
};

export default Menu;