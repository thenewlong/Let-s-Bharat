import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Mobile menu drawer state

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
      setIsOpen(false); // Logout ke baad drawer band kar do
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Drawer band karne ka function jab koi link click ho
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-[#0b0f19] border-b border-gray-800 text-white relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Let's Sister
            </Link>
          </div>

          {/* Desktop Menu (Hidden on Mobile) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
              <Link to="/hackathons" className="hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Hackathons</Link>
              <Link to="/communities" className="hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Communities</Link>
              <Link to="/internships" className="hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Internships</Link>
              <Link to="/tournaments" className="hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Tournaments</Link>
              <Link to="/resources" className="hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Resources</Link>
            </div>
          </div>

          {/* User Profile / Auth Button (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <Link to="/profile" className="flex items-center gap-2 cursor-pointer bg-gray-800 p-1 pr-4 rounded-full hover:bg-gray-700 transition">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                  {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="text-sm font-medium">{user.displayName}</span>
              </Link>
            ) : (
              <Link to="/auth" className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Join Community
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(true)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay (Black fade effect) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 z-40 md:hidden transition-opacity"
          onClick={closeMenu}
        ></div>
      )}

      {/* Right Side Sliding Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-[#1a1f2e] border-l border-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header & Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <span className="text-lg font-bold text-white">Menu</span>
          <button onClick={closeMenu} className="text-gray-400 hover:text-white focus:outline-none">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex flex-col px-4 pt-6 pb-4 space-y-4 flex-1 overflow-y-auto">
          <Link to="/" onClick={closeMenu} className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium">Home</Link>
          <Link to="/hackathons" onClick={closeMenu} className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium">Hackathons</Link>
          <Link to="/communities" onClick={closeMenu} className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium">Communities</Link>
          <Link to="/internships" onClick={closeMenu} className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium">Internships</Link>
          <Link to="/tournaments" onClick={closeMenu} className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium">Tournaments</Link>
          <Link to="/resources" onClick={closeMenu} className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium">Resources</Link>
        </div>

        {/* Drawer Footer (Auth/Profile Mobile View) */}
        <div className="p-4 border-t border-gray-800">
          {user ? (
            <div className="flex flex-col space-y-3">
              <Link to="/profile" onClick={closeMenu} className="flex items-center gap-3 p-2 bg-gray-800 rounded-lg">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-lg font-bold">
                  {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-semibold truncate">{user.displayName}</span>
                  <span className="text-xs text-gray-400 truncate">{user.email}</span>
                </div>
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full text-center bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/auth" 
              onClick={closeMenu}
              className="block w-full text-center bg-purple-600 hover:bg-purple-700 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
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