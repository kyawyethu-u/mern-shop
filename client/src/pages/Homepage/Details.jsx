import { Form, Input, message } from 'antd';
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../../apicalls/product';
import pointpic from '../../images/pointpic.jpg'

import {useDispatch,useSelector} from "react-redux"
import {setLoader} from "../../store/slices/loaderSlice"
import {RotatingLines} from "react-loader-spinner"
import { ChevronDoubleLeftIcon,PaperAirplaneIcon } from '@heroicons/react/24/outline';

const Details = () => {
    const [product,setProduct] = useState({});
    const [selectedImage,setSelectedImage] = useState(0)
    const dispatch = useDispatch();
    const {isProcessing} = useSelector((state)=>state.reducer.loader)
    const {user} = useSelector((state)=>state.reducer.user)
    const navigate = useNavigate();
    const params = useParams();
  
    
    const findById =async() =>{
        dispatch(setLoader(true));
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
        dispatch(setLoader(false));
    }
    useEffect(()=>{
        findById()
    },[])
   
  return (
    <section className={`mt-20 flex ${isProcessing ? "items-center justify-center": "items-start justify-between"}`} >
      {
        isProcessing ?(
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
          ):(<>
        {
            product &&
             product.category &&
              product.seller && (
             <>
             <div className='w-1/3'>
                     {
                         product && product.images && product.images.length > 0 ? 
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
                         </> : 
                         <>
                         <img src={pointpic} 
                         alt={product.name}
                         className="w-full h-96 object-fill object-center overflow-hidden rounded-xl"/>
                         <p className='font-medium my-2 text-red-600'>This product has no image to show</p>   
                         </>
                      }
             </div>
             <div className='w-2/3 px-20'>
                <div className='flex justify-between'>
                    <div className='w-3/4'>
                        <h1 className='text-3xl font-bold my-1'>{product.name}</h1>
                        <p className='text-gray-500 font-medium leading-6 mb-4'>{product.description}</p>
                    </div>
                    <div>
                        <ChevronDoubleLeftIcon width={30} height={30} className='text-blue-600 cursor-pointer'
                        onClick={()=>navigate(-1)}/> 
                    </div>
                </div>
                <hr/>
                <h1 className='text-2xl font-semibold my-2'>Informations</h1>
                <div className='flex justify-between'>
                    <div className='font-medium space-y-2 mb-4'>
                        <p>Price</p>
                        <p>Category</p>
                        <p>Used for</p>
                    </div>
                    <div className='text-gray-600 space-y-2 text-right'>
                        <p>{product.price} Kyats</p>
                        <p>{product.category.toUpperCase().replaceAll('_'," ")}</p>
                        <p>{product.usedFor}</p>
                    </div>
                </div>
                <hr/>
                <div className='mb-4'>
                    <h1 className='text-2xl font-semibold my-2'>Details</h1>
                    {
                        product.details.map((d,i)=>(
                    <div className='flex justify-between' key={i}>
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
                <h1 className='text-2xl font-semibold my-2'>Bids</h1>
               {
                user ?  <div>
                <Form onFinish={()=>{
                    window.alert("Commented")
                }}
                    layout="vertical">
                    
                    <Form.Item name="message"
                       label="Text"
                       rules={[
                        {
                            required: true,
                            message: "Message must contain.",
                        },
                        {
                            min: 3,
                            message: "Message must have 3 characters"
                        }
                       ]}
                       hasFeedback
                       className='w-full'>
                        <Input placeholder='write message ...'></Input>
                    </Form.Item>
                    <Form.Item name="phone"
                       label="Phone Number"
                       rules={[
                        {
                            required: true,
                            message: "Phone number must contain.",
                        },
                        {
                            min: 3,
                            message: "Phone number must have 3 characters"
                        }
                       ]}
                       hasFeedback
                       className='w-full'>
                        <Input type="number"
                        placeholder='phone number...'></Input>
                    </Form.Item>
                    <div className='text-right mb-3'>
                    <button className='text-white font-medium text-base px-2 py-1 rounded-md bg-blue-600'>
                    Submit</button>
                    </div>
                </Form>
                </div>:
                <p className='mb-5 font-medium text-red-600'>
                    <Link to={"/login"}>Login</Link> or {" "}
                    <Link to={"/register"}>register</Link> to get full access</p>
               }
             </div>
             </>
            )}
            </>)
      }
    </section>
  )}

export default Details