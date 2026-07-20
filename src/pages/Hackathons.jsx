import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Agar AuthContext path alag ho toh change kar lena

// 📂 Local Assets (Aapke file explorer se)
import banner1 from '../assets/images/banner1.jpeg';
import banner2 from '../assets/images/banner2.jpeg';
import banner3 from '../assets/images/hack3.jpeg';

import hack1 from '../assets/images/hack1.jpeg';
import hack2 from '../assets/images/hack2.jpeg';
import hack3 from '../assets/images/hack3.jpeg';
import hack4 from '../assets/images/hack4.jpeg';

const Hackathons = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // ---------------------------------------------------------
  // 1. STATES
  // ---------------------------------------------------------
  const banners = [banner1, banner2, banner3];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");
  const [sortOption, setSortOption] = useState("NEWEST FIRST");
  
  // 🆕 Modal State
  const [selectedHackathon, setSelectedHackathon] = useState(null);

  // 🚀 Banner Auto Slider Logic
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(slideInterval);
  }, [banners.length]);

  // 🛡️ Registration Logic with Auth Check
  const handleRegisterClick = (e, link) => {
    e.stopPropagation(); // Card ke click ko rokne ke liye
    if (user) {
      window.open(link, '_blank');
    } else {
      alert("Please Sign Up or Log In first to register for this event!");
      navigate('/auth'); // Apne login route se replace karein if needed
    }
  };

  // 👁️ View Details - Ab naye page nahi jayega, Modal khulega
  const handleViewDetails = (hackathon) => {
    setSelectedHackathon(hackathon);
  };

  const closeModal = () => {
    setSelectedHackathon(null);
  };

  // ---------------------------------------------------------
  // 2. MOCK DATA 
  // ---------------------------------------------------------
  const hackathonsData = [
    {
      id: 1,
      title: "AI FOR IMPACT HACKATHON 2026",
      description: "Build AI solutions that solve real-world problems in healthcare, education, and sustainability. Gather your squad and battle it out against top teams.",
      prizePool: "₹2,00,000",
      prizeValue: 200000, 
      date: "10 - 12 May 2026",
      mode: "Online",
      teamSize: "1 - 4 Members",
      tags: ["AI/ML", "HEALTHCARE", "SUSTAINABILITY"],
      status: "FEATURED",
      statusColor: "bg-yellow-500",
      category: "ONLINE",
      addedOn: "2026-06-10",
      image: hack1,
      link: "https://forms.gle/sample1",
    },
    {
      id: 2,
      title: "WEB3 INNOVATORS HACKATHON",
      description: "Create the next generation of decentralized apps and Web3 solutions. Gather your squad and battle it out against top teams.",
      prizePool: "₹1,50,000",
      prizeValue: 150000,
      date: "18 - 20 May 2026",
      mode: "Online",
      teamSize: "1 - 4 Members",
      tags: ["WEB3", "BLOCKCHAIN", "DEFI"],
      status: "UPCOMING",
      statusColor: "bg-emerald-500",
      category: "UPCOMING",
      addedOn: "2026-06-12",
      image: hack2,
      link: "https://forms.gle/sample2",
    },
    {
      id: 3,
      title: "CLIMATE TECH HACKATHON",
      description: "Innovate for a sustainable future. Build climate tech solutions for a better tomorrow. Join the ultimate showdown and claim the glory.",
      prizePool: "₹1,00,000",
      prizeValue: 100000,
      date: "05 - 07 May 2026",
      mode: "Online / Offline",
      teamSize: "2 - 5 Members",
      tags: ["CLIMATE", "GREEN TECH", "IOT"],
      status: "ONGOING",
      statusColor: "bg-purple-500",
      category: "ONGOING",
      addedOn: "2026-06-15",
      image: hack3,
      link: "https://forms.gle/sample3",
    },
    {
      id: 4,
      title: "FINTECH CODE SPRINT",
      description: "Solve real-world finance challenges with technology and win exciting rewards in this massive prize pool event.",
      prizePool: "₹75,000",
      prizeValue: 75000,
      date: "24 - 25 May 2026",
      mode: "Online",
      teamSize: "1 - 3 Members",
      tags: ["FINTECH", "BANKING", "PAYMENTS"],
      status: "UPCOMING",
      statusColor: "bg-emerald-500",
      category: "UPCOMING",
      addedOn: "2026-06-14",
      image: hack4,
      link: "https://forms.gle/sample4",
    },
  ];

  // ---------------------------------------------------------
  // 3. FILTERING & SORTING LOGIC
  // ---------------------------------------------------------
  let filteredData = hackathonsData.filter((hack) => {
    const matchesSearch = 
      hack.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      hack.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTab = activeTab === "ALL" || 
                       hack.category === activeTab || 
                       (activeTab === "ONLINE" && hack.mode.toLowerCase().includes("online")) ||
                       (activeTab === "OFFLINE" && hack.mode.toLowerCase().includes("offline"));
    
    return matchesSearch && matchesTab;
  });

  if (sortOption === "PRIZE: HIGH TO LOW") {
    filteredData.sort((a, b) => b.prizeValue - a.prizeValue);
  } else if (sortOption === "NEWEST FIRST") {
    filteredData.sort((a, b) => new Date(b.addedOn) - new Date(a.addedOn));
  }

  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen font-sans pb-10">
      
      {/* CSS for 3D Text Animation and Modal Pop */}
      <style>
        {`
          @keyframes zoomIn3D {
            0% { opacity: 0; transform: scale(0.3) translateZ(-150px) rotateX(15deg); }
            100% { opacity: 1; transform: scale(1) translateZ(0) rotateX(0deg); }
          }
          .animate-text-3d {
            display: inline-block;
            opacity: 0;
            animation: zoomIn3D 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          }
          @keyframes popIn {
            0% { opacity: 0; transform: scale(0.9) translateY(20px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          .animate-pop-in {
            animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          }
        `}
      </style>

      {/* ========================================================= */}
      {/* 1. HERO BANNER SECTION (WITH 3D TEXT)                     */}
      {/* ========================================================= */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-[450px] rounded-3xl overflow-hidden bg-gray-900 shadow-xl group perspective-[1000px]">
          
          {/* Background Images */}
          {banners.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-50" : "opacity-0"
              }`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}

          {/* Overlay Content */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent flex flex-col justify-center px-6 md:px-16">
            <p className="text-[#f5a623] font-bold text-xs md:text-sm tracking-[0.2em] mb-3 uppercase">
              DISCOVER. COMPETE. INNOVATE.
            </p>
            
            {/* 3D Animated Title */}
            <h1 className="text-3xl md:text-6xl font-black text-white leading-tight mb-4 flex flex-wrap gap-x-4">
              <span className="animate-text-3d" style={{ animationDelay: '0.1s' }}>EXPLORE</span>
              <span className="animate-text-3d" style={{ animationDelay: '0.3s' }}>THE</span>
              <span className="animate-text-3d" style={{ animationDelay: '0.5s' }}>BEST</span>
              <span className="animate-text-3d text-[#f5a623] w-full mt-1" style={{ animationDelay: '0.7s' }}>HACKATHONS</span>
            </h1>

            <p className="text-gray-300 max-w-lg text-sm md:text-lg mb-8 font-medium animate-text-3d" style={{ animationDelay: '0.9s' }}>
              Find hackathons across the globe. Build solutions, win prizes and create impact with your ideas.
            </p>
            
            <div className="animate-text-3d" style={{ animationDelay: '1.1s' }}>
              <button className="bg-[#f5a623] hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg shadow-lg shadow-yellow-500/20 transition-transform active:scale-95 flex items-center gap-2 text-sm md:text-base">
                EXPLORE HACKATHONS <span>→</span>
              </button>
            </div>
          </div>
          
          {/* Slider Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentSlide ? "w-8 bg-[#f5a623]" : "w-2 bg-white/40"}`} />
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. SEARCH & TABS SECTION                                  */}
      {/* ========================================================= */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Search Bar Row */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-grow flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[#f5a623] transition-all">
            <svg className="w-6 h-6 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input 
              type="text" 
              placeholder="Search hackathons by title, technology, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-gray-700 text-sm md:text-base font-medium py-2"
            />
            <button className="hidden md:block bg-[#f5a623] hover:bg-yellow-500 text-black px-8 py-2.5 rounded-lg font-bold text-sm transition-colors">
              SEARCH
            </button>
          </div>
         
        </div>

        {/* Filter Pills */}
        <div className="flex overflow-x-auto pb-4 hide-scrollbar gap-3">
          {["ALL", "ONGOING", "UPCOMING", "ONLINE", "OFFLINE", "STUDENT", "OPEN TO ALL"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-xs md:text-sm font-bold whitespace-nowrap border transition-all ${
                activeTab === tab 
                  ? "bg-[#f5a623] border-[#f5a623] text-black shadow-md" 
                  : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. LISTING HEADER & SORTING                               */}
      {/* ========================================================= */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#fff8e1] rounded-xl flex items-center justify-center border border-yellow-200">
            <svg className="w-6 h-6 text-[#f5a623]" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path></svg>
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 leading-none">HACKATHONS</h2>
            <p className="text-sm text-gray-500 font-medium mt-1">Explore upcoming and ongoing hackathons. Build, innovate and win rewards.</p>
          </div>
        </div>

        {/* Sort Dropdown */}
        <select 
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#f5a623] cursor-pointer shadow-sm"
        >
          <option value="NEWEST FIRST">NEWEST FIRST</option>
          <option value="PRIZE: HIGH TO LOW">PRIZE: HIGH TO LOW</option>
        </select>
      </div>

      {/* ========================================================= */}
      {/* 4. HACKATHON CARDS GRID                                   */}
      {/* ========================================================= */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {filteredData.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <p className="text-gray-500 font-medium">No hackathons found for your search/filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredData.map((hack) => (
              <div 
                key={hack.id}
                onClick={() => handleViewDetails(hack)} // Open Modal on Card Click
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer group"
              >
                
                {/* Image & Top Badge */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <img src={hack.image} alt={hack.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className={`absolute top-3 left-3 ${hack.statusColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide shadow-md`}>
                    {hack.status}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-extrabold text-[17px] text-gray-900 leading-tight mb-2 uppercase group-hover:text-[#f5a623] transition-colors line-clamp-2">
                    {hack.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium leading-snug mb-5 line-clamp-2">
                    {hack.description}
                  </p>

                  {/* 2x2 Grid Details */}
                  <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-5">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-1 flex items-center gap-1">🏆 Prize Pool</p>
                      <p className="text-sm font-bold text-gray-900">{hack.prizePool}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-1 flex items-center gap-1">📅 Date</p>
                      <p className="text-sm font-bold text-gray-900">{hack.date}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-1 flex items-center gap-1">📍 Mode</p>
                      <p className="text-sm font-bold text-gray-900">{hack.mode}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-1 flex items-center gap-1">👥 Team Size</p>
                      <p className="text-sm font-bold text-gray-900">{hack.teamSize}</p>
                    </div>
                  </div>

                  {/* Tags Pills */}
                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {hack.tags.map((tag, i) => (
                      <span key={i} className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleViewDetails(hack); }}
                      className="text-gray-900 font-extrabold text-xs hover:text-[#f5a623] transition-colors"
                    >
                      VIEW DETAILS
                    </button>
                    <button 
                      onClick={(e) => handleRegisterClick(e, hack.link)}
                      className="bg-[#f5a623] hover:bg-yellow-500 text-black font-bold text-xs px-5 py-2.5 rounded shadow-md transition-transform active:scale-95"
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

      {/* ========================================================= */}
      {/* 5. MODAL POPUP (MATCHING YOUR IMAGE)                      */}
      {/* ========================================================= */}
      {selectedHackathon && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity" 
          onClick={closeModal} // Click outside to close
        >
          {/* Modal Container */}
          <div 
            className="relative w-full max-w-[400px] bg-[#f9f9ee] rounded-[20px] overflow-hidden shadow-2xl animate-pop-in"
            onClick={(e) => e.stopPropagation()} // Card ke andar click karne par close na ho
          >
            
            {/* Top Image & Overlay Section */}
            <div className="relative h-[220px] w-full">
              <img 
                src={selectedHackathon.image} 
                alt={selectedHackathon.title} 
                className="w-full h-full object-cover"
              />
              {/* Dark Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
              
              {/* Close Button (Top Right) */}
              <button 
                onClick={closeModal} 
                className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors backdrop-blur-md"
              >
                ✕
              </button>

              {/* Tag & Title (Bottom Left) */}
              <div className="absolute bottom-5 left-5 right-5">
                <span className="bg-[#f5a623] text-black text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider">
                  {selectedHackathon.category}
                </span>
                <h2 className="text-white text-[22px] font-black uppercase mt-2 leading-tight">
                  {selectedHackathon.title}
                </h2>
              </div>
            </div>

            {/* Bottom Content Section */}
            <div className="p-6">
              <p className="text-gray-500 text-[13px] font-medium leading-relaxed mb-6">
                {selectedHackathon.description}
              </p>

              {/* Details Grid matching image style */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                <div>
                  <p className="text-[11px] text-gray-400 font-bold uppercase mb-1">Prize Pool</p>
                  <p className="text-[17px] font-bold text-green-600">{selectedHackathon.prizePool}</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 font-bold uppercase mb-1">Date</p>
                  <p className="text-[15px] font-bold text-gray-800">{selectedHackathon.date}</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 font-bold uppercase mb-1">Mode / Fee</p>
                  <p className="text-[15px] font-bold text-gray-800">{selectedHackathon.mode}</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 font-bold uppercase mb-1">Team Size</p>
                  <p className="text-[15px] font-bold text-gray-800">{selectedHackathon.teamSize}</p>
                </div>
              </div>

              {/* Full Width Proceed Button */}
              <button 
                onClick={(e) => { handleRegisterClick(e, selectedHackathon.link); closeModal(); }}
                className="w-full bg-[#eec34b] hover:bg-[#dcae3a] text-black font-extrabold text-[13px] py-4 rounded-lg shadow-sm transition-transform active:scale-95 uppercase tracking-wide"
              >
                PROCEED TO REGISTER →
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Hackathons;