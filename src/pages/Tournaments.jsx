import React, { useState, useEffect } from 'react';

const Tournaments = () => {
  // 🔐 Authentication State (Isko true karke test kar sakte ho login/signup condition)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // 🎛️ Filter & Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Trigger initial animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // 🖼️ Banner Images (Inko apne file explorer images se replace kar lena)
  const bannerSlides = [
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Slide 1
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80", // Slide 2
    "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"  // Slide 3
  ];

  // Auto Slider Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === bannerSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [bannerSlides.length]);

  // 🎮 Gaming Tournaments Data (Matching your image)
  const tournamentData = [
    {
      id: 1,
      title: "FREE FIRE MAX CUP",
      subtitle: "Squad Battle Royale Tournament",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&w=600&q=80",
      status: "FEATURED",
      platform: "MOBILE",
      prizePool: "₹50,000",
      date: "18 - 20 May 2026",
      entryFee: "₹100 / Team",
      teamSize: "4 Players",
      categories: ["ALL", "MOBILE", "BATTLE ROYALE", "SQUAD"],
      link: "https://forms.gle/freefire-link"
    },
    {
      id: 2,
      title: "BGMI PRO LEAGUE",
      subtitle: "Squad Battle Royale Tournament",
      image: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixlib=rb-4.0.3&w=600&q=80",
      status: "UPCOMING",
      platform: "MOBILE",
      prizePool: "₹1,00,000",
      date: "25 - 28 May 2026",
      entryFee: "₹150 / Team",
      teamSize: "4 Players",
      categories: ["ALL", "MOBILE", "BATTLE ROYALE", "SQUAD", "UPCOMING"],
      link: "https://forms.gle/bgmi-tournament-link"
    },
    {
      id: 3,
      title: "VALORANT SHOWDOWN",
      subtitle: "5v5 Competitive Tournament",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&w=600&q=80",
      status: "ONGOING",
      platform: "PC",
      prizePool: "₹75,000",
      date: "16 - 18 May 2026",
      entryFee: "₹200 / Team",
      teamSize: "5 Players",
      categories: ["ALL", "PC", "SQUAD", "ONGOING"],
      link: "https://forms.gle/valorant-link"
    },
    {
      id: 4,
      title: "COD MOBILE CHAMPIONSHIP",
      subtitle: "Multiplayer Team Deathmatch",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&w=600&q=80",
      status: "UPCOMING",
      platform: "MOBILE",
      prizePool: "₹25,000",
      date: "30 May - 01 Jun 2026",
      entryFee: "₹80 / Team",
      teamSize: "5 Players",
      categories: ["ALL", "MOBILE", "SQUAD", "UPCOMING"],
      link: "https://forms.gle/codm-link"
    }
  ];

  const filterTabs = ["ALL", "MOBILE", "PC", "CONSOLE", "ONGOING", "UPCOMING", "SOLO", "SQUAD", "BATTLE ROYALE"];

  // 🔍 Filter & Search Logic
  const filteredTournaments = tournamentData.filter((tourney) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = tourney.title.toLowerCase().includes(searchLower) || 
                          tourney.subtitle.toLowerCase().includes(searchLower) ||
                          tourney.platform.toLowerCase().includes(searchLower);
    
    const matchesTab = activeTab === "ALL" || tourney.categories.includes(activeTab);
    return matchesSearch && matchesTab;
  });

  // ✍️ Startups.jsx Style 3D Letter Animation
  const render3DLetters = (text, delayOffset = 0) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className={`inline-block transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
          isVisible ? "opacity-100 translate-y-0 scale-100 rotate-x-0 blur-0" : "opacity-0 translate-y-10 scale-50 -rotate-x-90 blur-sm"
        }`}
        style={{ transitionDelay: `${delayOffset + index * 40}ms`, transformStyle: 'preserve-3d' }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  // 🛑 Strict Registration Logic (Login required)
  const handleRegister = (link) => {
    if (!isLoggedIn) {
      alert("⚠️ Access Denied!\n\nYou must Log In or Sign Up to Let's Bharat before registering for any tournament. Please create an account to proceed.");
      // Yaha par tum apna login modal open karne ka logic laga sakte ho
    } else {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="w-full bg-[#fafafa] min-h-screen font-sans pb-10">
      
      {/* 🎨 ANIMATIONS CSS */}
      <style>{`
        .rotate-x-0 { transform: rotateX(0deg); }
        .-rotate-x-90 { transform: rotateX(-90deg); }
        .glass-panel { background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); }
      `}</style>

      {/* ========================================= */}
      {/* 🚀 PREMIUM HERO SLIDER SECTION            */}
      {/* ========================================= */}
      <div className="max-w-[1440px] mx-auto p-4 lg:p-6">
        <div className="relative w-full h-[400px] md:h-[500px] rounded-[30px] overflow-hidden shadow-2xl group">
          
          {/* Slider Images */}
          {bannerSlides.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <img src={slide} alt={`banner-${index}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
            </div>
          ))}

          {/* Slider Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-20">
            <div className={`inline-block mb-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="bg-[#ffcc00]/20 border border-[#ffcc00]/50 text-[#ffcc00] text-[10px] md:text-xs font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                Compete. Win. Dominate.
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-lg" style={{ perspective: '1000px' }}>
              <div className="block overflow-hidden pb-1">{render3DLetters("EXPLORE THE BEST", 100)}</div>
              <div className="block overflow-hidden text-[#ffcc00] pb-1">{render3DLetters("GAMING", 600)} <span className="text-white">{render3DLetters("TOURNAMENTS", 900)}</span></div>
            </h1>
            
            <p className={`text-gray-300 max-w-md text-sm md:text-base font-medium mb-8 transition-all duration-700 delay-[1200ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Join the action, compete with the best and win exciting prizes on India's largest eSports platform.
            </p>
            
            <button className={`bg-[#ffcc00] text-black w-max px-8 py-3.5 rounded-full font-extrabold text-sm hover:scale-105 hover:shadow-[0_0_20px_rgba(255,204,0,0.4)] transition-all duration-300 delay-[1400ms] ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              EXPLORE TOURNAMENTS →
            </button>
          </div>

          {/* Slider Controls */}
          <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-2">
            {bannerSlides.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-[#ffcc00] w-8' : 'bg-white/50 hover:bg-white'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* 🔍 SEARCH & FILTERS                       */}
      {/* ========================================= */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 mt-6">
        
        {/* Search Bar Row */}
        <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
          <div className="relative flex-grow w-full md:w-auto">
            <span className="absolute left-4 top-4 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search tournaments by game, platform or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffcc00] text-sm font-medium bg-white"
            />
            <button className="absolute right-2 top-2 bg-[#ffcc00] text-black px-6 py-2 rounded-xl font-bold text-sm hover:bg-yellow-500 transition-colors">
              SEARCH
            </button>
          </div>
          <button className="flex items-center gap-2 bg-white px-6 py-4 rounded-2xl shadow-sm font-bold text-sm text-gray-700 hover:bg-gray-50 transition-colors border border-gray-100 whitespace-nowrap w-full md:w-auto justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
            FILTERS
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                activeTab === tab 
                  ? "bg-[#ffcc00] text-black shadow-md border border-[#ffcc00]" 
                  : "bg-white text-gray-500 border border-gray-200 hover:border-gray-400 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
          <button className="px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap bg-white text-gray-500 border border-gray-200 hover:bg-gray-50 flex items-center gap-1">
            MORE FILTERS <span>▼</span>
          </button>
        </div>

      </div>

      {/* ========================================= */}
      {/* 🏆 TOURNAMENTS GRID                       */}
      {/* ========================================= */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 mt-8">
        
        {/* Section Header */}
        <div className="flex justify-between items-end mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#ffcc00] rounded-xl flex items-center justify-center text-xl shadow-md">🎮</div>
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">TOURNAMENTS</h2>
              <p className="text-xs text-gray-500 font-medium mt-0.5">Discover and join exciting gaming tournaments across different games.</p>
            </div>
          </div>
          <select className="hidden md:block bg-white border border-gray-200 text-xs font-bold text-gray-700 px-4 py-2 rounded-lg outline-none cursor-pointer">
            <option>NEWEST FIRST</option>
            <option>PRIZE POOL: HIGH TO LOW</option>
          </select>
        </div>

        {/* Grid Cards */}
        {filteredTournaments.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 font-medium">No tournaments match your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTournaments.map((tourney, index) => (
              <div 
                key={tourney.id} 
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 group flex flex-col"
                style={{ animation: `fadeIn 0.5s ease forwards`, animationDelay: `${index * 100}ms` }}
              >
                {/* Card Image Banner */}
                <div className="relative h-44 overflow-hidden bg-gray-900">
                  <img src={tourney.image} alt={tourney.title} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-md ${
                      tourney.status === 'FEATURED' ? 'bg-[#ffcc00] text-black' :
                      tourney.status === 'UPCOMING' ? 'bg-emerald-500 text-white' :
                      'bg-purple-600 text-white'
                    }`}>
                      {tourney.status}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="text-lg font-black text-gray-900 leading-tight mb-1">{tourney.title}</h3>
                  <p className="text-xs text-gray-500 font-medium mb-5">{tourney.subtitle}</p>
                  
                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-[11px] mb-5 font-semibold text-gray-800">
                    <div>
                      <p className="text-gray-400 font-medium mb-0.5 flex items-center gap-1">🏆 Prize Pool</p>
                      <p>{tourney.prizePool}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 font-medium mb-0.5 flex items-center gap-1">📅 Date</p>
                      <p>{tourney.date}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 font-medium mb-0.5 flex items-center gap-1">🪙 Entry Fee</p>
                      <p>{tourney.entryFee}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 font-medium mb-0.5 flex items-center gap-1">👥 Team Size</p>
                      <p>{tourney.teamSize}</p>
                    </div>
                  </div>

                  {/* Platform Tag */}
                  <div className="mb-5 mt-auto">
                    <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2.5 py-1 rounded border border-gray-200">
                      {tourney.platform}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    <button className="py-2.5 rounded-xl text-xs font-bold text-gray-700 bg-white border-2 border-gray-100 hover:border-gray-300 transition-colors">
                      VIEW DETAILS
                    </button>
                    {/* 👇 Strictly connects to Login Check Logic */}
                    <button 
                      onClick={() => handleRegister(tourney.link)}
                      className="py-2.5 rounded-xl text-xs font-black text-black bg-[#ffcc00] hover:bg-yellow-500 hover:shadow-md transition-all active:scale-95"
                    >
                      REGISTER NOW
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========================================= */}
      {/* 📣 BOTTOM CALL TO ACTION & FEATURES       */}
      {/* ========================================= */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 mt-16">
        
        {/* Banner */}
        <div className="bg-[#fff9e6] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between border border-[#ffe082]">
          <div className="flex items-center gap-6 mb-4 md:mb-0">
            <div className="w-16 h-16 bg-[#ffcc00]/20 rounded-full flex items-center justify-center text-3xl">🏆</div>
            <div>
              <h3 className="text-xl font-black text-gray-900">HAVE A TOURNAMENT TO ORGANIZE?</h3>
              <p className="text-sm text-gray-600 mt-1 font-medium">Create your tournament and reach thousands of players.</p>
            </div>
          </div>
          <button className="bg-[#ffcc00] text-black px-6 py-3.5 rounded-xl font-extrabold text-sm hover:scale-105 transition-transform w-full md:w-auto shadow-sm">
            CREATE TOURNAMENT →
          </button>
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 py-8 border-t border-gray-200">
          {[
            { icon: "🏆", title: "EXCITING PRIZES", desc: "Win cash prizes, gaming gear and more." },
            { icon: "🛡️", title: "FAIR PLAY", desc: "Secure and fair competition for all players." },
            { icon: "⭐", title: "TOP PLAYERS", desc: "Compete with skilled players from across the nation." },
            { icon: "📡", title: "LIVE UPDATES", desc: "Real-time updates, scores and leaderboards." }
          ].map((feat, i) => (
            <div key={i} className="flex flex-col items-center text-center p-4">
              <div className="text-3xl mb-3 text-[#ffcc00] drop-shadow-sm">{feat.icon}</div>
              <h4 className="text-xs font-black text-gray-900 tracking-wider mb-1">{feat.title}</h4>
              <p className="text-[11px] text-gray-500 font-medium leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default Tournaments;