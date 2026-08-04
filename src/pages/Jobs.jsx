import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from "react-helmet-async";

// ==========================================
// 1. IMPORT LOCAL IMAGES
// ==========================================
const bannerSlides = [
  "https://cdn3d.iconscout.com/3d/premium/thumb/job-search-5374070-4496229.png", 
  "https://cdn3d.iconscout.com/3d/premium/thumb/recruitment-5374073-4496232.png", 
];

// ==========================================
// 2. REAL JOBS DATA 
// ==========================================
const jobsData = [
  {
    id: 1,
    title: 'SOFTWARE ENGINEER',
    company: 'Google',
    location: 'Bangalore, India',
    workMode: 'Remote',
    type: 'FULL TIME',
    experience: '2 - 4 Yrs',
    salary: '₹18 - 28 LPA',
    posted: '2h ago',
    url: 'https://careers.google.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
    keywords: ['developer', 'coding', 'react', 'node']
  },
  {
    id: 2,
    title: 'PRODUCT MANAGER',
    company: 'Microsoft',
    location: 'Hyderabad, India',
    workMode: 'Hybrid',
    type: 'FULL TIME',
    experience: '3 - 6 Yrs',
    salary: '₹20 - 35 LPA',
    posted: '5h ago',
    url: 'https://careers.microsoft.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    keywords: ['management', 'agile', 'scrum']
  },
  {
    id: 3,
    title: 'DATA ANALYST',
    company: 'Swiggy',
    location: 'Bangalore, India',
    workMode: 'On-site',
    type: 'FULL TIME',
    experience: '1 - 3 Yrs',
    salary: '₹8 - 14 LPA',
    posted: '8h ago',
    url: 'https://careers.swiggy.com',
    logo: 'https://upload.wikimedia.org/wikipedia/en/1/12/Swiggy_logo.svg',
    keywords: ['data', 'sql', 'python', 'analytics']
  },
  {
    id: 4,
    title: 'UI/UX DESIGNER',
    company: 'Zomato',
    location: 'Gurgaon, India',
    workMode: 'Hybrid',
    type: 'FULL TIME',
    experience: '2 - 5 Yrs',
    salary: '₹12 - 20 LPA',
    posted: '10h ago',
    url: 'https://careers.zomato.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Zomato_Logo.png',
    keywords: ['design', 'figma', 'creative']
  },
  {
    id: 5,
    title: 'BACKEND DEVELOPER',
    company: 'Razorpay',
    location: 'Bangalore, India',
    workMode: 'Remote',
    type: 'FULL TIME',
    experience: '2 - 4 Yrs',
    salary: '₹15 - 25 LPA',
    posted: '12h ago',
    url: 'https://razorpay.com/jobs/',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg',
    keywords: ['api', 'node', 'database', 'java']
  }
];

// ==========================================
// 3. UPCOMING JOBS DATA (NEWLY ADDED)
// ==========================================
const upcomingJobsData = [
  {
    id: 101,
    title: 'CLOUD ENGINEER (FRESHER)',
    company: 'Amazon',
    location: 'Hyderabad, India',
    workMode: 'On-site',
    type: 'FULL TIME',
    experience: '0 - 1 Yrs',
    salary: '₹12 - 18 LPA',
    opensIn: 'Opening in 2 Days',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'
  },
  {
    id: 102,
    title: 'CYBERSECURITY ANALYST',
    company: 'IBM',
    location: 'Pune, India',
    workMode: 'Hybrid',
    type: 'CONTRACT',
    experience: '1 - 3 Yrs',
    salary: '₹10 - 15 LPA',
    opensIn: 'Opening in 5 Days',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg'
  }
];

const categoriesList = [
  'ALL', 'FULL TIME', 'PART TIME', 'REMOTE', 'INTERNSHIP', 'CONTRACT', 'FRESHER', 'EXPERIENCED'
];

// Helper function to get badge colors based on job type
const getTypeStyle = (type) => {
  switch (type) {
    case 'FULL TIME': return 'text-green-600 border-green-200 bg-green-50';
    case 'PART TIME': return 'text-blue-600 border-blue-200 bg-blue-50';
    case 'CONTRACT': return 'text-orange-600 border-orange-200 bg-orange-50';
    case 'INTERNSHIP': return 'text-purple-600 border-purple-200 bg-purple-50';
    default: return 'text-gray-600 border-gray-200 bg-gray-50';
  }
};

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [currentSlide, setCurrentSlide] = useState(0);

  // AUTOMATIC SLIDER LOGIC
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === bannerSlides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(slideInterval);
  }, []);

  // SEARCH & CATEGORY FILTER LOGIC
  const filteredJobs = jobsData.filter((job) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      job.title.toLowerCase().includes(term) || 
      job.company.toLowerCase().includes(term) ||
      (job.keywords && job.keywords.some(key => key.toLowerCase().includes(term)));
    
    let matchesCategory = true;
    if (activeCategory !== 'ALL') {
      if (activeCategory === 'REMOTE' && job.workMode.toUpperCase() !== 'REMOTE') matchesCategory = false;
      else if (activeCategory === 'FRESHER' && !job.experience.includes('0')) matchesCategory = false;
      else if (activeCategory === 'EXPERIENCED' && job.experience.includes('0')) matchesCategory = false;
      else if (['FULL TIME', 'PART TIME', 'CONTRACT', 'INTERNSHIP'].includes(activeCategory) && job.type !== activeCategory) {
        matchesCategory = false;
      }
    }
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#fcf9f2] font-sans pb-20">
      
      <Helmet>
        <title>Latest Jobs for Students & Freshers | Letsbharat</title>
        <meta name="description" content="Explore Freshers Jobs, Software Developer Jobs, IT Jobs, AI Jobs, Startup Jobs, Remote Jobs and Career Opportunities across India." />
        <meta name="keywords" content="Jobs India, Freshers Jobs, IT Jobs, Software Jobs, AI Jobs, Startup Jobs, Remote Jobs" />
      </Helmet>

      {/* HERO SECTION */}
      <div className="max-w-[1400px] mx-auto pt-6 px-4 sm:px-8">
        <div className="relative w-full h-[350px] bg-gradient-to-r from-[#ffeeb8] via-[#fff5d1] to-[#ffeaa1] rounded-[2.5rem] overflow-hidden flex items-center justify-between px-8 md:px-24 shadow-sm">
          
          <div className="z-10 max-w-lg">
            <div className="inline-block px-3 py-1 bg-white/60 rounded-full text-[#b37400] text-xs font-bold tracking-wider mb-4 border border-white/50 uppercase">
              Find. Apply. Grow.
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4 tracking-tight uppercase">
              Not Available
            </h1>
            <p className="text-gray-700 text-sm md:text-base font-medium mb-8">
              Explore top job opportunities from innovative <br className="hidden md:block"/> companies and take the next step in your career.
            </p>
            <button className="bg-[#ffcc00] hover:bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-sm text-sm">
              BROWSE JOBS
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </div>

          <div className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 w-[300px] lg:w-[450px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 1.1, x: -20 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full flex items-center justify-center"
              >
                <img 
                  src={bannerSlides[currentSlide]} 
                  alt="Job Search Slide" 
                  className="w-full h-auto object-contain drop-shadow-2xl max-h-[300px]"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {bannerSlides.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentSlide(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${currentSlide === i ? 'bg-[#ffcc00] w-8' : 'bg-white/60 w-2.5 hover:bg-white'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* SEARCH BAR & CATEGORIES */}
      <div className="max-w-[1400px] mx-auto mt-12 px-4 sm:px-8">
        <div className="bg-white rounded-full p-2 shadow-sm flex items-center mb-8 border border-gray-100 focus-within:ring-2 focus-within:ring-[#ffcc00] transition-all max-w-4xl mx-auto">
          <div className="pl-4 pr-2 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input 
            type="text" 
            placeholder="Search jobs by title, keyword or company..." 
            className="flex-grow bg-transparent outline-none py-2 text-gray-700 text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-[#ffcc00] hover:bg-yellow-500 text-black px-8 py-2.5 rounded-full font-bold text-xs tracking-wide transition-colors uppercase">
            Search
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all uppercase ${
                activeCategory === cat 
                  ? 'bg-white text-gray-900 shadow-md border border-gray-200' 
                  : 'bg-transparent text-gray-500 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
          <button className="px-5 py-2.5 rounded-full bg-transparent text-gray-500 text-xs font-bold flex items-center gap-2 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 transition-all uppercase whitespace-nowrap">
            MORE FILTERS
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. LATEST JOBS LISTING SECTION                          */}
      {/* ========================================================= */}
      <div className="max-w-[1400px] mx-auto mt-10 px-4 sm:px-8">
        
        <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#ffcc00] rounded-xl flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight uppercase">Latest Job Opportunities</h2>
              <p className="text-gray-500 text-xs font-medium mt-0.5">Explore and apply to the best job opportunities</p>
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="hidden lg:grid grid-cols-[2fr_1fr_1.5fr_1fr_1fr_1fr_1fr_auto] gap-4 px-6 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
          <div>Job Title</div>
          <div>Company</div>
          <div>Location</div>
          <div>Type</div>
          <div>Experience</div>
          <div>Salary</div>
          <div>Posted</div>
          <div className="text-right">Action</div>
        </div>

        <div className="flex flex-col gap-3">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4, delay: (index % 10) * 0.05 }}
                className="bg-white rounded-2xl px-6 py-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-md hover:border-[#ffcc00] transition-all duration-300 group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1.5fr_1fr_1fr_1fr_1fr_auto] gap-4 items-center">
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center p-2 flex-shrink-0 group-hover:scale-110 transition-transform">
                      <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide group-hover:text-[#ffcc00] transition-colors">{job.title}</h3>
                      <p className="text-gray-400 text-[11px] font-medium mt-0.5 lg:hidden">{job.company}</p>
                    </div>
                  </div>

                  <div className="hidden lg:block text-sm font-medium text-gray-700">{job.company}</div>

                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
                      <svg className="w-3.5 h-3.5 text-[#ffcc00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      {job.location.split(',')[0]}
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium ml-5">{job.workMode}</span>
                  </div>

                  <div className="flex items-center">
                    <span className={`px-3 py-1 text-[9px] font-black rounded-full border uppercase tracking-wider ${getTypeStyle(job.type)}`}>
                      {job.type}
                    </span>
                  </div>

                  <div className="hidden lg:block text-xs font-semibold text-gray-600">{job.experience}</div>
                  <div className="hidden lg:block text-xs font-black text-gray-800">{job.salary}</div>
                  <div className="hidden lg:block text-[11px] font-medium text-gray-400">{job.posted}</div>

                  <div className="flex items-center justify-end gap-3 mt-4 lg:mt-0 pt-4 lg:pt-0 border-t lg:border-none border-gray-100">
                    <button className="text-gray-300 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-50">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                    </button>
                    <a 
                      href={job.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-400 group-hover:border-[#ffcc00] group-hover:bg-[#ffcc00] group-hover:text-black transition-all shadow-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                    </a>
                  </div>
                  
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <h3 className="text-gray-900 font-bold text-lg mb-1">No Jobs Found</h3>
              <p className="text-gray-500 font-medium text-sm">We couldn't find any jobs matching "{searchTerm}". Try adjusting your filters.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-10">
          <button className="w-9 h-9 rounded-lg bg-[#ffcc00] text-black font-bold text-sm shadow-sm">1</button>
          <button className="w-9 h-9 rounded-lg bg-white border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50">2</button>
          <span className="text-gray-400 font-bold px-1">...</span>
          <button className="w-9 h-9 rounded-lg bg-white border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>


        {/* ========================================================= */}
        {/* 2. UPCOMING JOBS SECTION (NEWLY ADDED)                      */}
        {/* ========================================================= */}
        <div className="mt-20">
          <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-sm">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900 tracking-tight uppercase">Upcoming Job Drives</h2>
                <p className="text-gray-500 text-xs font-medium mt-0.5">Get notified when these top companies start hiring</p>
              </div>
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-[2fr_1fr_1.5fr_1fr_1fr_1fr_1.5fr_auto] gap-4 px-6 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
            <div>Job Title</div>
            <div>Company</div>
            <div>Location</div>
            <div>Type</div>
            <div>Experience</div>
            <div>Salary</div>
            <div>Status</div>
            <div className="text-right">Action</div>
          </div>

          <div className="flex flex-col gap-3">
            {upcomingJobsData.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4, delay: (index % 10) * 0.05 }}
                className="bg-white rounded-2xl px-6 py-4 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-md hover:border-indigo-300 transition-all duration-300 group opacity-90"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1.5fr_1fr_1fr_1fr_1.5fr_auto] gap-4 items-center opacity-80 group-hover:opacity-100 transition-opacity">
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center p-2 flex-shrink-0 grayscale group-hover:grayscale-0 transition-all">
                      <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide group-hover:text-indigo-600 transition-colors">{job.title}</h3>
                      <p className="text-gray-400 text-[11px] font-medium mt-0.5 lg:hidden">{job.company}</p>
                    </div>
                  </div>

                  <div className="hidden lg:block text-sm font-medium text-gray-700">{job.company}</div>

                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
                      <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                      {job.location.split(',')[0]}
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium ml-5">{job.workMode}</span>
                  </div>

                  <div className="flex items-center">
                    <span className={`px-3 py-1 text-[9px] font-black rounded-full border uppercase tracking-wider ${getTypeStyle(job.type)}`}>
                      {job.type}
                    </span>
                  </div>

                  <div className="hidden lg:block text-xs font-semibold text-gray-600">{job.experience}</div>
                  <div className="hidden lg:block text-xs font-black text-gray-800">{job.salary}</div>
                  
                  {/* Status: Opening Soon */}
                  <div className="hidden lg:flex items-center gap-1.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                    </span>
                    <span className="text-[11px] font-bold text-indigo-600">{job.opensIn}</span>
                  </div>

                  {/* Notify Me Button */}
                  <div className="flex items-center justify-end gap-3 mt-4 lg:mt-0 pt-4 lg:pt-0 border-t lg:border-none border-gray-100">
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors border border-indigo-100">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                      Notify
                    </button>
                  </div>
                  
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        {/* ========================================================= */}
        {/* UPLOAD RESUME BANNER                                      */}
        {/* ========================================================= */}
        <div className="mt-16 bg-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#ffeaa1] bg-gradient-to-r from-white to-[#fffdf5] shadow-sm">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-[#fff5d1] text-[#b37400] rounded-2xl flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900 uppercase">Don't Find The Right Job?</h3>
              <p className="text-gray-500 text-sm font-medium mt-1">Upload your resume and get matched with top opportunities.</p>
            </div>
          </div>
          <button className="w-full md:w-auto bg-[#ffcc00] hover:bg-yellow-500 text-black px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-sm text-sm uppercase tracking-wide">
            Upload Resume
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Jobs;