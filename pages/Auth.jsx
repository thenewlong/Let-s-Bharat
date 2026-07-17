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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');

  // Premium platform automatic user checking (Unstop / LinkedIn style redirect)
  useEffect(() => {
    if (user) {
      navigate('/profile'); // Agar user pehle se login hai toh automatic dashboard bhej do
    }
  }, [user, navigate]);

  const slides = [
    {
      title: "Connect with like-minded people",
      desc: "Join a growing ecosystem of developer talent, designers, and innovators across Northeast India.",
      icon: "👥"
    },
    {
      title: "Discover hackathons & events",
      desc: "Get direct access to major technical challenges, local meetups, and international prize pools.",
      icon: "🏆"
    },
    {
      title: "Learn, Grow & Build together",
      desc: "Accelerate your product roadmap with mentorship, active support channels, and incubation paths.",
      icon: "🚀"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      await signInWithGoogle();
      navigate('/profile'); 
    } catch (err) {
      setError('Google Sign-In process dismiss ho gaya.');
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
        if (password !== confirmPassword) {
          setError('Passwords match nahi ho rahe hain.');
          return;
        }
        if (!agreeTerms) {
          setError('Aage badhne ke liye terms accept kijiye.');
          return;
        }
        await signup(fullName, email, password);
        navigate('/profile');
      }
    } catch (err) {
      setError(err.message || 'Authentication system error.');
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#060913] flex items-center justify-center p-4 md:p-10 font-sans text-white overflow-hidden perspective-viewport">
      
      {/* Real-time 3D and Flipkart Micro-Animation Frame Configurations */}
      <style>{`
        .perspective-viewport {
          perspective: 1500px;
        }
        .animate-3d-modal {
          animation: modal3DEntry 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          transform-style: preserve-3d;
        }
        @keyframes modal3DEntry {
          0% {
            opacity: 0;
            transform: scale(0.85) rotateX(25deg) rotateY(-15deg) translateZ(-200px);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotateX(0deg) rotateY(0deg) translateZ(0);
          }
        }
        .flipkart-slide-in {
          animation: fSlide 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        @keyframes fSlide {
          0% {
            opacity: 0;
            transform: translateX(80px) skewX(-2deg);
          }
          100% {
            opacity: 1;
            transform: translateX(0) skewX(0deg);
          }
        }
      `}</style>

      {/* Main Framework Container */}
      <div className="w-full max-w-6xl bg-[#0b0f19] rounded-3xl overflow-hidden shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)] border border-gray-800/60 flex flex-col md:flex-row min-h-[660px] animate-3d-modal">
        
        {/* ================= LEFT SIDE: DARK PREMIUM PANELS ================= */}
        <div className="w-full md:w-1/2 bg-[#0b0f19] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-gray-800/40">
          
          {/* Dual Brand Identity Typography Wrapper */}
          <div className="z-10">
            <span className="text-2xl font-black tracking-tight text-white">
              Let's <span className="text-[#7c3aed]">Sister</span>
            </span>
          </div>

          {/* Micro-Interaction Showcase Carousel */}
          <div className="my-auto py-10 relative h-48 flex items-center">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-in-out ${
                  index === currentSlide 
                    ? "opacity-100 transform translate-x-0 scale-100" 
                    : "opacity-0 transform -translate-x-8 scale-95 pointer-events-none"
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-purple-950/40 border border-purple-500/20 flex items-center justify-center text-2xl mb-4">
                  {slide.icon}
                </div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-2 text-white">
                  {slide.title}
                </h2>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-sm">
                  {slide.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex gap-1.5 z-10">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentSlide ? "w-6 bg-[#7c3aed]" : "w-1.5 bg-gray-700"
                }`}
              />
            ))}
          </div>

          <div className="absolute -top-10 -left-10 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* ================= RIGHT SIDE: PURE WHITE MODERN INTERFACE ================= */}
        <div 
          key={isLogin ? 'login-view' : 'signup-view'} 
          className="w-full md:w-1/2 p-8 md:p-12 bg-white flex flex-col justify-center flipkart-slide-in"
        >
          <div className="max-w-md w-full mx-auto">
            
            <h3 className="text-3xl font-black text-gray-900 mb-1.5 tracking-tight">
              {isLogin ? 'Welcome Back!' : 'Create Account'}
            </h3>
            <p className="text-gray-500 text-sm mb-6 font-medium">
              {isLogin ? 'Login to continue your dashboard journey.' : 'Join our professional network platform today!'}
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {!isLogin && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:bg-white transition-all font-medium"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:bg-white transition-all font-medium"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Password</label>
                  {isLogin && (
                    <button type="button" className="text-xs font-bold text-[#7c3aed] hover:underline">Forgot?</button>
                  )}
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:bg-white transition-all font-medium"
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Confirm Password</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:bg-white transition-all font-medium"
                  />
                </div>
              )}

              {!isLogin && (
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 rounded mt-0.5 border-gray-300 bg-gray-50 text-[#7c3aed] focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-xs text-gray-500 leading-tight cursor-pointer select-none">
                    I agree to the <span className="text-gray-900 font-bold hover:underline">Terms</span> and <span className="text-gray-900 font-bold hover:underline">Privacy Policy</span>.
                  </label>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-purple-500/20 active:scale-[0.99] mt-2"
              >
                {isLogin ? 'Login' : 'Create Account'}
              </button>
            </form>

            <div className="relative flex py-4 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-3 text-gray-400 text-[10px] font-bold uppercase tracking-widest">or integrate via</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Google Authentication Anchor Link Button */}
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2.5 active:scale-[0.99]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.327-3.204C18.416 1.872 15.626.985 12.24.985A10.985 10.985 0 0 0 1.255 11.97a10.985 10.985 0 0 0 10.985 10.985c5.73 0 9.535-3.996 9.535-9.62c0-.65-.07-1.14-.155-1.636l-9.38-.415Z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Account View Mode Selector Toggle */}
            <p className="text-center text-xs text-gray-500 mt-6 font-medium">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="text-[#7c3aed] font-bold hover:underline ml-0.5"
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