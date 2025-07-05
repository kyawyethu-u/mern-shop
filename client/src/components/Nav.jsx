import React from 'react'
import { Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { setUser } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

import {UserIcon} from "@heroicons/react/24/solid"
import { BookmarkIcon } from '@heroicons/react/24/solid'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid'



const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.reducer.user);
  const logout = () =>{
    localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate("/");
  }
  
  return (
    <nav className='bg-blue-500 flex items-center justify-between text-white p-4'>
        <Link to={"/"} className='text-white font-bold text-4xl'>POINT.IO</Link>
        <div className='flex items-center gap-3'>
          <Link to={"/about"}>About</Link>
          <Link to={"/about"}>Contact</Link>
          <Link to={"/about"}>Q&A</Link>
        </div>
        {user ?
        (<div className='flex items-center gap-2'>
            {user.role === "user" && (<Link to={"/profile"} 
            className='text-white px-2 py-1 flex items-end gap-1'>
              <UserIcon width={26}/>
                </Link>)}
            {user.role === "admin" && (<Link to={"/admin"} 
            className='text-white px-2 py-1 flex items-end gap-1'>
              <UserIcon width={26}/>
                Admin Pannel</Link>)}
            <Link to={"/saved-products"}
            className='text-white px-2 py-1 flex items-end gap-1'>
            <BookmarkIcon width={26}/>
            </Link>
            <ArrowRightStartOnRectangleIcon width={26} onClick={logout} className='text-red-600 cursor-pointer'/>
        </div>)
              :
        (<div className='flex items-center gap-3 text-base font-medium'>
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
        </div>
        )}
    </nav>
  )
}

export default Nav