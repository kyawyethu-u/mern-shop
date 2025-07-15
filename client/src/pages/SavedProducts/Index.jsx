import React, { useEffect, useState } from 'react'
import { getSavedProducts } from '../../apicalls/product'


import Card from "../../components/HomePage/Card"

import {useDispatch,useSelector} from "react-redux"
import {setLoader} from "../../store/slices/loaderSlice"
import {RotatingLines} from "react-loader-spinner"
import { useNavigate } from 'react-router-dom'
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/outline'

const Index = () => {
  const [products,setproducts] = useState([])
  

  const dispatch = useDispatch();
  const {isProcessing} = useSelector((state)=>state.reducer.loader)
  const navigate = useNavigate();

  const getProducts = async()=>{
    dispatch(setLoader(true));
    try{
      const response = await getSavedProducts()
      if(response.isSuccess){
        setproducts(response.productDocs)
      }else{
        throw new Error(response.message)
      }
    }catch(err){
      console.error(err.message)
    }
    dispatch(setLoader(false))
  }

  
  useEffect(()=>{
    getProducts()
  },[])
  return (
   <section >
     <div className='flex justify-between my-2'>
         <h1 className='text-2xl font-bold my-4 text-center'>Saved product list</h1>
         <ChevronDoubleLeftIcon width={30} height={30} className='text-blue-600 cursor-pointer'
                        onClick={()=>navigate(-1)}/> 
     </div>
     
    {
      isProcessing ?(
        <div className='flex items-center justify-center'>
          <RotatingLines
            visible={true}
            height="96"
            width="50"
            color="gray"
            strokeColor='#6666ff'
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) :
      <div className='flex gap-3 '>
      {products && products.length > 0 && <>
      {
        products.map(product => 
        <Card key={product._id} product={product.product_id} saved={true} getProducts={getProducts}/>)
      }
      </>}
    </div>
    }
     {
      products.length === 0 && 
       !isProcessing && <p className='font-medium text-red-600 my-2'>No product are not saved yet</p>
     }
   </section>
  )
}

export default Index