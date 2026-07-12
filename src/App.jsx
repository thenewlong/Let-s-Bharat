import React, { useState, useEffect } from 'react'; // ✨ Fix: useState aur useEffect import kiya
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import Navbar from './components/Navbar';
import Home from './pages/Home'; // ✨ Fix: Duplicate Home import hataya
import Auth from './pages/Auth'; 
import Hackathons from './pages/Hackathons'; 
import Internships from './pages/Internships'; 
import Tournaments from './pages/Tournaments'; 
import Startups from './pages/Startups'; 
import Resources from './pages/Resources';
import About from './pages/About';
import Profile from './pages/Profile'; 
import IntroVideo from './components/IntroVideo'; // 🎥 Fix: IntroVideo component import kiya

function App() {
  // ⏱️ Logic: State jo control karegi ki pehle video dikhani hai ya nahi
  const [showIntro, setShowIntro] = useState(true);

  // Safety Net Timer: Agar video block ho jaye, toh max 16 seconds baad site load ho jayegi
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 16000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <Router>
        {showIntro ? (
          /* 1. Website ke andar aane se pehle chalne wali 15-second Intro Video */
          <IntroVideo onVideoEnd={() => setShowIntro(false)} />
        ) : (
          /* 2. Video khatam hone ke baad poori main website smoothly load hogi */
          <div className="bg-[#0b0f19] min-h-screen font-sans text-white overflow-x-hidden animate-[fadeIn_0.5s_ease-out]">
            {/* Navbar ab video ke baad hi dikhega */}
            <Navbar />
            
            <Routes>
              {/* ✨ Fix: Duplicate routes hataye */}
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/hackathons" element={<Hackathons />} />
              <Route path="/internships" element={<Internships />} /> 
              <Route path="/tournaments" element={<Tournaments />} /> 
              <Route path="/Startups" element={<Startups />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} /> 
            </Routes>
          </div>
        )}
      </Router>

      {/* Video se main website par aate waqt smooth transition effect */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
    </AuthProvider>
  );
}

export default App;