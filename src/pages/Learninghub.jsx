import React, { useState, useEffect, useMemo } from 'react';

const CURRENT_USER_ID = 'user_123';

const TOP_TEACHING_CHANNELS = [
  {
    
    id: 'yt-3',
    name: 'CS50 (Harvard)',
    handle: '@cs50',
    focus: 'Computer Science, Algorithms & Web',
    url: 'https://www.youtube.com/@cs50',
    badge: 'University Track'
  },
  {
    id: 'yt-4',
    name: 'MIT OpenCourseWare',
    handle: '@mitocw',
    focus: 'Systems, AI, Math & Engineering',
    url: 'https://www.youtube.com/@mitocw',
    badge: 'Open Lectures'
  }
];

const INITIAL_COURSES = [
  {
    id: 'course-1',
    title: 'Modern Web & React Architecture',
    instructorName: 'LetsBharat Learning Desk',
    category: 'Technology',
    level: 'Beginner',
    lessons: 24,
    hours: 8,
    rating: '4.9',
    createdAt: 1732200000000,
    ownerId: 'system',
    thumbnail:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=80',
    youtubeUrl: 'https://www.youtube.com/@LetsBharat',
    channelName: 'LetsBharat Official',
    summary:
      'Structured video walkthroughs covering component design, state management, responsive UI, and real project deployment.'
  },
  {
    id: 'course-2',
    title: 'Applied AI, Prompts & RAG Workflows',
    instructorName: 'Newlong.AI Lab',
    category: 'Technology',
    level: 'Intermediate',
    lessons: 18,
    hours: 6,
    rating: '4.8',
    createdAt: 1732100000000,
    ownerId: 'system',
    thumbnail:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&q=80',
    youtubeUrl: 'https://www.youtube.com/@freecodecamp',
    channelName: 'freeCodeCamp.org',
    summary:
      'Practical sessions on LLM APIs, retrieval pipelines, evaluation habits, and building helpful student tools.'
  },
  {
    id: 'course-3',
    title: 'Core Computer Science & Problem Solving',
    instructorName: 'CS50 Lectures',
    category: 'Academic',
    level: 'Beginner',
    lessons: 20,
    hours: 12,
    rating: '5.0',
    createdAt: 1732000000000,
    ownerId: 'system',
    thumbnail:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=80',
    youtubeUrl: 'https://www.youtube.com/@cs50',
    channelName: 'CS50',
    summary:
      'Foundational lectures on algorithms, data structures, memory, and clean software problem-solving.'
  },
  {
    id: 'course-4',
    title: 'Product Thinking & Early Startup Execution',
    instructorName: 'Northeast Builder Notes',
    category: 'Business',
    level: 'Beginner',
    lessons: 14,
    hours: 5,
    rating: '4.8',
    createdAt: 1731900000000,
    ownerId: 'system',
    thumbnail:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80',
    youtubeUrl: 'https://www.youtube.com/@LetsBharat',
    channelName: 'LetsBharat Official',
    summary:
      'Step-by-step guidance on validating student problems, shipping MVPs, and presenting projects clearly.'
  }
];

const BANNER_SLIDES = [
  {
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80',
    
    heading: 'Learn from Top Teaching Channels & Structured Tracks',
    subtext:
      'Curated YouTube classrooms, practical coding sessions, and open learning resources in one place.'
  },
  {
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=80',
    
    heading: 'Build Real Skills at Your Own Pace',
    subtext:
      'Jump straight into trusted educator channels or browse courses by topic and level.'
  },
  {
    image:
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1920&q=80',
   
    heading: 'From Classroom Concepts to Real Projects',
    subtext:
      'Connect YouTube lectures with hands-on practice and community-shared courses.'
  }
];

const CATEGORIES = [
  'All',
  'Technology',
  'Business',
  'Design',
  'Personal Development',
  'Academic'
];

const LearningHub = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [publishStep, setPublishStep] = useState('form');
  const [editMode, setEditMode] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);
  const [courseForm, setCourseForm] = useState({
    title: '',
    instructorName: '',
    channelName: 'LetsBharat Official',
    youtubeUrl: 'https://www.youtube.com/@LetsBharat',
    category: 'Technology',
    level: 'Beginner',
    lessons: '',
    hours: '',
    summary: ''
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const filteredCourses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = courses.filter((course) => {
      const matchesQuery =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.instructorName.toLowerCase().includes(q) ||
        (course.channelName || '').toLowerCase().includes(q);
      const matchesCat =
        activeCategory === 'All' || course.category === activeCategory;
      return matchesQuery && matchesCat;
    });

    return [...list].sort((a, b) =>
      sortOrder === 'newest'
        ? (b.createdAt || 0) - (a.createdAt || 0)
        : (a.createdAt || 0) - (b.createdAt || 0)
    );
  }, [courses, searchQuery, activeCategory, sortOrder]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCourseForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const openCreateModal = () => {
    setEditMode(false);
    setEditingCourseId(null);
    setCourseForm({
      title: '',
      instructorName: '',
      channelName: 'LetsBharat Official',
      youtubeUrl: 'https://www.youtube.com/@LetsBharat',
      category: 'Technology',
      level: 'Beginner',
      lessons: '',
      hours: '',
      summary: ''
    });
    setImagePreview(null);
    setPublishStep('form');
    setIsModalOpen(true);
  };

  const openUpdateModal = (course) => {
    setEditMode(true);
    setEditingCourseId(course.id);
    setCourseForm({
      title: course.title,
      instructorName: course.instructorName,
      channelName: course.channelName || 'LetsBharat Official',
      youtubeUrl: course.youtubeUrl || 'https://www.youtube.com/@LetsBharat',
      category: course.category,
      level: course.level || 'Beginner',
      lessons: course.lessons,
      hours: course.hours,
      summary: course.summary || ''
    });
    setImagePreview(course.thumbnail);
    setPublishStep('form');
    setIsModalOpen(true);
  };

  const handleRemoveCourse = (id) => {
    if (window.confirm('Remove this course from Learning Hub?')) {
      setCourses((prev) => prev.filter((item) => item.id !== id));
      if (selectedCourse?.id === id) setSelectedCourse(null);
    }
  };

  const handleSaveCourse = (e) => {
    e.preventDefault();
    setPublishStep('processing');

    const safeUrl =
      courseForm.youtubeUrl && courseForm.youtubeUrl.startsWith('http')
        ? courseForm.youtubeUrl
        : 'https://www.youtube.com/@LetsBharat';

    setTimeout(() => {
      if (editMode && editingCourseId) {
        setCourses((prev) =>
          prev.map((item) =>
            item.id === editingCourseId
              ? {
                  ...item,
                  ...courseForm,
                  youtubeUrl: safeUrl,
                  thumbnail: imagePreview || item.thumbnail
                }
              : item
          )
        );
      } else {
        const created = {
          ...courseForm,
          id: `course-${Date.now()}`,
          ownerId: CURRENT_USER_ID,
          rating: '5.0',
          createdAt: Date.now(),
          youtubeUrl: safeUrl,
          thumbnail:
            imagePreview ||
            'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=80'
        };
        setCourses((prev) => [created, ...prev]);
      }

      setPublishStep('success');
      setTimeout(() => setIsModalOpen(false), 1200);
    }, 500);
  };

  const activeBanner = BANNER_SLIDES[currentSlide];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* HERO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
        <div className="relative h-[340px] sm:h-[390px] rounded-2xl overflow-hidden bg-slate-900 shadow-md">
          {BANNER_SLIDES.map((slide, idx) => (
            <img
              key={slide.heading}
              src={slide.image}
              alt={slide.heading}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                idx === currentSlide ? 'opacity-45' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-900/30" />

          <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 max-w-2xl">
            <span className="inline-block w-fit text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-amber-400/15 text-amber-300 border border-amber-300/30 mb-3">
              {activeBanner.tag}
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-white leading-tight mb-2.5">
              {activeBanner.heading}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mb-5 max-w-xl">
              {activeBanner.subtext}
            </p>

            {/* SEARCH BAR */}
            <div className="flex items-center bg-white rounded-xl p-1.5 max-w-lg shadow-sm">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search course, topic, instructor, or YouTube channel..."
                className="flex-1 px-3 py-1.5 text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="px-2 text-xs text-slate-400 hover:text-slate-700"
                >
                  Clear
                </button>
              )}
              <span className="bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-lg">
                Filter
              </span>
            </div>

            {/* SLIDE DOTS */}
            <div className="flex items-center gap-2 mt-5">
              {BANNER_SLIDES.map((s, i) => (
                <button
                  key={s.tag}
                  type="button"
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentSlide ? 'w-7 bg-amber-400' : 'w-2 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* YOUTUBE & TOP TEACHING CHANNELS DIRECTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-rose-600">
                YouTube &amp; Top Teaching
              </p>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Connected Teaching Channels
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Direct links to verified learning &amp; lecture channels
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {TOP_TEACHING_CHANNELS.map((ch) => (
              <a
                key={ch.id}
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-slate-200 hover:border-slate-400 rounded-xl p-4 bg-slate-50/60 hover:bg-white transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200/70">
                      YouTube
                    </span>
                    <span className="text-[11px] font-medium text-slate-500">
                      {ch.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                    {ch.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{ch.handle}</p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    {ch.focus}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200/70 flex items-center justify-between text-xs font-semibold text-slate-800">
                  <span>Open Channel</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">
                 
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY BAR & SORTING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  activeCategory === category
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-600">
              <span>Sort:</span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-transparent font-semibold text-slate-800 outline-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </label>

            <button
              type="button"
              onClick={openCreateModal}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              + Add Course
            </button>
          </div>
        </div>

        {/* COURSES GRID */}
        {isLoading ? (
          <div className="py-20 flex justify-center">
            <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              No matching courses found
            </h3>
            <p className="text-sm text-slate-500 mb-5">
              Try another keyword or category, or add your own learning track.
            </p>
            <button
              type="button"
              onClick={openCreateModal}
              className="bg-slate-900 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              Add Course
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredCourses.map((course) => (
              <article
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 hover:shadow-sm transition-all overflow-hidden flex flex-col group relative"
              >
                {course.ownerId === CURRENT_USER_ID && (
                  <div className="absolute top-2.5 right-2.5 z-10 flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => openUpdateModal(course)}
                      className="bg-white/95 text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xs hover:bg-slate-100 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveCourse(course.id)}
                      className="bg-white/95 text-rose-600 text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xs hover:bg-rose-50 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                )}

                <div className="h-40 bg-slate-100 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    <span>{course.category}</span>
                    <span className="text-slate-800">★ {course.rating}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2 mb-1">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-3">
                    {course.instructorName}
                    {course.channelName ? ` · ${course.channelName}` : ''}
                  </p>

                  <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-xs text-slate-500">
                      {course.lessons || 0} lessons · {course.hours || 0}h
                    </span>

                    <div className="flex items-center gap-3">
                      {course.youtubeUrl && (
                        <a
                          href={course.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-rose-600 hover:text-rose-700"
                        >
                          YouTube 
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => setSelectedCourse(course)}
                        className="text-xs font-bold text-slate-900 hover:underline cursor-pointer"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* EDUCATOR CTA STRIP */}
        <div className="mt-12 bg-slate-900 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-white">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-300 mb-1">
              Share Your Teaching
            </p>
            <h3 className="text-xl font-bold">
              Publish a Course or Link a Teaching Channel
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Add structured learning tracks and connect students directly to your YouTube lessons.
            </p>
          </div>
          <button
            type="button"
            onClick={openCreateModal}
            className="bg-white text-slate-900 hover:bg-slate-100 text-sm font-bold px-5 py-2.5 rounded-lg shrink-0 transition-colors cursor-pointer"
          >
            Publish Course (₹9)
          </button>
        </div>
      </section>

      {/* COURSE DETAIL MODAL */}
      {selectedCourse && (
        <div
          onClick={() => setSelectedCourse(null)}
          className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-xl border border-slate-200"
          >
            <div className="h-48 bg-slate-100">
              <img
                src={selectedCourse.thumbnail}
                alt={selectedCourse.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span>
                  {selectedCourse.category} · {selectedCourse.level}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedCourse(null)}
                  className="text-slate-500 hover:text-slate-900 font-semibold cursor-pointer"
                >
                  Close ✕
                </button>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                {selectedCourse.title}
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Instructor: {selectedCourse.instructorName} · Channel:{' '}
                {selectedCourse.channelName || 'YouTube'}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed mb-5">
                {selectedCourse.summary ||
                  'Structured video lessons and practical learning exercises designed for steady skill building.'}
              </p>

              <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <span className="text-xs font-medium text-slate-600">
                  {selectedCourse.lessons} Lessons · {selectedCourse.hours} Hours
                </span>
                {selectedCourse.youtubeUrl && (
                  <a
                    href={selectedCourse.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors"
                  >
                    Watch on YouTube 
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT COURSE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl border border-slate-200 overflow-hidden">
            {publishStep === 'form' && (
              <form
                onSubmit={handleSaveCourse}
                className="p-6 sm:p-7 space-y-4 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {editMode ? 'Edit Course' : 'Publish New Course'}
                    </h2>
                    {!editMode && (
                      <p className="text-xs text-slate-500">
                        Listing fee: <strong className="text-slate-900">₹9.00</strong>
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="text-slate-400 hover:text-slate-700 text-sm cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Thumbnail Image
                  </label>
                  <div className="relative h-32 border border-dashed border-slate-300 rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-slate-500">
                        Click to choose thumbnail image
                      </span>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Course Title
                  </label>
                  <input
                    required
                    name="title"
                    value={courseForm.title}
                    onChange={handleFormChange}
                    placeholder="e.g. React & JavaScript Fundamentals"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-slate-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Instructor Name
                    </label>
                    <input
                      required
                      name="instructorName"
                      value={courseForm.instructorName}
                      onChange={handleFormChange}
                      placeholder="Educator name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      YouTube Channel Name
                    </label>
                    <input
                      name="channelName"
                      value={courseForm.channelName}
                      onChange={handleFormChange}
                      placeholder="e.g. LetsBharat Official"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    YouTube Channel / Playlist Link
                  </label>
                  <input
                    type="url"
                    name="youtubeUrl"
                    value={courseForm.youtubeUrl}
                    onChange={handleFormChange}
                    placeholder="https://www.youtube.com/@..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-slate-400"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={courseForm.category}
                      onChange={handleFormChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none"
                    >
                      {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Lessons
                    </label>
                    <input
                      required
                      type="number"
                      min="1"
                      name="lessons"
                      value={courseForm.lessons}
                      onChange={handleFormChange}
                      placeholder="12"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Hours
                    </label>
                    <input
                      required
                      type="number"
                      min="1"
                      name="hours"
                      value={courseForm.hours}
                      onChange={handleFormChange}
                      placeholder="4"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Short Description
                  </label>
                  <textarea
                    rows="2"
                    name="summary"
                    value={courseForm.summary}
                    onChange={handleFormChange}
                    placeholder="What will learners gain from this course?"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-slate-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold py-3 rounded-lg transition-colors cursor-pointer"
                >
                  {editMode ? 'Save Changes' : 'Pay ₹9 & Publish'}
                </button>
              </form>
            )}

            {publishStep === 'processing' && (
              <div className="p-12 text-center">
                <div className="w-9 h-9 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm font-bold text-slate-900">
                  Saving your course...
                </p>
              </div>
            )}

            {publishStep === 'success' && (
              <div className="p-12 text-center">
                <p className="text-base font-bold text-emerald-700 mb-1">
                  {editMode ? 'Course Updated' : 'Course Published'}
                </p>
                <p className="text-xs text-slate-500">
                  Your learning track is now live in Learning Hub.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningHub;