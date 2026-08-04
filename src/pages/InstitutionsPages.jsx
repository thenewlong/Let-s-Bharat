import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// 🔴 LOCAL IMAGE IMPORTS 🔴
// ==========================================
import ne from '../assets/images/ne.jpeg';
import n1 from '../assets/images/n1.jpeg';
import n2 from '../assets/images/n2.jpeg';

import galleryImg1 from '../assets/images/lab.jpeg';
import galleryImg2 from '../assets/images/play.jpeg';
import galleryImg3 from '../assets/images/e.jpeg';
import galleryImg4 from '../assets/images/campus1.jpeg';
import galleryImg5 from '../assets/images/student.jpeg';
import galleryImg6 from '../assets/images/campus.jpeg';

import principalImg from '../assets/images/nielit-D.jpg';

import startup1 from '../assets/images/startup1.jpeg';
import startup2 from '../assets/images/startup2.jpeg';
import startup3 from '../assets/images/startup3.jpeg';
import startup4 from '../assets/images/startup4.jpeg';

// ==========================================
// MULTI-INSTITUTION MOCK DATA (4 Cards Support)
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

  stats: {
    boys: 1450,
    girls: 1050,
    maleFaculty: 28,
    femaleFaculty: 17
  },

  // Images Same
  bannerImages: [ne, n1, n2],

  description:
    'National Institute of Electronics & Information Technology (NIELIT), Agartala is a premier Government of India institute under the Ministry of Electronics & Information Technology (MeitY). The institute provides high-quality education, skill development, IT training, electronics education, digital literacy, cybersecurity, AI, IoT, programming, and industry-oriented certification programs to students, professionals, and government employees.',

  // Images Same
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
    {
      title: 'Government of India Institute',
      desc: 'Autonomous Scientific Society under MeitY',
      icon: '🏛️'
    },
    {
      title: 'Digital Literacy Programs',
      desc: 'CCC, BCC, ECC and Digital Skill Courses',
      icon: '💻'
    },
    {
      title: 'NIELIT O & A Level',
      desc: 'National IT Certification Programs',
      icon: '🎓'
    },
    {
      title: 'Emerging Technologies',
      desc: 'AI, IoT, Cyber Security, Data Science',
      icon: '🤖'
    },
    {
      title: 'Skill Development',
      desc: 'Industry-oriented Training & Placement Support',
      icon: '🚀'
    }
  ],

  alumni: [
    {
      name: 'unknown',
      role: 'Software Engineer, Infosys',
      quote:
        'The practical training at NIELIT helped me build strong technical skills.',
      image: startup1
    },
    {
      name: 'unknown',
      role: 'Cyber Security Analyst',
      quote:
        'The cybersecurity program provided industry-level exposure and confidence.',
      image: startup2
    },
    {
      name: 'unknown',
      role: 'Full Stack Developer',
      quote:
        'NIELIT certifications helped me secure my first IT job.',
      image: startup3
    },
    {
      name: 'unknown',
      role: 'Data Analyst',
      quote:
        'The faculty and hands-on projects made learning practical and effective.',
      image: startup4
    }
  ]
  },
  {
    id: 2,
    name: 'NIELIT Agartala',
    type: 'Autonomous Scientific Society',
    badgeColor: 'bg-blue-100 text-blue-700',
    state: 'Tripura',
    district: 'West Tripura',
    location: 'Khayerpur, Indranagar, Agartala, Tripura - 799006',
    classes: 'Diploma, BCA, Short-term',
    established: '2009',
    totalStudents: 1250,
    facultyCount: 45,
    stats: {
      boys: 750,
      girls: 500,
      maleFaculty: 28,
      femaleFaculty: 17
    },
    bannerImages: [ne, n1, n2],
    description: 'NIELIT Agartala is a premier institute offering state-of-the-art training in Information Technology, Electronics, and Cyber Security. It aims to empower students across the Northeast region with industry-relevant skills and hands-on exposure.',
    gallery: [
      { id: 1, type: 'photo', url: galleryImg3, title: 'Computer Lab' },
      { id: 2, type: 'photo', url: galleryImg1, title: 'PlayGround' },
      { id: 3, type: 'photo', url: galleryImg4, title: 'Robotics Workshop' },
      { id: 4, type: 'photo', url: galleryImg2, title: 'Tech Fest 2024' },
      { id: 5, type: 'photo', url: galleryImg5, title: 'Campus Tour', duration: '02:30' },
      { id: 6, type: 'photo', url: galleryImg6, title: 'Library' }
    ],
    principal: {
      name: 'Dr. Y. Jayanta Singh',
      role: 'Director / Executive Head',
      image: principalImg,
      quote: 'Our goal is to build technological capability in Tripura and prepare our students for global IT careers through skill development and innovation.',
      features: ['Industry Standard Labs', '100% Skill Oriented', 'Placement Assistance']
    },
    facilities: [
      { title: 'High-Tech Computer Labs', desc: 'Latest hardware, high-speed internet & cloud connectivity.', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', color: 'text-blue-500' },
      { title: 'Cyber Security Lab', desc: 'Specialized lab for network security and ethical hacking.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', color: 'text-green-500' },
      { title: 'E-Library', desc: 'Access to IEEE journals and digital courseware.', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', color: 'text-teal-500' },
      { title: 'Auditorium', desc: '300+ seater AC auditorium for tech summits.', icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z', color: 'text-purple-500' },
      { title: 'Hardware Workshop', desc: 'IoT & Embedded Systems development kits.', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', color: 'text-orange-500' },
      { title: 'Hostel Facility', desc: 'Separate, secure hostels for boys and girls.', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z', color: 'text-blue-600' }
    ],
    achievements: [
      { title: 'Best IT Skill Institute', desc: 'Northeast Region Award 2023', icon: '🏆' },
      { title: '90%+ Placement Rate', desc: 'In IT & Software Sector', icon: '🏅' },
      { title: 'National Hackathon Winner', desc: 'Smart India Hackathon 2024', icon: '🏆' },
      { title: 'Cyber Security Hub', desc: 'Government Recognized Center', icon: '⭐' },
      { title: 'Industry Collaboration', desc: 'MoUs with top IT firms', icon: '🏫' }
    ],
    alumni: [
      { name: 'Suman Roy', role: 'Cloud Engineer, TCS', quote: 'NIELIT gave me the exact hands-on practical skills required for the software industry.', image: startup2 },
      { name: 'Deblina Sarkar', role: 'Cyber Security Analyst', quote: 'The labs and faculties helped me crack top security certifications.', image: startup1 },
      { name: 'Rajesh Sharma', role: 'Full Stack Developer', quote: 'Great campus atmosphere and excellent technical exposure.', image: startup3 },
      { name: 'Puja Jamatia', role: 'UI/UX Designer', quote: 'I learned real-world product design and build my portfolio here.', image: startup4 }
    ]
  },
  {
    id: 3,
    name: 'Techno College of Engineering Agartala',
    type: 'Private Engineering College',
    badgeColor: 'bg-purple-100 text-purple-700',
    state: 'Tripura',
    district: 'West Tripura',
    location: 'Maheshkhola, Agartala, Tripura - 799004',
    classes: 'B.Tech, Diploma',
    established: '2014',
    totalStudents: 1800,
    facultyCount: 85,
    stats: {
      boys: 1100,
      girls: 700,
      maleFaculty: 50,
      femaleFaculty: 35
    },
    bannerImages: [ne, n1, n2],
    description: 'Techno College of Engineering Agartala (TCEA) is a leading engineering college in Tripura offering degree and diploma programs in CSE, Civil, Electrical, and Mechanical Engineering.',
    gallery: [
      { id: 1, type: 'photo', url: galleryImg2, title: 'Engineering Fest' },
      { id: 2, type: 'photo', url: galleryImg4, title: 'Mechanical Lab' },
      { id: 3, type: 'photo', url: galleryImg6, title: 'College Campus' },
      { id: 4, type: 'photo', url: galleryImg1, title: 'Library Auditorium' },
      { id: 5, type: 'video', url: galleryImg5, title: 'Prayukti 2026', duration: '03:15' },
      { id: 6, type: 'photo', url: galleryImg3, title: 'Sports Club' }
    ],
    principal: {
      name: 'Dr. S. N. Chaudhuri',
      role: 'Principal / Director',
      image: principalImg,
      quote: 'We strive to produce future-ready engineers with sound technical skills, ethics, and leadership qualities.',
      features: ['Modern Engineering Labs', 'Research & Development', 'Campus Placements']
    },
    facilities: [
      { title: 'Advance Tech Labs', desc: 'Fully equipped CSE, Electrical, and Civil labs.', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', color: 'text-blue-500' },
      { title: 'Sports Arena', desc: 'Cricket ground, football field & indoor badminton courts.', icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z', color: 'text-green-500' },
      { title: 'Central Library', desc: 'Thousands of technical books, journals & research papers.', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', color: 'text-teal-500' },
      { title: 'Innovation Cell', desc: 'Support for student startups and hackathons.', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', color: 'text-purple-500' },
      { title: 'Cafeteria', desc: 'Hygienic multi-cuisine food court.', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z', color: 'text-orange-500' },
      { title: 'Wi-Fi Campus', desc: 'High speed fiber internet across campus.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', color: 'text-blue-600' }
    ],
    achievements: [
      { title: 'Poster Expo Champions', desc: 'Ignitia Prayukti 2026', icon: '🏆' },
      { title: 'Top Placement Drive', desc: '50+ Recruiting Companies', icon: '🏅' },
      { title: 'Robotics Award', desc: 'Inter-College Tech Fest', icon: '🏆' },
      { title: 'Research Papers Published', desc: 'National Conferences', icon: '⭐' },
      { title: 'AICTE Approved', desc: 'High Education Quality', icon: '🏫' }
    ],
    alumni: [
      { name: 'Bikram Debbarma', role: 'Software Developer, Wipro', quote: 'TCEA gave me a great platform to develop my technical coding skills.', image: startup3 },
      { name: 'Sneha Saha', role: 'Civil Engineer, L&T', quote: 'Practical exposure in labs helped me secure campus placement.', image: startup4 },
      { name: 'Karan Das', role: 'DevOps Engineer', quote: 'Faculty members are very encouraging and guided me in projects.', image: startup1 },
      { name: 'Riya Tripura', role: 'Data Analyst', quote: 'Unforgettable college memories and strong foundational learning.', image: startup2 }
    ]
  },
  {
    id: 4,
    name: 'National Institute of Technology Agartala',
    type: 'Institute of National Importance',
    badgeColor: 'bg-[#FFB800] text-black font-extrabold',
    state: 'Tripura',
    district: 'Jirania',
    location: 'Barjala, Jirania, Agartala, Tripura - 799046',
    classes: 'B.Tech, M.Tech, Ph.D.',
    established: '1965',
    totalStudents: 4500,
    facultyCount: 210,
    stats: {
      boys: 3200,
      girls: 1300,
      maleFaculty: 150,
      femaleFaculty: 60
    },
    bannerImages: [ne, n1, n2],
    description: 'NIT Agartala is one of the premier engineering institutions in Eastern India, offering world-class engineering, scientific, and research programs.',
    gallery: [
      { id: 1, type: 'photo', url: galleryImg6, title: 'Main Building' },
      { id: 2, type: 'photo', url: galleryImg3, title: 'Central Research Facility' },
      { id: 3, type: 'photo', url: galleryImg1, title: 'Auditorium' },
      { id: 4, type: 'photo', url: galleryImg2, title: 'Sports Complex' },
      { id: 5, type: 'video', url: galleryImg5, title: 'Aayam Annual Fest', duration: '04:20' },
      { id: 6, type: 'photo', url: galleryImg4, title: 'Central Library' }
    ],
    principal: {
      name: 'Prof. (Dr.) S. S. Biswas',
      role: 'Director',
      image: principalImg,
      quote: 'Our goal at NIT Agartala is to foster innovation, cutting-edge research, and ethical technology leaders for the nation.',
      features: ['National Importance', 'World Class Research', 'Global Alumni Network']
    },
    facilities: [
      { title: 'Supercomputing Center', desc: 'High-performance computing for advanced research.', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', color: 'text-blue-500' },
      { title: 'Olympic Size Sports Ground', desc: 'Huge stadium, swimming pool & indoor games complex.', icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z', color: 'text-green-500' },
      { title: 'Central Research Lab', desc: 'Advanced equipment for nanotechnology, AI & Robotics.', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', color: 'text-purple-500' },
      { title: 'Multi-Storey E-Library', desc: '24x7 study halls and global IEEE/Springer subscriptions.', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', color: 'text-teal-500' },
      { title: 'Student Innovation Park', desc: 'Incubation center for tech startups and patent filings.', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z', color: 'text-orange-500' },
      { title: 'Residential Campus', desc: 'Faculty quarters, shopping complex and health center.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', color: 'text-blue-600' }
    ],
    achievements: [
      { title: 'NIRF Top Engineering Rank', desc: 'Recognized by Ministry of Education', icon: '🏆' },
      { title: 'Highest Placement ₹52 LPA', desc: 'International & National Offers', icon: '🏅' },
      { title: '100+ Patents Filed', desc: 'By Research Scholars', icon: '🏆' },
      { title: 'ISRO / DRDO Projects', desc: 'Active Government Collaboration', icon: '⭐' },
      { title: 'Global Academic MoUs', desc: 'Student exchange programs', icon: '🏫' }
    ],
    alumni: [
      { name: 'Nitin Debbarma', role: 'Software Engineer, Google', quote: 'NIT Agartala shaped my problem solving ability and exposed me to global tech.', image: startup1 },
      { name: 'Ankita Das', role: 'Scientist, ISRO', quote: 'The research labs and faculties gave me strong aerospace foundations.', image: startup4 },
      { name: 'Rahul Reang', role: 'SDE-2, Amazon', quote: 'Incredible campus, great peer group, and top placements.', image: startup3 },
      { name: 'Pritha Roy', role: 'Product Manager, Microsoft', quote: 'Leader in technical education and culture.', image: startup2 }
    ]
  }
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

const InstitutionsPages = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeGalleryTab, setActiveGalleryTab] = useState('All');
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [selectedMedia, setSelectedMedia] = useState(null);

  // 🔴 DYNAMIC MATCHING ACCORDING TO URL ID (e.g. /institution/1 or /institution/2)
  const currentId = Number(id) || 1;
  const institution = institutionsData.find((inst) => inst.id === currentId) || institutionsData[0];

  // Scroll to top on ID change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentBannerIndex(0);
  }, [id]);

  // Banner Automatic Slider
  useEffect(() => {
    if (!institution?.bannerImages || institution.bannerImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % institution.bannerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [institution]);

  const filteredGallery = activeGalleryTab === 'All' 
    ? institution.gallery 
    : institution.gallery.filter(item => item.type === (activeGalleryTab === 'Photos' ? 'photo' : 'video'));

  // Calculate Percentages for Stats
  const boyPct = Math.round((institution.stats.boys / institution.totalStudents) * 100);
  const girlPct = 100 - boyPct;
  const maleFacPct = Math.round((institution.stats.maleFaculty / institution.facultyCount) * 100);
  const femaleFacPct = 100 - maleFacPct;

  if (!institution) return <div className="min-h-screen flex items-center justify-center font-bold">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-gray-900 pb-20 overflow-x-hidden selection:bg-yellow-300">
      
      {/* 1. HERO SECTION (Banner Slider) */}
      <div className="max-w-[1350px] mx-auto pt-4 md:pt-6 px-4 sm:px-6 lg:px-8">
        <motion.div 
          key={institution.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-[55vh] md:h-[70vh] rounded-[2rem] overflow-hidden shadow-2xl group"
        >
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)} 
            className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-black/40 hover:bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full font-bold text-sm transition-all border border-white/20 shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Back
          </button>

          {institution.bannerImages.map((imgUrl, idx) => (
            <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentBannerIndex ? 'opacity-100' : 'opacity-0'}`}>
              <img src={imgUrl} alt="Cover Banner" className="w-full h-full object-cover transform scale-105 transition-transform duration-[10s] ease-out group-hover:scale-100" />
            </div>
          ))}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>

          {/* Controls */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
             {institution.bannerImages.map((_, idx) => (
               <button key={idx} onClick={() => setCurrentBannerIndex(idx)} className={`h-2 rounded-full transition-all duration-300 ${idx === currentBannerIndex ? 'w-8 bg-[#FFB800]' : 'w-2 bg-white/50'}`} />
             ))}
          </div>

          {/* Banner Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-6 z-10">
            <div>
              <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4 tracking-wide shadow-sm ${institution.badgeColor}`}>
                {institution.type}
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 tracking-tight drop-shadow-md">
                {institution.name}
              </h1>
              <p className="text-sm md:text-base text-gray-200 flex items-center gap-2 font-medium">
                <svg className="w-5 h-5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                {institution.location}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/50 text-white hover:bg-white hover:text-black transition-colors font-semibold backdrop-blur-sm">
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
                Follow
              </button>
              <button className="px-8 py-3 rounded-full bg-[#FFB800] text-black hover:bg-[#e5a600] transition-colors font-bold shadow-lg">
                Contact Us
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">


       {/* 2. STUDENT & FACULTY STATISTICS (GRAPH + CARDS) */}
       <motion.section 
       variants={fadeUp} 
       initial="hidden" 
       whileInView="visible" 
       viewport={{ once: true, amount: 0.1 }}
       className="relative"
>
  {/* Section Header */}
  <div className="flex items-center justify-between mb-8">
    <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
      <span className="w-1.5 h-7 bg-gradient-to-b from-amber-400 to-amber-500 rounded-full shadow-sm"></span> 
      Student & Faculty Analytics
    </h2>
    <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
      Live Metrics
    </span>
  </div>
  
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
    
    {/* Left Side: Graphs (7 Columns) */}
    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* 🎓 Student Graph Card */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-all"></div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span></span> Total Enrolled
            </p>
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
              Students
            </span>
          </div>

          <h3 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">
            {institution.totalStudents?.toLocaleString()}
          </h3>
          
          <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
              Boys: <strong className="text-slate-900">{institution.stats.boys}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              Girls: <strong className="text-slate-900">{institution.stats.girls}</strong>
            </span>
          </div>
        </div>
        
        {/* Animated Progress Bar */}
        <div className="mt-2">
          <div className="w-full h-3.5 bg-slate-100 rounded-full p-0.5 flex overflow-hidden shadow-inner">
            <motion.div 
              className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-full rounded-l-full" 
              initial={{ width: 0 }}
              whileInView={{ width: `${boyPct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 3.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            />
            <motion.div 
              className="bg-gradient-to-r from-rose-400 to-rose-500 h-full rounded-r-full" 
              initial={{ width: 0 }}
              whileInView={{ width: `${girlPct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 4.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            />
          </div>

          <div className="flex justify-between items-center mt-2.5 text-[11px] font-extrabold text-slate-500">
            <span className="text-indigo-600">{boyPct}% Male Ratio</span>
            <span className="text-rose-500">{girlPct}% Female Ratio</span>
          </div>
        </div>
      </div>

      {/* 👨‍🏫 Faculty Graph Card */}
      <div className="bg-white rounded-3xl p-6 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all"></div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span></span> Academic Staff
            </p>
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              Faculty
            </span>
          </div>

          <h3 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">
            {institution.facultyCount}
          </h3>
          
          <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
              Male: <strong className="text-slate-900">{institution.stats.maleFaculty}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              Female: <strong className="text-slate-900">{institution.stats.femaleFaculty}</strong>
            </span>
          </div>
        </div>
        
        {/* Animated Progress Bar */}
        <div className="mt-2">
          <div className="w-full h-3.5 bg-slate-100 rounded-full p-0.5 flex overflow-hidden shadow-inner">
            <motion.div 
              className="bg-gradient-to-r from-slate-700 to-slate-800 h-full rounded-l-full" 
              initial={{ width: 0 }}
              whileInView={{ width: `${maleFacPct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            />
            <motion.div 
              className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-r-full" 
              initial={{ width: 0 }}
              whileInView={{ width: `${femaleFacPct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            />
          </div>

          <div className="flex justify-between items-center mt-2.5 text-[11px] font-extrabold text-slate-500">
            <span className="text-slate-700">{maleFacPct}% Male</span>
            <span className="text-amber-600">{femaleFacPct}% Female</span>
          </div>
        </div>
      </div>

    </div>

    {/* Right Side: 4 Stats Cards Grid (5 Columns) */}
    <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <StatCard icon="📚" title="CLASSES OFFERED" value={institution.classes} />
      <StatCard icon="🏛️" title="ESTABLISHED" value={institution.established} />
      <StatCard icon="👨‍🎓" title="TOTAL STUDENTS" value={`${institution.totalStudents}+`} />
      <StatCard icon="👨‍🏫" title="FACULTY MEMBERS" value={`${institution.facultyCount}+`} />
    </div>

  </div>
</motion.section>

        {/* 3. ABOUT INSTITUTION */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="border-t border-slate-200 pt-10">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">About Institution</h2>
          <p className="text-slate-600 leading-relaxed font-medium mb-4 max-w-4xl">
            {institution.description}
          </p>
          <button className="text-slate-900 font-bold flex items-center gap-2 hover:text-[#FFB800] transition-colors">
            Read More <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
        </motion.section>

        {/* 4. GALLERY (With Tabs & Lightbox) */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-t border-slate-200 pt-10">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">Gallery</h2>
            
            <div className="flex items-center justify-between w-full sm:w-auto gap-6">
              <div className="flex items-center bg-gray-100 p-1 rounded-full">
                {['All', 'Photos', 'Videos'].map(tab => (
                  <button key={tab} onClick={() => setActiveGalleryTab(tab)} className={`px-5 py-1.5 rounded-full text-sm font-bold transition-all ${activeGalleryTab === tab ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}>
                    {tab}
                  </button>
                ))}
              </div>
              <button className="hidden sm:flex items-center gap-1 text-sm font-bold text-slate-600 hover:text-black">
                View All <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </div>
          
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <AnimatePresence>
              {filteredGallery.map((item) => (
                <motion.div 
                  key={item.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setSelectedMedia(item)}
                  className="group cursor-pointer flex flex-col gap-2"
                >
                  <div className="relative h-40 rounded-xl overflow-hidden shadow-sm">
                    <img src={item.url} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                    {item.type === 'video' && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-blue-600 shadow-lg">
                           <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">{item.duration}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.type === 'video' ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>}
                    </svg>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.section>

        {/* 5. FROM THE PRINCIPAL / DIRECTOR */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="bg-[#FFF5F8] rounded-[2rem] p-8 md:p-12 border border-pink-100 flex flex-col md:flex-row gap-10 items-center mt-8">
          <div className="w-full md:w-1/4 flex flex-col items-center text-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-4 shadow-lg border-4 border-white bg-slate-100">
              <img src={institution.principal.image} alt={institution.principal.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">{institution.principal.name}</h3>
            <p className="text-sm font-semibold text-slate-500">{institution.principal.role}</p>
          </div>
          
          <div className="w-full md:w-3/4 relative">
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-4 flex items-center gap-3">
               <span className="text-4xl text-pink-400 font-serif leading-none">"</span> From the Desk
            </h2>
            <p className="text-slate-700 md:text-lg leading-relaxed font-medium mb-8">
              {institution.principal.quote}
            </p>
            <div className="flex flex-wrap gap-6 md:gap-10 border-t border-pink-200/50 pt-6">
               {institution.principal.features.map((feature, idx) => (
                 <div key={idx} className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                   </div>
                   <span className="text-sm font-bold text-slate-800">{feature}</span>
                 </div>
               ))}
            </div>
          </div>
        </motion.section>

        {/* 6. KEY FACILITIES */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">Key Facilities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {institution.facilities.map((fac, idx) => (
              <motion.div key={idx} whileHover={{ y: -5 }} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm text-center flex flex-col items-center group transition-all hover:shadow-md">
                <div className={`w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${fac.color}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={fac.icon}/></svg>
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">{fac.title}</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{fac.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 7. OUR ACHIEVEMENTS */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="border-t border-slate-200 pt-10">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">Our Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
             {institution.achievements.map((ach, idx) => (
               <div key={idx} className="bg-white border border-slate-100 p-5 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl">{ach.icon}</div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">{ach.title}</h4>
                    <p className="text-xs text-slate-500 font-medium">{ach.desc}</p>
                  </div>
               </div>
             ))}
          </div>
        </motion.section>

        {/* 8. PASSOUT STUDENTS (ALUMNI) */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="border-t border-slate-200 pt-10 pb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">Passout Students</h2>
            <button className="flex items-center gap-1 text-sm font-bold text-slate-600 hover:text-black">
                View All Alumni <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {institution.alumni.map((alum, idx) => (
               <div key={idx} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm relative">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={alum.image} alt={alum.name} className="w-12 h-12 rounded-full object-cover bg-slate-100" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{alum.name}</h4>
                      <p className="text-[11px] text-slate-500 font-medium">{alum.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 text-slate-600 text-sm font-medium">
                    <span className="text-pink-400 font-serif text-2xl leading-none">"</span>
                    <p className="leading-relaxed">{alum.quote}</p>
                  </div>
               </div>
             ))}
          </div>
        </motion.section>

      </div>

      {/* GALLERY FULLSCREEN LIGHTBOX (Pop-up) */}
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
              className="bg-white rounded-[2rem] overflow-hidden max-w-4xl w-full shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full flex items-center justify-center font-bold transition-all"
              >✕</button>
              
              <div className="relative bg-black flex items-center justify-center h-[50vh] sm:h-[70vh]">
                <img src={selectedMedia.url} alt={selectedMedia.title} className="max-w-full max-h-full object-contain" />
              </div>
              
              <div className="p-6 bg-white flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{selectedMedia.title}</h3>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{selectedMedia.type}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

// Helper Component for the 4 Right-Side Stats Cards
// 🌟 ULTRA-PREMIUM STAT CARD COMPONENT WITH AUTO-TAGS FOR LONG TEXT
const StatCard = ({ icon, title, value }) => {
  // Check if value is comma-separated string (e.g., courses list)
  const isList = typeof value === 'string' && value.includes(',');

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 md:p-5 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] border border-slate-100 hover:border-slate-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      <div>
        <div className="flex items-center gap-2.5 mb-2.5">
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <p className="text-[10px] md:text-xs font-extrabold tracking-wider text-slate-400 uppercase leading-none">
            {title}
          </p>
        </div>

        {/* If comma separated list (like Classes/Courses), render as dynamic badges */}
        {isList ? (
          <div className="flex flex-wrap gap-1.5 mt-1 max-h-[85px] overflow-y-auto pr-1">
            {value.split(',').map((item, i) => (
              <span 
                key={i} 
                className="px-2 py-0.5 text-[11px] font-bold bg-slate-100 text-slate-700 rounded-lg border border-slate-200/80 tracking-tight leading-snug hover:bg-slate-900 hover:text-white transition-colors"
              >
                {item.trim()}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-lg md:text-2xl font-black text-slate-900 tracking-tight break-words">
            {value}
          </p>
        )}
      </div>
    </div>
  );
};

export default InstitutionsPages;