import { Form, Tabs,message } from "antd"
import Products from "./Products"
import ManageProduct from "./ManageProduct"
import General from "./General"


import { useEffect, useState } from "react";
import { getAllProducts } from "../../apicalls/product"


const Index = () => {

  const [activeTabKey,setActiveTabKey] = useState("1")
  const [products,setProducts] = useState([])
  const [editMode,setEditMode] = useState(false)
  const [editProductId,setEditProductId] = useState(null)
  const [manageTabKey,setManageTabKey] = useState("1")

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
    if(activeTabKey === "1"){
      setEditMode(false);
      setEditProductId(null);
      setManageTabKey("1");
    };
      getProducts();
  },[activeTabKey])

    
  const items = [
        {
            key: '1',
            label: 'Products',
            children: <Products products={products} setActiveTabKey={setActiveTabKey} 
             setEditMode={setEditMode} setEditProductId={setEditProductId}
             getProducts={getProducts} setManageTabKey={setManageTabKey}/>,
          },
          {
            key: '2',
            label: 'Manage Products',
            children: <ManageProduct setActiveTabKey={setActiveTabKey}  getProducts={getProducts}
            editMode={editMode} editProductId={editProductId} manageTabKey={manageTabKey}/>,
          },
          {
            key: '3',
            label: 'Notification',
            children: 'Content of Tab Pane 2',
          },
          {
            key: '4',
            label: 'General',
            children: <General/>,
          },
    ]
    const onChangeHandler = (key) =>{
      setActiveTabKey(key)
      
    };
     
     
  return <Tabs activeKey={activeTabKey} 
  onChange={(key) => onChangeHandler(key)}
  items={items}
  tabPosition={"left"} 
  size="large"/>
}

export default Index