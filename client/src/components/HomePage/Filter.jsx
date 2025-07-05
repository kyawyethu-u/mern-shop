import { message } from "antd";
import { getProductsByFilter } from "../../apicalls/product";
import { useState } from "react";

import {useDispatch} from "react-redux"
import {setLoader} from "../../store/slices/loaderSlice"

//productCats for categories
const Filter = ({productCats,setProducts,getAllProducts}) => {
  const [selectedCategory,setSelectedCategory] = useState(null)
  const uniqueCategories = [...new Set(productCats.map((product)=> product.category))]

  const categoryHandler = async(i) =>{
    const dispatch = useDispatch();
    setSelectedCategory(uniqueCategories[i]);
    dispatch(setLoader(true));
            try{
              const response = await getProductsByFilter("category",selectedCategory);
              if(response.isSuccess){
                setProducts(response.productDocs)
              }else{
                throw new Error(response.message)
              }
            }catch(err){
              message.error = err.message
            }
            dispatch(setLoader(false));        
  }
  const clearHandler = () =>{
    setSelectedCategory(null)
    getAllProducts()
  }
         
  return (
    <div className="flex items-center gap-3 my-8 max-w-4xl mx-auto flex-wrap justify-center">
      {uniqueCategories.map((category, index) => (
        <p key={index} 
        className={`px-2 py-1 rounded-md text-sm cursor-pointer border border-blue-600 border-solid text-blue-600 ${
          index === selectedCategory && "border-dashed"}`}
           onClick={()=>categoryHandler(index)}>
          {category.replace(/_/g, ' ')}
        </p>
      ))}
     {
      selectedCategory && 
      <button type="button"
      className={"px-2 py-1 rounded-md text-sm cursor-pointer border border-blue-600 border-solid text-white bg-blue-600" }
      onClick={clearHandler}>
        Clear
      </button>
     }
    </div>
  )
    
  
}

export default Filter