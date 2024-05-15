import React from "react";

const Layout = ({children, className = '', ...props}) => {
  return (
    <div 
    className={`w-11/12 max-w-7xl min-h-screen mx-auto bg-slate-950 text-gray-100
    ${className}`} 
    {...props}>
      {children}
    </div>
  );
};

export default Layout;
