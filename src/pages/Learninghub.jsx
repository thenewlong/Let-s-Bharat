import React, { useState, useEffect, useMemo } from 'react';

const LearningHub = () => {
  // ==========================================
  // 1. BANNER & ANIMATION LOGIC
  // ==========================================
  const bannerImages = [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animateText, setAnimateText] = useState(true);

  // Auto-slide every 5 seconds & trigger text animation
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setAnimateText(false); // Reset animation
      setTimeout(() => {
        setCurrentSlide((prev) => (prev === bannerImages.length - 1 ? 0 : prev + 1));
        setAnimateText(true); // Trigger animation on new slide
      }, 300);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [bannerImages.length]);

  // ==========================================
  // 2. COURSES & SEARCH LOGIC
  // ==========================================
  const [courses, setCourses] = useState([]); // Array starts empty
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Technology', 'Business', 'Design', 'Personal Development', 'Academic', 'Teaching & Learning'];

  // Search & Filter Logic
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            course.instructorName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [courses, searchQuery, activeCategory]);

  // ==========================================
  // 3. PAYMENT & BACKEND INTEGRATION LOGIC
  // ==========================================
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState('form'); // 'form' | 'processing' | 'success'
  
  const [newCourse, setNewCourse] = useState({
    title: '',
    instructorName: '',
    category: 'Technology',
    level: 'Beginner',
    lessons: '',
    hours: '',
    thumbnail: '', 
    description: ''
  });

  const handleInputChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  // BACKEND API CONNECTION POINT
  const saveCourseToBackend = async (courseData) => {
    try {
      // Yaha aap apna Fetch API ya Firebase Firestore addDoc laga sakte hain
      // Example: await fetch('https://your-api.com/add-course', { method: 'POST', body: JSON.stringify(courseData) });
      
      console.log("Course Data saved to DB:", courseData);
      return true; // Simulating success
    } catch (error) {
      console.error("Backend Error:", error);
      return false;
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setPaymentStep('processing');

    // Simulate API Call for Payment Gateway Verification
    setTimeout(async () => {
      
      const newCourseData = {
        ...newCourse,
        id: Date.now().toString(),
        rating: '5.0',
        reviews: '0',
        thumbnail: newCourse.thumbnail || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
        createdAt: new Date().toISOString()
      };

      // 1. Save to Backend Database
      const isSaved = await saveCourseToBackend(newCourseData);

      if (isSaved) {
        // 2. Update Frontend State
        setCourses(prev => [newCourseData, ...prev]);
        setPaymentStep('success');

        // 3. Reset after 2 seconds
        setTimeout(() => {
          setIsModalOpen(false);
          setPaymentStep('form');
          setNewCourse({
            title: '', instructorName: '', category: 'Technology', level: 'Beginner', lessons: '', hours: '', thumbnail: '', description: ''
          });
        }, 2000);
      }
    }, 2500); // 2.5s payment processing simulation
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-20 text-slate-800">
      
      {/* 1. HERO SECTION (Banner with Animations) */}
      <div className="relative w-full h-[600px] overflow-hidden bg-black mt-2 rounded-b-[40px] shadow-2xl">
        {bannerImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent z-10"></div>
            <img src={img} alt="Banner" className="w-full h-full object-cover opacity-80" />
          </div>
        ))}

        <div className="relative z-20 h-full flex flex-col justify-center px-8 md:px-24 max-w-5xl">
          <div className={`transition-all duration-700 transform ${animateText ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="bg-[#ffcc00] text-black text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider mb-6 inline-block shadow-md">
              LEARNING HUB
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
              Explore. Learn.<br/>Grow. <span className="text-[#ffcc00]">Succeed.</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-xl font-medium leading-relaxed">
              Discover quality courses, tutorials, and resources from educators across India. Learn anytime, anywhere.
            </p>
            
            {/* SEARCH BAR SYSTEM */}
            <div className="flex bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-xl max-w-2xl shadow-xl transition-all focus-within:bg-white focus-within:border-white group">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for courses, topics or educators..." 
                className="flex-1 px-4 bg-transparent outline-none text-white group-focus-within:text-black placeholder-gray-400 group-focus-within:placeholder-gray-500 text-lg" 
              />
              <button className="bg-[#ffcc00] hover:bg-yellow-400 transition-colors p-4 rounded-lg text-black font-bold flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Banner Indicators */}
        <div className="absolute bottom-10 left-8 md:left-24 flex gap-3 z-20">
          {bannerImages.map((_, idx) => (
            <button 
              key={idx} 
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-10 bg-[#ffcc00]' : 'w-2 bg-white/40 hover:bg-white/70'}`}
            />
          ))}
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16">
        
        {/* Title & Sorting */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">All Learning Resources</h2>
            <p className="text-slate-500 mt-2 text-lg">Find the perfect course to build your skills and achieve your goals.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-500">Sort by:</span>
            <select className="border border-slate-200 rounded-lg px-4 py-2 text-sm bg-white font-semibold text-slate-700 outline-none hover:border-slate-300 focus:ring-2 focus:ring-[#ffcc00]/50 transition-all cursor-pointer">
              <option>Latest</option>
              <option>Popular</option>
              <option>Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 border 
                ${activeCategory === cat 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md transform scale-105' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:bg-slate-50'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3. COURSES GRID (Dynamic Render) */}
        {filteredCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-800 mb-3">No Courses Found</h3>
            <p className="text-slate-500 mb-8 text-lg text-center max-w-md">There are currently no courses matching your criteria. Be the first educator to upload one!</p>
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="bg-[#ffcc00] text-slate-900 px-8 py-4 rounded-xl font-extrabold text-lg hover:bg-[#e6b800] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              + Create Your First Course
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 group flex flex-col transform hover:-translate-y-1">
                {/* Image Container */}
                <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="absolute top-4 left-4 bg-[#ffcc00] text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {course.category}
                  </span>
                </div>
                
                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-inner">
                        {course.instructorName.charAt(0)}
                      </div>
                      <p className="font-bold text-slate-800 text-sm">{course.instructorName}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-extrabold text-[#ffcc00] bg-yellow-50 px-2 py-1 rounded-md">
                      <span>★</span> {course.rating}
                    </div>
                  </div>
                  
                  <h3 className="text-[22px] font-extrabold text-slate-900 mb-3 leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {course.title}
                  </h3>
                  
                  <div className="flex items-center text-[13px] font-medium text-slate-500 gap-3 mb-8">
                    <span className="bg-slate-50 px-2 py-1 rounded">{course.level}</span> • 
                    <span>{course.lessons} Lessons</span> • 
                    <span>{course.hours} Hours</span>
                  </div>
                  
                  <div className="mt-auto flex gap-3">
                    <button className="flex-1 border-2 border-slate-200 py-3 rounded-xl text-sm font-bold text-slate-700 hover:border-slate-900 hover:text-slate-900 transition-all">
                      View Details
                    </button>
                    <button className="flex-1 bg-slate-900 py-3 rounded-xl text-sm font-bold text-white hover:bg-black shadow-md hover:shadow-xl transition-all">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. BOTTOM EDUCATOR CTA */}
        <div className="mt-20 bg-gradient-to-r from-amber-50 to-[#fff8e1] rounded-[32px] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between border border-[#ffcc00]/20 shadow-sm relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#ffcc00]/20 rounded-full blur-3xl"></div>
          <div className="flex items-center gap-8 relative z-10">
            <div className="w-20 h-20 bg-white rounded-2xl shadow-md flex items-center justify-center flex-shrink-0">
              <span className="text-4xl">🎓</span>
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-2">Are you an Educator?</h3>
              <p className="text-slate-600 text-lg">Share your knowledge with thousands of learners. Upload your course for just ₹9.</p>
            </div>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-6 md:mt-0 relative z-10 bg-black text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center gap-3 shadow-xl hover:-translate-y-1"
          >
            Create Your Course
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      </div>

      {/* ========================================== */}
      {/* 5. UPLOAD & PAYMENT MODAL (Rs 9 System) */}
      {/* ========================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm bg-slate-900/60">
          <div className="bg-white rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl relative animate-[fadeIn_0.3s_ease-out]">
            
            {/* Form State */}
            {paymentStep === 'form' && (
              <div className="p-8 md:p-10 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
                  <div>
                    <h2 className="text-3xl font-extrabold text-slate-900">Add New Course</h2>
                    <p className="text-slate-500 mt-1 font-medium">Publish your content globally for just <span className="text-green-600 font-bold">₹9.00</span></p>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors text-slate-600">✕</button>
                </div>
                
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Course Title</label>
                      <input required name="title" value={newCourse.title} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent outline-none transition-all font-medium" placeholder="e.g. Master React Native in 2026" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Instructor Name</label>
                        <input required name="instructorName" value={newCourse.instructorName} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-[#ffcc00] outline-none transition-all font-medium" placeholder="Your Name" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                        <select name="category" value={newCourse.category} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-[#ffcc00] outline-none transition-all font-medium">
                          {categories.filter(c => c !== 'All').map(cat => <option key={cat}>{cat}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-5">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Level</label>
                        <select name="level" value={newCourse.level} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl outline-none font-medium">
                          <option>Beginner</option>
                          <option>Intermediate</option>
                          <option>Advanced</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Total Lessons</label>
                        <input required type="number" name="lessons" value={newCourse.lessons} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl outline-none font-medium" placeholder="20" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Total Hours</label>
                        <input required type="number" name="hours" value={newCourse.hours} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl outline-none font-medium" placeholder="15" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Thumbnail Image URL</label>
                      <input required name="thumbnail" value={newCourse.thumbnail} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:ring-2 focus:ring-[#ffcc00] outline-none transition-all font-medium text-slate-600" placeholder="https://..." />
                      <p className="text-xs text-slate-400 mt-2 font-medium">Note: Connect this to Firebase Storage later for direct file uploads.</p>
                    </div>
                  </div>

                  <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-500 font-medium">Publishing Fee</span>
                      <span className="text-3xl font-black text-slate-900">₹9.00</span>
                    </div>
                    <button type="submit" className="bg-[#ffcc00] px-10 py-4 rounded-xl font-extrabold text-slate-900 hover:bg-[#e6b800] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                      Pay & Publish Now
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Processing State */}
            {paymentStep === 'processing' && (
              <div className="p-16 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="relative w-20 h-20 mb-8">
                  <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-[#ffcc00] rounded-full border-t-transparent animate-spin"></div>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900">Processing ₹9 Payment...</h3>
                <p className="text-slate-500 mt-3 font-medium">Securely connecting to payment gateway & saving data to backend.</p>
              </div>
            )}

            {/* Success State */}
            {paymentStep === 'success' && (
              <div className="p-16 text-center flex flex-col items-center justify-center min-h-[400px] bg-green-50">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white text-5xl mb-6 shadow-lg shadow-green-500/30 animate-[bounce_1s_ease-in-out]">
                  ✓
                </div>
                <h3 className="text-3xl font-extrabold text-slate-900">Successfully Published!</h3>
                <p className="text-slate-600 mt-3 text-lg font-medium">Payment of ₹9 received. Your course is now live.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningHub;