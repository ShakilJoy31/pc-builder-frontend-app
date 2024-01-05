import axios from 'axios';

import {
  BASE_URL,
  categorizedProductsAPI,
  commentDeleteByAdmin,
  gettingAllProductsAPI,
  placedOrderAPI,
  productsGettingAPI,
  reviewDeleteByAdmin,
} from '@/constants/routeConstants';

// Fetching all product for search. 
const handleGettingAllProducts = async () => {
  const axiosInstance = axios.create({
      baseURL: BASE_URL
    });
  try {
    const response = await axiosInstance.get(gettingAllProductsAPI);
    return response.data;
  } catch (error) {
  }
};



// Fetching caterized products.....
const getCategorizedProductsForCustomer = async () => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL
  });
  try {
    const response = await axiosInstance.get(categorizedProductsAPI);
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

// Fetching specific category products.....
const handleGettingProducts = async (pageNumber, category) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL
  });

  try {
    let apiUrl = `${BASE_URL}${productsGettingAPI}?page=${pageNumber}`;
    if (category) {
      apiUrl += `&category=${category}`;
    }
    const response = await axiosInstance.get(apiUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const handleGettingProduct = async (productId) => {
  console.log(productId);
  const axiosInstance = axios.create({
    baseURL: BASE_URL
  });
console.log(productId);
  try {
    const response = await axiosInstance.get(`/get-product/${productId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};



const userInformationForPlacOrderProduct = async (payload) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL
  });
  try {
    const response = await axiosInstance.post(placedOrderAPI, payload);
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

const addComment = async (toolId, comment) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL
  });
  try {
    const response = await axiosInstance.post(`/add-comment/${toolId}`, comment);
    return response.data;
  } catch (error) {
    // console.error(error);
    // throw new Error("Failed to add comment");
  }
};

// Delete comment bu admin
const handleDeletingCommentByAdmin = async (toolId, commentId) => {
  const axiosInstance = axios.create({
      baseURL: BASE_URL
  });

  try {
      const response = await axiosInstance.delete(`${commentDeleteByAdmin}${toolId}/${commentId}`);
      return response.data;
  } catch (error) {
    return error;
  }
};


const addReviewToComment = async (toolId, getReview) => {
  console.log(getReview);
  const axiosInstance = axios.create({
    baseURL: BASE_URL
  });
  try {
    const response = await axiosInstance.post(`/add-review/${toolId}`, getReview);
    return response.data;
  } catch (error) {
    console.error(error);
    // throw new Error("Failed to add review");
  }
};

// Delete review by admin
const handleDeletingReviewByAdmin = async (toolId, commentId, reviewDataToDelete) => {
  console.log(reviewDataToDelete);
  const axiosInstance = axios.create({
      baseURL: BASE_URL
  });

  try {
      const response = await axiosInstance.post(`${reviewDeleteByAdmin}${toolId}/${commentId}`, {reviewDataToDelete: reviewDataToDelete});
      console.log(response);
      return response.data;
  } catch (error) {
    return error;
  }
};


// Authentication for the user. 
const handleSignin = async (payload) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL
  });
  try {
    const response = await axiosInstance.post('/signup', payload);
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

const handleLoggedInUsers = async () => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL
  });
  try {
    const response = await axiosInstance.get('/loggedin-users');
    return response.data;
  } catch (error) {
    console.log(error)
  }
};




export const CustomerAPI = {
  handleGettingProducts,
  userInformationForPlacOrderProduct,
  handleGettingProduct,
  getCategorizedProductsForCustomer,
  handleGettingAllProducts,
  addComment,
  addReviewToComment,
  handleSignin,
  handleLoggedInUsers,
  handleDeletingCommentByAdmin,
  handleDeletingReviewByAdmin
}
