import {
  useEffect,
  useState,
} from 'react';

import { createContainer } from 'unstated-next';

function useUserStore () {
    const [user, setUser] = useState([]); 
    return {user, setUser}; 
}
export const UserStore = createContainer(useUserStore);


function useProductStore () {
    const [products, setProducts] = useState([]); 
    return {products, setProducts}; 
}
export const ProductsStore = createContainer(useProductStore);

// categorywise products....
function useCategoryWiseProductStore () {
    const [catrProducts, setCatrProducts] = useState([]);
    return {catrProducts, setCatrProducts};
}
export const CategoryWisedProductsStore = createContainer(useCategoryWiseProductStore);

function useLoggedInUserStore () {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(()=>{
        if(JSON.parse(localStorage.getItem('user'))){
            setIsLoggedIn(JSON.parse(localStorage.getItem('user')))
        }
    },[])
    return {isLoggedIn, setIsLoggedIn};
}
export const LoggedInUserStore = createContainer(useLoggedInUserStore);

function useCommentPermission () {
    const [isCommentPermission, setIsCommentPermission] = useState('');
    return {isCommentPermission, setIsCommentPermission};
}
export const CommentPermission = createContainer(useCommentPermission);

function useAuthenticUser () {
    const [authenticatedUser, setAuthenticatedUser] = useState(false);
    useEffect(()=>{
        if (JSON.parse(localStorage.getItem('AdminUser'))) {
            setAuthenticatedUser(JSON.parse(localStorage.getItem('AdminUser')));
        }
    },[])
    return {authenticatedUser, setAuthenticatedUser};
}
export const AuthenticUser = createContainer(useAuthenticUser);


// This state is decleared for blur.
function useBlueForSafety () {
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(()=>{
        if (JSON.parse(localStorage.getItem('authenticAdmin')) === 'authenticAdmin') {
            setIsModalOpen(false);
        }else{
            setIsModalOpen(true);
        }
    },[])
    return {isModalOpen, setIsModalOpen};
}
export const BlurForSafety = createContainer(useBlueForSafety);