import React, { useEffect, useState } from "react";
// 👇 YAHAN APNI VIDEO IMPORT KARO (Path apne folder ke hisaab se set kar lena)
// import bgVideo from '../assets/videos/video1.mp4'; 
import bgVideo from '../assets/videos/in.mp4'; 

const IntroVideo = ({ onVideoEnd }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Total letters 14 hain. Har letter 0.5s lega = ~7 seconds.
    // 8.5 seconds tak animation chalega aur hold karega, phir screen fade out hogi.
    const timer1 = setTimeout(() => {
      setFadeOut(true);
    }, 8700);

    // 9.5 seconds baad Home screen par chala jayega.
    const timer2 = setTimeout(() => {
      if (onVideoEnd) onVideoEnd();
    }, 7500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onVideoEnd]);

  // Text Arrays 
  const leftText = ['L', 'E', 'T', 'S', 'B', 'H', 'A', 'R', 'A', 'T', '.'];
  const rightText = ['c', 'o', 'm'];

  // Let's Bharat Logo Colors (Adjusted for Video Background)
  const getLetterColor = (char, index, isLeft) => {
    if (isLeft) {
      if (index < 4) return "text-white"; // LETS (White for cinematic look)
      if (index >= 4 && index < 10) return "text-[#f5a623]"; // BHARAT (Brand Orange)
      return "text-white"; // Dot . (White)
    }
    return "text-white/80"; // com (Slightly faded white for hierarchy)
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap');

          .font-logo {
            font-family: 'Montserrat', sans-serif;
            font-weight: 900;
          }

          /* 3D Perspective Container */
          .perspective-container {
            perspective: 1200px; /* Thoda aur depth diya hai */
          }

          /* Premium 3D & Glow Effect for Letters */
          .letter-3d {
            display: inline-block;
            opacity: 0;
            transform-style: preserve-3d;
            text-shadow: 
              0px 4px 10px rgba(0, 0, 0, 0.5), /* Drop shadow for depth */
              0px 0px 20px rgba(255, 255, 255, 0.1); /* Subtle premium glow */
          }

          /* BHARAT letter specific glow */
          .text-\\[\\#f5a623\\] {
            text-shadow: 
              0px 4px 10px rgba(0, 0, 0, 0.6), 
              0px 0px 25px rgba(245, 166, 35, 0.3) !important;
          }

          /* Left Side 3D Flip Animation */
          .animate-3d-left {
            animation: flipIn3DLeft 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          }

          /* Right Side 3D Flip Animation */
          .animate-3d-right {
            animation: flipIn3DRight 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          }

          @keyframes flipIn3DLeft {
            0% {
              opacity: 0;
              transform: translateX(-40px) rotateY(-90deg) scale(0.8);
              filter: blur(8px);
            }
            100% {
              opacity: 1;
              transform: translateX(0) rotateY(0deg) scale(1);
              filter: blur(0px);
            }
          }

          @keyframes flipIn3DRight {
            0% {
              opacity: 0;
              transform: translateX(40px) rotateY(90deg) scale(0.8);
              filter: blur(8px);
            }
            100% {
              opacity: 1;
              transform: translateX(0) rotateY(0deg) scale(1);
              filter: blur(0px);
            }
          }
        `}
      </style>

      {/* FULL SCREEN ANIMATION UI W/ VIDEO */}
      <div
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-1000 ease-in-out perspective-container bg-black ${
          fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        
        {/* 🎥 BACKGROUND VIDEO */}
        <video 
          autoPlay 
          muted 
          playsInline 
          loop
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>

        {/* 🌑 DARK OVERLAY (Video ke upar text clear dikhane ke liye) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/90 via-[#070b14]/40 to-[#070b14]/80 z-10 backdrop-blur-[2px]"></div>

        {/* 📝 3D ANIMATED TEXT (Z-index 20 taaki video aur overlay ke upar rahe) */}
        <div className="relative z-20 flex flex-row items-baseline justify-center w-full px-2 font-logo tracking-tight whitespace-nowrap">
          
          {/* LEFT SIDE TEXT: LETSBHARAT. */}
          <div className="flex text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            {leftText.map((char, index) => (
              <span
                key={`left-${index}`}
                className={`letter-3d animate-3d-left ${getLetterColor(char, index, true)}`}
                style={{
                  animationDelay: `${index * 0.3}s`,
                }}
              >
                {char}
              </span>
            ))}
          </div>

          {/* RIGHT SIDE TEXT: com */}
          <div className="flex text-xl sm:text-2xl md:text-3xl lg:text-4xl ml-1 sm:ml-2">
            {rightText.map((char, index) => (
              <span
                key={`right-${index}`}
                className={`letter-3d animate-3d-right ${getLetterColor(char, index, false)}`}
                style={{
                  animationDelay: `${4.0 + index * 0.3}s`,
                }}
              >
                {char}
              </span>
            ))}
          </div>

        </div>

        {/* ⏩ SKIP BUTTON */}
        <button 
          onClick={() => { if(onVideoEnd) onVideoEnd(); }}
          className="relative z-20 absolute bottom-10 px-6 py-2 rounded-full border border-white/20 text-white/70 text-xs sm:text-sm font-medium tracking-widest uppercase hover:bg-white/10 hover:text-white transition-all duration-300 opacity-0 animate-[fadeInUp_1s_ease-out_3s_forwards]"
        >
        Skip →
        </button>
      </div>
    </>
  );
};

export default IntroVideo;