import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white py-16 px-6 md:px-10">
      <div className="max-w-5xl mx-auto text-center space-y-12">
        
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Empowering the <span className="text-[#a855f7]">Northeast</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Let's Sister was born out of a simple vision: to bridge the gap between talent and opportunities in Northeast India. We are building the region's largest community of developers, creators, and founders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-gray-800">
          <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-3">Our Mission</h3>
            <p className="text-gray-400">To provide world-class resources, networking, and opportunities to every student in the Northeast.</p>
          </div>
          <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-3">Our Vision</h3>
            <p className="text-gray-400">Making Northeast India a primary hub for tech innovation and startup culture by 2030.</p>
          </div>
          <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-3">Our Values</h3>
            <p className="text-gray-400">Community first, continuous learning, and building with purpose and impact.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;