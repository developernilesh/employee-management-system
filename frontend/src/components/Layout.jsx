import React from "react";

const Layout = ({children, className = '', ...props}) => {
  return (
    <div 
    className={`w-11/12 max-w-7xl min-h-screen mx-auto flex justify-center items-center bg-black text-gray-50
    ${className}`} 
    {...props}>
      {children}
    </div>
  );
};

export default Layout;
