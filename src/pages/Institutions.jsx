import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from "react-helmet-async";
import { useNavigate } from 'react-router-dom';

import banner1 from '../assets/images/ban2.jpeg';
import banner2 from '../assets/images/ban1.jpeg';
import banner3 from '../assets/images/ban3.jpeg';

const bannerSlides = [banner1, banner2, banner3];

// YAHAN SE 'export' HATA DIYA HAI TAAKI HMR ERROR NA AAYE
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
    image: 'https://images.unsplash.com/photo-1580582932520aed937b7b?auto=format&fit=crop&w=800&q=80',
    description: 'Bairagikami J.b. School is a premier government institution dedicated to quality education, rural student empowerment, and holistic child development in Tripura.',
    established: '1998',
    totalStudents: '450+',
    facilities: ['Digital Classrooms', 'Sports Ground', 'Science Lab', 'Library', 'Free Mid-day Meals'],
    contact: { phone: '+91 98765 43210', email: 'contact@bairagikamischool.edu.in', address: 'Bairagikami Village, Dhalai District, Tripura - 799278' }
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
    image: 'https://images.unsplash.com/photo-154182907084a7d30dd3f3?auto=format&fit=crop&w=800&q=80',
    description: 'St. Thomas English Medium School offers world-class education, state-of-the-art computer labs, and focus on extracurricular activities for competitive excellence.',
    established: '2005',
    totalStudents: '1200+',
    facilities: ['AC Computer Labs', 'Robotics Club', 'Indoor Sports Complex', 'Auditorium', 'School Bus Service'],
    contact: { phone: '+91 91234 56789', email: 'info@stthomasschool.ac.in', address: 'Main Road, Dhalai, Tripura - 799275' }
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
    image: 'https://images.unsplash.com/photo-15230508-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    description: 'Chandpur Higher Secondary School provides excellent secondary and higher secondary science and arts streams with experienced faculty.',
    established: '1985',
    totalStudents: '850+',
    facilities: ['Physics & Chemistry Labs', 'NCC Cadets', 'Playground', 'Library'],
    contact: { phone: '+91 94361 00000', email: 'chandpurhsschool@gmail.com', address: 'Chandpur, Dhalai District, Tripura - 799279' }
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
    image: 'https://images.unsplash.com/photo-1509062526-355977927d7?auto=format&fit=crop&w=800&q=80',
    description: 'Focusing on early child education, values, language mastery, and creative learning models in a secure environment.',
    established: '2012',
    totalStudents: '350+',
    facilities: ['Smart Classes', 'Activity Room', 'Play Area', 'CCTV Campus'],
    contact: { phone: '+91 98620 11223', email: 'radhakrishnaschool@outlook.com', address: 'Radhakrishna Nagar, Dhalai, Tripura - 799277' }
  }
];

const categoryTabs = [
  { id: 'All', label: 'All Institutions', icon: '' },
  { id: 'Government', label: 'Government', icon: '' },
  { id: 'Private', label: 'Private', icon: '' },
  { id: 'Primary', label: 'Primary', icon: '' },
  { id: 'High School', label: 'High School', icon: '' },
  { id: 'Higher Secondary', label: 'Higher Secondary', icon: '' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const Institutions = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [activeTab, setActiveTab] = useState('All');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobileFilterExpanded, setIsMobileFilterExpanded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === bannerSlides.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

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
        <meta name="description" content="Find and explore best schools and institutions across India on Letsbharat." />
      </Helmet>

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

        <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-lg bg-slate-900 min-h-[220px] sm:min-h-[300px] md:min-h-[380px] flex flex-col justify-between p-4 sm:p-8 md:p-10 transition-all duration-300">
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
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent z-0"></div>
          
          <div className="relative z-10 max-w-md">
            <span className="inline-block px-3 py-1 bg-yellow-400 text-slate-950 text-[10px] sm:text-xs font-black tracking-wider uppercase rounded-full mb-2 shadow-sm">
              Verified Directory
            </span>
            <h2 className="text-white text-xl sm:text-3xl font-black drop-shadow-md">
              Discover Top Institutions
            </h2>
          </div>

          {/* DESKTOP FILTERS */}
          <div className="hidden md:block relative z-10 w-full bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/20 mt-6">
            <div className="grid grid-cols-12 gap-3 items-center">
              <div className="col-span-4 relative flex items-center">
                <svg className="w-5 h-5 absolute left-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 0114 0z" />
                </svg>
                <input type="text" placeholder="Search school name or keyword..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl text-xs sm:text-sm font-medium text-slate-800 outline-none border border-slate-200 focus:border-yellow-500 focus:bg-white transition-all" />
              </div>
              <div className="col-span-2">
                <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 rounded-xl text-xs sm:text-sm font-medium text-slate-700 outline-none border border-slate-200 focus:border-yellow-500 transition-all cursor-pointer">
                  <option value="All">All States</option><option value="Tripura">Tripura</option><option value="Assam">Assam</option>
                </select>
              </div>
              <div className="col-span-2">
                <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 rounded-xl text-xs sm:text-sm font-medium text-slate-700 outline-none border border-slate-200 focus:border-yellow-500 transition-all cursor-pointer">
                  <option value="All">All Districts</option><option value="Dhalai">Dhalai</option><option value="West Tripura">West Tripura</option>
                </select>
              </div>
              <div className="col-span-2">
                <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 rounded-xl text-xs sm:text-sm font-medium text-slate-700 outline-none border border-slate-200 focus:border-yellow-500 transition-all cursor-pointer">
                  <option value="All">All Types</option><option value="Government">Government</option><option value="Private">Private</option>
                </select>
              </div>
              <div className="col-span-2">
                <button className="w-full py-2.5 bg-slate-900 hover:bg-yellow-500 text-white hover:text-black font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
                  Search
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pt-3 mt-2 border-t border-slate-100 scrollbar-hide">
              {categoryTabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${ activeTab === tab.id ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200' }`}>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* STATS SUMMARY ROW */}
      <div className="max-w-[1350px] mx-auto mt-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-lg">🏫</div>
            <div><h4 className="text-base sm:text-xl font-bold text-slate-900">00+</h4><p className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-wide">Total Institutions</p></div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-lg">🏦</div>
            <div><h4 className="text-base sm:text-xl font-bold text-slate-900">00+</h4><p className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-wide">Government</p></div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-black text-lg">🎓</div>
            <div><h4 className="text-base sm:text-xl font-bold text-slate-900">00+</h4><p className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-wide">Private</p></div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-lg">📍</div>
            <div><h4 className="text-base sm:text-xl font-bold text-slate-900">28</h4><p className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-wide">States Covered</p></div>
          </div>
        </div>
      </div>

      {/* INSTITUTIONS CARDS SECTION */}
      <div className="max-w-[1350px] mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-5">
          <div><h2 className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tight">Popular Schools & Institutions</h2><p className="text-slate-500 text-xs">Explore top verified institutions near you</p></div>
        </div>

        {/* 💻 DESKTOP GRID CARDS */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredInstitutions.map((item) => (
            <motion.div key={item.id} variants={cardItemVariants} whileHover={{ y: -6 }} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div className="p-4">
                <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-md border mb-3 ${item.badgeColor}`}>{item.type}</span>
                <h3 className="text-base font-bold text-slate-900 line-clamp-1 mb-1">{item.name}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mb-1">📍 {item.location}</p>
                <p className="text-xs font-medium text-slate-400 mb-3">{item.classes}</p>
              </div>
              <div className="w-full h-36 bg-slate-100 relative overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-3 bg-slate-50 border-t border-slate-100">
                {/* YAHAN CLICK HONE PAR NAVIGATION HOGA */}
                <button
                  onClick={() => navigate(`/institution/${item.id}`)}
                  className="w-full py-2 bg-white hover:bg-slate-900 text-slate-800 hover:text-white border border-slate-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  View Details →
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 📱 MOBILE CARDS */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex md:hidden flex-col gap-3">
          {filteredInstitutions.map((item) => (
            <motion.div
              key={item.id}
              variants={cardItemVariants}
              onClick={() => navigate(`/institution/${item.id}`)}
              className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between gap-3 active:scale-[0.98] transition-all cursor-pointer"
            >
              <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow min-w-0">
                <span className={`inline-block text-[8px] font-extrabold px-2 py-0.5 rounded border mb-0.5 ${item.badgeColor}`}>{item.type}</span>
                <h3 className="text-sm font-bold text-slate-900 truncate">{item.name}</h3>
                <p className="text-[11px] text-slate-500 flex items-center gap-1 truncate">📍 {item.location}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Institutions;