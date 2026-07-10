import React, { useState, useEffect } from 'react';
import  { useAuth } from '../context/AuthContext';
import  { useNavigate } from 'react-router-dom';

// 📂 Apne local assets folder se images import karo (.jpeg extension)
import banner1 from '../assets/images/banner1.jpeg';
import banner2 from '../assets/images/banner2.jpeg';
import banner3 from '../assets/images/banner3.jpeg';

// Internship cards ke liye images (agar alag se hain toh inka naam apne hisaab se rakhna)
import intern1 from '../assets/images/intern1.jpeg';
import intern2 from '../assets/images/intern2.jpeg';
import intern3 from '../assets/images/intern3.jpeg';
import intern4 from '../assets/images/intern4.jpeg';

const Internship = () => {
  const { user } = useAuth(); // 👈 User ka status check karo
  const navigate = useNavigate(); // 👈 Navigation ke liye hook

// 2. Click function for Apply Now button
  const handleApplyClick = (link) => {
    if (!user) {
      alert("Please login to apply for this internship.");
      navigate('/auth');
    } else {
      window.open(link, '_blank');
    }
  };
  // ---------------------------------------------------------
  // 1. BANNER SLIDER STATE & LOGIC
  // ---------------------------------------------------------
  const banners = [banner1, banner2, banner3];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All Internships");

  // 🚀 Auto Slider Logic (Har 4 seconds mein change hoga)
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(slideInterval);
  }, [banners.length]);

  // ---------------------------------------------------------
  // 2. INTERNSHIP DATA (Details, Info, Eligibility, Links)
  // ---------------------------------------------------------
  const internshipsData = [
    {
      id: 1,
      title: "Frontend React Developer",
      company: "TechNexus Solutions",
      description: "Work on cutting-edge React applications, build responsive UIs, and integrate APIs in real-world projects.",
      eligibility: "CS/IT Students (Diploma & B.Tech)",
      duration: "3 Months",
      location: "Remote (Work from Home)",
      stipend: "₹10,000 / month",
      status: "HIRING NOW",
      tabCategory: "Tech",
      isOpen: true,
      image: intern1,
      link: "https://forms.gle/your-google-form-link-1" // 👈 YAHA APNA LINK DALO
    },
    {
      id: 2,
      title: "UI/UX Designer Intern",
      company: "Creative Minds Studio",
      description: "Design user-centric interfaces for mobile and web apps. Collaborate directly with the dev team.",
      eligibility: "Figma & Design Enthusiasts",
      duration: "6 Months",
      location: "Agartala, Tripura (Onsite)",
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
      eligibility: "Basic knowledge of MERN stack",
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

  // ---------------------------------------------------------
  // 3. SEARCH & TAB FILTER LOGIC
  // ---------------------------------------------------------
  const filteredInternships = internshipsData.filter((intern) => {
    const matchesSearch = intern.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          intern.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          intern.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "All Internships" || intern.tabCategory === activeTab;
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
            Internships
          </h1>
          <p className="text-gray-300 max-w-2xl text-lg mb-10 leading-relaxed">
            Kickstart your career with top remote and onsite internships. Gain real-world experience, build your portfolio, and get hired.
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-8 md:gap-16 mt-2">
            {[
              { icon: "🏢", value: "50+", label: "Companies" },
              { icon: "💼", value: "120+", label: "Open Roles" },
              { icon: "💸", value: "₹25K", label: "Max Stipend" },
              { icon: "🌍", value: "Remote", label: "Opportunities" },
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
        
        {/* Categories Tabs */}
        <div className="flex space-x-2 bg-white p-1.5 rounded-xl shadow-sm border border-gray-200 overflow-x-auto w-full md:w-auto">
          {["All Internships", "Tech", "Design", "Management"].map((tab) => (
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

        {/* Search Bar (Oopar se niche laaya gaya hai) */}
        <div className="w-full md:w-96 relative group">
          <span className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors text-lg">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search roles, company or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent text-sm font-medium transition-all"
          />
        </div>
      </div>

      {/* ========================================= */}
      {/* SECTION 3: INTERNSHIP CARDS GRID          */}
      {/* ========================================= */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {filteredInternships.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-gray-500 text-lg font-medium">No internships found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredInternships.map((intern) => (
              // Card Container with smooth hover animation
              <div 
                key={intern.id} 
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out flex flex-col group"
              >
                
                {/* Image & Status Badge */}
                <div className="relative h-44 bg-gray-100 overflow-hidden">
                  <img src={intern.image} alt={intern.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  
                  <span className={`absolute top-4 right-4 text-[10px] font-extrabold px-3 py-1.5 rounded-full text-white tracking-widest shadow-md ${
                    intern.status === 'HIRING NOW' ? 'bg-[#6366f1]' : 
                    intern.status === 'URGENT' ? 'bg-red-500' : 'bg-blue-600'
                  }`}>
                    {intern.status}
                  </span>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs font-bold text-gray-400 mb-1 tracking-wider uppercase">{intern.company}</span>
                  <h3 className="font-extrabold text-xl text-gray-900 leading-snug mb-3 group-hover:text-[#6366f1] transition-colors">{intern.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">{intern.description}</p>
                  
                  {/* Eligibility Badge */}
                  <div className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-2 rounded-lg mb-5 inline-block w-max">
                    🎓 {intern.eligibility}
                  </div>
                  
                  {/* Icons Details List */}
                  <div className="space-y-3 mb-6 text-sm text-gray-600 font-medium mt-auto">
                    <div className="flex items-center gap-3"><span className="text-lg">⏳</span> {intern.duration}</div>
                    <div className="flex items-center gap-3"><span className="text-lg">📍</span> {intern.location}</div>
                    <div className="flex items-center gap-3"><span className="text-lg">💰</span> <span className="text-green-600 font-bold">{intern.stipend}</span></div>
                  </div>

                  {/* Footer & Apply External Link Button */}
                  <div className="flex flex-col sm:flex-row items-center justify-between pt-5 border-t border-gray-100 gap-4 sm:gap-0">
                    <span className={`text-xs font-extrabold ${intern.isOpen ? 'text-emerald-600' : 'text-orange-500'}`}>
                      {intern.isOpen ? '● Accepting Applications' : '○ Opening Soon'}
                    </span>
                    
                    {/* External Link for Google Form/Website */}
                    <a 
                      href={intern.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all text-center w-full sm:w-auto ${
                        intern.isOpen 
                          ? 'bg-[#6366f1] text-white hover:bg-[#4f46e5] shadow-lg shadow-indigo-500/30'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {intern.isOpen ? 'Apply Now ↗' : 'Notify Me 🔔'}
                    </a>
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
              💼
            </div>
            <div className="text-white">
              <h3 className="font-extrabold text-2xl mb-1">Get internship alerts!</h3>
              <p className="text-indigo-100 text-sm font-medium">Subscribe to receive notifications when top companies start hiring.</p>
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

export default Internship;