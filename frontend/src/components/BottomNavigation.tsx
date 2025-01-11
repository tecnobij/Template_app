import React from "react";
import { FaHome } from "react-icons/fa";

const BottomNavigation: React.FC = () => {
  return (
    <div className="bottom-nav fixed bottom-0 left-0 w-full bg-white shadow-md flex items-center justify-around py-3 z-50">
      <div className="flex flex-col items-center">
        <a href="/" className="text-indigo-500">
          <FaHome className="text-2xl" />
        </a>
        <span className="text-xs text-indigo-500 mt-1">Home</span>
      </div>
    </div>
  );
};

export default BottomNavigation;