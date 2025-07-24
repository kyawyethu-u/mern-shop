import { Outlet } from 'react-router-dom'

import Nav from '../components/Nav'
import Footer from '../components/Footer'


const Main = () => {
  return (
   <section className='mx-auto h-screen max-w-[85%] flex flex-col'>
    <Nav />
    <div className='flex-grow'>
      <Outlet />
    </div>
    <Footer/>
   </section>
  )
}

export default Main

