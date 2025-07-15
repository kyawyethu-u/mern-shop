import { useEffect, useState } from 'react'
import { message } from 'antd';

import Hero from '../../components/HomePage/Hero'
import Filter from '../../components/HomePage/Filter'
import Card from '../../components/HomePage/Card';

import {getProductCategories,getApprovedProducts, getSavedProducts } from '../../apicalls/product';

import {useDispatch,useSelector} from "react-redux"
import {setLoader} from "../../store/slices/loaderSlice"
import {RotatingLines} from "react-loader-spinner"
import { useLocation } from 'react-router-dom';



const Index = () => {
  const [productCats, setProductCats] = useState([]);
  const [products,setProducts] = useState([]);
  const [savedProducts,setSavedProducts] = useState([])
  const dispatch = useDispatch();
  const {isProcessing} = useSelector((state)=>state.reducer.loader)

  const getCategories = async() =>{
    
    dispatch(setLoader(true));
    try{
      const response = await getProductCategories()
      
      if(response.isSuccess){
        setProductCats(response.productDocs)
      }else{
        throw new Error(response.message)
      }
    }catch(err){
      message.error(err.message);
    }
    dispatch(setLoader(false));
  };

  const getAllProducts = async() =>{
    dispatch(setLoader(true));
    try{
      const response = await getApprovedProducts()
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

  const getSavedProduct = async()=>{
    dispatch(setLoader(true));
    try{
      const response = await getSavedProducts()
      if(response.isSuccess){
        setSavedProducts(response.productDocs)
      }else{
        throw new Error(response.message)
      }
    }catch(err){
      console.error(err.message)
    }
    dispatch(setLoader(false))
  }

  
  useEffect((_)=>{
    getCategories()
    getAllProducts()
    getSavedProduct()
  },[])
  return (
    <section>
      <Hero setProducts={setProducts} getAllProducts={getAllProducts}/>
      <Filter productCats={productCats} setProducts={setProducts} getAllProducts={getAllProducts}/>
      {
        isProcessing ? (
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
        <div className='grid grid-cols-2 gap-4 max-w-4xl mx-auto'>
        {
            products.map((product)=><Card key={product._id} product={product} savedProducts={savedProducts} 
             getSavedProduct={getSavedProduct}/>)
        }
        </div>
      }
    </section>
  )
}

export default Index