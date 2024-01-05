import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { IoStar } from 'react-icons/io5';

import { ProductsStore } from '@/userStore';

import DashboardCSS from '../style/Dashboard.module.css';
import PauseOnHover from './Components/PauseOnHover';

export default function Home() {
  const router = useRouter();

  const [supportServicesDB, setSupportServices] = useState(0);
  const { products, setProducts } = ProductsStore.useContainer();
  console.log(products);
  return (
    <div className='min-h-screen'>
      <div data-aos="zoom-in-up">
        <PauseOnHover></PauseOnHover>
      </div>

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
              <text className='lg:text-3xl md:text-2xl text-xl' x="10" y="30" fill="url(#gradient)" textAnchor="start">Let`&apos;`s build your PC together</text>
            </svg>
          </h1>
        </div>

        {
          products?.length < 1 ? <div className='w-full min-h-screen items-center flex justify-center'>
            <div>
              <span style={{ color: 'crimson' }} className="loading loading-ring w-24 h-24 block mx-auto"></span>
              {/* <span className="loading loading-ring loading-lg"></span> */}
              <p style={{ fontFamily: 'Lucida Sans Unicode' }} className='text-white flex justify-center'>Loading. Please wait...</p>
            </div>
          </div> : <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] my-6 w-full' style={{ overflow: 'hidden' }}>
              {
                products?.map((product, index) => <div style={{
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


                      <div onClick={() => {
                        router.push(`/${product._id}`)
                        localStorage.setItem("beeRawCartSingle", JSON.stringify([product]));
                      }} className='mt-3'>
                        <button className={`btn border-0 btn-sm w-full normal-case ${DashboardCSS.productBuyNowButton}`}>See Details</button>

                      </div>
                    </div>
                  </div>

                </div>)
              }
            </div>
          </div>
        }
      </div>
      {/* <div className={`${pcHome.productCard}`}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFAPGTLLvbf0gGlFl6LUfcCZY-fyc6W6lLnYAt96Ryxg&s" alt="Product Image" />
        <h2 className={`${pcHome.productName}`}>Product Name</h2>
        <p className={`${pcHome.category}`}>Category</p>
        <p className={`${pcHome.price}`}>Price</p>
        <p className={`${pcHome.status}`}>In Stock</p>
        <div>
          <h3 style={{ fontSize: '12px' }} className="flex justify-center text-white">Are you satiesfied with the support services?</h3>
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
        <a href="#" className="product-link">View Details</a>
      </div> */}

    </div>
  )
}
