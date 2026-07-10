import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// 📂 Apne local assets folder se images import karo (.jpeg extension ke sath)
import banner1 from '../assets/images/banner1.jpeg';
import banner2 from '../assets/images/banner2.jpeg';
import banner3 from '../assets/images/banner3.jpeg';

import hack1 from '../assets/images/hack1.jpeg';
import hack2 from '../assets/images/hack2.jpeg';
import hack3 from '../assets/images/hack3.jpeg';
import hack4 from '../assets/images/hack4.jpeg';

const Hackathons = () => {
  // ---------------------------------------------------------
  // 1. BANNER SLIDER STATE & LOGIC
  // ---------------------------------------------------------
  const banners = [banner1, banner2, banner3];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All Events");
  
  const { user } = useAuth();
  const navigate = useNavigate();

  // 🛡️ Security Guard Logic
  const handleApplyClick = (e, link) => {
    e.preventDefault(); 
    
    // Check karega ki user logged in hai ya nahi
    if (user) {
      window.open(link, '_blank'); // Agar login hai toh Google Form/Link khulega
    } else {
      alert("Please Sign Up or Log In first to register for this event!");
      navigate('/auth'); // Login nahi hai toh Auth page par bhej dega
    }
  };
  
  // 🚀 Auto Slider Logic (Har 4 seconds mein smoothly change hoga)
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(slideInterval);
  }, [banners.length]);
 
  // ---------------------------------------------------------
  // 2. HACKATHON DATA (Details, Info, Eligibility, Links)
  // ---------------------------------------------------------
  const hackathonsData = [
    {
      id: 1,
      title: "Northeast Innovators Challenge 2026",
      description: "Build innovative solutions for real-world problems and stand a chance to win exciting prizes.",
      eligibility: "Open to all Diploma & B.Tech Students",
      date: "20 Aug - 22 Aug, 2026",
      location: "Agartala, Tripura (Offline)",
      team: "Team Event (2-4 members)",
      prize: "₹50,000 + Incubation",
      status: "FEATURED",
      tabCategory: "Upcoming",
      isOpen: true,
      image: hack1,
      link: "https://forms.gle/Agk1vsbwMpyRFrYj7" 
    },
    {
      id: 2,
      title: "Webify Dev Hackathon 2026",
      description: "Create stunning websites and web apps. Showcase your talent and win amazing rewards.",
      eligibility: "Anyone with Web Dev skills",
      date: "10 Jul - 12 Jul, 2026",
      location: "Online Mode",
      team: "Individual / Team",
      prize: "₹25,000 + Goodies",
      status: "ONGOING",
      tabCategory: "Ongoing",
      isOpen: true,
      image: hack2,
      link: "https://your-website-link.com/register" 
    },
    {
      id: 3,
      title: "AI for Good Hackathon",
      description: "Leverage AI to solve real-life challenges in healthcare, education, and environment.",
      eligibility: "AI/ML Enthusiasts & Students",
      date: "05 Sep - 07 Sep, 2026",
      location: "Online Mode",
      team: "Team Event (2-5 members)",
      prize: "₹75,000 + Mentorship",
      status: "UPCOMING",
      tabCategory: "Upcoming",
      isOpen: false,
      image: hack3,
      link: "https://forms.gle/your-google-form-link-3"
    },
    {
      id: 4,
      title: "Prayukti Tech Fest 2026",
      description: "Annual hackathon organized as part of Prayukti Tech Fest. Innovate, build and shine!",
      eligibility: "Engineering Students (All Semesters)",
      date: "28 Sep - 30 Sep, 2026",
      location: "NIT Agartala, Tripura",
      team: "Team Event (2-4 members)",
      prize: "₹40,000 + Certificates",
      status: "UPCOMING",
      tabCategory: "Upcoming",
      isOpen: false,
      image: hack4,
      link: "https://forms.gle/your-google-form-link-4"
    }
  ];

  // ---------------------------------------------------------
  // 3. SEARCH & TAB FILTER LOGIC
  // ---------------------------------------------------------
  const filteredHackathons = hackathonsData.filter((hackathon) => {
    const matchesSearch = hackathon.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          hackathon.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "All Events" || hackathon.tabCategory === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans pb-20">
      
      {/* ========================================= */}
      {/* SECTION 1: ANIMATED BANNER                */}
      {/* ========================================= */}
      <div className="relative w-full h-[450px] overflow-hidden bg-[#0b0f19]">
        {/* Sliding Background Images */}
        {banners.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-40 scale-105" : "opacity-0 scale-100"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        
        {/* Banner Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-10 z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
            Hackathons
          </h1>
          <p className="text-gray-300 max-w-2xl text-lg mb-10 leading-relaxed">
            Discover hackathons, tech events and competitions happening in Northeast India and around the world. Build, learn, and grow.
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-8 md:gap-16 mt-2">
            {[
              { icon: "💼", value: "25+", label: "Hackathons" },
              { icon: "👥", value: "10K+", label: "Participants" },
              { icon: "🏆", value: "₹50L+", label: "Rewards Pool" },
              { icon: "📍", value: "15+", label: "Cities" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl border border-white/5">
                  {stat.icon}
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl">{stat.value}</h4>
                  <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* SECTION 2: TABS & SEARCH BAR              */}
      {/* ========================================= */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-10 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Tabs */}
        <div className="flex space-x-2 bg-white p-1.5 rounded-xl shadow-sm border border-gray-200 overflow-x-auto w-full md:w-auto">
          {["All Events", "Upcoming", "Ongoing", "Past"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === tab 
                  ? "bg-[#6366f1] text-white shadow-md" 
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-96 relative group">
          <span className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors text-lg">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search events or locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent text-sm font-medium transition-all"
          />
        </div>
      </div>

      {/* ========================================= */}
      {/* SECTION 3: HACKATHON CARDS GRID           */}
      {/* ========================================= */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {filteredHackathons.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-gray-500 text-lg font-medium">No events found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredHackathons.map((hack) => (
              <div 
                key={hack.id} 
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out flex flex-col group"
              >
                
                {/* Image & Badge */}
                <div className="relative h-44 bg-gray-100 overflow-hidden">
                  <img src={hack.image} alt={hack.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  
                  <span className={`absolute top-4 right-4 text-[10px] font-extrabold px-3 py-1.5 rounded-full text-white tracking-widest shadow-md ${
                    hack.status === 'FEATURED' ? 'bg-[#6366f1]' : 
                    hack.status === 'ONGOING' ? 'bg-emerald-500' : 'bg-blue-600'
                  }`}>
                    {hack.status}
                  </span>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-extrabold text-xl text-gray-900 leading-snug mb-3 group-hover:text-[#6366f1] transition-colors">{hack.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">{hack.description}</p>
                  
                  {/* Extra Eligibility Info */}
                  <div className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-2 rounded-lg mb-5 inline-block w-max">
                    ✨ {hack.eligibility}
                  </div>
                  
                  {/* Icons Details List */}
                  <div className="space-y-3 mb-6 text-sm text-gray-600 font-medium mt-auto">
                    <div className="flex items-center gap-3"><span className="text-lg">📅</span> {hack.date}</div>
                    <div className="flex items-center gap-3"><span className="text-lg">📍</span> {hack.location}</div>
                    <div className="flex items-center gap-3"><span className="text-lg">👥</span> {hack.team}</div>
                    <div className="flex items-center gap-3"><span className="text-lg">🏆</span> <span className="text-green-600 font-bold">{hack.prize}</span></div>
                  </div>

                  {/* Footer & Registration Form Logic */}
                  <div className="flex flex-col sm:flex-row items-center justify-between pt-5 border-t border-gray-100 gap-4 sm:gap-0">
                    <span className={`text-xs font-extrabold ${hack.isOpen ? 'text-emerald-600' : 'text-blue-600'}`}>
                      {hack.isOpen ? '● Registration Open' : '○ Registration Opens Soon'}
                    </span>
                    
                    {/* 👇 YAHAN MAINE CHANGE KIYA HAI (a tag hata kar button lagaya hai) 👇 */}
                    <button 
                      onClick={(e) => hack.isOpen ? handleApplyClick(e, hack.link) : e.preventDefault()}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all text-center w-full sm:w-auto ${
                        hack.isOpen 
                          ? 'bg-[#6366f1] text-white hover:bg-[#4f46e5] shadow-lg shadow-indigo-500/30 cursor-pointer'
                          : 'bg-gray-100 text-gray-600 cursor-not-allowed'
                      }`}
                    >
                      {hack.isOpen ? 'Register Now ↗' : 'Notify Me 🔔'}
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========================================= */}
      {/* SECTION 4: NEWSLETTER BOTTOM BANNER       */}
      {/* ========================================= */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-20 mb-4">
        <div className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-indigo-500/20">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl shadow-inner backdrop-blur-sm">
              🔔
            </div>
            <div className="text-white">
              <h3 className="font-extrabold text-2xl mb-1">Never miss an important event!</h3>
              <p className="text-indigo-100 text-sm font-medium">Get notified about new hackathons and registration deadlines directly in your inbox.</p>
            </div>
          </div>
          <div className="flex w-full md:w-auto gap-3 bg-white p-2 rounded-2xl shadow-lg">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full md:w-72 px-4 py-2 bg-transparent focus:outline-none text-gray-800 text-sm font-medium"
            />
            <button className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-xl font-bold text-sm transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Hackathons;