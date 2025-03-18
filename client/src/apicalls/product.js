
import {axiosInstance} from "/src/apicalls/axiosInstance.js" 

//sell product
export const sellProduct = async(payload)=>{   
    try{ 
       const response = await axiosInstance.post("/create-product",payload) 
       return response.data;
      }catch(error){
          return error.message;
      }
  };