import React, { useState } from 'react';

const Tooltip = ({ children, message }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className='relative'
      >
        {children}
      </div>
      {showTooltip && (
          <div 
            role="tooltip" 
            className="absolute left-[50%] bottom-full -translate-x-[50%] mb-2.5 z-10 inline-block px-2 py-1 text-sm font-medium text-white transition-opacity 
            duration-300 bg-slate-700 rounded-lg shadow-sm tooltip whitespace-nowrap"
          >
            {message}
            <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 translate-y-full w-3 h-3 bg-gray-700 rotate-45"></div>
          </div>
      )}
    </div>
  );
};

export default Tooltip;
