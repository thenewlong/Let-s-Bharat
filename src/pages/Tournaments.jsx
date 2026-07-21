import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 


import { Helmet } from "react-helmet-async";
// 🔐 IMPORT YOUR AUTH CONTEXT HERE (Path apne hisaab se adjust kar lena)
import { useAuth } from '../context/AuthContext'; 

// 🖼️ IMPORT YOUR LOCAL IMAGES HERE (File explorer se apne paths daal do)
 import slide1 from '../assets/images/t1.jpeg';
 import slide2 from '../assets/images/t2.jpeg';
 import slide3 from '../assets/images/t3.jpeg';
 
// cards
 import tourneyImg1 from '../assets/images/tourney00.jpeg'; // Agar cards ki image bhi local chahiye toh
 import tourneyImg2 from '../assets/images/tourney01.jpeg';
 import tourneyImg3 from '../assets/images/tourney3.jpeg';
const Tournaments = () => {
  const navigate = useNavigate();

  // 🛡️ AUTHENTICATION STATE (Tumhare code ke hisaab se)
  // const { user } = useAuth(); // isko uncomment kar lena jab actual AuthContext use karo
   // ⚠️ TEST KE LIYE: Isko null rakha hai taaki Auth page par redirect test kar sako. Login test karna ho toh isko { name: "User" } kar dena.

  // 🎛️ States
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");
  const [sortBy, setSortBy] = useState("NEWEST"); // 👈 Naya state sorting ke liye
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);

  // Trigger initial animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // 🖼️ Banner Images (Local variables ko yaha daalo jab upar import kar lo)
  const bannerSlides = [
    slide1,
    slide2,
    slide3,
  ];

  // Auto Slider Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === bannerSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [bannerSlides.length]);

  // 🎮 Gaming Tournaments Data
  const tournamentData = [
    {
      id: 1,
      title: "FREE FIRE MOBILE TOURNAMENT 2026",
      subtitle: "Squad Battle Royale Tournament",
      image: tourneyImg1,
      status: "FEATURED",
      platform: "MOBILE",
      prizePool: "₹50,000",
      date: "18 - 20 June 2026",
      entryFee: "₹100 / Team",
      teamSize: "4 Players",
      categories: ["ALL", "MOBILE", "BATTLE ROYALE", "SQUAD"],
      link: "https://forms.gle/y8K6joi3HMz5phsx9",
      description: "Join the ultimate Free Fire Max showdown. Gather your squad and battle it out against the top teams in the region for a massive prize pool and glory."
    },
    {
      id: 2,
      title: "BGMI PRO LEAGUE",
      subtitle: "Squad Battle Royale Tournament",
      image: tourneyImg2,
      status: "UPCOMING",
      platform: "MOBILE",
      prizePool: "₹1,00,000",
      date: "25 - 28 May 2026",
      entryFee: "₹150 / Team",
      teamSize: "4 Players",
      categories: ["ALL", "MOBILE", "BATTLE ROYALE", "SQUAD", "UPCOMING"],
      link: "https://forms.gle/bgmi-tournament-link",
      description: "The biggest BGMI tournament is here! Show your tactical skills and gun power. T3, T2 and T1 scrims winners will get direct entry to semi-finals."
    },
    {
      id: 3,
      title: "VALORANT SHOWDOWN",
      subtitle: "5v5 Competitive Tournament",
      image: "tourneyImg3",
      status: "ONGOING",
      platform: "PC",
      prizePool: "₹75,000",
      date: "16 - 18 May 2026",
      entryFee: "₹200 / Team",
      teamSize: "5 Players",
      categories: ["ALL", "PC", "SQUAD", "ONGOING"],
      link: "https://forms.gle/valorant-link",
      description: "Valorant competitive 5v5 custom lobbies. Ranked Diamond and above recommended. Anti-cheat client mandatory for all participants."
    }
  ];

  // 💰 HELPER: Convert string "₹1,00,000" to number 100000 for sorting
  const getPrizeNumber = (prizeStr) => {
    return parseInt(prizeStr.replace(/[^0-9]/g, ''), 10);
  };

  const filterTabs = ["ALL", "MOBILE", "PC", "CONSOLE", "ONGOING", "UPCOMING", "SOLO", "SQUAD", "BATTLE ROYALE"];

  // 🔍 1. Filtering Logic
  let filteredTournaments = tournamentData.filter((tourney) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = tourney.title.toLowerCase().includes(searchLower) || 
                          tourney.subtitle.toLowerCase().includes(searchLower) ||
                          tourney.platform.toLowerCase().includes(searchLower);
    
    const matchesTab = activeTab === "ALL" || tourney.categories.includes(activeTab);
    return matchesSearch && matchesTab;
  });

  // ↕️ 2. Sorting Logic (Prize Pool High to Low)
  if (sortBy === "PRIZE_HIGH_TO_LOW") {
    filteredTournaments.sort((a, b) => getPrizeNumber(b.prizePool) - getPrizeNumber(a.prizePool));
  } else if (sortBy === "NEWEST") {
    // Apne original order ya Date ke hisaab se sort karna ho toh yaha aayega (Currently default order)
    filteredTournaments.sort((a, b) => a.id - b.id);
  }

  // ✨ WORD-BY-WORD 3D ZOOM-OUT ANIMATION
  const render3DWords = (text, delayOffset = 0) => {
    return text.split(" ").map((word, index) => (
      <span
        key={index}
        className={`inline-block transition-all duration-1000 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${
          isVisible ? "opacity-100 scale-100 translate-z-0" : "opacity-0 scale-150 translate-z-[100px]"
        }`}
        style={{ 
          transitionDelay: `${delayOffset + index * 100}ms`, 
          marginRight: "0.25em" 
        }}
      >
        {word}
      </span>
    ));
  };

  // 🛡️ SECURITY GUARD LOGIC FOR REGISTRATION
  const handleApplyClick = (e, link) => {
    e.preventDefault(); 
    
    // Check karega ki user logged in hai ya nahi
    if (user) {
      window.open(link, '_blank'); // Agar login hai toh Google Form/Link khulega
    } else {
      alert("⚠️ Access Denied!\nPlease Sign Up or Log In first to register for this event!");
      navigate('/auth'); // Login nahi hai toh Auth page par bhej dega
    }
  };

  return (
    <div className="w-full bg-[#fafafa] min-h-screen font-sans pb-10">
      

      

<Helmet>
  <title>Free Fire, BGMI & eSports Tournaments | Letsbharat</title>

  <meta
    name="description"
    content="Join Free Fire, BGMI, Valorant, Call of Duty Mobile, Clash Royale and Mobile Legends tournaments with cash prizes on Letsbharat."
  />

  <meta
    name="keywords"
    content="Free Fire Tournament, BGMI Tournament, Valorant Tournament, Call of Duty Mobile Tournament, Mobile Legends Tournament, eSports India, Gaming Tournament"
  />

    <script type="application/ld+json">
{`
{
 "@context":"https://schema.org",
 "@type":"BreadcrumbList",
 "itemListElement":[
   {
     "@type":"ListItem",
     "position":1,
     "name":"Home",
     "item":"https://www.letsbharat.com"
   },
   {
     "@type":"ListItem",
     "position":2,
     "name":"Tournaments",
     "item":"https://www.letsbharat.com/tournaments"
   }
 ]
}
`}
</script>

     
</Helmet>
      {/* 🎨 ANIMATIONS CSS */}
      <style>{`
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>

      {/* ========================================= */}
      {/* 🚀 COMPACT HERO SLIDER SECTION            */}
      {/* ========================================= */}
      <div className="max-w-[1440px] mx-auto p-4 lg:p-6">
        <div className="relative w-full h-[280px] sm:h-[350px] md:h-[400px] rounded-[24px] md:rounded-[30px] overflow-hidden shadow-2xl group perspective-[1000px]">
          
          {/* Slider Images */}
          {bannerSlides.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <img src={slide} alt={`banner-${index}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
            </div>
          ))}

          {/* Slider Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-16">
            <div className={`inline-block mb-2 md:mb-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="bg-[#ffcc00]/20 border border-[#ffcc00]/50 text-[#ffcc00] text-[8px] md:text-xs font-black uppercase tracking-[0.2em] px-3 md:px-4 py-1.5 rounded-full">
                Compete. Win. Dominate.
              </span>
            </div>
            
            {/* 3D Animated Title - ZOOM OUT WORDS */}
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.1] mb-3 md:mb-4 drop-shadow-lg" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
              <div className="block overflow-hidden pb-0.5">{render3DWords("EXPLORE THE BEST", 100)}</div>
              <div className="block overflow-hidden text-[#ffcc00] pb-0.5">
                {render3DWords("GAMING", 400)} <span className="text-white">{render3DWords("TOURNAMENTS", 600)}</span>
              </div>
            </h1>
            
            <p className={`text-gray-300 max-w-sm text-[11px] md:text-sm font-medium mb-5 md:mb-6 transition-all duration-700 delay-[800ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Join the action, compete with the best and win exciting prizes on India's largest eSports platform.
            </p>
            
            <button className={`bg-[#ffcc00] text-black w-max px-6 md:px-8 py-2.5 md:py-3 rounded-full font-extrabold text-[10px] md:text-xs hover:scale-105 hover:shadow-[0_0_20px_rgba(255,204,0,0.4)] transition-all duration-300 delay-[1000ms] ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              EXPLORE TOURNAMENTS →
            </button>
          </div>

          {/* Slider Controls */}
          <div className="absolute bottom-4 md:bottom-6 left-0 right-0 z-30 flex justify-center gap-1.5 md:gap-2">
            {bannerSlides.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-[#ffcc00] w-6 md:w-8' : 'bg-white/50 hover:bg-white'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* 🔍 SEARCH & FILTERS                       */}
      {/* ========================================= */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 mt-4 md:mt-6">
        
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center mb-6 w-full">
          {/* Search Bar */}
          <div className="relative flex-grow w-full md:w-auto">
            <span className="absolute left-4 top-4 text-gray-400"></span>
            <input
              type="text"
              placeholder="Search tournaments by game..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffcc00] text-sm font-medium bg-white text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* ↕️ Sorting Dropdown (Prize Pool Connect) */}
          <div className="w-full md:w-auto">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-auto bg-white border border-gray-200 shadow-sm text-xs font-bold text-gray-700 px-4 py-3.5 rounded-xl outline-none cursor-pointer hover:border-gray-300 transition-colors focus:ring-2 focus:ring-[#ffcc00]"
            >
              <option value="NEWEST">Newest First</option>
              <option value="PRIZE_HIGH_TO_LOW">Prize Pool: High to Low</option>
            </select>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                activeTab === tab 
                  ? "bg-[#ffcc00] text-black shadow-md border border-[#ffcc00]" 
                  : "bg-white text-gray-500 border border-gray-200 hover:border-gray-400 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================= */}
      {/* 🏆 TOURNAMENTS GRID                       */}
      {/* ========================================= */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 mt-2">
        
        {/* Grid Cards */}
        {filteredTournaments.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 font-medium">No tournaments match your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {filteredTournaments.map((tourney) => (
              <div 
                key={tourney.id} 
                className="bg-white rounded-[20px] overflow-hidden border border-gray-200 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group flex flex-col"
              >
                {/* Card Image Banner */}
                <div className="relative h-40 overflow-hidden bg-gray-900">
                  <img src={tourney.image} alt={tourney.title} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-md ${
                      tourney.status === 'FEATURED' ? 'bg-[#ffcc00] text-black' :
                      tourney.status === 'UPCOMING' ? 'bg-emerald-500 text-white' :
                      'bg-purple-600 text-white'
                    }`}>
                      {tourney.status}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 md:p-5 flex-grow flex flex-col">
                  <h3 className="text-base md:text-lg font-black text-gray-900 leading-tight mb-1">{tourney.title}</h3>
                  <p className="text-[11px] md:text-xs text-gray-500 font-medium mb-4">{tourney.subtitle}</p>
                  
                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-[10px] md:text-[11px] mb-4 font-semibold text-gray-800">
                    <div><p className="text-gray-400 font-medium mb-0.5">🏆 Prize Pool</p><p className="text-green-600 font-bold">{tourney.prizePool}</p></div>
                    <div><p className="text-gray-400 font-medium mb-0.5">📅 Date</p><p>{tourney.date}</p></div>
                    <div><p className="text-gray-400 font-medium mb-0.5">🪙 Entry Fee</p><p>{tourney.entryFee}</p></div>
                    <div><p className="text-gray-400 font-medium mb-0.5">👥 Team Size</p><p>{tourney.teamSize}</p></div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 mt-auto pt-2">
                    {/* View Details Opens Modal */}
                    <button 
                      onClick={() => setSelectedTournament(tourney)}
                      className="py-2.5 rounded-xl text-[10px] md:text-xs font-bold text-gray-700 bg-white border-2 border-gray-100 hover:border-gray-300 transition-colors"
                    >
                      VIEW DETAILS
                    </button>
                    
                    {/* Register Uses handleApplyClick Security Guard */}
                    <button 
                      onClick={(e) => handleApplyClick(e, tourney.link)}
                      className="py-2.5 rounded-xl text-[10px] md:text-xs font-black text-black bg-[#ffcc00] hover:bg-yellow-500 hover:shadow-md transition-all active:scale-95"
                    >
                      REGISTER NOW
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========================================= */}
      {/* 🔍 VIEW DETAILS MODAL (Pop-up Box)        */}
      {/* ========================================= */}
      {selectedTournament && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-in relative">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedTournament(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
            >
              ✕
            </button>

            {/* Modal Image */}
            <div className="w-full h-40 md:h-48 relative">
              <img src={selectedTournament.image} alt="modal-img" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="bg-[#ffcc00] text-black text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider">{selectedTournament.platform}</span>
                <h2 className="text-xl md:text-2xl font-black text-white leading-tight mt-1">{selectedTournament.title}</h2>
              </div>
            </div>

            {/* Modal Details */}
            <div className="p-5 md:p-6">
              <p className="text-gray-600 text-xs md:text-sm mb-5 leading-relaxed">{selectedTournament.description}</p>
              
              <div className="bg-gray-50 rounded-2xl p-4 grid grid-cols-2 gap-4 mb-6 border border-gray-100">
                <div><span className="block text-gray-400 text-[10px] font-bold mb-1">PRIZE POOL</span><span className="text-sm font-black text-green-600">{selectedTournament.prizePool}</span></div>
                <div><span className="block text-gray-400 text-[10px] font-bold mb-1">DATE</span><span className="text-sm font-bold text-gray-800">{selectedTournament.date}</span></div>
                <div><span className="block text-gray-400 text-[10px] font-bold mb-1">ENTRY FEE</span><span className="text-sm font-bold text-gray-800">{selectedTournament.entryFee}</span></div>
                <div><span className="block text-gray-400 text-[10px] font-bold mb-1">TEAM SIZE</span><span className="text-sm font-bold text-gray-800">{selectedTournament.teamSize}</span></div>
              </div>

              {/* Secure Register Button Inside Modal too */}
              <button 
                onClick={(e) => {
                  handleApplyClick(e, selectedTournament.link);
                  setSelectedTournament(null); // Close modal on register click
                }}
                className="w-full bg-[#ffcc00] hover:bg-yellow-500 text-black py-3.5 rounded-xl font-black text-xs md:text-sm tracking-wide transition-colors"
              >
                PROCEED TO REGISTER →
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Tournaments;