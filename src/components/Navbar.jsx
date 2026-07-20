import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/logos2.jpeg'; 

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [isOpen, setIsOpen] = useState(false); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  // 🚀 FUTURE SCALE: Bas yahan naye sections add karo, wo search mein aa jayenge
  const searchableItems = [
    { name: "Home", path: "/" },
    { name: "AI Startups ", path: "/startups" },
    { name: "Hackathons", path: "/hackathons" },
    { name: "Internships", path: "/internships" },
    { name: "Jobs", path: "/jobs" },
    { name: "Tournaments", path: "/tournaments" },
    { name: "Resources", path: "/resources" },
    { name: "About Us", path: "/about" },
  ];

  // Logic: Search filtering (Only used for Desktop now)
  const filteredItems = searchableItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
      setIsOpen(false); 
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const closeMenu = () => setIsOpen(false);

  // Click outside to close search dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full relative z-50 shadow-sm flex flex-col">
      
      {/* 🟢 TOP TIER (White Bar) */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
            
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                {/* 🎨 LOGO RESPONSIVENESS APPLIED HERE: h-10 for mobile, lg:h-14 for desktop */}
                <img src={logo} alt="Let's Bharat Logo" className="h-10 lg:h-14 w-auto object-contain transition-transform hover:scale-105" />
              </Link>
            </div>

            {/* Desktop Search Bar (Only visible on lg devices) */}
            <div className="hidden lg:flex flex-1 max-w-2xl px-6 relative" ref={searchRef}>
              <div className="w-full relative">
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search startups, hackathons, jobs..."
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full py-2.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all shadow-inner"
                />
              </div>

              {/* Search Dropdown Results */}
              {isSearchFocused && (
                <div className="absolute top-full mt-2 w-[95%] bg-white border border-gray-100 shadow-2xl rounded-2xl py-3 px-2 z-[60]">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (
                      <Link 
                        key={index} 
                        to={item.path} 
                        onClick={() => { setIsSearchFocused(false); setSearchQuery(""); }}
                        className="block px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 rounded-xl transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))
                  ) : (
                    <p className="px-4 py-2 text-sm text-gray-400">No results found...</p>
                  )}
                </div>
              )}
            </div>

            {/* Profile / Auth Button */}
            <div className="hidden lg:flex items-center justify-end min-w-[150px]">
              {user ? (
                <Link to="/profile" className="flex items-center gap-3 cursor-pointer bg-gray-50 border border-gray-200 p-1.5 pr-5 rounded-full hover:bg-gray-100 transition-all shadow-sm">
                  <div className="w-9 h-9 bg-yellow-500 rounded-full flex items-center justify-center text-sm font-bold text-black">{user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}</div>
                  <span className="text-sm font-bold text-gray-800">{user.displayName}</span>
                </Link>
              ) : (
                <Link to="/auth" className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2.5 rounded-full text-sm font-black transition-all shadow-md">Let's Connect</Link>
              )}
            </div>

            {/* Mobile Hamburger Icon */}
            <div className="lg:hidden flex items-center">
              <button onClick={() => setIsOpen(true)} className="text-gray-800 hover:text-yellow-500 p-2"><svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg></button>
            </div>
          </div>
        </div>
      </div>

      {/* 🔴 BOTTOM TIER (Black Bar) - Desktop Only */}
      <div className="hidden lg:flex bg-[#111111] text-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-center py-3.5 space-x-10 text-xs font-bold tracking-widest uppercase">
            {searchableItems.map((item, idx) => (
              <Link key={idx} to={item.path} className="hover:text-yellow-400 transition-colors duration-200">{item.name}</Link>
            ))}
          </div>
        </div>
      </div>

      {/* 📱 MOBILE DRAWER (Cleaned Up - No Search) */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40 lg:hidden" onClick={closeMenu}></div>}

      <div className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 lg:hidden flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50">
          <span className="text-xl font-black text-gray-900">Menu</span>
          <button onClick={closeMenu} className="text-gray-400 hover:text-red-500 bg-white p-2 rounded-full shadow-sm">✕</button>
        </div>

        {/* Navigation Links for Mobile */}
        <div className="flex flex-col px-4 pt-6 space-y-2 flex-1 font-bold text-sm overflow-y-auto">
          {searchableItems.map((item, idx) => (
             <Link key={idx} to={item.path} onClick={closeMenu} className="text-gray-700 hover:text-yellow-500 hover:bg-yellow-50 px-4 py-3 rounded-xl transition-all">{item.name.toUpperCase()}</Link>
          ))}
          
          {/* Mobile Auth Status */}
          <div className="border-t border-gray-100 pt-4 mt-4">
            {user ? (
              <>
                <Link to="/profile" onClick={closeMenu} className="block text-gray-700 hover:text-yellow-500 hover:bg-yellow-50 px-4 py-3 rounded-xl transition-all">MY PROFILE</Link>
                <button onClick={handleLogout} className="w-full text-left text-red-500 hover:bg-red-50 px-4 py-3 rounded-xl transition-all mt-1">LOGOUT</button>
              </>
            ) : (
              <Link to="/auth" onClick={closeMenu} className="block text-center bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-3 rounded-xl transition-all">LET'S CONNECT</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;