import React, { useRef } from 'react';

// 📁 src/assets/videos/ folder se PC aur Mobile ki video files
import desktopVideo from '../assets/videos/intropc.mp4';
import mobileVideo from '../assets/videos/intromobile.mp4';

const IntroVideo = ({ onFinish }) => {
  const videoRef = useRef(null);

  return (
    <div className="fixed inset-0 z-[99999] bg-black flex items-center justify-center overflow-hidden">
      
      {/* 📹 Responsive Video Element (AutoPlay with Sound) */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
        onEnded={onFinish}
      >
        {/* Laptop / PC Screens */}
        <source src={desktopVideo} type="video/mp4" media="(min-width: 768px)" />
        
        {/* Mobile Screens */}
        <source src={mobileVideo} type="video/mp4" media="(max-width: 767px)" />
      </video>

      {/* ⏩ Skip Icon Button (Strictly Icon Only | Vertically Centered on Right Side) */}
      <button
        onClick={onFinish}
        aria-label="Skip Intro"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[100000] p-3 md:p-4 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white border border-white/30 shadow-2xl transition-all duration-300 cursor-pointer flex items-center justify-center hover:scale-110 active:scale-95"
      >
        {/* Fast-Forward / Skip Icon */}
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      </button>

    </div>
  );
};

export default IntroVideo;