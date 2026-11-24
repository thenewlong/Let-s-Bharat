import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const internshipsData = [
  {
    id: 1,
    role: 'Frontend React & UI Developer Intern',
    company: 'Letsbharat ',
    location: 'Remote (India)',
    mode: 'Remote',
    category: 'Web Dev',
    stipend: '₹8,000 - ₹12,000 / month',
    duration: '3 Months',
    deadline: '15 Dec 2026',
    skills: ['React.js', 'Tailwind CSS', 'JavaScript', 'Git'],
    about:
      'Work closely with our core product team to build fast, responsive, and accessible student-first web experiences across India.',
    responsibilities: [
      'Develop reusable UI components using React and Tailwind CSS.',
      'Optimize page load speed and implement smooth user interactions.',
      'Collaborate with designers to turn wireframes into clean production code.'
    ],
    applyLink: 'https://www.letsbharat.com/contact'
  },
  {
    id: 2,
    role: 'AI & LLM Integration Intern',
    company: 'Newlong.AI',
    location: 'Agartala / Remote',
    mode: 'Remote',
    category: 'AI & ML',
    stipend: '₹10,000 - ₹15,000 / month',
    duration: '2 Months',
    deadline: '20 Dec 2026',
    skills: ['Python', 'LLM APIs', 'RAG', 'Prompt Engineering'],
    about:
      'Help build multilingual AI assistants and retrieval pipelines tailored for Indian regional languages.',
    responsibilities: [
      'Build and test LLM endpoints using Gemini and Groq APIs.',
      'Curate and structure regional language datasets for accurate Q&A.',
      'Evaluate model responses and improve response speed.'
    ],
    applyLink: 'https://www.letsbharat.com/contact'
  },
  {
    id: 3,
    role: 'React Native Mobile App Intern',
    company: 'Tipra Tech',
    location: 'Remote',
    mode: 'Remote',
    category: 'App Dev',
    stipend: '₹7,500 - ₹10,000 / month',
    duration: '3 Months',
    deadline: '10 Dec 2026',
    skills: ['React Native', 'Expo', 'Firebase', 'REST APIs'],
    about:
      'Assist in developing cross-platform iOS and Android community applications with real-time feeds and media uploads.',
    responsibilities: [
      'Build smooth mobile screens using Expo Router and React Native.',
      'Integrate Firebase Authentication and Firestore real-time listeners.',
      'Test and refine UI layouts across different Android screen sizes.'
    ],
    applyLink: 'https://www.letsbharat.com/contact'
  },
  {
    id: 4,
    role: 'Product Design & UI/UX Intern',
    company: 'Northeast Innovation Studio',
    location: 'Guwahati / Hybrid',
    mode: 'Hybrid',
    category: 'Design',
    stipend: '₹6,000 - ₹9,000 / month',
    duration: '2 Months',
    deadline: '18 Dec 2026',
    skills: ['Figma', 'UI Systems', 'Prototyping', 'Wireframing'],
    about:
      'Design intuitive user interfaces, design systems, and interactive prototypes for emerging startups in Northeast India.',
    responsibilities: [
      'Create user flows, wireframes, and clean mockups in Figma.',
      'Conduct quick usability reviews with student testers.',
      'Maintain consistent typography and component spacing.'
    ],
    applyLink: 'https://www.letsbharat.com/contact'
  },
  {
    id: 5,
    role: 'Backend Node.js & Cloud Intern',
    company: '3Tier Technologies',
    location: 'Agartala (On-site)',
    mode: 'On-site',
    category: 'Backend',
    stipend: '₹9,000 - ₹14,000 / month',
    duration: '4 Months',
    deadline: '25 Dec 2026',
    skills: ['Node.js', 'Express', 'SQL / Firestore', 'Vercel'],
    about:
      'Build reliable REST APIs, database schemas, and authentication flows for hyperlocal discovery platforms.',
    responsibilities: [
      'Write clean, modular API endpoints in Node.js and Express.',
      'Design optimized database queries and security rules.',
      'Monitor API performance and handle deployment workflows.'
    ],
    applyLink: 'https://www.letsbharat.com/contact'
  },
  {
    id: 6,
    role: 'Technical Content & Community Intern',
    company: 'LetsBharat Community',
    location: 'Remote',
    mode: 'Remote',
    category: 'Content',
    stipend: '₹5,000 - ₹8,000 / month',
    duration: '2 Months',
    deadline: '12 Dec 2026',
    skills: ['Technical Writing', 'Research', 'Social Media', 'SEO'],
    about:
      'Curate verified hackathons, scholarships, and developer guides to help college students across India.',
    responsibilities: [
      'Research and verify upcoming hackathons and student opportunities.',
      'Write clear, helpful guides and learning resources.',
      'Connect with student communities across campuses.'
    ],
    applyLink: 'https://www.letsbharat.com/contact'
  }
];

const categories = ['All', 'Web Dev', 'AI & ML', 'App Dev', 'Backend', 'Design', 'Content'];

const Internship = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInternship, setSelectedInternship] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedInternship ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedInternship]);

  const filteredInternships = internshipsData.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const smoothEase = [0.16, 1, 0.3, 1];

  return (
    <div className="min-h-screen bg-white text-[#111827] py-12 sm:py-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* HERO HEADER (Exact Screenshot Style) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: smoothEase }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12"
        >
          {/* Top Pill Badge with Green Dot */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200/90 shadow-2xs mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-xs font-medium text-gray-600">
              India&apos;s Growing Platform
            </span>
          </div>

          {/* Two-Tone Bold Heading */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-black leading-[1.08] mb-5">
            Internships built for <br className="hidden sm:block" />
            <span className="text-[#6B7280]">next-gen builders.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-[#4B5563] max-w-2xl mx-auto leading-relaxed font-normal">
            Discover verified remote and hybrid internships. Gain real-world experience,
            build meaningful products, and accelerate your career.
          </p>
        </motion.div>

        {/* CENTERED PILL SEARCH BAR */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: smoothEase }}
          className="max-w-xl mx-auto mb-8"
        >
          <div className="relative flex items-center bg-white border border-gray-200 rounded-full p-1.5 shadow-2xs focus-within:border-gray-400 transition-colors">
            <svg
              className="w-4 h-4 text-gray-500 ml-3.5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search role, skill, company..."
              className="w-full bg-transparent px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 shrink-0 transition-colors cursor-pointer"
              >
                ✕
              </button>
            ) : (
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            )}
          </div>
        </motion.div>

        {/* CLEAN UNDERLINE CATEGORY TABS (Mobile Swipeable) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.14 }}
          className="flex items-center justify-start sm:justify-center gap-6 sm:gap-8 overflow-x-auto border-b border-gray-100 mb-10 pb-0.5 no-scrollbar"
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative pb-3 text-xs sm:text-sm whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'font-semibold text-black'
                    : 'font-medium text-gray-500 hover:text-gray-900'
                }`}
              >
                {cat}
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    transition={{ duration: 0.3, ease: smoothEase }}
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-black rounded-full"
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* SIMPLE & CLEAN INTERNSHIP CARDS GRID */}
        {filteredInternships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {filteredInternships.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: smoothEase
                }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedInternship(item)}
                className="group bg-white border border-gray-200/90 hover:border-gray-300 rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Category & Mode */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2.5">
                    <span className="font-medium text-gray-700">{item.category}</span>
                    <span>{item.mode}</span>
                  </div>

                  {/* Role & Company */}
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight mb-1 group-hover:text-black">
                    {item.role}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mb-4">
                    {item.company} · {item.location}
                  </p>

                  {/* Short Summary */}
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">
                    {item.about}
                  </p>

                  {/* Minimal Skills Row */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {item.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-gray-50 border border-gray-200/70 rounded-md text-[11px] font-medium text-gray-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Clean Info Footer (No heavy buttons) */}
                <div className="pt-3.5 border-t border-gray-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-gray-700 font-medium">
                    <span>{item.stipend}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-500">{item.duration}</span>
                  </div>
                  <span className="text-gray-900 font-semibold group-hover:translate-x-0.5 transition-transform">
                    Details →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-gray-100 rounded-2xl">
            <p className="text-base font-semibold text-gray-900 mb-1">
              No internships found
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              Try searching with a different keyword or switching category.
            </p>
          </div>
        )}
      </div>

      {/* CLEAN DETAILS MODAL (Mobile Bottom-Sheet / Desktop Centered) */}
      <AnimatePresence>
        {selectedInternship && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedInternship(null)}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3, ease: smoothEase }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl bg-white rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto"
            >
              {/* Top Close */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    {selectedInternship.category} · {selectedInternship.mode}
                  </p>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {selectedInternship.role}
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {selectedInternship.company} · {selectedInternship.location}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedInternship(null)}
                  aria-label="Close"
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 text-sm shrink-0 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Key Details Grid */}
              <div className="grid grid-cols-3 gap-3 bg-gray-50 border border-gray-100 rounded-xl p-3.5 mb-6 text-xs">
                <div>
                  <p className="text-gray-400 mb-0.5">Stipend</p>
                  <p className="font-semibold text-gray-900">{selectedInternship.stipend}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-0.5">Duration</p>
                  <p className="font-semibold text-gray-900">{selectedInternship.duration}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-0.5">Apply By</p>
                  <p className="font-semibold text-gray-900">{selectedInternship.deadline}</p>
                </div>
              </div>

              {/* Details Body */}
              <div className="space-y-5 text-sm text-gray-600 leading-relaxed mb-7">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                    Overview
                  </h3>
                  <p>{selectedInternship.about}</p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                    Responsibilities
                  </h3>
                  <ul className="list-disc pl-5 space-y-1.5">
                    {selectedInternship.responsibilities.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Skills Required
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedInternship.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-50 border border-gray-200/80 rounded-lg text-xs font-medium text-gray-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Single Clean Apply Link */}
              <a
                href={selectedInternship.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-black hover:bg-gray-800 text-white font-semibold py-3.5 rounded-full text-sm transition-colors"
              >
                Apply for this Internship 
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Internship;