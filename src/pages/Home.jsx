import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';



// 🎥 Apni saari videos yahan import karein (path check kar lena)
import video1 from '../assets/videos/video1.mp4';
import video2 from '../assets/videos/video2.mp4';
import video3 from '../assets/videos/video3.mp4';
import video4 from '../assets/videos/video4.mp4';

 


      
// 📂 Hub Images (Inhe apne assets/images folder mein zaroor rakhein)
import startup1 from '../assets/images/startup1.jpeg';
import startup2 from '../assets/images/startup2.jpeg';
import startup3 from '../assets/images/startup3.jpeg';
import startup4 from '../assets/images/startup4.jpeg';
import startup5 from '../assets/images/startup5.jpeg';
import startup6 from '../assets/images/startup6.jpeg';
import startup7 from '../assets/images/startup7.jpeg';
import startup8 from '../assets/images/startup8.jpeg';
import startup9 from '../assets/images/startup9.jpeg';
import startup10 from '../assets/images/startup10.jpeg';

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

// 📂 DYNAMIC SLIDES DATA (Yahan se future mein text/videos change kar sakte hain)
const heroSlides = [
  {
    id: 1,
    videoSrc: video1,
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

const Home = () => {
  const navigate = useNavigate();
  
  // ⏱️ State for Slide Index and Animation
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Jab slide change ho, toh text animation wapas re-trigger ho
  useEffect(() => {
    setIsAnimating(true);
  }, [currentIndex]);

  // 🔄 Jab bhi koi video khatam hogi, ye function automatic next slide load karega
  const handleVideoEnd = () => {
    setIsAnimating(false); // Text animate out hoga
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, 100); // Halki si delay ke baad next slide
  };

  // ✨ 3D Word Animation Helper
  const renderAnimatedWords = (text, isActive, baseDelay = 0) => {
    return text.split(" ").map((word, index) => (
      <span
        key={index}
        className={`inline-block transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isActive 
            ? "opacity-100 translate-y-0 scale-100 blur-none [transform:rotateX(0deg)]" 
            : "opacity-0 translate-y-12 scale-75 blur-sm [transform:rotateX(80deg)]"
        }`}
        style={{ transitionDelay: `${baseDelay + index * 100}ms`, transformStyle: 'preserve-3d' }}
      >
        {word}&nbsp;
      </span>
    ));
  };



// ==========================================
  // SECTION 2: AI STARTUPS (Premium Constellation UI)
  // ==========================================
  const [isSec2Visible, setIsSec2Visible] = useState(false);
  const section2Ref = useRef(null);
 // Navigation ke liye

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsSec2Visible(true);
      },
      { threshold: 0.1 } 
    );
    if (section2Ref.current) observer.observe(section2Ref.current);
    return () => {
      if (section2Ref.current) observer.unobserve(section2Ref.current);
    };
  }, []);

  // 🌍 AI Startups Data - Exact positions mapped from the image
  const aiStartups = [
    { img: startup1, pos: "top-[10%] left-[8%] md:left-[15%]", size: "w-14 h-14 md:w-[72px] md:h-[72px]", delay: "0.1s" }, // Top Left
    { img: startup2, pos: "top-[25%] left-[2%] md:left-[5%]", size: "w-12 h-12 md:w-16 md:h-16", delay: "0.3s" }, // Mid Left Outer
    { img: startup3, pos: "top-[42%] left-[12%] md:left-[22%]", size: "w-12 h-12 md:w-[60px] md:h-[60px]", delay: "0.5s" }, // Mid Left Inner
    { img: startup4, pos: "bottom-[28%] left-[5%] md:left-[10%]", size: "w-14 h-14 md:w-[68px] md:h-[68px]", delay: "0.7s" }, // Bottom Left Outer
    { img: startup5, pos: "bottom-[18%] left-[18%] md:left-[24%]", size: "w-10 h-10 md:w-14 md:h-14", delay: "0.2s" }, // Bottom Left Inner
    { img: startup6, pos: "bottom-[8%] left-[50%] -translate-x-1/2", size: "w-16 h-16 md:w-[80px] md:h-[80px]", delay: "0.4s" }, // Bottom Center (Meta position)
    { img: startup7, pos: "bottom-[22%] right-[18%] md:right-[26%]", size: "w-10 h-10 md:w-14 md:h-14", delay: "0.6s" }, // Bottom Right Inner
    { img: startup8, pos: "bottom-[35%] right-[5%] md:right-[12%]", size: "w-12 h-12 md:w-16 md:h-16", delay: "0.8s" }, // Bottom Right Outer
    { img: startup9, pos: "top-[45%] right-[15%] md:right-[20%]", size: "w-14 h-14 md:w-[64px] md:h-[64px]", delay: "0.9s" }, // Mid Right Inner
    { img: startup10, pos: "top-[12%] right-[10%] md:right-[18%]", size: "w-16 h-16 md:w-[76px] md:h-[76px]", delay: "1.1s" }, // Top Right
  ];

  const statsData = [
    { icon: "🚀", num: "1000+", title: "AI Startup Listing", desc: "Curated collection of global AI innovators" },
    { icon: "🌐", num: "50+", title: "Countries", desc: "Startups from around the world" },
    { icon: "🔠", num: "20+", title: "Categories", desc: "From AI tools to infrastructure and beyond" },
    { icon: "📈", num: "10K+", title: "Innovators", desc: "Builders, creators & visionaries trusting our platform" }
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
    <div className="w-full font-sans overflow-x-hidden perspective-[1000px]">
      
      {/* ========================================================= */}
      {/* SECTION 1: DYNAMIC VIDEO PLAYLIST HERO SECTION            */}
      {/* ========================================================= */}
      {/* Laptop & Mobile Device Fixes: min-h-[100dvh] ensures it perfectly fits screen on mobile */}
      <section className="relative w-full min-h-[100dvh] flex flex-col justify-center bg-[#0b0f19] pt-24 pb-12 overflow-hidden">
        
        {/* 🎥 DYNAMIC BACKGROUND VIDEO */}
        {/* key={currentSlide.id} lagane se video smooth change hogi bina kaske */}
        <video 
          key={currentSlide.id}
          autoPlay 
          muted 
          playsInline
          onEnded={handleVideoEnd} // <--- Ye trigger karega agla video
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 transition-opacity duration-1000"
        >
          <source src={currentSlide.videoSrc} type="video/mp4" />
        </video>

        {/* 🌑 Black Gradient Overlay - Text readable banane ke liye */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/80 to-transparent z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/40 to-transparent z-0 md:bg-none"></div>

        {/* 📝 MAIN HERO CONTENT (Animated Text Syncs with Video) */}
        {/* Mobile ke liye margin aur padding adjust kiya hai */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 w-full flex-grow flex flex-col justify-center mt-4 md:mt-10">
          <div className="flex flex-col items-start w-full">
            
            {/* 3D Word-by-Word Title (WHITE + YELLOW THEME) */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight uppercase [perspective:1000px]">
              <div className="text-white">
                {renderAnimatedWords(currentSlide.title1, isAnimating, 0)}
              </div>
              <div className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)] mt-1 lg:mt-2">
                {renderAnimatedWords(currentSlide.titleHighlight, isAnimating, 200)}
              </div>
              <div className="text-white mt-1 lg:mt-2">
                {renderAnimatedWords(currentSlide.title2, isAnimating, 400)}
              </div>
            </h1>
            
            {/* Animated Subtitle (Yellow Accent) */}
            <p className={`text-yellow-400 text-xs sm:text-sm font-bold tracking-widest mt-6 uppercase transition-all duration-700 ease-out ${
              isAnimating ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`} style={{ transitionDelay: '700ms' }}>
              {currentSlide.subtitle}
            </p>
            
            {/* Animated Description (White/Gray) */}
            <p className={`text-gray-300 text-base sm:text-lg lg:text-xl max-w-2xl mt-4 leading-relaxed transition-all duration-700 ease-out ${
              isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`} style={{ transitionDelay: '900ms' }}>
              {currentSlide.desc}
            </p>
            
            {/* Animated Buttons (Yellow Premium Look) */}
            <div className={`flex flex-col sm:flex-row w-full sm:w-auto gap-4 mt-8 transition-all duration-700 ease-out ${
              isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`} style={{ transitionDelay: '1100ms' }}>
              <button 
                onClick={() => navigate(currentSlide.btn1Link)} 
                className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black px-8 py-3.5 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(250,204,21,0.4)] active:scale-95"
              >
                {currentSlide.btn1Text}
              </button>
              <button 
                onClick={() => navigate(currentSlide.btn2Link)} 
                className="w-full sm:w-auto border-2 border-gray-500 hover:border-yellow-400 bg-black/40 backdrop-blur-sm px-8 py-3.5 rounded-xl font-bold transition-all hover:text-yellow-400 active:scale-95 text-white"
              >
                {currentSlide.btn2Text}
              </button>
            </div>

            {/* Video Progress Indicators (Dots) */}
            <div className="flex gap-2 mt-12 mb-4">
              {heroSlides.map((_, index) => (
                <div 
                  key={index} 
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === currentIndex ? "w-8 bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.8)]" : "w-3 bg-gray-600"
                  }`}
                />
              ))}
            </div>

          </div>
        </div>

        {/* 📊 STATS ROW (White + Yellow Theme | Phone/Laptop Fix) */}
        {/* Ab yeh Mobile par ek Grid ban jayega aur PC par Row mein rahega */}
        <div className={`relative z-10 max-w-7xl mx-auto px-5 md:px-10 w-full mt-auto mb-4 md:mb-0 transition-all duration-1000 ease-out ${
          isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`} style={{ transitionDelay: '1300ms' }}>
          
          <div className="bg-[#121826]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl">
            {/* Grid for Mobile (2x2), Flex for Laptop */}
            <div className="grid grid-cols-2 md:flex md:flex-row justify-between items-center gap-6 md:gap-4">
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3 hover:scale-105 transition-transform">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-500/10 flex items-center justify-center text-xl shadow-[0_0_10px_rgba(250,204,21,0.2)] text-yellow-400">👥</div>
                <div><h3 className="text-xl md:text-2xl font-bold text-white">10K+</h3><p className="text-gray-400 text-xs md:text-sm">Active Members</p></div>
              </div>
              
              <div className="hidden md:block w-px h-12 bg-gray-800"></div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3 hover:scale-105 transition-transform">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-500/10 flex items-center justify-center text-xl shadow-[0_0_10px_rgba(250,204,21,0.2)] text-yellow-400">📚</div>
                <div><h3 className="text-xl md:text-2xl font-bold text-white">50+</h3><p className="text-gray-400 text-xs md:text-sm">Learning Resources</p></div>
              </div>
              
              <div className="hidden md:block w-px h-12 bg-gray-800"></div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3 hover:scale-105 transition-transform">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-500/10 flex items-center justify-center text-xl shadow-[0_0_10px_rgba(250,204,21,0.2)] text-yellow-400">🎟️</div>
                <div><h3 className="text-xl md:text-2xl font-bold text-white">100+</h3><p className="text-gray-400 text-xs md:text-sm">Events Based</p></div>
              </div>
              
              <div className="hidden md:block w-px h-12 bg-gray-800"></div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3 hover:scale-105 transition-transform">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-500/10 flex items-center justify-center text-xl shadow-[0_0_10px_rgba(250,204,21,0.2)] text-yellow-400">🚀</div>
                <div><h3 className="text-xl md:text-2xl font-bold text-yellow-400">Northeast</h3><p className="text-gray-400 text-xs md:text-sm">Startup</p></div>
              </div>
              
            </div>
          </div>
        </div>

      </section>
  
    
      {/* ========================================================= */}
      {/* SECTION 2: AI STARTUPS (Premium Constellation UI)         */}
      {/* ========================================================= */}
      <section 
        ref={section2Ref} 
        className="relative w-full bg-[#eef2f6] pt-28 pb-16 overflow-hidden border-t border-gray-100 flex flex-col items-center"
      >
        {/* CapCut Style Fluid Animations */}
        <style>
          {`
            @keyframes orbitFloat {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-12px) rotate(1.5deg); }
            }
            .orbit-float { animation: orbitFloat 6s ease-in-out infinite; }
            .orbit-float-reverse { animation: orbitFloat 7s ease-in-out infinite reverse; }
            
            .pop-in {
              transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
            }
          `}
        </style>

        {/* --- BACKGROUND ORBIT LINES --- */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-40">
          {/* Main Diagonal Ellipse */}
          <div className={`absolute w-[180%] md:w-[130%] h-[500px] md:h-[800px] border-[1.5px] border-[#e2e8f0] rounded-[100%] transition-all duration-1500 ${isSec2Visible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'} rotate-[-12deg]`}></div>
          {/* Secondary Intersecting Ellipse */}
          <div className={`absolute w-[160%] md:w-[110%] h-[400px] md:h-[600px] border-[1.5px] border-[#e9d5ff] rounded-[100%] transition-all duration-1500 delay-300 ${isSec2Visible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'} rotate-[8deg]`}></div>
          {/* Tiny connection dots on lines */}
          <div className="absolute top-[20%] left-[25%] w-1.5 h-1.5 rounded-full bg-[#a855f7]"></div>
          <div className="absolute bottom-[25%] right-[35%] w-1.5 h-1.5 rounded-full bg-[#3b82f6]"></div>
          <div className="absolute top-[35%] right-[15%] w-1 h-1 rounded-full bg-[#ec4899]"></div>
        </div>

        {/* --- CENTRAL HERO TEXT --- */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center mt-12 md:mt-24">
          
          {/* Top Badge */}
          <div className={`inline-block mb-8 pop-in ${isSec2Visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'}`}>
            <span className="text-[10px] md:text-[11px] font-bold text-[#8b5cf6] bg-white border border-[#e9d5ff] shadow-sm px-5 py-2 rounded-full uppercase tracking-[0.25em]">
              Discover. Explore. Innovate.
            </span>
          </div>

          {/* Main Title */}
          <h2 className={`text-4xl md:text-6xl lg:text-7xl font-black text-[#1e293b] tracking-tight leading-[1.15] mb-6 pop-in ${isSec2Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '150ms' }}>
            EXPLORE THE WORLD'S <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#6366f1]">
              TOP AI STARTUPS
            </span>
          </h2>

          {/* Subtitle */}
          <p className={`text-[#64748b] max-w-xl mx-auto text-base md:text-lg font-medium pop-in ${isSec2Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '250ms' }}>
            Your gateway to the most innovative AI startups shaping the future of technology and humanity.
          </p>

          {/* Trusted By Avatars */}
          <div className={`flex items-center justify-center gap-4 mt-10 pop-in ${isSec2Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '350ms' }}>
            <div className="flex -space-x-2.5">
              <img src="https://i.pravatar.cc/100?img=11" alt="user" className="w-9 h-9 rounded-full border-[2.5px] border-white shadow-sm" />
              <img src="https://i.pravatar.cc/100?img=12" alt="user" className="w-9 h-9 rounded-full border-[2.5px] border-white shadow-sm" />
              <img src="https://i.pravatar.cc/100?img=33" alt="user" className="w-9 h-9 rounded-full border-[2.5px] border-white shadow-sm" />
              <div className="w-9 h-9 rounded-full border-[2.5px] border-white bg-gray-900 flex items-center justify-center shadow-sm">
                <span className="text-[10px] text-white font-bold tracking-wider">AI</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#64748b] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#8b5cf6] animate-pulse"></span>
              Trusted by innovators worldwide
            </div>
          </div>
        </div>

        {/* --- FLOATING 3D LOGOS --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {aiStartups.map((startup, idx) => (
            <div 
              key={idx}
              className={`absolute ${startup.pos} pointer-events-auto pop-in ${isSec2Visible ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
              style={{ transitionDelay: startup.delay }}
            >
              <div className={idx % 2 === 0 ? "orbit-float" : "orbit-float-reverse"}>
                <div className={`
                  ${startup.size} 
                  bg-white rounded-full p-2.5 md:p-4
                  shadow-[0_8px_24px_rgba(149,157,165,0.2)] 
                  hover:shadow-[0_20px_40px_rgba(139,92,246,0.25)] 
                  hover:scale-125 hover:-translate-y-3
                  transition-all duration-300 cursor-pointer border border-[#f1f5f9] flex items-center justify-center
                `}>
                  <img src={startup.img} alt={`Startup ${idx}`} className="max-w-full max-h-full object-contain" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- BOTTOM STATS BAR & CTA BUTTON --- */}
        <div className={`relative z-10 w-full max-w-7xl mx-auto px-6 mt-40 md:mt-56 flex flex-col items-center pop-in ${isSec2Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '500ms' }}>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 w-full mb-16">
            {statsData.map((stat, idx) => (
              <div key={idx} className="flex gap-5 items-start group">
                <div className="w-14 h-14 rounded-2xl bg-[#f5f3ff] flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-[#ede9fe] transition-all duration-300 shrink-0 shadow-sm border border-[#ede9fe]">
                  {stat.icon}
                </div>
                <div>
                  <h4 className="text-xl md:text-2xl font-black text-[#7c3aed]">{stat.num}</h4>
                  <p className="text-sm font-bold text-[#1e293b] mt-1">{stat.title}</p>
                  <p className="text-xs text-[#64748b] mt-1.5 leading-relaxed">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* View More Button (Naya Add Kiya Gaya) */}
          <button 
            onClick={() => navigate('/startups')}
            className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white transition-all duration-300 bg-gray-900 rounded-full hover:bg-[#7c3aed] shadow-lg hover:shadow-[#7c3aed]/40 hover:-translate-y-1 active:scale-95"
          >
            <span className="mr-2">View more Startups</span>
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>

          {/* Bottom Footer Line */}
          <div className="w-full mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-center items-center gap-4 text-[10px] md:text-xs font-bold text-gray-400 tracking-widest uppercase">
            <span>1000+ AI STARTUP LISTING</span>
            <span className="hidden sm:block w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
            <span>EXPLORE. CONNECT. GROW.</span>
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