import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// 🔴 LOCAL IMAGE IMPORTS 🔴
// ==========================================
import ne from '../assets/images/ne.jpeg';
import n1 from '../assets/images/n1.jpeg';
import n2 from '../assets/images/n2.jpeg';

import igl from '../assets/images/gate.webp';
import igl1 from '../assets/images/igl01.webp';
import igl2 from '../assets/images/igl02.webp';

import kvlibary from '../assets/images/kvlibary.jpeg';
import kvcampus from '../assets/images/kvcampus.webp';
import kvart from '../assets/images/kvart.jpeg';

import galleryImg1 from '../assets/images/lab.jpeg';
import galleryImg2 from '../assets/images/play.jpeg';
import galleryImg3 from '../assets/images/e.jpeg';
import galleryImg4 from '../assets/images/campus1.jpeg';
import galleryImg5 from '../assets/images/student.jpeg';
import galleryImg6 from '../assets/images/campus.jpeg';



import iglgalleryImg1 from '../assets/images/gate.webp';
import iglgalleryImg2 from '../assets/images/students.webp';
import iglgalleryImg3 from '../assets/images/iglcampus.webp';
import iglgalleryImg4 from '../assets/images/class.webp';
import iglgalleryImg5 from '../assets/images/igl01.webp';
import iglgalleryImg6 from '../assets/images/igl02.webp';

import kvgalleryImg1 from '../assets/images/kvlibary.jpeg';
import kvgalleryImg2 from '../assets/images/kvcampus.webp';
import kvgalleryImg3 from '../assets/images/kvact.webp';
import kvgalleryImg4 from '../assets/images/kvsport.webp';
import kvgalleryImg5 from '../assets/images/kvacts.webp';
import kvgalleryImg6 from '../assets/images/kv.webp';

import principalImg from '../assets/images/nielit-D.jpg';

import iglprincipalImg from '../assets/images/dp.jpg';

import kvprincipalImg from '../assets/images/dp.jpg';

import startup1 from '../assets/images/startup1.jpeg';
import startup2 from '../assets/images/startup2.jpeg';
import startup3 from '../assets/images/startup3.jpeg';
import startup4 from '../assets/images/startup4.jpeg';

// ==========================================
// MULTI-INSTITUTION MOCK DATA
// ==========================================
const institutionsData = [
  {
    id: 1,
    name: 'NIELIT Agartala',
    type: 'Government',
    badgeColor: 'bg-blue-100 text-blue-700',
    state: 'Tripura',
    district: 'West Tripura',
    location: 'NIELIT Agartala Centre, Indranagar, Agartala, Tripura - 799006',
    classes: 'B.Tech,M.Tech,Diploma,Skill Development & Certification Courses',
    established: '2009',
    totalStudents: 2500,
    facultyCount: 45,
    description:
      'National Institute of Electronics & Information Technology (NIELIT), Agartala is a premier Government of India institute under the Ministry of Electronics & Information Technology (MeitY). The institute provides high-quality education, skill development, IT training, electronics education, digital literacy, cybersecurity, AI, IoT, programming, and industry-oriented certification programs to students, professionals, and government employees.',
    bannerImages: [ne, n1, n2], // Added fallback banner images for the map function
    gallery: [
      { id: 1, type: 'photo', url: galleryImg1, title: 'Computer Laboratory' },
      { id: 2, type: 'photo', url: galleryImg2, title: 'Playground' },
      { id: 3, type: 'photo', url: galleryImg3, title: 'Electronics Lab' },
      { id: 4, type: 'photo', url: galleryImg4, title: 'Campus View' },
      { id: 5, type: 'photo', url: galleryImg5, title: 'Students', duration: '01:35' },
      { id: 6, type: 'photo', url: galleryImg6, title: 'NIELIT Campus' }
    ],
    principal: {
      name: 'Executive Director',
      role: 'Centre Head, NIELIT Agartala',
      image: principalImg,
      quote:
        'Our mission is to empower youth through quality technical education, digital literacy, emerging technologies, and industry-relevant skill development that contributes towards Digital India.',
      features: [
        'Skill Development',
        'Digital India',
        'Industry Ready Training'
      ]
    },
    facilities: [
      {
        title: 'Advanced Computer Labs',
        desc: 'Modern laboratories equipped with high-performance computers and networking infrastructure.',
        icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
        color: 'text-blue-500'
      },
      {
        title: 'Electronics Laboratory',
        desc: 'Hands-on practical learning for embedded systems, IoT, and electronics.',
        icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
        color: 'text-purple-500'
      },
      {
        title: 'Smart Classrooms',
        desc: 'Interactive smart classrooms with projectors and digital teaching aids.',
        icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z',
        color: 'text-green-500'
      },
      {
        title: 'Digital Library',
        desc: 'Access to technical books, journals, e-learning resources, and research materials.',
        icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
        color: 'text-teal-500'
      },
      {
        title: 'Seminar & Conference Hall',
        desc: 'Regular workshops, seminars, hackathons, and placement sessions.',
        icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17',
        color: 'text-orange-500'
      },
      {
        title: 'Wi-Fi Enabled Campus',
        desc: 'High-speed internet connectivity across the institute.',
        icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
        color: 'text-blue-600'
      }
    ],
    achievements: [
      { title: 'Government of India Institute', desc: 'Autonomous Scientific Society under MeitY', icon: '🏛️' },
      { title: 'Digital Literacy Programs', desc: 'CCC, BCC, ECC and Digital Skill Courses', icon: '💻' },
      { title: 'NIELIT O & A Level', desc: 'National IT Certification Programs', icon: '🎓' },
      { title: 'Emerging Technologies', desc: 'AI, IoT, Cyber Security, Data Science', icon: '🤖' },
      { title: 'Skill Development', desc: 'Industry-oriented Training & Placement Support', icon: '🚀' }
    ],
    alumni: [
      { name: 'Unknown', role: 'Software Engineer, Infosys', quote: 'The practical training at NIELIT helped me build strong technical skills.', image: startup1 },
      { name: 'Unknown', role: 'Cyber Security Analyst', quote: 'The cybersecurity program provided industry-level exposure and confidence.', image: startup2 },
      { name: 'Unknown', role: 'Full Stack Developer', quote: 'NIELIT certifications helped me secure my first IT job.', image: startup3 },
      { name: 'Unknown', role: 'Data Analyst', quote: 'The faculty and hands-on projects made learning practical and effective.', image: startup4 }
    ]
  },
  {
    id: 2,
    name: 'Independent Golden Jubilee Government Higher Secondary School, Pasighat',
    type: 'Government',
    badgeColor: 'bg-green-100 text-green-700',
    state: 'Arunachal Pradesh',
    district: 'East Siang',
    location: 'Pasighat, East Siang District, Arunachal Pradesh - 791102',
    classes: 'Classes 1 - 12',
    established: '1947',
    totalStudents: 1760,
    facultyCount: 56,
    description:
      'Independent Golden Jubilee Government Higher Secondary School, Pasighat is a historic government higher secondary school located in Pasighat, East Siang district of Arunachal Pradesh. The school is recognised by CBSE, New Delhi, and offers Humanities, Commerce, and Science streams. With a long educational heritage and the motto "Come to learn, go to serve", the institution focuses on academic development, student growth, discipline, and service to society.',
    bannerImages: [igl, igl1, igl2], // Added fallback banner images for the map function
    gallery: [
      { id: 1, type: 'photo', url: iglgalleryImg1, title: 'School Campus' },
      { id: 2, type: 'photo', url: iglgalleryImg2, title: 'School Classroom' },
      { id: 3, type: 'photo', url: iglgalleryImg3, title: 'Group Photo' },
      { id: 4, type: 'photo', url: iglgalleryImg4, title: 'Classroom View' },
      { id: 5, type: 'photo', url: iglgalleryImg5, title: 'Students' },
      { id: 6, type: 'photo', url: iglgalleryImg6, title: 'School Activities' }
    ],
    principal: {
      name: 'Taloh Sir',
      role: 'Principal',
      image: iglprincipalImg,
      quote:
        'Come to learn, go to serve — inspiring students through quality education, discipline, knowledge, and a spirit of service to society.',
      features: [
        'Academic Excellence',
        'Student Development',
        'Service to Society'
      ]
    },
    facilities: [
      {
        title: 'Science Stream',
        desc: 'Higher secondary education in the Science stream for students pursuing science and technical-oriented academic pathways.',
        icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
        color: 'text-blue-500'
      },
      {
        title: 'Commerce Stream',
        desc: 'Commerce education covering business, economics, finance, and related academic areas.',
        icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        color: 'text-green-500'
      },
      {
        title: 'Humanities Stream',
        desc: 'Humanities education supporting students in social sciences, languages, history, and related academic disciplines.',
        icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
        color: 'text-purple-500'
      },
      {
        title: 'Higher Secondary Education',
        desc: 'Government higher secondary education serving students across secondary and senior secondary levels.',
        icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422A12.083 12.083 0 0118 15.5c0 1.657-2.686 3-6 3s-6-1.343-6-3c0-.983.664-1.884 1.84-2.922L12 14z',
        color: 'text-teal-500'
      },
      {
        title: 'CBSE Recognition',
        desc: 'The school is recognised by the Central Board of Secondary Education, New Delhi.',
        icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
        color: 'text-orange-500'
      },
      {
        title: 'Historic Educational Institution',
        desc: 'A long-standing school with an important educational heritage in Pasighat and Arunachal Pradesh.',
        icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
        color: 'text-red-500'
      }
    ],
    achievements: [
      { title: 'Historic Government School', desc: 'One of the oldest and historically significant schools in Arunachal Pradesh.', icon: '🏛️' },
      { title: 'CBSE Recognised', desc: 'Recognised by the Central Board of Secondary Education, New Delhi.', icon: '🎓' },
      { title: 'Three Academic Streams', desc: 'Humanities, Commerce, and Science streams are offered at the higher secondary level.', icon: '📚' },
      { title: 'Educational Legacy', desc: 'A long-standing institution contributing to education in Pasighat and the wider region.', icon: '🌟' },
      { title: 'Come to Learn, Go to Serve', desc: 'The school motto reflects its emphasis on learning, character, and service to society.', icon: '🤝' }
    ],
    alumni: [
      { name: 'Uknown', role: 'Former Student', quote: 'The institution has provided generations of students with an educational foundation and a strong sense of service.', image: startup1 },
      { name: 'Uknown', role: 'Former Student', quote: 'The school remains an important part of the educational heritage of Pasighat.', image: startup2 },
      { name: 'Uknown', role: 'Former Student', quote: 'Its long academic tradition continues to inspire students across generations.', image: startup3 },
      { name: 'Uknown', role: 'Former Student', quote: 'The motto "Come to learn, go to serve" represents the values of learning and community service.', image: startup4 }
    ]
  },

  {
  id: 3,
  name: 'Kendriya Vidyalaya NHPC Loktak',
  type: 'Government',
  badgeColor: 'bg-blue-100 text-blue-700',
  state: 'Manipur',
  district: 'Bishnupur',
  location: 'NHPC Loktak, Manipur - 795124',
  classes: 'Balvatika, Classes 1 - 12',
  established: '1979',
  totalStudents: 538,
  facultyCount: 19,
  description:
    'Kendriya Vidyalaya NHPC Loktak is a Government CBSE-affiliated school under Kendriya Vidyalaya Sangathan, Ministry of Education, Government of India. Established in 1979, the school provides quality education with a focus on academic excellence, creativity, values, innovation, sports, co-curricular activities, and the overall development of students.',

  bannerImages: [kvlibary, kvcampus, kvart],

  gallery: [
    { id: 1, type: 'photo', url: kvgalleryImg1, title: 'School Library' },
    { id: 2, type: 'photo', url: kvgalleryImg2, title: 'School Building' },
    { id: 3, type: 'photo', url: kvgalleryImg3, title: 'Sports Activities' },
    { id: 4, type: 'photo', url: kvgalleryImg4, title: 'School Events' },
    { id: 5, type: 'photo', url: kvgalleryImg5, title: 'Students' },
    { id: 6, type: 'photo', url: kvgalleryImg6, title: 'Campus View' }
  ],

  principal: {
    name: 'Mr. Wahengbam Kumarjit Singh',
    role: 'I/C Principal',
    image: kvprincipalImg,
    quote:
      'Education plays an important role in every person’s personality development. The Vidyalaya provides students with opportunities for academic learning, personal growth, creativity, and overall development.',
    features: [
      'Academic Excellence',
      'Holistic Development',
      'Student Development'
    ]
  },

  facilities: [
    {
      title: 'Science Laboratories',
      desc: 'Laboratory-based learning facilities supporting science education and practical activities.',
      icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
      color: 'text-purple-500'
    },
    {
      title: 'Computer Education',
      desc: 'Computer Science and Informatics Practices education for senior secondary students.',
      icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      color: 'text-blue-500'
    },
    {
      title: 'Library',
      desc: 'Library resources supporting students in their academic learning and reading activities.',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      color: 'text-teal-500'
    },
    {
      title: 'Sports & Games',
      desc: 'Sports and physical activities including inter-house competitions and student participation.',
      icon: 'M3 3h18v18H3z',
      color: 'text-green-500'
    },
    {
      title: 'Little Open Library',
      desc: 'A school innovation promoting reading habits and easy access to books for students.',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253',
      color: 'text-orange-500'
    },
    {
      title: 'Student Council',
      desc: 'Student leadership and participation opportunities through the Vidyalaya Student Council.',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857',
      color: 'text-blue-600'
    }
  ],

  achievements: [
    {
      title: 'CBSE Affiliated School',
      desc: 'CBSE Affiliation No. 1200002 and School Code 39348',
      icon: '🏛️'
    },
    {
      title: '100% Class X Result',
      desc: '100% pass result reported for the 2025-26 academic year',
      icon: '🎓'
    },
    {
      title: 'Academic Excellence',
      desc: 'Class X and XII students have achieved high board examination scores',
      icon: '🏆'
    },
    {
      title: 'Sports Achievements',
      desc: 'Students participate in Taekwondo, Volleyball and other activities',
      icon: '🥇'
    },
    {
      title: 'Student Development',
      desc: 'Focus on academics, creativity, values, innovation and co-curricular development',
      icon: '🚀'
    }
  ],

  alumni: [
    {
      name: 'Yoiraj Laishram',
      role: 'Student',
      quote:
        'KV Loktak provides all-round development of students under the guidance of expert teachers and mentors.',
      image: startup1
    },
    {
      name: 'Aman Ranjan',
      role: 'Class X Topper',
      quote:
        'Achieved 96.40% in the Class X board examination.',
      image: startup2
    },
    {
      name: 'Gurumayum Bidyaluxmi Devi',
      role: 'Class XII Humanities Topper',
      quote:
        'Achieved 96.00% in the Class XII board examination.',
      image: startup3
    },
    {
      name: 'Khundrakpam Margaret Devi',
      role: 'Class XII Science Topper',
      quote:
        'Achieved 94.00% in the Class XII board examination.',
      image: startup4
    }
  ]
},
];

// ==========================================
// ANIMATION VARIANTS
// ==========================================
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// ==========================================
// STATCARD COMPONENT (Added to fix missing definition)
// ==========================================
const StatCard = ({ icon, title, value }) => {
  return (
    <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <h4 className="text-[10px] md:text-xs font-bold text-slate-500 tracking-wider mb-1 uppercase">{title}</h4>
      <p className="text-lg md:text-xl font-extrabold text-slate-900">{value}</p>
    </div>
  );
};

const InstitutionsPages = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeGalleryTab, setActiveGalleryTab] = useState('All');
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const currentId = Number(id) || 1;
  const institution = institutionsData.find((inst) => inst.id === currentId) || institutionsData[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentBannerIndex(0);
  }, [id]);

  useEffect(() => {
    if (!institution?.bannerImages || institution.bannerImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % institution.bannerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [institution]);

  const filteredGallery = activeGalleryTab === 'All' 
    ? institution?.gallery 
    : institution?.gallery?.filter(item => item.type === (activeGalleryTab === 'Photos' ? 'photo' : 'video'));

  if (!institution) return <div className="min-h-screen flex items-center justify-center font-bold">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-gray-900 pb-20 overflow-x-hidden selection:bg-yellow-300">
      
      {/* 1. HERO SECTION (Banner Slider) */}
      <div className="max-w-[1440px] mx-auto p-4 lg:p-6">
        <motion.div 
          key={institution.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-[260px] sm:h-[320px] md:h-[400px] rounded-[20px] md:rounded-[30px] overflow-hidden shadow-2xl group perspective-[1000px]"
        >
          

          {/* ADDED OPTIONAL CHAINING HERE (?) */}
          {institution?.bannerImages?.map((imgUrl, idx) => (
            <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentBannerIndex ? 'opacity-100' : 'opacity-0'}`}>
              <img src={imgUrl} alt="Cover Banner" className="w-full h-full object-cover transform scale-105 transition-transform duration-[10s] ease-out group-hover:scale-100" />
            </div>
          ))}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none"></div>

          {/* Controls - ADDED OPTIONAL CHAINING HERE (?) */}
          <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
             {institution?.bannerImages?.map((_, idx) => (
               <button key={idx} onClick={() => setCurrentBannerIndex(idx)} className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${idx === currentBannerIndex ? 'w-6 md:w-8 bg-[#FFB800]' : 'w-1.5 md:w-2 bg-white/50'}`} />
             ))}
          </div>

          {/* Banner Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-12 pb-10 md:pb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 z-10">
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-[10px] md:text-xs font-bold mb-2 md:mb-4 tracking-wide shadow-sm ${institution.badgeColor}`}>
                {institution.type}
              </span>
              <h1 className="text-xl md:text-4xl font-extrabold text-white mb-1.5 md:mb-3 tracking-tight drop-shadow-md">
                {institution.name}
              </h1>
              <p className="text-xs md:text-base text-gray-200 flex items-center gap-1.5 md:gap-2 font-medium">
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                <span className="line-clamp-1 md:line-clamp-none">{institution.location}</span>
              </p>
            </div>
            
            <div className="flex items-center gap-2.5 md:gap-3">
              <button className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/50 text-white hover:bg-white hover:text-black transition-colors text-xs md:text-sm font-semibold backdrop-blur-sm">
                <svg className="w-2 h-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
                Follow
              </button>
              <button className="px-3 py-1.5 md:px-5 md:py-2.5 rounded-full bg-[#FFB800] text-black hover:bg-[#e5a600] transition-colors text-xs md:text-sm font-bold shadow-lg">
                Contact Us
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-10 space-y-12 md:space-y-16">

        {/* 2. CENTERED 4 STATS GRID */}
        <motion.section 
          variants={fadeUp} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.1 }}
          className="w-full max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 justify-center">
            <StatCard icon="📚" title="CLASSES OFFERED" value={institution.classes} />
            <StatCard icon="🏛️" title="ESTABLISHED" value={institution.established} />
            <StatCard icon="👨‍🎓" title="TOTAL STUDENTS" value={`${institution.totalStudents}+`} />
            <StatCard icon="👨‍🏫" title="FACULTY MEMBERS" value={`${institution.facultyCount}+`} />
          </div>
        </motion.section>

        {/* 3. ABOUT INSTITUTION */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="border-t border-slate-200 pt-10">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">About Institution</h2>
          <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium mb-4 max-w-4xl">
            {institution.description}
          </p>
          <button className="text-sm md:text-base text-slate-900 font-bold flex items-center gap-2 hover:text-[#FFB800] transition-colors">
            Read More <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
        </motion.section>

        {/* 4. GALLERY (With Tabs & Lightbox) */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-t border-slate-200 pt-10">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">Gallery</h2>
            
            <div className="flex items-center justify-between w-full sm:w-auto gap-4 md:gap-6">
              <div className="flex items-center bg-gray-100 p-1 rounded-full overflow-x-auto whitespace-nowrap hide-scrollbar w-full sm:w-auto">
                {['All', 'Photos', 'Videos'].map(tab => (
                  <button key={tab} onClick={() => setActiveGalleryTab(tab)} className={`px-4 md:px-5 py-1.5 rounded-full text-xs md:text-sm font-bold transition-all ${activeGalleryTab === tab ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}>
                    {tab}
                  </button>
                ))}
              </div>
              <button className="hidden sm:flex items-center gap-1 text-sm font-bold text-slate-600 hover:text-black">
                View All <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </div>
          
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            <AnimatePresence>
              {filteredGallery?.map((item) => (
                <motion.div 
                  key={item.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setSelectedMedia(item)}
                  className="group cursor-pointer flex flex-col gap-2"
                >
                  <div className="relative h-32 md:h-40 rounded-xl overflow-hidden shadow-sm">
                    <img src={item.url} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                    {item.type === 'video' && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-blue-600 shadow-lg">
                           <svg className="w-4 h-4 md:w-5 md:h-5 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[9px] md:text-[10px] px-1.5 py-0.5 rounded font-medium">{item.duration}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <h4 className="text-xs md:text-sm font-bold text-slate-800 line-clamp-1">{item.title}</h4>
                    <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.type === 'video' ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>}
                    </svg>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.section>

        {/* 5. FROM THE PRINCIPAL / DIRECTOR */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="bg-[#FFF5F8] rounded-3xl p-6 md:p-12 border border-pink-100 flex flex-col md:flex-row gap-6 md:gap-10 items-center mt-8">
          <div className="w-full md:w-1/4 flex flex-col items-center text-center">
            <div className="w-24 h-24 md:w-40 md:h-40 rounded-full overflow-hidden mb-3 md:mb-4 shadow-lg border-4 border-white bg-slate-100">
              <img src={institution.principal.image} alt={institution.principal.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base md:text-lg">{institution.principal.name}</h3>
            <p className="text-xs md:text-sm font-semibold text-slate-500">{institution.principal.role}</p>
          </div>
          
          <div className="w-full md:w-3/4 relative">
            <h2 className="text-lg md:text-2xl font-extrabold text-slate-900 mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
               <span className="text-3xl md:text-4xl text-pink-400 font-serif leading-none">"</span> From the Desk
            </h2>
            <p className="text-sm md:text-lg text-slate-700 leading-relaxed font-medium mb-6 md:mb-8">
              {institution.principal.quote}
            </p>
            <div className="flex flex-wrap gap-4 md:gap-10 border-t border-pink-200/50 pt-5 md:pt-6">
               {institution.principal.features.map((feature, idx) => (
                 <div key={idx} className="flex items-center gap-2">
                   <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 shrink-0">
                     <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                   </div>
                   <span className="text-xs md:text-sm font-bold text-slate-800">{feature}</span>
                 </div>
               ))}
            </div>
          </div>
        </motion.section>

        {/* 6. KEY FACILITIES */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">Key Facilities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {institution.facilities.map((fac, idx) => (
              <motion.div key={idx} whileHover={{ y: -5 }} className="bg-white border border-slate-100 p-5 md:p-6 rounded-2xl shadow-sm text-center flex flex-col items-center group transition-all hover:shadow-md">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-50 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform ${fac.color}`}>
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={fac.icon}/></svg>
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1.5 md:mb-2">{fac.title}</h4>
                <p className="text-[11px] md:text-xs text-slate-500 font-medium leading-relaxed">{fac.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 7. OUR ACHIEVEMENTS */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="border-t border-slate-200 pt-10">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">Our Achievements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
             {institution.achievements.map((ach, idx) => (
               <div key={idx} className="bg-white border border-slate-100 p-4 md:p-5 rounded-2xl flex items-center sm:items-start text-left gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl md:text-4xl shrink-0">{ach.icon}</div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">{ach.title}</h4>
                    <p className="text-[11px] md:text-xs text-slate-500 font-medium">{ach.desc}</p>
                  </div>
               </div>
             ))}
          </div>
        </motion.section>

        {/* 8. PASSOUT STUDENTS (ALUMNI) */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="border-t border-slate-200 pt-10 pb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">Passout Students</h2>
            <button className="flex items-center gap-1 text-xs md:text-sm font-bold text-slate-600 hover:text-black">
                View All <span className="hidden sm:inline">Alumni</span> <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
             {institution.alumni.map((alum, idx) => (
               <div key={idx} className="bg-white border border-slate-100 p-5 md:p-6 rounded-2xl shadow-sm relative">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={alum.image} alt={alum.name} className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover bg-slate-100" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{alum.name}</h4>
                      <p className="text-[10px] md:text-[11px] text-slate-500 font-medium line-clamp-1">{alum.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 text-slate-600 text-xs md:text-sm font-medium">
                    <span className="text-pink-400 font-serif text-xl md:text-2xl leading-none">"</span>
                    <p className="leading-relaxed">{alum.quote}</p>
                  </div>
               </div>
             ))}
          </div>
        </motion.section>

      </div>

      {/* GALLERY FULLSCREEN LIGHTBOX (Pop-up) - COMPLETED SECTION */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden max-w-4xl w-full shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedMedia(null)}
                className="absolute top-3 right-3 md:top-4 md:right-4 z-10 w-8 h-8 md:w-10 md:h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full flex items-center justify-center font-bold transition-all"
              >✕</button>
              
              <div className="relative bg-black flex items-center justify-center h-[40vh] sm:h-[60vh] md:h-[70vh]">
                <img src={selectedMedia.url} alt={selectedMedia.title} className="max-w-full max-h-full object-contain" />
              </div>
              
              <div className="p-4 md:p-6 bg-white flex justify-between items-center">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900">{selectedMedia.title}</h3>
                  <p className="text-sm text-slate-500 capitalize">{selectedMedia.type}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InstitutionsPages;