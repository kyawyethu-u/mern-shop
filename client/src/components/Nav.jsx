import React from 'react'
import { Link } from 'react-router-dom'

import {UserIcon} from "@heroicons/react/24/solid"
import { useSelector } from 'react-redux'

const Nav = () => {
  
const {userId} = useSelector((state) => state.reducer.user)


  return (
    <nav className='bg-blue-500 flex items-center justify-between text-white p-4'>
        <Link to={"/"} className='text-white font-bold text-4xl'>POINT.IO</Link>
        {userId ?
        (<Link to={"/profile"} className='text-white px-2 py-1 flex items-end gap-1'>
          <UserIcon width={26}/>
          Profile</Link>):
        <div className='flex items-center gap-3 text-base font-medium'>
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
        </div>
        }
    </nav>
  )
}

export default Nav