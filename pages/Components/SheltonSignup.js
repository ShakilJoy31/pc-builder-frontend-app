import {
  useEffect,
  useState,
} from 'react';

import { signIn } from 'next-auth/react';
import {
  AiFillEye,
  AiFillEyeInvisible,
} from 'react-icons/ai';

import { AuthenticUser } from '@/userStore';

import { CustomerAPI } from '../../APIcalling/customerAPI';
import DashboardCSS from '../../style/Dashboard.module.css';

const Page = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVasible, setIsPasswordVasible] = useState(true);
    const [signedInUser, setSignedInUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { authenticatedUser, setAuthenticatedUser } = AuthenticUser.useContainer();
    
    const formData = { 'name': name, 'phone': phone, 'email': email, 'password': password };

    useEffect(() => {
        CustomerAPI.handleLoggedInUsers().then(res => setSignedInUser(res));
    }, [])
    setTimeout(function () {
        if (errorMessage) {
            setErrorMessage('')
        }
    }, 3800);
    const foundDatabaseUser = signedInUser?.find(matchedGmail => matchedGmail?.email === email);
    const handleSignInButton = () => {
        setLoading(true);
        if (!foundDatabaseUser) {
            CustomerAPI.handleSignin(formData).then(res => {
                setLoading(false);
                setAuthenticatedUser({user: formData});
                document.getElementById('signupModal').close();
            })
        }
        else {
            setErrorMessage('Email already exists!')
            setLoading(false);
        }
    }
    return (
        <div>
            {
                errorMessage && <p className='flex justify-center' style={{ padding: '5px', border: '1px solid crimson', background: 'rgba(220, 20, 60, 0.208)', marginTop: '-10px' }}>{errorMessage}</p>
            }

            <div>
                <h1 className="flex justify-center text-4xl text-white">Sign up here</h1>
                <div className="flex justify-center mt-6">
                    <div>
                        <div className='mb-8'>
                            <input style={{ border: '1px solid crimson' }} onChange={(e) => setName(e.target.value)} type="text" placeholder='Type your name here' className="w-[290px] bg-black border-0 lg:w-96 md:w-96 input focus:outline-none" />
                            <br />
                            <input style={{ border: '1px solid crimson' }} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Type your email here' className="w-[290px] my-6 bg-black border-0 lg:w-96 md:w-96 input focus:outline-none" required />
                            <br />
                            <div style={{ border: '1px solid crimson' }} className="flex items-center justify-between bg-black border-0 rounded-lg">
                                <input onChange={(e) => setPassword(e.target.value)} type={isPasswordVasible ? 'password' : 'text'} placeholder='Type your passwor' className="mr-4 bg-black border-0 w-[200px] lg:w-72 md:w-72 input focus:outline-none" />
                                {
                                    isPasswordVasible ? <span onClick={() => setIsPasswordVasible(!isPasswordVasible)} className="mr-2"><AiFillEyeInvisible size={25}></AiFillEyeInvisible></span> : <span onClick={() => setIsPasswordVasible(!isPasswordVasible)} className="mr-2"><AiFillEye size={25}></AiFillEye></span>
                                }
                            </div>

                        </div>
                        {
                            !loading ? <button onClick={handleSignInButton} className={`block w-full mx-auto normal-case border-0 btn mb-4 btn-sm ${DashboardCSS.loginButton}`}>Sign up</button> : <div>
                                <span style={{ color: 'white' }} className="loading loading-ring w-12 h-12 block mx-auto"></span>
                            </div>
                        }


                        <button onClick={() => signIn("github")} className={`btn border-0 mb-4 w-full btn-sm normal-case ${DashboardCSS.productBuyNowButton}`}>Login with Github</button>

                    </div>
                </div>
                <span onClick={() => {
                    document.getElementById('loginModal').showModal();
                    document.getElementById('signupModal').close();
                }} className={`${DashboardCSS.date} hover:cursor-pointer flex justify-center`}>Already have an account. Login</span>
            </div>
        </div>
    )
}

export default Page; 