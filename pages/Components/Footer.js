import { useRouter } from 'next/navigation';

import DashboardCSS from '../../style/Dashboard.module.css';
import Divider from './Divider';

const Footer = () => {
    const router = useRouter();
    return (
        <div>
             <div className={`w-full`}>
        <div
          style={{
            background: "crimson",
            backgroundSize: "100%",
            backgroundRepeat: "repeat",
          }}
          className="w-full from-pink-500 hover:to-yellow-500"
        >
          
          <div className={`grid items-center justify-between lg:flex md:flex p-2`}>
          
                <div className={`grid pr-3 ${DashboardCSS.footerSection}`}>
                <div className='flex gap-x-2'>
                    <img className="w-[40px] h-[40px]" src='https://i.ibb.co/gJnXcnr/warranty-pydevjpu0ksaoe56zppn6sssu17uopoopt2wib2t10.png' alt="" />

                    <div>
                    <span style={{
                        fontWeight: "700",
                        fontSize: "22px",
                        color: 'white', 
                    }}>1 Year Warranty</span>
                    <p className={`${DashboardCSS.footerContent}`}>Take your replacement for any kind of quality issues.</p>
                    </div>
                    </div> 
                </div>


                <div className={`grid pr-3 ${DashboardCSS.footerSection}`}>
                    <div className='flex gap-x-2'>
                    <img className="w-[40px] h-[40px]" src='https://i.ibb.co/k5GFZK6/customer-service-pydf1i11asxo7hhw8ackzapw9vvjfpbhj9tlxe91mc.png' alt="" />

                    <div>
                    <span style={{
                        fontWeight: "700",
                        fontSize: "22px",
                        color: 'white', 
                    }}>24/7 Support.</span>
                    <p className={`${DashboardCSS.footerContent}`}>Contact through email or messenger 24/7.</p>
                    </div>
                    </div>
                </div>


                <div className='grid pr-3'>
                <div className='flex gap-x-2'>
                    <img className="w-[40px] h-[40px]" src='https://i.ibb.co/553gtwH/cash-back-pydf8sa09kwo6owyoxphsyji0dyy398ljbu2tlg7ec.png' alt="" />

                    <div>
                    <span style={{
                        fontWeight: "700",
                        fontSize: "22px",
                        color: 'white', 
                    }}>Money Back Gurantee</span>
                    <p className={`${DashboardCSS.footerContent}`}>If does not suit, get your money back!</p>
                    </div>
                    </div>
                </div>
          </div>

          
          <div>
            <Divider color='rgba(255, 255, 255, 0.685)' height='1px'></Divider>
            </div>


            <div className={`grid justify-around lg:flex md:flex p-2 mt-4`}>
                <div className='grid '>
                    <div>
                    <span style={{
                        fontWeight: "700",
                        fontSize: "22px",
                        color: 'white', 
                    }}>POLICY</span>

                    <p className={`${DashboardCSS.footerContent}`}>Terms & Conditions</p>

                    <p className={`${DashboardCSS.footerContent}`}>Privacy Policy</p>
                    
                    </div>
                </div>


                <div className='grid my-4 lg:my-0 md:my-0'>
                    <div>
                    <span style={{
                        fontWeight: "700",
                        fontSize: "22px",
                        color: 'white', 
                    }}>INFORMATIONS</span>
                    <p className={`${DashboardCSS.footerContent}`}>About us</p>
                    <p className={`${DashboardCSS.footerContent}`}>Contact us</p>
                    </div>
                </div>

                <div>
                <img className="lg:w-[520px] lg:h-[135px] md:w-[450px] md:h-[125px] w-full h-auto" src='https://urbalandbd.com/wp-content/uploads/2021/09/sslcommerze-systems.jpg' alt="" />

                
                </div>
          </div>

          <div>
            <Divider color='rgba(255, 255, 255, 0.685)' height='1px'></Divider>
            </div>

            <p className='flex justify-center py-4' style={{color: 'rgba(255, 255, 255, 0.685)'}}>Your PC builder © All Rights Reserved, 2023.</p>

        </div>
      </div>
            
        
        </div>
    );
};

export default Footer;








// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// const Footer = () => {
//     const router = useRouter(); 
//     const [localStorageUser, setLocalStorageUser] = useState({});
//     useEffect(() => {
//         const localStorageSavedUser = JSON.parse(localStorage.getItem('savedUser'));
//         if (localStorageSavedUser) {
//             setLocalStorageUser(localStorageSavedUser);
//         }
//     }, [])
//     return (
//         <div style={{ background: `${router.pathname == '/' ? 'black' : 'linear-gradient(45deg, #643843, #B799FF)'}`}} className={`pb-10 lg:pb-0 md:pb-0`}>
//             <footer class="footer p-10 Footer grid md:flex lg:flex justify-around text-base-content">
//                 <div className=''>
//                     <span style={{
//                         fontWeight: "700",
//                         fontSize: "22px",
//                         lineHeight: "41px",
//                         color: `${router.pathname == '/' ? 'purple' : '#11009E'}`, 
//                     }} class=" block mb-[20px] font-serif ">Trading Platform</span>
//                     <p class={`cursor-pointer font-serif ${router.pathname == '/' ? 'text-white' : 'text-white'}`}>Minimum Deposit of 100 usdt</p>
//                     <p class={`cursor-pointer font-serif ${router.pathname == '/' ? 'text-white' : 'text-white'}`}>Maximum Deposit 1,00,000 USD</p>
//                     <p class={`cursor-pointer font-serif ${router.pathname == '/' ? 'text-white' : 'text-white'}`}>Stable profit (1--2%) every Day</p>
//                     <p class={`cursor-pointer font-serif ${router.pathname == '/' ? 'text-white' : 'text-white'}`}>Guaranteed profit... (No loss)</p>
//                 </div>

//                 {/* Useful Links */}
//                 <div className=''>
//                     <span style={{
//                         color: '#61876E',
//                         fontWeight: "700",
//                         fontSize: "22px",
//                         lineHeight: "41px",
//                         color: `${router.pathname == '/' ? 'purple' : '#11009E'}`, 
//                     }} class=" mb-[20px] font-serif ">Level 3 Commission (One time)</span>
//                     <a class={`cursor-pointer font-serif ${router.pathname == '/' ? 'text-white' : 'text-white'}`}>Investment locked 365 days...</a>
//                     <Link href='/' class={`cursor-pointer font-serif ${router.pathname == '/' ? 'text-white' : 'text-white'}`}>Weekly 2 days off ( Saturday & Sunday)</Link>
//                     <a class={`cursor-pointer font-serif flex justify-center items-center ${router.pathname == '/' ? 'text-white' : 'text-white'}`}>
//                         <p className=''>Withdraw Every day 24 hours</p>
//                     </a>
//                     <a class={`cursor-pointer font-serif ${router.pathname == '/' ? 'text-white' : 'text-white'}`}>Minimum Withdrawal 20 usdt</a>
                    
//                 </div>
//                 <div className=''>
//                     <span style={{
//                         color: '#61876E',
//                         fontWeight: "700",
//                         fontSize: "22px",
//                         lineHeight: "41px",
//                         color: `${router.pathname == '/' ? 'purple' : '#11009E'}`, 
//                     }} class=" mb-[20px] font-serif">Lifetime Income Guaranteed</span>
//                     <a class={`cursor-pointer font-serif ${router.pathname == '/' ? 'text-white' : 'text-white'}`}>Maximum withdrawal of 10000 usdt Daily</a>
//                     <Link href='/' class={`cursor-pointer font-serif ${router.pathname == '/' ? 'text-white' : 'text-white'}`}>Withdrawal fee only 3%</Link>
//                     <a class="cursor-pointer font-serif flex justify-center items-center  text-white">
//                         <p className={`${router.pathname == '/' ? 'text-white' : 'text-white'}`}>Withdrawal to account within (1-- 24 hours)</p>
//                     </a>
//                     <a class={`cursor-pointer font-serif ${router.pathname == '/' ? 'text-white' : 'text-white'}`}>Payment methods: USDT TRC-20</a>
                    
//                 </div>

//                 {/* ml-2 md:ml-10 lg:ml-2 */}
                
//             </footer>
//         </div>
//     );
// };

// export default Footer;