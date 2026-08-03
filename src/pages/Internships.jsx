import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from "react-helmet-async";

// ==========================================
// 1. LOCAL BANNER IMAGES IMPORT
// ==========================================
import banner1 from '../assets/images/ban2.jpeg';
import banner2 from '../assets/images/ban1.jpeg';
import banner3 from '../assets/images/ban3.jpeg';

const bannerSlides = [banner1, banner2, banner3];

// ==========================================
// 2. MOCK DATA FOR INSTITUTIONS (WITH FALLBACK IMAGES)
// ==========================================
const institutionsData = [
  {
    id: 1,
    name: 'Bairagikami J.b. School',
    type: 'Government',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    state: 'Tripura',
    district: 'Dhalai',
    location: 'Dhalai, Tripura',
    classes: 'Classes: 1 - 10',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
    description: 'Bairagikami J.b. School is a premier government institution dedicated to quality education, rural student empowerment, and holistic child development in Tripura.',
    established: '1998',
    totalStudents: '450+',
    facilities: ['Digital Classrooms', 'Sports Ground', 'Science Lab', 'Library', 'Free Mid-day Meals'],
    contact: {
      phone: '+91 98765 43210',
      email: 'contact@bairagikamischool.edu.in',
      address: 'Bairagikami Village, Dhalai District, Tripura - 799278'
    }
  },
  {
    id: 2,
    name: 'St. Thomas Eng. Med. School',
    type: 'Private',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    state: 'Tripura',
    district: 'Dhalai',
    location: 'Dhalai, Tripura',
    classes: 'Classes: 1 - 12',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80',
    description: 'St. Thomas English Medium School offers world-class education, state-of-the-art computer labs, and focus on extracurricular activities for competitive excellence.',
    established: '2005',
    totalStudents: '1200+',
    facilities: ['AC Computer Labs', 'Robotics Club', 'Indoor Sports Complex', 'Auditorium', 'School Bus Service'],
    contact: {
      phone: '+91 91234 56789',
      email: 'info@stthomasschool.ac.in',
      address: 'Main Road, Dhalai, Tripura - 799275'
    }
  },
  {
    id: 3,
    name: 'Chandpur Hs School',
    type: 'Government',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    state: 'Tripura',
    district: 'Dhalai',
    location: 'Dhalai, Tripura',
    classes: 'Classes: 6 - 12',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    description: 'Chandpur Higher Secondary School provides excellent secondary and higher secondary science and arts streams with experienced faculty.',
    established: '1985',
    totalStudents: '850+',
    facilities: ['Physics & Chemistry Labs', 'NCC Cadets', 'Playground', 'Library'],
    contact: {
      phone: '+91 94361 00000',
      email: 'chandpurhsschool@gmail.com',
      address: 'Chandpur, Dhalai District, Tripura - 799279'
    }
  },
  {
    id: 4,
    name: 'Radha Krishna K.p J.b School',
    type: 'Private',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    state: 'Tripura',
    district: 'Dhalai',
    location: 'Dhalai, Tripura',
    classes: 'Classes: 1 - 8',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    description: 'Focusing on early child education, values, language mastery, and creative learning models in a secure environment.',
    established: '2012',
    totalStudents: '350+',
    facilities: ['Smart Classes', 'Activity Room', 'Play Area', 'CCTV Campus'],
    contact: {
      phone: '+91 98620 11223',
      email: 'radhakrishnaschool@outlook.com',
      address: 'Radhakrishna Nagar, Dhalai, Tripura - 799277'
    }
  }
];

const categoryTabs = [
  { id: 'All', label: 'All Institutions', icon: '🏛️' },
  { id: 'Government', label: 'Government', icon: '🏦' },
  { id: 'Private', label: 'Private', icon: '🏫' },
  { id: 'Primary', label: 'Primary', icon: '🎒' },
  { id: 'High School', label: 'High School', icon: '📘' },
  { id: 'Higher Secondary', label: 'Higher Secondary', icon: '🎓' },
];

// FRAMER MOTION STAGGER VARIANTS FOR CARDS
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  },
};

const Institution = () => {
  // STATE MANAGEMENT
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [activeTab, setActiveTab] = useState('All');
  const [currentSlide, setCurrentSlide] = useState(0);

  // MOBILE FILTER EXPAND TOGGLE STATE
  const [isMobileFilterExpanded, setIsMobileFilterExpanded] = useState(false);

  // VIEW DETAILS PAGE STATE
  const [selectedInstitution, setSelectedInstitution] = useState(null);

  // AUTO SLIDE BANNER LOGIC
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === bannerSlides.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // FILTER LOGIC
  const filteredInstitutions = institutionsData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState === 'All' || item.state === selectedState;
    const matchesDistrict = selectedDistrict === 'All' || item.district === selectedDistrict;
    const matchesType = selectedType === 'All' || item.type === selectedType;

    let matchesTab = true;
    if (activeTab === 'Government') matchesTab = item.type === 'Government';
    else if (activeTab === 'Private') matchesTab = item.type === 'Private';
    else if (activeTab === 'Primary') matchesTab = item.classes.includes('1 -') || item.classes.includes('1-');
    else if (activeTab === 'High School') matchesTab = item.classes.includes('10');
    else if (activeTab === 'Higher Secondary') matchesTab = item.classes.includes('12');

    return matchesSearch && matchesState && matchesDistrict && matchesType && matchesTab;
  });

  return (
    <div className="min-h-screen bg-[#f8f9fc] font-sans pb-16">
      <Helmet>
        <title>Institutions & Schools Directory | Letsbharat</title>
        <meta name="description" content="Find and explore top schools and institutions across India on Letsbharat." />
      </Helmet>

      {/* =========================================================
          PAGE 1: MAIN DIRECTORY LIST VIEW
          ========================================================= */}
      {!selectedInstitution ? (
        <>
          {/* HEADER & HERO BANNER SLIDER */}
          <div className="max-w-[1350px] mx-auto pt-4 md:pt-6 px-4 sm:px-6 lg:px-8">
            <div className="mb-4">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
               Next Months Are Available Institutions Directory
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">
                Find and explore the best schools, colleges and Coaching Centres across India
              </p>
            </div>

            {/* SLIDER BANNER CONTAINER */}
            <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-lg bg-slate-900 min-h-[220px] sm:min-h-[300px] md:min-h-[380px] flex flex-col justify-between p-4 sm:p-8 md:p-10 transition-all duration-300">
              
              {/* Background Images with Framer Motion Animation */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={bannerSlides[currentSlide]}
                  alt="Banner"
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 w-full h-full object-cover opacity-70 md:opacity-55 z-0"
                />
              </AnimatePresence>

              {/* Dark Gradient Overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent z-0"></div>

              {/* BANNER CONTENT CAPTION */}
              <div className="relative z-10 max-w-md">
                <span className="inline-block px-3 py-1 bg-yellow-400 text-slate-950 text-[10px] sm:text-xs font-black tracking-wider uppercase rounded-full mb-2 shadow-sm">
                  Verified Directory
                </span>
                <h2 className="text-white text-xl sm:text-3xl font-black drop-shadow-md">
                  Discover Top Institutions
                </h2>
              </div>

              {/* 🖥️ DESKTOP FILTERS (Visible on Desktop / Tablet md:) */}
              <div className="hidden md:block relative z-10 w-full bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/20 mt-6">
                <div className="grid grid-cols-12 gap-3 items-center">
                  
                  {/* Search Input */}
                  <div className="col-span-4 relative flex items-center">
                    <svg className="w-5 h-5 absolute left-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search school name or keyword..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl text-xs sm:text-sm font-medium text-slate-800 outline-none border border-slate-200 focus:border-yellow-500 focus:bg-white transition-all"
                    />
                  </div>

                  {/* State Select */}
                  <div className="col-span-2">
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 rounded-xl text-xs sm:text-sm font-medium text-slate-700 outline-none border border-slate-200 focus:border-yellow-500 transition-all cursor-pointer"
                    >
                      <option value="All">All States</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Assam">Assam</option>
                      <option value="Nagaland">Nagaland</option>
                      <option value="Manipur">Manipur</option>
                      <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                      <option value="Meghalaya">Meghalaya</option>
                      <option value="Mizoram">Mizoram</option>
                    </select>
                  </div>

                  {/* District Select */}
                  <div className="col-span-2">
                    <select
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 rounded-xl text-xs sm:text-sm font-medium text-slate-700 outline-none border border-slate-200 focus:border-yellow-500 transition-all cursor-pointer"
                    >
                      <option value="All">All Districts</option>
                      <option value="Dhalai">Dhalai</option>
                      <option value="West Tripura">West Tripura</option>
                      <option value="Gomati">Gomati</option>
                      <option value="Dimapur">Dimapur</option>
                      <option value="Itanagar">Itanagar</option>
                    </select>
                  </div>

                  {/* Type Select */}
                  <div className="col-span-2">
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 rounded-xl text-xs sm:text-sm font-medium text-slate-700 outline-none border border-slate-200 focus:border-yellow-500 transition-all cursor-pointer"
                    >
                      <option value="All">All Types</option>
                      <option value="Government">Government</option>
                      <option value="Private">Private</option>
                    </select>
                  </div>

                  {/* Search Button */}
                  <div className="col-span-2">
                    <button className="w-full py-2.5 bg-slate-900 hover:bg-yellow-500 text-white hover:text-black font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 0114 0z" />
                      </svg>
                      Search
                    </button>
                  </div>

                </div>

                {/* CATEGORY PILL TABS */}
                <div className="flex items-center gap-2 overflow-x-auto pt-3 mt-2 border-t border-slate-100 scrollbar-hide">
                  {categoryTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                        activeTab === tab.id
                          ? 'bg-slate-900 text-white shadow-md'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <span>{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider Dots Indicator */}
              <div className="relative z-10 flex justify-center gap-1.5 mt-2">
                {bannerSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      currentSlide === idx ? 'w-6 bg-yellow-400' : 'w-2 bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* 📱 MOBILE SEARCH & EXPANDABLE FILTER CONTAINER */}
            <div className="block md:hidden mt-4">
              
              {/* TRIGGER SEARCH BAR FOR MOBILE */}
              <div 
                onClick={() => setIsMobileFilterExpanded(true)}
                className="bg-white p-3 rounded-2xl border border-slate-200 shadow-md flex items-center justify-between gap-2 cursor-pointer active:scale-[0.99] transition-all"
              >
                <div className="flex items-center gap-3 flex-grow">
                  <svg className="w-5 h-5 text-yellow-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search school name or keyword..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setIsMobileFilterExpanded(true);
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMobileFilterExpanded(true);
                    }}
                    className="w-full bg-transparent text-xs font-medium text-slate-800 outline-none"
                  />
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMobileFilterExpanded(!isMobileFilterExpanded);
                  }}
                  className="px-3 py-1.5 bg-slate-900 text-yellow-400 rounded-xl text-xs font-bold flex items-center gap-1.5 flex-shrink-0"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  {isMobileFilterExpanded ? 'Close' : 'Filter'}
                </button>
              </div>

              {/* ANIMATED FILTER DROPDOWN TRAY FOR MOBILE */}
              <AnimatePresence>
                {isMobileFilterExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="overflow-hidden bg-white mt-2 rounded-2xl border border-slate-200 shadow-xl p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Filter Institutions</span>
                      <button 
                        onClick={() => setIsMobileFilterExpanded(false)}
                        className="text-xs font-bold text-slate-400 hover:text-slate-800"
                      >
                        ✕ Close
                      </button>
                    </div>

                    {/* State Selector */}
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">State</label>
                      <select
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 outline-none border border-slate-200"
                      >
                        <option value="All">All States</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Assam">Assam</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                      </select>
                    </div>

                    {/* District Selector */}
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">District</label>
                      <select
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 outline-none border border-slate-200"
                      >
                        <option value="All">All Districts</option>
                        <option value="Dhalai">Dhalai</option>
                        <option value="West Tripura">West Tripura</option>
                        <option value="Gomati">Gomati</option>
                        <option value="Dimapur">Dimapur</option>
                        <option value="Itanagar">Itanagar</option>
                      </select>
                    </div>

                    {/* Type Selector */}
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Institution Type</label>
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 outline-none border border-slate-200"
                      >
                        <option value="All">All Types</option>
                        <option value="Government">Government</option>
                        <option value="Private">Private</option>
                      </select>
                    </div>

                    {/* Category Pills Slider */}
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Category</label>
                      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                        {categoryTabs.map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                              activeTab === tab.id
                                ? 'bg-slate-900 text-white shadow-sm'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            <span>{tab.icon}</span>
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Reset Button */}
                    <button
                      onClick={() => {
                        setSelectedState('All');
                        setSelectedDistrict('All');
                        setSelectedType('All');
                        setActiveTab('All');
                        setSearchTerm('');
                      }}
                      className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
                    >
                      Reset Filters
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* STATS SUMMARY ROW */}
          <div className="max-w-[1350px] mx-auto mt-6 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-lg">🏫</div>
                <div>
                  <h4 className="text-base sm:text-xl font-bold text-slate-900">00+</h4>
                  <p className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-wide">Total Institutions</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-lg">🏦</div>
                <div>
                  <h4 className="text-base sm:text-xl font-bold text-slate-900">00+</h4>
                  <p className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-wide">Government</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-black text-lg">🎓</div>
                <div>
                  <h4 className="text-base sm:text-xl font-bold text-slate-900">00+</h4>
                  <p className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-wide">Private</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-lg">📍</div>
                <div>
                  <h4 className="text-base sm:text-xl font-bold text-slate-900">28</h4>
                  <p className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-wide">States Covered</p>
                </div>
              </div>
            </div>
          </div>

          {/* INSTITUTIONS CARDS SECTION WITH STAGGER ENTRY ANIMATIONS */}
          <div className="max-w-[1350px] mx-auto mt-8 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tight">Popular Schools & Institutions</h2>
                <p className="text-slate-500 text-xs">Explore top verified institutions near you</p>
              </div>
              <span className="text-xs font-semibold text-yellow-600 cursor-pointer hover:underline">View All →</span>
            </div>

            {/* 💻 DESKTOP GRID CARDS (Staggered Animation Entry) */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {filteredInstitutions.map((item) => (
                <motion.div
                  key={item.id}
                  variants={cardItemVariants}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="p-4">
                    {/* Badge */}
                    <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-md border mb-3 ${item.badgeColor}`}>
                      {item.type}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 line-clamp-1 mb-1">{item.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                      <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {item.location}
                    </p>
                    <p className="text-xs font-medium text-slate-400 mb-3">{item.classes}</p>
                  </div>

                  {/* Image with fallback */}
                  <div className="w-full h-36 bg-slate-100 relative overflow-hidden">
                    <img 
                      src={item.image || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80'} 
                      alt={item.name} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80';
                      }}
                      className="w-full h-full object-cover" 
                    />
                  </div>

                  {/* Card Footer Button */}
                  <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedInstitution(item)}
                      className="w-full py-2 bg-white hover:bg-slate-900 text-slate-800 hover:text-white border border-slate-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                    >
                      View Details
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* 📱 MOBILE CARDS (Staggered Entry Animation) */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex md:hidden flex-col gap-3"
            >
              {filteredInstitutions.map((item) => (
                <motion.div
                  key={item.id}
                  variants={cardItemVariants}
                  onClick={() => setSelectedInstitution(item)}
                  className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between gap-3 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80'} 
                      alt={item.name} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80';
                      }}
                      className="w-full h-full object-cover" 
                    />
                  </div>

                  <div className="flex-grow min-w-0">
                    <span className={`inline-block text-[8px] font-extrabold px-2 py-0.5 rounded border mb-0.5 ${item.badgeColor}`}>
                      {item.type}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 truncate">{item.name}</h3>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 truncate">
                      📍 {item.location}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">{item.classes}</p>
                  </div>

                  <div className="p-2 text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </>
      ) : (

        /* =========================================================
           PAGE 2: SINGLE INSTITUTION VIEW DETAILS SCREEN
           ========================================================= */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="max-w-[1100px] mx-auto pt-6 px-4 sm:px-6"
        >
          {/* Back Button */}
          <button
            onClick={() => setSelectedInstitution(null)}
            className="mb-6 px-4 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-900 hover:text-white transition-all flex items-center gap-2 shadow-sm"
          >
            ← Back to Directory
          </button>

          {/* Details Header Banner */}
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg">
            <div className="relative h-64 md:h-80 w-full bg-slate-900">
              <img
                src={selectedInstitution.image || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80'}
                alt={selectedInstitution.name}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border mb-2 ${selectedInstitution.badgeColor}`}>
                  {selectedInstitution.type}
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold">{selectedInstitution.name}</h1>
                <p className="text-slate-300 text-xs sm:text-sm mt-1 flex items-center gap-1">
                  📍 {selectedInstitution.contact.address}
                </p>
              </div>
            </div>

            {/* Main Info Body */}
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Left Column - Details */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">About Institution</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {selectedInstitution.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Key Facilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedInstitution.facilities.map((fac, i) => (
                      <span key={i} className="px-3 py-1.5 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-xl text-xs font-semibold">
                        ✨ {fac}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Info Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                  <div className="bg-slate-50 p-3.5 rounded-2xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Classes Offered</p>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 mt-1">{selectedInstitution.classes}</p>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-2xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Established</p>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 mt-1">{selectedInstitution.established}</p>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-2xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Total Strength</p>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 mt-1">{selectedInstitution.totalStudents}</p>
                  </div>
                </div>
              </div>

              {/* Right Column - Contact Card */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between h-fit gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-4">Contact Information</h3>
                  
                  <div className="space-y-3 text-xs text-slate-600">
                    <p className="flex items-center gap-2">
                      <span>📞</span> {selectedInstitution.contact.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <span>✉️</span> {selectedInstitution.contact.email}
                    </p>
                    <p className="flex items-start gap-2">
                      <span>📍</span> {selectedInstitution.contact.address}
                    </p>
                  </div>
                </div>

                <button className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-black rounded-xl text-xs uppercase tracking-wider shadow-md transition-all">
                  Inquire / Apply Now
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      )}

    </div>
  );
};

export default Institution;