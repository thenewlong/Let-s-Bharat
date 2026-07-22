import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { Helmet } from "react-helmet-async";

// 📂 Local Assets 
import banner1 from '../assets/images/banner1.png';
import banner2 from '../assets/images/banner2.png';
import banner3 from '../assets/images/banner3.png';

import hack1 from '../assets/images/hack1.png';
import hack2 from '../assets/images/hack2.png';
import hack3 from '../assets/images/hack3.png';
import hack4 from '../assets/images/hack4.png';

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
  
  // 🆕 Selected Hackathon State for Full Page View
  const [selectedHackathon, setSelectedHackathon] = useState(null);

  // 🚀 Banner Auto Slider Logic
  useEffect(() => {
    if (selectedHackathon) return; // Pause slider if detail page is open
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(slideInterval);
  }, [banners.length, selectedHackathon]);

  // 🛡️ Registration Logic with Auth Check
  const handleRegisterClick = (e, link) => {
    e.stopPropagation(); 
    if (user) {
      window.open(link, '_blank');
    } else {
      alert("Please Sign Up or Log In first to register for this event!");
      navigate('/auth'); 
    }
  };

  // 👁️ View Details - Ab full page render hoga aur top pe scroll hoga
  const handleViewDetails = (hackathon) => {
    setSelectedHackathon(hackathon);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Top pe le jane ke liye
  };

  const handleBackToList = () => {
    setSelectedHackathon(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ---------------------------------------------------------
  // 2. MOCK DATA 
  // ---------------------------------------------------------
  const hackathonsData = [
    {
      id: 1,
      title: "THE 3D WEBSITE DESIGN HACKATHON",
      description:
  "About the Challenge\n\n" +

  "The 3D Websites Hackathon is a global creative competition for developers, designers, artists, and creative coders who want to build immersive web experiences. Participants are encouraged to push the boundaries of modern web design by creating interactive 3D websites that captivate users through stunning visuals, smooth animations, and unique storytelling.\n\n" +

  "There are no limits on the theme or industry. Whether it's a futuristic world, portfolio, virtual museum, gaming experience, product showcase, educational platform, or a completely original concept, participants have the freedom to transform their imagination into an unforgettable digital experience.\n\n" +

  "Unlike traditional hackathons that focus mainly on solving technical problems, this event celebrates creativity, aesthetics, user engagement, and innovation. The goal is to design websites that leave a lasting impression and showcase the creative potential of modern web technologies.\n\n" +

  "What You Can Build\n\n" +

  "Create any web-based 3D experience using your preferred tools and frameworks. Projects should include meaningful 3D environments, interactive animations, creative UI/UX, and engaging visual storytelling. Individual participants and teams are both welcome.\n\n" +

  "Recommended Technologies\n\n" +

  "Participants may use Three.js, React Three Fiber, Babylon.js, Blender, Spline, WebGL, WebGPU, GSAP, Framer Motion, AI-powered design tools, open-source assets, or any other technology that enhances the final experience.\n\n" +

  "Submission Requirements\n\n" +

  "Each submission should include a live website URL, project description, source code repository, at least three screenshots, a list of technologies used, and an optional demonstration video explaining the project and its features.\n\n" +

  "Judging Criteria\n\n" +

  "Projects will be evaluated on creativity, originality, visual quality, user experience, interaction design, storytelling, animation, and the effective use of 3D technologies. Technical complexity is not the primary focus—an elegant and memorable experience is valued above all.\n\n" +

  "Prizes\n\n" +

  "🥇 First Place — $30 Cash + Official Certificate\n" +
  "🥈 Second Place — $15 Cash + Official Certificate\n" +
  "🥉 Third Place — $10 Cash + Official Certificate\n\n" +

  "The total prize pool is $55, with winners recognized for outstanding creativity, exceptional design, and innovative use of 3D web technologies.",
      prizePool: "$55",
      prizeValue: 10000, 
      date: "22 July - 31 July 2026",
      mode: "Online",
      teamSize: "1 - 4 Members",
      tags: ["AI/ML", "DESIGN", "WEB", "BEGINNER FRIENDLY"],
      status: "FEATURED",
      statusColor: "bg-yellow-500",
      category: "ONLINE",
      addedOn: "2026-06-21",
      image: hack1,
      link: "https://3d-websites-hackathon.devpost.com/?ref_feature=challenge&ref_medium=discover&_gl=1*1i4f97h*_gcl_au*MTY4MjE5NDAxNi4xNzgyMjk4NzIw*_ga*NDM0Njk0NDUwLjE3ODIyOTg3MjA.*_ga_0YHJK3Y10M*czE3ODQ3MDc3MTIkbzExJGcxJHQxNzg0NzA3NzEyJGo2MCRsMCRoMA..",
    },
    {
      id: 2,
      title: "INTERNATIONAL YOUTH AI COMPETITION 2026",
      description:
                  "About the Challenge\n\n" +

                   "The International Youth AI Competition is a global event that encourages young innovators to explore the power of artificial intelligence through creativity, technology, and problem-solving. Students from different countries and educational backgrounds are invited to develop AI-driven projects that demonstrate innovation, practical application, and positive social impact.\n\n" +

                   "The competition welcomes both individual participants and teams, providing a platform to showcase ideas, learn emerging AI technologies, and collaborate with like-minded innovators. Participants can create projects across multiple categories, including AI applications, innovative AI concepts, AI-generated visual storytelling, and AI-powered video creation.\n\n" +

                  "Competition Tracks\n\n" +

                  "Track 1 – AI Application Development\nBuild intelligent web, mobile, or desktop applications that solve real-world challenges using artificial intelligence and modern technologies.\n\n" +

                  "Track 2 – AI Innovation Proposal\nPresent a unique AI-powered concept with clear objectives, technical feasibility, expected impact, and future implementation strategy.\n\n" +

                  "Track 3 – AI Image Storytelling\nCreate a compelling visual story using AI-generated images with a structured narrative and creative presentation.\n\n" +

                  "Track 4 – AI Video Creation\nProduce an original AI-assisted video using modern generative AI tools, combining storytelling, visuals, voice, and editing techniques.\n\n" +

                "Submission Requirements\n\n" +
                "Participants should submit their project presentation, demonstration video, source code or deployment link (where applicable), and supporting documentation explaining the project's concept, development process, AI technologies used, and overall impact.\n\n" +

                "Awards & Recognition\n\n" +

                    "Outstanding submissions will receive Gold, Silver, Bronze, and Honorable Mention Awards. Winners will be recognized for innovation, creativity, technical excellence, and the responsible application of artificial intelligence.",
      prizePool: "3 Non-Cash Prize",
      prizeValue: 10000,
      date: "18 July - 01 Sep 2026",
      mode: "Online",
      teamSize: "1 - 4 Members",
      tags: ["MACHINE LEARNING / AI", "EDUCATION", "BEGINNER FRIENDLY"],
      status: "ONGOING",
      statusColor: "bg-emerald-500",
      category: "ONGOING",
      addedOn: "2026-06-18",
      image: hack2,
      link: "https://ai-yes-competition-30441.devpost.com/?ref_feature=challenge&ref_medium=discover&_gl=1*lw0sy9*_gcl_au*MTY4MjE5NDAxNi4xNzgyMjk4NzIw*_ga*NDM0Njk0NDUwLjE3ODIyOTg3MjA.*_ga_0YHJK3Y10M*czE3ODQ2OTkzODQkbzEwJGcxJHQxNzg0Njk5NDEyJGozMiRsMCRoMA..",
    },
    {
      id: 3,
      title: "THE BUILD WITH GEMINI-XPRIZE",
      description: "Turn your AI idea into a real startup in just 60 days. Build an AI-powered product, launch it to real users, generate revenue, and compete for $2 million in global prizes. Participants must create solutions that solve real-world problems, attract real users, and generate real revenue using Google Cloud and AI technologies. Compete for a share of the $2 million prize pool while building products that create meaningful impact.\n\nSubmission Requirements:\nSubmit your GitHub repository, a 3-minute demo video, project documentation, revenue and expense proof, AI usage evidence, and real customer evidence to demonstrate your project's functionality, business viability, and real-world impact.\n\nJudging Criteria:\n1. Innovation & Creativity\n2. Real-world Impact\n3. Technical Execution\n4. Business Viability\n\n" +
                     "Compete for a share of the $2M prize pool :\n" +
                      "Grand Prize: $500K for 1st Place.\n"+
                       "Top 5 teams receive major cash awards.\n"+
                       "15 runner-up teams earn $50K each.\n"+
                        "Category awards recognize outstanding AI innovation.\n"+
                       "Special prizes for Education, Entrepreneurship, Finance, Small Business, and Professional Services.",
      prizePool: "$2,000,000",
      prizeValue: 1000000,
      date: "16 June - 17 Aug 2026",
      mode: "Online",
      teamSize: "2 - 5 Members",
      tags: ["Productivity", "Education", "Machine Langauage"],
      status: "ONGOING",
      statusColor: "bg-purple-500",
      category: "ONGOING",
      addedOn: "2026-07-22",
      image: hack3,
      link: "https://xprize.devpost.com/?ref_feature=challenge&ref_medium=homepage-recommended-hackathons",
    },
    {
      id: 4,
      title: "NEW-LONG NORTHEAST YOUTH HACKATHON 2026",
      description:"Welcome to the NEW-LONG Hackathon 2026, an innovation challenge for students, developers, and aspiring entrepreneurs across Northeast India. This hackathon encourages participants to build innovative AI-powered solutions that solve real-world problems using modern technologies and AI APIs.\n\n" +
               "Participants can join individually or in teams of up to four members. All registrations must be completed with accurate information. Selected participants will receive further updates, announcements, and event instructions via Email and WhatsApp.\n\n" +
               "Teams can choose from 12 exciting problem statements, including Tribal Handicraft Marketplace, Tribal Fashion & Handloom Marketplace, Transport Rental System, Hospital Appointment Booking, Tutor Booking System, Local Service Booking, Jobs & Internship Portal, Home Service Booking, Home Rental Booking, Local Language Chatbot System, Smart Grocery Management, and Food Donation Platform.\n\n" +
               "Projects should demonstrate creativity, technical excellence, practical implementation, and real-world impact. Participants are encouraged to develop scalable, user-friendly, and AI-powered solutions that address community and business challenges across the region.\n\n" +
                "The total prize pool includes ₹12,000 for 1st Place, ₹7,500 for 2nd Place, and ₹3,000 for 3rd Place. All eligible participants will receive an official E-Certificate, while winning teams will gain recognition, exciting rewards, and the opportunity to showcase their innovative projects.",
      prizePool: "₹22,500",
      prizeValue: 75000,
      date: "24 - 25 May 2026",
      mode: "Online",
      teamSize: "1 - 4 Members",
      tags: ["MARKETPLACE", "AI API", "PROBLEM SLOVING"],
      status: "UPCOMING",
      statusColor: "bg-emerald-500",
      category: "UPCOMING",
      addedOn: "2026-06-14",
      image: hack4,
      link: "https://forms.gle/YqRNWbDc4vagh3qEA",
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
      
      <Helmet>
        <title>{selectedHackathon ? `${selectedHackathon.title} | Letsbharat` : 'Latest Hackathons in India | Letsbharat'}</title>
        <meta name="description" content="Discover AI Hackathons, Student Hackathons, Coding Competitions, Web Development Challenges, Startup Innovation Programs, College Hackathons and National Hackathons on Letsbharat." />
        <meta name="keywords" content="Hackathons India, Student Hackathon, AI Hackathon, Coding Competition, React Hackathon, Web Development Hackathon, Startup Hackathon, College Hackathon, National Hackathon, Programming Challenge" />
      </Helmet>
   
      {/* CSS Animations */}
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
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.4s ease-out forwards;
          }
        `}
      </style>

      {/* ========================================================= */}
      {/* 🔴 FULL PAGE DETAIL VIEW (Rendered if clicked)            */}
      {/* ========================================================= */}
      {selectedHackathon ? (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 animate-fade-in pb-20">
          
          {/* Back Button */}
          <button 
            onClick={handleBackToList}
            className="flex items-center gap-2 text-gray-500 hover:text-black font-bold mb-6 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            BACK TO HACKATHONS
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Image, Title & Long Description */}
            <div className="lg:col-span-2">
              <div className="relative w-full h-[300px] md:h-[450px] rounded-3xl overflow-hidden shadow-lg mb-8 bg-gray-100">
                <img src={selectedHackathon.image} alt={selectedHackathon.title} className="w-full h-full object-cover" />
                <div className={`absolute top-4 left-4 ${selectedHackathon.statusColor} text-white text-xs font-black px-3 py-1.5 rounded-lg uppercase tracking-wide shadow-md`}>
                  {selectedHackathon.status}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {selectedHackathon.tags.map((tag, i) => (
                  <span key={i} className="bg-gray-100 text-gray-600 border border-gray-200 text-[11px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-8 uppercase">
                {selectedHackathon.title}
              </h1>

              <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-[#f5a623]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  ABOUT HACKATHON
                </h3>
                {/* whitespace-pre-line ensures paragraphs render correctly */}
                <p className="text-gray-600 text-[15px] md:text-[17px] font-medium leading-relaxed whitespace-pre-line">
                  {selectedHackathon.description}
                </p>
              </div>
            </div>

            {/* Right Column: Sticky Info Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-xl">
                
                <h3 className="text-lg font-black text-gray-900 mb-6 border-b border-gray-100 pb-4">KEY DETAILS</h3>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🏆</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">Prize Pool</p>
                      <p className="text-xl font-black text-green-600">{selectedHackathon.prizePool}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">📅</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">Date</p>
                      <p className="text-base font-bold text-gray-900">{selectedHackathon.date}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">📍</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">Mode</p>
                      <p className="text-base font-bold text-gray-900">{selectedHackathon.mode}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">👥</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">Team Size</p>
                      <p className="text-base font-bold text-gray-900">{selectedHackathon.teamSize}</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={(e) => handleRegisterClick(e, selectedHackathon.link)}
                  className="w-full bg-[#f5a623] hover:bg-yellow-500 text-black font-black text-sm py-4 rounded-xl shadow-lg transition-transform active:scale-95 uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  REGISTER NOW 
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* ========================================================= */
        /* 🔵 ORIGINAL HACKATHONS LIST VIEW (Rendered by default)    */
        /* ========================================================= */
        <>
          {/* 1. HERO BANNER SECTION */}
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-[450px] rounded-3xl overflow-hidden bg-gray-900 shadow-xl group perspective-[1000px]">
              {banners.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                    index === currentSlide ? "opacity-50" : "opacity-0"
                  }`}
                  style={{ backgroundImage: `url(${img})` }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent flex flex-col justify-center px-6 md:px-16">
                <p className="text-[#f5a623] font-bold text-xs md:text-sm tracking-[0.2em] mb-3 uppercase">DISCOVER. COMPETE. INNOVATE.</p>
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
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {banners.map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentSlide ? "w-8 bg-[#f5a623]" : "w-2 bg-white/40"}`} />
                ))}
              </div>
            </div>
          </div>

          {/* 2. SEARCH & TABS SECTION */}
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
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
            <div className="flex overflow-x-auto pb-4 hide-scrollbar gap-3">
              {["ALL", "ONGOING", "UPCOMING", "ONLINE", "OFFLINE", "STUDENT", "OPEN TO ALL"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-full text-xs md:text-sm font-bold whitespace-nowrap border transition-all ${
                    activeTab === tab ? "bg-[#f5a623] border-[#f5a623] text-black shadow-md" : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* 3. LISTING HEADER & SORTING */}
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
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#f5a623] cursor-pointer shadow-sm"
            >
              <option value="NEWEST FIRST">NEWEST FIRST</option>
              <option value="PRIZE: HIGH TO LOW">PRIZE: HIGH TO LOW</option>
            </select>
          </div>

          {/* 4. HACKATHON CARDS GRID */}
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
                    onClick={() => handleViewDetails(hack)}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer group"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                      <img src={hack.image} alt={hack.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className={`absolute top-3 left-3 ${hack.statusColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide shadow-md`}>
                        {hack.status}
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="font-extrabold text-[17px] text-gray-900 leading-tight mb-2 uppercase group-hover:text-[#f5a623] transition-colors line-clamp-2">
                        {hack.title}
                      </h3>
                      <p className="text-sm text-gray-500 font-medium leading-snug mb-5 line-clamp-2">
                        {hack.description}
                      </p>
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
                      <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                        {hack.tags.map((tag, i) => (
                          <span key={i} className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                            {tag}
                          </span>
                        ))}
                      </div>
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
        </>
      )}

    </div>
  );
};

export default Hackathons;