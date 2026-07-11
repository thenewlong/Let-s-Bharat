import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// 👇 Yahan aapka image import ho raha hai
import logo from '../assets/images/logo3.jpeg'; 

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); 

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
      setIsOpen(false); 
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Drawer band karne ka function jab koi link click ho
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-[#eef2f6] border-b border-gray-200 text-gray-800 relative z-50 shadow-sm">
      {/* Navbar Background ab bg-white aur text dark hai */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section - Image yahan lagayi hai */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              {/* Image size h-12 rakha hai taaki navbar mein fit aaye */}
              <img 
                src={logo} 
                alt="Let's Bharat Logo" 
                className="h-13 w-auto object-contain transition-transform hover:scale-110" 
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
              <Link to="/hackathons" className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Hackathons</Link>
              <Link to="/communities" className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Communities</Link>
              <Link to="/internships" className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Internships</Link>
              <Link to="/tournaments" className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Tournaments</Link>
              <Link to="/resources" className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Resources</Link>
            </div>
          </div>

          {/* User Profile / Auth Button (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <Link to="/profile" className="flex items-center gap-2 cursor-pointer bg-gray-100 p-1 pr-4 rounded-full hover:bg-gray-200 transition">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                  {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="text-sm font-medium text-gray-800">{user.displayName}</span>
              </Link>
            ) : (
              <Link to="/auth" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Join Community
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(true)}
              className="text-gray-600 hover:text-purple-600 focus:outline-none"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden transition-opacity"
          onClick={closeMenu}
        ></div>
      )}

      {/* Right Side Sliding Drawer (Ab ye bhi white color mein hai) */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-white border-l border-gray-200 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header & Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="text-lg font-bold text-gray-800">Menu</span>
          <button onClick={closeMenu} className="text-gray-500 hover:text-red-500 focus:outline-none">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex flex-col px-4 pt-6 pb-4 space-y-2 flex-1 overflow-y-auto">
          <Link to="/" onClick={closeMenu} className="text-gray-700 hover:text-purple-600 hover:bg-gray-50 px-3 py-3 rounded-md text-base font-medium">Home</Link>
          <Link to="/hackathons" onClick={closeMenu} className="text-gray-700 hover:text-purple-600 hover:bg-gray-50 px-3 py-3 rounded-md text-base font-medium">Hackathons</Link>
          <Link to="/communities" onClick={closeMenu} className="text-gray-700 hover:text-purple-600 hover:bg-gray-50 px-3 py-3 rounded-md text-base font-medium">Communities</Link>
          <Link to="/internships" onClick={closeMenu} className="text-gray-700 hover:text-purple-600 hover:bg-gray-50 px-3 py-3 rounded-md text-base font-medium">Internships</Link>
          <Link to="/tournaments" onClick={closeMenu} className="text-gray-700 hover:text-purple-600 hover:bg-gray-50 px-3 py-3 rounded-md text-base font-medium">Tournaments</Link>
          <Link to="/resources" onClick={closeMenu} className="text-gray-700 hover:text-purple-600 hover:bg-gray-50 px-3 py-3 rounded-md text-base font-medium">Resources</Link>
        </div>

        {/* Drawer Footer (Auth/Profile Mobile View) */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          {user ? (
            <div className="flex flex-col space-y-3">
              <Link to="/profile" onClick={closeMenu} className="flex items-center gap-3 p-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-lg font-bold text-white">
                  {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-semibold text-gray-800 truncate">{user.displayName}</span>
                  <span className="text-xs text-gray-500 truncate">{user.email}</span>
                </div>
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full text-center bg-red-50 text-red-600 hover:bg-red-500 hover:text-white border border-red-200 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/auth" 
              onClick={closeMenu}
              className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              Join Community
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;