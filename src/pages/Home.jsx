import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// 🎥 Apni saari videos yahan import karein
import video1 from '../assets/videos/s00.mp4';
import video2 from '../assets/videos/second.mp4';
import video3 from '../assets/videos/h2.mp4';
import video4 from '../assets/videos/learn-banner.mp4';


// Institution ke liye videos (Apne folde-bannerr ke hisaab se path aur naam theek kar lena)
import desktopInstitutionVideo from '../assets/videos/inst4.mp4';
import mobileInstitutionVideo from '../assets/videos/inst001.mp4';


//hackathons
import desktopVideo from '../assets/videos/hacka1.mp4';
import mobileVideo from '../assets/videos/hacka01.mp4';


//interships
import desktopVio from '../assets/videos/lap000.mp4';
import mobileVio from '../assets/videos/poo.mp4';



//tournaments
import desktopVeo from '../assets/videos/learn001.mp4';
import mobileVeo from '../assets/videos/learn002.mp4';





// Inko file ke sabse upar import karna (apne actual folder path ke hisaab se adjust kar lena)
import letsBharatLogo from '../assets/images/logos3.jpeg'; 
import founderProfile from '../assets/images/profile1.jpg';


// 📂 DYNAMIC SLIDES DATA (Replace video variables with your actual imports)


const heroSlides = [
  {
    id: 1,
    videoSrc: video1,
    title1: "INDIA'S STUDENTS ",
    titleHighlight: "LEARNING & OPPORTUNITY ",
    title2: "PLATFORM",
    subtitle: "CONNECT. CREATE IMPACT. SUCCEED.",
    desc: "Discover hackathons, institutions, internships, and learning opportunities. Learn new skills, share knowledge, and build your future with Letsbharat.",
    btn1Text: "Institutions", btn1Link: "/Institutions",
    btn2Text: "Hackathons", btn2Link: "/hackathons"
  },
  {
    id: 2,
    videoSrc: video2,
    title1: "KICKSTART YOUR CAREER WITH",
    titleHighlight: "TOP INTERNSHIPS",
    title2: "& OPEN ROLES",
    subtitle: "LEARN. BUILD. GROW.",
    desc: "Get real-world experience. Apply for remote and onsite internships at top tech companies.",
    btn1Text: "Apply Now", btn1Link: "/internships",
    btn2Text: "View All", btn2Link: "/internships"
  },
  {
    id: 3,
    videoSrc: video3,
    title1: "BUILD INNOVATIVE SOLUTIONS",
    titleHighlight: "MEGA HACKATHONS",
    title2: "AROUND THE REGION",
    subtitle: "CODE. CREATE. CONQUER.",
    desc: "Participate in intense coding battles. Solve real-world problems and win massive prizes.",
    btn1Text: "Register Now", btn1Link: "/hackathons",
    btn2Text: "Past Events", btn2Link: "/events"
  },
  {
    id: 4,
    videoSrc: video4,
    title1: "LEARN. CREATE. SHARE.",
    titleHighlight: "BUILD YOUR OWN COURSE",
    title2: "& GROW TOGETHER",
    subtitle: "LEARN. CREATE. GROW.",
    desc: "Explore courses created by students, educators, and creators — or create and share your own course with the Learning Hub community.",
    btn1Text: "Explore Courses", btn1Link: "/learninghub",
    btn2Text: "Create a Course", btn2Link: "/learninghub/create"
  }
];

// 🗂️ GLOBAL SEARCH DATA
const globalSearchData = [
  // Institutions
  { id: 1, title: "Nomeo AI 2.0 API Integration", category: "Institution", link: "/institutions/nomeo" },
  { id: 2, title: "Tipra Social Platform Showcase", category: "Institution", link: "/institutions/tipra" },
  { id: 3, title: "NIELIT Agartala Campus & Courses", category: "Institution", link: "/institutions/nielit-agartala" },
  { id: 4, title: "Techno College of Engineering Agartala (TCEA)", category: "Institution", link: "/institutions/tcea" },
  { id: 5, title: "Independent Golden Jubilee Govt Higher Secondary School", category: "Institution", link: "/institutions/golden-jubilee-pasighat" },
  // Hackathons
  { id: 6, title: "React Native App Development Hackathon", category: "Hackathon", link: "/hackathons/react-native" },
  { id: 7, title: "Ignitia / Prayukti 2026 Poster Expo", category: "Hackathon", link: "/hackathons/ignitia-prayukti" },
  { id: 8, title: "Smart India Hackathon (SIH) 2026", category: "Hackathon", link: "/hackathons/sih-2026" },
  { id: 9, title: "Tripura State Tech Innovation Challenge", category: "Hackathon", link: "/hackathons/tripura-innovation" },
  // LearningHub
  { id: 10, title: "Full Stack React Native & Firebase Development", category: "LearningHub", link: "/learninghub/react-native-firebase" },
  { id: 11, title: "NOMEO STUDZ Study Materials & PDF Notes", category: "LearningHub", link: "/learninghub/nomeo-studz" },
  { id: 12, title: "Gemini API Chatbot & Image Analysis Tutorial", category: "LearningHub", link: "/learninghub/gemini-api" },
  { id: 13, title: "AI for Young Minds - Computer Syllabus", category: "LearningHub", link: "/learninghub/ai-young-minds" },
  { id: 14, title: "The Newlong Hub E-commerce Training", category: "LearningHub", link: "/learninghub/newlong-hub" },
  // Internships
  { id: 15, title: "Frontend Developer Internship", category: "Internship", link: "/internships/frontend" },
  { id: 16, title: "UI/UX Design Internship (Figma & Adobe XD)", category: "Internship", link: "/internships/ui-ux-design" },
  { id: 17, title: "Data Science & Machine Learning Internship", category: "Internship", link: "/internships/data-science" },
  // Jobs
  { id: 18, title: "Backend Node.js Developer", category: "Jobs", link: "/jobs/backend-developer" },
  { id: 19, title: "React Developer Job Opportunities", category: "Jobs", link: "/jobs/react-developer" },
  // Resources
  { id: 20, title: "Open Source Contribution & GitHub Guidelines", category: "Resources", link: "/resources/open-source" }
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

  // Animation trigger logic
  useEffect(() => {
    setIsAnimating(false);
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 50); 
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Video slider automatic loop function
  const handleVideoEnd = () => {
    setIsAnimating(false); 
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, 190); 
  };

  // Search Filter Logic
  const filteredResults = globalSearchData.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Click outside logic to close dropdown
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
        className={`inline-block transition-all duration-500 ease-out font-black ${isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'}`}
        style={{ 
          transitionDelay: `${baseDelay + index * 20}ms`,
          marginRight: char === " " ? "0.25em" : "0"
        }}
      >
        {char}
      </span>
    ));
  };


// ==========================================
  // SECTION: INSTITUTION VIDEO & INTERACTIVE BUTTON
  // ==========================================
  const institutionSectionRef = useRef(null);
  const institutionButtonRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      const btn = institutionButtonRef.current;

      // 1. Scroll karke aane wali 3D Entry Animation (Niche se upar)
      gsap.set(btn, { transformPerspective: 1000, transformStyle: "preserve-3d" });
      
      gsap.fromTo(btn,
        { y: 80, opacity: 0, scale: 0.8, rotationX: -30 },
        { 
          y: 0, opacity: 1, scale: 1, rotationX: 0, 
          duration: 1.2, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: institutionSectionRef.current,
            start: "top 75%", 
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // 2. Premium Mouse & Touch Interaction (Gen Z Feel)
      const onEnter = () => gsap.to(btn, { scale: 1.05, duration: 0.4, ease: "power3.out", boxShadow: "0px 10px 30px rgba(255, 255, 255, 0.2)" });
      const onLeave = () => gsap.to(btn, { scale: 1, duration: 0.4, ease: "power3.out", boxShadow: "0px 0px 0px rgba(255, 255, 255, 0)" });
      const onPress = () => gsap.to(btn, { scale: 0.95, duration: 0.1, ease: "power1.inOut" });
      const onRelease = () => gsap.to(btn, { scale: 1.05, duration: 0.2, ease: "back.out(2)" });

      // Add Listeners
      if (btn) {
        btn.addEventListener("mouseenter", onEnter);
        btn.addEventListener("mouseleave", onLeave);
        btn.addEventListener("mousedown", onPress);
        btn.addEventListener("mouseup", onRelease);
        btn.addEventListener("touchstart", onPress, { passive: true });
        btn.addEventListener("touchend", onLeave, { passive: true });
      }

      // Cleanup
      return () => {
        if (btn) {
          btn.removeEventListener("mouseenter", onEnter);
          btn.removeEventListener("mouseleave", onLeave);
          btn.removeEventListener("mousedown", onPress);
          btn.removeEventListener("mouseup", onRelease);
          btn.removeEventListener("touchstart", onPress);
          btn.removeEventListener("touchend", onLeave);
        }
      };
    }, institutionSectionRef);

    return () => ctx.revert();
  }, []);


  
// ==========================================
  // SECTION 2: HACKATHONS VIDEO & INTERACTIVE BUTTON
  // ==========================================
  const hackathonSectionRef = useRef(null);
  const hackathonButtonRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      const btn = hackathonButtonRef.current;

      // 1. Scroll karke aane wali 3D Entry Animation (Niche se upar)
      gsap.set(btn, { transformPerspective: 1000, transformStyle: "preserve-3d" });
      
      gsap.fromTo(btn,
        { y: 80, opacity: 0, scale: 0.8, rotationX: -30 },
        { 
          y: 0, opacity: 1, scale: 1, rotationX: 0, 
          duration: 1.2, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: hackathonSectionRef.current,
            start: "top 75%", 
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // 2. Premium Mouse & Touch Interaction (Gen Z Feel)
      const onEnter = () => gsap.to(btn, { scale: 1.05, duration: 0.4, ease: "power3.out", boxShadow: "0px 10px 30px rgba(255, 255, 255, 0.2)" });
      const onLeave = () => gsap.to(btn, { scale: 1, duration: 0.4, ease: "power3.out", boxShadow: "0px 0px 0px rgba(255, 255, 255, 0)" });
      const onPress = () => gsap.to(btn, { scale: 0.95, duration: 0.1, ease: "power1.inOut" });
      const onRelease = () => gsap.to(btn, { scale: 1.05, duration: 0.2, ease: "back.out(2)" });

      // Add Listeners
      if (btn) {
        btn.addEventListener("mouseenter", onEnter);
        btn.addEventListener("mouseleave", onLeave);
        btn.addEventListener("mousedown", onPress);
        btn.addEventListener("mouseup", onRelease);
        btn.addEventListener("touchstart", onPress, { passive: true });
        btn.addEventListener("touchend", onLeave, { passive: true });
      }

      // Cleanup
      return () => {
        if (btn) {
          btn.removeEventListener("mouseenter", onEnter);
          btn.removeEventListener("mouseleave", onLeave);
          btn.removeEventListener("mousedown", onPress);
          btn.removeEventListener("mouseup", onRelease);
          btn.removeEventListener("touchstart", onPress);
          btn.removeEventListener("touchend", onLeave);
        }
      };
    }, hackathonSectionRef);

    return () => ctx.revert();
  }, []);
  
// ==========================================
  // SECTION 4: INTERNSHIPS VIDEO & INTERACTIVE BUTTON
  // ==========================================
  const internshipSectionRef = useRef(null);
  const internshipButtonRef = useRef(null);

  useEffect(() => {
    // Scroll Animation Logic
    let ctx = gsap.context(() => {
      const btn = internshipButtonRef.current;
      
      gsap.set(btn, { transformPerspective: 1000, transformStyle: "preserve-3d" });
      
      gsap.fromTo(btn,
        { y: 80, opacity: 0, scale: 0.8, rotationX: -30 },
        { 
          y: 0, opacity: 1, scale: 1, rotationX: 0, 
          duration: 1.2, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: internshipSectionRef.current,
            start: "top 75%", 
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }, internshipSectionRef);

    return () => ctx.revert(); // Safe cleanup
  }, []);

  // 🚀 Premium Mouse & Touch Interaction (React Native Way - No Errors)
  const internEnter = () => gsap.to(internshipButtonRef.current, { scale: 1.05, duration: 0.4, ease: "power3.out", boxShadow: "0px 10px 30px rgba(255, 255, 255, 0.2)" });
  const internLeave = () => gsap.to(internshipButtonRef.current, { scale: 1, duration: 0.4, ease: "power3.out", boxShadow: "0px 0px 0px rgba(255, 255, 255, 0)" });
  const internPress = () => gsap.to(internshipButtonRef.current, { scale: 0.95, duration: 0.1, ease: "power1.inOut" });
  const internRelease = () => gsap.to(internshipButtonRef.current, { scale: 1.05, duration: 0.2, ease: "back.out(2)" });



// ==========================================
  // SECTION 5: TOURNAMENTS VIDEO & INTERACTIVE BUTTON
  // ==========================================
  const tournamentSectionRef = useRef(null);
  const tournamentButtonRef = useRef(null);

  useEffect(() => {
    // GSAP Scroll Animation Logic
    let ctx = gsap.context(() => {
      const btn = tournamentButtonRef.current;
      
      gsap.set(btn, { transformPerspective: 1000, transformStyle: "preserve-3d" });
      
      gsap.fromTo(btn,
        { y: 80, opacity: 0, scale: 0.8, rotationX: -30 },
        { 
          y: 0, opacity: 1, scale: 1, rotationX: 0, 
          duration: 1.2, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: tournamentSectionRef.current,
            start: "top 75%", 
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }, tournamentSectionRef);

    return () => ctx.revert(); // Safe cleanup
  }, []);

  // 🚀 Premium Mouse & Touch Interaction (React Native Way - No Errors)
  const tournaEnter = () => gsap.to(tournamentButtonRef.current, { scale: 1.05, duration: 0.4, ease: "power3.out", boxShadow: "0px 10px 30px rgba(255, 255, 255, 0.2)" });
  const tournaLeave = () => gsap.to(tournamentButtonRef.current, { scale: 1, duration: 0.4, ease: "power3.out", boxShadow: "0px 0px 0px rgba(255, 255, 255, 0)" });
  const tournaPress = () => gsap.to(tournamentButtonRef.current, { scale: 0.95, duration: 0.1, ease: "power1.inOut" });
  const tournaRelease = () => gsap.to(tournamentButtonRef.current, { scale: 1.05, duration: 0.2, ease: "back.out(2)" });


  return (
    <div className="w-full font-sans overflow-x-hidden">
      
      
      <Helmet>
        <title>
          Letsbharat | India's Student Platform for Institutions, Hackathons, Internships, Jobs, Learning Hub & Resource.
        </title>

        <meta
          name="description"
          content="Letsbharat helps students discover Institutions, Hackathons, Jobs, Internships, Learning Hub & Resources across in India."
        />

        <meta
          name="keywords"
          content="Letsbharat, Institutions, Hackathons, Jobs, Internships, Learning Hub, Resources, Student Platform, India, Opportunities, Career Growth, Skill Development"
        />
      

      <script type="application/ld+json">
{`
{
  "@context":"https://schema.org",
  "@type":"Organization",
  "name":"Letsbharat",
  "url":"https://www.letsbharat.com",
  "logo":"https://www.letsbharat.com/logos2.jpeg",
  "founder":{
    "@type":"Person",
    "name":"Newlong Debbarma"
  },
  "sameAs":[]
}
`}
</script>

<script type="application/ld+json">
{`
{
 "@context":"https://schema.org",
 "@type":"WebSite",
 "name":"Letsbharat",
 "url":"https://www.letsbharat.com",
 "potentialAction":{
   "@type":"SearchAction",
   "target":"https://www.letsbharat.com/search?q={search_term_string}",
   "query-input":"required name=search_term_string"
 }
}
`}
</script>
</Helmet>

      {/* Hero Section */}
  
   


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
      {/* SECTION 1: CENTERED CINEMATIC HERO SECTION                */}
      {/* ========================================================= */}
      <section className="relative w-full h-[100dvh] min-h-[600px] flex flex-col justify-center items-center bg-[#111111] overflow-hidden">
        
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

        {/* 🌑 Deep Clean Overlay */}
        <div className="absolute inset-0 bg-black/60 mix-blend-multiply z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 z-0"></div>

        {/* 🎨 FLOATING BACKGROUND ICONS (Hidden on Mobile, Visible on PC) */}
        <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
          {/* Left Top */}
          <div className="absolute top-[20%] left-[8%] animate-float-slow opacity-40 flex flex-col items-center">
            <svg className="w-14 h-14 text-white mb-2" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
            <p className="text-white font-bold tracking-wide text-md text-outline transform -rotate-6">Skill Diversification</p>
          </div>
          {/* Left Bottom */}
          <div className="absolute bottom-[20%] left-[12%] animate-float-slow delay-1 opacity-40 flex flex-col items-center">
            <svg className="w-14 h-14 text-white mb-2" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            <p className="text-white font-bold tracking-wide text-md text-outline transform rotate-6">Verified Institutions</p>
          </div>
          {/* Right Top */}
          <div className="absolute top-[15%] right-[12%] animate-float-slow delay-2 opacity-40 flex flex-col items-center">
            <svg className="w-14 h-14 text-white mb-2" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
            <p className="text-white font-bold tracking-wide text-md text-outline transform rotate-3">Opportunities</p>
          </div>
          {/* Right Bottom */}
          <div className="absolute bottom-[25%] right-[8%] animate-float-slow delay-3 opacity-40 flex flex-col items-center">
            <svg className="w-14 h-14 text-white mb-2" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
            <p className="text-white font-bold tracking-wide text-md text-outline transform -rotate-3">Career Growth</p>
          </div>
        </div>

        {/* 🔍 TOP SEARCH BAR (Desktop & Mobile) */}
        <div className="absolute top-20 md:top-24 left-1/2 transform -translate-x-1/2 w-[92%] max-w-2xl z-50" ref={searchRef}>
          <div className={`relative transition-all duration-700 ease-out ${isAnimating ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search hackathons, institutions, internships..."
              className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm md:text-base rounded-full py-3.5 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:bg-white/20 transition-all placeholder-gray-300 shadow-xl"
            />
            
            {/* Search Dropdown */}
            {isSearchFocused && searchQuery && (
              <div className="absolute top-full mt-2 w-full bg-black/90 backdrop-blur-xl border border-white/10 shadow-2xl rounded-xl py-2 px-2 z-[60] max-h-60 overflow-y-auto">
                {filteredResults.length > 0 ? (
                  filteredResults.map((item, index) => (
                    <div 
                      key={index}
                      onClick={() => {
                        setIsSearchFocused(false);
                        setSearchQuery("");
                        navigate(item.link || '/'); 
                      }}
                      className="block px-4 py-3 text-sm font-semibold text-gray-200 hover:bg-white/10 hover:text-[#f5a623] rounded-lg transition-colors cursor-pointer"
                    >
                      <span className="text-[#f5a623] text-[10px] md:text-xs mr-2 uppercase border border-[#f5a623]/30 px-2 py-0.5 rounded-full">{item.category}</span>
                      {item.title}
                    </div>
                  ))
                ) : (
                  <p className="px-4 py-3 text-sm text-gray-400 text-center">No results found...</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 📝 MAIN HERO CONTENT (CENTERED ALIGNMENT) */}
        <div className="relative z-10 w-full flex-grow flex flex-col items-center justify-center text-center px-4 mt-20 md:mt-16">
          
          {/* Main Title (Responsive White + Yellow 3D Text) */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white uppercase drop-shadow-2xl tracking-tight flex flex-col items-center gap-1 sm:gap-2 w-full">
            <div className="flex flex-wrap justify-center overflow-hidden">
              {renderAnimatedLetters(currentSlide?.title1 || "", isAnimating, 0)}
            </div>
            {/* 🟡 YELLOW HIGHLIGHT TEXT */}
            <div className="flex flex-wrap justify-center overflow-hidden text-[#f5a623] drop-shadow-[0_0_10px_rgba(245,166,35,0.3)]">
              {renderAnimatedLetters(currentSlide?.titleHighlight || "", isAnimating, 300)}
            </div>
            <div className="flex flex-wrap justify-center overflow-hidden">
              {renderAnimatedLetters(currentSlide?.title2 || "", isAnimating, 600)}
            </div>
          </h1>

          {/* Subtitle / Description (Responsive Size) */}
          <p className={`text-neutral-200 font-sans text-xs sm:text-sm md:text-lg max-w-[95%] sm:max-w-2xl mt-4 md:mt-8 font-medium leading-relaxed drop-shadow-md transition-all duration-700 ease-out px-2 ${
            isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`} style={{ transitionDelay: '900ms' }}>
            {currentSlide?.desc}
          </p>
          
          {/* Buttons (Responsive Stack on Mobile, Row on PC) */}
          <div className={`flex flex-col sm:flex-row justify-center w-[90%] sm:w-auto gap-3 sm:gap-4 mt-8 md:mt-10 transition-all duration-700 ease-out ${
            isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`} style={{ transitionDelay: '1100ms' }}>
            
            {/* 🟡 PRIMARY YELLOW BUTTON */}
            <button 
              onClick={() => navigate(currentSlide?.btn1Link)} 
              className="w-full sm:w-auto bg-[#f5a623] hover:bg-[#e0961c] text-black px-8 py-3.5 md:py-4 rounded-lg font-black tracking-widest transition-all active:scale-95 uppercase text-xs md:text-sm shadow-xl"
            >
              {currentSlide?.btn1Text}
            </button>

            {/* ⚪ SECONDARY WHITE BUTTON */}
            {currentSlide?.btn2Text && (
              <button 
                onClick={() => navigate(currentSlide?.btn2Link)} 
                className="w-full sm:w-auto bg-transparent hover:bg-white/10 backdrop-blur-sm border border-white/50 text-white px-8 py-3.5 md:py-4 rounded-lg font-bold tracking-widest transition-all active:scale-95 uppercase text-xs md:text-sm shadow-xl"
              >
                {currentSlide?.btn2Text}
              </button>
            )}
            
          </div>

          {/* Video Progress Indicators */}
          <div className="flex justify-center gap-2 mt-12 absolute bottom-6 md:bottom-10">
            {heroSlides.map((_, index) => (
              <button 
                key={index} 
                onClick={() => {
                  setIsAnimating(false);
                  setTimeout(() => setCurrentIndex(index), 190);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === currentIndex ? "w-10 bg-[#f5a623]" : "w-3 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

        </div>
      </section>
      

{/* ========================================================= */}
      {/* SECTION: INSTITUTION (Gen-Z Premium Background)           */}
      {/* ========================================================= */}
      <section 
        ref={institutionSectionRef}
        id="institution"
        className="relative w-full h-[70vh] md:h-screen bg-black overflow-hidden flex flex-col justify-end items-center pb-12 md:pb-20 border-t border-white/5"
      >
        {/* 📱 PHONE DEVICE VIDEO (Clear visibility) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover block md:hidden filter brightness-[0.85]"
          src={mobileInstitutionVideo} // Mobile video import variable yahan hai
        />

        {/* 💻 LAPTOP/DESKTOP VIDEO (Clear visibility) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover hidden md:block filter brightness-[0.85]"
          src={desktopInstitutionVideo} // Desktop video import variable yahan hai
        />

        {/* 🌑 BOTTOM GRADIENT ONLY (Taki video clear rahe, bas bottom me button pe focus aaye) */}
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none z-10"></div>

        {/* 🚀 SMALL, PREMIUM 3D BUTTON */}
        <div className="relative z-20 w-full px-4 flex justify-center perspective-[1000px]">
          
          <button 
            ref={institutionButtonRef}
            onClick={() => navigate('/Institutions')} // Yahan apna institution route daal diya
            className="group relative inline-flex items-center justify-center px-6 py-3.5 md:px-8 md:py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full font-medium transition-colors duration-300 hover:bg-white hover:text-black overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2.5 tracking-[0.15em] uppercase text-xs md:text-sm">
             Explore Institution
              <svg className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            {/* Minimal Reflection Effect */}
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out z-0"></div>
          </button>

        </div>
      </section>


{/* ========================================================= */}
      {/* SECTION 2: HACKATHONS (Gen-Z Premium Background)          */}
      {/* ========================================================= */}
      <section 
        ref={hackathonSectionRef}
        id="hackathons"
        // items-end add kiya hai taaki button niche rahe, aur pb-12 padding di hai
        className="relative w-full h-[70vh] md:h-screen bg-black overflow-hidden flex flex-col justify-end items-center pb-12 md:pb-20 border-t border-white/5"
      >
        {/* 📱 PHONE DEVICE VIDEO (Clear visibility) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          // brightness-[0.8] kiya hai taaki video text mast aur clear dikhe
          className="absolute inset-0 w-full h-full object-cover block md:hidden filter brightness-[0.85]"
          src={mobileVideo}
        />

        {/* 💻 LAPTOP/DESKTOP VIDEO (Clear visibility) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover hidden md:block filter brightness-[0.85]"
          src={desktopVideo}
        />

        {/* 🌑 BOTTOM GRADIENT ONLY (Taki video clear rahe, bas bottom me button pe focus aaye) */}
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none z-10"></div>

        {/* 🚀 SMALL, PREMIUM 3D BUTTON */}
        <div className="relative z-20 w-full px-4 flex justify-center perspective-[1000px]">
          
          <button 
            ref={hackathonButtonRef}
            onClick={() => navigate('/hackathons')}
            // px-6 py-3.5 karke button ko chota aur sleek banaya hai
            className="group relative inline-flex items-center justify-center px-6 py-3.5 md:px-8 md:py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full font-medium transition-colors duration-300 hover:bg-white hover:text-black overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2.5 tracking-[0.15em] uppercase text-xs md:text-sm">
             Explore Hackathons
              <svg className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            {/* Minimal Reflection Effect */}
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out z-0"></div>
          </button>

        </div>
      </section>

{/* ========================================================= */}
      {/* SECTION 4: INTERNSHIPS (Gen-Z Premium Background)         */}
      {/* ========================================================= */}
      <section 
        ref={internshipSectionRef}
        id="internships"
        className="relative w-full h-[70vh] md:h-screen bg-black overflow-hidden flex flex-col justify-end items-center pb-12 md:pb-20 border-t border-white/5"
      >
        {/* 📱 PHONE DEVICE VIDEO */}
        {/* Apna Mobile Internship Video path yahan do */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover block md:hidden filter brightness-[0.85]"
          src={mobileVio}
        />

        {/* 💻 LAPTOP/DESKTOP VIDEO */}
        {/* Apna Desktop Internship Video path yahan do */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover hidden md:block filter brightness-[0.85]"
          src={desktopVio}
        />

        {/* 🌑 BOTTOM GRADIENT ONLY (Taki button background se clash na kare) */}
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none z-10"></div>

        {/* 🚀 SMALL, PREMIUM 3D BUTTON (With Safe React Events) */}
        <div className="relative z-20 w-full px-4 flex justify-center perspective-[1000px]">
          
          <button 
            ref={internshipButtonRef}
            onClick={() => navigate('/internships')}
            // React Event Handlers (Error Free Logic)
            onMouseEnter={internEnter}
            onMouseLeave={internLeave}
            onMouseDown={internPress}
            onMouseUp={internRelease}
            onTouchStart={internPress}
            onTouchEnd={internLeave}
            className="group relative inline-flex items-center justify-center px-6 py-3.5 md:px-8 md:py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full font-medium transition-colors duration-300 hover:bg-white hover:text-black overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2.5 tracking-[0.15em] uppercase text-xs md:text-sm">
              Explore Internships
              <svg className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            {/* Premium Shine Hover Effect */}
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out z-0"></div>
          </button>

        </div>
      </section>

{/* ========================================================= */}
      {/* SECTION 5: TOURNAMENTS (Gen-Z Premium Background)         */}
      {/* ========================================================= */}
      <section 
        ref={tournamentSectionRef}
        id="tournaments"
        className="relative w-full h-[70vh] md:h-screen bg-black overflow-hidden flex flex-col justify-end items-center pb-12 md:pb-20 border-t border-white/5"
      >
        {/* 📱 PHONE DEVICE VIDEO */}
        {/* Apna Mobile Tournament Video path yahan do */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover block md:hidden filter brightness-[0.85]"
          src={mobileVeo}
        />

        {/* 💻 LAPTOP/DESKTOP VIDEO */}
        {/* Apna Desktop Tournament Video path yahan do */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover hidden md:block filter brightness-[0.85]"
          src={desktopVeo}
        />

        {/* 🌑 BOTTOM GRADIENT ONLY (Taki button background se clash na kare) */}
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none z-10"></div>

        {/* 🚀 SMALL, PREMIUM 3D BUTTON (With Safe React Events) */}
        <div className="relative z-20 w-full px-4 flex justify-center perspective-[1000px]">
          
          <button 
            ref={tournamentButtonRef}
            onClick={() => navigate('/learninghub')}
            // React Event Handlers (Error Free Logic)
            onMouseEnter={tournaEnter}
            onMouseLeave={tournaLeave}
            onMouseDown={tournaPress}
            onMouseUp={tournaRelease}
            onTouchStart={tournaPress}
            onTouchEnd={tournaLeave}
            className="group relative inline-flex items-center justify-center px-6 py-3.5 md:px-8 md:py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full font-medium transition-colors duration-300 hover:bg-white hover:text-black overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2.5 tracking-[0.15em] uppercase text-xs md:text-sm">
              Explore Learning Hub
              <svg className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            {/* Premium Shine Hover Effect */}
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out z-0"></div>
          </button>

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
                  Letsbharat is a platform dedicated to empowering students and innovators by connecting them with opportunities, communities and resources.
                </p>
              </div>

              <div>
                <h3 className="text-white text-sm font-bold tracking-widest uppercase mb-4 flex flex-col">
                  Founder of Lets <span className="text-[#ffcc00]">bharat</span>
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
                <li><button onClick={() => navigate('/institutions')} className="hover:text-[#ffcc00] flex items-center gap-2 transition-colors">👥 Institutions</button></li>
                <li><button onClick={() => navigate('/hackathons')} className="hover:text-[#ffcc00] flex items-center gap-2 transition-colors">🏆 Hackathons</button></li>
                <li><button onClick={() => navigate('/internships')} className="hover:text-[#ffcc00] flex items-center gap-2 transition-colors">💼 Internships</button></li>
                <li><button onClick={() => navigate('/learninghub')} className="hover:text-[#ffcc00] flex items-center gap-2 transition-colors">🎮 Learning Hub</button></li>
                <li><button onClick={() => navigate('/resources')} className="hover:text-[#ffcc00] flex items-center gap-2 transition-colors">📚 Free Resources</button></li>
                <li><button onClick={() => navigate('/about')} className="hover:text-[#ffcc00] flex items-center gap-2 transition-colors">📢About Us </button></li>
                <li><button onClick={() => navigate('/contact')} className="hover:text-[#ffcc00] flex items-center gap-2 transition-colors">✉ Contact Us</button></li>
                
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
                <a href="https://wa.me/qr/EZC25VUHXVVMM1" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] transition-all group">
                  <svg className="w-4 h-4 fill-gray-400 group-hover:fill-white transition-colors" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 .003 5.378.003 12.023c0 2.124.553 4.195 1.603 6.02L.05 24l6.096-1.597c1.761.961 3.743 1.468 5.882 1.468 6.643 0 12.025-5.38 12.025-12.026C24.053 5.381 18.675 0 12.031 0zm7.151 17.15c-.297.839-1.733 1.547-2.424 1.644-.551.077-1.258.12-3.52-.816-3.415-1.411-5.632-4.908-5.803-5.135-.17-.227-1.385-1.844-1.385-3.518 0-1.673.87-2.496 1.184-2.813.243-.243.684-.36 1.1-.36.137 0 .262.006.376.012.336.015.503.036.726.57.28.67 1.01 2.457 1.101 2.64.09.183.151.396.037.623-.113.228-.172.365-.34.562-.17.198-.359.428-.516.593-.17.18-.355.378-.146.738.208.36 1.01 1.666 2.19 2.716 1.521 1.353 2.8 1.77 3.16 1.954.36.183.574.153.79-.092.217-.244.927-1.073 1.176-1.442.25-.368.5-.306.83-.183.33.122 2.091.986 2.451 1.168.361.183.603.275.69.428.087.153.087.886-.21 1.725z"/></svg>
                </a>
                {/* Facebook */}
                <a href="https://www.facebook.com/share/18v8B5maNK/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-[#1877f2] hover:border-[#1877f2] transition-all group">
                  <svg className="w-4 h-4 fill-gray-400 group-hover:fill-white transition-colors" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>

              {/* Direct Contact Details */}
              <div className="space-y-3 bg-[#121826] p-4 rounded-xl border border-gray-800">
                <a href="mailto:HELLO@LETSBHARAT.COM" className="flex items-center gap-3 text-gray-400 hover:text-[#ffcc00] transition-colors text-xs font-medium tracking-wide">
                  <span>✉</span> letsbharatofficial@gmail.com
                </a>
                <a href="tel:+919876543210" className="flex items-center gap-3 text-gray-400 hover:text-[#ffcc00] transition-colors text-xs font-medium tracking-wide">
                  <span>📞</span> +91 XXXX203
                </a>
                <div className="flex items-center gap-3 text-gray-400 text-xs font-medium tracking-wide uppercase">
                  <span>📍</span>India
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
    {/* a tag ko Link tag se replace kar diya aur correct path de diya */}
    <Link to="/privacypolicy" className="hover:text-white transition-colors">PRIVACY POLICY</Link>
    <Link to="/termsofservice" className="hover:text-white transition-colors">TERMS OF SERVICE</Link>
  </div>
</div>
          
        </div>
      </footer>

    </div>
  );
};

export default Home;