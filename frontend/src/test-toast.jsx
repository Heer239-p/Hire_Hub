import React from 'react';
import { toast, ToastContainer } from 'react-toastify';

const TestToast = () => {
  const showToast = () => {
    toast.success('Test toast is working!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <ToastContainer position="bottom-right" />
      <h1>Toast Test Page</h1>
      <button 
        onClick={showToast}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Show Test Toast
      </button>
    </div>
  );
};

export default TestToast;