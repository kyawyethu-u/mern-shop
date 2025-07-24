import {formatDistanceToNow} from "date-fns"
import { Link } from "react-router-dom"


const Notifications = ({notifications}) => {
  return <section>
    <h1 className='text-3xl font-semibold my-2'>Notifications</h1>
    <div className='max-w-3xl'>
      {!notifications && (<p className="text-red-600 font-md text-center">"No notification yet!"</p>)}
        {notifications && 
            notifications.map(noti => (<div key={noti._id} className='bg-white mb-4 rounded-lg p-4'>
                <p className='text-sm font-md text-gray-500'>{formatDistanceToNow(new Date(noti.createdAt))}</p>
                <h4 className="text-xl font-md my-2">{noti.title}</h4>
                <p className="text-base font-md text-gray-600">{noti.message}</p>
                <p className="font-md text-gray-600 my-2">
                  Contact Number - {" "} 
                  <span className="tracking-wide"> 
                    {noti.phone_number}
                  </span>
                </p>
                <hr />
               <div className="flex justify-end">
                 <Link to={`/products/${noti.product_id}`}
                className="text-blue-600 font-md text-right my-2 underline">View Bids</Link>
               </div>
            </div>))
        }
    </div>
  </section>
}

export default Notifications