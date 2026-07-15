import React from 'react';
import introVideo from '../assets/videos/intro2.mp4'; // Apni video ka sahi path check kar lena

const IntroVideo = ({ onVideoEnd }) => {
  return (
    <div className="fixed inset-0 z-[99999] bg-black flex items-center justify-center overflow-hidden w-screen h-screen">
      
      {/* 🎥 Full Screen Intro Video */}
      <video
        src={introVideo}
        autoPlay
        muted // Chrome aur modern browsers bina mute ke video auto-play nahi hone dete
        playsInline
        onEnded={onVideoEnd} // Jaise hi 15 sec ki video khatam hogi, ye function call hoga
        className="w-full h-full object-cover"
      />

      {/* ⚡ Skip Button (User Experience ke liye bohot zaroori hai) */}
      <button
        onClick={onVideoEnd}
        className="absolute bottom-10 right-10 z-[100000] bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 px-6 py-2.5 rounded-full font-bold text-sm tracking-wider uppercase transition-all hover:scale-105 active:scale-95 shadow-lg"
      >
        Skip Intro ➔
      </button>

    </div>
  );
};

export default IntroVideo;