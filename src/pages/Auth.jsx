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
  
  // NAYA: Loading state taaki security check ke time button disable ho sake
  const [isLoading, setIsLoading] = useState(false); 

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
        <svg className="w-6 h-6 text-[#f5a623]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Hackathons",
      desc: "Compete. Build. Win. Solve real-world problems.",
      icon: (
        <svg className="w-6 h-6 text-[#f5a623]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      title: "Internships",
      desc: "Kickstart your career with top opportunities.",
      icon: (
        <svg className="w-6 h-6 text-[#f5a623]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Tournaments",
      desc: "Compete in the ultimate esport Tournaments.",
      icon: (
        <svg className="w-6 h-6 text-[#f5a623]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

  // NAYA: reCAPTCHA ke sath handleSubmit updated
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); // Loading shuru

    // 1. Check karo window aur grecaptcha object available hai
    if (typeof window !== 'undefined' && window.grecaptcha) {
      window.grecaptcha.enterprise.ready(async () => {
        try {
          // 2. Apni key .env se nikal lo
          const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

          
          if (!siteKey) {
            throw new Error("Site key missing in .env file");
          }

          // 3. Token generate karo
          const token = await window.grecaptcha.enterprise.execute(siteKey, {
            action: isLogin ? 'login' : 'signup'
          });

          console.log("✅ reCAPTCHA Token Generated:", token);

          // 4. Apna original Firebase logic yaha aayega
          if (isLogin) {
            await login(email, password);
            navigate('/profile');
          } else {
            await signup(fullName, email, password);
            navigate('/profile');
          }
        } catch (err) {
          console.error("❌ Auth/reCAPTCHA Error:", err);
          setError(err.message || 'Authentication system error.');
        } finally {
          setIsLoading(false); // Loading khatam chahe pass ho ya fail
        }
      });
    } else {
      setError("Security check (reCAPTCHA) failed to load. Please check your connection.");
      setIsLoading(false);
    }
  };

  // Text for 3D Animation
  const headline = "Learn ConnectGrow Won!";
  const titleLetters = headline.split("");

  return (
    <div className="w-full min-h-screen bg-[#02040a] flex items-center justify-center p-4 md:p-10 font-sans overflow-hidden">
      
      {/* 🌟 CSS FOR 3D ANIMATION & STYLING */}
      <style>{`
        .perspective-container {
          perspective: 1200px;
        }
        
        .letter-3d-fast {
          display: inline-block;
          opacity: 0;
          transform-style: preserve-3d;
          animation: popIn3DFast 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @keyframes popIn3DFast {
          0% {
            opacity: 0;
            transform: scale(0.5) rotateX(-60deg) translateY(40px);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotateX(0deg) translateY(0);
            filter: blur(0px);
          }
        }

        /* Form entrance animation */
        .slide-up-fade {
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Custom Input autofill reset */
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 50px transparent inset;
          -webkit-text-fill-color: #1f2937;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>

      {/* 🚀 MAIN WRAPPER */}
      <div className="w-full max-w-6xl rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[700px] border border-gray-800/50 bg-[#0a0a0a]">
        
        {/* ================= LEFT SIDE (DARK THEME + CAROUSEL) ================= */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-between relative perspective-container">
          
         
          {/* 3D Animated Headline */}
          <div className="z-10 mt-12 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-semibold mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" /></svg>
              Empowering Ideas. Building Bharat.
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight flex flex-wrap gap-[4px]">
              {titleLetters.map((char, index) => (
                <span
                  key={index}
                  className={`letter-3d-fast ${
                    index >= 15 ? "text-[#f5a623]" : "text-white"
                  }`}
                  style={{
                    animationDelay: `${index * 0.04}s`, // Very fast cascading effect
                    marginRight: char === " " ? "0.25em" : "0" // Preserve spaces
                  }}
                >
                  {char}
                </span>
              ))}
            </h1>
            <p className="text-gray-400 mt-6 text-sm md:text-base max-w-sm leading-relaxed slide-up-fade" style={{animationDelay: "1s"}}>
              India's most vibrant platform for AI startups, hackathons, internships, and startup communities.
            </p>
          </div>

          {/* Premium Glassmorphism Carousel (Matched with Image) */}
          <div className="relative h-44 z-10 slide-up-fade" style={{animationDelay: "1.2s"}}>
            <div className="flex transition-transform duration-700 ease-in-out h-full" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {slides.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2 h-full">
                  <div className={`h-full p-6 rounded-2xl border transition-all duration-500 flex flex-col justify-center ${
                    index === currentSlide 
                      ? "bg-gray-800/40 border-gray-600/50 scale-100 opacity-100" 
                      : "bg-gray-900/20 border-gray-800/30 scale-95 opacity-50"
                  }`}>
                    <div className="mb-4">{slide.icon}</div>
                    <h3 className="text-white font-semibold text-lg mb-1">{slide.title}</h3>
                    <p className="text-gray-400 text-sm">{slide.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Carousel Dots */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === currentSlide ? "w-6 bg-[#f5a623]" : "w-2 bg-gray-700"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Background Glow Effect */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#f5a623]/10 to-transparent pointer-events-none rounded-b-3xl"></div>
        </div>

        {/* ================= RIGHT SIDE (SKY-YELLOW FORM) ================= */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative slide-up-fade" 
             style={{ 
               background: "linear-gradient(135deg, #eeeeee 0%, #bcc59d 40%, #dcc82e 100%)", 
             }}>
          
          <div className="max-w-md w-full mx-auto bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl border border-white/50">
            
            {/* Custom Tab Switcher */}
            <div className="flex relative border-b border-gray-300 mb-8">
              <button
                onClick={() => { setIsLogin(true); setError(''); }}
                className={`flex-1 pb-4 text-sm font-bold transition-colors ${
                  isLogin ? "text-[#f5a623] border-b-2 border-[#f5a623]" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => { setIsLogin(false); setError(''); }}
                className={`flex-1 pb-4 text-sm font-bold transition-colors ${
                  !isLogin ? "text-[#f5a623] border-b-2 border-[#f5a623]" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Create Account
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-xl text-red-600 text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name (Only for Create Account) */}
              {!isLogin && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full bg-white/80 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition-all font-medium shadow-sm"
                  />
                </div>
              )}

              {/* Email */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full bg-white/80 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition-all font-medium shadow-sm"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-white/80 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f5a623] focus:border-transparent transition-all font-medium shadow-sm"
                />
              </div>

              {/* NAYA: Submit Button disabled logic during loading */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-[#f5a623] text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-[0_8px_20px_-6px_rgba(245,166,35,0.6)] mt-6 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#e0961b] active:scale-[0.98]'
                }`}
              >
                {isLoading ? 'Verifying Security...' : (isLogin ? 'Login' : 'Create Account')}
              </button>
            </form>

            <div className="relative flex py-6 items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-xs font-semibold uppercase tracking-wider">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Google Authentication Button */}
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-3 active:scale-[0.98] shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.327-3.204C18.416 1.872 15.626.985 12.24.985A10.985 10.985 0 0 0 1.255 11.97a10.985 10.985 0 0 0 10.985 10.985c5.73 0 9.535-3.996 9.535-9.62c0-.65-.07-1.14-.155-1.636l-9.38-.415Z"/>
              </svg>
              Continue with Google
            </button>

            {/* Bottom Toggle Text */}
            <p className="text-center text-sm text-gray-600 mt-8 font-medium">
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