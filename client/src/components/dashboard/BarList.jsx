import React from 'react';

const BarList = () => {
  const barData = [
    { name: 'The Cozy Corner', description: 'A warm and inviting place to relax.' },
    { name: 'Skyline Bar', description: 'Enjoy drinks with a stunning city view.' },
    { name: 'Jazz & Tonic', description: 'Live jazz music and handcrafted cocktails.' },
  ];
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', marginTop: "5%" }}>
      <h2>Products Count By Categories</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {barData.map((barData, index) => (
          <li
            key={index}
            style={{
              marginBottom: '10px',
              padding: '10px',
              backgroundColor: '#f4f4f4',
              borderRadius: '5px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <strong>{barData.name}</strong>
            <p>{barData.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BarList