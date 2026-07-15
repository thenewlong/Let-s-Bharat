import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ==========================================
// 1. MOCK DATA (Future mein yaha add karna)
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
    categories: ['AI TOOLS', 'RESEARCH', 'PRODUCTIVITY']
  },
  {
    id: 2,
    name: 'Anthropic',
    description: 'AI research company focused on building reliable, interpretable and steerable AI systems.',
    websiteText: 'anthropic.com',
    url: 'https://www.anthropic.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Anthropic_logo.svg/2560px-Anthropic_logo.svg.png',
    verified: true,
    categories: ['AI TOOLS', 'RESEARCH', 'SAFETY']
  },
  {
    id: 3,
    name: 'Hugging Face',
    description: 'The AI community platform with the best models, datasets and applications.',
    websiteText: 'huggingface.co',
    url: 'https://huggingface.co',
    logo: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg',
    verified: true,
    categories: ['AI TOOLS', 'DEVELOPER TOOLS', 'COMMUNITY']
  },
  {
    id: 4,
    name: 'Runway',
    description: 'AI tools to create and edit videos, images and 3D content like never before.',
    websiteText: 'runwayml.com',
    url: 'https://runwayml.com',
    logo: 'https://assets-global.website-files.com/6179af7b4f51e36fc811ad3c/6179af7b4f51e36fc811ad3c_Runway_Logo.svg',
    verified: true,
    categories: ['AI TOOLS', 'CREATIVE', 'VIDEO EDITING']
  },
  {
    id: 5,
    name: 'Midjourney',
    description: 'Independent research lab exploring new mediums of thought and expanding the imaginative powers of the human species.',
    websiteText: 'midjourney.com',
    url: 'https://www.midjourney.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png',
    verified: true,
    categories: ['AI TOOLS', 'IMAGE GENERATION', 'DESIGN']
  },
  {
    id: 6,
    name: 'Stability AI',
    description: 'We build generative AI models for imaging, language, audio, video and 3D.',
    websiteText: 'stability.ai',
    url: 'https://stability.ai',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Stability_AI_logo.svg/2560px-Stability_AI_logo.svg.png',
    verified: true,
    categories: ['AI TOOLS', 'RESEARCH', 'OPEN SOURCE']
  },
  {
    id: 7,
    name: 'Perplexity AI',
    description: 'Answer anything. Search the web with AI and get real-time, accurate answers.',
    websiteText: 'perplexity.ai',
    url: 'https://www.perplexity.ai',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Perplexity_AI_logo.svg/1024px-Perplexity_AI_logo.svg.png',
    verified: true,
    categories: ['AI TOOLS', 'SEARCH', 'PRODUCTIVITY']
  }
];

const categoriesList = [
  'ALL', 'AI TOOLS', 'PRODUCTIVITY', 'MARKETING', 'EDUCATION', 'DEVELOPER TOOLS', 'HEALTHCARE', 'FINANCE'
];

const Startups = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [currentSlide, setCurrentSlide] = useState(0);

  // ==========================================
  // 2. AUTOMATIC SLIDER LOGIC
  // ==========================================
  const totalSlides = 4; // Mock slides count

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 4000); // Har 4 second mein slide change
    return () => clearInterval(slideInterval);
  }, []);

  // ==========================================
  // 3. SEARCH & CATEGORY FILTER LOGIC
  // ==========================================
  const filteredStartups = startupsData.filter((startup) => {
    const matchesSearch = 
      startup.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      startup.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      startup.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = activeCategory === 'ALL' || startup.categories.includes(activeCategory);
    
    return matchesSearch && matchesCategory;
  });

  return (
    // Background: Sky Yellow/Cream tint matching your UI
    <div className="min-h-screen bg-[#fcf9f2] font-sans pb-20">
      
      {/* ========================================================= */}
      {/* HERO SECTION (Automatic Slider) */}
      {/* ========================================================= */}
      <div className="max-w-[1400px] mx-auto pt-6 px-4 sm:px-8">
        <div className="relative w-full h-[350px] bg-gradient-to-r from-[#ffeeb8] via-[#fff5d1] to-[#ffeaa1] rounded-[2.5rem] overflow-hidden flex items-center justify-between px-12 md:px-24 shadow-sm">
          
          {/* Left Content */}
          <div className="z-10 max-w-lg">
            <div className="inline-block px-3 py-1 bg-white/60 rounded-full text-[#b37400] text-xs font-bold tracking-wider mb-4 border border-white/50">
              DISCOVER INNOVATION
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4 tracking-tight">
              EXPLORE THE BEST <br />
              <span className="text-gray-900">AI STARTUPS</span>
            </h1>
            <p className="text-gray-700 text-sm md:text-base font-medium mb-8">
              Discover trending AI startups building <br className="hidden md:block"/> the future. All in one place.
            </p>
            <button className="bg-[#ffcc00] hover:bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-sm text-sm">
              EXPLORE NOW
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </div>

          {/* Right Image (Placeholder for 3D AI Hand) */}
          <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 w-[450px]">
            {/* Yaha tum apna assets/images/ai-hand.png daal sakte ho */}
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="https://cdn3d.iconscout.com/3d/premium/thumb/ai-chip-7104085-5775791.png" 
                alt="AI Innovation" 
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </motion.div>
          </div>

          {/* Slider Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {[...Array(totalSlides)].map((_, i) => (
              <div 
                key={i} 
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentSlide === i ? 'bg-white w-6' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SEARCH BAR & CATEGORIES */}
      {/* ========================================================= */}
      <div className="max-w-6xl mx-auto mt-12 px-4 sm:px-6">
        
        {/* Search Input */}
        <div className="bg-white rounded-full p-2 shadow-sm flex items-center mb-8 border border-gray-100">
          <div className="pl-4 pr-2 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input 
            type="text" 
            placeholder="Search AI startups, tools, or categories..." 
            className="flex-grow bg-transparent outline-none py-2 text-gray-700 text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-[#ffcc00] hover:bg-yellow-500 text-black px-8 py-2.5 rounded-full font-bold text-xs tracking-wide transition-colors">
            SEARCH
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat 
                  ? 'bg-[#ffcc00] text-black shadow-sm' 
                  : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
          
          <button className="px-5 py-2.5 rounded-full bg-white text-gray-500 border border-gray-200 text-xs font-bold flex items-center gap-2 hover:bg-gray-50 ml-auto transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
            FILTER
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* STARTUPS LIST WITH SCROLL ANIMATION */}
      {/* ========================================================= */}
      <div className="max-w-6xl mx-auto mt-10 px-4 sm:px-6">
        
        {/* List Header */}
        <div className="flex justify-between items-end mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#ffcc00] rounded-xl flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">AI STARTUPS</h2>
              <p className="text-gray-500 text-xs font-medium mt-1">Explore top AI startups and tools transforming the world with innovation.</p>
            </div>
          </div>
          
          <button className="hidden sm:flex bg-white px-4 py-2 rounded-lg border border-gray-200 text-xs font-bold text-gray-600 items-center gap-2 shadow-sm">
            NEWEST FIRST
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
        </div>

        {/* Startups Cards List */}
        <div className="flex flex-col gap-4">
          {filteredStartups.length > 0 ? (
            filteredStartups.map((startup, index) => (
              <motion.div
                key={startup.id}
                // 👇 Yaha scroll animation ka logic hai (ek ek karke aayega)
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-lg transition-all duration-300"
              >
                
                {/* Left Side: Logo & Info */}
                <div className="flex items-start gap-5 flex-grow">
                  {/* Company Logo */}
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 p-2 overflow-hidden">
                    <img src={startup.logo} alt={startup.name} className="w-full h-full object-contain" />
                  </div>
                  
                  {/* Details */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-1.5">
                      {startup.name}
                      {startup.verified && (
                        <svg className="w-4 h-4 text-[#ffcc00]" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1 max-w-2xl leading-relaxed">
                      {startup.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {startup.categories.map(cat => (
                        <span key={cat} className="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold rounded-md tracking-wider">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side: Website Link & Actions */}
                <div className="flex items-center gap-5 w-full md:w-auto justify-between md:justify-end border-t md:border-none pt-4 md:pt-0 border-gray-100">
                  <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                    {startup.websiteText}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button className="p-2 text-gray-400 hover:text-[#ffcc00] transition-colors rounded-lg border border-transparent hover:border-gray-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                    </button>
                    {/* DIRECT VISIT LINK */}
                    <a 
                      href={startup.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 rounded-lg border-2 border-[#ffcc00] text-[#b38f00] font-bold text-xs hover:bg-[#ffcc00] hover:text-black transition-all flex items-center gap-2"
                    >
                      VISIT
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                  </div>
                </div>

              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
              <p className="text-gray-500 font-medium">No startups found for "{searchTerm}". Try a different search!</p>
            </div>
          )}
        </div>

        {/* Pagination Dummy UI (As per design) */}
        <div className="flex items-center justify-center gap-2 mt-12">
          <button className="w-10 h-10 rounded-xl bg-[#ffcc00] text-black font-bold text-sm shadow-sm">1</button>
          <button className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50">2</button>
          <button className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50">3</button>
          <span className="text-gray-400 font-bold px-2">...</span>
          <button className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50">20</button>
          <button className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-gray-600 font-bold flex items-center justify-center hover:bg-gray-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Startups;