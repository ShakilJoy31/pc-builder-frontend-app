import axios from 'axios';

import {
  BASE_URL,
  editProductAPIForAdmin,
  placedOrderAPIForAdmin,
  productDeleteAPI,
  productDeleteByAdmin,
  productPostingAPI,
  productUpdateAPI,
} from '@/constants/routeConstants';

// Post request...
  const postingProducts = async (payload) => {
    const axiosInstance = axios.create({
      baseURL: BASE_URL,
    });
    try {
      const response = await axiosInstance.post(productPostingAPI, payload);
      return response.data;
    } catch (error) {
      return error;
    }
  };


  // Get request
  const handleGettingOrders = async () => {
    const axiosInstance = axios.create({
        baseURL: BASE_URL
      });
    try {
      const response = await axiosInstance.get(placedOrderAPIForAdmin);
      return response.data;
    } catch (error) {
    }
  };

  // Put request
  const handleUpdateProduct = async (productId, updatedData) => {
    const axiosInstance = axios.create({
      baseURL: BASE_URL,
    });
  
    try {
      const response = await axiosInstance.put(editProductAPIForAdmin+`${productId}`, updatedData);
      return response.data;
    } catch (error) {
      
    }
  };
  

  // Delete request
  const handleDeletingOrder = async (orderId) => {
    const axiosInstance = axios.create({
        baseURL: BASE_URL
    });

    try {
        const response = await axiosInstance.delete(`${productDeleteByAdmin}${orderId}`);
        return response.data;
    } catch (error) {
      console.log(error);
    }
};


  const handleDeletingProductByAdmin = async (productId) => {
    const axiosInstance = axios.create({
        baseURL: BASE_URL
    });

    try {
        const response = await axiosInstance.delete(`${productDeleteAPI}${productId}`);
        return response.data;
    } catch (error) {
    }
};


const handleAcceptOrderByAdmin = async (productId, payload) => {
  const axiosInstance = axios.create({
      baseURL: BASE_URL
  });
  try {
      const response = await axiosInstance.put(`${productUpdateAPI}/${productId}`, payload);
      return response.data;
  } catch (error) {
      console.error(error);
      throw error;
  }
};


  

  export const AdminAPI = {
    // handleGettingRestaurants,
    postingProducts,
    handleGettingOrders,
    handleDeletingOrder,
    handleUpdateProduct,
    handleDeletingProductByAdmin,
    handleAcceptOrderByAdmin
  }

