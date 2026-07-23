import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Helmet } from "react-helmet-async";

// 🖼️ IMPORT YOUR LOCAL IMAGES HERE
import slide1 from '../assets/images/t3.jpeg';
import slide2 from '../assets/images/t00.png';
import slide3 from '../assets/images/t1.jpeg';
import slide4 from '../assets/images/t03.png';
import slide5 from '../assets/images/t02.png';
 
// Cards images
import tourneyImg1 from '../assets/images/tourney001.jpeg';
import tourneyImg2 from '../assets/images/tourney002.jpeg';
import tourneyImg3 from '../assets/images/tourney004.jpeg';
import tourneyImg4 from '../assets/images/tourney003.jpeg';

const Tournaments = () => {
  const navigate = useNavigate();

  // 🎛️ States
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");
  const [sortBy, setSortBy] = useState("NEWEST");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  // 🆕 Selected Tournament State for Full Page View (Hackathon style)
  const [selectedTournament, setSelectedTournament] = useState(null);

  // Trigger initial animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // 🖼️ Banner Images
  const bannerSlides = [
    slide1,
    slide2,
    slide3,
    slide4,
    slide5,
  ];

  // Auto Slider Logic (Pauses when detail page is open)
  useEffect(() => {
    if (selectedTournament) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === bannerSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [bannerSlides.length, selectedTournament]);

  // 🎮 Gaming Tournaments Data
  const tournamentData = [
    {
      id: 1,
      title: "FREE FIRE MOBILE TOURNAMENT 2026",
      subtitle: "Custom Game Mode Tournament",
      image: tourneyImg1,
      status: "UPCOMING",
      platform: "MOBILE",
      prizePool: "₹850",
      date: "30 uly - 6 Aug 2026",
      entryFee: "₹5 / Team",
      teamSize: "1/2 Players",
      categories: ["ALL", "MOBILE", "CUSTOM ROOM ", "SOLO/DUO"],
      link: "https://forms.gle/Za9GnkwDk3DEc8U19",
      description:"About the Tournament\n\n" +

  "The FREE FIRE MOBILE TOURNAMENT 2026 is an exciting online esports competition created for players who are ready to showcase their skills, teamwork, and competitive spirit. Whether you're a casual player or an experienced competitor, this tournament provides an opportunity to battle against other players in intense custom room matches and compete for exciting cash prizes.\n\n" +

  "The tournament features both 1V1 and 2V2 game modes, allowing participants to compete individually or with a teammate. Every match is designed to deliver a fair, balanced, and competitive gaming experience where strategy, communication, and accuracy are the keys to victory.\n\n" +

  "Tournament Details\n\n" +

  "📅 Event Duration: 30 July – 6 August 2026\n" +
  "🎮 Game: Free Fire MAX\n" +
  "⚔️ Modes: 1V1 & 2V2 Custom Room\n" +
  "💰 Entry Fee: As Mentioned During Registration\n" +
  "🏆 Prize Pool: ₹500 • ₹200 • ₹100 • ₹50\n" +
  "🎁 Every registered participant will receive a special participation gift.\n\n" +

  "Tournament Rules\n\n" +

  "Character Skills will remain OFF for all matches to ensure fair gameplay. The use of hacks, panels, cheats, scripts, or any unfair advantages is strictly prohibited and will result in immediate disqualification. Players who lose two matches will be eliminated from the tournament. All participants must follow the tournament schedule and maintain good sportsmanship throughout the event.\n\n" +

  "Registration\n\n" +

  "Complete the registration form with accurate details to confirm your participation. Match schedules, room IDs, and tournament updates will be shared with registered players before the event begins. Prepare your squad, compete with confidence, and fight for victory.\n\n" +

  "🔥 BOOYAH! Good luck to all participants!"
    },
    {
      id: 2,
      title: "UPCOMING E-FOOTBALL ESPORT TOURNAMENT",
      subtitle: "Solo Tournament",
      image: tourneyImg2,
      status: "UPCOMING",
      platform: "MOBILE",
      prizePool: "₹20,000",
      date: "Not Comfirm",
      entryFee: "₹120 / Team",
      teamSize: "1 Player",
      categories: ["ALL", "MOBILE", "eFootball", "UPCOMING"],
      link: "https://forms.gle/bgmi-tournament-link",
      description:"About the Tournament\n\n" +

  "The UPCOMING eFootball Esports Tournament is an online competition designed for football gaming enthusiasts who are ready to compete against the best players. Whether you're an experienced eFootball player or looking to prove your skills, this tournament offers an exciting platform to showcase your strategy, precision, and match-winning abilities.\n\n" +

  "Players will compete in competitive head-to-head matches, where every game demands tactical decision-making, quick reactions, and consistency. Only the strongest competitors will advance through each round and battle for the championship title.\n\n" +

  "Tournament Details\n\n" +

  "📅 Tournament Date: Coming Soon\n" +
  "🎮 Game: eFootball\n" +
  "⚽ Mode: 1V1 Online Matches\n" +
  "💰 Entry Fee: To Be Announced\n" +
  "🏆 Exciting Cash Prizes & Rewards\n" +
  "🎁 Every eligible participant will receive an official participation certificate or special reward.\n\n" +

  "Tournament Rules\n\n" +

  "All matches must be played fairly without exploits, cheats, or unauthorized modifications. Participants are expected to follow the official tournament schedule and maintain good sportsmanship throughout the competition. Any violation of the rules may result in immediate disqualification.\n\n" +

  "Registration\n\n" +

  "Complete your registration with accurate information. Match fixtures, tournament brackets, and important announcements will be shared with all registered participants before the event begins.\n\n" +

  "⚽ Build your dream squad, compete with the best, and become the next eFootball Champion!"
    },
    {
      id: 3,
      title: "CODM WC 2026 FALL SPLIT",
      subtitle: "5v5 Competitive Tournament",
      image: tourneyImg3, 
      status: "UPCOMING",
      platform: "PC",
      prizePool: "₹85,000",
      date: " - 8 Aug - 20 Aug 2026",
      entryFee: "₹200 / Team",
      teamSize: "5 Players",
      categories: ["ALL", "PC", "SQUAD", "UPCOMING"],
      link: "https://forms.gle/valorant-link",
      description: "Updates......"
    },
    {
      id: 4,
      title: "KRAFTON INDIA BGMI ESPORT TOURNAMENT",
      subtitle: "2V2 Competitive Tournament",
      image: tourneyImg4, 
      status: "UPCOMING",
      platform: "MOBILE",
      prizePool: "₹75,000",
      date: "Not Comfirm",
      entryFee: "₹100 / Team",
      teamSize: "2 Player",
      categories: ["ALL", "MOBLIE", "DUO", "ONGOING"],
      link: "https://forms.gle/valorant-link",
      description: " Update...."
    },
  ];

  // 💰 HELPER: Convert string "₹1,00,000" to number for sorting
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

  // ↕️ 2. Sorting Logic
  if (sortBy === "PRIZE_HIGH_TO_LOW") {
    filteredTournaments.sort((a, b) => getPrizeNumber(b.prizePool) - getPrizeNumber(a.prizePool));
  } else if (sortBy === "NEWEST") {
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

  // 🔗 DIRECT REGISTRATION LINK HANDLER (No Login/Signup Required)
  const handleApplyClick = (e, link) => {
    e.stopPropagation(); 
    window.open(link, '_blank'); 
  };

  // 👁️ View Details Handler (Scrolls to top smoothly like Hackathon page)
  const handleViewDetails = (tourney) => {
    setSelectedTournament(tourney);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedTournament(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-[#fafafa] min-h-screen font-sans pb-10">
      
      <Helmet>
        <title>{selectedTournament ? `${selectedTournament.title} | Letsbharat` : 'Free Fire, BGMI & eSports Tournaments | Letsbharat'}</title>
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
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* ========================================================= */}
      {/* 🔴 FULL PAGE DETAIL VIEW (Hackathon Style)                */}
      {/* ========================================================= */}
      {selectedTournament ? (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 animate-fade-in pb-20">
          
          {/* Back Button */}
          <button 
            onClick={handleBackToList}
            className="flex items-center gap-2 text-gray-500 hover:text-black font-bold mb-6 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            BACK TO TOURNAMENTS
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Image, Title & Description */}
            <div className="lg:col-span-2">
              <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] rounded-3xl overflow-hidden shadow-lg mb-8 bg-gray-100">
                <img src={selectedTournament.image} alt={selectedTournament.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-[#ffcc00] text-black text-xs font-black px-3 py-1.5 rounded-lg uppercase tracking-wide shadow-md">
                  {selectedTournament.status}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-100 text-gray-600 border border-gray-200 text-[11px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider">
                  {selectedTournament.platform}
                </span>
                <span className="bg-gray-100 text-gray-600 border border-gray-200 text-[11px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider">
                  {selectedTournament.teamSize}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
                {selectedTournament.title}
              </h1>

              <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-[#ffcc00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  ABOUT TOURNAMENT
                </h3>
                <p className="text-gray-600 text-[15px] md:text-[17px] font-medium leading-relaxed whitespace-pre-line">
                  {selectedTournament.description}
                </p>
              </div>
            </div>

            {/* Right Column: Sticky Info Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-xl">
                <h3 className="text-lg font-black text-gray-900 mb-6 border-b border-gray-100 pb-4">KEY DETAILS</h3>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🏆</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">Prize Pool</p>
                      <p className="text-xl font-black text-green-600">{selectedTournament.prizePool}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">📅</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">Date</p>
                      <p className="text-base font-bold text-gray-900">{selectedTournament.date}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🪙</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">Entry Fee</p>
                      <p className="text-base font-bold text-gray-900">{selectedTournament.entryFee}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">👥</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">Team Size</p>
                      <p className="text-base font-bold text-gray-900">{selectedTournament.teamSize}</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={(e) => handleApplyClick(e, selectedTournament.link)}
                  className="w-full bg-[#ffcc00] text-black py-4 rounded-xl font-black text-sm hover:scale-[1.02] hover:shadow-xl transition-all duration-300 active:scale-95"
                >
                  REGISTER NOW
                </button>
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* ========================================================= */
        /* 🔵 NORMAL LIST VIEW                                       */
        /* ========================================================= */
        <>
          {/* ========================================= */}
          {/* 🚀 COMPACT HERO SLIDER SECTION            */}
          {/* ========================================= */}
          <div className="max-w-[1440px] mx-auto p-4 lg:p-6">
            <div className="relative w-full h-[240px] sm:h-[320px] md:h-[400px] rounded-[24px] md:rounded-[30px] overflow-hidden shadow-2xl group perspective-[1000px]">
              
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

              {/* Slider Content - 📱 Font size fixed for mobile phones */}
              <div className="absolute inset-0 z-20 flex flex-col justify-center px-5 sm:px-8 md:px-16">
                <h1 className="text-sm sm:text-2xl md:text-5xl font-black text-white tracking-tight leading-[1.2] mb-2 md:mb-4 drop-shadow-lg" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
                  <div className="block overflow-hidden pb-0.5">{render3DWords("EXPLORE THE BEST", 100)}</div>
                  <div className="block overflow-hidden text-[#ffcc00] pb-0.5">
                    {render3DWords("GAMING", 400)} <span className="text-white">{render3DWords("TOURNAMENTS", 600)}</span>
                  </div>
                </h1>
                
                <p className={`text-gray-300 max-w-xs sm:max-w-sm text-[10px] sm:text-xs md:text-sm font-medium mb-3 md:mb-6 transition-all duration-700 delay-[800ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  Join the action, compete with the best and win exciting prizes on India's largest eSports platform.
                </p>
                
                <button className={`bg-[#ffcc00] text-black w-max px-4 sm:px-6 md:px-8 py-2 md:py-3 rounded-full font-extrabold text-[9px] sm:text-[11px] md:text-xs hover:scale-105 hover:shadow-[0_0_20px_rgba(255,204,0,0.4)] transition-all duration-300 delay-[1000ms] ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                  EXPLORE TOURNAMENTS →
                </button>
              </div>

              {/* Slider Controls */}
              <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-0 right-0 z-30 flex justify-center gap-1.5 md:gap-2">
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
              <div className="relative flex-grow w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Search tournaments by game..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-4 py-3.5 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffcc00] text-sm font-medium bg-white text-gray-900 placeholder-gray-400"
                />
              </div>

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
                    {/* 🖼️ Card Image Banner with 4:3 Aspect Ratio for clean display */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-900">
                      <img src={tourney.image} alt={tourney.title} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" />
                      
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
                      
                      <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-[10px] md:text-[11px] mb-4 font-semibold text-gray-800">
                        <div><p className="text-gray-400 font-medium mb-0.5">🏆 Prize Pool</p><p className="text-green-600 font-bold">{tourney.prizePool}</p></div>
                        <div><p className="text-gray-400 font-medium mb-0.5">📅 Date</p><p>{tourney.date}</p></div>
                        <div><p className="text-gray-400 font-medium mb-0.5">🪙 Entry Fee</p><p>{tourney.entryFee}</p></div>
                        <div><p className="text-gray-400 font-medium mb-0.5">👥 Team Size</p><p>{tourney.teamSize}</p></div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2 mt-auto pt-2">
                        {/* View Details Opens Full Page View */}
                        <button 
                          onClick={() => handleViewDetails(tourney)}
                          className="py-2.5 rounded-xl text-[10px] md:text-xs font-bold text-gray-700 bg-white border-2 border-gray-100 hover:border-gray-300 transition-colors"
                        >
                          VIEW DETAILS
                        </button>
                        
                        {/* Register Directly Opens Google Form / External Link */}
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
        </>
      )}

    </div>
  );
};

export default Tournaments;