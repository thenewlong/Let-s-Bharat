import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// 📂 Local Folder se Images (Slide 4 aur 5 ki images bhi add karein apne folder mein)
import slide1 from '../assets/images/slide1.jpeg';
import slide2 from '../assets/images/slide2.jpeg';
import slide3 from '../assets/images/slide3.jpeg';
import slide4 from '../assets/images/slide4.jpeg'; // NEW
import slide5 from '../assets/images/slide5.jpeg'; // NEW

// 📂 Hub Images (Inhe apne assets/images folder mein zaroor rakhein)
import startup1 from '../assets/images/startup1.jpeg';
import startup2 from '../assets/images/startup2.jpeg';
import startup3 from '../assets/images/startup3.jpeg';
import startup4 from '../assets/images/startup4.jpeg';

// 📂 Hackathon Images (File ke top par add karein)
import hack1 from '../assets/images/hack1.jpeg'; // Apni images ke naam yahan set karein
import hack2 from '../assets/images/hack2.jpeg';
import hack3 from '../assets/images/hack3.jpeg';

import intern1 from '../assets/images/intern1.jpeg'; // Apni images set karein
import intern2 from '../assets/images/intern2.jpeg';
import intern3 from '../assets/images/intern3.jpeg';

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  


// --- Yahan se Section 2 ka Logic Shuru ---
  const [isSec2Visible, setIsSec2Visible] = useState(false);
  const section2Ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsSec2Visible(true);
      },
      { threshold: 0.2 } // Jab 20% section dikhega tab animation chalega
    );
    if (section2Ref.current) observer.observe(section2Ref.current);
    return () => {
      if (section2Ref.current) observer.unobserve(section2Ref.current);
    };
  }, []);

  // 3D Letter Animation ka function
  const render3DLetters = (text, delayOffset = 0) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className={`inline-block transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isSec2Visible 
            ? "opacity-100 translate-y-0 scale-100 blur-none [transform:rotateX(0deg)]" 
            : "opacity-0 translate-y-8 scale-75 blur-sm [transform:rotateX(-90deg)]"
        }`}
        style={{ 
          transitionDelay: `${delayOffset + index * 40}ms`,
          transformOrigin: "bottom center",
          transformStyle: "preserve-3d"
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  // Cards ka Data (Jisme images lagayi gayi hain)
  const learningHubs = [
    { name: "CodeZone", desc: "Programming & Core Engineering", image: startup1 },
    { name: "BizBrain", desc: "Startups, Funding & Ideation", image: startup2 },
    { name: "Creative Hub", desc: "UI/UX, Video Editing & Brands", image: startup3 },
    { name: "Marketing Hub", desc: "Growth Hacking & Digital Outreach", image: startup4 }
  ];
  // --- Yahan Section 2 ka Logic Khatam ---

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

  // Section 3 ke liye 3D Text function
  const render3DLettersSec3 = (text, delayOffset = 0) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className={`inline-block transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isSec3Visible 
            ? "opacity-100 translate-y-0 scale-100 blur-none [transform:rotateX(0deg)]" 
            : "opacity-0 translate-y-8 scale-75 blur-sm [transform:rotateX(-90deg)]"
        }`}
        style={{ 
          transitionDelay: `${delayOffset + index * 40}ms`,
          transformOrigin: "bottom center",
          transformStyle: "preserve-3d"
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }; 

  // --- Section 4: Internships Animation ---
  const [isSec4Visible, setIsSec4Visible] = useState(false);
  const section4Ref = useRef(null);

  useEffect(() => {
    const observer4 = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsSec4Visible(true);
    }, { threshold: 0.2 });
    if (section4Ref.current) observer4.observe(section4Ref.current);
  }, []);

  // 🚀 SLIDER DATA (Total 5 Slides)
  const heroSlides = [
    {
      id: 1,
      bgImage: slide1,
      title1: "NORTHEAST INDIA'S",
      titleHighlight: "YOUTH TECH & START-UP",
      title2: "COMMUNITY HUB",
      subtitle: "CONNECT. COLLABORATE. CREATE IMPACT.",
      desc: "Join thousands of students, developers and innovators building the future of Northeast India.",
      btn1Text: "Explore ➔",
      btn1Link: "/communities",
      btn2Text: "Hackathons ➔",
      btn2Link: "/hackathons"
    },
    {
      id: 2,
      bgImage: slide2,
      title1: "KICKSTART YOUR CAREER WITH",
      titleHighlight: "TOP INTERNSHIPS",
      title2: "& OPEN ROLES",
      subtitle: "LEARN. BUILD. GROW.",
      desc: "Get real-world experience. Apply for remote and onsite internships at top tech companies and startups.",
      btn1Text: "Apply Now ➔",
      btn1Link: "/internships",
      btn2Text: "View All ➔",
      btn2Link: "/internships"
    },
    {
      id: 3,
      bgImage: slide3,
      title1: "COMPETE IN THE ULTIMATE",
      titleHighlight: "ESPORTS TOURNAMENTS",
      title2: "& GAMING ARENA",
      subtitle: "PLAY. COMPETE. WIN.",
      desc: "Join BGMI, Free Fire, and MLBB tournaments. Compete with the best regional squads and win massive prize pools.",
      btn1Text: "Join Squad ➔",
      btn1Link: "/tournaments",
      btn2Text: "Tournaments ➔",
      btn2Link: "/tournaments"
    },
    {
      id: 4,
      bgImage: slide4,
      title1: "UNLOCK PREMIUM",
      titleHighlight: "JOBS & CAREERS",
      title2: "OPPORTUNITIES",
      subtitle: "PREPARE. APPLY. SUCCEED.",
      desc: "Find exclusive job openings, connect with top recruiters, and land your dream job in leading tech companies.",
      btn1Text: "Find Jobs ➔",
      btn1Link: "/jobs",
      btn2Text: "Prepare ➔",
      btn2Link: "/resources"
    },
    {
      id: 5,
      bgImage: slide5,
      title1: "ACCESS EXCLUSIVE",
      titleHighlight: "TECH RESOURCES",
      title2: "& STUDY MATERIALS",
      subtitle: "READ. PRACTICE. MASTER.",
      desc: "Get access to premium roadmaps, coding notes, and project ideas to accelerate your tech journey.",
      btn1Text: "Get Resources ➔",
      btn1Link: "/resources",
      btn2Text: "Communities ➔",
      btn2Link: "/communities"
    }
  ];

  // ⏱️ Auto Slider Timer
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [heroSlides.length]);

  // ✨ Helper Function: Ek-Ek word ko 3D animation dene ke liye
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

  return (
    <div className="w-full font-sans overflow-x-hidden perspective-[1000px]">
      
      {/* ========================================================= */}
      {/* SECTION 1: FULL BANNER HERO (With 3D Staggered Slider)    */}
      {/* ========================================================= */}
      <section className="relative w-full min-h-screen flex flex-col justify-center bg-[#0b0f19] pt-24 pb-12 overflow-hidden">
        
        {/* 🌟 Background Slider (Smooth Fade & Zoom) */}
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-30 scale-105" : "opacity-0 scale-100"
            }`}
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          />
        ))}

        {/* 🌑 Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/80 to-transparent z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent z-0"></div>

        {/* 📝 Main Hero Content (3D Animated Text & Buttons) */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full h-[380px] sm:h-[350px] mt-10 md:mt-20">
          {heroSlides.map((slide, index) => {
            const isActive = index === currentSlide;
            
            return (
              <div 
                key={slide.id}
                className={`absolute inset-0 flex flex-col items-start transition-opacity duration-1000 ${
                  isActive ? "opacity-100 z-10" : "opacity-0 -z-10 pointer-events-none"
                }`}
              >
                {/* 3D Word-by-Word Title */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight uppercase [perspective:1000px]">
                  <div>{renderAnimatedWords(slide.title1, isActive, 0)}</div>
                  <div className="text-[#a855f7] drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] mt-1">
                    {renderAnimatedWords(slide.titleHighlight, isActive, 200)}
                  </div>
                  <div className="mt-1">{renderAnimatedWords(slide.title2, isActive, 400)}</div>
                </h1>
                
                {/* Animated Subtitle */}
                <p className={`text-gray-300 text-sm font-bold tracking-widest mt-6 uppercase transition-all duration-700 ease-out ${
                  isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                }`} style={{ transitionDelay: '700ms' }}>
                  {slide.subtitle}
                </p>
                
                {/* Animated Description */}
                <p className={`text-gray-400 text-lg sm:text-xl max-w-2xl mt-3 leading-relaxed transition-all duration-700 ease-out ${
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`} style={{ transitionDelay: '900ms' }}>
                  {slide.desc}
                </p>
                
                {/* Animated Buttons */}
                <div className={`flex flex-row flex-wrap gap-4 mt-8 transition-all duration-700 ease-out ${
                  isActive ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`} style={{ transitionDelay: '1100ms' }}>
                  <button 
                    onClick={() => navigate(slide.btn1Link)} 
                    className="bg-gradient-to-r from-[#a855f7] to-[#7c3aed] hover:from-[#9333ea] hover:to-[#6d28d9] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] active:scale-95"
                  >
                    {slide.btn1Text}
                  </button>
                  <button 
                    onClick={() => navigate(slide.btn2Link)} 
                    className="border-2 border-gray-600 hover:border-gray-400 bg-black/40 backdrop-blur-sm px-8 py-3.5 rounded-xl font-bold transition-all active:scale-95 text-white"
                  >
                    {slide.btn2Text}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 📊 STATS ROW (Floating Glassy Box) - NOW HIDDEN ON MOBILE (hidden md:block) */}
        <div className="hidden md:block relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full mt-24 md:mt-32">
          <div className="bg-[#121826]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 shadow-2xl">
            <div className="flex items-center gap-4 hover:scale-105 transition-transform">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-2xl shadow-[0_0_10px_rgba(168,85,247,0.2)]">👥</div>
              <div><h3 className="text-2xl font-bold text-white">10K+</h3><p className="text-gray-400 text-sm">Active Members</p></div>
            </div>
            <div className="hidden md:block w-px h-12 bg-gray-800"></div>
            <div className="flex items-center gap-4 hover:scale-105 transition-transform">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-2xl shadow-[0_0_10px_rgba(168,85,247,0.2)]">📚</div>
              <div><h3 className="text-2xl font-bold text-white">50+</h3><p className="text-gray-400 text-sm">Learning Resources</p></div>
            </div>
            <div className="hidden md:block w-px h-12 bg-gray-800"></div>
            <div className="flex items-center gap-4 hover:scale-105 transition-transform">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-2xl shadow-[0_0_10px_rgba(168,85,247,0.2)]">🎟️</div>
              <div><h3 className="text-2xl font-bold text-white">100+</h3><p className="text-gray-400 text-sm">Events Based</p></div>
            </div>
            <div className="hidden md:block w-px h-12 bg-gray-800"></div>
            <div className="flex items-center gap-4 hover:scale-105 transition-transform">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-2xl shadow-[0_0_10px_rgba(168,85,247,0.2)]">🚀</div>
              <div><h3 className="text-2xl font-bold text-[#a855f7]">Northeast</h3><p className="text-gray-400 text-sm">Startup</p></div>
            </div>
          </div>
        </div>
      </section>
      
    
{/* ========================================================= */}
      {/* SECTION 2: COMMUNITIES (Images & 3D Text Animation)       */}
      {/* ========================================================= */}
      <section 
        ref={section2Ref} 
        className="w-full bg-[#eef2f6] py-20 px-6 md:px-10 border-t border-gray-200 overflow-hidden [perspective:1000px]"
      >
        <div className="max-w-7xl mx-auto">
          
          {/* Header & 3D Title */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight [perspective:1000px]">
                <div>{render3DLetters("Our Main", 0)}</div>
                <div className="text-[#a855f7] mt-1">{render3DLetters("Learning Hubs", 300)}</div>
              </h2>
              <p className={`text-gray-600 mt-4 max-w-xl transition-all duration-1000 delay-700 ${isSec2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                Choose your domain, gather with peers, and scale your personal skills.
              </p>
            </div>
            <button 
              onClick={() => navigate('/communities')}
              className={`text-[#8b5cf6] font-bold hover:underline whitespace-nowrap transition-all duration-1000 delay-1000 ${isSec2Visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
            >
              View more Communities →
            </button>
          </div>

          {/* Cards Grid with Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningHubs.map((startup, idx) => (
              <div 
                key={idx} 
                onClick={() => navigate('/communities')}
                className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-[800ms] cursor-pointer group ${isSec2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${800 + idx * 150}ms` }}
              >
                
                {/* Image Section (Card ke upar) */}
                <div className="w-full h-40 bg-gray-200 overflow-hidden relative">
                  <img 
                    src={startup.image} 
                    alt={startup.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Text Section (Card ke neeche) */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#a855f7] transition-colors">{startup.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{startup.desc}</p>
                </div>
                
              </div>
            ))}
          </div>

        </div>
      </section>
      

      {/* ========================================================= */}
      {/* SECTION 3: HACKATHONS (3D Animated with Images)           */}
      {/* ========================================================= */}
      <section 
        ref={section3Ref}
        className="w-full py-20 px-6 md:px-10 bg-[#eef2f6] overflow-hidden [perspective:1000px]"
      >
        <div className="max-w-7xl mx-auto">
          
          {/* Header & 3D Title */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight [perspective:1000px]">
                <div>{render3DLettersSec3("Live & Upcoming", 0)}</div>
                <div className="text-[#a855f7] mt-1">{render3DLettersSec3("Hackathons", 300)}</div>
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

          {/* Cards Grid with Images & 3D Flip */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Northeast Innovators 2026", image: hack1, type: "Offline Grand", prize: "₹50,000", tag: "Featured", statusColor: "bg-purple-100 text-purple-700" },
              { title: "Webify Dev Hackathon", image: hack2, type: "Online Challenge", prize: "₹25,000", tag: "Ongoing", statusColor: "bg-green-100 text-green-700" },
              { title: "AI Impact Challenge", image: hack3, type: "Hybrid Event", prize: "₹75,000", tag: "Upcoming", statusColor: "bg-blue-100 text-blue-700" }
            ].map((hack, index) => (
              <div 
                key={index} 
                className={`bg-[#f8fafc] rounded-2xl border border-gray-200 overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all duration-[800ms] cursor-pointer group ${isSec3Visible ? "opacity-100 translate-y-0 [transform:rotateX(0deg)]" : "opacity-0 translate-y-16 [transform:rotateX(15deg)]"}`}
                style={{ transitionDelay: `${800 + index * 200}ms`, transformStyle: "preserve-3d" }}
              >
                
                {/* 🖼️ Image Section (Naya add kiya gaya hai) */}
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
      {/* SECTION 4: LATEST INTERNSHIPS (3D Flip Animation)         */}
      {/* ========================================================= */}
      <section ref={section4Ref} className="py-20 bg-[#eef2f6] overflow-hidden [perspective:1500px]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Latest Internships</h2>
            <p className="text-gray-500 text-lg">Kickstart your career with top remote and onsite opportunities.</p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Frontend Developer", image: intern1, tag: "Remote", status: "Hiring Now", stipend: "₹10,000 / mo" },
              { title: "UI/UX Designer", image: intern2, tag: "Onsite", status: "Hiring Now", stipend: "₹12,000 / mo" },
              { title: "Full Stack Intern", image: intern3, tag: "Hybrid", status: "Urgent", stipend: "₹15,000 / mo" }
            ].map((intern, index) => (
              <div 
                key={index}
                className={`bg-white rounded-3xl p-6 border border-gray-100 shadow-xl transition-all duration-1000 transform ${
                  isSec4Visible 
                    ? "opacity-100 [transform:rotateY(0deg)]" 
                    : "opacity-0 [transform:rotateY(-45deg)]"
                }`}
                style={{ transitionDelay: `${index * 300}ms` }}
              >
                {/* Image Container with Hover Effect */}
                <div className="w-full h-48 rounded-2xl overflow-hidden mb-6 relative">
                  <img src={intern.image} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold">
                    {intern.tag}
                  </div>
                </div>

                <h3 className="text-xl font-extrabold text-gray-900 mb-2">{intern.title}</h3>
                <p className="text-sm text-gray-500 mb-6">Gain real-world experience working with top-tier development teams.</p>
                
                <div className="flex justify-between items-center border-t pt-4">
                  <p className="text-lg font-bold text-[#6366f1]">{intern.stipend}</p>
                  <button onClick={() => navigate('/internships')} className="bg-gray-900 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-gray-700 transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 5: ESPORTS TOURNAMENTS (Gaming Section)            */}
      {/* ========================================================= */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-purple-600 animate-ping"></span>
                <span className="text-xs font-bold text-purple-600 tracking-widest uppercase">Live Arena</span>
              </div>
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Esports Tournaments</h2>
              <p className="text-gray-500 text-lg mt-2">Compete with top regional squads, win cash rewards, and dominate leaderboards.</p>
            </div>
            {/* Explore All -> Goes to /tournaments */}
            <button 
              onClick={() => navigate('/tournaments')} 
              className="text-purple-600 font-bold hover:text-purple-800 transition-colors flex items-center gap-2 active:scale-95"
            >
              Explore All Tournaments <span>→</span>
            </button>
          </div>

          {/* Tournament Cards Layout (Matching Hackathon & Internship Style) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: BGMI */}
            <div className="bg-[#f8fafc] rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-center mb-6">
                <span className="bg-orange-100 text-orange-700 text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest">
                  BGMI
                </span>
                <span className="text-xs text-gray-500 font-semibold flex items-center gap-1">
                  🎮 Squad 4v4
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-2">Ultimate Showdown</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-8">
                Northeast India's biggest custom room tournament. Register your squad and claim your spot.
              </p>
              <div className="flex justify-between items-end pt-4 border-t border-gray-100">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Prize Pool</p>
                  <p className="text-lg font-extrabold text-gray-900">₹50,000</p>
                </div>
                <button 
                  onClick={() => navigate('/tournaments')} 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95"
                >
                  Join Solo/Squad
                </button>
              </div>
            </div>

            {/* Card 2: Free Fire */}
            <div className="bg-[#f8fafc] rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-center mb-6">
                <span className="bg-red-100 text-red-700 text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest">
                  Free Fire
                </span>
                <span className="text-xs text-gray-500 font-semibold flex items-center gap-1">
                  🎮 Clash Squad
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-2">Clash Championship</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-8">
                Fast-paced custom match tournament. Fast reflexes, absolute team synergy, big prize payout.
              </p>
              <div className="flex justify-between items-end pt-4 border-t border-gray-100">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Prize Pool</p>
                  <p className="text-lg font-extrabold text-gray-900">₹30,000</p>
                </div>
                <button 
                  onClick={() => navigate('/tournaments')} 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95"
                >
                  Join Solo/Squad
                </button>
              </div>
            </div>

            {/* Card 3: Honor of Kings */}
            <div className="bg-[#f8fafc] rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-center mb-6">
                <span className="bg-blue-100 text-blue-700 text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest">
                  HoK
                </span>
                <span className="text-xs text-gray-500 font-semibold flex items-center gap-1">
                  🎮 5v5 Mode
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-2">Regional Masters</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-8">
                Showcase your strategic depth and mechanical outplays in the Honor of Kings state battle.
              </p>
              <div className="flex justify-between items-end pt-4 border-t border-gray-100">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Prize Pool</p>
                  <p className="text-lg font-extrabold text-gray-900">₹40,000</p>
                </div>
                <button 
                  onClick={() => navigate('/tournaments')} 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95"
                >
                  Join Solo/Squad
                </button>
              </div>
            </div>

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