import {
  useEffect,
  useState,
} from 'react';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  AiFillEye,
  AiFillEyeInvisible,
} from 'react-icons/ai';

import { CustomerAPI } from '../../APIcalling/customerAPI';
import DashboardCSS from '../../style/Dashboard.module.css';
import {
  AuthenticUser,
  CommentPermission,
} from '../../userStore';

const Page = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVasible, setIsPasswordVasible] = useState(true);
    const [loggedInUser, setLoggedInUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { isCommentPermission, setIsCommentPermission } = CommentPermission.useContainer();
    const { authenticatedUser, setAuthenticatedUser } = AuthenticUser.useContainer();

    useEffect(() => {
        CustomerAPI.handleLoggedInUsers().then(res => setLoggedInUser(res));
    }, [])

    setTimeout(function () {
        if (errorMessage) {
            setErrorMessage('')
        }
    }, 3800);
    const handleLoginButton = () => {
        setLoading(true);
        const foundDatabaseUser = loggedInUser.find(matchedGmail => matchedGmail?.email === email && matchedGmail?.password === password);
        if (foundDatabaseUser) {
            const checkLocalStorage = JSON.parse(localStorage.getItem('user'));
            if (!checkLocalStorage) {
                setLoading(false);
                setIsCommentPermission('You are permitted to comment and review!');
                if (email === 'lukman@admin.com' && password === 'password') {
                    setAuthenticatedUser(foundDatabaseUser);
                    router.push('/admin');
                    localStorage.setItem('AdminUser', JSON.stringify(foundDatabaseUser));
                } else {

                    localStorage.setItem('user', JSON.stringify(foundDatabaseUser));
                }
                document.getElementById('loginModal').close();
            }
        }
        else {
            setLoading(false);
            setErrorMessage('UPPS! Invalid Gmail or Password')
        }
    }
    return (
        <div>
            {
                errorMessage && <p className='flex justify-center' style={{ padding: '5px', border: '1px solid crimson', background: 'rgba(220, 20, 60, 0.208)', marginTop: '-10px' }}>{errorMessage}</p>
            }

            <h1 className="flex justify-center text-4xl text-white">Login here</h1>
            <div className="flex justify-center">
                <div>
                    <div className='my-6'>

                        <input style={{ border: '1px solid crimson' }} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Type your email here' className="w-[290px] bg-black border-0 lg:w-96 md:w-96 input focus:outline-none block mx-auto mb-4" required />


                        <div style={{ border: '1px solid crimson' }} className="flex items-center justify-between bg-black border-0 rounded-lg w-[290px] lg:w-96 md:w-96">
                            <input onChange={(e) => setPassword(e.target.value)} type={isPasswordVasible ? 'password' : 'text'} placeholder='Type your password' className="mr-4 w-[270px] bg-black border-0 lg:w-96 md:w-96 input focus:outline-none" />
                            {
                                isPasswordVasible ? <span onClick={() => setIsPasswordVasible(!isPasswordVasible)} className="mr-2"><AiFillEyeInvisible size={25}></AiFillEyeInvisible></span> : <span onClick={() => setIsPasswordVasible(!isPasswordVasible)} className="mr-2"><AiFillEye size={25}></AiFillEye></span>
                            }
                        </div>
                    </div>

                    {
                        !loading ? <button onClick={handleLoginButton} className={`block w-full mx-auto normal-case border-0 btn mb-4 btn-sm ${DashboardCSS.loginButton}`}>Log in</button> : <div>
                            <span style={{ color: 'white' }} className="loading loading-ring w-12 h-12 block mx-auto"></span>
                        </div>
                    }

                    <button onClick={() => signIn("github")} className={`btn border-0 mb-4 w-full btn-sm normal-case ${DashboardCSS.productBuyNowButton}`}>Login with Github</button>

                </div>
            </div>
            <span onClick={() => {
                document.getElementById('signupModal').showModal();
                document.getElementById('loginModal').close();
            }} className={`${DashboardCSS.date} hover:cursor-pointer flex justify-center`}>New to Shelton tool? Sign up</span>
        </div>
    );
};

export default Page;