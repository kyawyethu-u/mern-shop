import { useEffect, useState } from 'react'

import {RotatingLines} from "react-loader-spinner"
import { message, Pagination } from 'antd';

import {useDispatch,useSelector} from "react-redux"
import {setLoader} from "../../store/slices/loaderSlice"

import Hero from '../../components/HomePage/Hero'
import Filter from '../../components/HomePage/Filter'
import Card from '../../components/HomePage/Card';

import {getProductCategories,getApprovedProducts, getSavedProducts } from '../../apicalls/product';



const Index = () => {
  const [productCats, setProductCats] = useState([]);
  const [products,setProducts] = useState([]);
  const [savedProducts,setSavedProducts] = useState([])
  const [currentPage,setCurrentPage] = useState(1)
  const [totalProducts,setTotalProducts] = useState(0)

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

  const getAllProducts = async(page=1,perPage=6) =>{
    dispatch(setLoader(true));
    try{
      const response = await getApprovedProducts(page,perPage)
      if(response.isSuccess){
        setProducts(response.productDocs)
        setCurrentPage(response.currentPage)
        setTotalProducts(response.totalProducts)
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
      message.error(err.message)
    }
    dispatch(setLoader(false))
  }
  useEffect((_)=>{
    getCategories()
    getAllProducts(1,6)
    getSavedProduct()
  },[])
  const handlePagination = (page,perPage) =>{
    getAllProducts(page,perPage)
  }
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
        <>
           <div className='grid grid-cols-3 gap-4 max-w-6xl mx-auto'>
        {
            products.map((product)=><Card key={product._id} product={product} savedProducts={savedProducts} 
             getSavedProduct={getSavedProduct}/>)
        }
        </div>
        <div className='flex mt-5 mb-5 justify-end max-w-6xl mx-auto'>
          <Pagination current={currentPage} 
          total={totalProducts} 
          pageSize={6}
          onChange={handlePagination}/>
        </div>
        </>
      }
    </section>
  )
}

export default Index