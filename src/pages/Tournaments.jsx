import React, { useState } from 'react';

const Tournaments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All Games");

  // 🎮 Gaming Tournaments Data Layout
  const tournamentData = [
    {
      id: 1,
      title: "BGMI Northeast Ultimate Showdown",
      game: "BGMI",
      prizePool: "₹50,000",
      date: "July 25, 2026",
      time: "06:00 PM IST",
      teamSize: "Squad (4v4)",
      slots: "32/50 Teams",
      status: "REGISTRATION OPEN",
      link: "https://forms.gle/bgmi-tournament-link"
    },
    {
      id: 2,
      title: "Free Fire Max: Clash Squad Championship",
      game: "Free Fire",
      prizePool: "₹30,000",
      date: "August 02, 2026",
      time: "04:00 PM IST",
      teamSize: "Squad (4v4)",
      slots: "12/32 Teams",
      status: "REGISTRATION OPEN",
      link: "https://forms.gle/freefire-link"
    },
    {
      id: 3,
      title: "Mobile Legends: Bang Bang Northeast Cup",
      game: "MLBB",
      prizePool: "₹25,000",
      date: "August 10, 2026",
      time: "07:00 PM IST",
      teamSize: "5v5 Mode",
      slots: "Full",
      status: "SLOTS FULL",
      link: "#"
    },
    {
      id: 4,
      title: "Honor of Kings: Regional Masters",
      game: "Honor of Kings",
      prizePool: "₹40,000",
      date: "August 18, 2026",
      time: "05:30 PM IST",
      teamSize: "5v5 Mode",
      slots: "20/40 Teams",
      status: "REGISTRATION OPEN",
      link: "https://forms.gle/hok-link"
    }
  ];

  // 🔍 Filter & Search Logic
  const filteredTournaments = tournamentData.filter((tourney) => {
    const matchesSearch = tourney.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tourney.game.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "All Games" || tourney.game === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans pb-20">
      
      {/* 🚀 Gaming Banner */}
      <div className="w-full bg-gradient-to-r from-[#090d16] to-[#111827] py-20 px-6 md:px-10 text-white text-center md:text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest bg-purple-500/10 px-3 py-1.5 rounded-full">Esports Hub</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-4 mb-4 tracking-tight">Gaming Tournaments</h1>
          <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
            Compete with top squad players from Northeast, showcase your live skills, and win massive prize pools.
          </p>
        </div>
      </div>

      {/* 🔍 Filter Tabs & Search Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-10 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Game Filters */}
        <div className="flex space-x-2 bg-white p-1.5 rounded-xl shadow-sm border border-gray-200 overflow-x-auto w-full md:w-auto">
          {["All Games", "BGMI", "Free Fire", "MLBB", "Honor of Kings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === tab 
                  ? "bg-purple-600 text-white shadow-md" 
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-96 relative group">
          <span className="absolute left-4 top-3.5 text-gray-400 text-lg">🎮</span>
          <input
            type="text"
            placeholder="Search tournament or game..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm font-medium transition-all"
          />
        </div>
      </div>

      {/* 🏆 Tournament Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {filteredTournaments.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-gray-500 text-lg font-medium">No active tournaments found for this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTournaments.map((tourney) => (
              <div 
                key={tourney.id} 
                className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="bg-purple-100 text-purple-700 text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest">
                      {tourney.game}
                    </span>
                    <span className={`text-xs font-bold ${tourney.status === 'REGISTRATION OPEN' ? 'text-emerald-600' : 'text-red-500'}`}>
                      ● {tourney.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                    {tourney.title}
                  </h3>
                  
                  {/* Tourney Info Meta Box */}
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100 mb-6 text-xs text-gray-600 font-semibold">
                    <div>📅 Date: <span className="text-gray-900">{tourney.date}</span></div>
                    <div>⏰ Time: <span className="text-gray-900">{tourney.time}</span></div>
                    <div>👥 Mode: <span className="text-gray-900">{tourney.teamSize}</span></div>
                    <div>🎟️ Slots: <span className="text-purple-600">{tourney.slots}</span></div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Prize Pool</p>
                    <p className="text-xl font-extrabold text-gray-900">{tourney.prizePool}</p>
                  </div>
                  <a 
                    href={tourney.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all text-center ${
                      tourney.status === 'REGISTRATION OPEN'
                        ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/20 active:scale-95'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Register Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Tournaments;