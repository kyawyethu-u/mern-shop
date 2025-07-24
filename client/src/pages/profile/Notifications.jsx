import {formatDistanceToNow} from "date-fns"
import { Link } from "react-router-dom"
import {message} from "antd"
import { deleteAllNoti, deleteNoti, makeRead } from "../../apicalls/notification"
import { useEffect } from "react"

const Notifications = ({notifications,getNoti}) => {
  useEffect((_)=>{
    getNoti();
  },[getNoti])
  const markAsRead = async(id) =>{
    try{
      const response =  await makeRead(id)
      if(response.isSuccess){
        getNoti();
        message.success(response.message);
      }else{
        throw new Error(response.message)
      }
    }catch(err){
      message.error(err.message)
    }
  }
  const deleteHandler= async(id) =>{
      try{
        const response = await deleteNoti(id)
        if(response.isSuccess){
          getNoti();
          message.success(response.message);
        }else{
          throw new Error(response.message)
        }
      }catch(err){
        message.error(err.message)
      }
  }
  const deleteAllHandler = async() =>{
      try{
        const response = await deleteAllNoti()
        if(response.isSuccess){
          getNoti()
          message.success(response.message)
        }else{
          throw new Error(response.message)
        }
      }catch(err){
        message.error(err.message)
      }
  }
  return <section>
    <div className="flex my-2 justify-between">
      <h1 className='text-3xl font-semibold my-2'>Notifications</h1>
      {
        !notifications ? <p>""</p>:
        <p 
        className="text-red-600 font-md text-right my-2 underline cursor-pointer" 
        onClick={deleteAllHandler} >Delete All Forever</p>

      }
     </div>
    <div className='max-w-4xl'>
      {!notifications && (<p className="text-red-600 font-md text-center">"No notification yet!"</p>)}
        {notifications && 
            notifications.map(noti => (
            <div key={noti._id} className={`${noti.isRead ? "bg-gray-200" :"bg-white"} mb-4 rounded-lg p-4`}>
                <p className='text-sm font-md text-gray-500'>{formatDistanceToNow(new Date(noti.createdAt))}</p>
                <h4 className={`text-xl font-md my-2 ${noti.isRead?"text-gray-500":"text-black"}`}>{noti.title}</h4>
                <p className="text-base font-md text-gray-600">{noti.message}</p>
                <p className="font-md text-gray-600 my-2">
                  Contact Number - {" "} 
                  <span className="tracking-wide"> 
                    {noti.phone_number}
                  </span>
                </p>
                <hr />
               <div className="flex justify-end gap-3">
                <Link to={`/products/${noti.product_id}`}
                className="text-blue-600 font-md text-right my-2 underline">View Bids</Link>
                {
                 noti.isRead  ? <p className="text-blue-600 font-md text-right my-2 underline cursor-pointer" 
                onClick={()=>deleteHandler(noti._id)}>Delete forever</p>:
                   <p className="text-blue-600 font-md text-right my-2 underline cursor-pointer" 
                onClick={()=>markAsRead(noti._id)}>Mark as Read</p>
                }
               </div>
            </div>))
        }
    </div>
  </section>
}

export default Notifications