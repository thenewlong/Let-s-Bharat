import React from 'react';

const Startups = () => {
  const hubs = [
    { name: "CodeZone", desc: "Programming, Web & App Development", icon: "💻", color: "bg-blue-100 text-blue-600" },
    { name: "BizBrain", desc: "Startups, Business Ideas & Entrepreneurship", icon: "💡", color: "bg-yellow-100 text-yellow-600" },
    { name: "Marketing Hub", desc: "Digital Marketing, Growth & Branding", icon: "📈", color: "bg-green-100 text-green-600" },
    { name: "Creative Hub", desc: "UI/UX Design, Content & Creative Skills", icon: "🎨", color: "bg-pink-100 text-pink-600" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Explore Top Startups</h1>
          <p className="text-gray-600 text-lg">Find your passion, connect with like-minded people, and start building the future together.</p>
        </div>

        {/* Startups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {hubs.map((hub, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 flex items-start gap-6 cursor-pointer group">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl shrink-0 ${hub.color}`}>
                {hub.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">{hub.name}</h3>
                <p className="text-gray-600 mb-4">{hub.desc}</p>
                <span className="text-purple-600 font-semibold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore Hub →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Startups;