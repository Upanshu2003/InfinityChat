import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center text-white"
      style={{
        background: 'radial-gradient(circle at center, #180333 0%, #0d0118 70%, #000000 100%)',
      }}
    >
      <div className="text-center p-8 max-w-2xl">
        <h1 className="text-8xl font-bold mb-4 text-purple-500">404</h1>
        
        <div className="relative mb-8">
          <div 
            className="absolute inset-0 blur-xl opacity-30" 
            style={{
              background: 'radial-gradient(circle, rgba(147,51,234,0.6) 0%, rgba(79,70,229,0.2) 70%)',
              zIndex: -1
            }}
          ></div>
          <h2 className="text-4xl font-bold mb-6">Page Not Found</h2>
          <p className="text-xl text-gray-300 mb-8">
            The page you're looking for seems to have vanished into the infinite void.
          </p>
        </div>
        
        <Link 
          to="/" 
          className="inline-block px-8 py-3 bg-gradient-to-r from-purple-700 to-purple-900 rounded-full hover:from-purple-500 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-purple-900/30 text-lg font-medium"
        >
          Return Home
        </Link>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-purple-800 opacity-5 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/3 w-48 h-48 rounded-full bg-purple-600 opacity-5 blur-3xl"></div>
      <div className="absolute bottom-1/2 left-1/2 w-24 h-24 rounded-full bg-indigo-700 opacity-5 blur-3xl"></div>
    </div>
  );
};

export default NotFound;