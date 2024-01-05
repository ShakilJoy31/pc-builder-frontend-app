import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React, {
  useEffect,
  useState,
} from 'react';

import Aos from 'aos';
import { useRouter } from 'next/navigation';
import { IoStar } from 'react-icons/io5';
import Slider from 'react-slick';

import { CustomerAPI } from '../../APIcalling/customerAPI';
import DashboardCSS from '../../style/Dashboard.module.css';

const SimpleSlider = () => {
    const router = useRouter();
    const [onlyBestSeller, setOnlyBestSeller] = useState([]);
    useEffect(() => {
        CustomerAPI.handleGettingProducts(1, 'CPUProcessor').then(res => {
            setOnlyBestSeller(res);
        });
        Aos.init({ duration: 500 });
    }, [])

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className='mt-[12px] bg-black'>
            <h1 className='my-2'> <svg className="gradient-text text-3xl font-bold" width="100%" height="38" xmlns="http://www.w3.org/2000/svg">
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
                <text style={{ fontSize: '20px' }} x="50%" y="30" fill="url(#gradient)" textAnchor="middle">Our Top Product</text>
            </svg></h1>

            <Slider {...settings}>
                {onlyBestSeller?.map((product, index) => (
                    <div onClick={() => router.push(`/${product._id}`)} key={index} className={`w-full px-2 hover:cursor-pointer ${DashboardCSS.carslImgContainer}`}>

                        <div style={{ position: 'absolute', bottom: '10px', zIndex: '3' }} className='px-2 w-full'>
                            <h1 className='h-8 flex justify-center font-bold'>{product?.productName}</h1>

                            <div className='flex justify-around items-center'>
                               
                                <p className='text-slate-300'>{product?.status}</p>
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
                                <p className='text-slate-300'>{product?.price} ৳</p>
                            </div>
                        </div>

                        <div className={`${DashboardCSS.carslImgContainer}`} style={{ border: '3px solid crimson', borderRadius: '8px' }}>
                            <figure><img src={product?.image} alt="Product Image" style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '8px' }} /></figure>
                        </div>

                        <div
                            style={{
                                position: 'absolute',
                                bottom: '0',
                                left: '0',
                                width: '100%',
                                height: '50%',
                                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                                zIndex: '2',
                            }}
                        ></div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default SimpleSlider;