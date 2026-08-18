import React, { useState, useEffect, useMemo } from 'react';

const LearningHub = () => {
  // ==========================================
  // 1. AUTH & BACKEND CONFIG 
  // ==========================================
  const CURRENT_USER_ID = "user_123"; 
  const API_ENDPOINT = "https://your-backend-api.com/api"; 

  const bannerImages = [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animateText, setAnimateText] = useState(true);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setAnimateText(false); 
      setTimeout(() => {
        setCurrentSlide((prev) => (prev === bannerImages.length - 1 ? 0 : prev + 1));
        setAnimateText(true); 
      }, 300);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [bannerImages.length]);

  // ==========================================
  // 2. COURSES, SEARCH & SORT LOGIC
  // ==========================================
  const [courses, setCourses] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' | 'oldest'
  
  const categories = ['All', 'Technology', 'Business', 'Design', 'Personal Development', 'Academic'];

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        // Uncomment for real Backend Fetching:
        /* 
        const response = await fetch(`${API_ENDPOINT}/courses`);
        const data = await response.json();
        setCourses(data);
        */
        setCourses([]); 
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    let result = courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            course.instructorName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
      return matchesSearch && matchesCategory;
    });

    // Apply Sorting
    if (sortOrder === 'newest') {
      result.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    } else if (sortOrder === 'oldest') {
      result.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
    }

    return result;
  }, [courses, searchQuery, activeCategory, sortOrder]);

  // ==========================================
  // 3. ADD / EDIT / DELETE / PAYMENT LOGIC
  // ==========================================
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState('form'); 
  const [editMode, setEditMode] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);
  
  // Image Upload States
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [courseForm, setCourseForm] = useState({
    title: '',
    instructorName: '',
    category: 'Technology',
    level: 'Beginner',
    lessons: '',
    hours: '',
  });

  const handleInputChange = (e) => {
    setCourseForm({ ...courseForm, [e.target.name]: e.target.value });
  };

  // Handle Local File Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      
      // Create a local preview URL using FileReader for instant UI update
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openAddModal = () => {
    setEditMode(false);
    setEditingCourseId(null);
    setCourseForm({ title: '', instructorName: '', category: 'Technology', level: 'Beginner', lessons: '', hours: '' });
    setImageFile(null);
    setImagePreview(null);
    setPaymentStep('form');
    setIsModalOpen(true);
  };

  const openEditModal = (course) => {
    setEditMode(true);
    setEditingCourseId(course.id);
    setCourseForm(course);
    setImageFile(null);
    setImagePreview(course.thumbnail); // Load existing image as preview
    setPaymentStep('form');
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this course permanently?")) {
      try {
        // await fetch(`${API_ENDPOINT}/courses/${id}`, { method: 'DELETE' });
        setCourses(courses.filter(c => c.id !== id));
      } catch (error) {
        console.error("Error deleting course", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPaymentStep('processing');

    try {
      // ---------------------------------------------------------
      // BACKEND IMAGE UPLOAD LOGIC (Firebase Storage / REST API)
      // ---------------------------------------------------------
      let uploadedImageUrl = imagePreview; // Defaulting to local preview for demo
      
      if (imageFile) {
        /*
        // For REST API (Node.js/Express):
        const formData = new FormData();
        formData.append('image', imageFile);
        const uploadRes = await fetch(`${API_ENDPOINT}/upload`, { method: 'POST', body: formData });
        const uploadData = await uploadRes.json();
        uploadedImageUrl = uploadData.imageUrl;

        // OR For Firebase Storage:
        // const storageRef = ref(storage, `course_thumbnails/${imageFile.name}`);
        // await uploadBytes(storageRef, imageFile);
        // uploadedImageUrl = await getDownloadURL(storageRef);
        */
      }

      if (editMode) {
        const updatedCourse = { ...courseForm, thumbnail: uploadedImageUrl };
        // await fetch(`${API_ENDPOINT}/courses/${editingCourseId}`, { method: 'PUT', body: JSON.stringify(updatedCourse) });
        setCourses(courses.map(c => c.id === editingCourseId ? { ...c, ...updatedCourse } : c));
      } else {
        const newCourseData = {
          ...courseForm,
          id: Date.now().toString(),
          ownerId: CURRENT_USER_ID,
          rating: '5.0',
          reviews: '0',
          createdAt: Date.now(), // Added timestamp for Newest First sorting
          thumbnail: uploadedImageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
        };
        // await fetch(`${API_ENDPOINT}/courses`, { method: 'POST', body: JSON.stringify(newCourseData) });
        setCourses(prev => [newCourseData, ...prev]);
      }
      
      setPaymentStep('success');
      setTimeout(() => setIsModalOpen(false), 2000);
      
    } catch (error) {
      console.error("Transaction failed", error);
      setPaymentStep('form'); 
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-slate-800 pb-10">
      
      {/* 1. HERO SECTION */}
      <div className="max-w-[1280px] mx-auto p-4 md:p-6 pt-4">
        <div className="relative w-full h-[320px] md:h-[380px] rounded-[20px] overflow-hidden shadow-lg flex flex-col justify-center">
          {bannerImages.map((img, index) => (
            <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent z-10"></div>
              <img src={img} alt="Banner" className="w-full h-full object-cover opacity-50" />
            </div>
          ))}

          <div className="relative z-20 px-6 md:px-12 max-w-2xl">
            <div className={`transition-all duration-700 transform ${animateText ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
              <span className="bg-white/10 text-white border border-white/20 text-[10px] md:text-xs font-semibold px-3 py-1 rounded-full tracking-wide mb-4 inline-block backdrop-blur-md">
                LEARNING HUB
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.15] mb-4 tracking-tight">
                Master New Skills.<br/>Build Your <span className="text-[#ffcc00]">Future.</span>
              </h1>
              
              <div className="flex bg-white p-1 rounded-lg max-w-md shadow-md mb-6">
                <div className="pl-3 flex items-center text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses, topics..." 
                  className="flex-1 px-3 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-sm md:text-base font-medium" 
                />
                <button className="bg-gray-900 hover:bg-gray-800 transition-colors px-5 py-2 rounded-md text-white text-sm font-semibold">
                  Search
                </button>
              </div>

              <div className="hidden md:flex flex-wrap gap-5 text-[13px] text-gray-300 font-medium">
                <div className="flex items-center gap-1.5"><svg className="w-4 h-4 text-[#ffcc00]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4V5a2 2 0 00-2-2H9a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg> Expert Instructors</div>
                <div className="flex items-center gap-1.5"><svg className="w-4 h-4 text-[#ffcc00]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg> Quality Content</div>
                <div className="flex items-center gap-1.5"><svg className="w-4 h-4 text-[#ffcc00]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Verified Hub</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FILTERS & CONTENT SECTION */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 mt-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-gray-200 pb-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all border 
                  ${activeCategory === cat ? 'bg-gray-900 text-white border-gray-900 shadow-sm' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            {/* Newest/Oldest Sorting Dropdown */}
            <div className="relative flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden pr-2 hover:bg-gray-50 transition-colors">
              <span className="pl-3 text-[12px] text-gray-500 font-medium">Sort by:</span>
              <select 
                value={sortOrder} 
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-transparent border-none text-[13px] font-semibold text-gray-700 py-1.5 pl-1 pr-6 focus:ring-0 outline-none cursor-pointer appearance-none"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
              <div className="absolute right-2 pointer-events-none text-gray-400">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
            
           
          </div>
        </div>

        {/* 3. CARDS GRID */}
        {isLoading ? (
           <div className="flex justify-center items-center py-20">
              <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
           </div>
        ) : filteredCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 md:py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            <h3 className="text-xl font-bold text-gray-800 mb-1">No Courses Found</h3>
            <p className="text-gray-500 mb-6 text-sm text-center">Be the first educator to publish content here.</p>
            <button onClick={openAddModal} className="bg-gray-900 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors shadow-sm">
              Publish Course
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-[16px] overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 flex flex-col group relative">
                
                {course.ownerId === CURRENT_USER_ID && (
                  <div className="absolute top-3 right-3 z-10 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEditModal(course)} className="bg-white/90 p-1.5 rounded-md text-blue-600 hover:bg-blue-50 shadow-sm">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </button>
                    <button onClick={() => handleDelete(course.id)} className="bg-white/90 p-1.5 rounded-md text-red-600 hover:bg-red-50 shadow-sm">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                )}

                <div className="relative h-40 w-full bg-gray-100 overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">{course.category}</p>
                    <div className="flex items-center gap-1 text-[12px] font-bold text-gray-800">
                      <svg className="w-3 h-3 text-[#ffcc00] fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                      {course.rating}
                    </div>
                  </div>
                  <h3 className="text-[15px] font-bold text-gray-900 mb-1 leading-snug line-clamp-2">{course.title}</h3>
                  <p className="text-[13px] text-gray-500 mb-4">{course.instructorName}</p>
                  
                  <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div className="text-[12px] font-medium text-gray-500">{course.lessons} Lessons • {course.hours}h</div>
                    <button className="text-[13px] font-bold text-blue-600 hover:text-blue-700">View →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. EDUCATOR CTA BLOCK */}
        <div className="mt-12 bg-gray-900 rounded-[20px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between shadow-lg">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white shrink-0">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Become an Educator</h3>
              <p className="text-gray-400 text-sm">Share your expertise and build your audience on the platform.</p>
            </div>
          </div>
          <button onClick={openAddModal} className="mt-5 md:mt-0 bg-white text-gray-900 px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors shrink-0">
            Publish Course (₹9)
          </button>
        </div>
      </div>

      {/* ========================================== */}
      {/* 6. UPLOAD & PAYMENT MODAL */}
      {/* ========================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-[20px] w-full max-w-[500px] shadow-2xl relative animate-[fadeIn_0.2s_ease-out]">
            
            {paymentStep === 'form' && (
              <div className="p-6 md:p-8 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{editMode ? 'Edit Course' : 'Course Details'}</h2>
                    {!editMode && <p className="text-gray-500 text-[13px] mt-0.5">Publish fee: <span className="text-gray-900 font-bold">₹9.00</span></p>}
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* File Upload UI */}
                  <div>
                    <label className="block text-[12px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Course Thumbnail</label>
                    <div className="relative border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors flex flex-col items-center justify-center overflow-hidden h-36">
                      {imagePreview ? (
                        <>
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <span className="text-white text-sm font-semibold">Change Image</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center text-gray-400">
                          <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                          <span className="text-sm font-medium">Click to upload from gallery</span>
                        </div>
                      )}
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Course Title</label>
                    <input required name="title" value={courseForm.title} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 px-3 py-2.5 rounded-lg focus:ring-1 focus:ring-gray-900 outline-none text-sm" placeholder="e.g. Full Stack Next.js" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Instructor</label>
                      <input required name="instructorName" value={courseForm.instructorName} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 px-3 py-2.5 rounded-lg focus:ring-1 focus:ring-gray-900 outline-none text-sm" placeholder="Name" />
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Category</label>
                      <select name="category" value={courseForm.category} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 px-3 py-2.5 rounded-lg outline-none text-sm">
                        {categories.filter(c => c !== 'All').map(cat => <option key={cat}>{cat}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[12px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Level</label>
                      <select name="level" value={courseForm.level} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 px-3 py-2.5 rounded-lg outline-none text-[13px]">
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Lessons</label>
                      <input required type="number" name="lessons" value={courseForm.lessons} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 px-3 py-2.5 rounded-lg outline-none text-[13px]" placeholder="Total" />
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Hours</label>
                      <input required type="number" name="hours" value={courseForm.hours} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 px-3 py-2.5 rounded-lg outline-none text-[13px]" placeholder="Length" />
                    </div>
                  </div>

                  <button type="submit" className="w-full mt-4 bg-gray-900 py-3 rounded-lg font-bold text-white text-sm hover:bg-gray-800 transition-colors">
                    {editMode ? 'Save Changes' : 'Pay ₹9 & Publish'}
                  </button>
                </form>
              </div>
            )}

            {paymentStep === 'processing' && (
              <div className="p-12 text-center">
                <div className="w-10 h-10 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-lg font-bold text-gray-900">{editMode ? 'Saving changes...' : 'Uploading & Processing...'}</h3>
                <p className="text-gray-500 text-sm mt-1">Please do not close this window.</p>
              </div>
            )}

            {paymentStep === 'success' && (
              <div className="p-12 text-center">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Success!</h3>
                <p className="text-gray-500 text-sm mt-1">{editMode ? 'Course updated.' : 'Course published successfully.'}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningHub;