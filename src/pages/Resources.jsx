import React from 'react';

const Resources = () => {
  const categories = [
    { name: "Programming", count: "25+ Resources", icon: "</>" },
    { name: "Web Development", count: "30+ Resources", icon: "🌐" },
    { name: "Data Science & AI", count: "18+ Resources", icon: "📊" },
    { name: "Startup & Business", count: "22+ Resources", icon: "🚀" }
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div className="max-w-lg">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              UPCOMING NEXT MONTHS- 
              Resources to Learn,<br/><span className="text-yellow-600">Build & Grow</span>
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Handpicked resources, tools, roadmaps and guides to help you level up your skills and build amazing things.
            </p>
            
          </div>
          {/* Illustration Placeholder */}
          <div className="hidden md:block w-1/3 h-64 bg-purple-50 rounded-3xl border border-purple-100"></div>
        </div>

        {/* Explore Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <div key={idx} className="border border-gray-200 rounded-2xl p-6 text-center hover:border-purple-500 hover:shadow-md transition-all cursor-pointer">
                <div className="w-14 h-14 mx-auto bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-2xl mb-4">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-gray-900">{cat.name}</h3>
                <p className="text-purple-600 text-sm mt-1">{cat.count}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Resources;