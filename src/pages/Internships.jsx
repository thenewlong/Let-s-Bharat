import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Import Assets
import inter1 from '../assets/images/inter1.png';
import inter2 from '../assets/images/inter2.png';
import inter3 from '../assets/images/inter3.png';
import intern1 from '../assets/images/intern1.jpeg';
import intern2 from '../assets/images/intern2.jpeg';
import intern3 from '../assets/images/intern3.jpeg';
import intern4 from '../assets/images/intern4.jpeg';

const Internship = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");
  const [sortOption, setSortOption] = useState("NEWEST FIRST");
  const [selectedIntern, setSelectedIntern] = useState(null);

  const banners = [inter1, inter2, inter3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const handleApplyClick = (e, link) => {
    e.stopPropagation();
    if (user) {
      window.open(link, '_blank');
    } else {
      alert("Please Sign Up or Log In first to apply!");
      navigate('/auth');
    }
  };

  const internshipsData = [
    { id: 1, title: "Frontend Developer", company: "TechNexus", description: "Work on React & UI.", stipend: "₹10,000", duration: "3 Months", location: "Remote", status: "HIRING", category: "TECH", addedOn: "2026-07-01", image: intern1, link: "#" },
    { id: 2, title: "UI/UX Designer", company: "Creative Studio", description: "Design web interfaces.", stipend: "₹12,000", duration: "6 Months", location: "Agartala", status: "URGENT", category: "DESIGN", addedOn: "2026-07-15", image: intern2, link: "#" },
  ];

  let filteredData = internshipsData.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "ALL" || item.category === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen pb-10">
      <style>{`
        @keyframes zoomIn3D { 0% { opacity: 0; transform: scale(0.3) translateZ(-150px); } 100% { opacity: 1; transform: scale(1) translateZ(0); } }
        .animate-text-3d { animation: zoomIn3D 0.8s forwards; }
        .animate-pop-in { animation: popIn 0.3s forwards; }
        @keyframes popIn { 0% { opacity: 0; transform: scale(0.9); } 100% { opacity: 1; transform: scale(1); } }
      `}</style>

      {/* Hero Section */}
      <div className="max-w-[1400px] mx-auto p-4 pt-6">
        <div className="relative w-full h-[400px] rounded-3xl overflow-hidden bg-gray-900 shadow-xl">
          {banners.map((img, i) => (
            <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === currentSlide ? "opacity-60" : "opacity-0"}`} style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          ))}
          <div className="absolute inset-0 flex flex-col justify-center px-10">
            <h1 className="text-5xl font-black text-white animate-text-3d">NOT AVAILABLE UPDATES ALL INTERNSHIPS FIND THE RIGHT INTERNSHIP</h1>
            <p className="text-gray-300 mt-4 max-w-lg">Explore verified internships and kickstart your career.</p>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="max-w-[1400px] mx-auto px-4 flex gap-4 my-6">
        <input className="flex-grow p-3 rounded-xl border" placeholder="Search internships..." onChange={(e) => setSearchQuery(e.target.value)} />
        <select className="p-3 rounded-xl border" onChange={(e) => setSortOption(e.target.value)}>
          <option>NEWEST FIRST</option>
          <option>STIPEND: HIGH TO LOW</option>
        </select>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        {filteredData.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-2xl border shadow-sm hover:shadow-lg transition-all cursor-pointer" onClick={() => setSelectedIntern(item)}>
            <img src={item.image} className="h-40 w-full object-cover rounded-xl" />
            <h3 className="font-bold mt-3">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.company}</p>
            <button className="w-full mt-4 bg-[#6366f1] text-white py-2 rounded-lg font-bold" onClick={(e) => handleApplyClick(e, item.link)}>APPLY NOW</button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedIntern && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setSelectedIntern(null)}>
          <div className="bg-white p-6 rounded-3xl max-w-sm w-full animate-pop-in" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-black">{selectedIntern.title}</h2>
            <p className="text-gray-500">{selectedIntern.company}</p>
            <div className="my-4 border-t pt-4">
              <p><strong>Stipend:</strong> {selectedIntern.stipend}</p>
              <p><strong>Duration:</strong> {selectedIntern.duration}</p>
            </div>
            <button className="w-full bg-[#6366f1] text-white py-3 rounded-xl font-bold" onClick={(e) => handleApplyClick(e, selectedIntern.link)}>PROCEED TO APPLY</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Internship;