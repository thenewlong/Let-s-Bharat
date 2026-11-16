import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/logos2.jpeg'; 

// ⏱️ Har banner kitni der dikhega (milliseconds) - 5 second
const BANNER_DURATION = 5000;

// 🎨 NEO-BRUTALISM ROTATING BANNERS
// Naya banner add/change karna ho toh bas yahan edit karo
const banners = [
  {
    label: "Founder Spotlight",
    text: "EXPLORE THE FOUNDER'S VISION & JOURNEY",
    href: "https://newlongdebbarma.letsbharat.com",
    external: true,
    bg: "bg-yellow-400",
    
  },
  {
    label: "Opportunities",
    text: "DISCOVER INTERNSHIPS, JOBS & HACKATHONS",
    href: "/internships",
    external: false,
    bg: "bg-pink-400",
   
  },
  {
    label: "Institutional Partnership",
    text: "BRING YOUR INSTITUTION TO LETSBHARAT",
    href: "/institutions",
    external: false,
    bg: "bg-cyan-300",
    
  },
  {
    label: "Community",
    text: "CONNECT, COLLABORATE & GROW TOGETHER",
    href: "/about",
    external: false,
    bg: "bg-lime-300",
   
  },
  {
    label: "Platform Updates",
    text: "EXPLORE WHAT'S NEW ON LETSBHARAT",
    href: "/resources",
    external: false,
    bg: "bg-orange-400",
   
  },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [isOpen, setIsOpen] = useState(false); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [activeBanner, setActiveBanner] = useState(0);
  const [isBannerPaused, setIsBannerPaused] = useState(false);
  const searchRef = useRef(null);

  // Trigger entrance animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // 🔁 Banner auto-rotate: har 5 second mein next banner (hover par pause)
  // activeBanner dependency mein hai taaki dot click karne par timer reset ho jaye
  useEffect(() => {
    if (isBannerPaused) return;
    const timeout = setTimeout(() => {
      setActiveBanner((prev) => (prev + 1) % banners.length);
    }, BANNER_DURATION);
    return () => clearTimeout(timeout);
  }, [activeBanner, isBannerPaused]);

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

  const current = banners[activeBanner];
  const words = current.text.split(" ");

  // Poora banner clickable hai (Explore button hata diya gaya hai)
  const bannerLinkClass =
    "group flex flex-col sm:flex-row items-center justify-center gap-x-3 gap-y-1.5 text-center max-w-5xl cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-black/40 rounded-md banner-slide-in";

  const bannerInner = (
    <>
      {/* Label chip with live dot */}
      <span className={`banner-chip-pop inline-flex items-center gap-1.5 whitespace-nowrap text-[9px] sm:text-[11px] md:text-xs font-black uppercase tracking-[0.14em] border-2 border-black px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md shadow-[3px_3px_0px_0px_#000] ${current.chip}`}>
        <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-black opacity-60 animate-ping"></span>
          <span className="relative inline-flex h-full w-full rounded-full bg-black"></span>
        </span>
        {current.label}
      </span>

      {/* Divider (sirf tablet/desktop par) */}
      <span className="hidden sm:block h-5 w-[2px] bg-black/80" aria-hidden="true"></span>

      {/* Text - word by word animation + arrow */}
      <span className="text-[11px] sm:text-sm md:text-base font-extrabold tracking-tight leading-tight">
        {words.map((word, i) => (
          <span
            key={`${activeBanner}-${i}`}
            className="banner-word mr-[0.28em] decoration-2 underline-offset-4 group-hover:underline"
            style={{ animationDelay: `${0.25 + i * 0.08}s` }}
          >
            {word}
          </span>
        ))}

        {/* Arrow (button nahi, sirf direction indicator) */}
        <span
          className="banner-arrow inline-block align-middle ml-1"
          style={{ animationDelay: `${0.35 + words.length * 0.08}s` }}
        >
          <span className="inline-flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 bg-black text-white rounded-full transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-12">
            <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
            </svg>
          </span>
        </span>
      </span>
    </>
  );

  return (
    <nav className="w-full relative z-50 shadow-sm flex flex-col overflow-x-hidden">

      {/* Banner animation keyframes */}
      <style>{`
        @keyframes bannerSlideIn {
          0%   { opacity: 0; transform: translateY(100%) rotate(-2deg); }
          60%  { opacity: 1; transform: translateY(-8%) rotate(0.5deg); }
          100% { opacity: 1; transform: translateY(0) rotate(0deg); }
        }
        @keyframes bannerWordPop {
          0%   { opacity: 0; transform: translateY(14px) scale(0.85) rotate(-3deg); }
          70%  { opacity: 1; transform: translateY(-2px) scale(1.05) rotate(0.5deg); }
          100% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
        }
        @keyframes bannerChipPop {
          0%   { opacity: 0; transform: scale(0.4) rotate(-8deg); }
          70%  { opacity: 1; transform: scale(1.1) rotate(2deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes bannerProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
        .banner-slide-in { animation: bannerSlideIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .banner-chip-pop { animation: bannerChipPop 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both; }
        .banner-word { display: inline-block; animation: bannerWordPop 0.45s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .banner-arrow { animation: bannerChipPop 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .banner-progress { animation: bannerProgress ${BANNER_DURATION}ms linear both; }

        @media (prefers-reduced-motion: reduce) {
          .banner-slide-in, .banner-chip-pop, .banner-word, .banner-arrow, .banner-progress {
            animation: none !important;
          }
        }
      `}</style>
      
      {/* ========================================================= */}
      {/* 🌟 NEO-BRUTALISM ROTATING BANNER (5 BANNERS x 5 SECONDS)   */}
      {/* ========================================================= */}
      <div
        onMouseEnter={() => setIsBannerPaused(true)}
        onMouseLeave={() => setIsBannerPaused(false)}
        className={`w-full relative z-50 overflow-hidden text-black border-b-4 border-black transition-[background-color,opacity,transform] duration-500 ease-out ${current.bg} ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
      >
        {/* Fixed height: mobile pe 2 line ke liye jagah, PC pe single line */}
        <div className="flex items-center justify-center min-h-[72px] sm:min-h-[52px] lg:min-h-[56px] px-3 sm:px-6 md:px-16 py-2 overflow-hidden">

          {/* key change hone par saari animations dobara chalti hain */}
          {current.external ? (
            <a
              key={activeBanner}
              href={current.href}
              target="_blank"
              rel="noopener noreferrer"
              className={bannerLinkClass}
            >
              {bannerInner}
            </a>
          ) : (
            <Link key={activeBanner} to={current.href} className={bannerLinkClass}>
              {bannerInner}
            </Link>
          )}

          {/* Dots indicator (tablet/desktop par) */}
          <div className="hidden md:flex items-center gap-1.5 absolute right-4 top-1/2 -translate-y-1/2">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveBanner(i)}
                aria-label={`Go to banner ${i + 1}`}
                className={`h-3 border-2 border-black transition-all duration-300 focus:outline-none ${
                  i === activeBanner ? 'w-6 bg-black' : 'w-3 bg-white hover:bg-black/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 5 second progress bar */}
        {!isBannerPaused && (
          <div
            key={`progress-${activeBanner}`}
            className="banner-progress absolute bottom-0 left-0 h-[4px] bg-black"
          />
        )}
      </div>

      {/* 🟢 TOP TIER (White Bar) */}
      <div className="bg-white border-b border-gray-100 relative z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
            
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img src={logo} alt="Let's Bharat Logo" className="h-9 sm:h-10 lg:h-14 w-auto object-contain transition-transform hover:scale-105" />
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
      {/* 📱 MOBILE DRAWER (With Integrated Search Logic)            */}
      {/* ========================================================= */}
      
      {/* Background Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden transition-opacity text-xs font-bold tracking-widest uppercase" 
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