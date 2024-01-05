"use client"
import React, {
  useEffect,
  useState,
} from 'react';

import {
  usePathname,
  useRouter,
} from 'next/navigation';

import { CustomerAPI } from '@/APIcalling/customerAPI';

import DashboardCSS from '../../style/Dashboard.module.css';
import {
  ProductsStore,
  UserStore,
} from '../../userStore';

const Page = ({ dataForDynamicComponent }) => {
    const router = useRouter();
    const pathname = usePathname();
    const { user, setUser } = UserStore.useContainer();
    const { products, setProducts } = ProductsStore.useContainer();
    const [warning, setWarning] = useState(false);
    const [cartAddedMessage, setCartAddedMessage] = useState('');
    const filteredproducts = products?.filter(product => product.category === dataForDynamicComponent[0]);

    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);


    const handleBuyNowButton = (product) => {
        // setUser([product]);
        localStorage.setItem("beeRawCartSingle", JSON.stringify([product]));
        router.push('/checkout');
    }
    const handleItemAddToCart = (clickedProduct) => {
        const newParticularMenu = clickedProduct;
        let cart = JSON.parse(localStorage.getItem("beeRawCart")) || [];
        const isAlreadyInCart = cart.find(item => item._id === clickedProduct._id);
        if (!isAlreadyInCart) {
            cart.push(newParticularMenu);
            localStorage.setItem("beeRawCart", JSON.stringify(cart));
            setUser(cart);
            setCartAddedMessage('Product added successfully!')
            document.getElementById('alReadyExistsOnTheCartModal').showModal();
            setWarning(true)
        } else {
            setCartAddedMessage('Item already added!')
            document.getElementById('alReadyExistsOnTheCartModal').showModal();
            setWarning(true)
        }
    }
    setTimeout(function () {
        if (warning) {
            document.getElementById('alReadyExistsOnTheCartModal')?.close();
            setWarning(false);
        }
    }, 1800);

    const loadMoreProducts = async (page) => {
        if (!loading) {
            setLoading(true);
            const nextPageProducts = await CustomerAPI.handleGettingProducts(page, dataForDynamicComponent[0]);
            setProducts([...products, ...nextPageProducts]);
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchInitialProducts = async () => {
            const initialProducts = await CustomerAPI.handleGettingProducts(1, dataForDynamicComponent[0]);
            setProducts(initialProducts);
        };
        fetchInitialProducts();
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]); // Listen to changes in the loading state

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight
        ) {
            const nextPage = products.length / 20 + 1;
            loadMoreProducts(nextPage);
        }
    };
    return (
        <div>
            <h1 className='my-2'> <svg className="gradient-text text-3xl font-bold" width="100%" height="38" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: 'white' }} />
                        <stop offset="50%" style={{ stopColor: 'magenta' }} />
                        <stop offset="100%" style={{ stopColor: 'rgb(28,97,231)' }} />
                    </linearGradient>
                </defs>
                <text x="50%" y="30" fill="url(#gradient)" textAnchor="middle">{dataForDynamicComponent[1]}</text>
            </svg></h1>
            {
                filteredproducts?.length < 1 ? <div className='w-full min-h-screen items-center flex justify-center'>
                <div>
                    <span style={{ color: 'crimson' }} className="loading loading-ring w-24 h-24 block mx-auto"></span>
                    {/* <span className="loading loading-ring loading-lg"></span> */}
                    <p style={{ fontFamily: 'Lucida Sans Unicode' }} className='text-white flex justify-center'>Loading. Please wait...</p>
                </div>
            </div> : <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[24px] my-6 w-full' style={{ overflow: 'hidden' }}>

                    {
                        filteredproducts?.map((product, index) => <div style={{
                            borderRadius: '8px',
                            border: '2px solid crimson'
                        }} key={index} className={`w-full hover:cursor-pointer ${DashboardCSS.imageContainer} ${DashboardCSS.productBackground}`} data-aos="zoom-in-up">
                            <div onClick={() => {
                                {
                                    router.push(`/products/${product._id}`)
                                    localStorage.setItem("beeRawCartSingle", JSON.stringify([product]));
                                }
                                localStorage.setItem("beeRawCartSingle", JSON.stringify([product]));
                            }} className={`${DashboardCSS.imageContainer}`}>
                                <figure><img className='lg:h-[220px] md:h-[200px] h-[180px]' src={product?.productPicture[0]} alt="Product Image" style={{ width: '100%', objectFit: 'cover', borderRadius: '0 8px 0 0' }} /></figure>
                            </div>

                            <div style={{ position: 'absolute', bottom: '5px', zIndex: '3' }} className="px-1 w-full">
                                <h2 onClick={() => {
                                    router.push(`/products/${product._id}`)
                                    localStorage.setItem("beeRawCartSingle", JSON.stringify([product]));
                                }} className={`${DashboardCSS.productTitle} flex justify-center mb-[2px]`}>{product?.title}</h2>


                                <div className="flex justify-between items-center w-full">
                                    <p style={{fontSize: '13px'}} className='text-slate-400'>{product.hourlyHire}/hour</p>

                                    <p style={{fontSize: '13px'}} className='text-slate-400'>{product.dailyHire}/day</p>

                                    <p style={{fontSize: '13px'}} className='text-slate-400'>{product.longTermHire}/custom</p>
                                </div>
                            </div>

                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: '-2px',
                                    left: '0',
                                    width: '100%',
                                    height: '50%',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                                    zIndex: '2',
                                }}
                            ></div>

                        </div>)
                    }
                </div>
            }

            {
                loading && <div className='w-full min-h-screen items-center flex justify-center'>
                    <div>
                        <span style={{ color: 'crimson' }} className="loading loading-ring w-16 h-16 block mx-auto"></span>
                        {/* <span className="loading loading-ring loading-lg"></span> */}
                        <p style={{ fontFamily: 'Lucida Sans Unicode' }} className='text-white flex justify-center'>Loading. Please wait...</p>
                    </div>
                </div>
            }

            {/* The modal... */}
            <dialog id="alReadyExistsOnTheCartModal" className="modal" style={{ maxWidth: '480px', transform: 'translateX(-50%)', left: '50%' }}>
                <div style={{
                    color: 'white',
                    background: (cartAddedMessage === 'Product added successfully!' ? 'green' : '#DC3545'),
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