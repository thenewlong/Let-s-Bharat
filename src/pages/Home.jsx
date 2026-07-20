import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';



// 🎥 Apni saari videos yahan import karein
import video1 from '../assets/videos/s00.mp4';
import video2 from '../assets/videos/second.mp4';
import video3 from '../assets/videos/h2.mp4';
import video4 from '../assets/videos/hero2.mp4';

// laptop video ke liye bhi import karna hoga
import laptopVideo from '../assets/videos/screen2.mp4';

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

// Inko file ke sabse upar import karna (apne actual folder path ke hisaab se adjust kar lena)
import letsBharatLogo from '../assets/images/logos3.jpeg'; 
import founderProfile from '../assets/images/profile.jpeg';


// 📂 DYNAMIC SLIDES DATA (Replace video variables with your actual imports)


const heroSlides = [
  {
    id: 1,
    videoSrc: video1,
    title1: "NORTHEAST INDIA'S",
    titleHighlight: "YOUTH TECH & START-UP",
    title2: "COMMUNITY HUB",
    subtitle: "CONNECT. COLLABORATE. CREATE IMPACT.",
    desc: "Join thousands of students, developers and innovators building the future of Northeast India.",
    btn1Text: "Startups ➔", btn1Link: "/startups",
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
    title1: "BUILD INNOVATIVE SOLUTIONS",
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

// 🗂️ GLOBAL SEARCH DATA
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

  const currentSlide = heroSlides[currentIndex];

  // Jab slide change ho, toh text animation wapas re-trigger ho
  useEffect(() => {
    setIsAnimating(false);
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 50); // Short delay to re-trigger CSS animations
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // 🔄 Video slider automatic loop function
  const handleVideoEnd = () => {
    setIsAnimating(false); 
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, 190); 
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

  // ✨ PREMIUM 3D LETTER-BY-LETTER ANIMATION
  const renderAnimatedLetters = (text, isActive, baseDelay = 0) => {
    if (!text) return null; 
    return text.split("").map((char, index) => (
      <span
        key={index}
        className={`letter-3d ${isActive ? 'animate-3d-pop' : 'opacity-0'}`}
        style={{ 
          animationDelay: isActive ? `${baseDelay + index * 15}ms` : '0ms',
          marginRight: char === " " ? "0.25em" : "0" // Preserve spaces
        }}
      >
        {char}
      </span>
    ));
  };



  // ==========================================
  // SECTION 2: AI STARTUPS & JOBS (Premium Logic)
  // ==========================================
  const [isSec2Visible, setIsSec2Visible] = useState(false);
  const section2Ref = useRef(null);
  
  // ⏱️ Realtime Clock State
  const [time, setTime] = useState(new Date());

  // 👥 Rotating Avatars State
  const [avatarIndex, setAvatarIndex] = useState(0);
  const avatarList = [
    "https://i.pravatar.cc/150?img=11",
    "https://i.pravatar.cc/150?img=47",
    myProfileImage, // Aapki image
    "https://i.pravatar.cc/150?img=33",
    "https://i.pravatar.cc/150?img=12",
    "https://i.pravatar.cc/150?img=59"
  ];

  // 💯 Animated Counters State
  const [counts, setCounts] = useState({ startups: 0, companies: 0, innovators: 0, countries: 0, jobs: 0 });

  useEffect(() => {
    // Scroll Animation Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSec2Visible(true);
          startCounters(); 
        }
      },
      { threshold: 0.1 } 
    );
    if (section2Ref.current) observer.observe(section2Ref.current);

    // Live Clock Interval
    const timerId = setInterval(() => setTime(new Date()), 1000);

    // Avatar Rotation Interval (Changes every 2.5 seconds)
    const avatarTimerId = setInterval(() => {
      setAvatarIndex((prev) => (prev + 1) % avatarList.length);
    }, 2500);

    return () => {
      if (section2Ref.current) observer.unobserve(section2Ref.current);
      clearInterval(timerId); 
      clearInterval(avatarTimerId);
    };
  }, []);

  // 💯 Fast Counter Logic
  const startCounters = () => {
    const duration = 2000; 
    const fps = 60;
    const steps = duration / (1000 / fps);
    let currentStep = 0;

    const counterInterval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setCounts({
        startups: Math.floor(progress * 1250),
        companies: Math.floor(progress * 320),
        innovators: Math.floor(progress * 25), 
        countries: Math.floor(progress * 120),
        jobs: Math.floor(progress * 500)
      });

      if (currentStep >= steps) clearInterval(counterInterval);
    }, 1000 / fps);
  };

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const secDeg = seconds * 6;
  const minDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

    
// ✍️ 100% CLEAR 3D Letter Animation (Tumhara function)
  const render3DLetters = (text, delayOffset = 0, extraClass = "") => {
    if (typeof text !== 'string' || !text) return null; 
    
    return text.split("").map((char, index) => (
      <span
        key={index}
        className={`inline-block transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
          isSec2Visible 
            ? "opacity-100 [transform:translateY(0)_scale(1)_rotateX(0deg)] blur-0" 
            : "opacity-0 [transform:translateY(20px)_scale(0.8)_rotateX(-60deg)] blur-[4px]"
        } ${extraClass}`}
        style={{ 
          transitionDelay: `${delayOffset + index * 30}ms`, // Premium letter delay
          transformStyle: 'preserve-3d' 
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  // 🌟 Marquee ke liye 3D Word Animation
  const render3DWords = (wordsArray, baseDelay = 0) => {
    return wordsArray.map((word, index) => (
      <span 
        key={index} 
        className={`flex items-center gap-2 transition-all duration-1000 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
          isSec2Visible ? "opacity-100 translate-y-0 rotateX-0 blur-0" : "opacity-0 translate-y-6 -rotate-x-90 blur-[2px]"
        }`}
        style={{ transitionDelay: `${baseDelay + index * 100}ms`, transformStyle: 'preserve-3d' }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping"></span> {word}
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
  // SECTION 3: HACKATHONS ANIMATION LOGIC (Premium)
  // ==========================================
  const [isSec3Visible, setIsSec3Visible] = useState(false);
  const section3Ref = useRef(null);

  useEffect(() => {
    const observer3 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsSec3Visible(true);
      },
      { threshold: 0.1 }
    );
    if (section3Ref.current) observer3.observe(section3Ref.current);
    return () => {
      if (section3Ref.current) observer3.unobserve(section3Ref.current);
    };
  }, []);

  const renderTypingLettersSec3 = (text, delayOffset = 0) => {
    return text.toUpperCase().split("").map((char, index) => (
      <span
        key={index}
        className={`inline-block transition-all duration-[600ms] ease-out ${
          isSec3Visible 
            ? "opacity-100 translate-y-0 filter blur-0" 
            : "opacity-0 translate-y-4 filter blur-[2px]"
        }`}
        style={{ transitionDelay: `${delayOffset + index * 20}ms` }}
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
    }, { threshold: 0.1 });
    
    if (section4Ref.current) observer4.observe(section4Ref.current);
    
    return () => {
      if (section4Ref.current) observer4.unobserve(section4Ref.current);
    };
  }, []);

  const renderTypingLettersSec4 = (text, delayOffset = 0) => {
    return text.toUpperCase().split("").map((char, index) => (
      <span
        key={index}
        className={`inline-block transition-all duration-[600ms] ease-out ${
          isSec4Visible 
            ? "opacity-100 translate-y-0 filter blur-0" 
            : "opacity-0 translate-y-4 filter blur-[2px]"
        }`}
        style={{ transitionDelay: `${delayOffset + index * 20}ms` }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };
  // ==========================================
  // SECTION 5: TOURNAMENTS ANIMATION LOGIC (Premium)
  // ==========================================
  const [isSec5Visible, setIsSec5Visible] = useState(false);
  const section5Ref = useRef(null);

  useEffect(() => {
    const observer5 = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsSec5Visible(true);
    }, { threshold: 0.1 });
    
    if (section5Ref.current) observer5.observe(section5Ref.current);
    
    return () => {
      if (section5Ref.current) observer5.unobserve(section5Ref.current);
    };
  }, []);

  // 🚨 CRASH-PROOF FIX: Agar text kisi wajah se missing hoga, toh page blank nahi hoga
  const renderTypingLettersSec5 = (text = "", delayOffset = 0) => {
    if (!text) return null; // Failsafe

    return String(text).toUpperCase().split("").map((char, index) => (
      <span
        key={index}
        className={`inline-block transition-all duration-[600ms] ease-out ${
          isSec5Visible 
            ? "opacity-100 translate-y-0 filter blur-0" 
            : "opacity-0 translate-y-4 filter blur-[2px]"
        }`}
        style={{ transitionDelay: `${delayOffset + index * 20}ms` }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };



  return (
    <div className="w-full font-sans overflow-x-hidden">
      
      



  
      {/* 🌟 3D ANIMATION CSS */}
      <style>{`
        .perspective-container {
          perspective: 1000px;
        }
        .letter-3d {
          display: inline-block;
          transform-style: preserve-3d;
          font-family: sans-serif;
        }
        .animate-3d-pop {
          animation: popIn3D 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes popIn3D {
          0% {
            opacity: 0;
            transform: scale(0.5) rotateX(-60deg) translateY(20px);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotateX(0deg) translateY(0);
            filter: blur(0px);
          }
        }
      `}</style>

      {/* ========================================================= */}
      {/* SECTION 1: COMPACT CINEMATIC HERO SECTION                 */}
      {/* ========================================================= */}
      {/* YAHAN FIX KIYA HAI: h-[100vh] ki jagah mobile pe h-[65vh] aur min-h-[460px] lagaya hai taaki Section 2 dikhe */}
      <section className="relative w-full h-[65vh] min-h-[460px] md:h-[100vh] max-h-[750px] flex flex-col justify-center bg-[#070b14] pt-20 md:pt-24 pb-6 overflow-hidden perspective-container">
        
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#070b14]/90 via-[#070b14]/60 to-transparent z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent z-0"></div>

        {/* 📝 MAIN HERO CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-10 w-full flex-grow flex flex-col justify-center mt-2">
          <div className="flex flex-col items-start w-full">

           
            
            {/* Subtitle */}
            <div className="overflow-hidden mb-1 sm:mb-3">
              <p className={`text-[#f5a623] font-sans text-[8px] sm:text-xs font-black tracking-[0.15em] sm:tracking-[0.25em] uppercase transition-all duration-700 ease-out ${
                isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}>
                {currentSlide?.subtitle}
              </p>
            </div>

            {/* Main Title (3D Letter Animation & Compact Font Size) */}
            <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white font-sans leading-[1.1] sm:leading-[1.1] tracking-tight uppercase select-none relative z-10 flex flex-col gap-0.5 sm:gap-1">
              <div className="block overflow-hidden">
                {renderAnimatedLetters(currentSlide?.title1 || "", isAnimating, 0)}
              </div>
              <div className="block overflow-hidden text-[#f5a623]">
                {renderAnimatedLetters(currentSlide?.titleHighlight || "", isAnimating, 300)}
              </div>
              <div className="block overflow-hidden">
                {renderAnimatedLetters(currentSlide?.title2 || "", isAnimating, 600)}
              </div>
            </h1>
            
            {/* Description Text */}
            <p className={`text-neutral-300 font-sans text-[11px] sm:text-sm md:text-base max-w-lg mt-3 sm:mt-4 font-medium leading-snug sm:leading-relaxed transition-all duration-700 ease-out relative z-10 ${
              isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`} style={{ transitionDelay: '900ms' }}>
              {currentSlide?.desc}
            </p>
            
            {/* Buttons (Side-by-side flex for mobile to save vertical space) */}
            <div className={`flex flex-row w-full sm:w-auto gap-2.5 sm:gap-4 mt-5 sm:mt-8 transition-all duration-700 ease-out relative z-10 ${
              isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`} style={{ transitionDelay: '1100ms' }}>
              <button 
                onClick={() => navigate(currentSlide?.btn1Link)} 
                className="flex-1 sm:flex-none bg-[#f5a623] hover:bg-[#e0961c] text-black px-3 sm:px-8 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl font-sans font-black tracking-wide transition-colors active:scale-95 uppercase text-[9px] sm:text-sm whitespace-nowrap text-center"
              >
                {currentSlide?.btn1Text}
              </button>
              <button 
                onClick={() => navigate(currentSlide?.btn2Link)} 
                className="flex-1 sm:flex-none border sm:border-2 border-white/80 hover:border-white bg-transparent hover:bg-white/10 px-3 sm:px-8 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl font-sans font-bold tracking-wide transition-colors active:scale-95 text-white uppercase text-[9px] sm:text-sm whitespace-nowrap text-center"
              >
                {currentSlide?.btn2Text}
              </button>
            </div>

            {/* Video Progress Indicators - Margin top thoda kam kiya */}
            <div className="flex gap-1.5 sm:gap-2 mt-4 sm:mt-10 relative z-10">
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


   {/* section2*/}
      {/* ========================================================= */}
      {/* 🚀 CSS ANIMATIONS                                         */}
      {/* ========================================================= */}
      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes floatOut {
          0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
          20% { opacity: 1; scale: 1; }
          80% { opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(1.2); opacity: 0; }
        }
      `}</style>

      {/* ========================================================= */}
      {/* SECTION 2: AI STARTUPS & JOBS                             */}
      {/* ========================================================= */}
      <section 
        ref={section2Ref} 
        className="relative w-full bg-[#eef2f6] pt-6 pb-20 overflow-hidden border-t border-gray-100"
      >
        
        {/* 📜 NEW: DUAL PREMIUM HIGHLIGHTED MARQUEE (Right & Left with 3D Words) */}
        <div className="w-full mb-16 flex flex-col shadow-sm perspective-[1000px]">
          
          {/* Top Marquee: Moving RIGHT (AI Startups) */}
          <div className="w-full bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 border-t border-gray-200 py-3 overflow-hidden flex whitespace-nowrap">
            <div className="animate-[scrollRight_30s_linear_infinite] flex items-center gap-12 text-[11px] font-black text-[#ff6600] uppercase tracking-[0.25em] w-max">
              {render3DWords(['OpenAI', '|', 'Anthropic', '|', 'Google Gemini', '|', 'Midjourney', '|', 'Perplexity', '|', 'Hugging Face', '|', 'Mistral', '|'], 0)}
              {render3DWords(['OpenAI', '|', 'Anthropic', '|', 'Google Gemini', '|', 'Midjourney', '|', 'Perplexity', '|', 'Hugging Face', '|', 'Mistral', '|'], 0)}
            </div>
          </div>

          {/* Bottom Marquee: Moving LEFT (Companies & Jobs) */}
          <div className="w-full bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 border-y border-gray-200 py-3 overflow-hidden flex whitespace-nowrap">
            <div className="animate-[scrollLeft_30s_linear_infinite] flex items-center gap-12 text-[11px] font-black text-blue-600 uppercase tracking-[0.25em] w-max">
              {render3DWords(['Microsoft', '|', 'Amazon', '|', 'TCS Jobs', '|', 'Product Design', '|', 'AI Engineering', '|', 'Meta', '|', 'Data Science', '|'], 300)}
              {render3DWords(['Microsoft', '|', 'Amazon', '|', 'TCS Jobs', '|', 'Product Design', '|', 'AI Engineering', '|', 'Meta', '|', 'Data Science', '|'], 300)}
            </div>
          </div>

        </div>

        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* ---------------- LEFT SIDE: TEXT CONTENT (Col Span 4) ---------------- */}
            <div className="lg:col-span-4 flex flex-col items-start text-left z-10">
              
              <div className={`inline-flex items-center gap-2 mb-6 border border-[#ff6600]/30 bg-[#ff6600]/5 px-4 py-1.5 rounded-full transition-all duration-700 ${isSec2Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <span className="text-[#ff6600] text-sm animate-pulse">✦</span>
                <span className="text-xs font-bold text-[#ff6600] tracking-[0.2em] uppercase">
                  Discover. Connect. Empower.
                </span>
              </div>

              {/* Main Title (3D Letter Animation Applied Here) */}
              <h2 className="text-3xl sm:text-5xl lg:text-5xl font-black text-gray-900 tracking-tight leading-[1.15] mb-7" style={{ perspective: '1000px' }}>
                <div className="block whitespace-nowrap overflow-hidden pb-1">
                  {render3DLetters("EXPLORE THE WORLD'S", 200)}
                </div>
                <div className="flex flex-wrap items-center gap-x-3 mt-2 overflow-hidden pb-1">
                  {render3DLetters("TOP", 600)}
                  <span className="text-[#ff6600] drop-shadow-sm font-extrabold tracking-tighter">
                    {render3DLetters("AI", 800)}
                  </span>
                  {render3DLetters("STARTUPS", 1000)}
                </div>
                <div className="flex items-center gap-x-3 overflow-hidden mt-2 text-gray-800 pb-1">
                  {render3DLetters("&", 1400)}
                  <span className="text-blue-600 drop-shadow-sm font-extrabold tracking-tighter">
                    {render3DLetters("JOBS", 1600)}
                  </span>
                </div>
              </h2>

              <p className={`text-gray-500 text-sm sm:text-base font-medium max-w-sm mb-8 transition-all duration-700 delay-[1800ms] ${isSec2Visible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`}>
                Your gateway to the most innovative AI startups and top-tier career opportunities globally.
              </p>

              {/* 👥 ROTATING AVATARS */}
              <div className={`flex items-center gap-4 transition-all duration-700 delay-[2000ms] ${isSec2Visible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`}>
                <div className="flex -space-x-3">
                  <img src={avatarList[avatarIndex]} alt="user" className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover transition-all duration-500" />
                  <img src={avatarList[(avatarIndex + 1) % avatarList.length]} alt="user" className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover transition-all duration-500" />
                  <img src={avatarList[(avatarIndex + 2) % avatarList.length]} alt="user" className="w-10 h-10 rounded-full border-2 border-white shadow-md z-10 object-cover transition-all duration-500" />
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-900 flex items-center justify-center shadow-sm z-20">
                    <span className="text-[10px] text-white font-bold tracking-wider">1K+</span>
                  </div>
                </div>
                <div className="text-xs text-gray-600 font-bold uppercase tracking-wider">
                  Trusted by innovators
                </div>
              </div>
            </div>

            {/* ---------------- MIDDLE: REALTIME AI CLOCK ---------------- */}
            <div className="lg:col-span-4 w-full flex flex-col items-center justify-center relative scale-90 sm:scale-100 z-10">
              <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[300px] mx-auto [--radius:-100px] sm:[--radius:-130px]">
                
                <div className="absolute inset-0 m-auto w-20 h-20 flex items-center justify-center z-20">
                  <img 
                    src={centerAiImage} 
                    alt="Center AI Logo" 
                    className={`w-12 h-12 rounded-full object-cover bg-white shadow-md border border-gray-100 p-1 transition-opacity duration-1000 delay-[500ms] ${isSec2Visible ? 'opacity-100' : 'opacity-0'}`} 
                  />
                  <div className="absolute w-2 h-2 bg-gray-900 rounded-full z-30 shadow-md"></div>
                  
                  {/* ⏱️ REALTIME Analog Hands (Continuous Automatic Run) */}
                  <div className="absolute w-1 h-12 bg-gray-900 rounded-full origin-bottom bottom-1/2 z-20 transition-transform duration-300 ease-out" style={{ transform: `rotate(${hourDeg}deg)` }}></div>
                  <div className="absolute w-0.5 h-16 bg-gray-700 rounded-full origin-bottom bottom-1/2 z-20 transition-transform duration-300 ease-out" style={{ transform: `rotate(${minDeg}deg)` }}></div>
                  <div className="absolute w-px h-20 bg-[#ff6600] rounded-full origin-bottom bottom-1/2 z-20" style={{ transform: `rotate(${secDeg}deg)` }}></div>
                </div>

                {/* 🌀 Anti-Clockwise Scroll Effect Wrapper for Logos */}
                <div 
                  className={`absolute inset-0 w-full h-full transition-transform duration-[2000ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isSec2Visible ? '-rotate-[360deg]' : 'rotate-[90deg] scale-50'
                  }`}
                >
                  {/* 12 AI Startups Orbiting */}
                  {aiLogos.map((logo, idx) => (
                    <div 
                      key={idx}
                      className={`absolute top-1/2 left-1/2 w-10 h-10 -ml-5 -mt-5 flex items-center justify-center bg-white rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.08)] border border-gray-100 transition-all duration-[1200ms] group z-30 p-1.5`}
                      style={{
                        transform: isSec2Visible ? `rotate(${logo.angle}deg) translate(0, var(--radius)) rotate(-${logo.angle}deg)` : `translate(0,0) scale(0)`,
                        transitionDelay: `${idx * 80}ms`
                      }}
                    >
                      <img src={logo.img} alt={logo.name} className="w-full h-full object-contain" onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${logo.name}&background=random&color=fff&bold=true`; }} />
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* ---------------- RIGHT SIDE: 💻 STATIC PREMIUM 3D LAPTOP & 100% FIXED VIDEO ---------------- */}
            <div className="lg:col-span-4 w-full flex items-center justify-center relative mt-10 lg:mt-0 z-20">
              
              {/* Floating Logos */}
              <div className={`absolute top-1/2 left-1/2 w-full h-full pointer-events-none z-30 ${isSec2Visible ? 'block' : 'hidden'}`}>
                <div className="absolute left-1/2 top-1/2 w-10 h-10 bg-white rounded-xl shadow-lg border border-gray-100 flex items-center justify-center p-2 animate-[floatOut_4s_ease-in-out_infinite]" style={{ '--tx': '-120px', '--ty': '-100px', animationDelay: '0s' }}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" className="w-full h-full object-contain" alt="Microsoft" />
                </div>
                <div className="absolute left-1/2 top-1/2 w-8 h-8 bg-white rounded-xl shadow-lg border border-gray-100 flex items-center justify-center p-1.5 animate-[floatOut_3.5s_ease-in-out_infinite]" style={{ '--tx': '90px', '--ty': '-130px', animationDelay: '1.5s' }}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg" className="w-full h-full object-contain" alt="Gemini" />
                </div>
                <div className="absolute left-1/2 top-1/2 w-12 h-12 bg-white rounded-xl shadow-lg border border-gray-100 flex items-center justify-center p-2 animate-[floatOut_4.5s_ease-in-out_infinite]" style={{ '--tx': '-80px', '--ty': '130px', animationDelay: '2.5s' }}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" className="w-full h-full object-contain" alt="ChatGPT" />
                </div>
              </div>

              {/* 💻 Static 3D Premium Laptop */}
              <div 
                className={`relative w-full max-w-[380px] z-20 transition-all duration-1000 delay-[1000ms] ${isSec2Visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
                style={{ perspective: '1200px' }}
              >
                {/* Laptop Screen / Lid */}
                <div 
                  className="relative w-full aspect-[16/10] bg-black rounded-t-2xl border-[6px] border-gray-800 shadow-[0_25px_55px_rgba(0,0,0,0.4)] overflow-hidden"
                  style={{ transform: 'rotateY(-8deg) rotateX(8deg)', transformStyle: 'preserve-3d' }}
                >
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  >
                    <source src={laptopVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                {/* Laptop Base */}
                <div 
                  className="relative w-[105%] -ml-[2.5%] h-6 bg-gradient-to-b from-gray-300 to-gray-500 rounded-b-xl border-t border-gray-400 shadow-2xl flex justify-center items-start"
                  style={{ transform: 'rotateX(60deg) rotateY(-2.6deg)', transformOrigin: 'top' }}
                >
                  <div className="w-1/4 h-1.5 bg-gray-600 rounded-b-md mt-0.5"></div>
                </div>
              </div>

            </div>

          </div>

          {/* ---------------- 💯 BOTTOM STATS ROW (Animated Counters) ---------------- */}
          <div className={`mt-20 pt-10 border-t border-gray-100 grid grid-cols-2 md:grid-cols-5 gap-6 text-center transition-all duration-1000 delay-[800ms] ${isSec2Visible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-10 blur-sm'}`}>
            <div>
              <h4 className="text-2xl font-black text-gray-900">{counts.startups.toLocaleString()}+</h4>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">AI Startups</p>
            </div>
            <div>
              <h4 className="text-2xl font-black text-gray-900">{counts.companies.toLocaleString()}+</h4>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Top Companies</p>
            </div>
            <div>
              <h4 className="text-2xl font-black text-[#ff6600]">{counts.innovators}K+</h4>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Innovators</p>
            </div>
            <div>
              <h4 className="text-2xl font-black text-gray-900">{counts.countries.toLocaleString()}+</h4>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Countries</p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-2xl font-black text-blue-600">{counts.jobs.toLocaleString()}+</h4>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">New Jobs</p>
            </div>
          </div>

        </div>
      </section>

  



{/* ========================================================= */}
      {/* SECTION 3: HACKATHONS (Premium Black & Yellow Theme)      */}
      {/* ========================================================= */}
      <section 
        id="hackathons"
        ref={section3Ref}
        className="w-full py-20 px-4 md:px-8 bg-[#eef2f6] overflow-hidden border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto">
          
          {/* Header Area */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-6">
            <div>
              <span className={`text-[10px] font-bold tracking-[0.2em] text-[#ff6600] uppercase block mb-3 transition-all duration-700 ${isSec3Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                EXPLORE. CODE. IMPACT.
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 uppercase font-sans">
                <div className="leading-tight">{renderTypingLettersSec3("Live & Upcoming ", 0)}</div>
                <div className="text-[#ff6600] leading-tight mt-1">{renderTypingLettersSec3("Hackathons", 300)}</div>
              </h2>
            </div>
            
            <button 
              onClick={() => navigate('/hackathons')}
               className={`text-[black] font-bold flex items-center gap-1 hover:underline bg-indigo-50 px-5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-1000 delay-1000 ${isSec4Visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            >
              View All Events →
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            {[
              { title: "AI Innovation Hackathon", image: hack1, tag: "REMOTE", date: "24 MAY 2025", prize: "₹10,000" },
              { title: "Web3 Builders Hackathon", image: hack2, tag: "ONSITE", date: "07 JUN 2025", prize: "₹15,000" },
              { title: "Sustainability Hackathon", image: hack3, tag: "HYBRID", date: "21 JUN 2025", prize: "₹20,000" },
              { title: "Cyber Security Sprint", image: hack1, tag: "REMOTE", date: "12 JUL 2025", prize: "₹12,000" },
              { title: "Northeast Dev Clash", image: hack2, tag: "ONSITE", date: "02 AUG 2025", prize: "₹25,000" }
            ].map((hack, index) => (
              <div 
                key={index} 
                onClick={() => navigate('/hackathons')}
                className={`bg-white rounded-3xl border border-gray-100 overflow-hidden flex flex-col aspect-square shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:border-[#ff6600]/20 transition-all duration-700 cursor-pointer group ${
                  isSec3Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${400 + index * 150}ms` }}
              >
                
                {/* Image Section */}
                <div className="w-full h-[55%] overflow-hidden relative bg-gray-100">
                  <img 
                    src={hack.image} 
                    alt={hack.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Premium Dark Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[9px] font-black tracking-widest text-white bg-gray-900/90 backdrop-blur-sm px-2.5 py-1 rounded-md">
                      {hack.tag}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-xs font-bold text-gray-900 group-hover:text-[#ff6600] transition-colors leading-tight mb-1.5 uppercase tracking-wide">
                      {hack.title}
                    </h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      {hack.date}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-50 flex items-center justify-between mt-2">
                    <span className="text-xs font-black text-gray-900">{hack.prize}</span>
                    <span className="text-[10px] font-bold text-[#ff6600] group-hover:translate-x-1 transition-transform">
                      JOIN →
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

{/* ========================================================= */}
      {/* SECTION 4: LATEST INTERNSHIPS (Premium Black & Yellow)    */}
      {/* ========================================================= */}
      <section 
        id="internships" 
        ref={section4Ref} 
        className="w-full py-20 px-4 md:px-8 bg-[#eeeeee] overflow-hidden border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto">
          
          {/* Header Area */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-6">
            <div>
              <span className={`text-[10px] font-bold tracking-[0.2em] text-[#ff6600] uppercase block mb-3 transition-all duration-700 ${isSec4Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                LEARN. BUILD. GROW.
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 uppercase font-sans">
                <div className="leading-tight">{renderTypingLettersSec4("Latest ", 0)}</div>
                <div className="text-[#ff6600] leading-tight mt-1">{renderTypingLettersSec4("Internships", 300)}</div>
              </h2>
            </div>
            
            <button 
              onClick={() => navigate('/internships')}
              className={`text-[black] font-bold flex items-center gap-1 hover:underline bg-indigo-50 px-5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-1000 delay-1000 ${isSec4Visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            >
              View All Internships →
            </button>
          </div>

          {/* Cards Grid: Mobile 2, Desktop 4-5 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            {[
              { title: "Frontend Developer", image: intern1, tag: "REMOTE", stipend: "₹10,000 / MO" },
              { title: "UI/UX Designer", image: intern2, tag: "ONSITE", stipend: "₹12,000 / MO" },
              { title: "Full Stack Intern", image: intern3, tag: "HYBRID", stipend: "₹15,000 / MO" },
              { title: "Backend Engineer", image: intern1, tag: "REMOTE", stipend: "₹18,000 / MO" },
              { title: "Product Manager", image: intern2, tag: "ONSITE", stipend: "₹20,000 / MO" }
            ].map((intern, index) => (
              <div 
                key={index}
                onClick={() => navigate('/internships')}
                className={`bg-white rounded-3xl border border-gray-100 overflow-hidden flex flex-col aspect-square shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:border-[#ff6600]/20 transition-all duration-700 cursor-pointer group ${
                  isSec4Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${400 + index * 150}ms` }}
              >
                {/* Image Section */}
                <div className="w-full h-[55%] overflow-hidden relative bg-gray-100">
                  <img src={intern.image} alt={intern.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  {/* Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[9px] font-black tracking-widest text-white bg-gray-900/90 backdrop-blur-sm px-2.5 py-1 rounded-md">
                      {intern.tag}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-xs font-bold text-gray-900 group-hover:text-[#ff6600] transition-colors leading-tight mb-1.5 uppercase tracking-wide">
                      {intern.title}
                    </h3>
                  </div>

                  <div className="pt-2 border-t border-gray-50 flex items-center justify-between mt-2">
                    <span className="text-xs font-black text-gray-900">{intern.stipend}</span>
                    <span className="text-[10px] font-bold text-[#ff6600] group-hover:translate-x-1 transition-transform">
                      APPLY →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </section>


     {/* ========================================================= */}
      {/* SECTION 5: ESPORTS TOURNAMENTS (Premium Black & Yellow)   */}
      {/* ========================================================= */}
      <section 
        id="tournaments" 
        ref={section5Ref} 
        className="w-full py-20 px-4 md:px-8 bg-[#eef2f6] overflow-hidden border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto">
          
          {/* Header Area */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6600] animate-ping"></span>
                <span className={`text-[10px] font-bold tracking-[0.2em] text-[#ff6600] uppercase transition-all duration-700 ${isSec5Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                  LIVE ARENA
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 uppercase font-sans">
                <div className="leading-tight">{renderTypingLettersSec5("Esports ", 0)}</div>
                <div className="text-[#ff6600] leading-tight mt-1">{renderTypingLettersSec5("Tournaments", 300)}</div>
              </h2>
            </div>
            
            {/* View More Button */}
            <button 
              onClick={() => navigate('/tournaments')}
             className={`text-[black] font-bold flex items-center gap-1 hover:underline bg-indigo-50 px-5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-1000 delay-1000 ${isSec4Visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            >
              View All Tournaments →
            </button>
          </div>

          {/* Cards Grid: Mobile 2, Desktop 4-5 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            {[
              { title: "Ultimate Showdown", image: tourna1, game: "BGMI", type: "SQUAD 4V4", prize: "₹50,000" },
              { title: "Clash Championship", image: tourna2, game: "FREE FIRE", type: "CLASH SQUAD", prize: "₹30,000" },
              { title: "Regional Masters", image: tourna3, game: "HOK", type: "5V5 MODE", prize: "₹40,000" },
              { title: "Valorant Cup", image: tourna1, game: "VALORANT", type: "5V5 DEFUSE", prize: "₹60,000" },
              { title: "Apex Legends Solo", image: tourna2, game: "APEX", type: "SOLO BATTLE", prize: "₹25,000" }
            ].map((tourna, index) => (
              <div 
                key={index}
                onClick={() => navigate('/tournaments')}
                className={`bg-white rounded-3xl border border-gray-100 overflow-hidden flex flex-col aspect-square shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:border-[#ff6600]/20 transition-all duration-700 cursor-pointer group ${
                  isSec5Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${400 + index * 150}ms` }}
              >
                
                {/* Image Section */}
                <div className="w-full h-[55%] overflow-hidden relative bg-gray-100">
                  <img src={tourna.image} alt={tourna.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  
                  {/* Game Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[9px] font-black tracking-widest text-white bg-gray-900/90 backdrop-blur-sm px-2.5 py-1 rounded-md">
                      {tourna.game}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-xs font-bold text-gray-900 group-hover:text-[#ff6600] transition-colors leading-tight mb-1.5 uppercase tracking-wide">
                      {tourna.title}
                    </h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      🎮 {tourna.type}
                    </p>
                  </div>
                  
                  {/* Footer Section */}
                  <div className="pt-2 border-t border-gray-50 flex items-center justify-between mt-2">
                    <span className="text-xs font-black text-gray-900">{tourna.prize}</span>
                    <span className="text-[10px] font-bold text-[#ff6600] group-hover:translate-x-1 transition-transform">
                      JOIN →
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

{/* ========================================================= */}
      {/* SECTION 6: FOOTER (Dark Theme, Let's Bharat Layout)       */}
      {/* ========================================================= */}
      <footer className="w-full bg-[#0a0f1c] pt-16 pb-6 px-6 border-t border-gray-800 text-white font-sans">
        <div className="max-w-7xl mx-auto">
          
          {/* Main 4-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            
            {/* COLUMN 1: Brand & Newsletter */}
            <div className="space-y-6">
              {/* Website Logo Implemented via Import Logic */}
              <img 
                src={letsBharatLogo} 
                alt="Let's Bharat Logo" 
                className="h-18 object-contain"
              />
              <p className="text-gray-400 text-xs leading-relaxed uppercase tracking-wide">
                Your gateway to hackathons, internships, startup communities and resources. Let's build the <span className="text-[#ffcc00]">future</span> together.
              </p>
              
              <div className="pt-4">
                <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
                  Subscribe to our newsletter
                </h4>
                <p className="text-gray-500 text-xs mb-3">Get the latest updates and opportunities.</p>
                <div className="flex">
                  <div className="relative flex-grow">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">✉</span>
                    <input 
                      type="email" 
                      placeholder="ENTER YOUR EMAIL" 
                      className="w-full bg-transparent border border-gray-700 text-white pl-8 pr-3 py-2.5 rounded-l-md outline-none focus:border-[#ffcc00] transition-colors text-xs placeholder-gray-600"
                    />
                  </div>
                  <button className="bg-[#ffcc00] hover:bg-yellow-500 text-black px-4 py-2.5 rounded-r-md font-bold transition-colors text-xs whitespace-nowrap">
                    SUBSCRIBE
                  </button>
                </div>
              </div>
            </div>

            {/* COLUMN 2: About & Founder */}
            <div className="space-y-8">
              <div>
                <h3 className="text-white text-sm font-bold tracking-widest uppercase mb-4 flex flex-col">
                  About Let's <span className="text-[#ffcc00]">Bharat</span>
                  <span className="w-8 h-0.5 bg-[#ffcc00] mt-1"></span>
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed uppercase">
                  Let's Bharat is a platform dedicated to empowering students and innovators by connecting them with opportunities, communities and resources.
                </p>
              </div>

              <div>
                <h3 className="text-white text-sm font-bold tracking-widest uppercase mb-4 flex flex-col">
                  Founder of Let's <span className="text-[#ffcc00]">Bharat</span>
                  <span className="w-8 h-0.5 bg-[#ffcc00] mt-1"></span>
                </h3>
                <div className="flex items-center gap-4">
                  {/* Founder Profile Implemented via Import Logic */}
                  <img 
                    src={founderProfile} 
                    alt="Newlong Debbarma" 
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#ffcc00]"
                  />
                  <div>
                    <h4 className="text-white text-xs font-bold uppercase tracking-wider">NEWLONG DEBBARMA</h4>
                    <p className="text-[#ffcc00] text-[10px] font-bold tracking-widest uppercase mt-0.5">Founder & Creator</p>
                    <p className="text-gray-400 text-[10px] mt-1.5 leading-tight pr-4">
                      Passionate about technology, communities and creating impact through innovation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 3: Quick Links */}
            <div>
              <h3 className="text-white text-sm font-bold tracking-widest uppercase mb-4 flex flex-col">
                Quick Links
                <span className="w-8 h-0.5 bg-[#ffcc00] mt-1"></span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-y-3 text-gray-400 text-xs font-medium uppercase tracking-wider">
                <li><button onClick={() => navigate('/')} className="hover:text-[#ffcc00] flex items-center gap-2 transition-colors">⌂ Home</button></li>
                <li><button onClick={() => navigate('/about')} className="hover:text-[#ffcc00] flex items-center gap-2 transition-colors">👤 About Us</button></li>
                <li><button onClick={() => navigate('/startups')} className="hover:text-[#ffcc00] flex items-center gap-2 transition-colors">👥 Communities</button></li>
                <li><button onClick={() => navigate('/hackathons')} className="hover:text-[#ffcc00] flex items-center gap-2 transition-colors">🏆 Hackathons</button></li>
                <li><button onClick={() => navigate('/internships')} className="hover:text-[#ffcc00] flex items-center gap-2 transition-colors">💼 Internships</button></li>
                <li><button onClick={() => navigate('/tournaments')} className="hover:text-[#ffcc00] flex items-center gap-2 transition-colors">🎮 Tournaments</button></li>
                <li><button onClick={() => navigate('/resources')} className="hover:text-[#ffcc00] flex items-center gap-2 transition-colors">📚 Free Resources</button></li>
                <li><button onClick={() => navigate('/blogs')} className="hover:text-[#ffcc00] flex items-center gap-2 transition-colors">📢 Blogs & News</button></li>
                <li><button onClick={() => navigate('/contact')} className="hover:text-[#ffcc00] flex items-center gap-2 transition-colors">✉ Contact Us</button></li>
                <li><button onClick={() => navigate('/privacy')} className="hover:text-[#ffcc00] flex items-center gap-2 transition-colors">🛡 Privacy Policy</button></li>
              </ul>
            </div>

            {/* COLUMN 4: Contact Us & Socials */}
            <div>
              <h3 className="text-white text-sm font-bold tracking-widest uppercase mb-4 flex flex-col">
                Contact Us
                <span className="w-8 h-0.5 bg-[#ffcc00] mt-1"></span>
              </h3>
              <p className="text-gray-400 text-xs uppercase mb-5 tracking-wide">
                Connect with us on our platforms or reach out directly.
              </p>
              
              {/* Clickable Social Icons (No Text) */}
              <div className="grid grid-cols-4 gap-3 mb-6 max-w-[200px]">
                {/* Instagram */}
                <a href="https://www.instagram.com/newlong.ai?igsh=MXVxNXNxenJueWFqaA==" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500 hover:border-transparent transition-all group">
                  <svg className="w-4 h-4 fill-gray-400 group-hover:fill-white transition-colors" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                {/* LinkedIn */}
                <a href="YOUR_LINKEDIN_LINK" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-[#0a66c2] hover:border-[#0a66c2] transition-all group">
                  <svg className="w-4 h-4 fill-gray-400 group-hover:fill-white transition-colors" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                {/* Twitter / X */}
                <a href="YOUR_TWITTER_LINK" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:border-white transition-all group">
                  <svg className="w-4 h-4 fill-gray-400 group-hover:fill-black transition-colors" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                {/* YouTube */}
                <a href="YOUR_YOUTUBE_LINK" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-[#FF0000] hover:border-[#FF0000] transition-all group">
                  <svg className="w-4 h-4 fill-gray-400 group-hover:fill-white transition-colors" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                {/* WhatsApp */}
                <a href="YOUR_WHATSAPP_LINK" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] transition-all group">
                  <svg className="w-4 h-4 fill-gray-400 group-hover:fill-white transition-colors" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 .003 5.378.003 12.023c0 2.124.553 4.195 1.603 6.02L.05 24l6.096-1.597c1.761.961 3.743 1.468 5.882 1.468 6.643 0 12.025-5.38 12.025-12.026C24.053 5.381 18.675 0 12.031 0zm7.151 17.15c-.297.839-1.733 1.547-2.424 1.644-.551.077-1.258.12-3.52-.816-3.415-1.411-5.632-4.908-5.803-5.135-.17-.227-1.385-1.844-1.385-3.518 0-1.673.87-2.496 1.184-2.813.243-.243.684-.36 1.1-.36.137 0 .262.006.376.012.336.015.503.036.726.57.28.67 1.01 2.457 1.101 2.64.09.183.151.396.037.623-.113.228-.172.365-.34.562-.17.198-.359.428-.516.593-.17.18-.355.378-.146.738.208.36 1.01 1.666 2.19 2.716 1.521 1.353 2.8 1.77 3.16 1.954.36.183.574.153.79-.092.217-.244.927-1.073 1.176-1.442.25-.368.5-.306.83-.183.33.122 2.091.986 2.451 1.168.361.183.603.275.69.428.087.153.087.886-.21 1.725z"/></svg>
                </a>
                {/* Facebook */}
                <a href="YOUR_FACEBOOK_LINK" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-[#1877f2] hover:border-[#1877f2] transition-all group">
                  <svg className="w-4 h-4 fill-gray-400 group-hover:fill-white transition-colors" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>

              {/* Direct Contact Details */}
              <div className="space-y-3 bg-[#121826] p-4 rounded-xl border border-gray-800">
                <a href="mailto:HELLO@LETSBHARAT.COM" className="flex items-center gap-3 text-gray-400 hover:text-[#ffcc00] transition-colors text-xs font-medium tracking-wide">
                  <span>✉</span> HELLO@LETSBHARAT.COM
                </a>
                <a href="tel:+919876543210" className="flex items-center gap-3 text-gray-400 hover:text-[#ffcc00] transition-colors text-xs font-medium tracking-wide">
                  <span>📞</span> +91 98765 43210
                </a>
                <div className="flex items-center gap-3 text-gray-400 text-xs font-medium tracking-wide uppercase">
                  <span>📍</span> Agartala, Tripura, India
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright Section */}
          <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium tracking-wide uppercase">
            <p>© 2026 LET'S BHARAT. ALL RIGHTS RESERVED.</p>
            <p className="flex items-center gap-1">
              <span className="text-[#ffcc00] text-sm">💛</span> MADE WITH PASSION FOR INNOVATORS
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
              <a href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</a>
            </div>
          </div>
          
        </div>
      </footer>

    </div>
  );
};

export default Home;