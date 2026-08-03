import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';


import nielitcard from '../assets/images/nielitcard.jpeg';

// Extended Mock Data for Multiple Institutions (Fixing the Single Page Connect Bug)
const institutionsData = [
  {
  id: 1,
  name: 'National Institute of Electronics and Information Technology (NIELIT), Agartala',
  type: 'Government',
  badgeColor: 'bg-blue-200 text-blue-900',
  state: 'Tripura',
  district: 'West Tripura',
  location: 'R.K. Nagar, Khayerpur, Agartala, Tripura - 799008',
  classes: 'B.Tech, M.Tech, Diploma, Skill Development & Certification Courses',
  established: '2009',
  totalStudents: '1000+',
  facultyCount: '50+',

  bannerImages: [
    'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80'
  ],

  description:
    'National Institute of Electronics and Information Technology (NIELIT) Agartala is an autonomous scientific society under the Ministry of Electronics & Information Technology (MeitY), Government of India. The institute provides quality education, research, training, and skill development in Electronics, Computer Science, Artificial Intelligence, Cyber Security, Internet of Things, Data Science, and emerging technologies.',

  gallery: [
    {
      id: 1,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=700&q=80',
      title: 'Campus Building'
    },
    {
      id: 2,
      type: 'photo',
      image:nielitcard,
      title: 'Computer Laboratory'
    },
    {
      id: 3,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80',
      title: 'Digital Classroom'
    },
    {
      id: 4,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=700&q=80',
      title: 'Students Learning'
    },
    {
      id: 5,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=700&q=80',
      title: 'Innovation Lab'
    },
    {
      id: 6,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=700&q=80',
      title: 'Seminar Hall'
    }
  ],

  principal: {
    name: 'Director, NIELIT Agartala',
    role: 'Centre Head',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    quote:
      'NIELIT Agartala is committed to providing world-class technical education, innovation, and skill development to empower students for the digital future.',
    features: [
      'Quality Technical Education',
      'Innovation & Research',
      'Industry-Oriented Training'
    ]
  },

  faculty: [
    {
      name: 'Electronics Department',
      role: 'Faculty Team',
      experience: 'Experienced Professionals',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      subject: 'Electronics Engineering'
    },
    {
      name: 'Computer Science Department',
      role: 'Faculty Team',
      experience: 'Experienced Professionals',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      subject: 'Computer Science'
    },
    {
      name: 'Information Technology',
      role: 'Faculty Team',
      experience: 'Experienced Professionals',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      subject: 'Information Technology'
    }
  ],

  facilities: [
    {
      title: 'Smart Classrooms',
      desc: 'Modern digital classrooms with projectors.',
      icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3',
      color: 'text-blue-500'
    },
    {
      title: 'Computer Labs',
      desc: 'Advanced computing laboratories.',
      icon: 'M5 17h14',
      color: 'text-green-500'
    },
    {
      title: 'AI & IoT Labs',
      desc: 'Artificial Intelligence and IoT practical labs.',
      icon: 'M19 11H5',
      color: 'text-purple-500'
    },
    {
      title: 'Digital Library',
      desc: 'Technical books and online journals.',
      icon: 'M12 6v13',
      color: 'text-indigo-500'
    },
    {
      title: 'Seminar Hall',
      desc: 'Workshops, seminars and conferences.',
      icon: 'M12 8v4',
      color: 'text-orange-500'
    },
    {
      title: 'Wi-Fi Campus',
      desc: 'High-speed internet throughout campus.',
      icon: 'M8 16l4-4',
      color: 'text-cyan-500'
    }
  ],

  achievements: [
    {
      title: 'MeitY Institute',
      desc: 'Autonomous body under Government of India',
      icon: '🏛️'
    },
    {
      title: 'Skill Development',
      desc: 'Digital India training programs',
      icon: '💻'
    },
    {
      title: 'Industry Training',
      desc: 'Professional certification courses',
      icon: '🎓'
    },
    {
      title: 'Research & Innovation',
      desc: 'Emerging technologies',
      icon: '🚀'
    },
    {
      title: 'Placement Support',
      desc: 'Career guidance and industry interaction',
      icon: '🏆'
    }
  ],

  alumni: [
    {
      name: 'NIELIT Graduates',
      role: 'Software Engineers',
      quote: 'Graduates are working across IT companies and government organizations.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Certified Professionals',
      role: 'Cyber Security Experts',
      quote: 'Industry-ready technical professionals.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Technology Innovators',
      role: 'Entrepreneurs',
      quote: 'Building startups and digital solutions.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    }
  ],

  contact: {
    phone: '+91 8794822459',
    email: 'agartala@nielit.gov.in',
    website: 'https://nielit.gov.in/agartala',
    address: 'NIELIT Agartala, R.K. Nagar, Khayerpur, Agartala, Tripura - 799008'
  }
},
  {
    id: 2,
    name: 'Agartala Model High School',
    type: 'Government',
    badgeColor: 'bg-blue-200 text-blue-900',
    state: 'Tripura',
    district: 'West Tripura',
    location: 'Capital Complex, Agartala, Tripura - 799006',
    classes: '6 - 12',
    established: '1985',
    totalStudents: '1200+',
    facultyCount: '60+',
    bannerImages: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Agartala Model High School stands for academic rigor, technological advancement, and all-round student growth in the heart of Tripura.',
    gallery: [
      { id: 1, type: 'photo', url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80', title: 'Main Building' },
      { id: 2, type: 'photo', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80', title: 'Smart Class' }
    ],
    principal: {
      name: 'Dr. Kishore Kumar Roy',
      role: 'Principal',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      quote: 'Excellence is not an act, but a habit cultivated through consistent hard work.',
      features: ['Advanced Labs', 'Digital Library', 'Sports Academy']
    },
    faculty: [
      { name: 'Dr. Moushumi Das', role: 'Vice Principal & Senior Faculty', experience: '15 Years Experience', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80', subject: 'Biology' }
    ],
    facilities: [
      { title: 'Computer Lab', desc: 'High-speed internet and modern systems.', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', color: 'text-blue-500' }
    ],
    achievements: [{ title: 'State Science Fair Winner', desc: '2025', icon: '🏆' }],
    alumni: [{ name: 'Rahul Roy', role: 'IAS Officer', quote: 'The foundation built here was invaluable.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' }]
  }
  // Aap aur bhi institutions yaha add kar sakte hain with id 3, 4 etc.
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const InstitutionsPages = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeGalleryTab, setActiveGalleryTab] = useState('All');
  
  // State for Automatic Banner Sliding
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // State for Gallery Double Click Pop-up with Background Blur (Lightbox)
  const [selectedMedia, setSelectedMedia] = useState(null);

  // Find Institution safely using route param id or fallback to first
  const institution = institutionsData.find((item) => item.id === parseInt(id)) || institutionsData[0];

  // Auto Banner Slider Effect
  useEffect(() => {
    if (!institution?.bannerImages || institution.bannerImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % institution.bannerImages.length);
    }, 4000); // changes every 4 seconds
    return () => clearInterval(interval);
  }, [institution]);

  const filteredGallery = activeGalleryTab === 'All' 
    ? institution.gallery 
    : institution.gallery.filter(item => item.type === (activeGalleryTab === 'Photos' ? 'photo' : 'video'));

  if (!institution) return <div className="min-h-screen flex items-center justify-center font-bold">Loading Institution...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff5f8] via-white to-[#fffde7] font-sans text-gray-900 pb-16 selection:bg-yellow-300 relative">
      
      {/* 1. HERO SECTION (Automatic Banner Sliding with Controls) */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-[50vh] md:h-[65vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl group"
        >
          {/* Slider Images */}
          {institution.bannerImages.map((imgUrl, idx) => (
            <div 
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentBannerIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`}
            >
              <img src={imgUrl} alt="Cover Banner" className="w-full h-full object-cover" />
            </div>
          ))}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none"></div>
          
          {/* Manual Carousel Navigation Arrows */}
          <button 
            onClick={() => setCurrentBannerIndex((prev) => (prev === 0 ? institution.bannerImages.length - 1 : prev - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm text-black rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg z-10"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button 
            onClick={() => setCurrentBannerIndex((prev) => (prev + 1) % institution.bannerImages.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm text-black rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg z-10"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </button>

          {/* Banner Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-6 z-10">
            <div>
              <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4 tracking-wide shadow-sm ${institution.badgeColor}`}>
                {institution.type}
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 tracking-tight drop-shadow-md">
                {institution.name}
              </h1>
              <p className="text-sm md:text-base text-gray-200 flex items-center gap-2 font-medium">
                <svg className="w-5 h-5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                {institution.location}
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/50 text-white hover:bg-white hover:text-black transition-all font-semibold backdrop-blur-sm">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                Follow
              </button>
              <button className="px-8 py-3 rounded-full bg-[#FFB800] text-black hover:bg-[#e5a600] transition-all font-bold shadow-lg shadow-yellow-500/20">
                Contact School
              </button>
            </div>
          </div>
          
          {/* Dynamic Slider Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
             {institution.bannerImages.map((_, idx) => (
               <button 
                 key={idx}
                 onClick={() => setCurrentBannerIndex(idx)}
                 className={`h-2 rounded-full transition-all ${idx === currentBannerIndex ? 'w-6 bg-[#FFB800]' : 'w-2 bg-white/50'}`}
               />
             ))}
          </div>
        </motion.div>
      </div>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
        
        {/* 2. ABOUT INSTITUTION */}
        <motion.section variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">About Institution</h2>
            <div className="w-16 h-1 bg-yellow-400 mb-6 rounded-full"></div>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base font-medium mb-4">
              {institution.description}
            </p>
            <button className="text-slate-900 font-bold flex items-center gap-2 hover:text-[#FFB800] transition-colors">
              Read More <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>
          
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100 grid grid-cols-2 gap-4 md:gap-8">
            <StatCard icon="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" title="Classes Offered" value={institution.classes} />
            <StatCard icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" title="Established" value={institution.established} />
            <StatCard icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" title="Total Students" value={institution.totalStudents} />
            <StatCard icon="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" title="Faculty Members" value={institution.facultyCount} />
          </div>
        </motion.section>

        {/* 3. GALLERY SECTION (Double Click to Pop-up with Blurred Background) */}
        <motion.section variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Gallery</h2>
              <p className="text-xs text-slate-500 font-medium mt-1">💡 Tip: Double click on any photo or video to pop-up & view clearly!</p>
            </div>
            
            <div className="flex items-center justify-between sm:w-auto w-full gap-4">
              <div className="flex items-center bg-white p-1 rounded-full shadow-sm border border-slate-100">
                {['All', 'Photos', 'Videos'].map(tab => (
                  <button key={tab} onClick={() => setActiveGalleryTab(tab)} className={`px-5 py-1.5 rounded-full text-xs md:text-sm font-bold transition-all ${activeGalleryTab === tab ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'}`}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <AnimatePresence>
              {filteredGallery.map((item) => (
                <motion.div 
                  key={item.id} 
                  layout 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.9 }} 
                  onDoubleClick={() => setSelectedMedia(item)}
                  title="Double click to enlarge"
                  className="bg-white rounded-2xl p-2 pb-3 shadow-sm border border-slate-100 group cursor-pointer hover:shadow-md transition-all relative"
                >
                  <div className="relative h-32 md:h-40 rounded-xl overflow-hidden mb-2">
                    <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {item.type === 'video' && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-[#ff3366] shadow-lg">
                           <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                        <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">{item.duration}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <h4 className="text-xs font-bold text-slate-800 truncate">{item.title}</h4>
                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.type === 'video' ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>}
                    </svg>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.section>

        {/* 4. FROM THE PRINCIPAL */}
        <motion.section variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-10 items-center">
          <div className="w-full md:w-1/4 flex flex-col items-center text-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-4 shadow-md bg-slate-100">
              <img src={institution.principal.image} alt={institution.principal.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">{institution.principal.name}</h3>
            <p className="text-sm font-medium text-slate-500">{institution.principal.role}</p>
          </div>
          
          <div className="w-full md:w-3/4 relative">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-10 h-10 text-pink-400 opacity-60" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">From the Principal</h2>
            </div>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed font-medium mb-6">
              {institution.principal.quote}
            </p>
            <div className="flex flex-wrap gap-4 md:gap-8">
               {institution.principal.features.map((feature, idx) => (
                 <div key={idx} className="flex items-center gap-2">
                   <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                   <span className="text-sm font-bold text-slate-800">{feature}</span>
                 </div>
               ))}
            </div>
          </div>
        </motion.section>

        {/* 5. OUR FACULTY SECTION (Newly Added) */}
        <motion.section variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Our Faculty</h2>
              <div className="w-16 h-1 bg-yellow-400 mt-2 rounded-full"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {institution.faculty.map((member, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -5 }} 
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center gap-5"
              >
                <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-md">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-yellow-100 text-yellow-800 mb-1">
                    {member.subject}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base">{member.name}</h3>
                  <p className="text-xs font-semibold text-slate-600 mb-1">{member.role}</p>
                  <p className="text-xs font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md inline-block">{member.experience}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 6. KEY FACILITIES */}
        <motion.section variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">Key Facilities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {institution.facilities.map((fac, idx) => (
              <motion.div key={idx} whileHover={{ y: -5 }} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm text-center flex flex-col items-center">
                <div className={`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-3 ${fac.color}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={fac.icon}/></svg>
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">{fac.title}</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-tight">{fac.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

      </div>





      {/* GALLERY POP-UP MODAL WITH BACKGROUND BLUR */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl relative border border-white/20"
            >
              <button 
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/70 hover:bg-black text-white rounded-full flex items-center justify-center font-bold text-lg transition-all"
              >
                ✕
              </button>
              
              <div className="relative max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
                <img src={selectedMedia.url} alt={selectedMedia.title} className="w-full h-auto max-h-[70vh] object-contain" />
              </div>
              
              <div className="p-6 bg-white flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">{selectedMedia.title}</h3>
                  <p className="text-xs text-slate-500 font-medium capitalize">Type: {selectedMedia.type}</p>
                </div>
                <button 
                  onClick={() => setSelectedMedia(null)}
                  className="px-6 py-2.5 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-slate-800 transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

// Helper Stat Card Component with clear background and sharp text
const StatCard = ({ icon, title, value }) => (
  <div className="bg-slate-50/80 border border-slate-100 p-4 rounded-2xl flex flex-col justify-between">
    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-900 mb-3">
      <svg className="w-5 h-5 text-[#FFB800]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon}/></svg>
    </div>
    <div>
      <h4 className="text-xl font-black text-slate-900 tracking-tight">{value}</h4>
      <p className="text-xs font-semibold text-slate-500">{title}</p>
    </div>
  </div>
);

export default InstitutionsPages;