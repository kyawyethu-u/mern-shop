import { SquaresPlusIcon } from '@heroicons/react/24/solid';
import { Checkbox, Col, Form, Input, message, Row, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'

import { sellProduct } from '../../apicalls/product';


const AddProduct = ({setActiveTabKey}) => {
    const [form] = Form.useForm()

    const options =  [
        { value: 'clothing_and_fashion', label: 'Clothing and Fashion' },
        { value: 'electronics_and_gadgets', label: 'Electronics and Gadgets' },
        { value: 'home_and_furniture', label: 'Home and Furniture' },
        { value: 'beauty_and_personal_care', label: 'Beauty and Personal Care' },
        { value: 'health_and_wellness', label: 'Health and Wellness' },
        { value: 'sports_and_outdoors', label: 'Sports and Outdoors' },
        { value: 'toys_and_games', label: 'Toys and Games' },
        { value: 'automotive_and_vehicles', label: 'Automotive and Vehicles' },
        { value: 'books_and_media', label: 'Books and Media' },
        { value: 'food_and_beverages', label: 'Food and Beverages' },
        { value: 'jewelry_and_accessories', label: 'Jewelry and Accessories' },
        { value: 'baby_and_kids', label: 'Baby and Kids' },
        { value: 'pet_supplies', label: 'Pet Supplies' },
        { value: 'office_and_stationery', label: 'Office and Stationery' },
        { value: 'handmade_and_crafts', label: 'Handmade and Crafts' },
        { value: 'industrial_and_commercial', label: 'Industrial and Commercial' },
        { value: 'real_estate_and_rentals', label: 'Real Estate and Rentals' },
        { value: 'musical_instruments', label: 'Musical Instruments' }
    ];
    const checkBoxOptions =[{
        label: 'Accessories',
        value: 'Accessories',
      },
      {
        label: 'Warranty',
        value: 'Warranty',
      },
      {
        label: 'Vocher',
        value: 'Vocher',
      },]

      const onFinishHandler = async(values) =>{
        try{
            const response = await sellProduct(values);
            if (response.isSuccess) {
               form.resetFields()
                message.success(response.message);
               setActiveTabKey("1")
              } else {
                throw new Error(response.message);
              }
              
            } catch (err) {
              message.error(err.message);
            }
      }
  return <section>
    <h1 className='text-3xl font-bold my-2'>What you want to sell?</h1>
    <Form layout='vertical'
          form={form}
          onFinish={onFinishHandler}>
            <Form.Item name="product_name" 
                label="Name"
                rules={[{
                    required: true,
                    message: "Product name must be include"
                },
                ]}
                hasFeedback
                >
                    <Input placeholder='product name ...'/>
                    
            </Form.Item>
            <Form.Item name="product_description" 
                label="Description"
                rules={[{
                    required: true,
                    message: "Product description must contain"
                },
                ]}
                hasFeedback
                >
                    <TextArea rows={4}/>
            </Form.Item>
            
            <Row gutter={16}>
               <Col span={8}>
               <Form.Item name="product_price" 
                label="Price"
                rules={[{
                    required: true,
                    message: "Price must contain"
                },
                ]}
                hasFeedback>
                    <Input type="number" />
                </Form.Item>
                
               </Col>

               <Col span={8}>
               <Form.Item name="product_category" 
                label="Choose a category"
                rules={[{
                    required: true,
                    message: "Category must choose"
                },
                ]}
                hasFeedback>
                 <Select defaultValue={""}
                 options={options}/>
               </Form.Item>
               </Col>

               <Col span={8}>
               <Form.Item name="product_usedFor" 
                label="Used for"
                rules={[{
                    required: true,
                    message: "Product's used time must write"
                },
                ]}
                hasFeedback
                >
                    <Input placeholder='eg, 3 months ago'/>
            </Form.Item>
               </Col>
            </Row>
            <Form.Item name="product_details" 
                label="This product must have"
                rules={[{
                    required: true,
                    message: "Product's used time must write"
                },
                ]}
                hasFeedback>
                <Checkbox.Group options={checkBoxOptions} defaultValue={[""]}/>
            </Form.Item>
        <button className='font-medium text-lg text-center my-2 rounded-md bg-blue-500 text-white flex items-center gap-2 justify-center w-full'>
                <SquaresPlusIcon width={40}/>
                Sell
        </button>
    </Form>
  </section>
}

export default AddProduct