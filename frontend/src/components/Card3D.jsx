import React from 'react';

export default function Card3D({ children, className = '' }) {
  return (
    <div
      className={`relative transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}