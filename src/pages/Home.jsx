import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';



// 🎥 Apni saari videos yahan import karein (path check kar lena)
import video1 from '../assets/videos/video1.mp4';
import video2 from '../assets/videos/video2.mp4';
import video3 from '../assets/videos/video3.mp4';
import video4 from '../assets/videos/video4.mp4';

 

// 👇 YAHAN APNI 2 IMAGES IMPORT KAREIN 👇
import myProfileImage from '../assets/images/avater.jpeg'; // Trusted Avatar me aapki photo
import centerAiImage from '../assets/images/center.jpeg';   // Clock ke center me yellow text ki jagah wali image


// 📂 Hackathon Images (File ke top par add karein)
import hack1 from '../assets/images/hack1.jpeg'; // Apni images ke naam yahan set karein
import hack2 from '../assets/images/hack2.jpeg';
import hack3 from '../assets/images/hack3.jpeg';

import intern1 from '../assets/images/intern1.jpeg'; // Apni images set karein
import intern2 from '../assets/images/intern2.jpeg';
import intern3 from '../assets/images/intern3.jpeg';


// Apni zaroorat ke hisaab se images import karein
import tourna1 from '../assets/images/tourna1.jpeg'; 
import tourna2 from '../assets/images/tourna2.jpeg';
import tourna3 from '../assets/images/tourna3.jpeg';

// 📂 DYNAMIC SLIDES DATA
const heroSlides = [
  {
    id: 1,
    videoSrc: video1, // Yahan video variable imported hona chahiye
    title1: "NORTHEAST INDIA'S",
    titleHighlight: "YOUTH TECH & START-UP",
    title2: "COMMUNITY HUB",
    subtitle: "CONNECT. COLLABORATE. CREATE IMPACT.",
    desc: "Join thousands of students, developers and innovators building the future of Northeast India.",
    btn1Text: "Explore Startups ➔", btn1Link: "/startups",
    btn2Text: "Hackathons ➔", btn2Link: "/hackathons"
  },
  {
    id: 2,
    videoSrc: video2,
    title1: "KICKSTART YOUR CAREER WITH",
    titleHighlight: "TOP INTERNSHIPS",
    title2: "& OPEN ROLES",
    subtitle: "LEARN. BUILD. GROW.",
    desc: "Get real-world experience. Apply for remote and onsite internships at top tech companies.",
    btn1Text: "Apply Now ➔", btn1Link: "/internships",
    btn2Text: "View All ➔", btn2Link: "/internships"
  },
  {
    id: 3,
    videoSrc: video3,
    title1: "BUILD INNOVATIVE SOLUTIONS AT",
    titleHighlight: "MEGA HACKATHONS",
    title2: "AROUND THE REGION",
    subtitle: "CODE. CREATE. CONQUER.",
    desc: "Participate in intense coding battles. Solve real-world problems and win massive prizes.",
    btn1Text: "Register Now ➔", btn1Link: "/hackathons",
    btn2Text: "Past Events ➔", btn2Link: "/events"
  },
  {
    id: 4,
    videoSrc: video4,
    title1: "COMPETE IN THE ULTIMATE",
    titleHighlight: "ESPORTS TOURNAMENTS",
    title2: "& GAMING ARENA",
    subtitle: "PLAY. COMPETE. WIN.",
    desc: "Join BGMI, Free Fire, and MLBB tournaments. Compete with the best squads.",
    btn1Text: "Join Squad ➔", btn1Link: "/tournaments",
    btn2Text: "Leaderboard ➔", btn2Link: "/tournaments"
  }
];


// 🗂️ GLOBAL SEARCH DATA (Future API/Database Integration ke liye)
// Aap is array ko future mein apne backend cards data se replace kar sakte hain
const globalSearchData = [
  { id: 1, title: "React Native App Development Hackathon", category: "Hackathon", link: "/hackathons/react-native" },
  { id: 2, title: "Nomeo AI 2.0 API Integration", category: "Startup", link: "/startups/nomeo" },
  { id: 3, title: "BGMI Northeast Pro League", category: "Tournament", link: "/tournaments/bgmi" },
  { id: 4, title: "Tipra Social Platform Showcase", category: "Startup", link: "/startups/tipra" },
  { id: 5, title: "Frontend Developer Internship", category: "Internship", link: "/internships/frontend" },
  { id: 6, title: "Free Fire Max Weekly Scrims", category: "Tournament", link: "/tournaments/freefire" },
];


const Home = () => {
  const navigate = useNavigate();
  
  // ⏱️ State for Slide Index and Animation
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // 🔍 Search Bar States
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  // Jab slide change ho, toh text animation wapas re-trigger ho
  useEffect(() => {
    setIsAnimating(true);
  }, [currentIndex]);

  // 🔄 Video slider automatic loop function
  const handleVideoEnd = () => {
    setIsAnimating(false); 
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, 150); 
  };

  // 🔎 Search Filter Logic
  const filteredResults = globalSearchData.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 🖱️ Click outside logic to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✨ PREMIUM FLAT ANIMATION
  const renderAnimatedWords = (text, isActive, baseDelay = 0) => {
    if (!text) return null; 
    return text.split(" ").map((word, index) => (
      <span
        key={index}
        className={`inline-block transition-all duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isActive 
            ? "opacity-100 translate-y-0 blur-none tracking-normal" 
            : "opacity-0 translate-y-6 blur-[3px] tracking-wide"
        }`}
        style={{ transitionDelay: `${baseDelay + index * 80}ms` }}
      >
        {word}&nbsp;
      </span>
    ));
  };

 // ==========================================
  // SECTION 2: AI STARTUPS (Realtime Clock Logic)
  // ==========================================
  const [isSec2Visible, setIsSec2Visible] = useState(false);
  const section2Ref = useRef(null);
  
  // ⏱️ Realtime Clock State (For Analog Hands)
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Scroll Animation Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsSec2Visible(true);
      },
      { threshold: 0.2 } 
    );
    if (section2Ref.current) observer.observe(section2Ref.current);

    // Live Clock Interval
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      if (section2Ref.current) observer.unobserve(section2Ref.current);
      clearInterval(timerId); // Cleanup timer
    };
  }, []);

  // Realtime Time Values for Analog Hands
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Analog Clock Hands Rotation Calculation
  const secDeg = seconds * 6;
  const minDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  // ✍️ Left-to-Right Typing Animation Helper (Fixed 'split' undefined error)
  const renderTypingLetters = (text, delayOffset = 0) => {
    // 🛡️ STRICT ERROR FIX: Agar text string nahi hai, toh kuch return mat karo
    if (typeof text !== 'string' || !text) return null; 
    
    return text.split("").map((char, index) => (
      <span
        key={index}
        className={`inline-block transition-all duration-500 ease-out ${
          isSec2Visible 
            ? "opacity-100 translate-x-0" 
            : "opacity-0 -translate-x-4"
        }`}
        style={{ transitionDelay: `${delayOffset + index * 30}ms` }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  // 🌐 12 AI Startups Clock Data
  const aiLogos = [
    { name: 'OpenAI', img: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg', angle: 0 },
    { name: 'Anthropic', img: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg', angle: 30 },
    { name: 'Gemini', img: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg', angle: 60 },
    { name: 'Mistral AI', img: 'https://mistral.ai/images/logo.svg', angle: 90 },
    { name: 'Hugging Face', img: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg', angle: 120 },
    { name: 'Perplexity', img: 'https://www.perplexity.ai/favicon.ico', angle: 150 },
    { name: 'Cohere', img: 'https://cohere.com/favicon.ico', angle: 180 },
    { name: 'Runway', img: 'https://runwayml.com/favicon.ico', angle: 210 },
    { name: 'Stability AI', img: 'https://stability.ai/favicon.ico', angle: 240 },
    { name: 'Meta AI', img: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png', angle: 270 },
    { name: 'Character.AI', img: 'https://character.ai/favicon.ico', angle: 300 },
    { name: 'Scale AI', img: 'https://scale.com/favicon.ico', angle: 330 },
  ];

// ==========================================
  // SECTION 3: HACKATHONS ANIMATION LOGIC
  // ==========================================
  const [isSec3Visible, setIsSec3Visible] = useState(false);
  const section3Ref = useRef(null);

  useEffect(() => {
    const observer3 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsSec3Visible(true);
      },
      { threshold: 0.2 }
    );
    if (section3Ref.current) observer3.observe(section3Ref.current);
    return () => {
      if (section3Ref.current) observer3.unobserve(section3Ref.current);
    };
  }, []);

  // ✍️ Naya Typing / Left-to-Right Letter Animation for Section 3
  const renderTypingLettersSec3 = (text, delayOffset = 0) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className={`inline-block transition-all duration-[400ms] ease-out ${
          isSec3Visible 
            ? "opacity-100 translate-x-0" 
            : "opacity-0 -translate-x-6"
        }`}
        style={{ 
          transitionDelay: `${delayOffset + index * 40}ms`,
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };


  // ==========================================
  // SECTION 4: INTERNSHIPS ANIMATION LOGIC
  // ==========================================
  const [isSec4Visible, setIsSec4Visible] = useState(false);
  const section4Ref = useRef(null);

  useEffect(() => {
    const observer4 = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsSec4Visible(true);
    }, { threshold: 0.2 });
    
    if (section4Ref.current) observer4.observe(section4Ref.current);
    
    return () => {
      if (section4Ref.current) observer4.unobserve(section4Ref.current);
    };
  }, []);

  // ✍️ Naya Typing / Left-to-Right Letter Animation for Section 4
  const renderTypingLettersSec4 = (text, delayOffset = 0) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className={`inline-block transition-all duration-[400ms] ease-out ${
          isSec4Visible 
            ? "opacity-100 translate-x-0" 
            : "opacity-0 -translate-x-6"
        }`}
        style={{ 
          transitionDelay: `${delayOffset + index * 40}ms`,
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

// ==========================================
  // SECTION 5: TOURNAMENTS ANIMATION LOGIC
  // ==========================================
  const [isSec5Visible, setIsSec5Visible] = useState(false);
  const section5Ref = useRef(null);

  useEffect(() => {
    const observer5 = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsSec5Visible(true);
    }, { threshold: 0.2 });
    
    if (section5Ref.current) observer5.observe(section5Ref.current);
    
    return () => {
      if (section5Ref.current) observer5.unobserve(section5Ref.current);
    };
  }, []);

  // ✍️ Naya Typing / Left-to-Right Letter Animation for Section 5
  const renderTypingLettersSec5 = (text, delayOffset = 0) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className={`inline-block transition-all duration-[400ms] ease-out ${
          isSec5Visible 
            ? "opacity-100 translate-x-0" 
            : "opacity-0 -translate-x-6"
        }`}
        style={{ 
          transitionDelay: `${delayOffset + index * 40}ms`,
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  const currentSlide = heroSlides[currentIndex];

  return (
    <div className="w-full font-sans overflow-x-hidden">
      
      {/* ========================================================= */}
      {/* SECTION 1: DYNAMIC VIDEO PLAYLIST HERO SECTION            */}
      {/* ========================================================= */}
      <section className="relative w-full min-h-[100dvh] flex flex-col justify-center bg-[#070b14] pt-28 pb-12 overflow-hidden">
        
        {/* 🎥 DYNAMIC BACKGROUND VIDEO */}
        <video 
          key={currentSlide?.id}
          autoPlay 
          muted 
          playsInline
          onEnded={handleVideoEnd}
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 transition-opacity duration-1000"
        >
          <source src={currentSlide?.videoSrc} type="video/mp4" />
        </video>

        {/* 🌑 Deep Clean Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070b14]/90 via-[#070b14]/50 to-transparent z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent z-0"></div>

        {/* 📝 MAIN HERO CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 w-full flex-grow flex flex-col justify-center mt-2 md:mt-10">
          <div className="flex flex-col items-start w-full">

            {/* ======================================================= */}
            {/* 🔍 PREMIUM SEARCH BAR (Perfect for Mobile & Laptop)     */}
            {/* ======================================================= */}
            <div ref={searchRef} className="w-full max-w-2xl mb-8 sm:mb-10 relative z-50">
              <div className={`relative flex items-center w-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isSearchFocused ? 'scale-[1.02] sm:scale-105' : 'scale-100'
              }`}>
                {/* Search Icon */}
                <svg className={`absolute left-4 sm:left-5 w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${isSearchFocused ? 'text-[#f5a623]' : 'text-neutral-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>

                {/* Input Field */}
                <input
                  type="text"
                  placeholder="Search Hackathons, Internships, Startups..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className={`w-full bg-white/5 backdrop-blur-xl border ${
                    isSearchFocused ? 'border-[#f5a623] shadow-[0_0_25px_rgba(245,166,35,0.15)] bg-white/10' : 'border-white/10 hover:border-white/30'
                  } text-white pl-10 pr-10 sm:pl-12 sm:pr-12 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl outline-none font-medium text-sm sm:text-base transition-all duration-300 placeholder:text-neutral-500`}
                />

                {/* Clear (Cross) Icon */}
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-4 sm:right-5 text-neutral-400 hover:text-white transition-colors">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                )}
              </div>

              {/* 🖱️ LIVE SEARCH DROPDOWN (Glassmorphism UI) */}
              <div className={`absolute top-full mt-3 w-full bg-[#0a0f1c]/95 backdrop-blur-2xl border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] transform origin-top ${
                isSearchFocused && searchQuery ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
              }`}>
                {filteredResults.length > 0 ? (
                  <ul className="max-h-64 sm:max-h-72 overflow-y-auto p-2 custom-scrollbar">
                    {filteredResults.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => {
                            navigate(item.link);
                            setIsSearchFocused(false); // Link open hone pe dropdown band ho jayega
                          }}
                          className="w-full flex items-center justify-between text-left px-3 sm:px-4 py-3 hover:bg-white/10 rounded-lg sm:rounded-xl transition-all group"
                        >
                          <span className="text-white font-medium text-xs sm:text-sm group-hover:text-[#f5a623] transition-colors line-clamp-1 mr-2">{item.title}</span>
                          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-neutral-400 bg-white/5 px-2.5 py-1 rounded-md whitespace-nowrap group-hover:bg-[#f5a623]/20 group-hover:text-[#f5a623] transition-colors">{item.category}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-6 py-8 text-center text-neutral-500 text-xs sm:text-sm font-medium">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
            {/* ======================================================= */}
            
            {/* Subtitle */}
            <div className="overflow-hidden mb-4 sm:mb-5">
              <p className={`text-[#f5a623] text-[10px] sm:text-xs md:text-sm font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase transition-all duration-[1200ms] ease-out ${
                isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}>
                {currentSlide?.subtitle}
              </p>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.15] sm:leading-[1.1] tracking-tight uppercase select-none relative z-10">
              <div className="block overflow-hidden py-0.5 sm:py-1">
                {renderAnimatedWords(currentSlide?.title1 || "", isAnimating, 0)}
              </div>
              <div className="block overflow-hidden py-0.5 sm:py-1 text-[#f5a623]">
                {renderAnimatedWords(currentSlide?.titleHighlight || "", isAnimating, 200)}
              </div>
              <div className="block overflow-hidden py-0.5 sm:py-1">
                {renderAnimatedWords(currentSlide?.title2 || "", isAnimating, 400)}
              </div>
            </h1>
            
            {/* Description Text */}
            <p className={`text-neutral-300 text-sm sm:text-base lg:text-xl max-w-2xl mt-4 sm:mt-6 font-medium leading-relaxed transition-all duration-[1200ms] ease-out relative z-10 ${
              isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`} style={{ transitionDelay: '600ms' }}>
              {currentSlide?.desc}
            </p>
            
            {/* Buttons */}
            <div className={`flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-4 mt-8 sm:mt-10 transition-all duration-[1200ms] ease-out relative z-10 ${
              isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`} style={{ transitionDelay: '800ms' }}>
              <button 
                onClick={() => navigate(currentSlide?.btn1Link)} 
                className="w-full sm:w-auto bg-[#f5a623] hover:bg-[#e0961c] text-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-black tracking-wide transition-colors active:scale-95 uppercase text-xs sm:text-sm"
              >
                {currentSlide?.btn1Text}
              </button>
              <button 
                onClick={() => navigate(currentSlide?.btn2Link)} 
                className="w-full sm:w-auto border-2 border-white/80 hover:border-white bg-transparent hover:bg-white/10 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold tracking-wide transition-colors active:scale-95 text-white uppercase text-xs sm:text-sm"
              >
                {currentSlide?.btn2Text}
              </button>
            </div>

            {/* Video Progress Indicators (Dots) */}
            <div className="flex gap-1.5 sm:gap-2 mt-12 sm:mt-16 mb-4 relative z-10">
              {heroSlides.map((_, index) => (
                <div 
                  key={index} 
                  className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 ${
                    index === currentIndex ? "w-6 sm:w-8 bg-[#f5a623]" : "w-1.5 sm:w-2 bg-white/30"
                  }`}
                />
              ))}
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================= */}
      {/* SECTION 2: AI STARTUPS (Clock Face UI - Premium Theme)  */}
      {/* ========================================================= */}
      <section 
        ref={section2Ref} 
        className="relative w-full bg-[#eef2f6] pt-24 pb-20 overflow-hidden border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-9 items-center">
            
            {/* ---------------- LEFT SIDE: TEXT CONTENT ---------------- */}
            <div className="flex flex-col items-start text-left z-10">
              
              {/* Premium Outline Badge */}
              <div className={`inline-flex items-center gap-2 mb-6 border border-[#ff6600]/30 bg-[#ff6600]/5 px-4 py-1.5 rounded-full transition-all duration-700 ${isSec2Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <span className="text-[#ff6600] text-sm">☆</span>
                <span className="text-xs font-bold text-[#ff6600] tracking-[0.15em] uppercase">
                  Discover. Connect. Empower.
                </span>
              </div>

              {/* Main Title (Typing Effect matching Image design) */}
              <h2 className="text-3xl sm:text-5xl lg:text-5xl font-black text-gray-900 tracking-tight leading-[1.2] mb-7">
                <div className="block whitespace-nowrap overflow-hidden">
                  {renderTypingLetters("EXPLORE THE WORLD'S", 500)}
                </div>
                <div className="flex flex-wrap items-center gap-x-4 mt-1 overflow-hidden">
                  {renderTypingLetters("TOP", 400)}
                  <span className="text-[#ff6600] drop-shadow-sm font-extrabold tracking-tighter">
                    {renderTypingLetters("AI", 300)}
                  </span>
                  {renderTypingLetters("STARTUPS", 200)}
                </div>
              </h2>

              <p className={`text-gray-500 text-base sm:text-lg lg:text-xl font-medium max-w-lg mb-10 transition-all duration-700 delay-[800ms] ${isSec2Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                Your gateway to the most innovative AI startups shaping the future of technology and humanity.
              </p>

              {/* Trusted Avatars */}
              <div className={`flex items-center gap-4 transition-all duration-700 delay-[1000ms] ${isSec2Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <div className="flex -space-x-3">
                  <img src="https://i.pravatar.cc/100?img=11" alt="user" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-[3px] border-white shadow-sm object-cover" />
                  <img src="https://i.pravatar.cc/100?img=47" alt="user" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-[3px] border-white shadow-sm object-cover" />
                  <img src="https://i.pravatar.cc/100?img=12" alt="user" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-[3px] border-white shadow-sm object-cover" />
                  
                  {/* 👇 AAPKI KHUD KI IMAGE 👇 */}
                  <img src={myProfileImage} alt="My Profile" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-[3px] border-white shadow-md z-10 object-cover" />
                  
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-[3px] border-white bg-gray-900 flex items-center justify-center shadow-sm z-20">
                    <span className="text-[10px] sm:text-xs text-white font-bold tracking-wider">1K+</span>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-bold uppercase tracking-wider">
                  Trusted by innovators worldwide
                </div>
              </div>
            </div>

            {/* ---------------- RIGHT SIDE: REALTIME AI CLOCK ---------------- */}
            <div className="w-full flex flex-col items-center justify-center mt-12 lg:mt-0 relative">
              
              {/* Circular Clock Face */}
              <div 
                className="relative w-full aspect-square max-w-[320px] sm:max-w-[420px] mx-auto z-10 
                           [--radius:-140px] sm:[--radius:-190px]" 
              >
                
                {/* Clock Center AI Image & Hands */}
                <div className="absolute inset-0 m-auto w-24 h-24 flex items-center justify-center z-20">
                  
                  <img 
                    src={centerAiImage} 
                    alt="Center AI Logo" 
                    className={`w-14 h-14 sm:w-20 sm:h-20 object-contain transition-opacity duration-1000 ${isSec2Visible ? 'opacity-100' : 'opacity-0'}`} 
                  />
                  
                  {/* Center Dot Pivot */}
                  <div className="absolute w-3 h-3 bg-gray-900 rounded-full z-30 shadow-md"></div>
                  
                  {/* Analog Hands */}
                  <div 
                    className="absolute w-1.5 h-16 sm:h-20 bg-gray-900 rounded-full origin-bottom bottom-1/2 z-20 transition-transform duration-300 ease-out" 
                    style={{ transform: `rotate(${hourDeg}deg)` }}
                  ></div>
                  <div 
                    className="absolute w-1 h-20 sm:h-28 bg-gray-700 rounded-full origin-bottom bottom-1/2 z-20 transition-transform duration-300 ease-out" 
                    style={{ transform: `rotate(${minDeg}deg)` }}
                  ></div>
                  <div 
                    className="absolute w-0.5 h-24 sm:h-32 bg-[#ff6600] rounded-full origin-bottom bottom-1/2 z-20" 
                    style={{ transform: `rotate(${secDeg}deg)` }} 
                  ></div>
                </div>

                {/* 12 AI Startups Orbiting */}
                {aiLogos.map((logo, idx) => (
                  <div 
                    key={idx}
                    className={`absolute top-1/2 left-1/2 w-12 h-12 sm:w-16 sm:h-16 -ml-6 -mt-6 sm:-ml-8 sm:-mt-8 flex flex-col items-center justify-center bg-white rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.08)] border border-gray-100 transition-all duration-[1200ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group cursor-pointer hover:shadow-xl hover:scale-110 z-30 overflow-hidden p-2`}
                    style={{
                      transform: isSec2Visible 
                        ? `rotate(${logo.angle}deg) translate(0, var(--radius)) rotate(-${logo.angle}deg)` 
                        : `translate(0,0) scale(0)`,
                      transitionDelay: `${idx * 50}ms`
                    }}
                  >
                    <img 
                      src={logo.img} 
                      alt={logo.name} 
                      className="w-full h-full object-contain" 
                      // 🛡️ FIX FOR INVISIBLE LOGOS: Agar image fail hoti hai toh ye mast colored Letter avatar dikhayega
                      onError={(e) => { 
                        e.target.onerror = null; 
                        e.target.src = `https://ui-avatars.com/api/?name=${logo.name}&background=random&color=fff&bold=true`; 
                      }} 
                    />
                    
                    {/* Tooltip/Name */}
                    <span className="absolute top-[115%] text-[10px] sm:text-xs font-bold text-gray-800 bg-white px-2 py-0.5 rounded shadow-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity translate-y-1 group-hover:translate-y-0">
                      {logo.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* ---------------- NEW BUTTON (Navigates to AI Startups Navbar Section) ---------------- */}
              <div className={`mt-12 sm:mt-16 flex items-center justify-center transition-all duration-1000 delay-[600ms] ${isSec2Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <button 
                  onClick={() => navigate('/startups')} // 👈 Yahan route check kar lena
                  className="bg-[#ff6600] hover:bg-[#e65c00] text-white px-8 py-3.5 sm:px-10 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-[0_4px_20px_rgba(255,102,0,0.25)] hover:shadow-[0_6px_25px_rgba(255,102,0,0.35)] hover:-translate-y-1 flex items-center gap-2 group"
                >
                  View All AI Startups
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

{/* ========================================================= */}
      {/* SECTION 3: HACKATHONS (Typing & Left-to-Right Text)       */}
      {/* ========================================================= */}
      <section 
        ref={section3Ref}
        className="w-full py-20 px-6 md:px-10 bg-[#eef2f6] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          
          {/* Header & Typing Title */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                <div>{renderTypingLettersSec3("Live & Upcoming", 0)}</div>
                <div className="text-[#a855f7] mt-1">{renderTypingLettersSec3("Hackathons", 300)}</div>
              </h2>
              <p className={`text-gray-600 mt-4 transition-all duration-1000 delay-700 ${isSec3Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                Compete with the sharpest minds across the state & region.
              </p>
            </div>
            <button 
              onClick={() => navigate('/hackathons')}
              className={`text-[#a855f7] font-bold flex items-center gap-1 hover:underline bg-purple-50 px-5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-1000 delay-1000 ${isSec3Visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            >
              See All Events →
            </button>
          </div>

          {/* Cards Grid with Images (Clean Slide Up) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Northeast Innovators 2026", image: hack1, type: "Offline Grand", prize: "₹50,000", tag: "Featured", statusColor: "bg-purple-100 text-purple-700" },
              { title: "Webify Dev Hackathon", image: hack2, type: "Online Challenge", prize: "₹25,000", tag: "Ongoing", statusColor: "bg-green-100 text-green-700" },
              { title: "AI Impact Challenge", image: hack3, type: "Hybrid Event", prize: "₹75,000", tag: "Upcoming", statusColor: "bg-blue-100 text-blue-700" }
            ].map((hack, index) => (
              <div 
                key={index} 
                className={`bg-[#f8fafc] rounded-2xl border border-gray-200 overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all duration-[800ms] cursor-pointer group ${isSec3Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${800 + index * 200}ms` }}
              >
                
                {/* 🖼️ Image Section */}
                <div className="w-full h-48 overflow-hidden relative bg-gray-200">
                  <img 
                    src={hack.image} 
                    alt={hack.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Status Tag over Image */}
                  <div className="absolute top-4 left-4">
                    <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm ${hack.statusColor}`}>
                      {hack.tag}
                    </span>
                  </div>
                </div>

                {/* Text Content */}
                <div className="p-6">
                  <div className="flex items-center justify-end mb-3">
                    <span className="text-sm text-gray-500 font-medium flex items-center gap-1">
                      📅 Register Now
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#a855f7] transition-colors">{hack.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">Collaborate with cross-functional teams to ideate, prototype and pitch scalable solutions.</p>
                </div>

                {/* Footer Section (Prize & Button) */}
                <div className="p-6 pt-0 mt-auto">
                  <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase">Prize Pool</p>
                      <p className="text-lg font-extrabold text-gray-900">{hack.prize}</p>
                    </div>
                    <button 
                      onClick={() => navigate('/hackathons')}
                      className="text-sm font-bold text-white bg-[#a855f7] hover:bg-[#9333ea] px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    >
                      Join Event
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>
      

    {/* ========================================================= */}
      {/* SECTION 4: LATEST INTERNSHIPS (Left-Aligned Header)       */}
      {/* ========================================================= */}
      <section ref={section4Ref} className="py-20 bg-[#eef2f6] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          
          {/* Header & Typing Title (Section 3 Style) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
                {renderTypingLettersSec4("Latest Internships", 0)}
              </h2>
              <p className={`text-gray-500 mt-4 transition-all duration-1000 delay-500 ${isSec4Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                Kickstart your career with top remote and onsite opportunities.
              </p>
            </div>
            
            {/* View More Button (Right Side) */}
            <button 
              onClick={() => navigate('/internships')}
              className={`text-[#6366f1] font-bold flex items-center gap-1 hover:underline bg-indigo-50 px-5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-1000 delay-1000 ${isSec4Visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            >
              View more Internships →
            </button>
          </div>

          {/* Cards Grid (Clean Slide Up Animation) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Frontend Developer", image: intern1, tag: "Remote", status: "Hiring Now", stipend: "₹10,000 / mo" },
              { title: "UI/UX Designer", image: intern2, tag: "Onsite", status: "Hiring Now", stipend: "₹12,000 / mo" },
              { title: "Full Stack Intern", image: intern3, tag: "Hybrid", status: "Urgent", stipend: "₹15,000 / mo" }
            ].map((intern, index) => (
              <div 
                key={index}
                className={`bg-white rounded-3xl p-6 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-[800ms] cursor-pointer group ${
                  isSec4Visible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${800 + index * 200}ms` }}
              >
                {/* Image Container with Hover Effect */}
                <div className="w-full h-48 rounded-2xl overflow-hidden mb-6 relative bg-gray-200">
                  <img src={intern.image} alt={intern.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    {intern.tag}
                  </div>
                </div>

                <h3 className="text-xl font-extrabold text-gray-900 mb-2 group-hover:text-[#6366f1] transition-colors">{intern.title}</h3>
                <p className="text-sm text-gray-500 mb-6">Gain real-world experience working with top-tier development teams.</p>
                
                <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                  <p className="text-lg font-bold text-[#6366f1]">{intern.stipend}</p>
                  <button onClick={() => navigate('/internships')} className="bg-gray-900 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-gray-700 transition-all transform hover:-translate-y-1 shadow-md">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </section>


     {/* ========================================================= */}
      {/* SECTION 5: ESPORTS TOURNAMENTS (Images + Clean Slide Up)  */}
      {/* ========================================================= */}
      <section ref={section5Ref} className="py-20 bg-[#eef2f6] border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          
          {/* Header & Typing Title */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-purple-600 animate-ping"></span>
                <span className={`text-xs font-bold text-purple-600 tracking-widest uppercase transition-opacity duration-1000 ${isSec5Visible ? "opacity-100" : "opacity-0"}`}>Live Arena</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                {renderTypingLettersSec5("Esports Tournaments", 0)}
              </h2>
              <p className={`text-gray-500 mt-4 transition-all duration-1000 delay-500 ${isSec5Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                Compete with top regional squads, win cash rewards, and dominate leaderboards.
              </p>
            </div>
            
            {/* View More Button (Right Side) */}
            <button 
              onClick={() => navigate('/tournaments')}
              className={`text-[#6366f1] font-bold flex items-center gap-1 hover:underline bg-indigo-50 px-5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-1000 delay-1000 ${isSec5Visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            >
              Explore All Tournaments →
            </button>
          </div>

          {/* Tournament Cards Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Ultimate Showdown", image: tourna1, game: "BGMI", type: "🎮 Squad 4v4", prize: "₹50,000", color: "bg-orange-100 text-orange-700", desc: "Northeast India's biggest custom room tournament. Register your squad and claim your spot." },
              { title: "Clash Championship", image: tourna2, game: "Free Fire", type: "🎮 Clash Squad", prize: "₹30,000", color: "bg-red-100 text-red-700", desc: "Fast-paced custom match tournament. Fast reflexes, absolute team synergy, big prize payout." },
              { title: "Regional Masters", image: tourna3, game: "HoK", type: "🎮 5v5 Mode", prize: "₹40,000", color: "bg-blue-100 text-blue-700", desc: "Showcase your strategic depth and mechanical outplays in the Honor of Kings state battle." }
            ].map((tourna, index) => (
              <div 
                key={index}
                className={`bg-[#f8fafc] rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-[800ms] cursor-pointer group flex flex-col justify-between ${
                  isSec5Visible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${800 + index * 200}ms` }}
              >
                
                {/* 🖼️ Image Container with Hover Effect */}
                <div className="w-full h-48 rounded-2xl overflow-hidden mb-6 relative bg-gray-200">
                  <img src={tourna.image} alt={tourna.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  
                  {/* Game Tag over Image */}
                  <div className={`absolute top-4 left-4 ${tourna.color} text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm`}>
                    {tourna.game}
                  </div>
                </div>

                {/* Text Content */}
                <div>
                  <div className="flex justify-end mb-3">
                    <span className="text-xs text-gray-500 font-semibold flex items-center gap-1">
                      {tourna.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">{tourna.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">
                    {tourna.desc}
                  </p>
                </div>
                
                {/* Footer Section */}
                <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-auto">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Prize Pool</p>
                    <p className="text-lg font-extrabold text-gray-900">{tourna.prize}</p>
                  </div>
                  <button 
                    onClick={() => navigate('/tournaments')} 
                    className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl font-bold text-sm transition-all shadow-md transform hover:-translate-y-1"
                  >
                    Join
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 6: FOOTER (Dark Theme with Connect & Socials)     */}
      {/* ========================================================= */}
      <footer className="w-full bg-[#0b0f19] pt-16 pb-8 px-6 border-t border-gray-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            
            {/* Column 1: Newsletter & Brand */}
            <div className="space-y-4">
              <h2 className="text-3xl font-extrabold tracking-tight">
                Let's <span className="text-[#a855f7]">Sister</span>
              </h2>
              <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                Subscribe to our newsletter for the latest tech updates, event announcements, and learning resources.
              </p>
              <div className="flex gap-2 pt-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-[#121826] border border-gray-700 text-white px-4 py-3 rounded-xl outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all text-sm"
                />
                <button className="bg-[#a855f7] hover:bg-[#9333ea] px-6 py-3 rounded-xl font-bold transition-all text-sm whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-5 text-white">Quick Links</h3>
              <ul className="space-y-3 text-gray-400 text-sm font-medium">
                <li><button onClick={() => navigate('/')} className="hover:text-[#a855f7] transition-colors">Home</button></li>
                <li><button onClick={() => navigate('/about')} className="hover:text-[#a855f7] transition-colors">About Us</button></li>
                <li><button onClick={() => navigate('/communities')} className="hover:text-[#a855f7] transition-colors">Communities</button></li>
                <li><button onClick={() => navigate('/hackathons')} className="hover:text-[#a855f7] transition-colors">Hackathons</button></li>
                <li><button onClick={() => navigate('/resources')} className="hover:text-[#a855f7] transition-colors">Free Resources</button></li>
              </ul>
            </div>

            {/* Column 3: Contact Us & Socials */}
            <div>
              <h3 className="text-lg font-bold mb-5 text-white">Contact Us</h3>
              <p className="text-gray-400 text-sm mb-5">
                Connect with us on our social platforms to stay updated.
              </p>
              <div className="flex gap-4">
                
                {/* Instagram Icon */}
                <a href="#" className="w-10 h-10 rounded-full bg-[#121826] border border-gray-700 flex items-center justify-center hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500 hover:border-transparent transition-all group">
                  <svg className="w-5 h-5 fill-gray-400 group-hover:fill-white transition-colors" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                
                {/* Facebook Icon */}
                <a href="#" className="w-10 h-10 rounded-full bg-[#121826] border border-gray-700 flex items-center justify-center hover:bg-[#1877f2] hover:border-[#1877f2] transition-all group">
                  <svg className="w-5 h-5 fill-gray-400 group-hover:fill-white transition-colors" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Twitter (X) Icon */}
                <a href="#" className="w-10 h-10 rounded-full bg-[#121826] border border-gray-700 flex items-center justify-center hover:bg-white hover:border-white transition-all group">
                  <svg className="w-4 h-4 fill-gray-400 group-hover:fill-black transition-colors" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                {/* LinkedIn Icon */}
                <a href="#" className="w-10 h-10 rounded-full bg-[#121826] border border-gray-700 flex items-center justify-center hover:bg-[#0a66c2] hover:border-[#0a66c2] transition-all group">
                  <svg className="w-4 h-4 fill-gray-400 group-hover:fill-white transition-colors" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>

              </div>
            </div>

          </div>

          {/* Bottom Copyright Section */}
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 font-medium">
            <p>© 2026 Let's Sister. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;