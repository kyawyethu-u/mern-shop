import { useEffect, useState } from "react";
import { getAllProducts } from "../../apicalls/product"
import { message } from "antd";


const Products = () => {
    const [products,setProducts] = useState([])

    const getProducts = async() => {
        try{
            const response = await getAllProducts();
            if(response.isSuccess){
                //codes
                setProducts(response.productDocs)
            }else{
                throw new Error(response.message)
            }
        }catch(err){
            message.error(err.message)
        }
    };

    useEffect((_) =>{
        getProducts();
    },[])
  return <section>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Product name
                </th>
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                <th scope="col" class="px-6 py-3">
                    Status
                </th>
                <th scope="col" class="px-6 py-3">
                    Sell Date
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {
                products.length > 0 ? (
                    <>
                    {
                        products.map(product=> (
                <tr class="bg-white border-b" key={product._id}>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{product.name}</th>
                <td class="px-6 py-4">{product.category}</td>
                <td class="px-6 py-4">{ 
                    product.status === "pending" ? <span className="bg-yellow-400 text-sm p-1 rounded-md">{product.status}</span>:<span>{product.status}</span>
                 }
                 </td>
                <td class="px-6 py-4">{product.createdAt}</td>

                <td class="px-6 py-4">
                    <button type="button"
                     class="font-medium text-blue-600 hover:underline">Edit</button>
                </td>
            </tr>
                        ))
                    }
                    </>
                ) : <p>No Products created yet! </p>
            }
        </tbody>
    </table>
</div>

  </section>
}

export default Products