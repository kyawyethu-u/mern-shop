
import { Tabs } from 'antd';
import ProductForm from '../../components/Product/ProductForm';

import Upload from '../../components/Product/Upload';




const ManageProduct = ({setActiveTabKey,getProducts,editMode,editProductId,manageTabKey}) => {
 
  const items = [
    {
        key: '1',
        label: 'Product Detail',
        children:( <ProductForm setActiveTabKey={setActiveTabKey} 
        getProducts={getProducts} editMode={editMode}
        editProductId={editProductId} />),
      },
      
        editMode ? {
          key: '2',
          label: 'Product Images',
          children: (<Upload editProductId={editProductId} 
          setActiveTabKey = {setActiveTabKey} />)} : null,
    ]
     
    return (<section>
      <Tabs activeKey={manageTabKey}
    items={items}/>  
    </section> 
    )
}

export default ManageProduct