
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';

// 🎮 Auto-triggering Mini Game Ad Banner component
import FloatingSocialWidget from './components/FloatingSocialWidget';

// 📖 LetsBharat Interactive Vision Book


import Home from './pages/Home';
import Auth from './pages/Auth';
import Hackathons from './pages/Hackathons';
import Internships from './pages/Internships';
import Learninghub from './pages/Learninghub';
import Institutions from './pages/Institutions';
import InstitutionsPages from './pages/InstitutionsPages';
import Resources from './pages/Resources';
import Jobs from './pages/Jobs';
import About from './pages/About';
import Profile from './pages/Profile';

// Policy Pages
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Disclaimer from './pages/Disclaimer';
import Contact from './pages/Contact';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <AuthProvider>
      <Router>

        {/* 🌟 Floating Social Links Widget */}
        <FloatingSocialWidget />

       
        {/* Navbar hamesha top par rahega */}
        <Navbar />

        {/* Pages ki routing */}
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/auth" element={<Auth />} />

          <Route path="/hackathons" element={<Hackathons />} />

          <Route path="/internships" element={<Internships />} />

          <Route path="/learninghub" element={<Learninghub />} />

          <Route path="/institutions" element={<Institutions />} />

          <Route
            path="/institution/:id"
            element={<InstitutionsPages />}
          />

          <Route path="/jobs" element={<Jobs />} />

          <Route path="/resources" element={<Resources />} />

          <Route path="/about" element={<About />} />

          <Route path="/profile" element={<Profile />} />

          {/* Privacy Policy and Terms of Service */}
          <Route
            path="/privacypolicy"
            element={<PrivacyPolicy />}
          />

          <Route
            path="/termsofservice"
            element={<TermsOfService />}
          />

          <Route
            path="/disclaimer"
            element={<Disclaimer />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

        </Routes>

      </Router>
    </AuthProvider>
  );
}

export default App;
