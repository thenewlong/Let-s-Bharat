import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth'; 
import Hackathons from './pages/Hackathons'; 
import Internships from './pages/Internships'; 
import Tournaments from './pages/Tournaments'; 
import Startups from './pages/Startups'; 
import Resources from './pages/Resources';
import Jobs from './pages/Jobs';
import About from './pages/About';
import Profile from './pages/Profile'; 

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Navbar hamesha top par rahega */}
        <Navbar />
        
        {/* Pages ki routing */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/hackathons" element={<Hackathons />} />
          <Route path="/internships" element={<Internships />} /> 
          <Route path="/tournaments" element={<Tournaments />} /> 
          <Route path="/Startups" element={<Startups />} />
          <Route path="/Jobs" element={<Jobs />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} /> 
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;