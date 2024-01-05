// import Link from "next/link";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { BiRestaurant } from "react-icons/bi";
// import { RiLogoutCircleRLine } from "react-icons/ri";
// import { AiFillSetting } from "react-icons/ai";
// import { BsSearch } from "react-icons/bs";
// import { CgProfile } from "react-icons/cg";

// const Navbar = () => {
//     return (
//         <div>
//             <div style={{
//                 backgroundColor: '#247f9e',
//             }} className="flex items-center justify-between navbar">
//                 <Link href='/' className={`text-xl normal-case focus:cursor-pointer`}> <span className="flex items-center">
//                     <span><BiRestaurant size={55} color={'rgba(0, 170, 255, 0.672)'}></BiRestaurant></span> <san style={{
//                         color: '#FFE15D'
//                     }} className='hidden mr-2 lg:ml-2 md:ml-2 lg:text-3xl md:text-2xl lg:block md:block'>Ommrito</san>
//                 </span> </Link>
//                 <div className="flex-none md:gap-4 lg:gap-6">

//                     <Link className="hidden text-xl lg:block md:block hover:text-black" href='/cart'>My Cart</Link>


//                     <Link className="hidden text-xl lg:block md:block hover:text-black" href='/userReservation'>Reservation</Link>

//                     <Link className="hidden text-xl lg:block md:block hover:text-black" href='/feedback'>Feedback</Link>


//                     <div>
//                         <label htmlFor="my-modal-3" className="hidden text-xl cursor-pointer lg:block md:block hover:text-black">Login</label>
//                     </div>



//                     <div>
//                         <label htmlFor="my-modal-4" className="hidden text-xl cursor-pointer lg:block md:block hover:text-black">Sign up</label>
//                     </div>


//                     <div className='form-control'>
//                         <input type='text' placeholder='Search food' className="mr-[10px] lg:mr-[0px] md:mr-[0px] focus:outline-none input lg:w-full w-52 pl-8" />
//                         <span style={{
//                             position: 'absolute',
//                             top: '29px',
//                             marginLeft: '10px'
//                         }}><BsSearch></BsSearch></span> :
//                     </div>


//                     <div className="dropdown dropdown-end mr-[10px] lg:mr-[0px] md:mr-[0px]">
//                         <label tabIndex={0} className=" avatar">

//                             <div className="w-10 rounded-full">
//                                 <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPyGNr2qL63Sfugk2Z1-KBEwMGOfycBribew&usqp=CAU' />
//                             </div>

//                         </label>
//                         <ul style={{
//                             backgroundColor: '#19A7CE',
//                             borderRadius: '5px'
//                         }} tabIndex={0} className="w-64 p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box">

//                             <li>
//                                 <Link className="block lg:hidden md:hidden" href='/userReservation'>Reservation</Link>
//                             </li>


//                             <li>
//                                 <Link className="block lg:hidden md:hidden hover:text-black" href='/cart'>My Cart</Link>
//                             </li>



//                             <li>
//                                 <Link className="block lg:hidden md:hidden hover:text-black" href='/feedback'>Feedback</Link>
//                             </li>



//                             <li>
//                                 <Link className="justify-between text-white hover:bg-white hover:text-black" href='/myProfile'>My Profile <span><CgProfile size={20} color={'black'}></CgProfile></span></Link>
//                             </li>

//                             <li className="text-white rounded-lg hover:bg-white hover:text-black"><label className="flex items-center justify-between" htmlFor="settingsModal"><a>Settings</a> <span><AiFillSetting size={20} color={'black'}></AiFillSetting></span></label>
//                             </li>


//                             <label htmlFor="logOutModal" className="">
//                                 <li><a className="flex items-end justify-between text-white hover:bg-white hover:text-black">
//                                     <span>Logout</span>
//                                     <RiLogoutCircleRLine size={20} color={'red'}></RiLogoutCircleRLine>
//                                 </a></li>
//                             </label>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Navbar;