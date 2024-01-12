"use client"
import 'aos/dist/aos.css';

import React, { useEffect } from 'react';

import Aos from 'aos';
import {
  signOut,
  useSession,
} from 'next-auth/react';
import {
  usePathname,
  useRouter,
} from 'next/navigation';

import {
  AuthenticUser,
  ProductsStore,
} from '@/userStore';

import { CustomerAPI } from '../../APIcalling/customerAPI';
import SheltonLogin from '../../pages/Components/SheltonLogin';
import SheltonSignup from '../../pages/Components/SheltonSignup';
import DashboardCSS from '../../style/Dashboard.module.css';

const Page = () => {
  const { data: session } = useSession() 
  const router = useRouter(); 
  const pathname = usePathname();
  const { products, setProducts } = ProductsStore.useContainer();
  const { authenticatedUser, setAuthenticatedUser } = AuthenticUser.useContainer();

  useEffect(() => {
    Aos.init({ duration: 500 });
    if (session) {
      setAuthenticatedUser(session);
    }
  }, [session])
  const getOneRandomProductFromEachCategory = (productsByCategory) => {
    return productsByCategory?.map((categoryData) => {
      const { category, products } = categoryData;
      if (products.length > 0) {
        const randomIndex = Math.floor(Math.random() * products.length);
        return products[randomIndex];
      }
      return null; // or any other default value you prefer
    }).filter((product) => product !== null); // Filter out default values, if any
  };



  useEffect(() => {
    CustomerAPI.getCategorizedProductsForCustomer().then(res => {
      setProducts(getOneRandomProductFromEachCategory(res))
    })
  }, [])
  const handleClickedPCBuilderButton = () => {
    if(!session){
      document.getElementById('loginModal').showModal();
    }else{
      router.push('/pc-builder')
    }
  }
  return (
    <div style={{ background: 'radial-gradient(circle, #5c0067 0%, #00d4ff 100%)' }} className="navbar">
      <div className="flex-1">
        <button onClick={() => router.push('/')} className={`btn border-0 btn-sm normal-case ${DashboardCSS.productBuyNowButton}`}>Home</button>
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>
                Categories
              </summary>
              <ul style={{ background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)', zIndex: '2' }} className="p-2 rounded-t-none w-[216px]">
                <li onClick={() => router.push('/processor')}><a>CPU / Processor</a></li>
                <li onClick={() => router.push('/motherboard')}><a>Motherboard</a></li>
                <li onClick={() => router.push('/ram')}><a>RAM</a></li>
                <li onClick={() => router.push('/power-supply-unit')}><a>Power Supply Unit</a></li>
                <li onClick={() => router.push('/storage-device')}><a>Storage Device</a></li>
                <li onClick={() => router.push('/monitor')}><a>Monitor</a></li>
                <li onClick={() => router.push('/other')}><a>Others (Mouse, Keyboard etc)</a></li>
              </ul>
            </details>
          </li>

          <li onClick={handleClickedPCBuilderButton}><button className={`btn border-0 btn-sm lg:mx-6 md:mx-4 mx-2 normal-case ${DashboardCSS.productBuyNowButton}`}>PC Builder</button></li>

          {
            session ? <li onClick={() => signOut()}><button className={`btn border-0 btn-sm normal-case ${DashboardCSS.productBuyNowButton}`}>Log out</button></li> : <li onClick={() => document.getElementById('loginModal').showModal()}><button className={`btn border-0 btn-sm normal-case ${DashboardCSS.productBuyNowButton}`}>Login</button></li>
          }

        </ul>
      </div>



      {/* For login */}
      <dialog id="loginModal" className="modal">
        <div style={{
          color: 'white',
          background: 'black',
          border: '2px solid crimson'
        }} className="modal-box">
          <SheltonLogin></SheltonLogin>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>


      <dialog id="signupModal" className="modal">
        <div style={{
          color: 'white',
          background: 'black',
          border: '2px solid crimson'
        }} className="modal-box">
          <SheltonSignup></SheltonSignup>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>


      {/* For Sign up */}

    </div>
  );
};

export default Page;