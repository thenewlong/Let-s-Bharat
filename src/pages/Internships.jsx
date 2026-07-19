import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// 📂 1. Apne local assets folder se images import karo (Path apne hisaab se adjust kar lena)
import banner1 from '../assets/images/banner1.jpeg';
import banner2 from '../assets/images/banner2.jpeg';
import banner4 from '../assets/images/banner4.jpeg'; // 👈 ERROR FIX: Yaha banner4 ki jagah banner3 import kiya

// 📂 Internship cards ke liye images
import intern1 from '../assets/images/intern1.jpeg';
import intern2 from '../assets/images/intern2.jpeg';
import intern3 from '../assets/images/intern3.jpeg';
import intern4 from '../assets/images/intern4.jpeg';

const Internship = () => {
  // const { user } = useAuth(); // Asli Auth use karte waqt isko uncomment karna
  const user = null; // ⚠️ TEST KE LIYE: Isko null rakha hai taaki login alert test kar sako
  const navigate = useNavigate();

  // 🎛️ States
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All Internships");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Trigger initial animation for 3D Text
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const banners = [banner1, banner2, banner4];

  // 🚀 Auto Slider Logic 
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [banners.length]);

  // 🛡️ SECURITY GUARD LOGIC FOR APPLY
  const handleApplyClick = (e, link) => {
    e.preventDefault(); 
    if (user) {
      window.open(link, '_blank');
    } else {
      alert("⚠️ Access Denied!\nPlease login to apply for this internship.");
      navigate('/auth');
    }
  };

  // ---------------------------------------------------------
  // 💼 INTERNSHIP DATA
  // ---------------------------------------------------------
  const internshipsData = [
    {
      id: 1,
      title: "Frontend React Developer",
      company: "TechNexus Solutions",
      description: "Work on cutting-edge React applications, build responsive UIs, and integrate APIs.",
      eligibility: "CS/IT Students (Diploma & B.Tech)",
      duration: "3 Months",
      location: "Remote (WFH)",
      stipend: "₹10,000 / month",
      status: "HIRING NOW",
      tabCategory: "Tech",
      isOpen: true,
      image: intern1,
      link: "https://easyshiksha.com/online_courses/full-stack-web-development-with-the-mern-stack"
    },
    {
      id: 2,
      title: "UI/UX Designer Intern",
      company: "Creative Minds Studio",
      description: "Design user-centric interfaces for mobile and web apps. Collaborate directly with the dev team.",
      eligibility: "Figma & Design Enthusiasts",
      duration: "6 Months",
      location: "Agartala, Tripura",
      stipend: "₹12,000 / month",
      status: "URGENT",
      tabCategory: "Design",
      isOpen: true,
      image: intern2,
      link: "https://your-website-link.com/apply" 
    },
    {
      id: 3,
      title: "Full Stack Web Intern",
      company: "InnoWave Labs",
      description: "Get hands-on experience with Node.js, Express, MongoDB, and React. Build scalable systems.",
      eligibility: "MERN Stack Knowledge",
      duration: "4 Months",
      location: "Remote",
      stipend: "₹15,000 / month",
      status: "UPCOMING",
      tabCategory: "Tech",
      isOpen: false,
      image: intern3,
      link: "https://forms.gle/your-google-form-link-3"
    },
    {
      id: 4,
      title: "Marketing & Growth Intern",
      company: "Apex Startups",
      description: "Drive social media campaigns, manage communities, and help grow our digital presence.",
      eligibility: "Open to all branches",
      duration: "2 Months",
      location: "Hybrid Mode",
      stipend: "Performance Based",
      status: "OPEN",
      tabCategory: "Management",
      isOpen: true,
      image: intern4,
      link: "https://forms.gle/your-google-form-link-4"
    }
  ];

  // 🔍 Filtering Logic
  const filteredInternships = internshipsData.filter((intern) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = intern.title.toLowerCase().includes(searchLower) || 
                          intern.company.toLowerCase().includes(searchLower) ||
                          intern.location.toLowerCase().includes(searchLower);
    const matchesTab = activeTab === "All Internships" || intern.tabCategory === activeTab;
    return matchesSearch && matchesTab;
  });

  // ✨ WORD-BY-WORD 3D ZOOM-OUT ANIMATION (Same as Tournaments)
  const render3DWords = (text, delayOffset = 0) => {
    return text.split(" ").map((word, index) => (
      <span
        key={index}
        className={`inline-block transition-all duration-1000 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
          isVisible ? "opacity-100 scale-100 translate-z-0" : "opacity-0 scale-150 translate-z-[100px]"
        }`}
        style={{ 
          transitionDelay: `${delayOffset + index * 100}ms`, 
          marginRight: "0.25em" 
        }}
      >
        {word}
      </span>
    ));
  };

  return (
    <div className="w-full bg-[#fafafa] min-h-screen font-sans pb-10">
      
      {/* ========================================= */}
      {/* 🚀 TOURNAMENT-STYLE HERO SLIDER           */}
      {/* ========================================= */}
      <div className="max-w-[1440px] mx-auto p-4 lg:p-6">
        <div className="relative w-full h-[280px] sm:h-[350px] md:h-[400px] rounded-[24px] md:rounded-[30px] overflow-hidden shadow-2xl group perspective-[1000px]">
          
          {/* Slider Images */}
          {banners.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <img src={slide} alt={`banner-${index}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
            </div>
          ))}

          {/* Slider Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-16">
            <div className={`inline-block mb-2 md:mb-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="bg-[#6366f1]/20 border border-[#6366f1]/50 text-[#818cf8] text-[8px] md:text-xs font-black uppercase tracking-[0.2em] px-3 md:px-4 py-1.5 rounded-full">
                Learn. Build. Get Hired.
              </span>
            </div>
            
            {/* 3D Animated Title */}
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.1] mb-3 md:mb-4 drop-shadow-lg" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
              <div className="block overflow-hidden pb-0.5">{render3DWords("NOT AVAILABLE ANY EXPLORE TOP", 100)}</div>
              <div className="block overflow-hidden text-[#818cf8] pb-0.5">
                {render3DWords("INTERNSHIP", 400)} <span className="text-white">{render3DWords("OPPORTUNITIES", 600)}</span>
              </div>
            </h1>
            
            <p className={`text-gray-300 max-w-sm text-[11px] md:text-sm font-medium mb-5 md:mb-6 transition-all duration-700 delay-[800ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Kickstart your career with remote and onsite internships. Gain real-world experience and build your portfolio.
            </p>
          </div>

          {/* Slider Controls */}
          <div className="absolute bottom-4 md:bottom-6 left-0 right-0 z-30 flex justify-center gap-1.5 md:gap-2">
            {banners.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-[#6366f1] w-6 md:w-8' : 'bg-white/50 hover:bg-white'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* 🔍 SEARCH & FILTERS                       */}
      {/* ========================================= */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 mt-4 md:mt-6">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center mb-6 w-full">
          
          {/* Search Bar */}
          <div className="relative flex-grow w-full">
            <span className="absolute left-4 top-4 text-gray-400"></span>
            <input
              type="text"
              placeholder="Search by role, company or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6366f1] text-sm font-medium bg-white text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {["All Internships", "Tech", "Design", "Management"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 rounded-xl text-[10px] md:text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab 
                    ? "bg-[#6366f1] text-white shadow-md border border-[#6366f1]" 
                    : "bg-white text-gray-500 border border-gray-200 hover:border-gray-400 hover:text-black"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* 💼 INTERNSHIP CARDS GRID (Tournament Style)*/}
      {/* ========================================= */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 mt-2">
        {filteredInternships.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 font-medium">No internships match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {filteredInternships.map((intern) => (
              <div 
                key={intern.id} 
                className="bg-white rounded-[20px] overflow-hidden border border-gray-200 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group flex flex-col"
              >
                {/* Card Image Banner */}
                <div className="relative h-40 overflow-hidden bg-gray-900">
                  <img src={intern.image} alt={intern.title} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-md text-white ${
                      intern.status === 'HIRING NOW' ? 'bg-[#6366f1]' :
                      intern.status === 'URGENT' ? 'bg-red-500' :
                      'bg-emerald-500'
                    }`}>
                      {intern.status}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 md:p-5 flex-grow flex flex-col">
                  <p className="text-[10px] md:text-[11px] font-bold text-[#6366f1] tracking-wider uppercase mb-1">{intern.company}</p>
                  <h3 className="text-base md:text-lg font-black text-gray-900 leading-tight mb-2">{intern.title}</h3>
                  <p className="text-[11px] md:text-xs text-gray-500 font-medium mb-4 line-clamp-2">{intern.description}</p>
                  
                  {/* Details Grid (Tournament Format) */}
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-[10px] md:text-[11px] mb-5 font-semibold text-gray-800">
                    <div><p className="text-gray-400 font-medium mb-0.5">💰 Stipend</p><p className="text-green-600 font-bold">{intern.stipend}</p></div>
                    <div><p className="text-gray-400 font-medium mb-0.5">⏳ Duration</p><p>{intern.duration}</p></div>
                    <div><p className="text-gray-400 font-medium mb-0.5">📍 Location</p><p className="truncate pr-2">{intern.location}</p></div>
                    <div><p className="text-gray-400 font-medium mb-0.5">🎓 Eligibility</p><p className="truncate pr-2">{intern.eligibility}</p></div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-auto pt-2">
                    {/* 👇 Yaha par 'a' tag hata kar button lagaya hai taaki Security Guard logic kaam kare */}
                    <button 
                      onClick={(e) => handleApplyClick(e, intern.link)}
                      className={`w-full py-3 rounded-xl text-[10px] md:text-xs font-black transition-all active:scale-95 ${
                        intern.isOpen 
                          ? 'bg-[#6366f1] text-white hover:bg-[#4f46e5] hover:shadow-md'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={!intern.isOpen}
                    >
                      {intern.isOpen ? 'APPLY NOW →' : 'OPENING SOON'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Internship;