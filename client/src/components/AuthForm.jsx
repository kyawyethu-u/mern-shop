import {  Form ,Input,message} from 'antd'
import {Link, useNavigate} from "react-router-dom"


import {registerUser} from "../apicalls/auth" 
import { loginUser } from '../apicalls/auth'

import { useDispatch, useSelector} from 'react-redux'
import {setUser} from "../store/slices/userSlice"
import { setLoader } from '../store/slices/loaderSlice' 


const AuthForm = ({isLoginPage}) => {

        const dispatch = useDispatch();
        const navigate = useNavigate();
        const {isProcessing} = useSelector((state) => state.reducer.loader);

    const handleOnFinish =async(values) =>{
       dispatch(setLoader(true))
        if(isLoginPage){
        try{
          const response = await loginUser(values);
          console.log(response.token);
          
          if (response.isSuccess) {
              message.success(response.message);
              localStorage.setItem("token",response.token);
              dispatch(setUser(response.token))
              navigate("/")
            } else {
              throw new Error(response.message);
            }
           
          } catch (err) {
            message.error(err.message);
          }
       }else{
        try {
          const response = await registerUser(values);
          if (response.isSuccess) {
            message.success(response.message);
            navigate("/login")
          } else {
            throw new Error(response.message);
          }
        } catch (err) {
          message.error(err.message);
        }
       
       }
       dispatch(setLoader(false))
        };
       
        
  return (
    <section className='h-screen w-full flex items-center justify-center'>
        <div className='w-[450px]'>
        <h1 className='text-3xl font-bold mb-4 text-blue-600'>POINT.io-{isLoginPage ? "LOGIN" : "REGISTER"}</h1>
            <Form layout='vertical' onFinish={handleOnFinish}>
              {
                !isLoginPage &&  
                 <Form.Item 
                name="name" 
                label="Name" 
                rules={[{
                    required: true,
                    message: "Name must contains",
                    },
                    {
                    min: 3,
                    message: "Name must have 3 characters"
                    }]}>
                    <Input placeholder='name...'>
                    </Input>
                </Form.Item>
              }
                <Form.Item name="email" 
                label="Email"
                rules={[{
                    required: true,
                    message: "Email must be include"
                },
                {
                    type: "email",
                    message: "Enter a valid E-mail!"
                },
                ]}>
                    <Input placeholder='email ...'>
                    </Input>
                </Form.Item>
                <Form.Item name="password" 
                label="Password"
                rules = {[{
                    required: true,
                    message: "Password must be include"
                },
                {
                    min: 5,
                    message: "Password must have 5 characters"
                }]}>
                    <Input.Password placeholder='password'>
                    </Input.Password>
                </Form.Item>
                <Form.Item>
                    <button className="w-full outline-none bg-blue-600 text-white py-2 rounded-md" 
                            disabled={isProcessing}
                    >
                      {isLoginPage && !isProcessing && "LOGIN" }
                      {!isLoginPage && !isProcessing && "REGISTER" }
                      {isProcessing && isLoginPage && "Logging in ..."}
                      {isProcessing && !isLoginPage && "Registering ..."}
                      </button>
                </Form.Item>
                <p>{isLoginPage ? 
                <>Don't have an account ? <Link to={"/register"}
                 className='font-medium text-blue-600 hover:text-blue-600'>Register here</Link></> :
                <>Already have an account ? <Link to={"/login"}
                 className='font-medium text-blue-600 hover:text-blue-600'>Login here</Link></>}</p>
            </Form>
        </div>
   </section>
  )}


export default AuthForm