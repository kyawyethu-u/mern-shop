import { message } from 'antd';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getProductById } from '../../apicalls/product';
import pointpic from '../../images/pointpic.jpg'

const Details = () => {
    const [product,setProduct] = useState({});
    const [selectedImage,setSelectedImage] = useState(0)

    const params = useParams();
   
    
    const findById =async() =>{
        try{
            const response = await getProductById(params.id)
            if(response.isSuccess){
                setProduct(response.productDoc)
            }else{
                throw new Error(response.message)
            }
        }catch(err){
            message.error = err.message;
        }
    }
    useEffect(()=>{
        findById()
    },[])
   
  return (
    <section className='mt-20 flex items-start justify-between '>
        {
           product &&
            product.category &&
             product.seller && (
            <>
            <div className='w-1/3'>
                    {
                        product && product.images && product.images.length > 0 && 
                        <>
                        <img src={product.images[selectedImage]} 
                        alt={product.name}
                        className="w-full h-96 object-fill object-center overflow-hidden rounded-xl"/>
                        <div className='flex items-center gap-3 mt-3'>
                        {
                            product.images.map((i,index)=>(
                            <div key={i} className={`border-2 border-blue-400 overflow-hidden rounded-lg p-2 ${selectedImage === index && "border-dashed"}`}>
                                <img src={i} alt={product.name}
                                className='w-24 h-24 object-cover '
                                onClick={()=>setSelectedImage(index)}
                                />
                            </div>))
                        }
                        </div>
                        </>
                     }
                     <img src={pointpic} 
                        alt={product.name}
                        className="w-full h-96 object-fill object-center overflow-hidden rounded-xl"/>
                     <p className='font-medium my-2 text-red-600'>This product has no image to show</p>   
                </div>
                <div className='w-2/3 px-20'>
                        <h1 className='text-3xl font-bold my-1'>{product.name}</h1>
                        <p className='text-gray-500 font-medium leading-6 mb-4'>{product.description}</p>
                        <hr/>
                        <h1 className='text-2xl font-semibold my-2'>Informations</h1>
                        <div className='flex justify-between'>
                            <div className='font-medium space-y-2 mb-4'>
                                <p>Type</p>
                                <p>Used for</p>
                            </div>
                            <div className='text-gray-600 space-y-2 text-right'>
                                <p>{product.category.toUpperCase().replaceAll('_'," ")}</p>
                                <p>{product.usedFor}</p>
                            </div>
                        </div>
                        <hr/>
                        <div className='mb-4'>
                            <h1 className='text-2xl font-semibold my-2'>Details</h1>
                            {
                                product.details.map((d,i)=>(
                            <div className='flex justify-between'>
                            <div className='font-medium space-y-2'>
                                <p>{d}</p>
                            </div>
                            <div className='text-gray-600 space-y-2'>
                                <p>Include</p>
                            </div>
                            </div>
                            ))}
                        </div>
                        <hr/>
                        <h1 className='text-2xl font-semibold my-2'>Seller Information</h1>
                        <div className='flex justify-between'>
                            <div className='font-medium space-y-2'>
                                <p>Name</p>
                                <p>Email</p>
                            </div>
                            <div className='text-gray-600 space-y-2 text-right'>
                                <p>{product.seller.name}</p>
                                <p>{product.seller.email}</p>
                            </div>
                        </div>
                        <hr />
                </div>
            </>
           )
        }
    </section>
  )}

export default Details