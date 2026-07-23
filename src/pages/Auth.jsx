import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { signInWithGoogle, login, signup, user } = useAuth();
  const navigate = useNavigate();

  // Form Field States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Premium platform automatic user checking
  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  // Carousel Slides matching the provided image concept
  const slides = [
    {
      title: "AI Startups",
      desc: "Discover innovative AI startups shaping India.",
      icon: (
        <svg className="w-5 h-5 text-[#f5a623]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Hackathons",
      desc: "Compete. Build. Win. Solve real-world problems.",
      icon: (
        <svg className="w-5 h-5 text-[#f5a623]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      title: "Internships",
      desc: "Kickstart your career with top opportunities.",
      icon: (
        <svg className="w-5 h-5 text-[#f5a623]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  // Auto-slide logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      await signInWithGoogle();
      navigate('/profile'); 
    } catch (err) {
      setError('Google Sign-In failed.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(email, password);
        navigate('/profile');
      } else {
        await signup(fullName, email, password);
        navigate('/profile');
      }
    } catch (err) {
      setError(err.message || 'Authentication system error.');
    }
  };

  // Fixed Spacing for Mobile Responsiveness
  const headline = "Learn Connect   Grow Won!";
  const titleLetters = headline.split("");

  return (
    <div className="w-full min-h-screen bg-[#02040a] flex items-center justify-center p-4 md:p-8 font-sans overflow-hidden perspective-container">
      
      {/* 🌟 CSS FOR 3D ANIMATION & STYLING */}
      <style>{`
        .perspective-container {
          perspective: 1500px;
        }
        
        /* Premium Card 3D Entrance */
        .card-3d-entrance {
          animation: card3D 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          transform-style: preserve-3d;
        }

        @keyframes card3D {
          0% { 
            opacity: 0; 
            transform: rotateX(15deg) rotateY(-15deg) scale(0.9) translateZ(-100px); 
            box-shadow: 0 0 0 rgba(0,0,0,0);
          }
          100% { 
            opacity: 1; 
            transform: rotateX(0deg) rotateY(0deg) scale(1) translateZ(0); 
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
          }
        }

        .letter-3d-fast {
          display: inline-block;
          opacity: 0;
          transform-style: preserve-3d;
          animation: popIn3DFast 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          text-shadow: 0 4px 6px rgba(0,0,0,0.3);
        }

        @keyframes popIn3DFast {
          0% {
            opacity: 0;
            transform: scale(0.5) rotateX(-90deg) translateY(20px) translateZ(-20px);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotateX(0deg) translateY(0) translateZ(0);
            filter: blur(0px);
          }
        }

        .slide-up-fade {
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 50px transparent inset;
          -webkit-text-fill-color: #1f2937;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>

      {/* 🚀 MAIN WRAPPER (Compact & 3D) */}
      <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto md:min-h-[550px] border border-gray-800/50 bg-[#0a0a0a] card-3d-entrance">
        
        {/* ================= LEFT SIDE (DARK THEME + CAROUSEL) ================= */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between relative overflow-hidden">
          
          {/* 3D Animated Headline */}
          <div className="z-10 mt-4 md:mt-8 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] sm:text-xs font-semibold mb-4">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" /></svg>
              Empowering Ideas. Building Bharat.
            </div>
            
            {/* Fixed Phone typography (text-3xl for mobile) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight flex flex-wrap gap-[2px]">
              {titleLetters.map((char, index) => (
                <span
                  key={index}
                  className={`letter-3d-fast ${
                    index >= 21 ? "text-[#f5a623]" : "text-white"
                  }`}
                  style={{
                    animationDelay: `${index * 0.03}s`,
                    marginRight: char === " " ? "0.3em" : "0" // Proper space sizing
                  }}
                >
                  {char}
                </span>
              ))}
            </h1>
            <p className="text-gray-400 mt-4 text-xs sm:text-sm max-w-sm leading-relaxed slide-up-fade" style={{animationDelay: "0.8s"}}>
              India's most vibrant platform for AI startups, hackathons, internships, and startup communities.
            </p>
          </div>

          {/* Premium Glassmorphism Carousel (Compact height) */}
          <div className="relative h-32 md:h-36 z-10 slide-up-fade" style={{animationDelay: "1s"}}>
            <div className="flex transition-transform duration-700 ease-in-out h-full" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {slides.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0 px-1 h-full">
                  <div className={`h-full p-4 md:p-5 rounded-2xl border transition-all duration-500 flex flex-col justify-center ${
                    index === currentSlide 
                      ? "bg-gray-800/40 border-gray-600/50 scale-100 opacity-100" 
                      : "bg-gray-900/20 border-gray-800/30 scale-95 opacity-50"
                  }`}>
                    <div className="mb-2">{slide.icon}</div>
                    <h3 className="text-white font-semibold text-sm md:text-base mb-1">{slide.title}</h3>
                    <p className="text-gray-400 text-xs line-clamp-2">{slide.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Carousel Dots */}
            <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 flex gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === currentSlide ? "w-5 bg-[#f5a623]" : "w-1.5 bg-gray-700"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#f5a623]/5 to-transparent pointer-events-none rounded-bl-3xl"></div>
        </div>

        {/* ================= RIGHT SIDE (SKY-YELLOW FORM) ================= */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center relative" 
             style={{ background: "linear-gradient(135deg, #eeeeee 0%, #bcc59d 40%, #dcc82e 100%)" }}>
          
          {/* Sleeker max-w-sm for form compactness */}
          <div className="max-w-sm w-full mx-auto bg-white/60 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-xl border border-white/50 slide-up-fade" style={{animationDelay: "0.4s"}}>
            
            {/* Custom Tab Switcher */}
            <div className="flex relative border-b border-gray-300 mb-6">
              <button
                onClick={() => { setIsLogin(true); setError(''); }}
                className={`flex-1 pb-3 text-xs sm:text-sm font-bold transition-colors ${
                  isLogin ? "text-[#f5a623] border-b-2 border-[#f5a623]" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => { setIsLogin(false); setError(''); }}
                className={`flex-1 pb-3 text-xs sm:text-sm font-bold transition-colors ${
                  !isLogin ? "text-[#f5a623] border-b-2 border-[#f5a623]" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Create Account
              </button>
            </div>

            {error && (
              <div className="mb-4 p-2.5 bg-red-100 border border-red-300 rounded-lg text-red-600 text-xs font-medium text-center">
                {error}
              </div>
            )}

            {/* Reduced space-y-3 for compactness */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {!isLogin && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full bg-white/80 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f5a623] transition-all font-medium shadow-sm"
                  />
                </div>
              )}

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full bg-white/80 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f5a623] transition-all font-medium shadow-sm"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-white/80 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f5a623] transition-all font-medium shadow-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#f5a623] hover:bg-[#e0961b] text-white py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-[0_4px_14px_0_rgba(245,166,35,0.39)] active:scale-[0.98] mt-4"
              >
                {isLogin ? 'Login' : 'Create Account'}
              </button>
            </form>

            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-3 text-gray-400 text-[10px] font-bold uppercase tracking-wider">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.327-3.204C18.416 1.872 15.626.985 12.24.985A10.985 10.985 0 0 0 1.255 11.97a10.985 10.985 0 0 0 10.985 10.985c5.73 0 9.535-3.996 9.535-9.62c0-.65-.07-1.14-.155-1.636l-9.38-.415Z"/>
              </svg>
              Continue with Google
            </button>

            <p className="text-center text-xs sm:text-sm text-gray-600 mt-5 font-medium">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                className="text-[#f5a623] font-bold hover:underline ml-1"
              >
                {isLogin ? 'Sign up' : 'Login'}
              </button>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Auth;