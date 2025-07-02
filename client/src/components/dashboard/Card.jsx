import React from 'react';
import {  Card , Col } from 'antd';

const CardAntd = ({title,count,icon,note}) => (
  <Col span={8}>
   <Card  
        className="relative max-w-xs mx-auto rounded-xl mt-2" 
        >
            <div className="absolute top-3 right-3" 
            style={{
              top: 12,
              right: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              backgroundColor: 'lightblue'
            }}>
            {React.cloneElement(icon, {
             style: {width: 26,
              height: 26,
              fontSize: 26,
              color: '#2196f3'}, 
            })}
            {note && (
             <span style={{ fontSize: 15, color: '#777' }}>{note}</span>
            )}
            </div>
            <h1 className='text-lg font-medium'>{title}</h1>
            <p className='text-2xl font-semibold '>{count}</p>
  </Card>
  </Col>);
 
export default CardAntd;