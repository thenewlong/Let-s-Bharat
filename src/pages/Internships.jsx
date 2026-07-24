import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Helmet } from "react-helmet-async";

const Internship = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");
  const [sortOption, setSortOption] = useState("NEWEST FIRST");
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  // Currently no internships are being offered
  const internshipsData = [];

  // Filter & Sort Logic (Safe for empty array)
  let filteredData = internshipsData.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "ALL" || item.category === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen pb-16 font-sans">
      <Helmet>
        <title>Paid & Remote Internships | Letsbharat</title>
        <meta name="description" content="Find Paid Internships, Remote Internships, Software Development Internships, AI Internships, UI UX Internships, Startup Internships and Career Opportunities for students." />
        <meta name="keywords" content="Paid Internship, Remote Internship, Software Internship, AI Internship, React Internship, Frontend Internship, Startup Internship, Student Internship" />
      </Helmet>

      <style>{`
        .animate-pop-in { animation: popIn 0.3s forwards; }
        @keyframes popIn { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }
      `}</style>

      {/* CLEAN & PROFESSIONAL EMPTY STATE HERO SECTION (No Banners / No Old Text) */}
      <div className="max-w-[1400px] mx-auto p-4 pt-6">
        <div className="relative w-full bg-white border border-gray-200 rounded-3xl p-8 sm:p-14 text-center flex flex-col items-center justify-center shadow-xl overflow-hidden min-h-[220px] sm:min-h-[280px]">
          
          <div className="absolute top-0 left-0 w-full h-2 bg-yellow-500" />

          <span className="bg-yellow-100 text-yellow-700 text-[10px] sm:text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-3">
            Career Portal
          </span>

          <h1 className="text-xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight max-w-2xl">
            No Internships Available Right Now
          </h1>

          <p className="text-gray-500 text-xs sm:text-sm md:text-base mt-3 max-w-lg leading-relaxed">
            We are currently not offering any active internships. Please check back later for new opportunities and career updates.
          </p>
        </div>
      </div>

      {/* Categories / Tabs */}
      <div className="max-w-[1400px] mx-auto px-4 mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {["ALL", "TECH", "DESIGN", "MARKETING"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === tab 
              ? "bg-yellow-500 text-white shadow-md"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search & Sort Bar */}
      <div className="max-w-[1400px] mx-auto px-4 flex flex-col sm:flex-row gap-3 my-4">
        <input 
          className="flex-grow p-3 rounded-xl border border-gray-200 bg-white shadow-sm text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all" 
          placeholder="Search by title, role or company..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        <select 
          className="p-3 rounded-xl border border-gray-200 bg-white shadow-sm text-sm outline-none font-semibold text-gray-700 focus:border-yellow-500 transition-all" 
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option>NEWEST FIRST</option>
          <option>STIPEND: HIGH TO LOW</option>
        </select>
      </div>

      {/* Internships Grid / Empty Message */}
      <div className="max-w-[1400px] mx-auto px-4 mt-6">
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredData.map((item) => (
              <div 
                key={item.id} 
                className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between cursor-pointer group"
                onClick={() => setSelectedIntern(item)}
              >
                <div>
                  <div className="relative overflow-hidden rounded-xl h-44 mb-3">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                      {item.location}
                    </span>
                  </div>
                  <span className="text-[11px] font-extrabold text-yellow-600 tracking-wider uppercase">{item.company}</span>
                  <h3 className="font-bold text-gray-900 text-base mt-1 line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                  
                  <div className="mt-3 flex items-center justify-between text-xs font-semibold text-gray-700 bg-gray-50 p-2 rounded-lg">
                    <span>Stipend: <strong className="text-yellow-600">{item.stipend}</strong></span>
                    <span>{item.duration}</span>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedIntern(item); }}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg font-bold text-xs transition-all"
                  >
                    View Details
                  </button>
                  <button 
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-bold text-xs transition-all shadow-sm" 
                    onClick={(e) => { e.stopPropagation(); handleApplyAction(item); }}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl py-16 text-center shadow-sm">
            <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold mb-3 border border-yellow-200">ℹ</div>
            <h3 className="text-base font-bold text-gray-800">No Internships Listed</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">There are no active listings available to display at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Internship;