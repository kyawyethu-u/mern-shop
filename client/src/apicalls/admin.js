import {axiosInstance} from "/src/apicalls/axiosInstance.js" 

 //get all products
 export const getAllProducts = async()=>{
    try{
        const response = await axiosInstance.get("/admin/products",
            {validateStatus: () => true}
        )
        return response.data;
    }catch(error){
        return error.message;
    }
 }

 //approve product
 export const approveProduct = async(productId) => {
    try{
        const response = await axiosInstance.post(`/admin/product-approve/${productId}`,
            {validateStatus: () => true}
        )
        return response.data;
    }catch(error){
        return error.message;
    }
 }

  //rollback product
  export const rejectProduct = async(productId) => {
    try{
        const response = await axiosInstance.post(`/admin/product-reject/${productId}`,
            {validateStatus: () => true}
        )
        return response.data;
    }catch(error){
        return error.message;
    }
 }

   //rollback product
   export const rollbackProduct = async(productId) => {
    try{
        const response = await axiosInstance.post(`/admin/product-rollback/${productId}`,
            {validateStatus: () => true}
        )
        return response.data;
    }catch(error){
        return error.message;
    }
 }
   
    //get users
    export const getAllUsers = async() =>{
        try{
            const response = await axiosInstance.get(`/admin/users`,{
                validateStatus: () => true}
            )
            return response.data;
        }catch(error){
            return error.message;
        }
    }
    // ban user
    export const banUser = async(userId) =>{
        try{
            const response = await axiosInstance.post(`/admin/ban-user/${userId}`,{
                validateStatus: () => true
            })
            return response.data;
        }catch(error){
            return error.message;
        }
    }
    //unban user
    export const unBanUser =  async(userId) =>{
        try{
            const response = await axiosInstance.post(`/admin/unban-user/${userId}`,{
                validateStatus: () => true
            })
            return response.data;
        }catch(error){
            return error.message;
        }
    }