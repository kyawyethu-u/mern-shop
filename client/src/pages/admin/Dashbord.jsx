import React, { useEffect, useState } from 'react'
import CardAntd from '../../components/dashboard/Card'

import {BanknotesIcon,UserGroupIcon,ShoppingCartIcon} from '@heroicons/react/24/outline'
import LineCustomChart from '../../components/dashboard/LineCustomChart';
import BarList from '../../components/dashboard/BarList';






const Dashbord = ({products,users}) => {
  const [totalSales,setTotalSales] = useState(0);
  const [productCount,setProductCount] = useState(0);
  const [userCount,setUserCount] = useState(0)

  const calcTotalSales = () =>{
    const totalAmount = products.reduce((a,b)=>{
      return a + Number(b.price)
    },0);
    setTotalSales(totalAmount)
  };

  useEffect(() =>{
    if(products.length){
      calcTotalSales()
      setProductCount(products.length)
      setUserCount(users.length)
    }
  },[products])
  
  return <section>
    <div className='flex items-center gap-2 mt-2 mb-4'>
      <CardAntd title={"Total Sales"} count={`${totalSales} MMK`} icon={<BanknotesIcon />} note={"MMK"}/>
      <CardAntd title={"Active Users"} count={userCount} icon={<UserGroupIcon />} note={"users"}/>
      <CardAntd title={"Products"} count={productCount} icon={<ShoppingCartIcon />} note={"items"}/>
    </div>
   <LineCustomChart/>
   <BarList/>
  </section>
}

export default Dashbord