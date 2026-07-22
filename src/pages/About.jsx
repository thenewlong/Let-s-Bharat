import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#02040a] text-white py-20 px-6 md:px-10 font-sans flex items-center justify-center">
      <div className="max-w-5xl mx-auto text-center space-y-16">
        
        {/* Header Section */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5a623]/10 border border-[#f5a623]/20 text-[#f5a623] text-xs font-semibold">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" /></svg>
            Empowering Ideas. Building Bharat.
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            NOT UPDATE ABOUT US <span className="text-[#f5a623]"></span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            <strong>LetsBharat</strong> was born out of a bold vision: to bridge the gap between young student talent, high-impact hackathons, cutting-edge AI startups, and grand career opportunities across the nation. We are building India's largest next-gen community of builders and founders.
          </p>
        </div>

        {/* Mission, Vision, Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-gray-800/80">
          
          <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-gray-800/60 hover:border-[#f5a623]/40 transition-all duration-300 shadow-xl text-left">
            <div className="w-12 h-12 rounded-xl bg-[#f5a623]/10 flex items-center justify-center text-[#f5a623] mb-6 font-bold text-xl">🚀</div>
            <h3 className="text-2xl font-bold text-white mb-3">Our Mission</h3>
            <p className="text-gray-400 leading-relaxed text-sm">To provide world-class hackathon resources, startup networking, and direct career paths to every aspiring creator in Bharat.</p>
          </div>

          <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-gray-800/60 hover:border-[#f5a623]/40 transition-all duration-300 shadow-xl text-left">
            <div className="w-12 h-12 rounded-xl bg-[#f5a623]/10 flex items-center justify-center text-[#f5a623] mb-6 font-bold text-xl">🌐</div>
            <h3 className="text-2xl font-bold text-white mb-3">Our Vision</h3>
            <p className="text-gray-400 leading-relaxed text-sm">Making India the primary global powerhouse for grassroots tech innovation, AI startups, and student-led entrepreneurial culture by 2030.</p>
          </div>

          <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-gray-800/60 hover:border-[#f5a623]/40 transition-all duration-300 shadow-xl text-left">
            <div className="w-12 h-12 rounded-xl bg-[#f5a623]/10 flex items-center justify-center text-[#f5a623] mb-6 font-bold text-xl">💡</div>
            <h3 className="text-2xl font-bold text-white mb-3">Our Values</h3>
            <p className="text-gray-400 leading-relaxed text-sm">Community first, relentless execution, and building meaningful tech products with absolute purpose and societal impact.</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default About;