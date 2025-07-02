import { useEffect, useState } from 'react'
import { message } from 'antd';

import Hero from '../../components/HomePage/Hero'
import Filter from '../../components/HomePage/Filter'
import Card from '../../components/HomePage/Card';

import {getProductCategories,getApprovedProducts } from '../../apicalls/product';



const Index = () => {
  const [productCats, setProductCats] = useState([]);
  const [products,setProducts] = useState([]);

  const getCategories = async() =>{
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
  };

  const getApprovedProduct = async() =>{
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
  }
  
  useEffect((_)=>{
    getCategories()
    getApprovedProduct()
  },[])
  return (
    <section>
      <Hero setProducts={setProducts} getApprovedProduct={getApprovedProduct}/>
      <Filter productCats={productCats} setProducts={setProducts} getApprovedProduct={getApprovedProduct}/>
      <div className='flex max-w-4xl mx-auto flex-wrap '>
      {
        products.map((product)=><Card key={product._id} product={product}/>)
      }
      </div>
    </section>
  )
}

export default Index