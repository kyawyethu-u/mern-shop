
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

  //get old product for editMode
  export const getOldProduct = async(id) =>{
    try{
        const response = await axiosInstance.get(`/products/${id}`)
        return response.data;
    }catch(error){
        return error.message;
    }
  }

//update product for editMode
export const updateProduct = async(payload) =>{
    try{
        const response = await axiosInstance.post("/update-product",payload) 
        return response.data;
        
    }catch(error){
        return error.message;
    }
}

//delete product
export const deleteProduct = async(id) =>{
    try{
        const response = await axiosInstance.delete(`/products/${id}`,
            {validateStatus: () => true}
        );
        return response.data;
    }catch(error){
        return error.message;
    }
}

//upload image
export const uploadImage = async(formData) =>{
    try{
        const response = await axiosInstance.post("/upload",formData,{
                validateStatus: () => true}
        );
        return response.data;
    }catch(error){
        return error.message;
    }
}

//get product saved images
export const getSavedImages = async(id) =>{
    try{
        const response = await axiosInstance.get(`/product-images/${id}`,{
                validateStatus: () => true}
        );
        return response.data;
    }catch(error){
        return error.message;
    }
}

//delete product saved images
export const deleteSavedImages = async(payload) =>{
  
    try{
        
        const {productId,imgToDelete} = payload;
        const encodeImgToDelete = encodeURIComponent(imgToDelete)
        const response = await axiosInstance.delete(`/product/images/destroy/${productId}/${encodeImgToDelete}`,{
                validateStatus: () => true}
        );
        return response.data;
    }catch(error){
        return error.message;
    }
}

////////////   Public   /////////////////////////////
//get product categories for home page
export const getProductCategories = async() =>{
    try{
        const response = await axiosInstance.get("/api/categories")
        return response.data;
    }catch(error){
        return error.message
    }
  }

  //   /api/products
  export const getApprovedProducts = async() =>{
    try{
        const response = await axiosInstance.get("/api/products")
        return response.data;
    }catch(error){
        return error.message
    }
  }

  //get products by filter
  export const getProductsByFilter = async(key,value)=>{
    try{
        const response = await axiosInstance.get(`/api/products/filters?${key}=${value}`)
        return response.data;
    }catch(error){
        return error.message
    }
  }

  //get product's detail by id
  export const getProductById = async(id)=>{
    try{
        const response = await axiosInstance.get(`/api/products/${id}`)
        return response.data;
    }catch(err){
        return err.message
    }
  }
  
  //save product
  export const savedProduct = async(id)=>{
    try{
        const response = await axiosInstance.post(`/saved-products/${id}`)
        return response.data;
    }catch(err){
        return err.message
    }
  }

  //get saved product
  export const getSavedProducts = async()=>{
    try{
        const response = await axiosInstance.get(`/saved-products`,{
            validateStatus: () => true})
        return response.data;
    }catch(err){
        return err.message
    }
  }

export const deleteSavedProduct = async(id)=>{
    try{
        const response = await axiosInstance.delete(`/unsaved-products/${id}`)

        return response.data;
    }catch(err){
        return err.message
    }
}