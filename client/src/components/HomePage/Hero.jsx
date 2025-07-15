import {MagnifyingGlassIcon} from "@heroicons/react/24/solid"
import { getProductsByFilter } from "../../apicalls/product";
import { useState } from "react";
import { message } from "antd";

import {useDispatch} from "react-redux"
import {setLoader} from "../../store/slices/loaderSlice"


const Hero = ({setProducts,getAllProducts}) => {
  const [searchKey,setSearchKey] = useState("");
  const dispatch = useDispatch();
  
  
  const searchHandler = async() =>{
    dispatch(setLoader(true));
    try{
      const response = await getProductsByFilter("searchKey",searchKey)
      if(response.isSuccess){
        setProducts(response.productDocs)
      }else{
        throw new Error(response.message)
      }
    }catch(err){
      message.error(err.message)
    }
    dispatch(setLoader(false));
  }
  const clearHandler = () =>{
      setSearchKey("")
      getAllProducts()
  }
 
  return (
    <div className='w-full text-center mb-2 mt-10'>
        <h1 className='text-4xl font-bold text-blue-600 mb-4'>"Welcome"</h1>
        <p className='text-lg font-medium text-gray-500 max-w-xl mx-auto mb-4'>Your one-stop destination for unique finds, trusted sellers, and great deals—right here in your neighborhood.</p>
        <div className='max-w-sm mx-auto flex items-center gap-2'>
          <div className="relative w-full">
            <input type='text' className='bg-gray-100 outline-none p-2 rounded-xl w-full' 
            value={searchKey} onChange={e=>setSearchKey(e.target.value)}/>
            <MagnifyingGlassIcon width={22} height={22} 
            className="text-blue-600 absolute top-2 right-2 cursor-pointer" 
            onClick={searchHandler}/>
          </div>
        
          {
            searchKey && 
            <button type="button"
            className={"px-2 py-1 rounded-md text-sm cursor-pointer border border-blue-600 border-solid text-white bg-blue-600" }
            onClick={clearHandler}>
              Clear
            </button>
          }
        </div>

    </div>
  )
}

export default Hero