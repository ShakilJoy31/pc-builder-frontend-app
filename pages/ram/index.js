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

import DashboardCSS from '../../style/Dashboard.module.css';
import { CustomerAPI } from '../APIcalling/customerAPI';

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [fetchedData, setFetchedData] = useState([]); 
  const [isPCBuilder, setIsPCBuilder] = useState(false);
  const [supportServicesDB, setSupportServices] = useState(0);
  useEffect(() => {
    CustomerAPI.handleGettingProducts(1, 'RAM').then(res => {
      setFetchedData(res);
    });
    if (JSON.parse(localStorage.getItem('RAM'))) {
      setIsPCBuilder(true);
    }
    Aos.init({ duration: 500 });
}, [])
const [message, setMessage] = useState('');

setTimeout(function () {
        if(message){
            setMessage('')
        }
    }, 3800);
  const handlePCBuilderButton = (getProduct) => {
  const newParticularMenu = getProduct;
      let cart = JSON.parse(localStorage.getItem("ProductsForPCBuilding")) || [];
       const isAlreadyInCart = cart.find(item => item?.category === getProduct?.category);
      if (!isAlreadyInCart) {
          cart.push(newParticularMenu);
          localStorage.setItem("ProductsForPCBuilding", JSON.stringify(cart));
          localStorage.setItem("RAMForPCBuilding", JSON.stringify(getProduct));
          localStorage.removeItem('RAM');
          router.push(`/pc-builder`)
      }else{
        localStorage.removeItem('RAM');
        setMessage('Product and Category should not match. But Unforunitelly it does!')
      }
}
  return (
    <div className="min-h-screen">
         <div className='lg:mx-[48px] md:mx-[36px] mx-[24px]'>
        <div className='flex justify-between items-center'>
          <h1 className='block mx-auto w-full mt-4'>
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
              <text className='lg:text-3xl md:text-2xl text-xl' x="10" y="30" fill="url(#gradient)" textAnchor="start">RAM (Random Access Memory)</text>
            </svg>
          </h1>
        </div>

        <div className='mt-4'>
        {
          message && <p className='flex justify-center' style={{ padding: '5px', border: '1px solid crimson', background: 'rgba(220, 20, 60, 0.208)', marginTop: '-10px' }}>{message}</p>
        }
        </div>
{
          fetchedData?.length < 1 ? <div className='w-full min-h-screen items-center flex justify-center'>
            <div>
              <span style={{ color: 'crimson' }} className="loading loading-ring w-24 h-24 block mx-auto"></span>
              {/* <span className="loading loading-ring loading-lg"></span> */}
              <p style={{ fontFamily: 'Lucida Sans Unicode' }} className='text-white flex justify-center'>Loading. Please wait...</p>
            </div>
          </div> : <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] my-6 w-full' style={{ overflow: 'hidden' }}>
              {
                fetchedData?.map((product, index) => <div style={{
                  borderRadius: '8px',
                  border: '2px solid crimson'
                }} key={index} className={`w-full hover:cursor-pointer ${DashboardCSS.imageContainer} ${DashboardCSS.productBackground}`} data-aos="zoom-in-up">
                  <div style={{ position: 'absolute', top: '0', zIndex: '1' }} className='flex justify-between w-full'>
                    <div>
                      <img className='h-full' src="https://i.ibb.co/XYxDz3W/Rectangle-223.png" alt="" />
                      <p style={{ position: 'absolute', top: '20px', transform: 'rotate(-45deg)', color: 'yellow' }}>{product?.status}</p>
                    </div>
                  </div>
                  <div onClick={() => {
                    {
                      router.push(`/${product._id}`)
                      localStorage.setItem("beeRawCartSingle", JSON.stringify([product]));
                    }
                    localStorage.setItem("beeRawCartSingle", JSON.stringify([product]));
                  }} className={`${DashboardCSS.imageContainer}`}>
                    <figure><img className='lg:h-[220px] md:h-[200px] h-[180px]' src={product?.image} alt="Product Image" style={{ width: '100%', objectFit: 'cover', borderRadius: '0 8px 0 0' }} /></figure>
                  </div>

                  <div className=''>
                    <div className='mt-1'>
                      <div className="px-1">
                        <h2 onClick={() => {
                          router.push(`/${product._id}`)
                          localStorage.setItem("beeRawCartSingle", JSON.stringify([product]));
                        }} className={`${DashboardCSS.productTitle} h-[25px] lg:h-[25px]`}>{product.productName}</h2>

                        <div className="flex justify-between items-center">
                          <div className='flex justify-between items-center w-full'>
                            <p style={{ color: 'white' }} onClick={() => {
                              router.push(`/${product._id}`)
                              localStorage.setItem("beeRawCartSingle", JSON.stringify([product]));
                            }}>{product.price} ৳</p>
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


                      {
                        isPCBuilder ? <div onClick={() => handlePCBuilderButton(product)} className='mt-3'>
                          <button className={`btn border-0 btn-sm w-full normal-case ${DashboardCSS.productBuyNowButton}`}>Add To Builder</button>
                        </div> : <div onClick={() => {
                          router.push(`/${product._id}`)
                          localStorage.setItem("beeRawCartSingle", JSON.stringify([product]));
                        }} className='mt-3'>
                          <button className={`btn border-0 btn-sm w-full normal-case ${DashboardCSS.productBuyNowButton}`}>See Details</button>
                        </div>
                      }
                    </div>
                  </div>

                </div>)
              }
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default Page;