import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Import icons from lucide-react

const NavMobileView = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage the menu visibility

  return (
    <nav className='block lg:hidden z-50'>
      <div className='flex items-center justify-between p-4 text-black bg-white fixed top-0 left-0 right-0 h-16 shadow-md'>
        <div className='text-lg font-bold'>Job Portal</div> 
        <button
          className='focus:outline-none'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className='w-6 h-6' />
          ) : (
            <Menu className='w-6 h-6' />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='absolute top-16 left-0 w-full bg-blue-500 z-40'>
          <ul className='flex flex-col p-4'>
            <li className='py-2 hover:bg-blue-400 transition-colors'>
              <a href='/'>Home</a>
            </li>
            <li className='py-2 hover:bg-blue-400 transition-colors'>
              <a href='/jobs'>Jobs</a>
            </li>
            <li className='py-2 hover:bg-blue-400 transition-colors'>
              <a href='/about'>About Us</a>
            </li>
            <li className='py-2 hover:bg-blue-400 transition-colors'>
              <a href='/contact'>Contact</a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavMobileView;
