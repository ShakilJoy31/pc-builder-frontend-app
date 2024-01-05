"use client"
import React from 'react';

import { useRouter } from 'next/navigation';

import { verificationFieldsRound } from '@/constants/speceing';

import MyServiceCSS from '../../style/Dashboard.module.css';

const Page = ({setPhoneNumber, setAddress, authenticatedUser, address, phoneNumber}) => {
    const router = useRouter();
    return (
        <div>
            <div className='text-white'>
                <div>
                    <div>
                        <h1 className='mb-1'>Phone number <span className='text-red-700 text-xl pt-1'> *</span></h1>
                        <div className={`flex items-center ${MyServiceCSS.tableRoomInput}`}>

                            <input onChange={(e) => setPhoneNumber(e.target.value)}
                                style={{
                                    borderRadius: verificationFieldsRound,
                                    background: 'white',
                                }}
                                placeholder={`${authenticatedUser?.name}, type your phone number`}
                                className="lg:w-[450px] w-full h-[45px] focus:outline-none border-0 pl-1 text-black"
                                type="text"
                                name=""
                                id=""
                            />
                        </div>
                    </div>

                    <div className='my-3'>
                        <h1 className='mb-1'>Receiever Address <span className='text-red-700 text-xl pt-1'> *</span></h1>
                        <div className={`flex items-center ${MyServiceCSS.tableRoomInput}`}>
                            <textarea onChange={(e) => setAddress(e.target.value)}
                                style={{
                                    borderRadius: verificationFieldsRound,
                                    background: 'white',
                                }}
                                placeholder={`${authenticatedUser?.name}, to delever your hiring we need your address. Please type it here before procceed.`}
                                className={`w-full h-[90px] focus:outline-none border-0 pl-1 text-black`}
                                type="text"
                                name=""
                                id=""
                            />
                        </div>
                    </div>
                </div>


                {
                    !phoneNumber || !address ? '' : <div className='flex items-center justify-center lg:justify-end md:justify-end'>
                    <div onClick={() => {
                       document.getElementById('toolHiringForm').close();
                    }}><button className={`btn border-0 btn-sm w-[150px] normal-case ${MyServiceCSS.IndividualProductBuyNowButton}`}>Done Entry</button>
                    </div>
                </div>
                }
            </div>
        </div>
    );
};

export default Page;