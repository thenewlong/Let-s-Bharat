import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Resources = () => {
  // Target Date Set: 15 September 2026
  const TARGET_DATE = new Date('2026-10-08T00:00:00').getTime();

  // Timer State
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  // Notification Button States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Timer Effect
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days: String(days).padStart(2, '0'),
          hours: String(hours).padStart(2, '0'),
          minutes: String(minutes).padStart(2, '0'),
          seconds: String(seconds).padStart(2, '0'),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Form Submit Handler
  const handleNotifySubmit = (e) => {
    e.preventDefault();
    if (email) {
      console.log("User subscribed with email:", email);
      
      setIsSubmitted(true);
      
      // 3 seconds baad success message hatakar wapas button le aayenge
      setTimeout(() => {
        setIsSubmitted(false);
        setIsFormOpen(false);
        setEmail('');
      }, 3000);
    }
  };

  // Framer Motion Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center px-4 font-sans selection:bg-slate-200">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.15 } }
        }}
        className="max-w-3xl w-full flex flex-col items-center text-center"
      >
        
        {/* 1. Icon Container (Resources / Library Icon) */}
        <motion.div variants={fadeUp} className="relative mb-8">
          <div className="absolute inset-0 bg-slate-200/50 rounded-full blur-xl scale-150"></div>
          <div className="w-20 h-20 md:w-24 md:h-24 bg-white/80 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center justify-center relative z-10">
            <svg className="w-8 h-8 md:w-10 md:h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        </motion.div>

        {/* 2. Typography & Headings */}
        <motion.p variants={fadeUp} className="text-[10px] md:text-xs font-bold text-slate-500 tracking-[0.4em] uppercase mb-4">
          R E S O U R C E S  &  T O O L S
        </motion.p>
        
        <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-5">
          Coming Soon
        </motion.h1>
        
        <motion.p variants={fadeUp} className="text-sm md:text-base text-slate-500 max-w-md md:max-w-lg leading-relaxed mb-8 font-medium">
          We're working behind the scenes to bring you the best study materials and developer toolkits. Stay tuned!
        </motion.p>

        <motion.p variants={fadeUp} className="text-sm md:text-base text-slate-500 mb-8 font-medium">
          Launching on <span className="font-bold text-slate-900">08 October 2026</span>
        </motion.p>

        {/* 3. Countdown Timer Card */}
        <motion.div variants={fadeUp} className="w-full max-w-2xl bg-white rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-slate-100/80 p-6 md:p-10 flex justify-between items-center relative overflow-hidden">
          
          <TimeBlock value={timeLeft.days} label="Days" />
          <Divider />
          <TimeBlock value={timeLeft.hours} label="Hours" />
          <Divider />
          <TimeBlock value={timeLeft.minutes} label="Minutes" />
          <Divider />
          <TimeBlock value={timeLeft.seconds} label="Seconds" />

        </motion.div>

        {/* 4. Interactive Notification Section */}
        <motion.div variants={fadeUp} className="mt-12 h-[52px] flex items-center justify-center w-full">
          {!isFormOpen ? (
            // Default Button
            <button 
              onClick={() => setIsFormOpen(true)}
              className="group flex items-center gap-3 px-6 py-3 md:px-8 md:py-3.5 bg-white border border-slate-200 rounded-full text-sm font-semibold text-slate-600 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300"
            >
              <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Get notified when we go live
            </button>
          ) : isSubmitted ? (
            // Success Message
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 px-6 py-3.5 bg-green-50 border border-green-200 rounded-full text-sm font-semibold text-green-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              You're on the list! We'll email you.
            </motion.div>
          ) : (
            // Email Input Form
            <motion.form 
              initial={{ opacity: 0, width: '250px' }}
              animate={{ opacity: 1, width: '100%' }}
              transition={{ duration: 0.3 }}
              onSubmit={handleNotifySubmit}
              className="flex items-center max-w-md w-full bg-white rounded-full p-1 border border-slate-200 shadow-md ring-2 ring-slate-100"
            >
              <input 
                type="email" 
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 bg-transparent text-sm text-slate-800 outline-none placeholder-slate-400"
                autoFocus
              />
              <button 
                type="submit"
                className="px-5 py-2 bg-slate-900 text-white text-sm font-semibold rounded-full hover:bg-slate-800 transition-colors"
              >
                Subscribe
              </button>
            </motion.form>
          )}
        </motion.div>

      </motion.div>
    </div>
  );
};

// --- Helper Components --- //

// Reusable Time Block
const TimeBlock = ({ value, label }) => (
  <div className="flex flex-col items-center justify-center flex-1">
    <span className="text-4xl sm:text-5xl md:text-[64px] font-medium text-slate-900 tracking-tight leading-none mb-2 md:mb-3">
      {value}
    </span>
    <span className="text-[9px] md:text-xs font-bold text-slate-400 tracking-[0.2em] uppercase">
      {label}
    </span>
  </div>
);

// Vertical Divider Line
const Divider = () => (
  <div className="w-[1px] h-12 md:h-16 bg-slate-100 mx-1 md:mx-2"></div>
);

export default Resources;