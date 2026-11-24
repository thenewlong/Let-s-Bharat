import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const jobsData = [
  {
    id: 1,
    title: 'Full Stack Software Engineer (React & Node)',
    company: 'LetsBharat Technologies',
    location: 'Guwahati / Remote',
    workType: 'Full-time',
    department: 'Engineering',
    salary: '₹6.5 - ₹9.0 LPA',
    experience: '1 - 3 Years',
    posted: '2 days ago',
    skills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
    summary:
      'Build and scale core web applications powering student discovery, job boards, and learning tools across India.',
    requirements: [
      'Strong hands-on experience with React, Node.js, and REST APIs.',
      'Familiarity with relational databases (PostgreSQL/MySQL) or Firestore.',
      'Ability to ship clean, tested, and responsive UI on tight deadlines.'
    ],
    applyUrl: 'https://www.letsbharat.com/contact'
  },
  {
    id: 2,
    title: 'Applied AI / LLM Engineer',
    company: 'Newlong.AI',
    location: 'Agartala / Remote',
    workType: 'Full-time',
    department: 'AI & Data',
    salary: '₹8.0 - ₹12.0 LPA',
    experience: '1 - 4 Years',
    posted: '3 days ago',
    skills: ['Python', 'RAG', 'Vector DBs', 'LLM APIs'],
    summary:
      'Architect retrieval-augmented generation systems and multilingual conversational workflows for Northeast Indian languages.',
    requirements: [
      'Solid Python skills with experience integrating Gemini, Groq, or open-weight models.',
      'Practical understanding of embeddings, chunking strategies, and evaluation.',
      'Passion for building accessible AI products for regional users.'
    ],
    applyUrl: 'https://www.letsbharat.com/contact'
  },
  {
    id: 3,
    title: 'Mobile Application Developer (React Native)',
    company: 'Tipra Digital',
    location: 'Remote (India)',
    workType: 'Full-time',
    department: 'Engineering',
    salary: '₹5.5 - ₹8.0 LPA',
    experience: '0 - 2 Years',
    posted: '5 days ago',
    skills: ['React Native', 'Expo', 'Firebase', 'Redux'],
    summary:
      'Own the end-to-end mobile experience for our Android and iOS community app, from live feeds to push notifications.',
    requirements: [
      'Published at least one React Native or Expo app on Play Store / App Store.',
      'Good grasp of mobile performance optimization and offline caching.',
      'Experience working with Firebase Auth, Storage, and Cloud Functions.'
    ],
    applyUrl: 'https://www.letsbharat.com/contact'
  },
  {
    id: 4,
    title: 'Product & Brand Designer',
    company: 'NorthEast Ventures',
    location: 'Shillong / Hybrid',
    workType: 'Full-time',
    department: 'Design',
    salary: '₹5.0 - ₹7.5 LPA',
    experience: '1 - 3 Years',
    posted: '1 week ago',
    skills: ['Figma', 'Design Systems', 'Prototyping', 'Brand Identity'],
    summary:
      'Shape visual identities, web interfaces, and editorial campaigns for early-stage startups across Northeast India.',
    requirements: [
      'Strong portfolio showcasing web/mobile UI and typography skills.',
      'Proficiency in Figma auto-layout, components, and interactive prototyping.',
      'Ability to collaborate directly with frontend engineers during handoff.'
    ],
    applyUrl: 'https://www.letsbharat.com/contact'
  },
  {
    id: 5,
    title: 'Campus Partnerships & Operations Lead',
    company: 'LetsBharat Network',
    location: 'Agartala / Guwahati',
    workType: 'Full-time',
    department: 'Operations',
    salary: '₹4.2 - ₹6.0 LPA',
    experience: '0 - 2 Years',
    posted: '1 week ago',
    skills: ['Community Ops', 'Event Management', 'Partnerships', 'Communication'],
    summary:
      'Lead college outreach, hackathon partnerships, and student ambassador programs across universities in Northeast India.',
    requirements: [
      'Strong network or prior experience organizing college tech events/hackathons.',
      'Clear communication skills in English and regional languages.',
      'Willingness to travel occasionally for campus drives and workshops.'
    ],
    applyUrl: 'https://www.letsbharat.com/contact'
  }
];

const departments = ['All', 'Engineering', 'AI & Data', 'Design', 'Operations'];

const Jobs = () => {
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedJobId, setExpandedJobId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredJobs = jobsData.filter((job) => {
    const matchesDept = selectedDept === 'All' || job.department === selectedDept;
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesDept && matchesSearch;
  });

  const toggleJob = (id) => {
    setExpandedJobId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 py-8 sm:py-14 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* CLEAN EDITORIAL HEADER */}
        <div className="border-b border-slate-200 pb-6 sm:pb-8 mb-6 sm:mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-md">
              Careers &amp; Openings
            </span>
            <span className="text-xs font-medium text-slate-500">
              Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'role' : 'roles'}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-end">
            <div className="lg:col-span-7">
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                Full-Time Roles &amp; Tech Careers
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Verified full-time opportunities across startups, engineering teams, and growing organizations in Northeast India and remote.
              </p>
            </div>
          </div>
        </div>

        {/* FILTER TABS & SEARCH */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6 sm:mb-7">
          {/* Department Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {departments.map((dept) => {
              const active = selectedDept === dept;
              return (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {dept}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <svg
              className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search role, skill, city..."
              className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-8 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* STRUCTURED JOB LIST */}
        {filteredJobs.length > 0 ? (
          <div className="space-y-3.5">
            {filteredJobs.map((job, idx) => {
              const isExpanded = expandedJobId === job.id;

              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className={`bg-white border rounded-xl transition-all duration-200 ${
                    isExpanded
                      ? 'border-slate-300 shadow-md'
                      : 'border-slate-200/90 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  {/* Clickable Job Row */}
                  <div
                    onClick={() => toggleJob(job.id)}
                    className="p-4 sm:p-6 cursor-pointer select-none"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-6">
                      
                      {/* Left: Company, Department & Job Title */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="text-xs sm:text-sm font-semibold text-slate-700">
                            {job.company}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                            {job.department}
                          </span>
                        </div>

                        <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                          {job.title}
                        </h2>
                      </div>

                      {/* Right: Salary + Location & Experience + Expand Chevron */}
                      <div className="flex items-center justify-between md:justify-end gap-4 sm:gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
                        <div className="md:text-right">
                          <p className="text-sm sm:text-base font-semibold text-slate-900">
                            {job.salary}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {job.location} · {job.experience}
                          </p>
                        </div>

                        <div
                          className={`w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 transition-transform duration-200 shrink-0 ${
                            isExpanded ? 'rotate-180 bg-slate-100 text-slate-900' : 'bg-white'
                          }`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Skills & Posted Date Footer */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-100">
                      <div className="flex flex-wrap gap-1.5">
                        {job.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-slate-50 border border-slate-200/70 text-slate-600"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-slate-400">
                        Posted {job.posted}
                      </span>
                    </div>
                  </div>

                  {/* Inline Expandable Details */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: 'easeInOut' }}
                        className="overflow-hidden border-t border-slate-100 bg-slate-50/60 rounded-b-xl"
                      >
                        <div className="p-4 sm:p-6 space-y-4">
                          <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                              About the Role
                            </h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                              {job.summary}
                            </p>
                          </div>

                          <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                              Requirements
                            </h3>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                              {job.requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <span className="text-xs text-slate-500">
                              Job Type: <strong className="text-slate-800 font-medium">{job.workType}</strong>
                            </span>

                            <a
                              href={job.applyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm px-5 py-2.5 rounded-lg transition-colors w-full sm:w-auto"
                            >
                              Apply Now
                              
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
            <p className="text-base font-semibold text-slate-900 mb-1">
              No matching roles found
            </p>
            <p className="text-sm text-slate-500 mb-4">
              Try clearing your search filter or checking another department.
            </p>
            <button
              onClick={() => {
                setSelectedDept('All');
                setSearchTerm('');
              }}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Jobs;