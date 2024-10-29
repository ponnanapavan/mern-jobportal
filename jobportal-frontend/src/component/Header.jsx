import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useSocket } from '@/socket-context/SocketJobNotification';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const { count } = useSocket();

  async function handleLogout() {
    try {
      const apiResponse = await fetch('/api/v1/auth/logout', {
        method: 'POST',
      });

      const result = await apiResponse.json();
      console.log(result);
      localStorage.removeItem('userData'); // Clear userData
      window.location.href = '/'; // Redirect to home page after logout
    } catch (err) {
      console.error(err.message);
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo and Title */}
        <Link to={'/'}>
          <h1 className="text-2xl font-bold text-gray-800">Job Hunt</h1>
        </Link>

        {/* Hamburger Icon for Mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center"
          aria-label="Toggle Navigation"
        >
          <span className="text-xl">&#9776;</span> {/* Hamburger icon */}
        </button>

        {/* Navigation Menu */}
        <nav className={`md:flex ${isMenuOpen ? 'block' : 'hidden'} absolute md:relative top-full right-0 bg-white p-3 md:p-0 flex flex-col md:flex-row`}>
          <ul className="flex flex-col w-full items-center md:flex-row md:space-x-8 text-lg font-medium md:items-center p-3 md:p-0">
            {userData?.PersonType !== 'recruiter' && (
              <li className="hover:text-blue-600 transition-colors duration-300">
                <Link to={'/alljobs'}>Jobs</Link>
              </li>
            )}
            {userData?.PersonType === 'recruiter' && (
              <li className="hover:text-blue-600 transition-colors duration-300">
                <Link to={'/recruiter'}>Create Job</Link>
              </li>
            )}
            <li className="hover:text-blue-600 transition-colors duration-300">
              <Link to={'/dashboard'}>Dashboard</Link>
            </li>
            {userData?.PersonType === 'recruiter' && (
              <li className="hover:text-blue-600 transition-colors duration-300">
                <Link to={'/recruiterJobs'}>Your Jobs</Link>
              </li>
            )}
            <div className="flex items-center">
              <Link
                to={'/recommendedJobs'}
                className={`hover:text-blue-600 transition-colors duration-300 ${count > 0 ? 'font-bold' : ''}`}
              >
                Recommended Jobs
              </Link>
              {count > 0 && <span className="glowing-dot ml-1"></span>}
            </div>
            {count > 0 && <span className="text-gray-600 ml-1">({count})</span>}
          </ul>

          {/* Authentication Buttons */}
          <div className="flex flex-col md:flex-row md:ml-6"> {/* Added md:ml-6 here */}
            {userData?.userid ? (
              <Button
                className="text-white px-6 py-2 rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 transition duration-300"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Link to={'/auth/signup'}>
                <Button className="text-white px-6 py-2 rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 transition duration-300">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
