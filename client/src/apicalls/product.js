
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

  //get all products
  export const getAllProducts =  async() =>{
    try{
        const response = await axiosInstance.get("/products")
        return response.data;
    }catch(error){
        return error.message;
    }
  };