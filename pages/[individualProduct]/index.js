"use client"
import React, {
  useEffect,
  useState,
} from 'react';

import {
  usePathname,
  useRouter,
} from 'next/navigation';
import { FaPlus } from 'react-icons/fa';
import { IoStar } from 'react-icons/io5';

import CommentsAndReviews from '../../pages/Components/CommentsAndReviews';
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
import { CustomerAPI } from '../APIcalling/customerAPI';
import Divider from '../Components/Divider';

const ProductSlider = () => {
    const pathname = usePathname();
    const clickedFor = pathname?.split("/")[pathname?.split("/").length - 1];
    const [individualProduct, setIndividualProduct] = useState([]);
    const [indRating, setIndRating] = useState([]);
    const [avgRating, setAvgRating] = useState([]);
    useEffect(() => {
        if (clickedFor) {
            CustomerAPI.handleGettingProduct(clickedFor).then(res => {
                if (res) {
                    setIndividualProduct(res)
                }
            })
        }
    }, [clickedFor])
    useEffect(()=>{
        console.log(individualProduct);
        if(individualProduct){
            const rattings = individualProduct?.comments?.map(comment => comment?.commentAndRating);
                    const equipmentRatting = rattings?.map(getValue => getValue?.individualRatting);
                    const customerServiceRatting = rattings?.map(getValue => getValue?.overallRatting);
                    
                    setIndRating(Math.round(equipmentRatting?.reduce((accumulator, currentValue) => {
                        if (typeof currentValue === 'number') {
                            return accumulator + currentValue;
                        }
                        return accumulator;
                    }, 0) / (rattings?.length)))
                    setAvgRating(Math.round(customerServiceRatting?.reduce((accumulator, currentValue) => {
                        if (typeof currentValue === 'number') {
                            return accumulator + currentValue;
                        }
                        return accumulator;
                    }, 0) / (rattings?.length)))
        }
    },[individualProduct])
    const { user, setUser } = UserStore.useContainer();
    const { products, setProducts } = ProductsStore.useContainer();
    const router = useRouter();
    const [supportServicesDB, setSupportServices] = useState(0);
    const [numberOfUserRattings, setNumberOfUserRattings] = useState([]);
    const [previewImage, setPreviewImage] = useState('');
    const [warning, setWarning] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = LoggedInUserStore.useContainer();
    const { isCommentPermission, setIsCommentPermission } = CommentPermission.useContainer();
    const { authenticatedUser, setAuthenticatedUser } = AuthenticUser.useContainer();

    setTimeout(function () {
        if (warning) {
            document.getElementById('readyToCommentModal')?.close();
            setWarning(false);
        }
    }, 1800);
    const handleReviewImage = (picture) => {
        setPreviewImage(picture)
    }

    const handleEditByAdmin = () => {
        localStorage.setItem("productToEdit", JSON.stringify(individualProduct));
        router.push('/admin');
    }


    // const handleDeleteProductByAdmin = () => {
    //     AdminAPI.handleDeletingProductByAdmin(individualProduct?._id).then(res => {
    //         if (res) {
    //             router.push('/products')
    //             document.getElementById('beforeDelete').close();
    //         }
    //     })
    // }
    const [customerService, setCustomerService] = useState(0);
    const [equipmentPerformance, setEquipmentPerformance] = useState(0);
    const [comment, setComment] = useState('');

    const handleUserWantsToComment = () => {
        document.getElementById('readyToCommentModal').showModal();
    }
    const HandlePostingCommentOnTool = async () => {
        const userComment = {
            name: authenticatedUser.name || isLoggedIn.name,
            comment: comment,
            individualRatting: equipmentPerformance,
            overallRatting: customerService
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
                CustomerAPI.handleGettingProduct(individualProduct?._id).then(res => {
                    setIndividualProduct(res);
                    document.getElementById('readyToCommentModal').close();
                });
            }
        });
    }


    // const handleUserWantsToComment = () => {
    //     if (isLoggedIn || authenticatedUser) {
    //         document.getElementById('readyToCommentModal').showModal();
    //     } else {
    //         setIsCommentPermission('Authentication is required!');
    //         document.getElementById('loginModal').showModal();
    //     }
    // }

    setTimeout(function () {
        if (isCommentPermission) {
            setIsCommentPermission('')
        }
    }, 3800);
    // States for the comment
    function getCurrentDateTime() {
        const currentDate = new Date();
        return currentDate.toLocaleString();
    }

    const [hiringCustom, setHiringCustom] = useState(0);
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
        <div className='min-h-screen' data-aos="zoom-in-up">
            {
                isCommentPermission && <p className='flex justify-center' style={{ padding: '5px', border: '1px solid crimson', background: 'rgba(220, 20, 60, 0.208)', marginTop: '10px' }}>{isCommentPermission}</p>
            }
            <div style={{ marginTop: '25px' }} className='text-white'>
                <div className={`${IndividualCSS.container}`}>
                    <div>
                        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                            <div className={`${IndividualCSS.previewImage}`}>
                                <span style={{ zIndex: '1' }} className={`${IndividualCSS.inStockSuggestion}`}>{individualProduct?.status}</span>
                                <img className={`${IndividualCSS.mainImage} w-full`} src={individualProduct?.image} />
                            </div>
                        </div>
                    </div>


                    <div className={`${IndividualCSS.headingLeftBorder} lg:pl-3 md:pl-2`}>
                        {
                            <div>
                                <h1 style={{ fontSize: '1.675rem', fontWeight: '700' }}>{individualProduct?.productName}</h1>
                            </div>
                        }
                        <div className=''>
                            <p>Category: {individualProduct?.category}</p>
                            <p>Price: {individualProduct?.price}</p>
                            <p>Key Features like Brand, Model, Specification, Port, Type, Resolution, Voltage, etc</p>
                            <div className='flex items-center gap-x-2'>
                                <h1>Individual Rating:</h1>
                                <div className='flex justify-evenly items-center'>
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <span
                                            key={value}
                                            onClick={() => setSupportServices(value)}>
                                            <IoStar size={25} color={`${value <= (Math.round(individualProduct?.comments?.map(comment => comment?.commentAndRating)?.map(getValue => getValue?.individualRatting)?.reduce((accumulator, currentValue) => {
                                  if (typeof currentValue === 'number') {
                                    return accumulator + currentValue;
                                  }
                                  return accumulator;
                                }, 0) / ((individualProduct?.comments?.map(comment => comment?.commentAndRating))?.length))) ? 'white' : 'rgba(255, 255, 255, 0.583)'}`}></IoStar>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className='flex items-center gap-x-2'>
                                <h1>Average Rating:</h1>
                                <div className='flex justify-evenly items-center'>
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <span
                                            key={value}
                                            onClick={() => setSupportServices(value)}>
                                            <IoStar size={25} color={`${value <= (Math.round(individualProduct?.comments?.map(comment => comment?.commentAndRating)?.map(getValue => getValue?.overallRatting)?.reduce((accumulator, currentValue) => {
                                  if (typeof currentValue === 'number') {
                                    return accumulator + currentValue;
                                  }
                                  return accumulator;
                                }, 0) / ((individualProduct?.comments?.map(comment => comment?.commentAndRating))?.length))) ? 'white' : 'rgba(255, 255, 255, 0.583)'}`}></IoStar>
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <p>Reviews</p>
                            <p>Description: {individualProduct?.description}</p>
                        </div>

                        {
                            authenticatedUser && <div className={`${IndividualCSS.theButton} my-[12px] mr-2`} onClick={handleEditByAdmin}>
                                <button className={`btn border-0 btn-sm w-full normal-case ${DashboardCSS.IndividualProductBuyNowButton}`}>Edit</button>
                            </div>
                        }

                        {
                            authenticatedUser && <div className={`${IndividualCSS.theButton} lg:hidden block md:hidden`} onClick={() => document.getElementById('beforeDelete').showModal()}>
                                <button className={`btn border-0 btn-sm w-full normal-case ${DashboardCSS.IndividualProductBuyNowButton}`}>Delete Tool</button>
                            </div>
                        }

                        <div className='lg:hidden block md:hidden my-[12px]'>
                            <p style={{ whiteSpace: 'pre-line' }}>{individualProduct?.description}</p>
                        </div>
                    </div>
                </div>
            </div>


            <div>
                <div className='flex justify-between m-4 items-center'>
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


            {/* The modal for commenting */}
            <dialog id="readyToCommentModal" className="modal">
                <div className={`${IndividualCSS.toCommentModal} modal-box`}>

                    <span onClick={HandlePostingCommentOnTool} style={{ zIndex: '1' }} className={`${IndividualCSS.postingComment} w-[165px]`}><span className='flex justify-center'>Post</span></span>

                    <div>
                        <h1 className='mb-1'>Leave your comment</h1>
                        <div className={`flex items-center ${MyServiceCSS.tableRoomInput}`}>
                            <textarea
                                onChange={(e) => setComment(e.target.value)}
                                style={{
                                    borderRadius: '8px',
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
                        <h3 className="flex justify-center text-white text-xl">We would like to have a ratting for this product.</h3>
                        <div className='flex justify-evenly items-center'>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <span
                                    key={value}
                                    onClick={() => setEquipmentPerformance(value)}>
                                    <IoStar size={25} color={`${value <= equipmentPerformance ? 'white' : 'rgba(255, 255, 255, 0.583)'}`}></IoStar>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className='mb-3'><Divider color='slategrey'></Divider></div>

                    <div>
                        <h3 className="flex justify-center text-white text-xl">We would like to have an overall ratting.</h3>
                        <div className='flex justify-evenly items-center'>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <span
                                    key={value}
                                    onClick={() => setCustomerService(value)}>
                                    <IoStar size={25} color={`${value <= customerService ? 'white' : 'rgba(255, 255, 255, 0.583)'}`}></IoStar>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>



            {/* The warning modal to delete the product*/}
            {/* <dialog id="beforeDelete" className="modal">
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
            </dialog> */}


            {/* Modal for successfully hired a tool */}
            {/* <dialog id="placeOrderModal" className="modal">
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
            </dialog> */}


            {/* Taking information */}
            {/* <dialog id="toolHiringForm" className="modal">
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
            </dialog> */}

        </div>);
};

export default ProductSlider;