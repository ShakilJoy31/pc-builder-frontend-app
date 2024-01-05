"use client"
import React, {
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';

import { AdminAPI } from '@/APIcalling/adminAPI';
import CustomModal from '@/Components/CustomModal';

import AdminCSS from '../../../../style/AdminCSS.module.css';
import HomeComponentCss from '../../../../style/ComponentStyle.module.css';
import MyServiceCSS from '../../../../style/MyServiceCSS.module.css';
import { BlurForSafety } from '../../../../userStore';

const Page = () => {
    const { isModalOpen, setIsModalOpen } = BlurForSafety.useContainer();
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        AdminAPI.handleGettingOrders().then(res => {
            const onlyArrivedOrders  = res.filter(order => !order.isAccepted);
            setOrders(onlyArrivedOrders)
        });
    }, [])
    console.log(orders);
    const [seeOrderByAdmin, setSeeOrderByAdmin] = useState(null);
    const [idForTheOrderToDelete, setValue] = useState('');

    const handleCheckOrderByAdmin = (getOrder) => {
        document.getElementById('productDetails').showModal();
        setSeeOrderByAdmin(getOrder);
        setValue(getOrder);
    }

    const handleRejectOrder = () => {
        AdminAPI.handleDeletingOrder(idForTheOrderToDelete._id).then(res => {
            const filterOrder = orders.filter(order => order._id !== idForTheOrderToDelete._id);
            setOrders(filterOrder);
            document.getElementById('productDetails').close();
        });
    }
    const handleAcceptOrder = () => {
        const customData = { idForTheOrderToDelete, isAccepted: true};
        AdminAPI.handleAcceptOrderByAdmin(idForTheOrderToDelete._id, customData).then(res => {
            console.log(res);
            const filterOrder = orders.filter(order => order._id !== idForTheOrderToDelete._id);
            setOrders(filterOrder);
            document.getElementById('productDetails').close();
        });
    }
    return (
        <div className='my-[24px] min-h-screen'>
            <div className={`${isModalOpen ? HomeComponentCss.blurred : ''}`}>
                <div className='flex lg:justify-end md:justify-end justify-center mb-2 gap-x-2'>
                    <button onClick={() => router.push('/admin/accepted-orders')} style={{ background: 'purple', borderRadius: '5px' }} className="py-[5px] px-[3px] md:px-[3px] lg:px-[5px]">Accepted</button>

                    <button onClick={() => router.push('/admin')} style={{ background: 'purple', borderRadius: '5px' }} className="py-[5px] px-[3px] md:px-[3px] lg:px-[5px]">Upload Product</button>
                </div>

                {
                    orders?.length < 1 ? <div className='w-full min-h-screen items-center flex justify-center'>
                        <div>
                            <span style={{ color: 'crimson' }} className="loading loading-ring w-24 h-24 block mx-auto"></span>
                            {/* <span className="loading loading-ring loading-lg"></span> */}
                            <p style={{ fontFamily: 'Lucida Sans Unicode' }} className='text-white flex justify-center'>Loading. Please wait...</p>
                        </div>
                    </div> : <div className="overflow-x-auto w-full">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className='text-white'><span className='flex justify-center'>SL No.</span></th>

                                    <th className='text-white'><span className='flex justify-center'>Name</span></th>

                                    <th className='text-white'><span className='flex justify-center'>Email</span></th>

                                    <th className='text-white'><span className='flex justify-center'>Phone</span></th>

                                    <th className='text-white'><span className='flex justify-center'>Address</span></th>

                                    <th className='text-white'><span className='flex justify-center'>Duration</span></th>

                                    <th className='text-white'><span className='flex justify-center'>Cost for hiring</span></th>

                                    <th className='text-white'><span className='flex justify-center'>Ordered time</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders?.map((order, index) => <tr onClick={() => handleCheckOrderByAdmin(order)} key={index} className={`${AdminCSS.orderRow}`}>
                                        <th><span className='flex justify-center'>{index + 1}</span></th>

                                        <td> <span className='flex justify-center'>{order.name}</span></td>

                                        <td className=''><span className='flex justify-center'>{order.email}</span></td>

                                        <td className=''><span className='flex justify-center'>{order.phone}</span></td>

                                        <td className=''><span className='flex justify-center'>{order.address}</span></td>

                                        <td> <span className='flex justify-center'>{order.hiringDuration}</span></td>

                                        <td> <span className='flex justify-center'>{order.hiringCost}</span></td>

                                        <td><span className='flex justify-center items-center'>{order.hiringTime}</span></td>
                                    </tr>)
                                }

                            </tbody>
                        </table>
                    </div>
                }
            </div>

            <dialog id="productDetails" className="modal">
                <div style={{
                        color: 'white',
                        background: 'black',
                        border: '2px solid crimson'
                    }} className="modal-box">

                    <h1 className='mb-[12px] flex justify-center'>{seeOrderByAdmin?.name} wants to hire {seeOrderByAdmin?.orderedTool?.title}</h1>

                    <div className="overflow-x-auto w-full">
                        <table className="table">
                            <thead>
                                <tr>
                                    
                                    <th className='text-white'><span className='flex justify-center'>Image</span></th>

                                    <th className='text-white px-20'><span className='flex justify-center'>Name</span></th>

                                    <th className='text-white'><span className='flex justify-center'>Category</span></th>
                                </tr>
                            </thead>
                            <tbody>
                             <tr>
                                        <td> <span className='flex justify-center'><img src={seeOrderByAdmin?.orderedTool?.productPicture[0]} alt="Product Image" style={{ borderRadius: '0 8px 0 8px' }} className='w-10 h-10' /></span></td>

                                        <td><span className='flex justify-center'>{seeOrderByAdmin?.orderedTool?.title}</span></td>

                                        <td><span className='flex justify-center'>{seeOrderByAdmin?.orderedTool?.category}</span></td>

                                    </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className='mt-[25px]'>
                        <div className='lg:flex items-center grid lg:justify-between md:justify-between gap-x-[48px]'>
                            <div onClick={handleRejectOrder}><button className={`btn border-0 btn-sm lg:w-[150px] md:w-[140px] w-full normal-case ${MyServiceCSS.IndividualProductBuyNowButton} mb-[15px] md:mb-0 lg:mb-0`}>Delete Order</button>
                            </div>

                            <div onClick={handleAcceptOrder}>
                                <button className={`btn border-0 btn-sm lg:w-[150px] md:w-[140px] w-full normal-case ${MyServiceCSS.IndividualProductBuyNowButtonForPlacingOrder}`}>Accept Order</button>
                            </div>
                        </div>

                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            {
                isModalOpen && <div className={`${HomeComponentCss.modalContaine}`}><CustomModal closeModal={closeModal} /></div>
            }
        </div>
    );
};

export default Page;




// The onchange.  
