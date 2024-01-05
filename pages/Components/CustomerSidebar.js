"use client"
import React, { useState } from 'react';

import {
  usePathname,
  useRouter,
} from 'next/navigation';
import { ImCross } from 'react-icons/im';

import DashboardCSS from '../../style/Dashboard.module.css';
import {
  AuthenticUser,
  BlurForSafety,
  LoggedInUserStore,
} from '../../userStore';

const CustomerSidebar = ({ drawer }) => {
    const { isModalOpen, setIsModalOpen } = BlurForSafety.useContainer();
    const { isLoggedIn, setIsLoggedIn } = LoggedInUserStore.useContainer();
    const { authenticatedUser, setAuthenticatedUser } = AuthenticUser.useContainer();
    const router = useRouter();
    const pathname = usePathname();
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const handleHomeImage = () => {
        setIsBackgroundActive(true);
        router.push('/products')
        setTimeout(() => {
            setIsBackgroundActive(false);
        }, 3000);
    };

    return (
        <div style={{ background: 'black', filter: `${(isModalOpen && (pathname === '/admin' || pathname === '/admin/user-order')) ? 'blur(3px)' : ''}` }} className={`h-full w-[300px] md:w-[310px] lg:w-[320px]`}>
            <div style={{ overflow: 'hidden' }} className={`h-full text-white ${DashboardCSS.customerSidebar} ${DashboardCSS.sidebarBackground}`}>

                <div className={`flex items-center justify-around w-full lg:pt-[24px] pt-[10px]`}>

                    <div className='flex items-center gap-x-2'>
                        <p onClick={handleHomeImage} className={`${DashboardCSS.sheltonTools} hover:cursor-pointer`}><span>Shelton Tools</span></p> 
                    </div>

                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <span className='block lg:hidden md:hidden'>
                            {drawer}
                            <ImCross color={'white'} size={25} />
                        </span>
                    </label>
                </div>

                <div className={`${DashboardCSS.content}`} style={{ overflowY: 'scroll', height: '90vh' }}>

                    {
                        (isLoggedIn) &&  <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <div style={{ paddingTop: '4px', paddingBottom: '4px', paddingLeft: '16px' }} onClick={() => router.push('/user-order')}
                            className={`flex items-center gap-x-4 mx-[24px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/building-construction-equipment' ? DashboardCSS.sidebarHeadingSelected : ''}`}>
                            <p  className='flex items-center gap-x-3 text-slate-300 hover:text-white hover:cursor-pointer justify-center'>Go to Dashboard</p>
                        </div>
                    </label>
                    }

                    {
                        (authenticatedUser) &&  <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <div style={{ paddingTop: '4px', paddingBottom: '4px', paddingLeft: '16px' }} onClick={() => router.push('/admin/user-order')}
                            className={`flex items-center gap-x-4 mx-[24px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/building-construction-equipment' ? DashboardCSS.sidebarHeadingSelected : ''}`}>
                            <p  className='flex items-center gap-x-3 text-slate-300 hover:text-white hover:cursor-pointer justify-center'>Go to Admin Dashboard</p>
                        </div>
                    </label>
                    }
                   


                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <div style={{ paddingTop: '4px', paddingBottom: '4px', paddingLeft: '16px' }} onClick={() => router.push('/products/building-construction-equipment')}
                            className={`flex items-center gap-x-4 mx-[24px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/building-construction-equipment' ? DashboardCSS.sidebarHeadingSelected : ''}`}>
                            <p>Building Construction Equipment</p>
                        </div>
                    </label>

                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <div onClick={() => router.push('/products/cleaning-equipment')}
                            className={``}>
                            <div className={`flex items-center mx-[24px] pl-[16px] py-[4px] gap-x-4 ${DashboardCSS.sidebarHeading} ${pathname === '/products/cleaning-equipment' ? DashboardCSS.sidebarHeadingSelected : ''}`}>
                                <p className="">Cleaning Equipment</p>
                            </div>
                        </div>

                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                            <div onClick={() => router.push('/products/decorating-tools')}
                                className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/decorating-tools' ? DashboardCSS.sidebarHeadingSelected : ''}`}
                            >
                                <p>Decorating tools</p>
                            </div>
                        </label>

                        <div onClick={() => router.push('/products/landscaping-tools')}
                            className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/landscaping-tools' ? DashboardCSS.sidebarHeadingSelected : ''}`}>
                            <p>Landscaping tools</p>
                        </div>
                    </label>

                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <div onClick={() => router.push('/products/electrical-and-heating-tools')}
                            className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/electrical-and-heating-tools' ? DashboardCSS.sidebarHeadingSelected : ''}`}>
                            <p>Electrical & Heating tools</p>
                        </div>
                    </label>

                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <div onClick={() => router.push('/products/plumbing-tools')}
                            className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/plumbing-tools' ? DashboardCSS.sidebarHeadingSelected : ''}`}
                        >
                            <p>Plumbing tools</p>
                        </div>
                    </label>


                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <div onClick={() => router.push('/products/automotive-tools')}
                            className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/automotive-tools' ? DashboardCSS.sidebarHeadingSelected : ''}`}
                        >
                            <p>Automotive Tools</p>
                        </div>
                    </label>

                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <div onClick={() => router.push('/products/carpentry-quipment')}
                            className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/carpentry-quipment' ? DashboardCSS.sidebarHeadingSelected : ''}`}
                        >
                            <p>Carpentry Equipment</p>
                        </div>
                    </label>

                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <div onClick={() => router.push('/products/painting-tools')}
                            className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/painting-tools' ? DashboardCSS.sidebarHeadingSelected : ''}`}>
                            <p>Painting Tools</p>
                        </div>
                    </label>

                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <div onClick={() => router.push('/products/masonry-tools')}
                            className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/masonry-tools' ? DashboardCSS.sidebarHeadingSelected : ''}`}>
                            <p>Masonry Tools</p>
                        </div>
                    </label>

                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <div onClick={() => router.push('/products/woodworking-machinery')}
                            className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/woodworking-machinery' ? DashboardCSS.sidebarHeadingSelected : ''}`}>
                            <p>Woodworking Machinery</p>
                        </div>
                    </label>


                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <div onClick={() => router.push('/products/flooring-and-tiling-equipment')}
                            className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/flooring-and-tiling-equipment' ? DashboardCSS.sidebarHeadingSelected : ''}`}>
                            <p>Flooring and Tiling Equipment</p>
                        </div>
                    </label>

                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <div onClick={() => router.push('/products/welding-and-metalworking-tools')}
                            className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/welding-and-metalworking-tools' ? DashboardCSS.sidebarHeadingSelected : ''}`}>
                            <p>Welding and Metalworking Tools</p>
                        </div>
                    </label>

                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <div onClick={() => router.push('/products/demolition-equipment')}
                            className={`flex items-center gap-x-4 mx-[24px] py-[4px] pl-[16px] ${DashboardCSS.sidebarHeading} ${pathname === '/products/demolition-equipment' ? DashboardCSS.sidebarHeadingSelected : ''}`}>
                            <p>Demolition Equipment</p>
                        </div>
                    </label>

                </div>
            </div>
        </div>
    );
};

export default CustomerSidebar;