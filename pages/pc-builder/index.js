"use client"
import 'aos/dist/aos.css';

import React, {
  useEffect,
  useState,
} from 'react';

import Aos from 'aos';
import {
  usePathname,
  useRouter,
} from 'next/navigation';
import { IoStar } from 'react-icons/io5';

import { CustomerAPI } from '../../APIcalling/customerAPI';
import DashboardCSS from '../../style/Dashboard.module.css';

const Page = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [fetchedData, setFetchedData] = useState([]);
    const [supportServicesDB, setSupportServices] = useState(0);

    const [processor, setProcessor] = useState(null);
    const [motherboard, setMotherboard] = useState(null);
    const [RAM, setRAM] = useState(null);
    const [powerSupplyUnit, setPowerSupplyUnit] = useState(null);
    const [storageMemory, setStorageMemory] = useState(null);
    const [monitor, setMonitor] = useState(null);
    const [accessories, setAccessories] = useState(null);
    const [productsToShow, setProductsToShow] = useState(null);

    useEffect(() => {
        CustomerAPI.handleGettingProducts(1, 'RAM').then(res => {
            setFetchedData(res);
        });
        Aos.init({ duration: 500 });

        setProcessor(JSON.parse(localStorage.getItem('ProcessorForPCBuilding')) || null);
        setMotherboard(JSON.parse(localStorage.getItem('MotherboardForPCBuilding')) || null)
        setRAM(JSON.parse(localStorage.getItem('RAMForPCBuilding')) || null)
        setPowerSupplyUnit(JSON.parse(localStorage.getItem('PowerSupplyUnitForPCBuilding')) || null)
        setStorageMemory(JSON.parse(localStorage.getItem('StorageMemoryForPCBuilding')) || null)
        setMonitor(JSON.parse(localStorage.getItem('MonitorForPCBuilding')) || null)
        setAccessories(JSON.parse(localStorage.getItem('AccessoriesForPCBuilding')) || null)
        setProductsToShow(JSON.parse(localStorage.getItem('ProductsForPCBuilding')) || null)
    }, [pathname])
    const [productToShow, setProductToShow] = useState(null);
    const handleClickedButtonForSelectedProductPreview = (getKey) => {
        if (getKey === 'Processor') {
            setProductToShow(processor)
        }
        if (getKey === 'Motherboard') {
            setProductToShow(motherboard)
        }
        if (getKey === 'RAM') {
            setProductToShow(RAM)
        }
        if (getKey === 'Power Supply Unit') {
            setProductToShow(powerSupplyUnit)
        }
        if (getKey === 'StorageMemory') {
            setProductToShow(storageMemory)
        }
        if (getKey === 'Monitor') {
            setProductToShow(monitor)
        }
        if (getKey === 'Accessories') {
            setProductToShow(accessories)
        }
        if (getKey === 'All Selected Item') {
            const getElement = JSON.parse(localStorage.getItem('ProductsForPCBuilding'));
            setProductsToShow(getElement);
            document.getElementById('theProductsFroPCBuilding').showModal();
        } else {
            document.getElementById('oneOfTheProductFroPCBuilding').showModal();
        }
    }

    const [buildModal, setBuildModal] = useState(false);
    setTimeout(function () {
        if (buildModal) {
            document.getElementById('buildSuccessful')?.close();
            setBuildModal(false);
        }
    }, 4800);

    return (
        <div className="min-h-screen">
            <div className='lg:mx-[48px] md:mx-[36px] mx-[24px]'>
                <div className='mt-4 block mx-auto'>
                    <h1 className='mt-4'>
                        <svg className="gradient-text" width="100%" height="38" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" style={{ stopColor: '#FF0078' }} />
                                    <stop offset="20%" style={{ stopColor: '#F6EFA7' }} />
                                    <stop offset="40%" style={{ stopColor: '#FF0078' }} />
                                    <stop offset="60%" style={{ stopColor: 'crimson' }} />
                                    <stop offset="80%" style={{ stopColor: '#00ff00' }} />
                                    <stop offset="100%" style={{ stopColor: 'rgb(28,97,231)' }} />
                                </linearGradient>
                            </defs>
                            <text className='lg:text-3xl md:text-2xl text-xl' x="10" y="30" fill="url(#gradient)" textAnchor="start">Select the component from the follwing category</text>
                        </svg>
                    </h1>
                </div>


                <div className='flex justify-center mt-[25px]'>
                    <div className={`grid`}>

                        <div className='flex gap-x-2 md:gap-x-6 lg:gap-x-12 items-center justify-evenly'>
                            <img className="w-[40px] h-[40px]" src='https://cdn.pixabay.com/photo/2023/11/30/09/15/ai-generated-8421119_640.jpg' alt="" />
                            <div className='lg:w-[40vw] md:w-[50vw] w-[60vw]'>
                                <span style={{
                                    fontWeight: "700",
                                    fontSize: "22px",
                                    color: 'white',
                                }}>CPU / Processor</span>

                                {
                                    processor ? <p onClick={() => handleClickedButtonForSelectedProductPreview('Processor')} className={`${DashboardCSS.footerContent}`}>Click to see selected item</p> : <p className={`${DashboardCSS.footerContent}`}>Select item first</p>
                                }
                            </div>

                            <button onClick={() => {
                                router.push('/processor')
                                localStorage.setItem('Processor', JSON.stringify(true));
                            }} className={`block w-[120px] mx-auto normal-case border-0 btn btn-sm ${DashboardCSS.loginButton}`}>Select</button>
                        </div>



                        <div className='flex gap-x-2 md:gap-x-6 lg:gap-x-12 items-center justify-evenly'>
                            <img className="w-[40px] h-[40px]" src='https://hips.hearstapps.com/hmg-prod/images/next-gen-motherboards-1630001748.jpg' alt="" />

                            <div className='lg:w-[40vw] md:w-[50vw] w-[60vw]'>
                                <span style={{
                                    fontWeight: "700",
                                    fontSize: "22px",
                                    color: 'white',
                                }}>Motherboard</span>
                                {
                                    motherboard ? <p onClick={() => handleClickedButtonForSelectedProductPreview('Motherboard')} className={`${DashboardCSS.footerContent}`}>Click to see selected item</p> : <p className={`${DashboardCSS.footerContent}`}>Select item first</p>
                                }
                            </div>

                            <button onClick={() => {
                                router.push('/motherboard')
                                localStorage.setItem('Motherboard', JSON.stringify(true));
                            }} className={`block w-[120px] mx-auto normal-case border-0 btn btn-sm ${DashboardCSS.loginButton}`}>Select</button>
                        </div>


                        <div className='flex gap-x-2 md:gap-x-6 lg:gap-x-12 items-center justify-evenly'>
                            <img className="w-[40px] h-[40px]" src='https://cdn.mos.cms.futurecdn.net/NSYr6nsP63PRbdJFMNL5pT-1200-80.jpg' alt="" />

                            <div className='lg:w-[40vw] md:w-[50vw] w-[60vw]'>
                                <span style={{
                                    fontWeight: "700",
                                    fontSize: "22px",
                                    color: 'white',
                                }}>RAM (Random Access Memory)</span>
                                {
                                    RAM ? <p onClick={() => handleClickedButtonForSelectedProductPreview('RAM')} className={`${DashboardCSS.footerContent}`}>Click to see selected item</p> : <p className={`${DashboardCSS.footerContent}`}>Select item first</p>
                                }
                            </div>

                            <button onClick={() => {
                                router.push('/ram')
                                localStorage.setItem('RAM', JSON.stringify(true));
                            }} className={`block w-[120px] mx-auto normal-case border-0 btn btn-sm ${DashboardCSS.loginButton}`}>Select</button>
                        </div>


                        <div className='flex gap-x-2 md:gap-x-6 lg:gap-x-12 items-center justify-evenly'>
                            <img className="w-[40px] h-[40px]" src='https://masondynamics.com/wp-content/uploads/2021/05/bucher-hydraulics-power-unit-dyna-jack-m-304-7.jpg' alt="" />

                            <div className='lg:w-[40vw] md:w-[50vw] w-[60vw]'>
                                <span style={{
                                    fontWeight: "700",
                                    fontSize: "22px",
                                    color: 'white',
                                }}>Power Supply Unit</span>
                                {
                                    powerSupplyUnit ? <p onClick={() => handleClickedButtonForSelectedProductPreview('Power Supply Unit')} className={`${DashboardCSS.footerContent}`}>Click to see selected item</p> : <p className={`${DashboardCSS.footerContent}`}>Select item first</p>
                                }
                            </div>

                            <button onClick={() => {
                                router.push('/power-supply-unit')
                                localStorage.setItem('PowerSupplyUnit', JSON.stringify(true));
                            }} className={`block w-[120px] mx-auto normal-case border-0 btn btn-sm ${DashboardCSS.loginButton}`}>Select</button>
                        </div>



                        <div className='flex gap-x-2 md:gap-x-6 lg:gap-x-12 items-center justify-evenly'>
                            <img className="w-[40px] h-[40px]" src='https://png.pngtree.com/thumb_back/fh260/background/20220626/pngtree-selection-of-different-computer-storage-devices-storage-computer-rom-photo-image_13981816.jpg' alt="" />

                            <div className='lg:w-[40vw] md:w-[50vw] w-[60vw]'>
                                <span style={{
                                    fontWeight: "700",
                                    fontSize: "22px",
                                    color: 'white',
                                }}>Storage (Memory Card)</span>
                                {
                                    storageMemory ? <p onClick={() => handleClickedButtonForSelectedProductPreview('StorageMemory')} className={`${DashboardCSS.footerContent}`}>Click to see selected item</p> : <p className={`${DashboardCSS.footerContent}`}>Select item first</p>
                                }
                            </div>

                            <button onClick={() => {
                                router.push('/storage-device')
                                localStorage.setItem('StorageMemory', JSON.stringify(true));
                            }} className={`block w-[120px] mx-auto normal-case border-0 btn btn-sm ${DashboardCSS.loginButton}`}>Select</button>
                        </div>




                        <div className='flex gap-x-2 md:gap-x-6 lg:gap-x-12 items-center justify-evenly'>
                            <img className="w-[40px] h-[40px]" src='https://img.freepik.com/premium-photo/close-up-computer-monitor-with-blank-screen-copy-space-black-background_772924-4253.jpg' alt="" />

                            <div className='lg:w-[40vw] md:w-[50vw] w-[60vw]'>
                                <span style={{
                                    fontWeight: "700",
                                    fontSize: "22px",
                                    color: 'white',
                                }}>Monitor</span>
                                {
                                    monitor ? <p onClick={() => handleClickedButtonForSelectedProductPreview('Monitor')} className={`${DashboardCSS.footerContent}`}>Click to see selected item</p> : <p className={`${DashboardCSS.footerContent}`}>Select item first</p>
                                }
                            </div>

                            <button onClick={() => {
                                router.push('/monitor')
                                localStorage.setItem('Monitor', JSON.stringify(true));
                            }} className={`block w-[120px] mx-auto normal-case border-0 btn btn-sm ${DashboardCSS.loginButton}`}>Select</button>
                        </div>




                        <div className='flex gap-x-2 md:gap-x-6 lg:gap-x-12 items-center justify-evenly'>
                            <img className="w-[40px] h-[40px]" src='https://media.istockphoto.com/id/1329045610/photo/flying-gamer-gears-like-mouse-keyboard-joystick-headset-vr-microphone.jpg?s=612x612&w=0&k=20&c=KmwA5iVYRp0kH77_MMEe09RAaSBLLn7hupvx_wbELuQ=' alt="" />

                            <div className='lg:w-[40vw] md:w-[50vw] w-[60vw]'>
                                <span style={{
                                    fontWeight: "700",
                                    fontSize: "22px",
                                    color: 'white',
                                }}>Accessories </span>
                                {
                                    accessories ? <p onClick={() => handleClickedButtonForSelectedProductPreview('Accessories')} className={`${DashboardCSS.footerContent}`}>Click to see selected item</p> : <p className={`${DashboardCSS.footerContent}`}>Select item first</p>
                                }
                            </div>

                            <button onClick={() => {
                                router.push('/other')
                                localStorage.setItem('Accessories', JSON.stringify(true));
                            }} className={`block w-[120px] mx-auto normal-case border-0 btn btn-sm ${DashboardCSS.loginButton}`}>Select</button>
                        </div>
                    </div>
                </div>

                <div className='my-4'>

                    {
                        productsToShow ? <button onClick={() => handleClickedButtonForSelectedProductPreview('All Selected Item')} className={`btn border-0 btn-sm w-full normal-case ${DashboardCSS.productBuyNowButton}`}>See Selected Product ({productsToShow?.length})</button> : ''
                    }

                </div>

                <div className='mb-4'>

                    {
                        productsToShow ? <button onClick={() => {
                            setBuildModal(true);
                            localStorage.removeItem('ProductsForPCBuilding');
                            localStorage.removeItem('ProcessorForPCBuilding');
                            localStorage.removeItem('AccessoriesForPCBuilding');
                            localStorage.removeItem('RAMForPCBuilding');
                            localStorage.removeItem('MotherboardForPCBuilding');
                            localStorage.removeItem('MonitorForPCBuilding');
                            localStorage.removeItem('StorageMemoryForPCBuilding');
                            localStorage.removeItem('PowerSupplyUnitForPCBuilding');
                            setProductsToShow(null);
                            document.getElementById('buildSuccessful').showModal();
                        }} className={`btn border-0 btn-sm w-full normal-case ${DashboardCSS.productBuyNowButton}`} disabled={productsToShow?.length < 6}>Complete Build</button> : ''
                    }

                </div>


                <dialog id="oneOfTheProductFroPCBuilding" className="modal">
                    <div style={{
                        borderRadius: '8px',
                        border: '2px solid crimson'
                    }} className={`w-full hover:cursor-pointer ${DashboardCSS.imageContainer} modal-box`} data-aos="zoom-in-up">
                        <div className={`${DashboardCSS.imageContainer}`}>
                            <figure><img className='lg:h-[220px] md:h-[200px] h-[180px]' src={productToShow?.image} alt="Product Image" style={{ width: '100%', objectFit: 'cover', borderRadius: '8px' }} /></figure>
                        </div>

                        <div className=''>
                            <div className='mt-1'>
                                <div className="px-1">
                                    <h2 className={`${DashboardCSS.productTitle} h-[25px] lg:h-[25px]`}>{productToShow?.productName}</h2>

                                    <div className="flex justify-between items-center">
                                        <div className='flex justify-between items-center w-full'>
                                            <p style={{ color: 'white' }}>{productToShow?.price} ৳</p>
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-x-2'>
                                        <h1>Category: </h1>
                                        <h1>{productToShow?.category}</h1>
                                    </div>


                                    <div className='flex items-center gap-x-2'>
                                        <h1>Rattings: </h1>
                                        <div className='flex justify-evenly items-center'>
                                            {[1, 2, 3, 4, 5].map((value) => (
                                                <span
                                                    key={value}
                                                    onClick={() => setSupportServices(value)}>
                                                    <IoStar size={25} color={`${value <= (Math.round(productToShow?.comments?.map(comment => comment?.commentAndRating)?.map(getValue => getValue?.individualRatting)?.reduce((accumulator, currentValue) => {
                                                        if (typeof currentValue === 'number') {
                                                            return accumulator + currentValue;
                                                        }
                                                        return accumulator;
                                                    }, 0) / ((productToShow?.comments?.map(comment => comment?.commentAndRating))?.length))) ? 'white' : 'rgba(255, 255, 255, 0.583)'}`}></IoStar>
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                </div>

                                <div onClick={() => {
                                    router.push(`/${productToShow?._id}`)
                                }} className='mt-3'>
                                    <button className={`btn border-0 btn-sm w-full normal-case ${DashboardCSS.productBuyNowButton}`}>See Details</button>
                                </div>

                            </div>
                        </div>

                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>

                <dialog id="theProductsFroPCBuilding" className="modal">
                    {
                        productsToShow === null ? <div>
                            <span style={{ color: 'crimson' }} className="loading loading-ring w-24 h-24 block mx-auto"></span>
                            {/* <span className="loading loading-ring loading-lg"></span> */}
                            <p style={{ fontFamily: 'Lucida Sans Unicode' }} className='text-white flex justify-center'>Waiting for you to select PC component</p>
                        </div> : <div style={{
                            borderRadius: '8px',
                            border: '2px solid crimson',
                            background: 'black'
                        }} className='modal-box'>
                            {
                                productsToShow?.map((product, index) => <div key={index} style={{
                                    borderRadius: '8px',
                                    border: '2px solid crimson'
                                }} className={`w-full hover:cursor-pointer ${DashboardCSS.imageContainer} modal-box mb-3`} data-aos="zoom-in-up">
                                    <div className={`${DashboardCSS.imageContainer}`}>
                                        <figure><img className='lg:h-[220px] md:h-[200px] h-[180px]' src={product?.image} alt="Product Image" style={{ width: '100%', objectFit: 'cover', borderRadius: '8px' }} /></figure>
                                    </div>

                                    <div className=''>
                                        <div className='mt-1'>
                                            <div className="px-1">
                                                <h2 className={`${DashboardCSS.productTitle} h-[25px] lg:h-[25px]`}>{product?.productName}</h2>

                                                <div className="flex justify-between items-center">
                                                    <div className='flex justify-between items-center w-full'>
                                                        <p style={{ color: 'white' }}>{product?.price} ৳</p>
                                                    </div>
                                                </div>

                                                <div className='flex items-center gap-x-2'>
                                                    <h1>Category: </h1>
                                                    <h1>{product?.category}</h1>
                                                </div>


                                                <div className='flex items-center gap-x-2'>
                                                    <h1>Rattings: </h1>
                                                    <div className='flex justify-evenly items-center'>
                                                        {[1, 2, 3, 4, 5].map((value) => (
                                                            <span
                                                                key={value}
                                                                onClick={() => setSupportServices(value)}>
                                                                <IoStar size={25} color={`${value <= (Math.round(product?.comments?.map(comment => comment?.commentAndRating)?.map(getValue => getValue?.individualRatting)?.reduce((accumulator, currentValue) => {
                                                                    if (typeof currentValue === 'number') {
                                                                        return accumulator + currentValue;
                                                                    }
                                                                    return accumulator;
                                                                }, 0) / ((product?.comments?.map(comment => comment?.commentAndRating))?.length))) ? 'white' : 'rgba(255, 255, 255, 0.583)'}`}></IoStar>
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                            </div>

                                            <div onClick={() => {
                                                router.push(`/${product?._id}`)
                                            }} className='mt-3'>
                                                <button className={`btn border-0 btn-sm w-full normal-case ${DashboardCSS.productBuyNowButton}`}>See Details</button>
                                            </div>

                                        </div>
                                    </div>

                                </div>)
                            }

                        </div>
                    }

                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>



                <dialog id="buildSuccessful" className="modal">
                    <div style={{
                        borderRadius: '8px',
                        border: '2px solid crimson',
                        background: 'black'
                    }} className='modal-box'>
                        <p className='flex justify-center' style={{ padding: '5px', border: '1px solid green', background: 'rgba(0, 128, 0, 0.263)' }}>PC build is successful! Thank you.</p>
                    </div>

                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>


            </div>
        </div>
    );
};

export default Page;