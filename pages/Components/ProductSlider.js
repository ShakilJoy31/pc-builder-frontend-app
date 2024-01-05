"use client"
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { IoStar } from 'react-icons/io5';
import { TbAlertOctagonFilled } from 'react-icons/tb';

import { AdminAPI } from '@/APIcalling/adminAPI';
import { CustomerAPI } from '@/APIcalling/customerAPI';
import { verificationFieldsRound } from '@/constants/speceing';

import DashboardCSS from '../../style/Dashboard.module.css';
import MyServiceCSS from '../../style/Dashboard.module.css';
import IndividualCSS from '../../style/Individual.module.css';
import {
  AuthenticUser,
  CommentPermission,
  LoggedInUserStore,
  ProductsStore,
  UserStore,
} from '../../userStore';
import CommentsAndReviews from './CommentsAndReviews';
import Divider from './Divider';
import SheltonLogin from './SheltonLogin';
import UserFormForHiringTool from './UserFormForHiringTool';

const ProductSlider = ({ individualProduct, setIndividualProduct, clickedFor }) => {
    const { user, setUser } = UserStore.useContainer();
    const { products, setProducts } = ProductsStore.useContainer();
    const router = useRouter();
    const [numberOfUserRattings, setNumberOfUserRattings] = useState([]);
    const [previewImage, setPreviewImage] = useState('');
    const [warning, setWarning] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = LoggedInUserStore.useContainer();
    const { isCommentPermission, setIsCommentPermission } = CommentPermission.useContainer();
    const { authenticatedUser, setAuthenticatedUser } = AuthenticUser.useContainer();

    const [equipmentPerformanceDB, setEquipmentPerformanceDB] = useState(0);
    const [customerServiceDB, setCustomerServiceDB] = useState(0);
    const [supportServicesDB, setSupportServicesDB] = useState(0);
    const [afterSalesDB, setAfterSalesDB] = useState(0);
    const [miscellaneousDB, setMiscellaneousDB] = useState(0);
    useEffect(() => {
        setPreviewImage(individualProduct?.productPicture[0]);
        const userRatting = individualProduct?.comments?.map(comment => comment?.commentAndRating?.avarageRating);
        const rattings = individualProduct?.comments?.map(comment => comment?.commentAndRating);
        const equipmentRatting = rattings.map(getValue => getValue.equipmentPerformance);
        const customerServiceRatting = rattings.map(getValue => getValue.customerService);
        const supportServicesRatting = rattings.map(getValue => getValue.supportServices);
        const afterSalesRatting = rattings.map(getValue => getValue.afterSales);
        const miscellaneousRatting = rattings.map(getValue => getValue.miscellaneous);

        setEquipmentPerformanceDB(Math.round(equipmentRatting?.reduce((accumulator, currentValue) => {
            if (typeof currentValue === 'number') {
                return accumulator + currentValue;
            }
            return accumulator;
        }, 0) / (userRatting?.length)))

        setCustomerServiceDB(Math.round(customerServiceRatting?.reduce((accumulator, currentValue) => {
            if (typeof currentValue === 'number') {
                return accumulator + currentValue;
            }
            return accumulator;
        }, 0) / (userRatting?.length)))

        setSupportServicesDB(Math.round(supportServicesRatting?.reduce((accumulator, currentValue) => {
            if (typeof currentValue === 'number') {
                return accumulator + currentValue;
            }
            return accumulator;
        }, 0) / (userRatting?.length)))

        setAfterSalesDB(Math.round(afterSalesRatting?.reduce((accumulator, currentValue) => {
            if (typeof currentValue === 'number') {
                return accumulator + currentValue;
            }
            return accumulator;
        }, 0) / (userRatting?.length)))

        setMiscellaneousDB(Math.round(miscellaneousRatting?.reduce((accumulator, currentValue) => {
            if (typeof currentValue === 'number') {
                return accumulator + currentValue;
            }
            return accumulator;
        }, 0) / (userRatting?.length)))

        console.log(equipmentRatting.filter(ratting => ratting > 0)?.length);

        setNumberOfUserRattings([equipmentRatting.filter(ratting => ratting > 0)?.length, customerServiceRatting.filter(ratting => ratting > 0)?.length, supportServicesRatting.filter(ratting => ratting > 0)?.length, afterSalesRatting.filter(ratting => ratting > 0)?.length, miscellaneousRatting.filter(ratting => ratting > 0)?.length])
    }, [individualProduct])

    setTimeout(function () {
        if (warning) {
            document.getElementById('readyToCommentModal')?.close();
            setWarning(false);
        }
    }, 1800);
    const handleReviewImage = (picture) => {
        setPreviewImage(picture)
    }
    const [selectedPackage, setSelectedPackage] = useState('');
    const [totalHiringCost, setTotalHiringCost] = useState();
    const handleHireTool = (tool, getPriceForHiring) => {
        setSelectedPackage(tool);
    }

    const handleEditByAdmin = () => {
        localStorage.setItem("productToEdit", JSON.stringify(individualProduct));
        router.push('/admin');
    }


    const handleDeleteProductByAdmin = () => {
        AdminAPI.handleDeletingProductByAdmin(individualProduct?._id).then(res => {
            if (res) {
                router.push('/products')
                document.getElementById('beforeDelete').close();
            }
        })
    }

    const [hiringHour, setHiringHour] = useState('');
    const [hiringDay, setHiringDay] = useState('');
    const [hiringCustomFrom, setHiringCustomFrom] = useState('');
    const [hiringCustomFromTo, setHiringCustomTo] = useState('');

    const timeInputOfHiringFrom = useRef(null);
    const timeInputOfHiringTo = useRef(null);
    const handleClockIconOpeningFrom = () => {
        if (timeInputOfHiringFrom.current) {
            timeInputOfHiringFrom.current.showPicker();
        }
    };
    const handleClockIconOpeningTo = () => {
        if (timeInputOfHiringTo.current) {
            timeInputOfHiringTo.current.showPicker();
        }
    };

    const handleUserWantsToComment = () => {
        if (isLoggedIn || authenticatedUser) {
            document.getElementById('readyToCommentModal').showModal();
        } else {
            setIsCommentPermission('Authentication is required!');
            document.getElementById('loginModal').showModal();
        }
    }
    setTimeout(function () {
        if (isCommentPermission) {
            setIsCommentPermission('')
        }
    }, 3800);
    // States for the stars
    const [equipmentPerformance, setEquipmentPerformance] = useState(0);
    const [customerService, setCustomerService] = useState(0);
    const [supportServices, setSupportServices] = useState(0);
    const [afterSales, setAfterSales] = useState(0);
    const [miscellaneous, setMiscellaneous] = useState(0);
    // States for the comment
    const [comment, setComment] = useState('');
    function getCurrentDateTime() {
        const currentDate = new Date();
        return currentDate.toLocaleString();
    }
    const HandlePostingCommentOnTool = async () => {
        const userComment = {
            name: authenticatedUser.name || isLoggedIn.name,
            comment: comment,
            equipmentPerformance: equipmentPerformance,
            customerService: customerService,
            supportServices: supportServices,
            afterSales: afterSales,
            miscellaneous: miscellaneous,
            avarageRating: ((equipmentPerformance || 0) + (customerService || 0) + (supportServices || 0) + (afterSales || 0) + (miscellaneous || 0)) / ((equipmentPerformance && 1) + (customerService && 1) + (supportServices && 1) + (afterSales && 1) + (miscellaneous && 1))
        }
        await CustomerAPI.addComment(individualProduct._id, userComment).then(async res => {
            if (res) {
                const commentTime = getCurrentDateTime();
                if (res?.comments) {
                    setIndividualProduct(prevProduct => {
                        const updatedComments = [...prevProduct.comments, { commentAndRating: userComment, timeOfComment: commentTime }];
                        return { ...prevProduct, comments: updatedComments };
                    });
                } else {
                    setIndividualProduct(prevProduct => ({
                        ...prevProduct,
                        comments: [{ commentAndRating: userComment, timeOfComment: commentTime }]
                    }));
                }
                await CustomerAPI.handleGettingProduct(individualProduct?._id).then(res => {
                    setIndividualProduct(res);
                    document.getElementById('readyToCommentModal').close();
                });
            }
        });
    }
    const [hiringCustom, setHiringCustom] = useState(0);
    const customDatesSelectedForHiring = () => {
        const StartingDate = hiringCustomFrom;
        const EndDate = hiringCustomFromTo;
        const startDate = new Date(StartingDate);
        const endDate = new Date(EndDate);
        const timeDifference = endDate.getTime() - startDate.getTime();
        const daysDifference = timeDifference / (1000 * 3600 * 24);
        return daysDifference;
    }
    useEffect(() => {
        if (hiringCustomFromTo && hiringCustomFrom) {
            const getDays = customDatesSelectedForHiring();
            setHiringCustom(getDays);
            setTotalHiringCost(getDays * parseInt(individualProduct?.dailyHire))
        }
    }, [hiringCustomFromTo, hiringCustomFrom])

    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const handleProcceedToHire = () => {
        if (!address || !phoneNumber) {
            document.getElementById('toolHiringForm').showModal();
        } else {
            let userDataForOrderTool = {}
            if (hiringHour) {
                userDataForOrderTool = {
                    name: authenticatedUser.name,
                    email: authenticatedUser.email,
                    phoneNumber: phoneNumber,
                    address: address,
                    orderedTool: individualProduct,
                    hiringCost: totalHiringCost,
                    hiringDuration: hiringHour + ' Hour',
                    hiringTime: getCurrentDateTime(),
                }
            } else if (hiringDay) {
                userDataForOrderTool = {
                    name: authenticatedUser.name,
                    email: authenticatedUser.email,
                    phoneNumber: phoneNumber,
                    address: address,
                    orderedTool: individualProduct,
                    hiringCost: totalHiringCost,
                    hiringDuration: hiringDay + ' Day',
                    hiringTime: getCurrentDateTime(),
                }
            } else {
                userDataForOrderTool = {
                    name: authenticatedUser.name,
                    email: authenticatedUser.email,
                    phoneNumber: phoneNumber,
                    address: address,
                    orderedTool: individualProduct,
                    hiringCost: totalHiringCost,
                    hiringDuration: hiringCustom,
                    hiringTime: getCurrentDateTime(),
                }
            }
            if (authenticatedUser.length !== 0) {
                if (!totalHiringCost) {
                    setIsCommentPermission('Select your service.');
                } else {
                    if ((hiringCustomFrom && hiringCustomFromTo) || hiringHour || hiringDay) {
                        CustomerAPI.userInformationForPlacOrderProduct(userDataForOrderTool).then(res => {
                            if (res.acknowledged === true) {
                                document.getElementById('placeOrderModal')?.showModal();
                            }
                        });
                    } else {
                        setIsCommentPermission('Select your time period for hiring.');
                    }
                }

            } else {
                setIsCommentPermission('Authentication is required!');
                document.getElementById('loginModal').showModal();
            }
        }
    }
    return (
        <div data-aos="zoom-in-up">
            {
                isCommentPermission && <p className='flex justify-center' style={{ padding: '5px', border: '1px solid crimson', background: 'rgba(220, 20, 60, 0.208)', marginTop: '10px' }}>{isCommentPermission}</p>
            }
            <div style={{ marginTop: '25px' }} className='text-white'>
                <div className={`${IndividualCSS.container}`}>
                    <div>
                        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                            <div className={`${IndividualCSS.previewImage}`}>
                                <span style={{ zIndex: '1' }} className={`${IndividualCSS.inStockSuggestion}`}>Available to hire</span>
                                <img className={`${IndividualCSS.mainImage} w-full`} src={previewImage} />
                            </div>
                        </div>

                        <div className={`${IndividualCSS.previewImageLittle}`}>
                            {
                                individualProduct?.productPicture?.map((picture, index) => <img className={`${IndividualCSS.littleImageOfProduct} ${previewImage === picture ? IndividualCSS.littleImageOfProductSelected : ''}`} onClick={() => handleReviewImage(picture)} key={index} src={picture} />)
                            }
                        </div>
                    </div>


                    <div className={`${IndividualCSS.headingLeftBorder} lg:pl-3 md:pl-2`}>

                        {
                            <div>
                                <h1 style={{ fontSize: '1.675rem', fontWeight: '700' }}>{individualProduct?.title}</h1>
                            </div>
                        }

                        <div className='flex justify-bewteen items-center gap-x-[12px]'>
                            <p onClick={() => handleHireTool('hour', individualProduct?.hourlyHire)} className={`hover:text-white hover:underline hover:cursor-pointer ${selectedPackage === 'hour' ? 'text-white font-bold' : 'text-slate-400'}`}>{individualProduct?.hourlyHire}/hour</p>

                            <p onClick={() => handleHireTool('day', individualProduct?.dailyHire)} className={`text-slate-400 hover:text-white hover:underline hover:cursor-pointer ${selectedPackage === 'day' ? 'text-white font-bold' : 'text-slate-400'}`}>{individualProduct?.dailyHire}/day</p>

                            <p onClick={() => handleHireTool('custom', individualProduct?.longTermHire)} className={`text-slate-400 hover:text-white hover:underline hover:cursor-pointer ${selectedPackage === 'custom' ? 'text-white font-bold' : 'text-slate-400'}`}>Custom</p>
                        </div>


                        {/* Taking the input for hourly hiring */}
                        {
                            selectedPackage === 'hour' && <div className='flex items-center gap-x-[15px] my-4'>
                                <div className="flex gap-x-[7px] items-center lg:w-[165px] w-full md:w-[150px]">
                                    <p>Hours: </p>
                                    <div className={`${IndividualCSS.timeInputContainer} w-full`}>
                                        <input
                                            onChange={(e) => {
                                                const total = individualProduct.hourlyHire * e.target.value;
                                                setTotalHiringCost(total);
                                                setHiringDay('');
                                                setHiringHour(e.target.value);
                                                setHiringCustomFrom('');
                                                setHiringCustomTo('')
                                            }}
                                            type="number"
                                            placeholder='Type hours'
                                            className={`border-0 pl-[10px] focus:outline-none ${IndividualCSS.customInput} ${IndividualCSS.customInputRedIcon} `}
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                        {/* Taking the input for daily hiring */}
                        {
                            selectedPackage === 'day' && <div className='flex items-center gap-x-[15px] my-4'>
                                <div className="flex gap-x-[7px] items-center lg:w-[165px] w-full md:w-[150px]">
                                    <p>Days: </p>
                                    <div className={`${IndividualCSS.timeInputContainer} w-full`}>
                                        <input
                                            onChange={(e) => {
                                                const total = individualProduct.dailyHire * e.target.value;
                                                setTotalHiringCost(total);
                                                setHiringHour('');
                                                setHiringDay(e.target.value);
                                                setHiringCustomFrom('');
                                                setHiringCustomTo('')
                                            }}
                                            type="number"
                                            placeholder='Type hours'
                                            className={`border-0 pl-[10px] focus:outline-none ${IndividualCSS.customInput} ${IndividualCSS.customInputRedIcon} `}
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                        {/* Taking the input for custom hiring */}
                        {
                            selectedPackage === 'custom' && <div className='lg:flex items-center gap-x-[15px] my-4'>

                                <div className="flex gap-x-[7px] items-center w-full">
                                    <p className='w-[60px] block lg:hidden md:hidden'>From: </p>
                                    <p className='lg:block md:block hidden'>From: </p>
                                    <div className={`${IndividualCSS.timeInputContainer} lg:w-[165px] w-full md:w-[150px]`}>
                                        <input
                                            onChange={(e) => {
                                                setHiringCustomFrom(e.target.value)
                                                setHiringHour('');
                                                setHiringDay('');
                                            }}
                                            type="date"
                                            id="dateInput"
                                            placeholder={new Date()}
                                            ref={timeInputOfHiringFrom}
                                            className={`border-0 pl-[10px] focus:outline-none ${IndividualCSS.customInput} ${IndividualCSS.customInputRedIcon} `}
                                        />
                                        <span
                                            onClick={handleClockIconOpeningFrom}
                                            className={IndividualCSS.customClockIcon}
                                        >
                                            <AiOutlineCalendar
                                                size={25}
                                                color={'crimson'}
                                            ></AiOutlineCalendar>
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-x-[7px] items-center w-full mt-2 md:mt-0 lg:mt-0">
                                    <p className='w-[60px] block lg:hidden md:hidden'>To: </p>
                                    <p className='lg:block md:block hidden'>To: </p>
                                    <div className={`${IndividualCSS.timeInputContainer} g:w-[165px] w-full md:w-[150px]`}>
                                        <input
                                            onChange={(e) => {
                                                setHiringCustomTo(e.target.value)
                                                setHiringHour('');
                                                setHiringDay('');
                                            }}
                                            type="date"
                                            id="dateInput"
                                            placeholder={new Date()}
                                            ref={timeInputOfHiringTo}
                                            className={`border-0 pl-[10px] focus:outline-none ${IndividualCSS.customInput} ${IndividualCSS.customInputRedIcon} `}
                                        />
                                        <span
                                            onClick={handleClockIconOpeningTo}
                                            className={IndividualCSS.customClockIcon}
                                        >
                                            <AiOutlineCalendar
                                                size={25}
                                                color={'crimson'}
                                            ></AiOutlineCalendar>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        }

                        <div className='flex items-center my-4'>
                            <p>Cost for Hiring: </p>
                            <div className='ml-4'>
                                <div className='flex items-center justify-evenly bg-slate-500 text-white hover:cursor-pointer px-[15px]'>
                                    {totalHiringCost || 'select above'}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className={`${IndividualCSS.theButton}`} onClick={handleProcceedToHire}>
                                <button className={`btn border-0 btn-sm w-full lg:w-[300px] normal-case ${DashboardCSS.IndividualProductBuyNowButton}`}>Procceed to Hire</button>
                            </div>
                            {
                                authenticatedUser && <div className={`${IndividualCSS.theButton} hidden lg:block md:block`} onClick={handleEditByAdmin}>
                                    <button className={`btn border-0 btn-sm w-full lg:w-[300px] normal-case my-[12px] ${DashboardCSS.IndividualProductBuyNowButton}`}>Edit</button>
                                </div>
                            }
                            {
                                authenticatedUser && <div className={`${IndividualCSS.theButton} hidden lg:block md:block`} onClick={() => document.getElementById('beforeDelete').showModal()}>
                                    <button className={`btn border-0 btn-sm w-full lg:w-[300px] normal-case ${DashboardCSS.IndividualProductBuyNowButton}`}>Delete Tool</button>
                                </div>
                            }
                        </div>

                        {
                            authenticatedUser && <div className={`${IndividualCSS.theButton} lg:hidden block md:hidden my-[12px]`} onClick={handleEditByAdmin}>
                                <button className={`btn border-0 btn-sm w-full normal-case ${DashboardCSS.IndividualProductBuyNowButton}`}>Edit</button>
                            </div>
                        }

                        {
                            authenticatedUser && <div className={`${IndividualCSS.theButton} lg:hidden block md:hidden`} onClick={() => document.getElementById('beforeDelete').showModal()}>
                                <button className={`btn border-0 btn-sm w-full normal-case ${DashboardCSS.IndividualProductBuyNowButton}`}>Delete Tool</button>
                            </div>
                        }

                        {/* Description for mobile. */}
                        <div className='lg:hidden block md:hidden my-[12px]'>
                            <p style={{ whiteSpace: 'pre-line' }}>{individualProduct?.description}</p>

                            <div>
                        <h1 style={{ color: 'crimson' }} className='flex justify-center text-2xl my-4'>Rattings for this tool</h1>
                        <div>
                            <h3 style={{fontSize: '12px'}} className="flex justify-center text-white">How was the performance of this equipment? <span className='text-slate-400 ml-1 hover:text-white'>{numberOfUserRattings[0]} people rated</span></h3>
                            <div className='flex justify-evenly items-center'>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <span
                                        key={value}
                                        onClick={() => setEquipmentPerformance(value)}>
                                        <IoStar size={25} color={`${value <= equipmentPerformanceDB ? 'crimson' : 'white'}`}></IoStar>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className='mb-3'><Divider color='slategrey'></Divider></div>

                        <div>
                            <h3 style={{fontSize: '12px'}} className="flex justify-center text-white">How was the customer service? <span className='text-slate-400 ml-1 hover:text-white'>{numberOfUserRattings[1]} people rated</span></h3>
                            <div className='flex justify-evenly items-center'>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <span
                                        key={value}
                                        onClick={() => setCustomerService(value)}>
                                        <IoStar size={25} color={`${value <= customerServiceDB ? 'crimson' : 'white'}`}></IoStar>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className='mb-3'><Divider color='slategrey'></Divider></div>

                        <div>
                            <h3 style={{fontSize: '12px'}} className="flex justify-center text-white">Are you satiesfied with the support services? <span className='text-slate-400 ml-1 hover:text-white'>{numberOfUserRattings[2]} people rated</span></h3>
                            <div className='flex justify-evenly items-center'>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <span
                                        key={value}
                                        onClick={() => setSupportServices(value)}>
                                        <IoStar size={25} color={`${value <= supportServicesDB ? 'crimson' : 'white'}`}></IoStar>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className='mb-3'><Divider color='slategrey'></Divider></div>

                        <div>
                            <h3 style={{fontSize: '12px'}} className="flex justify-center text-white">How was the support after sales? <span className='text-slate-400 ml-1 hover:text-white'>{numberOfUserRattings[3]} people rated</span></h3>
                            <div className='flex justify-evenly items-center'>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <span
                                        key={value}
                                        onClick={() => setAfterSales(value)}>
                                        <IoStar size={25} color={`${value <= afterSalesDB ? 'crimson' : 'white'}`}></IoStar>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className='mb-3'><Divider color='slategrey'></Divider></div>

                        <div>
                            <h3 style={{fontSize: '12px'}} className="flex justify-center text-white">Are you satiesfieds with miscellaneous support? <span className='text-slate-400 ml-1 hover:text-white'>{numberOfUserRattings[4]} people rated</span></h3>
                            <div className='flex justify-evenly items-center'>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <span
                                        key={value}
                                        onClick={() => setMiscellaneous(value)}>
                                        <IoStar size={25} color={`${value <= miscellaneousDB ? 'crimson' : 'white'}`}></IoStar>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                        </div>
                    </div>
                </div>


                {/* Description for computer..... */}
                <div className='lg:block justify-between hidden md:hidden my-[25px]'>
                    <p style={{ whiteSpace: 'pre-line' }}>{individualProduct?.description}</p>

                    <div>
                        <h1 style={{ color: 'crimson' }} className='flex justify-center text-3xl my-4'>Rattings for this tool</h1>
                        <div>
                            <h3 className="flex justify-center text-white text-xl">How was the performance of this equipment? <span className='text-slate-400 ml-3 hover:text-white'>{numberOfUserRattings[0]} people rated</span></h3>
                            <div className='flex justify-evenly items-center'>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <span
                                        key={value}
                                        onClick={() => setEquipmentPerformance(value)}>
                                        <IoStar size={25} color={`${value <= equipmentPerformanceDB ? 'crimson' : 'white'}`}></IoStar>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className='mb-3'><Divider color='slategrey'></Divider></div>

                        <div>
                            <h3 className="flex justify-center text-white text-xl">How was the customer service? <span className='text-slate-400 ml-3 hover:text-white'>{numberOfUserRattings[1]} people rated</span></h3>
                            <div className='flex justify-evenly items-center'>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <span
                                        key={value}
                                        onClick={() => setCustomerService(value)}>
                                        <IoStar size={25} color={`${value <= customerServiceDB ? 'crimson' : 'white'}`}></IoStar>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className='mb-3'><Divider color='slategrey'></Divider></div>

                        <div>
                            <h3 className="flex justify-center text-white text-xl">Are you satiesfied with the support services? <span className='text-slate-400 ml-3 hover:text-white'>{numberOfUserRattings[2]} people rated</span></h3>
                            <div className='flex justify-evenly items-center'>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <span
                                        key={value}
                                        onClick={() => setSupportServices(value)}>
                                        <IoStar size={25} color={`${value <= supportServicesDB ? 'crimson' : 'white'}`}></IoStar>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className='mb-3'><Divider color='slategrey'></Divider></div>

                        <div>
                            <h3 className="flex justify-center text-white text-xl">How was the support after sales? <span className='text-slate-400 ml-3 hover:text-white'>{numberOfUserRattings[3]} people rated</span></h3>
                            <div className='flex justify-evenly items-center'>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <span
                                        key={value}
                                        onClick={() => setAfterSales(value)}>
                                        <IoStar size={25} color={`${value <= afterSalesDB ? 'crimson' : 'white'}`}></IoStar>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className='mb-3'><Divider color='slategrey'></Divider></div>

                        <div>
                            <h3 className="flex justify-center text-white text-xl">Are you satiesfieds with miscellaneous support? <span className='text-slate-400 ml-3 hover:text-white'>{numberOfUserRattings[4]} people rated</span></h3>
                            <div className='flex justify-evenly items-center'>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <span
                                        key={value}
                                        onClick={() => setMiscellaneous(value)}>
                                        <IoStar size={25} color={`${value <= miscellaneousDB ? 'crimson' : 'white'}`}></IoStar>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div>
                <div className='flex justify-between items-center'>
                    <h1 className=''> <svg className="gradient-text lg:text-2xl text-xl font-bold" width="100%" height="38" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style={{ stopColor: 'white' }} />
                                <stop offset="50%" style={{ stopColor: 'magenta' }} />
                                <stop offset="100%" style={{ stopColor: 'rgb(28,97,231)' }} />
                            </linearGradient>
                        </defs>
                        <text x="50%" y="30" fill="url(#gradient)" textAnchor="middle">Comments and reviews</text>
                    </svg></h1>

                    <span className={`${IndividualCSS.plusCommnet}`} onClick={handleUserWantsToComment}><FaPlus size={25}></FaPlus></span>
                </div>
                <Divider color='crimson'></Divider>
            </div>


            {
                individualProduct?.comments?.length > 0 ? <div className='mb-8'>
                    <CommentsAndReviews individualProduct={individualProduct} setIndividualProduct={setIndividualProduct}></CommentsAndReviews>
                </div> : <p className='mt-2 flex justify-center'>Be the first one to comment</p>
            }



            {/* The modal for taking comment and stars of the mentioned field */}
            {
                (isLoggedIn || authenticatedUser) ? <dialog id="readyToCommentModal" className="modal">
                    <div className={`${IndividualCSS.toCommentModal} modal-box`}>

                        <span onClick={HandlePostingCommentOnTool} style={{ zIndex: '1' }} className={`${IndividualCSS.postingComment} w-[165px]`}><span className='flex justify-center'>Post</span></span>

                        <div>
                            <h1 className='mb-1'>Leave your comment</h1>
                            <div className={`flex items-center ${MyServiceCSS.tableRoomInput}`}>
                                <textarea
                                    onChange={(e) => setComment(e.target.value)}
                                    style={{
                                        borderRadius: verificationFieldsRound,
                                        background: 'white',
                                    }}
                                    placeholder={`Hi ${authenticatedUser.name || isLoggedIn.name} Please type your comment here`}
                                    className={`w-full h-[55px] focus:outline-none border-0 pl-1 text-black`}
                                    type="text"
                                    name=""
                                    id=""
                                />
                            </div>
                        </div>

                        <div className='mb-3'><Divider color='crimson'></Divider></div>

                        <div>
                            <h3 className="flex justify-center text-white text-xl">How was the performance of this equipment?</h3>
                            <div className='flex justify-evenly items-center'>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <span
                                        key={value}
                                        onClick={() => setEquipmentPerformance(value)}>
                                        <IoStar size={25} color={`${value <= equipmentPerformance ? 'crimson' : 'white'}`}></IoStar>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className='mb-3'><Divider color='slategrey'></Divider></div>

                        <div>
                            <h3 className="flex justify-center text-white text-xl">How was the customer service?</h3>
                            <div className='flex justify-evenly items-center'>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <span
                                        key={value}
                                        onClick={() => setCustomerService(value)}>
                                        <IoStar size={25} color={`${value <= customerService ? 'crimson' : 'white'}`}></IoStar>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className='mb-3'><Divider color='slategrey'></Divider></div>

                        <div>
                            <h3 className="flex justify-center text-white text-xl">Are you satiesfied with the support services?</h3>
                            <div className='flex justify-evenly items-center'>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <span
                                        key={value}
                                        onClick={() => setSupportServices(value)}>
                                        <IoStar size={25} color={`${value <= supportServices ? 'crimson' : 'white'}`}></IoStar>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className='mb-3'><Divider color='slategrey'></Divider></div>

                        <div>
                            <h3 className="flex justify-center text-white text-xl">How was the support after sales?</h3>
                            <div className='flex justify-evenly items-center'>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <span
                                        key={value}
                                        onClick={() => setAfterSales(value)}>
                                        <IoStar size={25} color={`${value <= afterSales ? 'crimson' : 'white'}`}></IoStar>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className='mb-3'><Divider color='slategrey'></Divider></div>

                        <div>
                            <h3 className="flex justify-center text-white text-xl">Are you satiesfieds with miscellaneous support?</h3>
                            <div className='flex justify-evenly items-center'>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <span
                                        key={value}
                                        onClick={() => setMiscellaneous(value)}>
                                        <IoStar size={25} color={`${value <= miscellaneous ? 'crimson' : 'white'}`}></IoStar>
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog> : <dialog id="loginModal" className="modal">
                    <div style={{
                        color: 'white',
                        background: 'black',
                        border: '2px solid crimson'
                    }} className="modal-box">
                        <SheltonLogin setIsLoggedIn={setIsLoggedIn}></SheltonLogin>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            }



            {/* The warning modal to delete the product*/}
            <dialog id="beforeDelete" className="modal">
                <div style={{
                    color: 'white',
                    background: 'black',
                    border: '2px solid crimson'
                }} className="modal-box">
                    <div>
                        <h3 className="flex justify-center text-white items-center gap-x-2"><span><TbAlertOctagonFilled size={30} color={'black'}></TbAlertOctagonFilled></span> <span>Hey, Attention please!</span></h3>
                        <h1 className="flex justify-center">Do you want to delete this product?</h1>
                        <h1 className="flex justify-center">This is not reverseable!</h1>
                        <div className='flex justify-between items-center mt-[24px]'>
                            <div onClick={() => document.getElementById('beforeDelete').close()}>
                                <button className={`btn border-0 btn-sm bg-white text-black w-[150px] normal-case `}>Cancel</button>
                            </div>

                            <div onClick={handleDeleteProductByAdmin} className={`${IndividualCSS.theButton}`}>
                                {
                                    <button className={`btn border-0 btn-sm w-[150px] normal-case ${DashboardCSS.IndividualProductBuyNowButton}`}>Delete Tool</button>
                                }

                            </div>

                        </div>

                    </div>

                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>


            {/* Modal for successfully hired a tool */}
            <dialog id="placeOrderModal" className="modal">
                <div style={{
                    color: 'white',
                    background: 'black',
                    border: '2px solid crimson'
                }} className="modal-box">
                    Your hiring request is receieved. Please wait for the confirmation! <br></br>
                    Thank you so fuch for being with <span className='underline'>Shelton-tool</span>

                    <p onClick={() => router.push('/user-order')} className='flex items-center gap-x-3 text-slate-300 hover:text-white hover:cursor-pointer mt-3 justify-center'>Go to Dashboard</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>



            {/* Modal for taking user more information for hiring a tool */}
            <dialog id="toolHiringForm" className="modal">
                <div style={{
                    color: 'white',
                    background: 'black',
                    border: '2px solid crimson'
                }} className="modal-box">
                    <UserFormForHiringTool setPhoneNumber={setPhoneNumber} setAddress={setAddress} authenticatedUser={authenticatedUser} phoneNumber={phoneNumber} address={address}></UserFormForHiringTool>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>);
};

export default ProductSlider;