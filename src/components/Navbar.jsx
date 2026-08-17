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

  // 🚀 FUTURE SCALE: Yahan naye sections/institutions add karo, search mein automatic aa jayenge
  const searchableItems = [
    { name: "Home", path: "/", type: "Page" },
    { name: "Institutions", path: "/institutions", type: "Page" },
    { name: "NIELIT Agartala", path: "/institutions", type: "Institution" },
    { name: "Techno College of Engineering Agartala", path: "/institutions", type: "Institution" },
    { name: "NIT Agartala", path: "/institutions", type: "Institution" },
    { name: "Hackathons", path: "/hackathons", type: "Page" },
    { name: "Internships", path: "/internships", type: "Page" },
    { name: "Jobs", path: "/jobs", type: "Page" },
    { name: "Learning Hub", path: "/learninghub", type: "Page" },
    { name: "Resources", path: "/resources", type: "Page" },
    { name: "About Us", path: "/about", type: "Page" },
  ];

  // Logic: Search filtering (For both Desktop & Mobile)
  const filteredItems = searchableItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
      closeMenu();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    setSearchQuery(""); // Drawer band hone par search clear kar do
  };

  // Click outside to close desktop search dropdown
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
      <div className="bg-white border-b border-gray-100 relative z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
            
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
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
                  placeholder="Search colleges, hackathons, jobs..."
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full py-2.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all shadow-inner"
                />
              </div>

              {/* Desktop Search Dropdown Results */}
              {isSearchFocused && searchQuery.length > 0 && (
                <div className="absolute top-full mt-2 w-[95%] max-h-[350px] overflow-y-auto bg-white border border-gray-100 shadow-2xl rounded-2xl py-3 px-2 z-[60] scrollbar-hide">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (
                      <Link 
                        key={index} 
                        to={item.path} 
                        onClick={() => { setIsSearchFocused(false); setSearchQuery(""); }}
                        className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 rounded-xl transition-colors group"
                      >
                        <span>{item.name}</span>
                        <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md ${
                          item.type === 'Institution' ? 'bg-indigo-50 text-indigo-500' : 'bg-gray-100 text-gray-400 group-hover:bg-yellow-100 group-hover:text-yellow-600'
                        }`}>
                          {item.type}
                        </span>
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center flex flex-col items-center justify-center gap-2">
                       <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                       <p className="text-sm font-medium text-gray-400">No results found for "{searchQuery}"</p>
                    </div>
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
              <button onClick={() => setIsOpen(true)} className="text-gray-800 hover:text-yellow-500 p-2 focus:outline-none">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🔴 BOTTOM TIER (Black Bar) - Desktop Only */}
      <div className="hidden lg:flex bg-[#111111] text-gray-200 relative z-40">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-center py-4 space-x-10 text-xs font-bold tracking-widest uppercase">
            {searchableItems.filter(i => i.type === "Page").map((item, idx) => (
              <Link 
                key={idx} 
                to={item.path} 
                className="relative group transition-colors duration-200 hover:text-white"
              >
                {item.name}
                <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 ease-out group-hover:w-full"></span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 📱 MOBILE DRAWER (With Integrated Search Logic)             */}
      {/* ========================================================= */}
      
      {/* Background Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden transition-opacity" 
          onClick={closeMenu}
        ></div>
      )}

      {/* Right Side Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-white shadow-2xl z-50 transform transition-transform duration-400 ease-in-out lg:hidden flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Top Header inside Drawer (Logo + Close Button) */}
        <div className="flex items-center justify-between p-5 pb-4 border-b border-gray-100 shrink-0">
          <img src={logo} alt="Let's Bharat Logo" className="h-10 w-auto object-contain" />
          <button 
            onClick={closeMenu} 
            className="text-gray-400 hover:text-red-500 p-2 rounded-full transition-colors focus:outline-none bg-gray-50 hover:bg-red-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 🔍 Mobile Search Bar */}
        <div className="p-4 border-b border-gray-100 shrink-0 bg-gray-50/50">
          <div className="relative">
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Let's Bharat..."
              className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Navigation Links / Search Results for Mobile */}
        <div className="flex flex-col flex-1 overflow-y-auto bg-white">
          
          {/* Conditional Rendering: Agar user search kar raha hai toh results dikhao, warna default menu */}
          {searchQuery.length > 0 ? (
            <div className="flex flex-col px-4 py-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-2">Search Results</p>
              {filteredItems.length > 0 ? (
                filteredItems.map((item, idx) => (
                  <Link 
                    key={idx} 
                    to={item.path} 
                    onClick={closeMenu} 
                    className="flex items-center justify-between py-3.5 px-2 border-b border-gray-100 hover:bg-yellow-50 rounded-lg transition-colors group"
                  >
                    <span className="text-gray-800 font-semibold text-sm group-hover:text-yellow-600">{item.name}</span>
                    <span className="text-[9px] uppercase tracking-wider font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">
                      {item.type}
                    </span>
                  </Link>
                ))
              ) : (
                <div className="py-8 text-center text-gray-400 text-sm font-medium">
                  No results found for "{searchQuery}"
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Default Mobile Menu Links */}
              <div className="flex flex-col px-6 pt-2">
                {searchableItems.filter(i => i.type === "Page").map((item, idx) => (
                  <Link 
                    key={idx} 
                    to={item.path} 
                    onClick={closeMenu} 
                    className="text-gray-700 hover:text-yellow-600 font-medium py-3.5 border-b border-gray-100 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              {/* Mobile Auth Status */}
              <div className="flex flex-col px-6 pb-8 mt-2">
                {user ? (
                  <>
                    <Link 
                      to="/profile" 
                      onClick={closeMenu} 
                      className="text-gray-700 hover:text-yellow-600 font-medium py-3.5 border-b border-gray-100 transition-colors"
                    >
                      My Profile
                    </Link>
                    <button 
                      onClick={handleLogout} 
                      className="text-left text-red-500 font-medium py-3.5 border-b border-gray-100 transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/auth" 
                      onClick={closeMenu} 
                      className="text-gray-700 hover:text-yellow-600 font-medium py-3.5 border-b border-gray-100 transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link 
                      to="/auth" 
                      onClick={closeMenu} 
                      className="text-yellow-600 font-bold py-3.5 transition-colors"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </>
          )}

        </div>
      </div>

    </nav>
  );
};

export default Navbar;