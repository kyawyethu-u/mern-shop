import React, { useEffect } from 'react'
import { checkCurrentUser } from '../apicalls/auth';
import { useNavigate } from 'react-router-dom';

const AuthProvider = ({children}) => {
    const navigate = useNavigate();

    const getCurrentUser = async() =>{
        try{
            const response = await checkCurrentUser();
            if (response.isSuccess) {
               //code

              } else {
                navigate("/");
                throw new Error(response.message);
              }
            } catch (err) {
             console.log(err.messsage);
             
            }
    }
    useEffect((_)=>{
        getCurrentUser()
    },[])

  return <section>
    {children};
  </section>
}

export default AuthProvider