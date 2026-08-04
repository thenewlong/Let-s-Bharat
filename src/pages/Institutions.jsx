import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from "react-helmet-async";
import { useNavigate } from 'react-router-dom';

import banner1 from '../assets/images/ban2.jpeg';
import banner2 from '../assets/images/ban1.jpeg';
import banner3 from '../assets/images/ban3.jpeg';

//cards images
import nielit from '../assets/images/nielit.jpeg';

const bannerSlides = [banner1, banner2, banner3];

const institutionsData = [
 {
  id: 1,
  name: 'National Institute of Electronics & Information Technology (NIELIT), Agartala',
  type: 'Government',
  badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
  state: 'Tripura',
  district: 'West Tripura',
  location: 'R.K. Nagar, Khayerpur, Agartala, Tripura',
  classes: 'Diploma, B.Tech, M.Tech & Skill Development Courses',
  image: nielit,
  description: 'NIELIT Agartala is an autonomous institute under the Ministry of Electronics and Information Technology (MeitY), Government of India. Established in 2009, the institute offers quality education, professional training, research, and skill development programs in Electronics, Computer Science, Information Technology, Cyber Security, Artificial Intelligence, Data Science, and related fields.',
  established: '2009',
  totalStudents: '1000+',
  facilities: [
    'Smart Classrooms',
    'Computer Laboratories',
    'AI & Cyber Security Labs',
    'Digital Library',
    'Seminar Hall',
    'Wi-Fi Campus',
    'Hostel',
    'Training & Placement Cell'
  ],
  contact: {
    phone: '+91 8794822459',
    email: 'agartala@nielit.gov.in',
    address: 'NIELIT Agartala Centre, R.K. Nagar (Opposite NEEPCO), Khayerpur, Agartala, West Tripura - 799008'
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

// Added Emojis for mobile view matching the design reference
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
  
  // Controls the mobile filter drawer visibility
  const [isMobileFilterExpanded, setIsMobileFilterExpanded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === bannerSlides.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedState('All');
    setSelectedDistrict('All');
    setSelectedType('All');
    setActiveTab('All');
  };

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
    <div className="min-h-screen bg-[#f8f9fc] font-sans pb-16 selection:bg-yellow-400">
      <Helmet>
        <title>Institutions & Schools Directory | Letsbharat</title>
        <meta name="description" content="Find and explore best schools and institutions across India on Letsbharat." />
      </Helmet>

      {/* HEADER & HERO BANNER SLIDER */}
      <div className="max-w-[1350px] mx-auto pt-4 md:pt-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            NEXT MONTHS ARE AVAILABLE INSTITUTIONS DIRECTORY
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

          {/* DESKTOP FILTERS (Hidden on Mobile) */}
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
                  <option value="All">All States</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Assam">Assam</option>
                  <option value ="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value ="Bihar">Bihar</option>
                  <option value ="Chhattisgarh">Chhattisgarh</option>
                  <option value ="Goa">Goa</option>
                  <option value ="Gujarat">Gujarat</option>
                  <option value ="Haryana">Haryana</option>
                  <option value ="Himachal Pradesh">Himachal Pradesh</option>
                  <option value ="Jharkhand">Jharkhand</option>
                  <option value ="Karnataka">Karnataka</option>
                  <option value ="Kerala">Kerala</option>
                  <option value ="Madhya Pradesh">Madhya Pradesh</option>
                  <option value ="Maharashtra">Maharashtra</option>
                  <option value ="Manipur">Manipur</option>
                  <option value ="Meghalaya">Meghalaya</option>
                  <option value ="Mizoram">Mizoram</option>
                  <option value ="Nagaland">Nagaland</option>
                  <option value ="Odisha">Odisha</option>
                  <option value ="Punjab">Punjab</option>
                  <option value ="Rajasthan">Rajasthan</option>
                  <option value ="Sikkim">Sikkim</option>
                  <option value ="Tamil Nadu">Tamil Nadu</option>
                  <option value ="Telangana">Telangana</option>
        
                  <option value ="Uttar Pradesh">Uttar Pradesh</option>
                  <option value ="Uttarakhand">Uttarakhand</option>
                  <option value ="West Bengal">West Bengal</option>
                  

                </select>
              </div>
              <div className="col-span-2">
                <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 rounded-xl text-xs sm:text-sm font-medium text-slate-700 outline-none border border-slate-200 focus:border-yellow-500 transition-all cursor-pointer">
                  <option value="All">All Districts</option>
                  <option value="West Tripura">West Tripura</option>
                  <option value="Dhalai">Dhalai</option>
                  <option value="South Tripura">South Tripura</option>
                  <option value="North Tripura">North Tripura</option>
                  <option value="Khowai">Khowai</option>
                  <option value="Sepahijala">Sepahijala</option>
                  <option value="Gomati">Gomati</option>
                  <option value="Unakoti">Unakoti</option>
                  <option value="Itanagar">Itanagar</option>
                  <option value="Aizawl">Aizawl</option>
                  <option value="Kohima">Kohima</option>
                  <option value="Imphal">Imphal</option>
                  <option value="Shillong">Shillong</option>
                  < option value="Agartala">Agartala</option>
                  < option value="Gangtok">Gangtok</option>
                  < option value="Dispur">Dispur</option>
                  < option value="Patna">Patna</option>
                  < option value="Raipur">Raipur</option>
                  < option value="Panaji">Panaji</option>
                  < option value="Gandhinagar">Gandhinagar</option>
                  < option value="Chandigarh">Chandigarh</option>
                  < option value="Shimla">Shimla</option>
                  < option value="Ranchi">Ranchi</option>
                  < option value="Bengaluru">Bengaluru</option>
                  < option value="Thiruvananthapuram">Thiruvananthapuram</option>
                  < option value="Bhopal">Bhopal</option>
                  < option value="Mumbai">Mumbai</option>
            
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

        {/* 📱 MOBILE SEARCH & FILTER BAR (Visible only on small screens) */}
        <div className="md:hidden mt-4 bg-white rounded-2xl shadow-sm border border-slate-100 p-2 flex items-center justify-between gap-2 transition-all">
          <div className="flex-1 relative flex items-center">
            <svg className="w-5 h-5 absolute left-3 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search school name or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 bg-transparent text-xs font-medium text-slate-800 outline-none placeholder:text-slate-400"
            />
          </div>
          <button
            onClick={() => setIsMobileFilterExpanded(!isMobileFilterExpanded)}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-slate-900 text-yellow-400 font-bold text-xs rounded-xl shadow-sm transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {isMobileFilterExpanded ? 'Close' : 'Filter'}
          </button>
        </div>

        {/* 📱 MOBILE FILTER EXPANDED DRAWER */}
        <AnimatePresence>
          {isMobileFilterExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              className="md:hidden mt-3 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
            >
              <div className="p-4 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Filter Institutions</h3>
                  <button onClick={() => setIsMobileFilterExpanded(false)} className="text-xs font-semibold text-slate-400 hover:text-slate-700 flex items-center gap-1">
                    ✕ Close
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5 tracking-wider">State</label>
                    <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 rounded-xl text-sm font-medium text-slate-700 outline-none border border-slate-200 focus:border-yellow-400 appearance-none">
                      <option value="All">All States</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Assam">Assam</option>
                      < option value ="Arunachal Pradesh">Arunachal Pradesh</option>
                      <option value ="Bihar">Bihar</option>
                      <option value ="Chhattisgarh">Chhattisgarh</option>
                      < option value ="Goa">Goa</option>
                      <option value ="Gujarat">Gujarat</option>
                      <option value ="Haryana">Haryana</option>
                      < option value ="Himachal Pradesh">Himachal Pradesh</option>
                      <option value ="Jharkhand">Jharkhand</option>
                      < option value ="Karnataka">Karnataka</option>
                      < option value ="Kerala">Kerala</option>
                      < option value ="Madhya Pradesh">Madhya Pradesh</option>
                      < option value ="Maharashtra">Maharashtra</option>
                      < option value ="Manipur">Manipur</option>
                      < option value ="Meghalaya">Meghalaya</option>
                      < option value ="Mizoram">Mizoram</option>
                      < option value ="Nagaland">Nagaland</option>
                      < option value ="Odisha">Odisha</option>
                      < option value ="Punjab">Punjab</option>
                      < option value ="Rajasthan">Rajasthan</option>
                      < option value ="Sikkim">Sikkim</option>
                      < option value ="Tamil Nadu">Tamil Nadu</option>
                      < option value ="Telangana">Telangana</option>

                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5 tracking-wider">District</label>
                    <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 rounded-xl text-sm font-medium text-slate-700 outline-none border border-slate-200 focus:border-yellow-400 appearance-none">
                      <option value="All">All Districts</option>
                   <option value="West Tripura">West Tripura</option>
                   < option value="Dhalai">Dhalai</option>
                   < option value="South Tripura">South Tripura</option>
                   < option value="North Tripura">North Tripura</option>
                   < option value="Khowai">Khowai</option>
                   < option value="Sepahijala">Sepahijala</option>
                   < option value="Gomati">Gomati</option>
                   < option value="Unakoti">Unakoti</option>
                   < option value="Itanagar">Itanagar</option>
                   < option value="Aizawl">Aizawl</option>
                   < option value="Kohima">Kohima</option>
                   < option value="Imphal">Imphal</option>
                   <  option value="Shillong">Shillong</option>
                   < option value="Agartala">Agartala</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5 tracking-wider">Institution Type</label>
                    <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 rounded-xl text-sm font-medium text-slate-700 outline-none border border-slate-200 focus:border-yellow-400 appearance-none">
                      <option value="All">All Types</option><option value="Government">Government</option><option value="Private">Private</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2.5 tracking-wider">Category</label>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {categoryTabs.map((tab) => (
                      <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border flex items-center gap-1.5 ${ activeTab === tab.id ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100' }`}>
                        <span className="text-sm">{tab.icon}</span> {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button onClick={resetFilters} className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 transition-all">
                    Reset Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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