import pointpic from "../../images/pointpic.jpg"
import { BookmarkIcon } from "@heroicons/react/24/outline"
import {Link} from "react-router-dom"

const Card = ({product}) => {

  return (
    <div className="w-1/2 px-4 mb-4">
      {product.images[0] ? (
        <Link to={`/products/${product._id}`}>
          <img src={product.images[0]} alt={product.name} className="w-full h-52 object-cover"/>
        </Link>
        ) : ( <Link to={`/products/${product._id}`}>
          <img src={pointpic} alt={product.name} className="w-full h-52 object-cover"/>
        </Link>)
      }
      <p className="text-white text-sm bg-blue-600 rounded-lg p-1 w-fit font-medium my-2">{product.category.toUpperCase().replaceAll("_"," ")}</p>
      <div className="flex items-center justify-between">
         <Link to={`/products/${product._id}`}>
         <p className="text-xl font-bold text-gray-700">{product.name}</p>
         </Link>
         <BookmarkIcon className="w-8 h-8 text-blue-600 cursor-pointer"/>
      </div>
      <p className="text-gray-500">{product.description.slice(0,100)}</p>
      
    </div>
  )
}

export default Card