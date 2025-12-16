import React from 'react';
import { Search, Bell, User, Settings } from 'lucide-react';

const Header = () => {
  return (
    <div className="flex items-center justify-between pr-6">
      {/* Left Section - Search */}
      <div className="text-black">
        <p className=' text-3xl'>Sales Report</p>
        <div className="">Friday, December 15th 2023</div>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center space-x-3 p-2">
        {/* Notifications */}
        <button className="bg-white  rounded-full relative p-4 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
          <Bell size={20} />
          <span className="absolute top-3 right-3 size-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Settings */}
        <button className="bg-white  rounded-full p-4 text-gray-600 hover:text-gray-900 hover:bg-gray-100  transition-colors">
          <Settings size={20} />
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <div className="p-4 bg-blue-600 rounded-full flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>
          <div className="">
            <div className="text- font-medium text-gray-900">Ferra Alaxandra</div>
            <div className="text-xs text-gray-500">Admin store</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Header;