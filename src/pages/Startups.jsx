import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// 1. FULL BANNER SLIDER IMAGES (LOCAL FILES)
// ==========================================
// 👉 Yahan apni local images ka sahi path daaliye (apne folder structure ke hisaab se)
import slide1 from '../assets/images/start4.jpeg';
import slide2 from '../assets/images/start.jpeg';
import slide3 from '../assets/images/start2.jpeg';
import slide4 from '../assets/images/start3.jpeg';


// ✅ Jab aap upar import kar lein, toh unhe niche is array mein daal dein.
// Abhi error na aaye isliye main dummy placeholders rakh raha hoon, aap inhe apne (slide1, slide2, slide3) se replace kar dena.
const bannerSlides = [
  slide1,
  slide2,
  slide3,
  slide4,

];

// ==========================================
// 2. MOCK DATA
// ==========================================
const startupsData = [
  {
    id: 1,
    name: 'OpenAI',
    description: 'Building safe and beneficial AGI that helps humanity solve hard problems.',
    websiteText: 'openai.com',
    url: 'https://openai.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
    verified: true,
    categories: ['AI TOOLS', 'RESEARCH', 'PRODUCTIVITY'],
    keywords: ['chatgpt', 'gpt4', 'text', 'llm', 'dalle']
  },
  {
    id: 2,
    name: 'Anthropic',
    description: 'AI research company focused on building reliable, interpretable and steerable AI systems.',
    websiteText: 'anthropic.com',
    url: 'https://www.anthropic.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Anthropic_logo.svg/2560px-Anthropic_logo.svg.png',
    verified: true,
    categories: ['AI TOOLS', 'RESEARCH', 'SAFETY'],
    keywords: ['claude', 'safety', 'llm', 'text']
  },
  {
    id: 3,
    name: 'Hugging Face',
    description: 'The AI community platform with the best models, datasets and applications.',
    websiteText: 'huggingface.co',
    url: 'https://huggingface.co',
    logo: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg',
    verified: true,
    categories: ['DEVELOPER TOOLS', 'COMMUNITY', 'RESEARCH'],
    keywords: ['open source', 'models', 'machine learning', 'community']
  },
  {
    id: 4,
    name: 'Runway',
    description: 'AI tools to create and edit videos, images and 3D content like never before.',
    websiteText: 'runwayml.com',
    url: 'https://runwayml.com',
    logo: 'https://assets-global.website-files.com/6179af7b4f51e36fc811ad3c/6179af7b4f51e36fc811ad3c_Runway_Logo.svg',
    verified: true,
    categories: ['CREATIVE', 'VIDEO EDITING', 'AI TOOLS'],
    keywords: ['video', 'generation', 'editing', 'gen-2', 'creative']
  },
  {
    id: 5,
    name: 'Midjourney',
    description: 'Independent research lab exploring new mediums of thought and expanding the imaginative powers of the human species.',
    websiteText: 'midjourney.com',
    url: 'https://www.midjourney.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png',
    verified: true,
    categories: ['IMAGE GENERATION', 'DESIGN', 'CREATIVE'],
    keywords: ['images', 'art', 'design', 'drawing', 'generation']
  }
];

const categoriesList = [
  'ALL', 'SAVED', 'AI TOOLS', 'PRODUCTIVITY', 'MARKETING', 'EDUCATION', 'DEVELOPER TOOLS', 'HEALTHCARE', 'FINANCE', 'CREATIVE'
];

const Startups = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [currentSlide, setCurrentSlide] = useState(0);

  // SAVE FEATURE LOGIC (LocalStorage)
  const [savedStartups, setSavedStartups] = useState(() => {
    const saved = localStorage.getItem('savedAIStartups');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('savedAIStartups', JSON.stringify(savedStartups));
  }, [savedStartups]);

  const toggleSave = (id) => {
    setSavedStartups(prev => 
      prev.includes(id) 
        ? prev.filter(startupId => startupId !== id)
        : [...prev, id]
    );
  };

  // Animation Observer for Hero Section
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setIsHeroVisible(true);
      }, { threshold: 0.2 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => { if (heroRef.current) observer.unobserve(heroRef.current); };
  }, []);

  // Full-Banner Slider Auto-play Logic
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === bannerSlides.length - 1 ? 0 : prev + 1));
    }, 5000); 
    return () => clearInterval(slideInterval);
  }, []);

  // FILTER LOGIC
  const filteredStartups = startupsData.filter((startup) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      startup.name.toLowerCase().includes(term) || 
      startup.description.toLowerCase().includes(term) ||
      startup.categories.some(cat => cat.toLowerCase().includes(term)) ||
      startup.keywords.some(key => key.toLowerCase().includes(term));
    
    let matchesCategory = false;
    if (activeCategory === 'ALL') {
      matchesCategory = true;
    } else if (activeCategory === 'SAVED') {
      matchesCategory = savedStartups.includes(startup.id);
    } else {
      matchesCategory = startup.categories.includes(activeCategory);
    }
    
    return matchesSearch && matchesCategory;
  });

  // ==========================================
  // 🚀 PREMIUM 3D WORD ANIMATION VARIANTS
  // ==========================================
  const wordVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -60, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        delay: i * 0.15, // Har word thode delay ke baad aayega
        duration: 0.8,
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    })
  };

  const line1 = ["EXPLORE", "THE", "BEST"];
  const line2 = ["AI", "STARTUPS"];

  return (
    <div className="min-h-screen bg-[#fcf9f2] font-sans pb-10">
      
      {/* HERO SECTION */}
      <div className="max-w-[1300px] mx-auto pt-6 px-4 sm:px-6 lg:px-8" ref={heroRef}>
        <div className="relative w-full h-[320px] md:h-[400px] rounded-[2rem] overflow-hidden flex items-center px-6 sm:px-12 md:px-20 shadow-lg group border-0">
          
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full"
              >
                <img 
                  src={bannerSlides[currentSlide]} 
                  alt="AI Innovation Banner" 
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10"></div>

          <div className="relative z-20 max-w-xl perspective-1000">
            <div className={`inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] sm:text-xs font-semibold tracking-wider mb-3 border border-white/30 transition-all duration-700 ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              DISCOVER INNOVATION
            </div>
            
            {/* 🚀 3D WORD ANIMATION IMPLEMENTATION */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-4 tracking-tight flex flex-col gap-1">
              <div className="flex flex-wrap gap-2 md:gap-3 overflow-visible">
                {line1.map((word, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={wordVariants}
                    initial="hidden"
                    animate={isHeroVisible ? "visible" : "hidden"}
                    style={{ transformStyle: "preserve-3d" }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3 overflow-visible text-[#ffcc00]">
                {line2.map((word, i) => (
                  <motion.span
                    key={i}
                    custom={i + line1.length} // Continues the delay from line 1
                    variants={wordVariants}
                    initial="hidden"
                    animate={isHeroVisible ? "visible" : "hidden"}
                    style={{ transformStyle: "preserve-3d" }}
                    className="inline-block drop-shadow-md"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </h1>
            
            <p className={`text-gray-300 text-xs sm:text-sm md:text-base font-medium mb-8 max-w-sm transition-all duration-700 delay-500 ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Discover trending AI startups building the future. Save your favorites and find them all in one place.
            </p>
            <button className={`bg-[#ffcc00] hover:bg-white text-black px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg text-sm transition-all duration-700 delay-700 ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              EXPLORE NOW
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {bannerSlides.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 ${currentSlide === i ? 'bg-[#ffcc00] w-8' : 'bg-white/50 w-2 hover:bg-white'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* SEARCH BAR & CATEGORIES */}
      <div className="max-w-[1200px] mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-full p-2 shadow-sm flex items-center mb-6 border border-gray-100 focus-within:ring-2 focus-within:ring-[#ffcc00] transition-all">
          <div className="pl-4 pr-2 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input 
            type="text" 
            placeholder="Search AI startups by name, keyword, or category..." 
            className="flex-grow bg-transparent outline-none py-2 text-gray-700 text-xs sm:text-sm font-medium w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-[#ffcc00] hover:bg-yellow-500 text-black px-6 sm:px-8 py-2.5 rounded-full font-bold text-xs tracking-wide transition-colors">
            SEARCH
          </button>
        </div>

        {/* ✅ LINE REMOVED: Border aur shadows puri tarah hata diye gaye hain */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide border-none outline-none ring-0 [&::-webkit-scrollbar]:hidden">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold whitespace-nowrap transition-all uppercase flex items-center gap-1.5 ${
                activeCategory === cat 
                  ? 'bg-[#ffcc00] text-black shadow-sm' 
                  : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {cat === 'SAVED' && (
                <svg className="w-3.5 h-3.5" fill={activeCategory === 'SAVED' ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              )}
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* STARTUPS LIST WITH SCROLL ANIMATION & SAVE BUTTON */}
      <div className="max-w-[1200px] mx-auto mt-2 px-4 sm:px-6 lg:px-8 border-none">
        
        <div className="flex justify-between items-end mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#ffcc00] rounded-xl flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight uppercase">
                {activeCategory === 'SAVED' ? 'SAVED STARTUPS' : 'AI STARTUPS'}
              </h2>
              <p className="text-gray-500 text-[10px] sm:text-xs font-medium mt-0.5">
                {activeCategory === 'SAVED' ? 'Your personally curated list.' : 'Explore top AI startups shaping the world.'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          {filteredStartups.length > 0 ? (
            filteredStartups.map((startup, index) => {
              const isSaved = savedStartups.includes(startup.id);

              return (
                <motion.div
                  key={startup.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: (index % 6) * 0.1 }}
                  className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:shadow-lg hover:border-[#ffcc00]/40 transition-all duration-300 group"
                >
                  
                  <div className="flex items-start sm:items-center gap-4 flex-grow w-full md:w-auto">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center flex-shrink-0 p-2 overflow-hidden group-hover:scale-105 transition-transform">
                      <img 
                        src={startup.logo} 
                        alt={startup.name} 
                        className="w-full h-full object-contain" 
                        onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${startup.name}&background=ffcc00&color=000&bold=true`; }} 
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-1.5 uppercase tracking-wide group-hover:text-[#ffcc00] transition-colors">
                        {startup.name}
                        {startup.verified && (
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ffcc00]" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm mt-0.5 sm:mt-1 max-w-2xl leading-relaxed line-clamp-2">
                        {startup.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1.5 mt-2 sm:mt-3">
                        {startup.categories.map(cat => (
                          <span key={cat} className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-gray-50 border border-gray-100 text-gray-500 text-[8px] sm:text-[9px] font-bold rounded-md tracking-widest uppercase">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-none pt-3 md:pt-0 border-gray-100">
                    <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto">
                      
                      <button 
                        onClick={() => toggleSave(startup.id)}
                        className={`p-2.5 rounded-xl border transition-all duration-300 focus:outline-none flex-shrink-0 ${
                          isSaved 
                            ? 'bg-red-50 border-red-200 text-red-500 shadow-sm' 
                            : 'bg-white border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50'
                        }`}
                        title={isSaved ? "Remove from Saved" : "Save Startup"}
                      >
                        <motion.svg 
                          whileTap={{ scale: 0.8 }}
                          className="w-4 h-4 sm:w-5 sm:h-5" 
                          fill={isSaved ? "currentColor" : "none"} 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </motion.svg>
                      </button>
                      
                      <a 
                        href={startup.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-6 py-2.5 sm:px-8 sm:py-3 rounded-xl bg-[#ffcc00] text-black font-black text-xs hover:bg-black hover:text-[#ffcc00] shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 tracking-widest uppercase"
                      >
                        Visit
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                      </a>
                    </div>
                  </div>

                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {activeCategory === 'SAVED' ? 'No Saved Startups Yet' : 'No Startups Found'}
              </h3>
              <p className="text-gray-500 font-medium text-sm">
                {activeCategory === 'SAVED' 
                  ? 'Click the heart icon on any startup to save it here for quick access!' 
                  : `We couldn't find anything for "${searchTerm}". Try another keyword.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Startups;