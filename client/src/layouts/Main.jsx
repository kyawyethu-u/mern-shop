import { Outlet } from 'react-router-dom'

import Nav from '../components/Nav'


const Main = () => {
  return (
   <section className='max-w-7xl mx-auto'>
    <Nav />
    <Outlet />
   
   </section>
  )
}

export default Main

