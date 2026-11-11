import React, { useState, useEffect } from 'react';

const GameAdModal = () => {
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    let currentTimer;

    // Timings in milliseconds (10s, 30s, 2m, 10m, 45m, 1hr)
    const delays = [
      7000,     // 1st Ad: 10 seconds
      30000,     // 2nd Ad: 30 seconds after 1st
      120000,    // 3rd Ad: 2 minutes after 2nd
      600000,    // 4th Ad: 10 minutes after 3rd
      2700000,   // 5th Ad: 45 minutes after 4th
      3600000    // 6th+ Ads: 1 hour subsequently
    ];

    // LocalStorage se track karo ki user abhi kis step par hai taaki page refresh ya close hone par timer reset na ho
    const getSavedStep = () => {
      const saved = localStorage.getItem('letsBharatAdStep');
      return saved ? parseInt(saved, 10) : 0;
    };

    let step = getSavedStep();

    const scheduleNextAd = () => {
      // Agar array khatam ho jaye toh last wala (1 hour) repeat hota rahega
      const delay = delays[step] || 3600000;

      currentTimer = setTimeout(() => {
        setShowAd(true);
        
        // Next step save karo localStorage mein
        if (step < delays.length - 1) {
          step++;
        }
        localStorage.setItem('letsBharatAdStep', step.toString());
      }, delay);
    };

    scheduleNextAd();

    // Cleanup function
    return () => {
      clearTimeout(currentTimer);
    };
  }, []); // Dependency array empty rakhi hai taaki baar-baar timer reset na ho

  if (!showAd) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in font-sans">
      
      {/* Neo-Brutalist Modal Box */}
      <div className="relative w-full max-w-md bg-[#FFFDF9] border-4 border-black rounded-none p-6 sm:p-8 shadow-[8px_8px_0px_0px_#CCFF00] text-black transform transition-all scale-100 my-auto">
        
        {/* Retro Close Button */}
        <button
          onClick={() => setShowAd(false)}
          className="absolute -top-3 -right-3 bg-[#FF007A] text-white hover:bg-black w-10 h-10 border-4 border-black flex items-center justify-center font-black text-base shadow-[4px_4px_0px_0px_#000] transition-transform active:translate-x-1 active:translate-y-1 z-10"
        >
          ✕
        </button>

        {/* Neo-Brutalist Arcade Badge */}
        <div className="inline-block bg-[#CCFF00] text-black border-2 border-black text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-1 mb-4 shadow-[3px_3px_0px_0px_#000] transform -rotate-1">
            LetsBharat Ultra-Arcade
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-none mb-3 text-black">
          Take a Break & Play! 
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm font-bold text-gray-800 mb-6 leading-relaxed bg-gray-100 border-2 border-black p-3 shadow-[3px_3px_0px_0px_#000]">
          Explore the official Letsbharat interactive mini-game arena. Test your skills, challenge friends, and climb the leaderboard!
        </p>

        {/* Action Buttons (Neo-Brutalist Style matching Arcade) */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a
            href="https://letsbharat-arcade.vercel.app/" 
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setShowAd(false)}
            className="w-full sm:flex-1 bg-[#CCFF00] hover:bg-[#b8e600] text-black text-center font-black py-3 px-4 border-4 border-black text-xs sm:text-sm uppercase tracking-wider shadow-[4px_4px_0px_0px_#000] active:translate-x-1 active:translate-y-1 transition-all"
          >
            Play Now 
          </a>
          <button
            onClick={() => setShowAd(false)}
            className="w-full sm:w-auto bg-[#00E5FF] hover:bg-[#00ccff] text-black font-black py-3 px-5 border-4 border-black text-xs sm:text-sm uppercase tracking-wider shadow-[4px_4px_0px_0px_#000] active:translate-x-1 active:translate-y-1 transition-all"
          >
            Later
          </button>
        </div>

      </div>
    </div>
  );
};

export default GameAdModal;