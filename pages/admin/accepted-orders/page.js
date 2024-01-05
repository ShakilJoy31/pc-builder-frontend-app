"use client"
import React, {
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';

import { AdminAPI } from '@/APIcalling/adminAPI';

import AdminCSS from '../../../../style/AdminCSS.module.css';

const Page = () => {
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        AdminAPI.handleGettingOrders().then(res => {
            const onlyAcceptedOrders  = res.filter(order => order.isAccepted === true);
            setOrders(onlyAcceptedOrders)
        });
    }, [])
    
    return (
        <div className='my-[24px] min-h-screen'>
            <div>
                <div className='flex lg:justify-end md:justify-end justify-center mb-2 gap-x-2'>
                    <button onClick={() => router.push('/admin/user-order')} style={{ background: 'purple', borderRadius: '5px' }} className="py-[5px] px-[3px] md:px-[3px] lg:px-[5px]">Check Orders</button>

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

                                    <th className='text-white'><span className='flex justify-center'>Duration</span></th>

                                    <th className='text-white'><span className='flex justify-center'>Cost for hiring</span></th>

                                    <th className='text-white'><span className='flex justify-center'>Ordered time</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders?.map((order, index) => <tr key={index} className={`${AdminCSS.orderRow}`}>
                                        <th><span className='flex justify-center'>{index + 1}</span></th>

                                        <td> <span className='flex justify-center'>{order.name}</span></td>

                                        <td className=''><span className='flex justify-center'>{order.email}</span></td>

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
        </div>
    );
};

export default Page;

// The onchange.  
