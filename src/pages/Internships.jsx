import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from "react-helmet-async";

// ==========================================
// 1. IMPORT LOCAL IMAGES (Banner Illustrations)
// ==========================================
const bannerSlides = [
  "https://cdn3d.iconscout.com/3d/premium/thumb/internship-5374075-4496234.png", 
  "https://cdn3d.iconscout.com/3d/premium/thumb/graduating-student-5374072-4496231.png",
];

const Internships = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // AUTOMATIC SLIDER LOGIC
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === bannerSlides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="min-h-screen bg-[#fcf9f2] font-sans pb-20">
      
      <Helmet>
        <title>Internships (Coming Soon) | Letsbharat</title>
        <meta name="description" content="Exciting internship opportunities for students and freshers are coming soon." />
      </Helmet>

      {/* ========================================================= */}
      {/* HERO BANNER SECTION (SLIDING)                           */}
      {/* ========================================================= */}
      <div className="max-w-[1400px] mx-auto pt-6 px-4 sm:px-8">
        <div className="relative w-full h-[350px] bg-gradient-to-r from-[#ffeeb8] via-[#fff5d1] to-[#ffeaa1] rounded-[2.5rem] overflow-hidden flex items-center justify-between px-8 md:px-24 shadow-sm">
          
          <div className="z-10 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/60 rounded-full text-[#b37400] text-xs font-bold tracking-wider mb-4 border border-white/50 uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b37400] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b37400]"></span>
              </span>
              Upcoming Platform
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4 tracking-tight uppercase">
              Kickstart Your <br />
              <span className="text-[#ffcc00] stroke-black drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">CAREER</span> JOURNEY
            </h1>
            <p className="text-gray-700 text-sm md:text-base font-medium mb-8">
              We are curating the best internship opportunities <br className="hidden md:block"/> for students and freshers. Stay tuned!
            </p>
          </div>

          <div className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 w-[300px] lg:w-[450px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 1.1, x: -20 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full flex items-center justify-center"
              >
                <img 
                  src={bannerSlides[currentSlide]} 
                  alt="Internship Slide" 
                  className="w-full h-auto object-contain drop-shadow-2xl max-h-[300px]"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {bannerSlides.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentSlide(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${currentSlide === i ? 'bg-[#ffcc00] w-8' : 'bg-white/60 w-2.5 hover:bg-white'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* COMING SOON / NOT AVAILABLE SECTION                     */}
      {/* ========================================================= */}
      <div className="max-w-[1400px] mx-auto mt-16 px-4 sm:px-8 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-[2rem] p-10 md:p-16 max-w-3xl w-full text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100"
        >
          <div className="w-24 h-24 bg-[#fff5d1] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <svg className="w-12 h-12 text-[#ffcc00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          
          <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">
            Internships Coming Soon 
          </h2>
          
          <p className="text-gray-500 font-medium mb-10 max-w-lg mx-auto">
            We are working hard behind the scenes to partner with top companies and bring you the most exciting internship opportunities. The portal will be live very soon.
          </p>

          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl mx-auto">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 uppercase">Want an early update?</h4>
                <p className="text-xs text-gray-500 font-medium mt-0.5">Get notified the moment we launch.</p>
              </div>
            </div>
            
            <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-md text-xs uppercase tracking-wide">
              Notify Me
            </button>
          </div>
          
        </motion.div>
      </div>

    </div>
  );
};

export default Internships;