"use client"
import React, {
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';

import { blackColor } from '@/constants/color-constants';
import {
  dashboardBottomHead,
  otpInputBorderRadius,
  relativePosition,
} from '@/constants/font-constants';
import { url } from '@/constants/image-constants';

import { AdminAPI } from '../../APIcalling/adminAPI';
import HomeComponentCss from '../../style/ComponentStyle.module.css';

const Page = () => {

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const router = useRouter();
    const [productToEdit, setProductToEdit] = useState('')
    const [title, setToolName] = useState('');
    const [price, setPrice] = useState('');
    const [offerPrice, setOfferPrice] = useState('');
    const [offer, setOffer] = useState('');
    const [color, setColor] = useState('');
    const [category, setCategory] = useState('Best seller');
    const [categories, setCategories] = useState('Building Construction equipment');
    const [catg, setCatg] = useState('Building Construction equipment');
    const [availability, setAvailability] = useState('In Stock');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState('');
    const [hostedImage, setHostedImage] = useState()
    const [hostedImages, setHostedImages] = useState([])
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        if (JSON.parse(localStorage.getItem('productToEdit'))) {
            setProductToEdit(JSON.parse(localStorage.getItem('productToEdit')));
            setToolName(JSON.parse(localStorage.getItem('productToEdit')).title);
            setPrice(JSON.parse(localStorage.getItem('productToEdit')).hourlyHire);
            setOfferPrice(JSON.parse(localStorage.getItem('productToEdit')).dailyHire);
            setOffer(JSON.parse(localStorage.getItem('productToEdit')).longTermHire);
            setColor(JSON.parse(localStorage.getItem('productToEdit')).color);

            setCatg(JSON.parse(localStorage.getItem('productToEdit')).category);

            setDescription(JSON.parse(localStorage.getItem('productToEdit')).description);
            setHostedImages(JSON.parse(localStorage.getItem('productToEdit')).productPicture);
        }
        if (JSON.parse(localStorage.getItem('editable'))) {
            setIsAdmin(true)
        }
    }, [])
    if (picture) {
        const formDataImage = new FormData();
        formDataImage.append("image", picture);
        fetch(url, {
            method: 'POST',
            body: formDataImage,
        })
            .then((res) => res.json())
            .then((result) => {
                setHostedImage(result.data.display_url);
                setHostedImages((prevImages) => [...prevImages, result.data.display_url]);
            });
        setPicture("");
    }
    const [cartAddedMessage, setCartAddedMessage] = useState('');
    const [warning, setWarning] = useState(false);
    setTimeout(function () {
        if (warning) {
            document.getElementById('alReadyExistsOnTheCartModal').close();
            setWarning(false);
        }
    }, 1800);
    const handleSubmitProduct = () => {
        const demoProducts =   {
            productId: '73',
            productName: 'Sennheiser HD 660 S Open-Back Headphones',
            category: 'Others',
            price: 429,
            status: 'In Stock',
            rating: 4.7,
            image: 'URL_to_the_headphone_product_image_73',
            description: 'Description of the Sennheiser HD 660 S Open-Back Headphones...',
            keyFeatures: {
              brand: 'Sennheiser',
              model: 'HD 660 S',
              type: 'Over-Ear',
              wired: '3.5mm / 6.35mm',
              openBack: 'Open-Back Design',
            },
            individualRating: 4.7,
            averageRating: 4.5,
            reviews: [],
          }
        AdminAPI.postingProducts(demoProducts).then(res => {
            console.log(res);
            if (res.acknowledged === true) {
                document.getElementById('alReadyExistsOnTheCartModal').showModal();
                setWarning(true)
                setCartAddedMessage('Product added successfully!')
            } else {
                document.getElementById('alReadyExistsOnTheCartModal').showModal();
                setWarning(true)
                setCartAddedMessage('OoppS! Failed.')
            }
        })
    }
    const handleRemoveImage = (getImage) => {
        const restImage = hostedImages?.filter(img => img !== getImage);
        setHostedImages(restImage);
    }
    return (
        <div className={`mt-[24px]`}>
            <div>
                <div className='flex lg:justify-end md:justify-end justify-center mb-2 gap-x-2'>
                    {
                        isAdmin ? '' : <button onClick={() => {
                            localStorage.setItem("editable", JSON.stringify('editable'));
                            router.push('/products');
                        }} style={{ background: 'purple', borderRadius: '5px' }} className="py-[5px] px-[3px] md:px-[3px] lg:px-[5px]">Edit Product</button>
                    }

                    <button onClick={() => router.push('/admin/user-order')} style={{ background: 'purple', borderRadius: '5px' }} className="py-[5px] px-[3px] md:px-[3px] lg:px-[5px]">Check Orders</button>

                    <button onClick={handleSubmitProduct} style={{ background: 'purple', borderRadius: '5px' }} className="py-[5px] px-[3px] md:px-[3px] lg:px-[5px]">{productToEdit ? 'Edit' : 'Upload'} Product</button>

                </div>

                <div>
                    <div>
                        <span className=''>Tool Name</span>
                        {
                            productToEdit ? <textarea onChange={(e) => setToolName(e.target.value)} style={{ background: 'purple' }} type="text" className="w-full pt-2 input focus:outline-none input-md" value={productToEdit && title} /> : <textarea onChange={(e) => setToolName(e.target.value)} style={{ background: 'purple' }} type="text" className="w-full pt-2 input focus:outline-none input-md" placeholder='Type title' />
                        }
                    </div>
                </div>


                <div>
                    <div>
                        <span className=''>Cost for Hourly Hire</span>
                        {
                            productToEdit ? <textarea onChange={(e) => setPrice(e.target.value)} style={{ background: 'purple' }} type="text" className="w-full pt-2 input focus:outline-none input-md " value={productToEdit && price} /> : <textarea onChange={(e) => setPrice(e.target.value)} style={{ background: 'purple' }} type="text" className="w-full pt-2 input focus:outline-none input-md " placeholder='Type price' />
                        }

                    </div>
                </div>


                <div>
                    <div>
                        <span className=''>Cost for Daily Hire</span>
                        {
                            productToEdit ? <textarea onChange={(e) => setOfferPrice(e.target.value)} style={{ background: 'purple' }} type="text" className="w-full pt-2 input focus:outline-none input-md " value={productToEdit && offerPrice} /> : <textarea onChange={(e) => setOfferPrice(e.target.value)} style={{ background: 'purple' }} type="text" className="w-full pt-2 input focus:outline-none input-md" placeholder='Type old price' />
                        }

                    </div>
                </div>


                <div>
                    <div>
                        <span className=''>Cost for Longer-Term Hire</span>
                        {
                            productToEdit ? <textarea onChange={(e) => setOffer(e.target.value)} style={{ background: 'purple' }} type="text" className="w-full pt-2 input focus:outline-none input-md " value={productToEdit && offer} /> : <textarea onChange={(e) => setOffer(e.target.value)} style={{ background: 'purple' }} type="text" className="w-full pt-2 input focus:outline-none input-md " placeholder='Type offer here' />
                        }

                    </div>
                </div>

                <div>
                    <div>
                        <span className=''>Category</span>
                        <div className='mb-[6px]'>
                            <div className='flex items-center justify-between gap-x-4'>
                                <select
                                    onChange={(e) => setCategories(e.target.value)}
                                    style={{ background: 'purple' }}
                                    className="w-full select focus:outline-none"
                                >
                                    {
                                        catg ? <option>{catg}</option> : ''
                                    }
                                    <option>Building Construction Equipment</option>
                                    <option>Cleaning Equipment</option>
                                    <option>Decorating tools</option>
                                    <option>Landscaping tools</option>
                                    <option>Electrical and Heating tools</option>
                                    <option>Plumbing tools</option>
                                    <option>Automotive Tools</option>
                                    <option>Carpentry Equipment</option>
                                    <option>Gardening Supplies</option>
                                    <option>Painting Tools</option>
                                    <option>Masonry Tools</option>
                                    <option>Woodworking Machinery</option>
                                    <option>Flooring and Tiling Equipment</option>
                                    <option>Welding and Metalworking Tools</option>
                                    <option>Demolition Equipment</option>
                                </select>

                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-[6px]'>
                    <div>
                        <span className=''>Description</span>
                        {
                            productToEdit ? <textarea onChange={(e) => setDescription(e.target.value)} style={{ background: 'purple' }} type="text" className="w-full pt-2 input-lg input focus:outline-none " value={productToEdit && description} /> : <textarea onChange={(e) => setDescription(e.target.value)} style={{ background: 'purple' }} type="text" className="w-full pt-2 input-lg input focus:outline-none " placeholder='Type description here' />
                        }
                    </div>
                </div>


                <div className='flex items-center'>
                    <div>
                        <span>Upload Profile Picture</span>
                        <div className='flex gap-x-4 mt-[10px] w-full'>
                            <div
                                style={{
                                    borderRadius: otpInputBorderRadius,
                                    border: dashboardBottomHead,
                                    background: 'purple',
                                    color: blackColor,
                                }}
                                className={`$${HomeComponentCss.customInputImageUpload} w-[120px] h-[120px] hover:cursor-pointer`}
                            >
                                <input onChange={(e) => setPicture(e.target.files[0])}
                                    style={{ position: "absolute", opacity: "0" }}
                                    type="file"
                                    className="h-[120px]"
                                />
                                <span className='flex justify-center mt-[32px]'><AiOutlineCloudUpload size={35} color={'white'}></AiOutlineCloudUpload></span>
                                <p className="flex justify-center text-white">
                                    Click to upload
                                </p>
                            </div>
                        </div>

                        <div className='grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 my-[24px]'>
                            {
                                hostedImages?.map((image, index) => <div key={index} style={{ position: relativePosition }}>
                                    <span onClick={() => handleRemoveImage(image)} style={{ position: 'absolute', top: '5px', right: '5px' }}><RxCross1 size={25} color={'red'}></RxCross1></span>
                                    <img
                                        className="w-[120px] h-[120px] rounded-sm"
                                        src={image}
                                        alt=""
                                    />
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>


            <dialog id="alReadyExistsOnTheCartModal" className="modal" style={{ maxWidth: '480px', transform: 'translateX(-50%)', left: '50%' }}>
                <div style={{
                    color: 'white',
                    background: ((cartAddedMessage === 'Product added successfully!' || cartAddedMessage === 'Update successfully!') ? 'green' : '#DC3545'),
                    border: '1px solid white'
                }} className="modal-box">
                    <h3 className="flex justify-center text-white">{cartAddedMessage}</h3>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </div>
    );
};

export default Page;