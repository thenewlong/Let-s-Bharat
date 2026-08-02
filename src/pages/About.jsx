import React from 'react';
import { motion } from 'framer-motion';

// 📂 Apne file explorer / assets folder ke hisaab se path adjust kar sakte ho
import laptopVideo from '../assets/videos/inst.mp4';
import phoneVideo from '../assets/videos/inst1.mp4';

const About = () => {
  // Animation Variants for smooth text entry
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-white py-16 px-5 md:px-12 lg:px-20 font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Top Section: Text & Dual Device Mockups (Laptop + Phone) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mt-10">
          
          {/* Left: Text Content (Takes 7 cols on large screens) */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <motion.h4 variants={fadeUp} className="text-[#f5a623] text-sm md:text-base font-bold tracking-widest uppercase">
              About LetsBharat
            </motion.h4>
            
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
              Empowering the <br className="hidden md:block" />
              Builders of <span className="text-[#f5a623]">India!</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-gray-400 text-base md:text-xl max-w-xl leading-relaxed pt-2">
              Letsbharat is more than a platform — it's a movement to empower young minds with opportunities, resources, and real-world exposure to build, innovate, and lead across the nation.
            </motion.p>
          </motion.div>

          {/* Right: Dual Device Mockups (Laptop + Phone with Local Video Imports) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative w-full flex justify-center items-center py-6"
          >
            <div className="relative w-full max-w-md lg:max-w-none flex flex-col items-center">
              
              {/* Laptop Mockup */}
              <div className="w-full relative z-10">
                <div className="relative w-full aspect-video bg-black rounded-t-xl sm:rounded-t-2xl border-[5px] sm:border-[6px] border-[#1a1c23] shadow-2xl overflow-hidden">
                  <video 
                    src={laptopVideo} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                  {/* Screen Glare Effect */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
                </div>
                {/* Laptop Base/Keyboard Deck */}
                <div className="w-[108%] -ml-[4%] h-4 sm:h-5 bg-[#12141a] rounded-b-xl sm:rounded-b-2xl border-t border-gray-700 shadow-[0_10px_30px_rgba(245,166,35,0.15)] relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-1 sm:h-1.5 bg-gray-600 rounded-b-md"></div>
                </div>
              </div>

              {/* Phone Mockup (Overlapping neatly on bottom-right) */}
              <div className="w-36 sm:w-44 md:w-48 absolute -bottom-8 -right-2 sm:-bottom-10 sm:-right-4 md:-right-6 z-20 drop-shadow-2xl">
                <div className="bg-black rounded-[2rem] sm:rounded-[2.5rem] p-2 border-[4px] sm:border-[5px] border-[#252833] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                  <div className="relative w-full aspect-[9/19] rounded-[1.6rem] sm:rounded-[2rem] overflow-hidden bg-black">
                    <video 
                      src={phoneVideo} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                    {/* Phone Dynamic Island / Notch */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-black rounded-full z-30"></div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

        {/* Bottom Section: 4 Grid Features */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-[#0a0c10] border border-gray-800/60 rounded-3xl p-6 md:p-10 shadow-2xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-800/50">
            
            {/* Card 1 */}
            <div className="group pt-6 sm:pt-0 sm:px-6 first:pt-0 first:pl-0 flex flex-col items-start cursor-pointer">
              <div className="w-12 h-12 rounded-full border border-gray-700 bg-gray-900 flex items-center justify-center text-[#f5a623] mb-5 group-hover:bg-[#f5a623]/10 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Opportunities</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">
                Discover hackathons, internships, jobs and resources curated for the next generation.
              </p>
              <span className="text-[#f5a623] text-lg transition-transform group-hover:translate-x-2">→</span>
            </div>

            {/* Card 2 */}
            <div className="group pt-6 sm:pt-0 sm:px-6 flex flex-col items-start cursor-pointer">
              <div className="w-12 h-12 rounded-full border border-gray-700 bg-gray-900 flex items-center justify-center text-[#f5a623] mb-5 group-hover:bg-[#f5a623]/10 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Community</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">
                Join a growing community of innovators, creators and change-makers.
              </p>
              <span className="text-[#f5a623] text-lg transition-transform group-hover:translate-x-2">→</span>
            </div>

            {/* Card 3 */}
            <div className="group pt-6 sm:pt-0 sm:px-6 flex flex-col items-start cursor-pointer">
              <div className="w-12 h-12 rounded-full border border-gray-700 bg-gray-900 flex items-center justify-center text-[#f5a623] mb-5 group-hover:bg-[#f5a623]/10 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Learning</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">
                Learn, upskill and grow with our learning hub and expert curated content.
              </p>
              <span className="text-[#f5a623] text-lg transition-transform group-hover:translate-x-2">→</span>
            </div>

            {/* Card 4 */}
            <div className="group pt-6 sm:pt-0 sm:px-6 flex flex-col items-start cursor-pointer">
              <div className="w-12 h-12 rounded-full border border-gray-700 bg-gray-900 flex items-center justify-center text-[#f5a623] mb-5 group-hover:bg-[#f5a623]/10 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Impact</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">
                We're building a better future by empowering youth to solve real-world problems.
              </p>
              <span className="text-[#f5a623] text-lg transition-transform group-hover:translate-x-2">→</span>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;