import React, { useEffect, useState } from 'react'
import {TrashIcon} from '@heroicons/react/24/solid'
import { deleteSavedImages, uploadImage, getSavedImages } from '../apicalls/product';
import { message } from 'antd';


const Upload = ({editProductId,setActiveTabKey}) => {
  const [previewImages,setPreviewImages] = useState([]);
  const [images,setImages] = useState([]);
  const [savedImages, setSavedImages] = useState([]);

  const getImages = async (product_id) => {
    try{
      const response =  await getSavedImages(product_id);
      if(response.isSuccess){
        setSavedImages(response.data.images)
        
      }else{
        throw new Error(response.message);
      }
    }catch(err){
      message.error(err.message)
    }
  };
  useEffect((_) => { 
    getImages(editProductId);
  },[])
  
//client-side function
  const onChangeHandler = (event) =>{
    const selectedImages = event.target.files ;
    const selectedImagesArray = Array.from(selectedImages);
    setImages((prev) => [...prev,...selectedImagesArray]);
    const previewImagesArray = selectedImagesArray.map(img => {
      return URL.createObjectURL(img);
    });
    setPreviewImages((prev) => prev.concat(previewImagesArray));
  }
//client-side delete function(deleteHandler)
  const deleteHandler = (img) =>{
    const indexToDelete = previewImages.findIndex((e) => e === img);
    if(indexToDelete !== -1){
      const updatedSelectedImages = [...images];
      updatedSelectedImages.splice(indexToDelete,1);
      setImages(updatedSelectedImages);
      setPreviewImages((prevImg) => prevImg.filter(e => e !== img))
      URL.revokeObjectURL(img);
    }
  };

 const submitHandler = async(e) =>{
        e.preventDefault();
        const formData = new FormData();
        for(let i=0; i < images.length; i++){
          formData.append("product_images",images[i]);
        }
        formData.append("product_id",editProductId);
      try{
        const response = await uploadImage(formData);
          if (response.isSuccess) {
              message.success(response.message);
              setActiveTabKey("1")
            } else {
              throw new Error(response.message);
            }
          } catch (err) {
            message.error(err.message);
          }}
  
  const savedImageDeleteHandler = async(img) =>{
        setSavedImages(prev => prev.filter((e => e !== img)));
        try{
          const response = await deleteSavedImages({productId : editProductId ,imgToDelete : img});
          if (response.isSuccess) {
              message.success = response.message;
          } else {
            throw new Error(response.message);
          }
        }catch(err){
          message.error(err.message)
        }
  }

  return <section>
    <h1 className='text-2xl font-bold mb-4 text-blue-600'>Upload your product's images here</h1>
    <div className='mt-2'>
      <h1 className='text-base font-medium '>Saved images in cloud</h1>  
      {
        savedImages.length > 0 ? 
        <div className='flex flex-row gap-2 mt-2 mb-6'>
        {
          savedImages.map(e => (<div key={e} className='basis-1/6 h-32 relative'>
            <img src={e} alt={e} className='w-full h-full object-cover rounded-md'/>
            <TrashIcon width={20} height={20} 
              className='absolute z-20 bottom-2 right-3  text-white cursor-pointer'
              onClick={() => savedImageDeleteHandler(e)}/>
          </div>))
        }
        </div> : 
        <p className='text-red-600 text-sm mb-5'>No images are not saved</p>
      }
    </div>
  
    <form method="post" encType='multipart/form-data' onSubmit={submitHandler}>
        <label htmlFor="upload" className="p-4 rounded-md border-dashed border-2 border-blue-600 font-medium mb-3 text-blue-600 cursor-pointer">Upload</label>
        <input type="file" hidden 
        id='upload' 
        name='product_images' 
        multiple
        accept='image/png,image/jpeg,image/jpg'
        onChange={onChangeHandler}/>
        <div className=' flex-row gap-2 mt-4 '>
          {previewImages && 
            previewImages.map((img,index) => (
            <div key={index} className='basis-1/6 h-32 relative'>
              <img src={img} alt={index} className='w-full h-full object-cover rounded-md'/>
              <TrashIcon width={20} height={20} 
              className='absolute z-20 bottom-2 right-3  text-white cursor-pointer'
              onClick={() => deleteHandler(img)}/>

            </div>
            ))
          }
        </div>
        <button className='block my-4 text-white bg-blue-600 rounded-md px-3 py-2 font-medium'>Upload</button>
    </form>
  </section>
}

export default Upload