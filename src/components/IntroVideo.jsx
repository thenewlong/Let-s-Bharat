import React, { useRef, useState, useEffect } from 'react';

// 📁 src/assets/ folder se PC aur Mobile ki video files import ho rahi hain
import desktopVideo from '../assets/videos/intropc.mp4';
import mobileVideo from '../assets/videos/intromobile.mp4';

const IntroVideo = ({ onFinish }) => {
  const videoRef = useRef(null);
  const [isVideoBlocked, setIsVideoBlocked] = useState(false);

  useEffect(() => {
    // Browser autoplay policy handle karne ke liye (sound block protection)
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsVideoBlocked(true);
      });
    }
  }, []);

  const handleManualPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsVideoBlocked(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-black flex items-center justify-center overflow-hidden">
      
      {/* 📹 Responsive Video Element */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
        onEnded={onFinish}
      >
        {/* Laptop/PC Screens (768px ya usse badi screens ke liye) */}
        <source src={desktopVideo} type="video/mp4" media="(min-width: 768px)" />
        
        {/* Mobile Screens (767px ya usse chhoti screens ke liye) */}
        <source src={mobileVideo} type="video/mp4" media="(max-width: 767px)" />
      </video>

      {/* 🔊 Browser Sound Policy Protection: Agar Chrome sound autoplay block kare toh ye button dikhega */}
      {isVideoBlocked && (
        <button
          onClick={handleManualPlay}
          className="absolute z-[100001] bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 px-6 py-3 rounded-full font-semibold shadow-2xl transition-all flex items-center gap-2 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          </svg>
          <span>Play Video</span>
        </button>
      )}

      {/* ⏩ International Glassmorphism Skip Button (Top-Right Corner) */}
      <button
        onClick={onFinish}
        className="absolute top-6 right-6 z-[100000] bg-white/15 hover:bg-white/30 backdrop-blur-md text-white px-6 py-2.5 rounded-full text-sm font-semibold tracking-wider transition-all duration-300 flex items-center gap-2 border border-white/20 shadow-2xl cursor-pointer"
      >
        <span>Skip </span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

    </div>
  );
};

export default IntroVideo;