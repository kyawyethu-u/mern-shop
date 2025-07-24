import React from 'react';
import {  Card , Col } from 'antd';

const CardAntd = ({title,count,icon,note}) => (
  <Col span={8}>
   <Card  
        className="relative max-w-xs mx-auto rounded-xl mt-2 cursor-pointer" 
        >
            <div className="absolute top-3 right-3" 
            style={{
              top: 8,
              right: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              backgroundColor: 'lightblue'
            }}>
            {React.cloneElement(icon, {
             style: {width: 15,
              height: 15,
              fontSize: 15,
              color: '#2196f3'}, 
            })}
            {note && (
             <span style={{ fontSize: 15, color: '#777' }}>{note}</span>
            )}
            </div>
            <h1 className='text-xs font-medium'>{title}</h1>
            <p className='text-lg font-semibold '>{count}</p>
  </Card>
  </Col>);
 
export default CardAntd;