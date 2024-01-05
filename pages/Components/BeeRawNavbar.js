"use client"
import 'aos/dist/aos.css';

import React, { useEffect } from 'react';

import Aos from 'aos';
import {
  usePathname,
  useRouter,
} from 'next/navigation';

import { ProductsStore } from '@/userStore';

import { CustomerAPI } from '../APIcalling/customerAPI';

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { products, setProducts } = ProductsStore.useContainer();
  useEffect(() => {
    Aos.init({ duration: 500 });
    if (JSON.parse(localStorage.getItem('editable'))) {
      setIsAdmin(true);
    }
    if (JSON.parse(localStorage.getItem('user'))) {
      setIsLoggedIn(true);
    }
  }, [])
  const getOneRandomProductFromEachCategory = (productsByCategory) => {
    return productsByCategory?.map((categoryData) => {
        const { category, products } = categoryData;
        if (products.length > 0) {
            const randomIndex = Math.floor(Math.random() * products.length);
            return products[randomIndex];
        }
        // Return a default value if there are no products in the category
        return null; // or any other default value you prefer
    }).filter((product) => product !== null); // Filter out default values, if any
};



  useEffect(() => {
    CustomerAPI.getCategorizedProductsForCustomer().then(res => {
      setProducts(getOneRandomProductFromEachCategory(res))
    })
  }, [])

  return (
    <div style={{background: 'radial-gradient(circle, #5c0067 0%, #00d4ff 100%)'}} className="navbar">
      <div className="flex-1">
        <a onClick={()=> router.push('/')} className="btn btn-outline bg-purple-600 lg:text-xl text-white border-0">Home</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>
                Categories
              </summary>
              <ul style={{background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)', zIndex: '2'}} className="p-2 rounded-t-none w-[216px]">
                <li onClick={()=> router.push('/processor')}><a>CPU / Processor</a></li>
                <li onClick={()=> router.push('/motherboard')}><a>Motherboard</a></li>
                <li onClick={()=> router.push('/ram')}><a>RAM</a></li>
                <li onClick={()=> router.push('/power-supply-unit')}><a>Power Supply Unit</a></li>
                <li onClick={()=> router.push('/storage-device')}><a>Storage Device</a></li>
                <li onClick={()=> router.push('/monitor')}><a>Monitor</a></li>
                <li onClick={()=> router.push('/other')}><a>Others (Mouse, Keyboard etc)</a></li>
              </ul>
            </details>
          </li>
          <li onClick={()=> router.push('/pc-builder')}><a>Pc Builder</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Page;