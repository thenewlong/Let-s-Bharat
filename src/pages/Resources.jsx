import React, { useState, useEffect, useMemo } from 'react';

const RESOURCES_DATA = [
  {
    id: 'guide-1',
    type: 'Free Guides',
    tag: 'Free Guide',
    title: 'Student Hackathon & Project Pitching Handbook',
    level: 'All Levels',
    readTime: '8 min read',
    summary:
      'A practical guide on structuring problem statements, building a working MVP quickly, and presenting clear demos to judges.',
    details: [
      'Define a specific user pain point with measurable impact instead of a broad topic.',
      'Build a working core flow first; keep secondary features for future iterations.',
      'Structure your pitch around Problem -> Solution -> Live Demo -> Next Steps.'
    ],
    keyPoints: ['Problem Framing', 'MVP Scope', 'Demo Flow', 'Team Roles']
  },
  {
    id: 'guide-2',
    type: 'Free Guides',
    tag: 'Free Guide',
    title: 'Portfolio, GitHub & Resume Checklist for Builders',
    level: 'Beginner',
    readTime: '6 min read',
    summary:
      'How to write clear READMEs, organize repositories, and showcase real deployed projects without fluff.',
    details: [
      'Include setup steps, screenshots, architecture notes, and live links in every repo README.',
      'Highlight what you built and learned in each project rather than listing generic buzzwords.',
      'Keep live demos fast, bug-free, and easy to test on mobile and desktop.'
    ],
    keyPoints: ['README Structure', 'Live Demos', 'Project Proof', 'Git Hygiene']
  },
  {
    id: 'roadmap-1',
    type: 'Roadmaps',
    tag: 'Roadmap',
    title: 'Full-Stack Web Development Roadmap (Step-by-Step)',
    level: 'Beginner to Intermediate',
    readTime: '12-week path',
    summary:
      'Stage-by-stage learning progression from semantic HTML/CSS and JavaScript to frontend frameworks, APIs, databases, and deployment.',
    details: [
      'Stage 1 (Weeks 1-3): HTML5, modern CSS/Flexbox/Grid, responsive layouts, and core JavaScript.',
      'Stage 2 (Weeks 4-7): Component-based UI, routing, state management, and consuming REST APIs.',
      'Stage 3 (Weeks 8-12): Backend routes, authentication, database modeling, and cloud deployment.'
    ],
    keyPoints: ['HTML/CSS/JS', 'Frontend UI', 'APIs & Auth', 'Deployment']
  },
  {
    id: 'roadmap-2',
    type: 'Roadmaps',
    tag: 'Roadmap',
    title: 'Computer Science & Problem-Solving Roadmap',
    level: 'Beginner to Intermediate',
    readTime: '10-week path',
    summary:
      'Structured study sequence covering arrays, recursion, hashing, trees, graphs, time/space complexity, and debugging.',
    details: [
      'Build strong fundamentals in time and space complexity before memorizing patterns.',
      'Practice basic data structures (arrays, strings, hash maps, stacks, queues) consistently.',
      'Move gradually to trees, graphs, and dynamic programming with post-solve notes.'
    ],
    keyPoints: ['Complexity', 'Data Structures', 'Algorithms', 'Practice Log']
  },
  {
    id: 'project-1',
    type: 'Projects',
    tag: 'Project Idea',
    title: 'Campus & Local Event Discovery Portal',
    level: 'Intermediate',
    readTime: '2-3 weeks build',
    summary:
      'Build a searchable directory of college workshops, hackathons, seminars, and local community meetups with filters and bookmarks.',
    details: [
      'Core Features: Category & date filters, keyword search, detailed event view, and saved events list.',
      'Technical Focus: Clean responsive UI, structured data filtering, and URL/state sync.',
      'Extension Idea: Add organizer submission flow and calendar export.'
    ],
    keyPoints: ['Search & Filter', 'Event Details', 'Saved List', 'Responsive UI']
  },
  {
    id: 'project-2',
    type: 'Projects',
    tag: 'Project Idea',
    title: 'Study Planner & Revision Tracker App',
    level: 'Beginner',
    readTime: '1-2 weeks build',
    summary:
      'Create a focused revision tracker where students log syllabus topics, confidence levels, and spaced-repetition review dates.',
    details: [
      'Core Features: Subject/topic cards, completion status, upcoming revision reminders, and progress stats.',
      'Technical Focus: Local/cloud persistence, clean form validation, and simple progress tracking.',
      'Extension Idea: Add exam countdowns and weekly target summaries.'
    ],
    keyPoints: ['Syllabus Tracker', 'Revision Dates', 'Data Persistence', 'Clean UX']
  },
  {
    id: 'problem-1',
    type: 'Problem Statements',
    tag: 'Problem Statement',
    title: 'Fragmented Local & Regional Information Access',
    level: 'Hackathon / Capstone',
    readTime: 'Problem Guide',
    summary:
      'Students and local citizens often struggle to find verified, up-to-date information across scattered notices, chats, and regional languages.',
    details: [
      'Problem Context: Important announcements, opportunities, and guides are spread across unstructured sources.',
      'Guiding Question: How can users discover verified, categorized information quickly in their preferred language?',
      'Solution Approach: Centralize structured listings with clear tags, verification markers, and fast mobile access.'
    ],
    keyPoints: ['Information Gap', 'Language Access', 'Verification', 'Mobile First']
  },
  {
    id: 'problem-2',
    type: 'Problem Statements',
    tag: 'Problem Statement',
    title: 'Bridging Classroom Theory with Practical Project Skills',
    level: 'Academic / Startup',
    readTime: 'Problem Guide',
    summary:
      'Many learners finish coursework with theory notes but lack structured guidance on turning concepts into real, documented projects.',
    details: [
      'Problem Context: Beginners often get stuck choosing what to build or how to debug real-world setups.',
      'Guiding Question: How can learners get guided milestones, templates, and feedback while building real projects?',
      'Solution Approach: Pair topic roadmaps with bite-sized project briefs, checklists, and peer/mentor review.'
    ],
    keyPoints: ['Skill Gap', 'Guided Milestones', 'Hands-on Practice', 'Portfolio Readiness']
  }
];

const CATEGORIES = [
  'All',
  'Free Guides',
  'Roadmaps',
  'Projects',
  'Problem Statements'
];

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeResource, setActiveResource] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredResources = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return RESOURCES_DATA.filter((item) => {
      const matchesCat =
        selectedCategory === 'All' || item.type === selectedCategory;
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.keyPoints.some((kp) => kp.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* HEADER */}
        <header className="border-b border-slate-200 pb-7 mb-7">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 bg-white border border-slate-200 px-3 py-1 rounded-md">
              Resources &amp; Guides
            </span>
            <span className="text-xs text-slate-500">
              {filteredResources.length}{' '}
              {filteredResources.length === 1 ? 'resource' : 'resources'}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 leading-tight mb-2">
                Free Guides, Roadmaps, Projects &amp; Problem Statements
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Practical learning guides, step-by-step roadmaps, project ideas, and problem statement guides designed for students and builders.
              </p>
            </div>

            {/* SEARCH INPUT */}
            <div className="w-full lg:w-80">
              <div className="flex items-center bg-white border border-slate-200 rounded-lg px-3.5 py-2 shadow-2xs focus-within:border-slate-400">
                <svg
                  className="w-4 h-4 text-slate-400 mr-2.5 shrink-0"
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
                  placeholder="Search guide, roadmap, project, problem..."
                  className="w-full text-sm text-slate-900 placeholder-slate-400 bg-transparent outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="text-xs text-slate-400 hover:text-slate-700 ml-2 cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* CATEGORY TABS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-7">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* CARDS GRID */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredResources.map((item) => (
              <article
                key={item.id}
                onClick={() => setActiveResource(item)}
                className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-5 sm:p-6 shadow-2xs hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-800">
                      {item.tag}
                    </span>
                    <span className="text-xs text-slate-500">
                      {item.level} · {item.readTime}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-slate-950 leading-snug mb-2">
                    {item.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {item.summary}
                  </p>

                  {/* BRIEF DETAIL PREVIEW */}
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc pl-5 mb-4">
                    {item.details.slice(0, 2).map((point, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.keyPoints.map((kp) => (
                      <span
                        key={kp}
                        className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-slate-50 border border-slate-200/80 text-slate-600"
                      >
                        {kp}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-900">
                    <span>Full Details &amp; Guide</span>
                    <span>View →</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
            <p className="text-base font-bold text-slate-900 mb-1">
              No matching resources found
            </p>
            <p className="text-sm text-slate-500 mb-4">
              Try clearing your search filter or switching to another category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* FULL DETAILS MODAL */}
      {activeResource && (
        <div
          onClick={() => setActiveResource(null)}
          className="fixed inset-0 z-50 bg-slate-950/45 flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-slate-200 rounded-t-2xl sm:rounded-2xl w-full max-w-2xl p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4 mb-5">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-1.5">
                  <span className="font-semibold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded">
                    {activeResource.tag}
                  </span>
                  <span>{activeResource.level}</span>
                  <span>·</span>
                  <span>{activeResource.readTime}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-950 leading-snug">
                  {activeResource.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setActiveResource(null)}
                aria-label="Close details"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 text-sm shrink-0 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-5 text-sm text-slate-700 leading-relaxed mb-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Overview
                </h3>
                <p>{activeResource.summary}</p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Step-by-Step Breakdown
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  {activeResource.details.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Key Focus Areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeResource.keyPoints.map((point) => (
                    <span
                      key={point}
                      className="text-xs font-medium px-3 py-1 rounded-md bg-slate-100 text-slate-800"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveResource(null)}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resources;